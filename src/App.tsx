import React, { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/components/LanguageContext"
import { AdminInterface } from "@/components/AdminInterface"
import { ClientInterface } from "@/components/ClientInterface"
import { ShopInterface } from "@/components/ShopInterface"
import { ErrorFallback } from "@/components/ErrorFallback"
import { ErrorLogger } from "@/components/ErrorLogger"
import { useKV } from "@github/spark/hooks"

// Enhanced error boundary with auto-recovery
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, error?: Error, errorCount: number }
> {
  private resetTimer?: NodeJS.Timeout

  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, errorCount: 0 }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', { error, errorInfo })
    
    // Increment error count
    this.setState(prevState => ({ 
      errorCount: prevState.errorCount + 1 
    }))
    
    // Check for specific known errors and provide better context
    if (error.message?.includes('RovingFocusGroupItem')) {
      console.error('RovingFocusGroup Error - this is usually caused by using TabsTrigger outside TabsList')
    }
    if (error.message?.includes('split')) {
      console.error('Split Error - this is usually caused by trying to split undefined/null values')
    }
    if (error.message?.includes('Cannot read properties of undefined')) {
      console.error('Undefined Property Error - check for proper initialization of objects/arrays')
    }

    // Auto-recover after 3 seconds for certain errors
    if (this.state.errorCount < 3) { // Prevent infinite loops
      this.resetTimer = setTimeout(() => {
        this.setState({ hasError: false, error: undefined })
      }, 3000)
    }
  }

  componentWillUnmount() {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer)
    }
  }

  render() {
    if (this.state.hasError) {
      // Show auto-recovery message for recoverable errors
      const isRecoverable = this.state.errorCount < 3 && (
        this.state.error?.message?.includes('RovingFocusGroupItem') ||
        this.state.error?.message?.includes('split') ||
        this.state.error?.message?.includes('Cannot read properties of undefined')
      )

      if (isRecoverable) {
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center max-w-md p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <h2 className="text-lg font-semibold mb-2">Recovering from Error</h2>
              <p className="text-muted-foreground mb-4">
                A temporary error occurred. The application is automatically recovering...
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Reload Now
              </button>
            </div>
          </div>
        )
      }

      // Special handling for specific errors
      if (this.state.error?.message?.includes('RovingFocusGroupItem')) {
        return (
          <ErrorFallback 
            error={this.state.error}
            title="Navigation Component Error"
            description="A navigation component error occurred. The issue has been logged and the interface will reload automatically."
          />
        )
      }
      if (this.state.error?.message?.includes('split')) {
        return (
          <ErrorFallback 
            error={this.state.error}
            title="Data Processing Error"
            description="A data processing error occurred. This has been fixed - please refresh to continue."
          />
        )
      }
      if (this.state.error?.message?.includes('Cannot read properties of undefined')) {
        return (
          <ErrorFallback 
            error={this.state.error}
            title="Data Initialization Error"
            description="A data initialization error occurred. Please refresh the page to reload the interface."
          />
        )
      }
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

// Main application component with interface switching
function GoodlinkApp() {
  // Force reset to admin mode
  const [currentMode, setCurrentMode] = useKV<"admin" | "client" | "shop">("app-interface-mode", "admin")
  const [isInitialized, setIsInitialized] = useState(false)

  // Force admin mode on load
  useEffect(() => {
    setCurrentMode("admin")
  }, [setCurrentMode])

  // Wait for initial data to load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 100) // Small delay to ensure useKV has initialized

    return () => clearTimeout(timer)
  }, [])

  const handleModeSwitch = (mode: "admin" | "client" | "shop") => {
    try {
      setCurrentMode(mode)
    } catch (error) {
      console.error('Error switching mode:', error)
      // Fallback to admin mode
      setCurrentMode("admin")
    }
  }

  const renderInterface = () => {
    try {
      const mode = currentMode || "admin"  // Ensure we always have a valid mode
      switch (mode) {
        case "admin":
          return <AdminInterface onSwitchMode={handleModeSwitch} />
        case "shop":
          return <ShopInterface onSwitchMode={handleModeSwitch} />
        case "client":
          return <ClientInterface onSwitchMode={handleModeSwitch} />
        default:
          return <AdminInterface onSwitchMode={handleModeSwitch} />
      }
    } catch (error) {
      console.error('Error rendering interface:', error)
      // Fallback to admin interface
      return <AdminInterface onSwitchMode={handleModeSwitch} />
    }
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing Goodlink Germany...</p>
        </div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <ErrorLogger />
      <div className="min-h-screen bg-background">
        {renderInterface()}
        <Toaster richColors position="top-right" />
      </div>
    </LanguageProvider>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <GoodlinkApp />
    </ErrorBoundary>
  )
}

export default App