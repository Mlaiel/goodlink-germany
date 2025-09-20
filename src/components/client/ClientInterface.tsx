import React from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ClientDashboard } from "@/components/client/ClientDashboard"
import { 
  ChartLine, 
  Package, 
  Storefront, 
  ShoppingCart,
  Robot,
  ChatCircle,
  ShieldCheck,
  UserCircle,
  TrendUp,
  Eye,
  Star,
  Activity
} from "@phosphor-icons/react"

interface ClientInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function ClientInterface({ onSwitchMode }: ClientInterfaceProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV("client-active-tab", "dashboard")

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => onSwitchMode("admin")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
      >
        <ShieldCheck className="h-4 w-4" />
        Admin
      </button>
      <button 
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md"
      >
        <UserCircle className="h-4 w-4" />
        Client
      </button>
      <button 
        onClick={() => onSwitchMode("shop")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
      >
        <Storefront className="h-4 w-4" />
        Shop
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Goodlink Germany</h1>
                <p className="text-sm text-muted-foreground">Business Dashboard - Manage Your Commerce</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderModeSelector()}
              <LanguageSelector />
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Activity className="h-3 w-3 mr-1" />
                Business Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <ChartLine className="h-4 w-4" />
              Business Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders & Sales
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <TrendUp className="h-4 w-4" />
              Marketing Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <ChatCircle className="h-4 w-4" />
              Customer Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <ClientDashboard />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Product Management</h3>
                <p className="text-muted-foreground">
                  Add, edit, and manage your product catalog across all marketplaces
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Orders & Sales Management</h3>
                <p className="text-muted-foreground">
                  Track orders, manage fulfillment, and analyze sales performance
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <TrendUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Marketing & Promotion Tools</h3>
                <p className="text-muted-foreground">
                  Create campaigns, manage ads, and boost your sales with AI-powered marketing
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Business Analytics</h3>
                <p className="text-muted-foreground">
                  Deep insights into your business performance and customer behavior
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <ChatCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Customer Support Hub</h3>
                <p className="text-muted-foreground">
                  Manage customer inquiries, reviews, and support tickets
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}