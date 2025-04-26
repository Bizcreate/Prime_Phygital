export interface ShareOptions {
  url: string
  title?: string
  text?: string
  files?: File[]
}

export interface SocialPlatform {
  name: string
  icon: string
  shareUrl: (options: ShareOptions) => string
  action: (options: ShareOptions) => Promise<boolean>
}

export const socialPlatforms: Record<string, SocialPlatform> = {
  facebook: {
    name: "Facebook",
    icon: "facebook",
    shareUrl: ({ url, title }) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title || "")}`,
    action: async (options) => {
      window.open(socialPlatforms.facebook.shareUrl(options), "_blank", "width=600,height=400")
      return true
    },
  },
  twitter: {
    name: "Twitter",
    icon: "twitter",
    shareUrl: ({ url, text, title }) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text || title || "")}`,
    action: async (options) => {
      window.open(socialPlatforms.twitter.shareUrl(options), "_blank", "width=600,height=400")
      return true
    },
  },
  linkedin: {
    name: "LinkedIn",
    icon: "linkedin",
    shareUrl: ({ url, title }) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title || "")}`,
    action: async (options) => {
      window.open(socialPlatforms.linkedin.shareUrl(options), "_blank", "width=600,height=400")
      return true
    },
  },
  pinterest: {
    name: "Pinterest",
    icon: "pinterest",
    shareUrl: ({ url, title }) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title || "")}`,
    action: async (options) => {
      window.open(socialPlatforms.pinterest.shareUrl(options), "_blank", "width=600,height=400")
      return true
    },
  },
  email: {
    name: "Email",
    icon: "email",
    shareUrl: ({ url, title, text }) =>
      `mailto:?subject=${encodeURIComponent(title || "")}&body=${encodeURIComponent(text || "")}%0A%0A${encodeURIComponent(url)}`,
    action: async (options) => {
      window.location.href = socialPlatforms.email.shareUrl(options)
      return true
    },
  },
}

export async function shareContent(options: ShareOptions): Promise<boolean> {
  try {
    // Try to use the Web Share API if available
    if (navigator.share) {
      await navigator.share(options)
      return true
    }
    return false
  } catch (error) {
    console.error("Error sharing content:", error)
    return false
  }
}
