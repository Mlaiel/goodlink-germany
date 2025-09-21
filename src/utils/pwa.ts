// PWA utilities for service worker registration and management

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

class PWAManager {
  private deferredPrompt: BeforeInstallPromptEvent | null = null
  private isInstalled = false
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.init()
  }

  private async init() {
    // Check if running as PWA
    this.isInstalled = this.isPWAInstalled()
    
    // Register service worker
    await this.registerServiceWorker()
    
    // Setup install prompt
    this.setupInstallPrompt()
    
    // Setup notification permission
    this.setupNotifications()
  }

  // Register service worker
  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })

        console.log('[PWA] Service Worker registered successfully:', this.registration.scope)

        // Handle updates
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration?.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New update available
                this.showUpdateAvailable()
              }
            })
          }
        })

      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error)
      }
    }
  }

  // Check if app is installed as PWA
  private isPWAInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    )
  }

  // Setup install prompt
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e as BeforeInstallPromptEvent
      this.showInstallButton()
    })

    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed successfully')
      this.isInstalled = true
      this.hideInstallButton()
      this.deferredPrompt = null
    })
  }

  // Show install button
  private showInstallButton(): void {
    const installButton = document.getElementById('pwa-install-button')
    if (installButton) {
      installButton.style.display = 'block'
    }

    // Create install banner if not exists
    if (!installButton && !this.isInstalled) {
      this.createInstallBanner()
    }
  }

  // Hide install button
  private hideInstallButton(): void {
    const installButton = document.getElementById('pwa-install-button')
    const installBanner = document.getElementById('pwa-install-banner')
    
    if (installButton) {
      installButton.style.display = 'none'
    }
    if (installBanner) {
      installBanner.remove()
    }
  }

  // Create install banner
  private createInstallBanner(): void {
    const banner = document.createElement('div')
    banner.id = 'pwa-install-banner'
    banner.className = 'fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 z-50 flex items-center justify-between'
    banner.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16,6 12,2 8,6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
        </div>
        <div>
          <div class="font-medium">Install Goodlink Germany</div>
          <div class="text-sm opacity-90">Get the full app experience</div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="pwa-install-now" class="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Install
        </button>
        <button id="pwa-install-dismiss" class="text-white/80 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `

    document.body.appendChild(banner)

    // Add event listeners
    const installButton = banner.querySelector('#pwa-install-now')
    const dismissButton = banner.querySelector('#pwa-install-dismiss')

    installButton?.addEventListener('click', () => {
      this.install()
    })

    dismissButton?.addEventListener('click', () => {
      banner.remove()
      localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    })

    // Auto-hide after 30 seconds
    setTimeout(() => {
      if (banner.parentNode) {
        banner.remove()
      }
    }, 30000)
  }

  // Install PWA
  public async install(): Promise<void> {
    if (this.deferredPrompt) {
      try {
        await this.deferredPrompt.prompt()
        const choiceResult = await this.deferredPrompt.userChoice
        
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt')
        } else {
          console.log('[PWA] User dismissed the install prompt')
        }
        
        this.deferredPrompt = null
      } catch (error) {
        console.error('[PWA] Install prompt failed:', error)
      }
    }
  }

  // Setup notifications
  private async setupNotifications(): Promise<void> {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission()
      
      if (permission === 'granted') {
        console.log('[PWA] Notification permission granted')
        
        // Subscribe to push notifications
        await this.subscribeToPushNotifications()
      }
    }
  }

  // Subscribe to push notifications
  private async subscribeToPushNotifications(): Promise<void> {
    if (this.registration) {
      try {
        const subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            // Replace with your VAPID public key
            'BEl62iUYgUivxIkv69yViEuiBIa40HI0LLLsLkbOCUl9Ozo1w1PFEyS5w1J2p4L3q1j4I7D8kPJu_3A8YbPXF8g'
          )
        })

        // Send subscription to backend
        await this.sendSubscriptionToBackend(subscription)
        
        console.log('[PWA] Push notification subscription successful')
      } catch (error) {
        console.error('[PWA] Push notification subscription failed:', error)
      }
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Send subscription to backend
  private async sendSubscriptionToBackend(subscription: PushSubscription): Promise<void> {
    try {
      await fetch('/api/v1/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON()
        })
      })
    } catch (error) {
      console.error('[PWA] Failed to send subscription to backend:', error)
    }
  }

  // Show update available notification
  private showUpdateAvailable(): void {
    // Create update notification
    const notification = document.createElement('div')
    notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm'
    notification.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600">
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
            <path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          </svg>
        </div>
        <div class="flex-1">
          <div class="font-medium mb-1">Update Available</div>
          <div class="text-sm opacity-90 mb-2">A new version of Goodlink Germany is ready.</div>
          <button id="pwa-update-now" class="bg-white text-green-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
            Update Now
          </button>
        </div>
        <button id="pwa-update-dismiss" class="text-white/80 hover:text-white transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `

    document.body.appendChild(notification)

    // Add event listeners
    const updateButton = notification.querySelector('#pwa-update-now')
    const dismissButton = notification.querySelector('#pwa-update-dismiss')

    updateButton?.addEventListener('click', () => {
      this.updateApp()
      notification.remove()
    })

    dismissButton?.addEventListener('click', () => {
      notification.remove()
    })

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 10000)
  }

  // Update app
  private updateApp(): void {
    if (this.registration?.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  // Check if app can be installed
  public canInstall(): boolean {
    return !this.isInstalled && this.deferredPrompt !== null
  }

  // Get installation status
  public getInstallationStatus(): { 
    isInstalled: boolean
    canInstall: boolean
    hasServiceWorker: boolean
  } {
    return {
      isInstalled: this.isInstalled,
      canInstall: this.canInstall(),
      hasServiceWorker: this.registration !== null
    }
  }

  // Add to offline queue
  public addToOfflineQueue(request: {
    url: string
    method: string
    headers: Record<string, string>
    body?: string
  }): void {
    if (this.registration?.sync) {
      // Use Background Sync
      this.registration.sync.register('offline-actions')
    } else {
      // Fallback to IndexedDB storage
      this.storeOfflineAction(request)
    }
  }

  // Store offline action
  private storeOfflineAction(request: any): void {
    const actions = JSON.parse(localStorage.getItem('offline-actions') || '[]')
    actions.push({
      ...request,
      timestamp: Date.now(),
      id: Date.now().toString()
    })
    localStorage.setItem('offline-actions', JSON.stringify(actions))
  }

  // Send local notification
  public sendNotification(title: string, options?: NotificationOptions): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        ...options
      })
    }
  }
}

// Export singleton instance
export const pwaManager = new PWAManager()

// Export types
export type { BeforeInstallPromptEvent }