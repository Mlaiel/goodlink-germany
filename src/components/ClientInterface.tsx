import React from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { InventorySyncDashboard } from "@/components/InventorySyncDashboard"
import { BlogDashboard } from "@/components/BlogDashboard"
import { 
  ChartLine, 
  Package, 
  Storefront, 
  Robot, 
  Database,
  Article,
  ShieldCheck,
  CheckCircle,
  UserCircle
} from "@phosphor-icons/react"

// Import dashboard components from main App
import { Dashboard, AIAgentsView, ProductsView } from "@/components/DashboardComponents"

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
      <LanguageSelector />
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Goodlink Germany</h1>
                <p className="text-sm text-muted-foreground">
                  {t('user.welcome')} - Client Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderModeSelector()}
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Client Portal Active
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <ChartLine className="h-4 w-4" />
              {t('nav.dashboard')}
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {t('nav.products')}
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              {t('nav.inventory')}
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <Article className="h-4 w-4" />
              {t('nav.blog')}
            </TabsTrigger>
            <TabsTrigger value="ai-agents" className="flex items-center gap-2">
              <Robot className="h-4 w-4" />
              {t('nav.agents')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <ProductsView />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <InventorySyncDashboard />
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <BlogDashboard />
          </TabsContent>

          <TabsContent value="ai-agents" className="mt-6">
            <AIAgentsView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}