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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Reorganized navigation with clear separation */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t('admin.title')}</h2>
              <p className="text-muted-foreground">{t('admin.overview')}</p>
            </div>
            
            {/* Main Admin Navigation - Grid Layout for better separation */}
            <div className="grid grid-cols-4 gap-4">
              {/* Core Management Section */}
              <div className="col-span-4 mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t('admin.coreManagement') || 'Core Management'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'dashboard' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ChartLine className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('nav.dashboard')}</div>
                        <div className="text-xs opacity-70">System overview & metrics</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'users' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('admin.users')}</div>
                        <div className="text-xs opacity-70">User accounts & permissions</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Configuration Section */}
              <div className="col-span-4 mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t('admin.configuration') || 'Configuration'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('shop-config')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'shop-config' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('admin.shopConfig') || 'Shop Config'}</div>
                        <div className="text-xs opacity-70">Store settings & preferences</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('blog-config')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'blog-config' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Article className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('admin.blogConfig') || 'Blog Config'}</div>
                        <div className="text-xs opacity-70">Content management settings</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* AI & Automation Section */}
              <div className="col-span-4 mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t('admin.aiAutomation') || 'AI & Automation'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('agents')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'agents' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Robot className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('nav.agents')}</div>
                        <div className="text-xs opacity-70">AI agent configuration</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'inventory' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('admin.sync') || 'Sync'}</div>
                        <div className="text-xs opacity-70">Inventory synchronization</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* System & Monitoring Section */}
              <div className="col-span-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t('admin.systemMonitoring') || 'System & Monitoring'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab('monitoring')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'monitoring' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('admin.monitoring') || 'Monitoring'}</div>
                        <div className="text-xs opacity-70">System health & analytics</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeTab === 'settings' 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md' 
                        : 'bg-card hover:bg-muted border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Gear className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{t('admin.settings')}</div>
                        <div className="text-xs opacity-70">Global system settings</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t('admin.userManagement') || 'User Management System'}</h3>
                <p className="text-muted-foreground">
                  {t('admin.userManagementDesc') || 'Manage user accounts, permissions, and access control'}
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