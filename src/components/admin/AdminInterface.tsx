import React from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { ShopConfigPanel } from "@/components/admin/ShopConfigPanel"
import { BlogConfigPanel } from "@/components/admin/BlogConfigPanel"
import { InventorySyncDashboard } from "@/components/InventorySyncDashboard"
import { BlogDashboard } from "@/components/BlogDashboard"
import { WhatsAppDashboard } from "@/components/WhatsAppDashboard"
import { AdminPanel } from "@/components/AdminPanel"
import { AgentControlPanel } from "@/components/AgentControlPanel"
import { GlobalAgentSettings } from "@/components/GlobalAgentSettings"
import goodlinkLogo from "@/assets/images/goodlink-logo.svg"
import { 
  ChartLine, 
  Database,
  Robot,
  Gear,
  ShieldCheck,
  UserCircle,
  Storefront,
  Activity,
  Users,
  Warning,
  ShoppingBag,
  Article
} from "@phosphor-icons/react"

interface AdminInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function AdminInterface({ onSwitchMode }: AdminInterfaceProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV("admin-active-tab", "dashboard")

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <Button 
        size="sm"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm"
      >
        <ShieldCheck className="h-4 w-4" />
        {t('nav.admin')}
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onSwitchMode("client")}
        className="inline-flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
      >
        <UserCircle className="h-4 w-4" />
        Client
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onSwitchMode("shop")}
        className="inline-flex items-center gap-2 hover:bg-green-50 hover:border-green-200 transition-colors"
      >
        <Storefront className="h-4 w-4" />
        Shop
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={goodlinkLogo} 
                alt="Goodlink Germany Logo" 
                className="h-12 w-auto"
              />
              <div className="border-l pl-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-sm text-muted-foreground">System Management & Configuration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderModeSelector()}
              <LanguageSelector />
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200 shadow-sm"
              >
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-muted/50 p-1 rounded-lg shadow-sm">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <ChartLine className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="shop-config" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop Config
            </TabsTrigger>
            <TabsTrigger 
              value="blog-config" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Article className="h-4 w-4" />
              Blog Config
            </TabsTrigger>
            <TabsTrigger 
              value="agents" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Robot className="h-4 w-4" />
              AI Agents
            </TabsTrigger>
            <TabsTrigger 
              value="inventory" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Database className="h-4 w-4" />
              Sync
            </TabsTrigger>
            <TabsTrigger 
              value="monitoring" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Activity className="h-4 w-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Gear className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Management System</h3>
                <p className="text-muted-foreground">
                  Manage user accounts, permissions, and access control
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shop-config" className="space-y-6">
            <ShopConfigPanel />
          </TabsContent>

          <TabsContent value="blog-config" className="space-y-6">
            <BlogConfigPanel />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <AgentControlPanel 
              agent={{
                id: "default",
                name: "Agent Control Panel",
                type: "management",
                status: "active",
                settings: {}
              }} 
              onConfigUpdate={() => {}} 
            />
            <GlobalAgentSettings 
              onClose={() => {}} 
            />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <InventorySyncDashboard />
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <BlogDashboard />
            <WhatsAppDashboard />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <AdminPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}