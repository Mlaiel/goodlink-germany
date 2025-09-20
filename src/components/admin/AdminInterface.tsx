import React from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { InventorySyncDashboard } from "@/components/InventorySyncDashboard"
import { BlogDashboard } from "@/components/BlogDashboard"
import { WhatsAppDashboard } from "@/components/WhatsAppDashboard"
import { AdminPanel } from "@/components/AdminPanel"
import { AgentControlPanel } from "@/components/AgentControlPanel"
import { GlobalAgentSettings } from "@/components/GlobalAgentSettings"
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
  Warning
} from "@phosphor-icons/react"

interface AdminInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function AdminInterface({ onSwitchMode }: AdminInterfaceProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV("admin-active-tab", "dashboard")

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <button 
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md"
      >
        <ShieldCheck className="h-4 w-4" />
        {t('nav.admin')}
      </button>
      <button 
        onClick={() => onSwitchMode("client")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
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
                <p className="text-sm text-muted-foreground">Admin Panel - System Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderModeSelector()}
              <LanguageSelector />
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Activity className="h-3 w-3 mr-1" />
                System Online
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
              System Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Robot className="h-4 w-4" />
              AI Agents Control
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              System Sync
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Gear className="h-4 w-4" />
              Admin Settings
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