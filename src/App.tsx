import React, { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Warning, House, Gear, ShoppingCart } from "@phosphor-icons/react"

// Simplified error boundary
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
    console.error('Error details:', { error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Warning className="h-5 w-5" />
                Application Error
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The application encountered an error. Please refresh the page to try again.
              </p>
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full"
              >
                Refresh Page
              </Button>
              {this.state.error && (
                <details className="text-xs text-muted-foreground">
                  <summary>Technical Details</summary>
                  <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Simple interface selector component
function InterfaceSelector() {
  const [currentInterface, setCurrentInterface] = useState<"client" | "admin" | "shop">("client")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Goodlink Germany</h1>
              <Badge variant="outline">
                {currentInterface === "client" ? "Customer Portal" : 
                 currentInterface === "admin" ? "Admin Panel" : "Shop Dashboard"}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={currentInterface === "client" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentInterface("client")}
              >
                <House className="h-4 w-4 mr-2" />
                Customer
              </Button>
              <Button
                variant={currentInterface === "shop" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentInterface("shop")}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop
              </Button>
              <Button
                variant={currentInterface === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentInterface("admin")}
              >
                <Gear className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {currentInterface === "client" && (
            <Card>
              <CardHeader>
                <CardTitle>Customer Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Welcome to Goodlink Germany - your trusted bridge between Europe and China for premium medical devices and automotive components.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">🏥 Medical Devices</h3>
                        <p className="text-sm text-muted-foreground">800+ certified components</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">🚗 Automotive Parts</h3>
                        <p className="text-sm text-muted-foreground">600+ quality components</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">🔌 Connectors & Cables</h3>
                        <p className="text-sm text-muted-foreground">500+ variants available</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentInterface === "shop" && (
            <Card>
              <CardHeader>
                <CardTitle>Shop Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Manage your business operations and B2B partnerships.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">€2.1M</div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">847</div>
                        <p className="text-sm text-muted-foreground">Active Orders</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">89%</div>
                        <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">AI Agents Active</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentInterface === "admin" && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Control Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    System administration and configuration management.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">🤖 AI Agents</h3>
                        <p className="text-sm text-muted-foreground">Manage specialized AI agents for medical and automotive expertise</p>
                        <Badge className="mt-2">12 Active</Badge>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">🔄 Inventory Sync</h3>
                        <p className="text-sm text-muted-foreground">Real-time synchronization across all marketplaces</p>
                        <Badge variant="outline" className="mt-2">Live</Badge>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">📊 Analytics</h3>
                        <p className="text-sm text-muted-foreground">Advanced performance monitoring and insights</p>
                        <Badge variant="secondary" className="mt-2">Updated</Badge>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">⚙️ Configuration</h3>
                        <p className="text-sm text-muted-foreground">Shop settings and blog management</p>
                        <Badge variant="outline" className="mt-2">Ready</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Toaster />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <InterfaceSelector />
    </ErrorBoundary>
  )
}

export default App