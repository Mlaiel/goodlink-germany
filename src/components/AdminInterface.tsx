import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AllAgentsPanel } from "@/components/admin/AllAgentsPanel"
import { AgentDemoPanel } from "@/components/AgentDemoPanel"
import { 
  CheckCircle,
  ShieldCheck,
  UserCircle,
  Storefront,
  ChartBar,
  Users,
  Gear,
  Monitor,
  Rocket,
  ShoppingCart,
  CurrencyDollar,
  FileText,
  TrendUp,
  Calendar,
  Target,
  Palette,
  Globe,
  Activity,
  Warning,
  Play,
  Copy,
  Download,
  Upload,
  Eye,
  ArrowRight,
  Lightning,
  Brain
} from "@phosphor-icons/react"

interface AdminInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function AdminInterface({ onSwitchMode }: AdminInterfaceProps) {
  const { t } = useLanguage()
  const [demoResults, setDemoResults] = useState<Record<string, any>>({})
  const [isSimulating, setIsSimulating] = useState<Record<string, boolean>>({})

  // Simulation functions
  const simulateProductImport = async () => {
    setIsSimulating(prev => ({ ...prev, productImport: true }))
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result = {
      success: true,
      imported: 247,
      updated: 89,
      errors: 3,
      time: new Date().toLocaleTimeString(),
      details: [
        { sku: "GER-001", name: "iPhone 15 Pro Max", status: "imported", price: "€1,199.00" },
        { sku: "GER-002", name: "Samsung Galaxy S24", status: "updated", price: "€899.99" },
        { sku: "GER-003", name: "MacBook Pro 16''", status: "imported", price: "€2,499.00" },
        { sku: "GER-004", name: "AirPods Pro", status: "error", reason: "Invalid category" }
      ]
    }
    
    setDemoResults(prev => ({ ...prev, productImport: result }))
    setIsSimulating(prev => ({ ...prev, productImport: false }))
  }

  const simulateOrderProcessing = async () => {
    setIsSimulating(prev => ({ ...prev, orderProcessing: true }))
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const result = {
      success: true,
      processed: 47,
      shipped: 34,
      pending: 13,
      time: new Date().toLocaleTimeString(),
      orders: [
        { id: "#ORD-2847", customer: "Klaus Mueller", status: "shipped", tracking: "DHL123456789" },
        { id: "#ORD-2846", customer: "Anna Schmidt", status: "processing", eta: "2 hours" },
        { id: "#ORD-2845", customer: "Hans Weber", status: "shipped", tracking: "UPS987654321" }
      ]
    }
    
    setDemoResults(prev => ({ ...prev, orderProcessing: result }))
    setIsSimulating(prev => ({ ...prev, orderProcessing: false }))
  }

  const simulateSEOAnalysis = async () => {
    setIsSimulating(prev => ({ ...prev, seoAnalysis: true }))
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const result = {
      success: true,
      score: 92,
      improvements: 8,
      time: new Date().toLocaleTimeString(),
      analysis: {
        "Title Tags": { score: 95, status: "good", suggestions: "2 pages need optimization" },
        "Meta Descriptions": { score: 88, status: "warning", suggestions: "12 pages missing meta descriptions" },
        "Internal Links": { score: 94, status: "good", suggestions: "Well structured" },
        "Page Speed": { score: 89, status: "good", suggestions: "Optimize 3 large images" },
        "Mobile Usability": { score: 97, status: "excellent", suggestions: "Perfect mobile experience" }
      }
    }
    
    setDemoResults(prev => ({ ...prev, seoAnalysis: result }))
    setIsSimulating(prev => ({ ...prev, seoAnalysis: false }))
  }

  const simulateBlogGeneration = async () => {
    setIsSimulating(prev => ({ ...prev, blogGeneration: true }))
    
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const result = {
      success: true,
      title: "Die Zukunft des E-Commerce in Deutschland 2025",
      wordCount: 1847,
      seoScore: 94,
      time: new Date().toLocaleTimeString(),
      content: `# Die Zukunft des E-Commerce in Deutschland 2025

## Einleitung
Der deutsche E-Commerce-Markt steht vor revolutionären Veränderungen...

## Haupttrends
1. **KI-gestützte Personalisierung**: Individualisierte Shopping-Erlebnisse
2. **Nachhaltiger E-Commerce**: Umweltbewusste Konsumentscheidungen
3. **Social Commerce**: Integration sozialer Medien in den Kaufprozess

## Technologische Innovationen
- Voice Commerce und Smart Speaker
- Augmented Reality Shopping
- Blockchain für Lieferketten-Transparenz

*Automatisch generiert mit SEO-Optimierung für deutsche Suchbegriffe*`,
      keywords: ["E-Commerce Deutschland", "Online-Shopping 2025", "Digital Commerce", "KI Shopping"],
      readingTime: "7 Minuten"
    }
    
    setDemoResults(prev => ({ ...prev, blogGeneration: result }))
    setIsSimulating(prev => ({ ...prev, blogGeneration: false }))
  }

  const simulatePerformanceTest = async () => {
    setIsSimulating(prev => ({ ...prev, performanceTest: true }))
    
    await new Promise(resolve => setTimeout(resolve, 4000))
    
    const result = {
      success: true,
      time: new Date().toLocaleTimeString(),
      metrics: {
        "Page Load Time": { value: "1.2s", score: 92, status: "excellent" },
        "Time to Interactive": { value: "2.1s", score: 88, status: "good" },
        "Cumulative Layout Shift": { value: "0.05", score: 95, status: "excellent" },
        "First Contentful Paint": { value: "0.8s", score: 94, status: "excellent" },
        "Largest Contentful Paint": { value: "1.4s", score: 90, status: "good" }
      },
      recommendations: [
        "Optimize 2 images to reduce LCP by 0.2s",
        "Enable browser caching for static assets",
        "Minify CSS and JavaScript files"
      ]
    }
    
    setDemoResults(prev => ({ ...prev, performanceTest: result }))
    setIsSimulating(prev => ({ ...prev, performanceTest: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-sm md:text-lg">G</span>
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Goodlink Germany
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">
                  E-Commerce Automation & Business Intelligence Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-6">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button 
                  onClick={() => onSwitchMode("client")}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-border rounded-md hover:bg-muted transition-colors"
                >
                  <UserCircle className="h-3 w-3" />
                </button>
              </div>
              
              <div className="hidden lg:flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium shadow-sm">
                  <ShieldCheck className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">{t('admin.title')}</span>
                </button>
                <button 
                  onClick={() => onSwitchMode("client")}
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <UserCircle className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">{t('nav.client')}</span>
                </button>
                <button 
                  onClick={() => onSwitchMode("shop")}
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Storefront className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">{t('Shop Management')}</span>
                </button>
                <LanguageSelector />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-2 md:px-3 py-1">
                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">{t('system.operational')}</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <Tabs defaultValue="business-dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 mb-4 md:mb-6 h-auto">
            <TabsTrigger value="business-dashboard" className="flex-col sm:flex-row h-14 sm:h-10">
              <ChartBar size={16} className="mb-1 sm:mb-0 sm:mr-2" />
              <span className="text-xs sm:text-sm">{t('Business Dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace-agents" className="flex-col sm:flex-row h-14 sm:h-10">
              <Users size={16} className="mb-1 sm:mb-0 sm:mr-2" />
              <span className="text-xs sm:text-sm">{t('Marketplace Agents')}</span>
            </TabsTrigger>
            <TabsTrigger value="shop-management" className="flex-col sm:flex-row h-14 sm:h-10">
              <Storefront size={16} className="mb-1 sm:mb-0 sm:mr-2" />
              <span className="text-xs sm:text-sm">{t('Shop Management')}</span>
            </TabsTrigger>
            <TabsTrigger value="blog-management" className="flex-col sm:flex-row h-14 sm:h-10">
              <svg className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM8 20H4V4h4v16zm6 0h-4V4h4v16zm6 0h-4V4h4v16z"/>
              </svg>
              <span className="text-xs sm:text-sm">{t('Blog Management')}</span>
            </TabsTrigger>
            <TabsTrigger value="website-control" className="flex-col sm:flex-row h-14 sm:h-10">
              <svg className="w-4 h-4 mb-1 sm:mb-0 sm:mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-xs sm:text-sm">{t('Website Control')}</span>
            </TabsTrigger>
            <TabsTrigger value="performance-monitoring" className="flex-col sm:flex-row h-14 sm:h-10">
              <Activity size={16} className="mb-1 sm:mb-0 sm:mr-2" />
              <span className="text-xs sm:text-sm">{t('Performance Monitoring')}</span>
            </TabsTrigger>
            <TabsTrigger value="agent-simulator" className="flex-col sm:flex-row h-14 sm:h-10">
              <Brain size={16} className="mb-1 sm:mb-0 sm:mr-2" />
              <span className="text-xs sm:text-sm">{t('Agent Simulator')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Business Dashboard */}
          <TabsContent value="business-dashboard" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('Amazon Revenue')}</CardTitle>
                  <Storefront className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€28,450</div>
                  <p className="text-xs text-muted-foreground">+8.2% {t('from last month')}</p>
                  <div className="mt-2 text-xs text-green-600">1,234 {t('active listings')}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('eBay Revenue')}</CardTitle>
                  <Storefront className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€23,230</div>
                  <p className="text-xs text-muted-foreground">+15.1% {t('from last month')}</p>
                  <div className="mt-2 text-xs text-green-600">987 {t('active listings')}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">eBay Kleinanzeigen</CardTitle>
                  <Storefront className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€12,780</div>
                  <p className="text-xs text-muted-foreground">+22.3% {t('from last month')}</p>
                  <div className="mt-2 text-xs text-green-600">456 active listings</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Engagement</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">WhatsApp: 89% | Email: 96%</p>
                  <div className="mt-2 text-xs text-green-600">2,347 interactions today</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('Marketplace Performance')}</CardTitle>
                  <CardDescription>Real-time automation metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Amazon DE Automation</span>
                      <span className="text-green-600">98.7% Active</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>eBay.de Automation</span>
                      <span className="text-green-600">96.3% Active</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[96%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>eBay Kleinanzeigen</span>
                      <span className="text-green-600">89.1% Active</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[89%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication Channels</CardTitle>
                  <CardDescription>Customer interaction summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">WhatsApp Business API</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">1,247 messages</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Automation</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600">892 emails</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Discord Support Bot</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-purple-600">156 tickets</span>
                      <Badge variant="secondary">Online</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Social Media Agents</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-pink-600">2,341 interactions</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shop Management */}
          <TabsContent value="shop-management" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Storefront className="h-5 w-5" />
                    {t('Products Management')}
                  </CardTitle>
                  <CardDescription>{t('Product and inventory management')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2,847</div>
                      <div className="text-muted-foreground">Total Products</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1,923</div>
                      <div className="text-muted-foreground">In Stock</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={simulateProductImport}
                      disabled={isSimulating.productImport}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSimulating.productImport ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Importing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Demo: Bulk Import
                        </>
                      )}
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Inventory Sync
                    </button>
                  </div>

                  {demoResults.productImport && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">{t('Import Completed')}</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>✅ {demoResults.productImport.imported} products imported</div>
                        <div>🔄 {demoResults.productImport.updated} products updated</div>
                        <div>❌ {demoResults.productImport.errors} errors</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Time: {demoResults.productImport.time}
                        </div>
                      </div>
                      <div className="mt-2 text-xs">
                        <details className="cursor-pointer">
                          <summary className="text-green-800 hover:underline">{t('View Details')}</summary>
                          <div className="mt-1 space-y-1">
                            {demoResults.productImport.details.map((item: any, i: number) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span>{item.sku}: {item.name}</span>
                                <span className={
                                  item.status === 'imported' ? 'text-green-600' :
                                  item.status === 'updated' ? 'text-blue-600' : 'text-red-600'
                                }>
                                  {item.status === 'error' ? item.reason : `${item.status} ${item.price || ''}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    {t('Orders Management')}
                  </CardTitle>
                  <CardDescription>{t('Orders and deliveries')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending Orders</span>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">47</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Processing</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">23</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Shipped Today</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">156</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Returns</span>
                      <Badge variant="outline" className="bg-red-50 text-red-700">8</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={simulateOrderProcessing}
                      disabled={isSimulating.orderProcessing}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSimulating.orderProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Demo: Process Orders
                        </>
                      )}
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Shipping Labels
                    </button>
                  </div>

                  {demoResults.orderProcessing && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Orders Processed</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>📦 {demoResults.orderProcessing.processed} orders processed</div>
                        <div>🚚 {demoResults.orderProcessing.shipped} shipped</div>
                        <div>⏳ {demoResults.orderProcessing.pending} pending</div>
                      </div>
                      <div className="mt-2 text-xs">
                        <details className="cursor-pointer">
                          <summary className="text-green-800 hover:underline">Recent Shipments</summary>
                          <div className="mt-1 space-y-1">
                            {demoResults.orderProcessing.orders.map((order: any, i: number) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span>{order.id}: {order.customer}</span>
                                <span className="text-blue-600">
                                  {order.tracking || order.eta}
                                </span>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CurrencyDollar className="h-5 w-5" />
                    Pricing & Promotions
                  </CardTitle>
                  <CardDescription>Prix et campagnes promotionnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Promotions</span>
                      <span className="font-medium text-green-600">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dynamic Pricing</span>
                      <Badge variant="secondary">Auto</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('Price Alerts')}</span>
                      <Badge variant="outline" className="text-orange-600">3</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      Create Promotion
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      {t('Price Analysis')}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>{t('Latest orders in real time')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: '#ORD-2847', customer: 'Klaus Mueller', amount: '€89.99', status: 'pending' },
                      { id: '#ORD-2846', customer: 'Anna Schmidt', amount: '€156.50', status: 'processing' },
                      { id: '#ORD-2845', customer: 'Hans Weber', amount: '€234.00', status: 'shipped' },
                      { id: '#ORD-2844', customer: 'Lisa Wagner', amount: '€67.25', status: 'delivered' }
                    ].map((order, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium">{order.id.slice(-2)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-muted-foreground">{order.customer}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{order.amount}</div>
                          <Badge variant="outline" className={
                            order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                            order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                            order.status === 'shipped' ? 'bg-green-50 text-green-700' :
                            'bg-gray-50 text-gray-700'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('Inventory Alerts')}</CardTitle>
                  <CardDescription>{t('Stock alerts and replenishment')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="font-medium text-red-800">{t('Critical Stock')}</span>
                      </div>
                      <div className="text-sm text-red-700">12 {t('products out of stock')}</div>
                      <button className="mt-2 text-sm text-red-800 hover:underline">{t('View details')} →</button>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="font-medium text-yellow-800">{t('Low Stock')}</span>
                      </div>
                      <div className="text-sm text-yellow-700">34 {t('products below minimum threshold')}</div>
                      <button className="mt-2 text-sm text-yellow-800 hover:underline">{t('Replenish')} →</button>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="font-medium text-blue-800">{t('Auto-orders')}</span>
                      </div>
                      <div className="text-sm text-blue-700">8 {t('automatic orders scheduled')}</div>
                      <button className="mt-2 text-sm text-blue-800 hover:underline">{t('Manage')} →</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Blog Management */}
          <TabsContent value="blog-management" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {t('Content Management')}
                  </CardTitle>
                  <CardDescription>{t('Content creation and management')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">127</div>
                      <div className="text-muted-foreground">Published</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">23</div>
                      <div className="text-muted-foreground">Drafts</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={simulateBlogGeneration}
                      disabled={isSimulating.blogGeneration}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSimulating.blogGeneration ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4" />
                          Demo: AI Article
                        </>
                      )}
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Content Calendar
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Media Library
                    </button>
                  </div>

                  {demoResults.blogGeneration && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Article Generated</span>
                      </div>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div className="font-medium">"{demoResults.blogGeneration.title}"</div>
                        <div>📝 {demoResults.blogGeneration.wordCount} words</div>
                        <div>🎯 {t('SEO Score')}: {demoResults.blogGeneration.seoScore}%</div>
                        <div>⏱️ Reading time: {demoResults.blogGeneration.readingTime}</div>
                      </div>
                      <div className="mt-2 text-xs">
                        <details className="cursor-pointer">
                          <summary className="text-blue-800 hover:underline">Preview Content</summary>
                          <div className="mt-1 p-2 bg-white rounded text-xs max-h-32 overflow-y-auto">
                            <pre className="whitespace-pre-wrap">{demoResults.blogGeneration.content}</pre>
                          </div>
                          <div className="mt-1 text-blue-600">
                            Keywords: {demoResults.blogGeneration.keywords.join(", ")}
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendUp className="h-5 w-5" />
                    SEO & Analytics
                  </CardTitle>
                  <CardDescription>{t('Optimization and performance')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t('SEO Score')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-[85%]"></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Monthly Views</span>
                      <span className="font-medium text-blue-600">45.2K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Reading Time</span>
                      <span className="font-medium">3m 24s</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={simulateSEOAnalysis}
                      disabled={isSimulating.seoAnalysis}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSimulating.seoAnalysis ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Lightning className="h-4 w-4" />
                          Demo: {t('SEO Analysis')}
                        </>
                      )}
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Keywords Research
                    </button>
                  </div>

                  {demoResults.seoAnalysis && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">{t('SEO Analysis Complete')}</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>🎯 {t('Overall Score')}: {demoResults.seoAnalysis.score}/100</div>
                        <div>💡 {demoResults.seoAnalysis.improvements} improvements found</div>
                      </div>
                      <div className="mt-2 text-xs">
                        <details className="cursor-pointer">
                          <summary className="text-green-800 hover:underline">{t('Detailed Analysis')}</summary>
                          <div className="mt-1 space-y-1">
                            {Object.entries(demoResults.seoAnalysis.analysis).map(([key, value]: [string, any], i: number) => (
                              <div key={i} className="flex justify-between items-center">
                                <span>{key}</span>
                                <div className="flex items-center gap-1">
                                  <span className={`w-2 h-2 rounded-full ${
                                    value.status === 'excellent' ? 'bg-green-500' :
                                    value.status === 'good' ? 'bg-blue-500' :
                                    value.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}></span>
                                  <span className="text-xs">{value.score}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Publishing Schedule
                  </CardTitle>
                  <CardDescription>Planification et automatisation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scheduled Posts</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Auto-Publishing</span>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Social Sharing</span>
                      <Badge variant="secondary">Auto</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Schedule Post
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Publishing Rules
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                  <CardDescription>{t('Latest published articles')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: 'E-Commerce Trends 2025', status: 'published', views: '2.3K', date: '2 hours ago' },
                      { title: 'Amazon FBA Guide für Deutschland', status: 'published', views: '1.8K', date: '1 day ago' },
                      { title: 'SEO Tips für Online Shops', status: 'draft', views: '-', date: '3 days ago' },
                      { title: 'WhatsApp Business API Integration', status: 'scheduled', views: '-', date: 'Tomorrow' }
                    ].map((article, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{article.title}</div>
                            <div className="text-sm text-muted-foreground">{article.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{article.views}</div>
                          <Badge variant="outline" className={
                            article.status === 'published' ? 'bg-green-50 text-green-700' :
                            article.status === 'draft' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-blue-50 text-blue-700'
                          }>
                            {article.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('Content Performance')}</CardTitle>
                  <CardDescription>{t('Analytics and engagement')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">15.2K</div>
                        <div className="text-xs text-muted-foreground">Total Reads</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">892</div>
                        <div className="text-xs text-muted-foreground">Social Shares</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Engagement Rate</span>
                        <span className="font-medium">7.8%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-[78%]"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Newsletter Signups</span>
                        <span className="font-medium text-green-600">+156 this month</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Time on Page</span>
                        <span className="font-medium">4m 12s</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Website Control */}
          <TabsContent value="website-control" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Design & Themes
                  </CardTitle>
                  <CardDescription>Apparence et personnalisation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Theme</span>
                      <Badge variant="secondary">Professional Dark</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mobile Optimized</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">✓ Yes</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">PWA Enabled</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">✓ Active</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                      Customize Theme
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Layout Builder
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global SEO
                  </CardTitle>
                  <CardDescription>Optimisation moteurs de recherche</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Google PageSpeed</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-[92%]"></div>
                        </div>
                        <span className="text-sm font-medium">92</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Core Web Vitals</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Passed</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SSL Certificate</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Valid</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      SEO Audit
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Sitemap & Robots
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Analytics & Tracking
                  </CardTitle>
                  <CardDescription>{t('Tracking and performance measurement')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Google Analytics</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Connected</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Facebook Pixel</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-medium text-green-600">3.8%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={simulatePerformanceTest}
                      disabled={isSimulating.performanceTest}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSimulating.performanceTest ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Testing...
                        </>
                      ) : (
                        <>
                          <Monitor className="h-4 w-4" />
                          {t('Demo: Performance Test')}
                        </>
                      )}
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                      Setup Tracking
                    </button>
                  </div>

                  {demoResults.performanceTest && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">{t('Performance Test Complete')}</span>
                      </div>
                      <div className="text-sm text-green-700 space-y-1">
                        <div>⚡ {t('Page Load')}: {demoResults.performanceTest.metrics["Page Load Time"].value}</div>
                        <div>🎯 {t('Interactive')}: {demoResults.performanceTest.metrics["Time to Interactive"].value}</div>
                        <div>📱 {t('Mobile Score')}: {demoResults.performanceTest.metrics["Cumulative Layout Shift"].score}/100</div>
                      </div>
                      <div className="mt-2 text-xs">
                        <details className="cursor-pointer">
                          <summary className="text-green-800 hover:underline">{t('Full Report')}</summary>
                          <div className="mt-1 space-y-1">
                            {Object.entries(demoResults.performanceTest.metrics).map(([key, value]: [string, any], i: number) => (
                              <div key={i} className="flex justify-between items-center">
                                <span>{key}</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs">{value.value}</span>
                                  <span className={`w-2 h-2 rounded-full ${
                                    value.status === 'excellent' ? 'bg-green-500' :
                                    value.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                                  }`}></span>
                                </div>
                              </div>
                            ))}
                            <div className="mt-2 pt-2 border-t text-xs">
                              <div className="font-medium mb-1">{t('Recommendations')}:</div>
                              {demoResults.performanceTest.recommendations.map((rec: string, i: number) => (
                                <div key={i} className="text-blue-600">• {rec}</div>
                              ))}
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Site Performance</CardTitle>
                  <CardDescription>{t('Real-time metrics')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">47.2K</div>
                        <div className="text-xs text-muted-foreground">Visitors Today</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">1.2s</div>
                        <div className="text-xs text-muted-foreground">Load Time</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">98.7%</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Bounce Rate</span>
                        <span className="font-medium">24.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pages per Session</span>
                        <span className="font-medium">4.7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Session Duration</span>
                        <span className="font-medium">3m 45s</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security & Maintenance</CardTitle>
                  <CardDescription>{t('Security and site maintenance')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">{t('Security Status')}</span>
                      </div>
                      <div className="text-sm text-green-700">{t('All security checks passed')}</div>
                    </div>
                    
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Backups</span>
                      </div>
                      <div className="text-sm text-blue-700">Last backup: 2 hours ago</div>
                      <button className="mt-2 text-sm text-blue-800 hover:underline">Run backup now →</button>
                    </div>

                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Warning className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">{t('Updates Available')}</span>
                      </div>
                      <div className="text-sm text-yellow-700">3 plugin updates pending</div>
                      <button className="mt-2 text-sm text-yellow-800 hover:underline">{t('Update now →')}</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Demo Section for Website Control */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightning className="h-5 w-5" />
                  {t('Live Website Demo Tools')}
                </CardTitle>
                <CardDescription>{t('Interactive testing environment for all website functions')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-blue-600" />
                      {t('Performance Test')}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('Run live Google PageSpeed analysis')}
                    </p>
                    <div className="space-y-2">
                      <Input placeholder={t('URL to test (goodlink.de)')} className="text-sm" defaultValue="https://goodlink.de" />
                      <Select>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Test Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mobile">Mobile Performance</SelectItem>
                          <SelectItem value="desktop">Desktop Performance</SelectItem>
                          <SelectItem value="seo">{t('SEO Analysis')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <button 
                        onClick={simulatePerformanceTest}
                        disabled={isSimulating.performanceTest}
                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isSimulating.performanceTest ? t('Testing...') : t('Run Performance Test')}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      Analytics Setup
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Configure tracking and goals
                    </p>
                    <div className="space-y-2">
                      <Input placeholder="Google Analytics ID" className="text-sm" defaultValue="GA4-G-XXXXXXXXXX" />
                      <Input placeholder="Facebook Pixel ID" className="text-sm" defaultValue="255766850213543" />
                      <button className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                        Verify Tracking
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Palette className="h-4 w-4 text-purple-600" />
                      Theme Customizer
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Live preview theme changes
                    </p>
                    <div className="space-y-2">
                      <Select>
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional-dark">Professional Dark</SelectItem>
                          <SelectItem value="clean-light">Clean Light</SelectItem>
                          <SelectItem value="modern-blue">Modern Blue</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded cursor-pointer border-2 border-blue-800"></div>
                        <div className="w-6 h-6 bg-green-600 rounded cursor-pointer"></div>
                        <div className="w-6 h-6 bg-purple-600 rounded cursor-pointer"></div>
                        <div className="w-6 h-6 bg-orange-600 rounded cursor-pointer"></div>
                      </div>
                      <button className="w-full px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition-colors">
                        Apply Theme
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      <h4 className="font-medium">Website Console</h4>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Live System
                    </Badge>
                  </div>
                  <div className="bg-black text-green-400 p-3 rounded font-mono text-xs max-h-40 overflow-y-auto">
                    <div>[{new Date().toLocaleTimeString()}] 🌐 goodlink.de - Website Control Panel Active</div>
                    <div>[{new Date().toLocaleTimeString()}] ✅ SSL Certificate: Valid until 2025-12-22</div>
                    <div>[{new Date().toLocaleTimeString()}] ⚡ PageSpeed Score: 92/100 (Excellent)</div>
                    <div>[{new Date().toLocaleTimeString()}] 📊 Google Analytics: Connected & Tracking</div>
                    <div>[{new Date().toLocaleTimeString()}] 📱 Mobile Optimization: 97% Score</div>
                    <div>[{new Date().toLocaleTimeString()}] 🔒 Security Status: All checks passed</div>
                    <div className="text-blue-400">[{new Date().toLocaleTimeString()}] 📈 Real-time: 47.2K visitors today</div>
                    <div className="text-yellow-400">[{new Date().toLocaleTimeString()}] 💡 Ready for demo tests</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplace Agents Panel */}
          <TabsContent value="marketplace-agents" className="space-y-6">
            <AllAgentsPanel />
          </TabsContent>

          {/* System Configuration */}
          <TabsContent value="system-configuration" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Marketplace API Configuration</CardTitle>
                  <CardDescription>Amazon, eBay, eBay Kleinanzeigen APIs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amazon MWS API</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-sm text-muted-foreground">••••••••••••8347</div>
                      <Badge variant="outline" className="text-green-600">Connected</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">eBay Trading API</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-sm text-muted-foreground">••••••••••••2891</div>
                      <Badge variant="outline" className="text-green-600">Connected</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">eBay Kleinanzeigen API</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-sm text-muted-foreground">••••••••••••7442</div>
                      <Badge variant="outline" className="text-green-600">Connected</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication Settings</CardTitle>
                  <CardDescription>WhatsApp, Email, Discord configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">WhatsApp Business API</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-sm text-muted-foreground">+49 176 ••••••34</div>
                      <Badge variant="outline" className="text-green-600">Active</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email SMTP Server</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-sm text-muted-foreground">mail.goodlink.de</div>
                      <Badge variant="outline" className="text-green-600">Active</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Discord Bot</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-sm text-muted-foreground">GoodlinkBot#4829</div>
                      <Badge variant="outline" className="text-green-600">Online</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Monitoring */}
          <TabsContent value="performance-monitoring" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm text-green-600">23%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[23%]"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm text-blue-600">67%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-[67%]"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm text-orange-600">45%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Agent Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Listing Automation</span>
                      <Badge variant="outline" className="text-green-600">98.7%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Price Optimization</span>
                      <Badge variant="outline" className="text-green-600">96.3%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SEO Management</span>
                      <Badge variant="outline" className="text-blue-600">89.1%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Customer Support</span>
                      <Badge variant="outline" className="text-green-600">94.8%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Social Media</span>
                      <Badge variant="outline" className="text-blue-600">87.2%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real-time Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">47</div>
                      <div className="text-xs text-muted-foreground">Active Agents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">2,847</div>
                      <div className="text-xs text-muted-foreground">Processed Items/hour</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">156ms</div>
                      <div className="text-xs text-muted-foreground">Avg Response Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agent Simulator */}
          <TabsContent value="agent-simulator" className="space-y-6">
            <AgentDemoPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
