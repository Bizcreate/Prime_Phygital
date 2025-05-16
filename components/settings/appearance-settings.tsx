"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export function AppearanceSettings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    animations: true,
    selectedTheme: "default",
  })

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }))
  }

  const handleThemeSelect = (theme: string) => {
    setSettings((prev) => ({ ...prev, selectedTheme: theme }))
  }

  const handleSavePreferences = () => {
    console.log("Saving appearance preferences:", settings)
    // You would typically send this data to your API here
  }

  return (
    <Card className="glass-panel border-white/10">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Customize the appearance of the dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Color Theme</Label>
          <div className="grid grid-cols-3 gap-4">
            <div
              className={`flex flex-col items-center gap-2 ${settings.selectedTheme === "default" ? "opacity-100" : "opacity-70"}`}
              onClick={() => handleThemeSelect("default")}
            >
              <div className="h-20 w-full rounded-md bg-gradient-to-r from-neon-purple to-neon-blue border border-white/20 cursor-pointer"></div>
              <span className="text-sm">Default</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 ${settings.selectedTheme === "ocean" ? "opacity-100" : "opacity-70"}`}
              onClick={() => handleThemeSelect("ocean")}
            >
              <div className="h-20 w-full rounded-md bg-gradient-to-r from-neon-green to-neon-blue border border-white/20 cursor-pointer"></div>
              <span className="text-sm">Ocean</span>
            </div>
            <div
              className={`flex flex-col items-center gap-2 ${settings.selectedTheme === "sunset" ? "opacity-100" : "opacity-70"}`}
              onClick={() => handleThemeSelect("sunset")}
            >
              <div className="h-20 w-full rounded-md bg-gradient-to-r from-neon-purple to-neon-red border border-white/20 cursor-pointer"></div>
              <span className="text-sm">Sunset</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch
            id="darkMode"
            checked={settings.darkMode}
            onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="animations">Enable Animations</Label>
          <Switch
            id="animations"
            checked={settings.animations}
            onCheckedChange={(checked) => handleSwitchChange("animations", checked)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSavePreferences}
          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
        >
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
