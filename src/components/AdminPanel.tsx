import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Shield, 
  Users, 
  Gear as Settings, 
  ChartBar as BarChart3, 
  FileText, 
  Database,
  Activity,
  Warning as AlertTriangle,
  CheckCircle,
  Clock,
  TrendUp,
  UserCheck,
  Globe,
  Robot,
  ShoppingCart,
  Package,
  Storefront,
  Article,
  ArrowsClockwise as Sync,
  Eye,
  ShieldCheck as Security,
  EnvelopeSimple as Mail,
  Bell,
  WhatsappLogo,
  DiscordLogo,
  TelegramLogo,
  InstagramLogo,
  FacebookLogo,
  TwitterLogo,
  CloudCheck,
  CurrencyDollar,
  PaintBrush,
  Code,
  Key,
  ListPlus,
  ChartLine as Graph
} from '@phosphor-icons/react'
import { useLanguage } from './LanguageContext'
import { SpecializedAgentsPanel } from './admin/SpecializedAgentsPanel'
import { AIAgentMonitoringDashboard } from './admin/AIAgentMonitoringDashboard'
import { MarketplaceAgentsPanel } from './admin/MarketplaceAgentsPanel'
import { AIAgentsConfig } from './admin/AIAgentsConfig'
import { AgentAutomationConfig } from './admin/AgentAutomationConfig'
import { AgentPerformanceDashboard } from './admin/AgentPerformanceDashboard'
import { AgentDemoPanel } from './AgentDemoPanel'
import { AgentUsageGuide } from './AgentUsageGuide'
import { DemoInterface } from './DemoInterface'

interface SystemMetrics {
  uptime: string
  totalUsers: number
  activeUsers: number
  totalOrders: number
  systemHealth: 'healthy' | 'warning' | 'critical'
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
}

interface UserStats {
  totalRegistered: number
  activeToday: number
  newThisWeek: number
  premiumUsers: number
}

interface SystemSettings {
  maintenanceMode: boolean
  allowRegistrations: boolean
  enableNotifications: boolean
  enableAnalytics: boolean
  maxConcurrentUsers: number
  sessionTimeout: number
  siteName: string
  siteUrl: string
  adminEmail: string
  timezone: string
  defaultLanguage: string
  enableMultiLanguage: boolean
  enableSEO: boolean
  enableCache: boolean
  cacheTimeout: number
  backupEnabled: boolean
  backupFrequency: string
  enableDebugMode: boolean
  logLevel: string
  maxFileSize: number
  allowedFileTypes: string
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  enableSSL: boolean
}

interface AIAgentSettings {
  chatbotEnabled: boolean
  chatbotLanguages: string[]
  chatbotResponseTime: number
  listingAgentEnabled: boolean
  priceAgentEnabled: boolean
  inventoryAgentEnabled: boolean
  reviewAgentEnabled: boolean
  blogAgentEnabled: boolean
  prospectingAgentEnabled: boolean
  socialMediaAgentEnabled: boolean
  whatsappAgentEnabled: boolean
  telegramAgentEnabled: boolean
  discordAgentEnabled: boolean
  aiModelProvider: string
  maxTokensPerRequest: number
  temperatureSetting: number
  enableContextMemory: boolean
  maxConversationLength: number
}

interface MarketplaceSettings {
  amazonEnabled: boolean
  amazonApiKey: string
  amazonSecretKey: string
  amazonMarketplaceId: string
  ebayEnabled: boolean
  ebayApiKey: string
  ebaySecretKey: string
  kauflandEnabled: boolean
  kauflandApiKey: string
  ottoEnabled: boolean
  ottoApiKey: string
  cdiscountEnabled: boolean
  cdiscountApiKey: string
  bolEnabled: boolean
  bolApiKey: string
  allegroEnabled: boolean
  allegroApiKey: string
  walmartEnabled: boolean
  walmartApiKey: string
  autoSyncInventory: boolean
  syncFrequency: number
  enablePriceMonitoring: boolean
  priceUpdateFrequency: number
  enableOrderSync: boolean
  orderSyncFrequency: number
}

interface ShopSettings {
  shopEnabled: boolean
  shopName: string
  shopDescription: string
  shopLogo: string
  shopCurrency: string
  taxRate: number
  shippingEnabled: boolean
  freeShippingThreshold: number
  enablePaypal: boolean
  paypalClientId: string
  enableStripe: boolean
  stripePublishableKey: string
  stripeSecretKey: string
  enableKlarna: boolean
  klarnaUsername: string
  klarnaPassword: string
  enableInventoryTracking: boolean
  lowStockThreshold: number
  enableReviews: boolean
  enableWishlist: boolean
  enableCompareProducts: boolean
  enableCoupons: boolean
  enableGiftCards: boolean
  enableMultiCurrency: boolean
  enableGeoLocation: boolean
  enableSocialLogin: boolean
  enableGuestCheckout: boolean
}

interface BlogSettings {
  blogEnabled: boolean
  blogTitle: string
  blogDescription: string
  postsPerPage: number
  enableComments: boolean
  moderateComments: boolean
  enableSEO: boolean
  autoGeneratePosts: boolean
  postGenerationFrequency: string
  enableSocialSharing: boolean
  enableNewsletterSignup: boolean
  enableRSS: boolean
  enableSitemap: boolean
  defaultPostStatus: string
  enablePostScheduling: boolean
  enableFeaturedImages: boolean
  enableCategories: boolean
  enableTags: boolean
  enableAuthorProfiles: boolean
  enableRelatedPosts: boolean
}

interface SocialMediaSettings {
  facebookEnabled: boolean
  facebookPageId: string
  facebookAccessToken: string
  instagramEnabled: boolean
  instagramAccountId: string
  instagramAccessToken: string
  twitterEnabled: boolean
  twitterApiKey: string
  twitterApiSecret: string
  twitterAccessToken: string
  twitterAccessTokenSecret: string
  linkedinEnabled: boolean
  linkedinCompanyId: string
  linkedinAccessToken: string
  autoPostProducts: boolean
  autoPostBlogPosts: boolean
  postFrequency: string
  enableHashtags: boolean
  defaultHashtags: string
  enableAnalytics: boolean
}

export function AdminPanel() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV('admin-active-tab', 'overview')
  
  // Default settings
  const defaultSystemSettings: SystemSettings = {
    maintenanceMode: false,
    allowRegistrations: true,
    enableNotifications: true,
    enableAnalytics: true,
    maxConcurrentUsers: 1000,
    sessionTimeout: 30,
    siteName: 'Goodlink Germany',
    siteUrl: 'https://goodlink-germany.com',
    adminEmail: 'admin@goodlink-germany.com',
    timezone: 'Europe/Berlin',
    defaultLanguage: 'de',
    enableMultiLanguage: true,
    enableSEO: true,
    enableCache: true,
    cacheTimeout: 3600,
    backupEnabled: true,
    backupFrequency: 'daily',
    enableDebugMode: false,
    logLevel: 'info',
    smtpPassword: ''
  }
  const defaultAISettings: AIAg
    chatbotLanguag
    listingAgentEnabl
    inventoryAgentEna
    blogAgentEnable
   

    aiModelProvider: 'openai',
    temperatureSetting: 0
    maxConversationLength: 20

    amazonEnabled: true,
    amazonSecretKey: '',
    ebayEnabled: true,
    ebaySecretKey: '',
    kauflandApiKey: '',
    ottoApiKey: '',
    cdiscountApiKey: '',
    bolApiKey: '',
    allegroApiKey: '',
    walmartApiKey: '',
    syncFrequency: 15,
    priceUpdateFrequency: 60,
    orderSyncFrequency: 30

    shopEnabled: true,
   

    shippingEnabled: true,
    enablePaypal: true,
    enableStripe: tru
    stripeSecretKey: '',
    klarnaUsername: '',
    enableInventoryTra
    enableReviews: 
    enableCompareProdu
    enableGiftCards: true,
    enableGeoLocation: 
    enableGuestCheckou

    blogEnabled: true,
    blogDescription: 'La
    enableComments: t
    enableSEO: tru
    postGenerationFrequen
    enableNewsletterSi
    enableSitemap: true,
    enablePostScheduli
    enableCategories: true,
    enableAuthorProfil
  }
  const defaultSocialSettings
    facebookPageId: '',
    instagramEnabled: true
   

    twitterAccessToken: '',
    linkedinEnabled: t
    linkedinAccessToken: '',
    autoPostBlogPosts: true,
    enableHashtag
    enableAnalytics: tru

  const [systemSettings, s
  const [marketplaceSettings, s
  const [blogSettings, 

  const systemMetrics: 
    totalUsers: 15847,
    totalOrders: 45678,
    memoryUsage: 68,
    diskUsage: 73

    totalRegistered: 15847,
    newThisWeek: 156,
  }
  const recentLogs = [
    { id: 2, level: 'warning', m
    { id: 4, level: 'inf
  ]
  const getHealthColor = (heal
      case 'healthy': return
      case 'critical': retur
    }


      case 'warning': return <AlertTriangle c
      default: return 
  }
  const getLevelIcon = (level: string) => {
      case 'error': r
      case 'info': return
    }

    <div className="space-y-
      <div className="relative overflo
        <div className="relati
            <div className="flex 
                <Shi
              <div>
                  {t('admin.title')
                <p className="t
                </p>
            </div>
              <div cl
                <span className
              <div className
   

          <div className="flex flex-col items-end gap-
              <CloudCheck 
            </Button>
              <div>Last upda
            </div>
        </div>

      <div className="gri
          <CardContent
              <div>
                <p classNam
              <Clock className="h
          </CardContent>

          <CardContent class
              <div>
                <p className
              <Users classN
          </CardContent>

          <CardContent cl
   

              <Shoppi
          </CardContent>

          <CardContent className="p-6">
              <div>
                <p className="text-3xl font-bold text-orange-700">12</p>
              <Robot className="h-8 w-8 text-orange-500" />

      </div>
      {/* Modern Navigation Categories *
        {/* Tab Navi
          <TabsTrigger
          <TabsTrigger
          <TabsTrigger 
          <TabsTrigger value
          <TabsTrigg
          <TabsTr
        </TabsLis
   

              <div className="fl
                  <BarChart
                <Badge
              <h3 cla
              <div cl
   

                      
                >
                  {t('admin.overview')}
                <button 
                  className={`modern-tab-trigger w-full justify-start p-3 rounded-lg transition-all flex items-center ${
                      ? "bg-blue-600 text-white shadow-md" 
   

                </button>
            </CardCon

          <Card className="admin-nav-card group
              <div className="flex items-cen
                  <Robot className="h
     
   

                  onClick={() => setActiveTab("ai-agents")}
                    a
                      : "hover:bg-purple-100"
                >
                  {t('nav.agents')} {t('common.configuration')}
                <button 
     
   

                  <Storefront className="h-
                </bu
                  onClick={() => setActiveTab("specialized")}
                    activeTab === "specialized" 
                      : "hover:bg-purple-100"
                >
     
   

          
                  }`}
                  <Eye className="h
                </button>
            </CardContent>

          <Card className="admin-nav-
              <div className="flex items-center justi
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                <Badge variant="secondary" className="bg-
              <h3 cl
              <div 
                  onClick={() => setActiveTab("shop")}
                    activeTab === "s
                     
                >
                  {t('nav.shop')} {t('admin.setting
                <but
                  cl
                  
                  }`}
                  <Package className="h-4 w-4 mr-2" />
                </button>
            </CardContent>

          <Card className="admin-nav-card group hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-o
              <div className="flex items-center justify-bet
                  <Article className="h-6 w-6 text-orange-600" />
                <Bad
              <h3 
              <d
                  onClick={() => setActiveTab("blog")}
                    activeTab === "blog" 
                      : "hover:bg-orange-100"
                >
                  {t(
                <button 
                  className={`modern-tab-trigger w-full justify-start p-
                      ? "bg-orange-600 text-white shadow-md" 
                  
                
              
            

        {/* System Administration 
          <CardHeader>
              <div className="p-2 bg-slate-200 rounded-lg">
              </div>
            </CardTitle>
              {t('a
          </CardHeader>
            <div className="grid gap-4 md:grid-cols-2">
                onCl
                  activeTab === "system" 
                  
              >
               

                  <Settings className={`h-5 w-5 ${
                      ? "text-white" 
                  }`} />
                <di
                  <div className="text-sm opacity-70">{t('admin.coreManagement')}
              </button>
                onCl
                  activeTab === "users" 
                  
              >
               

                  <Users className={`h-5 w-5 ${
                      ? "text-white" 
                  }`} />
                <di
                  <div className="text-sm opacity-70">{t('admin.users')} accounts, 
              </button>
          </CardCont

        <TabsConte
          <Card classNam
              <

              <CardDescription>Real-time server {t('common.performance')} and resource utilization
            <CardContent>
                <div className="space-y-3">
                   
                      {t('common.memory')} {t('common.usage')}
                    <span className="text-sm font-bold text-blue-600">{s
                  <d
                      className="bg-gradient-to-r from-blue
                  
                </div>
               
            

                    <span className="text-
                  <div className="w-full bg-secondary rounded-full h-3">
                      classNam
                    />
                </div>
                <div className="space-y-3">
                    <span className="text-sm font-medium flex it
                      {t('common.disk')} {t('common.usage')}
                    <span className="text-sm font-bold text-orange-6
                  <div className="w-full bg-secondary rounded-full h
                      className="bg-gradient-to-r from
                    />
                </div>
            </CardContent>

          <Card>
              <Card

              <CardDescription>Latest system events and notificati
            <CardContent>
                {recentLogs.map((log) => (
                    {getLevelIcon(log.lev
                      <div className="flex items-center justify-betwee
                        <Badge variant={log.level === 'error' ? 'destructive' : log.level === 'warning
                        </Badge>
                      
                        <span>•</span>
                    
                  </div>
              </div>
          </Card>

        <TabsContent value="system" className="space-y-6">
            {/* Basic Settings */}
              <CardHeader>
                  <Settings className="h-5 w-5" />
                </CardTitle>
              </CardH
                <
                    <Label htmlFor="siteName">Site
                      id="siteNam
                      onC
                      }
                  </div>
                  <div className="space-y-2">
                    <Input 
                      value={systemSettings?.siteUrl || ''}
                        setSystemSettings((
                    /

                    <Label htmlFor="adminEmail">Adminis
                      id="adminEmail"
                      val
                    
                    />


                      value={syst
                        setSystemSettings((prev = defaultSystemSettings) => ({ ...prev, timezone: value }))
                    >
                        <SelectValue />
                      <SelectContent>
                        <SelectItem value="Europe/London">Europ
                      
                      </SelectContent>
                  </
                  <div className="space-y-2">
                    <Select 
                      onValueChange={(val
                      }
                      <SelectTrigger>
                      </SelectTrigger>
                        <SelectItem value="de"
                        <SelectItem value="fr">French</Select
                      </SelectContent>
                  </d
              </C

            <Card>
                <CardTitl
                  Securi
                <CardDescription>System security and performance con
              <CardContent className="space-y-6">
                  <div className="flex items-center jus
                      <Label>Maintenance Mode</Label>
                        Enable maintenance mo
                    <
                 
                        setSystemSettings((prev = default
                    />

                    <div
                      <p className="text-sm text-muted-foregr
                      </p>
                    <Switch 
                      onCheckedChange={(checked) => 
                      }
                  </d
                 
                      <Label>Enable Cache</Label>
                        Enable syste
                    </div
                      ch
                        setSystemSettings((prev = defaultSyst
                    />

                    <div className="space-y-0.5">
                      <p className="text-sm t
                     
                 
                      onCheckedChange={(checked) =
                      }
                  </div>
                  <d
                    <Input
                 

                          ...prev,
                        }))
                    />

                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      id="sessionTimeout"
                      
                        setSystemSettings((prev = defaultSystemSettings) => ({ 
                    
                      }
                  </div>
              </CardContent>
          </div>

        <TabsContent value="ai-agents" className="space-y-6">
        </TabsContent>
        {/* Agent Monitoring Tab */}
          <AgentPerformanceDashboard />
        
          <Market

        <TabsContent value="spe
        </TabsContent>
        {/* Agent Demos 
          <DemoInterface />

        <TabsContent value="marketplaces" classNa
            {/* Amazon Configuration */}
              <CardHeader>
                  <Pa
                <
              </CardHeader>
                <div className="flex it
                  <Switch
                    
                    }
                <

                    id="amazonApiKey"
                    placeholder="Enter Amazon SP-API Key"
                    onChange={(e) => 
                    }
                </div>
                  <Label htmlFor="amazonSecretKey">Amazon Secret 
                    id
                    placeholder="Enter Amazon Secret Key"
                    
                    }
                </div>
                  <Label htmlFor="amazonM
                    valu
                      setMarketplaceSettings((prev = d
                  >
                      <SelectValue />
                    <SelectContent>
                      <SelectItem value="ATVP
                     
                 
              </CardContent>

            <Card>
                <CardTit
                  Other Marketplaces
                <CardDescription>Configure additional marketplace integrations</CardDescription>
              <CardContent className="space
                  <div className="space-y-0.5">
                    <p className="text-sm tex
                  <Sw
                 
                    }
                </div>
                  <div cl
                    
                  <Switch 
                 
              

                  <div className="space-y-0.5
                    <p className="text-sm text-muted-foreground">German online marketplace</p>
                  <Swi
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <d
                    <p className="t
                  <Switc
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <div 
                    <p 
                  <Switch 
                    on
                    }
                </div>
                  <div className="space-y
                    <p className="text-sm text-muted-foreground">
                  <Switch 
                   
               
                </div>
            </Card>

          <Card>
              <CardT
                Synchronization Settings
              <CardDescription>Configure au
            <CardContent>
                <div className="space-y-
                    <Lab
                      
                        setMarketplaceSetti
                    />
                  <div className="space-y-2">
                    <I
                      v
                      
                          syncFrequency: parseInt(e.t
                      }
                  </div>

                  <div className="flex items-center justify-b
                   
               
                      }
                  </div>
                    <Label>Price Upda
                      type="number" 
                    
                          ...prev, 
                        }))
                    />
                </div>
                <div cla
                    <L
                      checked={marketplaceS
                        setMarketplaceSettings((prev = defaultMarketpl
                    />
                  <div
                    <In
                  
                        
               

                  </div>
              </div>
          </Card>
        {/* Shop Settings Tab */}
          <div className
            <Card>
                <CardTitle className="flex items
                  Shop Configuration
                <CardDescr
              <CardContent className="space-y-4">
                  <Label>
                    check
                      setShopSettings((prev = defaultShop
                  />
                <div className="space-y-2">
                  <Input 
                    value={shopSettings?.shopName || '
                      setShopSetti
                  />
                <div className="space-y-2">
                  <Texta
                    value={shopSettings?.shopDescription || ''}
                      set
                  />
                <div className="space-y-2">
                  <Sel
                    onVa
                    }

                    </SelectTrigger>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                </div>
                  <Label ht
                    id="taxRate"
                    step
                    onChange={(e) => 
                        .
                      }))
                  />
              </CardCo

            <Card>

                  Payment Methods
                <CardDescription>Configure accepted payment methods</
              <CardContent className="space-y-4">
                  <div className="space-y-0.5">
                    <p className
                  <Switch 
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <div cl
                    <p className="text-sm text-muted-foreground">Accept credit card payments</p>
                  <Switch 
                    on
                    }
                </div>
                  <d
                    <p cla
                 

                    }
                
                  <Label
                    id="freeShippingThreshold"
                    value={shopSettings?.freeShi
                      setShopSettings(
                        fr
                    }
                </div>
            </Card>

          <Card>
              <CardTitle className="flex items-center gap-2">
                Shop Features
              <CardDescription>Enable or disable shop 
            <CardContent>
                <div className="flex items-center justify-between">
                  <Switch 
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <Label>Wishlist</Label>
                    checked={shopSettings?.enableWis
                      setShopSettings(
                  />
                <div classNa
                  <Switch 
                    onCh
                   
                </di
                  <Label>C
                 
                      

                <div className="fle
                  <Switch 
                    onCheckedChange={(checked) => 
                    }
                </
                  <Label>G
                    checked={shopSettings?.enableGuestCheckout 
                      setShopSettings((prev = defa
                  />
              </div>
          </Card>

        <TabsContent value="blog" className="spac
            <Card>
                <CardTitle className="flex it
                  Blog Configuration
                <CardDescri
              <CardContent classNam
                  <Label>Enable Blog</Label>
                    checked={blogSettin
                      setBlogSettings((prev = defaultBlogSettings) => ({ ...prev, blogEnabled: checked }))
                  />
                <div c
                  <Input

                      setBlogSettings((prev =
                  />
                <div classN
                  <Textarea 
                    value={blogSettings?.blogDescription ||
                      setBlogSettings((
                  />
                <div cl
                  <Inp
                    type

                        ...prev, 
                      }))
                  />
                <div className="flex 
                    <Label>Auto-Ge
                      Use AI to generate blog posts automatica
                  </div>
                    checked={blogSettings?.autoGeneratePosts || true}
                      s
                  />
              </CardCont

              <CardHeader>
                  <PaintBrush className="h-5 w-5" />
                </CardTitle>
              </CardHeader>
                <div className="flex items-cente
                  <Switch 
                    onC
                    }
                </div>
                  <Label>Social Sharing
                    checked={blogSetti
                      setBlogSettings
                  />
                <div className="flex items-center justify-between">
                  <Switch 
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <Label>RSS 
                    chec

                  />
                <div className="flex items-center justify-between">
                  <Switch 
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <Labe
                    v
                      setBlogSettings
                  >
                      <SelectValue />
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectIte
                    </SelectContent>
                </div>
            </Card>
        </TabsContent>
        {/* Social Media Tab 
          <div className
            <Card>
                <CardTitle c
                  F

              <CardContent className="spac
                  
                    checke
                      setSocialSettings((prev = defaultSocialSe
                  />
                <div className="space-y-
                  <Input 
                    value={socialSettings?.facebookPageId || ''}
                      setSo
                  />
                <div className="flex items-
                  <Switch 
                    onCheckedChange={(checked) =>
                    }
                </div>
                  <Label htmlFor="instagramAccountId">Instagram Ac
                    id="in
                    onChan
                    }
                </div>
            </Card>
            {/* Twitter & LinkedIn */}
              <CardHead
                  <Twi
                </CardTi

                <div className="flex items-center justify-between">
                  <Switch 
                    onCheckedChange={(checked) => 
                    }
                </div>
                  <Label h
                    id="tw
                    value={s
                      setSocialSettings((prev = defaultSocialSettings) => 
                  />
                <div className="flex items-center justify-between">
                  <Swit
                    on
                    }

                  <Label htmlFor="linkedinCompanyId">LinkedIn Company
                    id="linkedinCompanyId"
                    onChange={(e) => 
                    }
                </div>
            </Card>

          <Card>
              <CardTitle className="flex items-center gap-2">
                Social Media Automation
              <CardDescription>Configure automated social media posting</CardDescription>
            <CardConten
                <div c
                    <Lab

                        setSocialSettings((prev = defaultSocialSettin
                    />
                  <div className="flex items-ce
                    <Switch 
                      onCheckedChange={(checked) => 
                      }
                  </div>

                  <div className="space-y-2">
                    <Select 
                      onValueChange={(value) => 
                      }
                      
                      </

                        <SelectItem value="we
                    </Select>
                  <div clas
                    <Switch 
                      onCheckedChang
                      }
                  </div>

                  <div className="s
                    <Textarea 
                      place
                      o
                      
                  </div>

          </Card>

        <TabsContent value=
            <Card className="border-l-4 b
                <div className="flex
                    <p className="text-sm font-medium text-blue-60
                  </div>
                </div>
            </Card>
            <Card className="border-l-4 border-l-green-500">
                <div classN
                    <p 
                  </di
                </div>
            </Card>
            <Card className=
                <di
                
                  </di

            </Card>
            <Card className="border-l-4 border-l-amber-500">
                <div className="fle
                    <p
        
                </div>
            </Card>

            <CardHeade
        
              </CardTitle>
            </CardHeader>
              <div cla

                    <Eye className="h-
                  </Button>
                    <FileText classN
                  </Bu

                  </Button>
                
                  <div clas
                      

                      <span>Registration
                    </div>
                  <div className="divide-y">
                      <div key={i} class
                  
                          
                            <span className="font-medium">User 
                          <span className="text-m
                            {i === 1
                          <B
                          </Badge>
                          <
                              <Eye className="h-3
                            </Button>
                              <Settings className="h-3 w-3
                          
                        </div>
                    ))}
                </div>
            </CardCon
        </TabsConten
    </div>
}


































































































































































































































































































































































































































































































































































































































































































































































































































































































































