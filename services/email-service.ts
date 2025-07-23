interface RewardEmailData {
  userEmail: string
  rewardName: string
  rewardCode: string
  brandName: string
  expirationDate: string
}

interface WelcomeEmailData {
  userEmail: string
  userName: string
}

interface PointsEarnedEmailData {
  userEmail: string
  pointsEarned: number
  activity: string
  totalPoints: number
}

export class EmailService {
  private static instance: EmailService
  private apiKey: string

  private constructor() {
    this.apiKey = process.env.EMAIL_API_KEY || "demo-key"
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendRewardCode(data: RewardEmailData): Promise<boolean> {
    try {
      // In production, integrate with SendGrid, Resend, or similar
      const emailContent = this.generateRewardEmail(data)

      // Simulate email sending
      console.log("Sending reward email:", emailContent)

      // For demo purposes, we'll simulate a successful send
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return true
    } catch (error) {
      console.error("Failed to send reward email:", error)
      return false
    }
  }

  async sendWelcomeEmail(data: WelcomeEmailData): Promise<boolean> {
    try {
      const emailContent = this.generateWelcomeEmail(data)
      console.log("Sending welcome email:", emailContent)
      await new Promise((resolve) => setTimeout(resolve, 500))
      return true
    } catch (error) {
      console.error("Failed to send welcome email:", error)
      return false
    }
  }

  async sendPointsEarnedNotification(data: PointsEarnedEmailData): Promise<boolean> {
    try {
      const emailContent = this.generatePointsEmail(data)
      console.log("Sending points notification:", emailContent)
      await new Promise((resolve) => setTimeout(resolve, 500))
      return true
    } catch (error) {
      console.error("Failed to send points notification:", error)
      return false
    }
  }

  private generateRewardEmail(data: RewardEmailData): string {
    return `
      Subject: Your ${data.rewardName} is Ready!
      
      Hi there!
      
      Congratulations! You've successfully redeemed your ${data.rewardName} from ${data.brandName}.
      
      Your reward code: ${data.rewardCode}
      
      This code expires on: ${data.expirationDate}
      
      Use this code at checkout or present it in-store to claim your reward.
      
      Happy shopping!
      The Prime Phygital Team
    `
  }

  private generateWelcomeEmail(data: WelcomeEmailData): string {
    return `
      Subject: Welcome to Prime Phygital!
      
      Hi ${data.userName}!
      
      Welcome to the future of phygital experiences! You've just joined a revolutionary platform that connects your physical products to the digital world.
      
      Here's what you can do:
      • Authenticate your products with NFC technology
      • Earn rewards through our Wear-to-Earn program
      • Track your product history on the blockchain
      • Join exclusive brand communities
      
      Start by scanning your first product or exploring our marketplace!
      
      Best regards,
      The Prime Phygital Team
    `
  }

  private generatePointsEmail(data: PointsEarnedEmailData): string {
    return `
      Subject: You've Earned ${data.pointsEarned} Points!
      
      Great job!
      
      You've just earned ${data.pointsEarned} points for: ${data.activity}
      
      Your total balance: ${data.totalPoints} points
      
      Visit your rewards dashboard to see what you can redeem!
      
      Keep earning,
      The Prime Phygital Team
    `
  }
}
