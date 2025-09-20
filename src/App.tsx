import React, { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { LanguageProvider } from "@/components/LanguageContext"
import { AdminInterface } from "@/components/AdminInterface"
import { ClientInterface } from "@/components/ClientInterface"
import { ShopInterface } from "@/components/ShopInterface"
import { ErrorFallback } from "@/components/ErrorFallback"
import { useKV } from "@github/spark/hooks"

// Enhanced error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean, error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', { error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

// Main application component with interface switching
function GoodlinkApp() {
  const [currentMode, setCurrentMode] = useKV<"admin" | "client" | "shop">("app-interface-mode", "client")

  const handleModeSwitch = (mode: "admin" | "client" | "shop") => {
    setCurrentMode(mode)
  }

  const renderInterface = () => {
    switch (currentMode) {
      case "admin":
        return <AdminInterface onSwitchMode={handleModeSwitch} />
      case "shop":
        return <ShopInterface onSwitchMode={handleModeSwitch} />
      case "client":
      default:
        return <ClientInterface onSwitchMode={handleModeSwitch} />
    }
  }

  return (
    <LanguageProvider>
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