import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/LanguageContext"
import { 
  Play, 
  ArrowRight, 
  CheckCircle, 
  Gear,
  Lightning,
  ShoppingCart,
  ChatCircle,
  TrendUp,
  Robot,
  PaintBrush,
  ChartBar,
  Share
} from "@phosphor-icons/react"

interface DemoStep {
  id: string
  title: string
  description: string
  input: string
  output: string
  duration: number
  status: 'pending' | 'running' | 'completed'
}

interface DemoCategory {
  id: string
  title: string
  description: string
  icon: React.ElementType
  demos: DemoStep[]
}

export function DemoInterface() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>("ai-agents")
  const [runningDemo, setRunningDemo] = useState<string | null>(null)
  const [completedDemos, setCompletedDemos] = useState<Set<string>>(new Set())

  // Demo categories with comprehensive examples
  const demoCategories: DemoCategory[] = [
    {
      id: "ai-agents",
      title: t("AI Agents"),
      description: t("Intelligent automation for all your business needs"),
      icon: Robot,
      demos: [
        {
          id: "listing-agent",
          title: t("Listing Generation Agent"),
          description: t("Generate optimized product listings for multiple marketplaces"),
          input: `Product: Medical Grade Stethoscope
Brand: CardioMax Pro
Category: Medical Devices
Target: Amazon DE`,
          output: `📋 Generated Listing:
Title: CardioMax Pro Stethoskop - Medizinisches Stethoskop CE-Zertifiziert für Ärzte
Bullets:
• ✅ CE-zertifiziert nach MDR 2017/745 - Professionelle medizinische Qualität
• 🔊 Hochpräzise Akustik - Klare Herzgeräusche und Lungengeräusche
• 💪 Robuste Konstruktion - Langlebig für den klinischen Einsatz
• 🎯 Ergonomisches Design - Komfortabel für lange Untersuchungen
• 📦 Komplett-Set mit Ersatzteilen und Aufbewahrungstasche`,
          duration: 3000,
          status: 'pending'
        },
        {
          id: "price-agent",
          title: t("Dynamic Pricing Agent"),
          description: t("Automatically adjust prices based on competition and demand"),
          input: `Product: Automotive Connector Cable
Current Price: €45.99
Competitors: €42.50, €48.00, €44.99
Buy Box Status: Lost`,
          output: `💰 Price Optimization:
Recommended Price: €43.99 (-4.3%)
Buy Box Probability: 87%
Profit Margin: €12.45 (28.3%)
Competition Analysis:
• 3 competitors in range
• Average market price: €45.16
• Demand trend: ↗️ +15% (last 7 days)`,
          duration: 2500,
          status: 'pending'
        },
        {
          id: "inventory-agent",
          title: t("Inventory Management Agent"),
          description: t("Predict demand and manage stock levels across all channels"),
          input: `Product: Medical Sensors (SKU: MS-2024-01)
Current Stock: 45 units
Sales Velocity: 8 units/week
Lead Time: 14 days`,
          output: `📦 Inventory Forecast:
Reorder Point: 30 units
Recommended Order: 120 units
Stock-out Risk: 12% (next 30 days)
Forecast Accuracy: 94.2%
Seasonal Trends:
• Q4 demand: +25% (medical equipment)
• Historical accuracy: 96.1%`,
          duration: 2000,
          status: 'pending'
        }
      ]
    },
    {
      id: "marketplace",
      title: t("Marketplace Management"),
      description: t("Manage all your sales channels from one place"),
      icon: ShoppingCart,
      demos: [
        {
          id: "amazon-sync",
          title: t("Amazon Sync"),
          description: t("Synchronize inventory and orders with Amazon"),
          input: `Sync Request: Amazon DE
Products: 1,247 items
Last Sync: 2 hours ago`,
          output: `✅ Amazon Sync Completed:
• 1,247 products updated
• 23 new orders imported
• 156 inventory levels synced
• 12 price updates applied
• 3 Buy Box status changes
Sync Duration: 2m 34s`,
          duration: 4000,
          status: 'pending'
        },
        {
          id: "ebay-listing",
          title: t("eBay Listing"),
          description: t("Create optimized eBay listings"),
          input: `Product: Automotive Brake Sensor
Category: Car Parts > Sensors
Condition: New
Shipping: Germany + EU`,
          output: `🚗 eBay Listing Created:
Title: Bremsbelag-Sensor BMW 3er E90 Original Qualität CE-Zertifiziert
Category: Auto & Motorrad > Teile > Bremsen
Price: €34.99 (+ €4.99 shipping)
Listing Format: Buy It Now + Best Offer
Estimated Views: 450-650/month`,
          duration: 3500,
          status: 'pending'
        }
      ]
    },
    {
      id: "customer-service",
      title: t("Customer Service"),
      description: t("AI-powered customer support across all channels"),
      icon: ChatCircle,
      demos: [
        {
          id: "chat-agent",
          title: t("Customer Chat Agent"),
          description: t("Handle customer inquiries in multiple languages"),
          input: `Customer: "Ist dieses Stethoskop für Kinderärzte geeignet?"
Language: German
Product Context: CardioMax Pro Stethoscope`,
          output: `🤖 AI Response:
"Ja, das CardioMax Pro Stethoskop ist hervorragend für die Pädiatrie geeignet! Es verfügt über:

✅ Spezielle pädiatrische Membran (im Set enthalten)
✅ Einstellbare Drucksensitivität für Kinder
✅ CE-Zertifizierung für medizinische Geräte
✅ Ergonomisches Design für kleine Patienten

Das Stethoskop wird von vielen Kinderärzten in deutschen Kliniken verwendet. Haben Sie weitere Fragen zur Ausstattung?"

Confidence: 96%
Response Time: 1.2s`,
          duration: 2800,
          status: 'pending'
        },
        {
          id: "whatsapp-agent",
          title: t("WhatsApp Business Agent"),
          description: t("Automated WhatsApp customer support"),
          input: `WhatsApp Message: "Hi, need help with order #GL2024-1234"
Customer: +49 176 12345678
Order Status: Shipped`,
          output: `📱 WhatsApp Response:
"Hallo! Ihr Paket GL2024-1234 ist unterwegs! 📦

🚚 Status: Versandt via DHL
📍 Tracking: 1Z999AA1234567890
⏰ Zustellung: Morgen 10-16 Uhr
🔔 Sie erhalten SMS bei Lieferung

Tracking-Link: https://dhl.de/track/1Z999AA1234567890

Kann ich Ihnen sonst helfen? 😊"

Auto-sent: ✅
Customer Satisfaction: 4.8/5`,
          duration: 2500,
          status: 'pending'
        }
      ]
    },
    {
      id: "analytics",
      title: t("Analytics & Reporting"),
      description: t("Comprehensive business intelligence and reporting"),
      icon: ChartBar,
      demos: [
        {
          id: "revenue-analysis",
          title: t("Revenue Analysis"),
          description: t("Analyze performance across all sales channels"),
          input: `Time Period: Last 30 days
Channels: Amazon, eBay, Own Shop
Categories: Medical, Automotive`,
          output: `📊 Revenue Report:
Total Revenue: €127,450 (+18.3% vs last month)

By Channel:
• Amazon DE: €87,230 (68.5%) ↗️ +22%
• eBay: €23,140 (18.2%) ↗️ +12%
• Own Shop: €17,080 (13.4%) ↗️ +8%

Top Products:
1. Medical Stethoscopes: €18,450
2. Brake Sensors: €12,330
3. Connector Cables: €9,870

Key Metrics:
• Conversion Rate: 3.8% (+0.4%)
• Average Order Value: €89.50 (+€7.20)
• Customer Acquisition Cost: €12.30`,
          duration: 3000,
          status: 'pending'
        }
      ]
    },
    {
      id: "blog-seo",
      title: t("Blog & SEO"),
      description: t("Content creation and SEO optimization"),
      icon: PaintBrush,
      demos: [
        {
          id: "blog-generator",
          title: t("AI Blog Generator"),
          description: t("Generate SEO-optimized blog content"),
          input: `Topic: "Medical Device Regulations in Germany"
Target Keywords: CE marking, MDR compliance, medical devices
Language: German
Word Count: 800-1000`,
          output: `📝 Blog Article Generated:

Title: "CE-Kennzeichnung für Medizinprodukte: Der ultimative MDR-Leitfaden 2024"

Content Preview:
"Die Medical Device Regulation (MDR) hat die Anforderungen für Medizinprodukte in der EU grundlegend verändert. Seit Mai 2021 müssen alle Hersteller..."

SEO Metrics:
• Primary Keyword Density: 2.3%
• Readability Score: 8.2/10
• Meta Description: ✅ Optimized
• Internal Links: 5 relevant
• Estimated Traffic: 450-680 visits/month
• Competition Difficulty: Medium

Ready for Review & Publishing`,
          duration: 4500,
          status: 'pending'
        }
      ]
    },
    {
      id: "social-media",
      title: t("Social Media Management"),
      description: t("Automated social media posting and engagement"),
      icon: Share,
      demos: [
        {
          id: "linkedin-post",
          title: t("LinkedIn Content"),
          description: t("Generate professional LinkedIn posts"),
          input: `Product Launch: New Medical Sensor Line
Target Audience: Healthcare Professionals
Tone: Professional, Informative
Include: Technical specs, benefits`,
          output: `💼 LinkedIn Post:

"🏥 Neue Sensor-Generation für die Medizintechnik verfügbar!

Unsere neuesten CardioSense Pro Sensoren bieten:
✅ 40% höhere Präzision bei der Vital-Überwachung
✅ CE-Zertifizierung nach neuster MDR
✅ Integration mit allen gängigen Monitoring-Systemen
✅ Reduzierte Wartungskosten um 30%

Entwickelt in Zusammenarbeit mit führenden deutschen Kliniken.

#Medizintechnik #Innovation #Healthcare #CE #MDR

Interesse? Kontaktieren Sie uns für Testmuster! 👇"

Engagement Prediction: 156 reactions, 23 comments
Best Posting Time: Dienstag 10:30 Uhr`,
          duration: 3200,
          status: 'pending'
        }
      ]
    }
  ]

  const runDemo = async (categoryId: string, demoId: string) => {
    const category = demoCategories.find(c => c.id === categoryId)
    const demo = category?.demos.find(d => d.id === demoId)
    
    if (!demo) return

    setRunningDemo(demoId)
    
    // Simulate demo execution
    setTimeout(() => {
      setCompletedDemos(prev => new Set([...prev, demoId]))
      setRunningDemo(null)
    }, demo.duration)
  }

  const getDemoStatus = (demoId: string) => {
    if (runningDemo === demoId) return 'running'
    if (completedDemos.has(demoId)) return 'completed'
    return 'pending'
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold gradient-text">
          {t("Interactive Function Demos")}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t("Explore all features with live demonstrations and examples")}
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
          {demoCategories.map((category) => {
            const Icon = category.icon
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="modern-tab-trigger flex items-center gap-2 py-3 px-4"
              >
                <Icon size={18} />
                <span className="hidden sm:inline text-xs">{category.title}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {demoCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <Card className="admin-nav-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <category.icon size={32} className="text-primary" />
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              {category.demos.map((demo) => (
                <Card key={demo.id} className="admin-nav-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{demo.title}</CardTitle>
                          <Badge 
                            variant={
                              getDemoStatus(demo.id) === 'completed' ? 'default' :
                              getDemoStatus(demo.id) === 'running' ? 'secondary' : 'outline'
                            }
                          >
                            {getDemoStatus(demo.id) === 'completed' && <CheckCircle size={14} className="mr-1" />}
                            {getDemoStatus(demo.id) === 'running' && <Lightning size={14} className="mr-1" />}
                            {t(getDemoStatus(demo.id))}
                          </Badge>
                        </div>
                        <CardDescription>{demo.description}</CardDescription>
                      </div>
                      <Button
                        onClick={() => runDemo(category.id, demo.id)}
                        disabled={runningDemo === demo.id}
                        className="flex items-center gap-2"
                      >
                        {runningDemo === demo.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                            {t("Running")}
                          </>
                        ) : (
                          <>
                            <Play size={16} />
                            {t("Run Demo")}
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {runningDemo === demo.id && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{t("Processing...")}</span>
                          <span>{Math.round(demo.duration / 1000)}s</span>
                        </div>
                        <Progress value={100} className="animate-pulse" />
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <Gear size={16} className="text-blue-500" />
                          {t("Input")}
                        </div>
                        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                          <CardContent className="p-4">
                            <pre className="text-sm text-blue-700 dark:text-blue-300 whitespace-pre-wrap font-mono">
                              {demo.input}
                            </pre>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <ArrowRight size={16} className="text-green-500" />
                          {t("Output")}
                        </div>
                        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                          <CardContent className="p-4">
                            <pre className="text-sm text-green-700 dark:text-green-300 whitespace-pre-wrap font-mono">
                              {getDemoStatus(demo.id) === 'completed' ? demo.output : t("Run demo to see results...")}
                            </pre>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {getDemoStatus(demo.id) === 'completed' && (
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle size={16} />
                        {t("Demo completed successfully!")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}