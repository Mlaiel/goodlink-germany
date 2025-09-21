import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Initialize PWA manager
import { pwaManager } from './utils/pwa'

// Add offline indicator
function addOfflineIndicator() {
  const indicator = document.createElement('div')
  indicator.id = 'offline-indicator'
  indicator.className = 'fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50 transform -translate-y-full transition-transform duration-300'
  indicator.innerHTML = `
    <div class="flex items-center justify-center gap-2">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18m-9-9v18"/>
      </svg>
      <span>You're offline. Some features may be limited.</span>
    </div>
  `
  document.body.appendChild(indicator)

  // Show/hide based on connection status
  function updateConnectionStatus() {
    if (navigator.onLine) {
      indicator.style.transform = 'translateY(-100%)'
    } else {
      indicator.style.transform = 'translateY(0)'
    }
  }

  window.addEventListener('online', updateConnectionStatus)
  window.addEventListener('offline', updateConnectionStatus)
  
  // Initial check
  updateConnectionStatus()
}

// Initialize offline indicator
addOfflineIndicator()

// Console log for PWA info
console.log('🚀 Goodlink Germany PWA initialized')
console.log('📱 Installation status:', pwaManager.getInstallationStatus())

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
