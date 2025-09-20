import React from "react"
import { useKV } from "@github/spark/hooks"
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/components/LanguageContext"
import { AdminInterface } from "@/components/admin/AdminInterface"
import { ClientInterface } from "@/components/client/ClientInterface"
import { ShopInterface } from "@/components/shop/ShopInterface"
import { Warning } from "@phosphor-icons/react"

// Error boundary component for robust error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error boundary caught:', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary details:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-64 text-center">
          <div className="space-y-2">
            <Warning className="h-8 w-8 text-orange-500 mx-auto" />
            <p className="text-muted-foreground">Something went wrong. Please refresh the page.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function AppContent() {
  const [userMode, setUserMode] = useKV("user-mode", "admin") // admin, client, shop

  const handleModeSwitch = (mode: "admin" | "client" | "shop") => {
    setUserMode(mode)
  }

  // Render the appropriate interface based on user mode
  const renderInterface = () => {
    switch (userMode) {
      case "admin":
        return <AdminInterface onSwitchMode={handleModeSwitch} />
      case "client":
        return <ClientInterface onSwitchMode={handleModeSwitch} />
      case "shop":
        return <ShopInterface onSwitchMode={handleModeSwitch} />
      default:
        return <AdminInterface onSwitchMode={handleModeSwitch} />
    }
  }

  return (
    <ErrorBoundary>
      {renderInterface()}
    </ErrorBoundary>
  )
}

function App() {
  // Progressive error checking
  try {
    return (
      <LanguageProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </LanguageProvider>
    )
  } catch (error) {
    console.error('App component error:', error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Warning className="h-8 w-8 text-orange-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Application Error</h1>
          <p className="text-muted-foreground">Please check the console for details and refresh the page.</p>
        </div>
      </div>
    )
  }
}

export default App