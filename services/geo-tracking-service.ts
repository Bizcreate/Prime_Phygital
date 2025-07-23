import { encrypt } from "@/utils/encryption"

export interface GeoLocation {
  latitude: number
  longitude: number
  accuracy: number
  altitude?: number
  heading?: number
  speed?: number
  timestamp: number
}

export interface ActivitySession {
  id: string
  userId: string
  productId: string
  startTime: Date
  endTime?: Date
  startLocation: GeoLocation
  endLocation?: GeoLocation
  trackingPoints: GeoLocation[]
  distance: number
  duration: number
  isValid: boolean
  nfcVerified: boolean
  encryptedData: string
  activityType: "walking" | "running" | "cycling" | "general"
}

export interface GeofenceArea {
  id: string
  name: string
  center: { lat: number; lng: number }
  radius: number // in meters
  type: "home" | "work" | "gym" | "outdoor" | "restricted"
}

export class GeoTrackingService {
  private static instance: GeoTrackingService
  private watchId: number | null = null
  private currentSession: ActivitySession | null = null
  private trackingInterval: NodeJS.Timeout | null = null
  private geofences: GeofenceArea[] = []

  private constructor() {
    this.initializeGeofences()
  }

  public static getInstance(): GeoTrackingService {
    if (!GeoTrackingService.instance) {
      GeoTrackingService.instance = new GeoTrackingService()
    }
    return GeoTrackingService.instance
  }

  private initializeGeofences() {
    // Default geofences for activity validation
    this.geofences = [
      {
        id: "home-zone",
        name: "Home Area",
        center: { lat: 40.7128, lng: -74.006 }, // Example: NYC
        radius: 100,
        type: "home",
      },
      {
        id: "restricted-indoor",
        name: "Indoor Restricted",
        center: { lat: 40.7589, lng: -73.9851 }, // Example: Times Square
        radius: 50,
        type: "restricted",
      },
    ]
  }

  async requestLocationPermission(): Promise<boolean> {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser")
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" })

      if (permission.state === "granted") {
        return true
      } else if (permission.state === "prompt") {
        // Request permission through getCurrentPosition
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => reject(new Error("Location permission denied")),
            { enableHighAccuracy: true, timeout: 10000 },
          )
        })
      } else {
        throw new Error("Location permission denied")
      }
    } catch (error) {
      console.error("Error requesting location permission:", error)
      return false
    }
  }

  async getCurrentLocation(): Promise<GeoLocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude || undefined,
            heading: position.coords.heading || undefined,
            speed: position.coords.speed || undefined,
            timestamp: position.timestamp,
          })
        },
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000,
        },
      )
    })
  }

  async startActivitySession(userId: string, productId: string, nfcVerified = false): Promise<string> {
    try {
      // Request location permission first
      const hasPermission = await this.requestLocationPermission()
      if (!hasPermission) {
        throw new Error("Location permission required for activity tracking")
      }

      // Get initial location
      const startLocation = await this.getCurrentLocation()

      // Validate location (not in restricted areas)
      const isValidLocation = this.validateLocation(startLocation)
      if (!isValidLocation) {
        throw new Error("Activity cannot be started in this location")
      }

      // Create new session
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      this.currentSession = {
        id: sessionId,
        userId,
        productId,
        startTime: new Date(),
        startLocation,
        trackingPoints: [startLocation],
        distance: 0,
        duration: 0,
        isValid: true,
        nfcVerified,
        encryptedData: "",
        activityType: "general",
      }

      // Start continuous tracking
      this.startContinuousTracking()

      // Encrypt and store session data
      await this.saveSessionData()

      return sessionId
    } catch (error) {
      console.error("Error starting activity session:", error)
      throw error
    }
  }

  private startContinuousTracking() {
    // High-accuracy position tracking
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (this.currentSession) {
          const newLocation: GeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude || undefined,
            heading: position.coords.heading || undefined,
            speed: position.coords.speed || undefined,
            timestamp: position.timestamp,
          }

          this.addTrackingPoint(newLocation)
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
        this.handleTrackingError(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    )

    // Periodic validation and data saving
    this.trackingInterval = setInterval(() => {
      if (this.currentSession) {
        this.validateSession()
        this.saveSessionData()
      }
    }, 30000) // Every 30 seconds
  }

  private addTrackingPoint(location: GeoLocation) {
    if (!this.currentSession) return

    const lastPoint = this.currentSession.trackingPoints[this.currentSession.trackingPoints.length - 1]

    // Calculate distance from last point
    const distance = this.calculateDistance(
      lastPoint.latitude,
      lastPoint.longitude,
      location.latitude,
      location.longitude,
    )

    // Add point if movement is significant (> 5 meters)
    if (distance > 5) {
      this.currentSession.trackingPoints.push(location)
      this.currentSession.distance += distance

      // Update duration
      this.currentSession.duration = Date.now() - this.currentSession.startTime.getTime()

      // Detect activity type based on speed
      this.detectActivityType(location)

      // Validate location
      if (!this.validateLocation(location)) {
        this.currentSession.isValid = false
      }
    }
  }

  private detectActivityType(location: GeoLocation) {
    if (!this.currentSession || !location.speed) return

    const speedKmh = location.speed * 3.6 // Convert m/s to km/h

    if (speedKmh < 6) {
      this.currentSession.activityType = "walking"
    } else if (speedKmh < 15) {
      this.currentSession.activityType = "running"
    } else if (speedKmh < 50) {
      this.currentSession.activityType = "cycling"
    } else {
      // Suspicious speed - might be in a vehicle
      this.currentSession.isValid = false
    }
  }

  private validateLocation(location: GeoLocation): boolean {
    // Check if location is in restricted geofences
    for (const geofence of this.geofences) {
      if (geofence.type === "restricted") {
        const distance = this.calculateDistance(
          location.latitude,
          location.longitude,
          geofence.center.lat,
          geofence.center.lng,
        )

        if (distance <= geofence.radius) {
          return false // In restricted area
        }
      }
    }

    // Check accuracy - reject if too inaccurate
    if (location.accuracy > 50) {
      return false
    }

    return true
  }

  private validateSession() {
    if (!this.currentSession) return

    const now = Date.now()
    const sessionDuration = now - this.currentSession.startTime.getTime()

    // Minimum session duration (2 minutes)
    if (sessionDuration < 120000) {
      this.currentSession.isValid = false
      return
    }

    // Check for suspicious patterns
    const avgSpeed = this.currentSession.distance / (sessionDuration / 1000) // m/s
    if (avgSpeed > 20) {
      // > 72 km/h average - likely in vehicle
      this.currentSession.isValid = false
    }

    // Check for minimum movement
    if (this.currentSession.distance < 50) {
      // Less than 50 meters
      this.currentSession.isValid = false
    }
  }

  async stopActivitySession(): Promise<ActivitySession | null> {
    if (!this.currentSession) {
      throw new Error("No active session to stop")
    }

    try {
      // Get final location
      const endLocation = await this.getCurrentLocation()

      // Stop tracking
      if (this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId)
        this.watchId = null
      }

      if (this.trackingInterval) {
        clearInterval(this.trackingInterval)
        this.trackingInterval = null
      }

      // Finalize session
      this.currentSession.endTime = new Date()
      this.currentSession.endLocation = endLocation
      this.currentSession.duration = Date.now() - this.currentSession.startTime.getTime()

      // Final validation
      this.validateSession()

      // Encrypt and save final data
      await this.saveSessionData()

      const completedSession = { ...this.currentSession }
      this.currentSession = null

      return completedSession
    } catch (error) {
      console.error("Error stopping activity session:", error)
      throw error
    }
  }

  private async saveSessionData() {
    if (!this.currentSession) return

    try {
      // Encrypt sensitive location data
      const sensitiveData = {
        trackingPoints: this.currentSession.trackingPoints,
        startLocation: this.currentSession.startLocation,
        endLocation: this.currentSession.endLocation,
      }

      this.currentSession.encryptedData = await encrypt(JSON.stringify(sensitiveData))

      // Save to secure storage (in production, this would be sent to backend)
      const sessionData = {
        ...this.currentSession,
        trackingPoints: [], // Remove from client storage
        startLocation: { latitude: 0, longitude: 0, accuracy: 0, timestamp: 0 }, // Anonymize
        endLocation: undefined,
      }

      localStorage.setItem(`session_${this.currentSession.id}`, JSON.stringify(sessionData))
    } catch (error) {
      console.error("Error saving session data:", error)
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  private handleTrackingError(error: GeolocationPositionError) {
    if (this.currentSession) {
      this.currentSession.isValid = false
    }

    console.error("Geolocation tracking error:", error.message)
  }

  async verifyNFCTap(productId: string): Promise<boolean> {
    try {
      // In a real implementation, this would communicate with the NFC chip
      // For demo purposes, we'll simulate NFC verification

      if ("NDEFReader" in window) {
        const ndef = new (window as any).NDEFReader()

        await ndef.scan()

        return new Promise((resolve) => {
          ndef.addEventListener("reading", (event: any) => {
            const message = event.message
            for (const record of message.records) {
              if (record.recordType === "text") {
                const textDecoder = new TextDecoder(record.encoding)
                const data = textDecoder.decode(record.data)

                // Verify product ID matches
                if (data.includes(productId)) {
                  resolve(true)
                  return
                }
              }
            }
            resolve(false)
          })

          // Timeout after 10 seconds
          setTimeout(() => resolve(false), 10000)
        })
      } else {
        // Fallback for browsers without NFC support
        console.warn("NFC not supported, using simulated verification")
        return true
      }
    } catch (error) {
      console.error("NFC verification error:", error)
      return false
    }
  }

  getCurrentSession(): ActivitySession | null {
    return this.currentSession
  }

  async getSessionHistory(userId: string): Promise<ActivitySession[]> {
    // In production, this would fetch from backend
    const sessions: ActivitySession[] = []

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("session_")) {
        try {
          const sessionData = JSON.parse(localStorage.getItem(key) || "{}")
          if (sessionData.userId === userId) {
            sessions.push(sessionData)
          }
        } catch (error) {
          console.error("Error parsing session data:", error)
        }
      }
    }

    return sessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  }

  calculateRewardPoints(session: ActivitySession): number {
    if (!session.isValid) return 0

    let basePoints = 0
    const durationMinutes = session.duration / (1000 * 60)
    const distanceKm = session.distance / 1000

    // Base points calculation
    switch (session.activityType) {
      case "walking":
        basePoints = Math.floor(durationMinutes * 2) + Math.floor(distanceKm * 10)
        break
      case "running":
        basePoints = Math.floor(durationMinutes * 3) + Math.floor(distanceKm * 15)
        break
      case "cycling":
        basePoints = Math.floor(durationMinutes * 1.5) + Math.floor(distanceKm * 5)
        break
      default:
        basePoints = Math.floor(durationMinutes * 1)
    }

    // Bonus for NFC verification
    if (session.nfcVerified) {
      basePoints *= 1.5
    }

    // Bonus for longer activities
    if (durationMinutes > 60) {
      basePoints *= 1.2
    }

    return Math.floor(basePoints)
  }
}
