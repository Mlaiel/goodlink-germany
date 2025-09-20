import { useState } from "react"
import { useLanguage } from "@/components/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import {
  Play,
  Copy,
  Download,
  Upload,
  Robot,
  Lightbulb,
  Target,
  Gear,
  ChartBar,
  FileText,
  ShoppingCart,
  Globe,
  Camera,
  CurrencyDollar,
  Brain,
  ChatCircle,
  TrendUp,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Eye,
  Sparkle,
  Lightning
} from "@phosphor-icons/react"

interface DemoExample {
  title: string
  input: string
  output: string
  explanation: string
  processingTime: string
  confidence: number
}

interface AgentDemo {
  id: string
  name: string
  type: string
  icon: React.ReactNode
  description: string
  capabilities: string[]
  examples: DemoExample[]
  configuration: Record<string, any>
  training: {
    modelType: string
    dataSource: string
    accuracy: number
    lastTrained: string
  }
}

const agentDemos: AgentDemo[] = [
  {
    id: "listing-agent",
    name: "Listing Generation Agent",
    type: "content",
    icon: <FileText className="h-5 w-5" />,
    description: "Automatically generates optimized product listings for different marketplaces with SEO optimization and compliance checking.",
    capabilities: [
      "Multi-marketplace format adaptation",
      "SEO keyword optimization", 
      "Compliance verification",
      "Translation to 4 languages",
      "Bullet point optimization",
      "Image description generation"
    ],
    examples: [
      {
        title: "Medical Device Listing",
        input: `Product: Digital Blood Pressure Monitor BPM-2000
Category: Medical Devices
Features: Bluetooth connectivity, LCD display, memory for 2 users, 120 readings storage
Target: Amazon DE`,
        output: `Title: Digitales Blutdruckmessgerät BPM-2000 - Bluetooth, LCD-Display, 2 Benutzer Speicher
Bullets:
• ✓ CE-zertifiziert nach MDR 2017/745 - Medizinprodukt der Klasse IIa
• 📱 Bluetooth-Konnektivität für Smartphone-App Synchronisation
• 👥 Dual-User Modus mit je 120 Messwerten Speicherkapazität  
• 🔋 Automatische Abschaltung & Batterie-Sparfunktion
• 📊 WHO-Klassifikation der Blutdruckwerte mit Farbcodierung

Description: Das BPM-2000 ist ein präzises digitales Blutdruckmessgerät...
Keywords: blutdruckmessgerät, digital, bluetooth, medizingerät, ce zertifiziert
Compliance: ✓ MDR konform, ✓ CE-Kennzeichnung erforderlich`,
        explanation: "Agent analyzed product category, applied medical device regulations, optimized for German marketplace with proper compliance markers and localized features.",
        processingTime: "2.3s",
        confidence: 94
      },
      {
        title: "Automotive Component Listing",
        input: `Product: LED Headlight H7 6000K
Category: Automotive Parts  
Features: 6000K cool white, 12V/24V, 3000 lumen, IP68 waterproof
Target: eBay Motors DE`,
        output: `Title: H7 LED Scheinwerfer 6000K Kaltweiß - 3000 Lumen, IP68, 12V/24V KFZ
Bullets:
• 🚗 ECE R112 Zulassung für deutsche Straßenverkehrs-Zulassungs-Ordnung
• 💡 6000K Kaltweiß für perfekte Ausleuchtung (3000 Lumen pro Birne)
• 🔧 Plug & Play Installation - Direkter H7 Sockel Austausch
• 🌧️ IP68 Schutzklasse - Komplett wasserdicht und staubdicht  
• ⚡ 12V/24V Kompatibilität für PKW, LKW und Motorräder

Description: Hochwertige H7 LED Scheinwerfer mit 6000K Farbtemperatur...
Keywords: h7 led, scheinwerfer, 6000k, automotive, ece zugelassen
Compliance: ✓ ECE R112 konform, ✓ StVZO zugelassen`,
        explanation: "Agent recognized automotive category, applied ECE regulations for German market, emphasized street-legal compliance and technical specifications relevant to German buyers.",
        processingTime: "1.8s", 
        confidence: 91
      }
    ],
    configuration: {
      marketplaceFormat: "amazon-de",
      language: "de",
      seoOptimization: 85,
      complianceCheck: true,
      keywordDensity: "medium"
    },
    training: {
      modelType: "Fine-tuned GPT-4",
      dataSource: "50k+ marketplace listings",
      accuracy: 94.2,
      lastTrained: "2024-01-15"
    }
  },
  {
    id: "pricing-agent", 
    name: "Dynamic Pricing Agent",
    type: "pricing",
    icon: <CurrencyDollar className="h-5 w-5" />,
    description: "Real-time price optimization based on competitor analysis, demand patterns, and Buy Box algorithms.",
    capabilities: [
      "Real-time competitor monitoring",
      "Buy Box probability calculation",
      "Demand-based pricing",
      "Margin protection",
      "Multi-marketplace sync",
      "Seasonal adjustments"
    ],
    examples: [
      {
        title: "Buy Box Optimization",
        input: `SKU: BPM-2000-DE
Current Price: €89.99
Competitor Prices: €92.50, €87.95, €94.00
Current Buy Box: Competitor at €87.95
Inventory: 45 units
Sales velocity: 3.2/day`,
        output: `Recommended Price: €87.89
Buy Box Probability: 89%
Expected Impact:
• +23% Buy Box win rate
• +15% daily sales velocity  
• Maintains 18.5% margin (above 15% minimum)
• ROI increase: +€127.45/week

Reasoning:
- Undercut current Buy Box by €0.06 (0.07%)
- Account review score advantage (4.8 vs 4.3)
- FBA prime eligibility maintained
- Inventory turnover optimized for 14-day supply`,
        explanation: "Agent calculated optimal price considering multiple Buy Box factors including seller rating, fulfillment method, and inventory levels while maintaining profit margins.",
        processingTime: "0.8s",
        confidence: 96
      },
      {
        title: "Demand Surge Pricing",
        input: `SKU: H7-LED-6000K
Base Price: €24.99
Demand Spike: +340% (Winter season start)
Inventory: 12 units remaining
Restock ETA: 5 days
Competitor stock: Low across market`,
        output: `Recommended Price: €32.99 (+32%)
Strategy: Demand Surge Capture
Expected Outcome:
• Inventory sold out in 2.8 days
• +€96 additional revenue vs base price
• Avoid stockout penalty on Amazon
• Premium positioning maintained

Market Analysis:
- 73% of competitors out of stock
- Search volume +280% for "H7 LED winter"
- Price elasticity: -0.4 (low sensitivity)
- Restock timing aligns with continued demand`,
        explanation: "Agent identified high-demand, low-supply situation and recommended premium pricing to maximize revenue while clearing inventory before restocking.",
        processingTime: "1.2s", 
        confidence: 93
      }
    ],
    configuration: {
      strategy: "buybox-optimization",
      minMargin: 15,
      maxPriceChange: 25,
      monitoringFrequency: "hourly",
      riskTolerance: "medium"
    },
    training: {
      modelType: "Ensemble (XGBoost + LSTM)",
      dataSource: "2M+ price points, Buy Box history",
      accuracy: 87.8,
      lastTrained: "2024-01-18"
    }
  },
  {
    id: "inventory-agent",
    name: "Inventory Forecasting Agent", 
    type: "forecasting",
    icon: <TrendUp className="h-5 w-5" />,
    description: "Predicts demand patterns and optimizes inventory levels across multiple warehouses and marketplaces.",
    capabilities: [
      "Demand forecasting with ML",
      "Seasonality detection",
      "Multi-warehouse optimization",
      "Reorder point calculation",
      "Stock-out risk analysis", 
      "Economic order quantity"
    ],
    examples: [
      {
        title: "Winter Demand Forecast",
        input: `Product: H7 LED Headlights
Current Stock: 145 units (Shenzhen: 80, Cologne: 65)
Historical Sales: 156 units/month average
Season: Pre-winter (November)
External Factors: Early winter weather forecast`,
        output: `30-Day Forecast: 421 units (+170% vs average)
Recommended Actions:
• Immediate Reorder: 350 units to Cologne warehouse
• Transfer: 40 units Shenzhen → Cologne (1-week delivery)
• Safety Stock: Increase to 90 units (vs usual 45)

Breakdown by Week:
Week 1: 85 units (weather reports drive early purchases)
Week 2: 128 units (peak demand period)  
Week 3: 116 units (sustained high demand)
Week 4: 92 units (market saturation begins)

Risk Analysis:
• Stockout probability without action: 78%
• Revenue loss if stockout: €3,450
• Optimal reorder saves: €2,890 vs emergency shipping`,
        explanation: "Agent combined historical data, seasonal patterns, weather forecasts and regional demand differences to predict accurate inventory needs and prevent stockouts.",
        processingTime: "3.1s",
        confidence: 89
      }
    ],
    configuration: {
      forecastHorizon: 30,
      model: "prophet",
      seasonalityWeight: 0.7,
      safetyStockMultiplier: 1.5,
      reorderPointDays: 14
    },
    training: {
      modelType: "Facebook Prophet + External APIs",
      dataSource: "18 months sales + weather + economic data",
      accuracy: 91.4,
      lastTrained: "2024-01-12"
    }
  },
  {
    id: "social-agent",
    name: "Social Media Agent",
    type: "social", 
    icon: <Users className="h-5 w-5" />,
    description: "Manages social media presence across platforms with automated posting, engagement, and influencer outreach.",
    capabilities: [
      "Multi-platform posting",
      "Content personalization",
      "Engagement automation",
      "Hashtag optimization",
      "Influencer identification",
      "Performance analytics"
    ],
    examples: [
      {
        title: "Product Launch Campaign",
        input: `Product: New BPM-3000 Blood Pressure Monitor
Launch Date: Next Monday
Target: Healthcare professionals + general consumers
Platforms: LinkedIn, Instagram, Facebook
Languages: German, English`,
        output: `Generated 12 posts across 3 platforms:

LinkedIn (Professional):
"🏥 Introducing BPM-3000: The next generation in clinical-grade blood pressure monitoring. 
✓ 99.2% accuracy validated in clinical trials
✓ Seamless EMR integration via HL7 FHIR
✓ Designed for healthcare professionals
#HealthTech #MedicalDevices #Healthcare #Innovation"

Instagram (Consumer): 
"💙 Take control of your health with the new BPM-3000! 
📱 Smartphone sync ✓
👨‍⚕️ Doctor-recommended ✓  
🏠 Easy home monitoring ✓
#HealthyLiving #BloodPressure #WellnessTech #Health"

Posting Schedule:
- Pre-launch teasers: 3 days before
- Launch day: 4 coordinated posts
- Follow-up: Weekly for 1 month
- Engagement window: 2-6 PM CET optimal`,
        explanation: "Agent created platform-specific content, optimized hashtags for reach, scheduled posts for maximum engagement, and tailored messaging for different audience segments.",
        processingTime: "4.2s",
        confidence: 88
      }
    ],
    configuration: {
      platforms: ["linkedin", "instagram", "facebook"],
      postingFrequency: "daily", 
      engagementRate: "high",
      hashtagStrategy: "trending+branded",
      contentTone: "professional"
    },
    training: {
      modelType: "GPT-4 + Social Analytics",
      dataSource: "10k+ high-performing posts",
      accuracy: 85.6,
      lastTrained: "2024-01-10"
    }
  },
  {
    id: "chat-agent",
    name: "Customer Support Agent",
    type: "support",
    icon: <ChatCircle className="h-5 w-5" />,
    description: "Provides 24/7 multilingual customer support with product knowledge and order assistance.",
    capabilities: [
      "Multilingual support (DE/EN/ZH/FR)",
      "Product knowledge base",
      "Order tracking integration", 
      "Escalation management",
      "Sentiment analysis",
      "Live handoff capability"
    ],
    examples: [
      {
        title: "Technical Support Query",
        input: `Customer: "Mein BPM-2000 zeigt ERROR 03. Was bedeutet das und wie kann ich es beheben?"
Language: German
Product: BPM-2000 Blood Pressure Monitor
Customer Tier: Premium`,
        output: `Agent Response:
"Hallo! ERROR 03 beim BPM-2000 deutet auf ein Kalibrierungsproblem hin. Hier ist die Lösung:

🔧 Sofortige Schritte:
1. Gerät 30 Sekunden ausschalten
2. Alle Batterien entfernen und wieder einsetzen  
3. Kalibrierung durch gleichzeitiges Drücken von MODE + START für 5 Sekunden

📋 Falls das Problem weiterhin besteht:
- Firmware-Update über unsere App verfügbar
- Kostenloser Ersatz bei Hardware-Defekt (2 Jahre Garantie)

Soll ich ein Firmware-Update für Ihr Gerät initiieren? Oder haben Sie weitere Fragen zur Kalibrierung?"

Confidence: 94%
Escalation: Not required
Next Actions: Monitor resolution, follow-up in 24h`,
        explanation: "Agent identified error code, provided step-by-step solution in customer's language, offered additional support options, and prepared follow-up actions.",
        processingTime: "1.5s",
        confidence: 94
      }
    ],
    configuration: {
      languages: ["de", "en", "zh", "fr"],
      responseTime: "< 30 seconds",
      escalationThreshold: "medium",
      knowledgeBase: "medical + automotive",
      sentimentTracking: true
    },
    training: {
      modelType: "Fine-tuned LLaMA 3.1 70B",
      dataSource: "25k+ support conversations",
      accuracy: 92.1,
      lastTrained: "2024-01-16"
    }
  },
  {
    id: "blog-agent",
    name: "Content & Blog Agent",
    type: "content",
    icon: <FileText className="h-5 w-5" />,
    description: "Creates SEO-optimized blog content, product guides, and technical documentation in multiple languages.",
    capabilities: [
      "SEO content generation",
      "Technical documentation",
      "Multi-language publishing",
      "Internal linking optimization",
      "Keyword research integration",
      "Content performance tracking"
    ],
    examples: [
      {
        title: "SEO Blog Article",
        input: `Topic: "Blutdruckmessgeräte für Zuhause: Kaufratgeber 2024"
Target Keywords: blutdruckmessgerät test, digitales blutdruckmessgerät, blutdruck messen zuhause
Language: German
Word Count: 1200-1500 words
Product Focus: BPM-2000, BPM-3000`,
        output: `Generated Article:
# Blutdruckmessgeräte für Zuhause: Der komplette Kaufratgeber 2024

## Was macht ein gutes digitales Blutdruckmessgerät aus?

Die Wahl des richtigen Blutdruckmessgeräts für Zuhause ist entscheidend für eine zuverlässige Gesundheitsüberwachung. In unserem umfassenden Test haben wir über 25 Geräte analysiert...

### Top-Empfehlungen im Überblick:
🥇 **Good-Link BPM-3000** - Testsieger für Präzision
🥈 **Good-Link BPM-2000** - Bestes Preis-Leistungs-Verhältnis

[Detailed 1,400-word article with product comparisons, technical explanations, buying guide, FAQ section]

SEO Optimization:
✓ Target keywords integrated naturally (density: 1.8%)
✓ Meta description optimized (155 characters)
✓ H2/H3 structure for readability
✓ Internal links to product pages (8 links)
✓ External authority links (3 medical sources)
✓ Featured snippet optimization
✓ Local SEO elements for German market`,
        explanation: "Agent researched current SEO trends, created comprehensive buying guide with natural keyword integration, optimized for voice search and featured snippets while promoting our products naturally.",
        processingTime: "12.8s",
        confidence: 91
      }
    ],
    configuration: {
      languages: ["de", "en", "zh", "fr"],
      seoOptimization: 90,
      wordCountRange: "1000-2000",
      linkingStrategy: "internal+external",
      contentType: "informational+commercial"
    },
    training: {
      modelType: "GPT-4 + SEO Tools API",
      dataSource: "Medical/automotive content + SEO data",
      accuracy: 89.3,
      lastTrained: "2024-01-14"
    }
  },
  {
    id: "whatsapp-agent",
    name: "WhatsApp Business Agent",
    type: "messaging",
    icon: <ChatCircle className="h-5 w-5" />,
    description: "Automated WhatsApp customer service with order tracking, product inquiries, and multi-language support.",
    capabilities: [
      "WhatsApp Business API integration",
      "Order status updates", 
      "Product recommendations",
      "Multi-language conversations",
      "Automated responses",
      "Human handoff capability"
    ],
    examples: [
      {
        title: "Order Status Inquiry",
        input: `WhatsApp Message: "Hi, where is my order #GL-2024-0156?"
Language: German
Customer: Premium tier
Order: BPM-2000 shipped 2 days ago`,
        output: `WhatsApp Response:
"Hallo! 👋 Ihr Paket ist unterwegs! 📦

🚚 Bestellstatus: GL-2024-0156
📍 Aktueller Standort: DHL Verteilzentrum Köln  
📅 Voraussichtliche Lieferung: Morgen zwischen 9-18 Uhr
📱 Tracking-Link: https://track.dhl.de/...

Haben Sie weitere Fragen? Ich helfe gerne! 😊"

Auto-Actions Triggered:
✓ Sent DHL tracking link
✓ Updated customer preference (prefers German)
✓ Scheduled delivery confirmation for tomorrow
✓ Added to VIP customer engagement list`,
        explanation: "Agent retrieved order information, provided tracking details in customer's preferred language, and automatically triggered follow-up actions for better customer experience.",
        processingTime: "0.7s",
        confidence: 97
      }
    ],
    configuration: {
      platforms: ["whatsapp-business"],
      languages: ["de", "en", "zh", "fr"],
      responseTime: "< 60 seconds",
      businessHours: "8:00-20:00 CET",
      autoEscalation: true
    },
    training: {
      modelType: "Fine-tuned LLaMA 3.1 + WhatsApp optimizations",
      dataSource: "15k+ WhatsApp conversations",
      accuracy: 93.7,
      lastTrained: "2024-01-17"
    }
  },
  {
    id: "marketplace-sync-agent",
    name: "Marketplace Sync Agent",
    type: "automation",
    icon: <Globe className="h-5 w-5" />,
    description: "Real-time synchronization of inventory, prices, and orders across Amazon, eBay, OTTO, and other European marketplaces.",
    capabilities: [
      "Real-time inventory sync",
      "Cross-platform price updates",
      "Order status synchronization", 
      "Listing optimization",
      "Compliance monitoring",
      "Performance analytics"
    ],
    examples: [
      {
        title: "Inventory Crisis Management",
        input: `Alert: BPM-2000 stock critical
Amazon DE: 3 units remaining
eBay DE: 5 units remaining  
OTTO: 8 units remaining
Restock ETA: 5 days
Current sales velocity: 4 units/day`,
        output: `Emergency Sync Protocol Activated:

📊 Inventory Redistribution:
• Pause Amazon ads (highest cost-per-click)  
• Increase eBay/OTTO prices by 15% (demand management)
• Enable "Limited Stock" notifications
• Activate pre-order mode for new shipments

⚡ Real-time Actions:
✓ Amazon: Switched to "Only X left" messaging
✓ eBay: Enabled auction format for last 2 units
✓ OTTO: Applied "Limited Edition" badge
✓ All platforms: Updated delivery time to +7 days

📈 Expected Outcome:
• Inventory lasts 7.2 days (vs 4 days without action)
• Revenue maintained at 94% of normal levels
• Zero stockout penalty fees
• Smooth transition to restock`,
        explanation: "Agent detected critical inventory levels and automatically implemented multi-platform strategy to manage demand, prevent stockouts, and maintain revenue while waiting for restocking.",
        processingTime: "2.1s",
        confidence: 96
      }
    ],
    configuration: {
      syncFrequency: "real-time",
      platforms: ["amazon", "ebay", "otto", "kaufland"],
      priceUpdateThreshold: 5,
      inventoryUpdateThreshold: 1,
      emergencyProtocol: true
    },
    training: {
      modelType: "Multi-agent system + ML pipelines",
      dataSource: "Marketplace APIs + competitor data",
      accuracy: 95.1,
      lastTrained: "2024-01-19"
    }
  }
]

export function AgentDemoPanel() {
  const { t } = useLanguage()
  const [selectedAgent, setSelectedAgent] = useState(agentDemos[0])
  const [activeExample, setActiveExample] = useState(0)
  const [isRunningDemo, setIsRunningDemo] = useState(false)
  const [demoInput, setDemoInput] = useState("")
  const [demoOutput, setDemoOutput] = useState("")
  const [demoMetrics, setDemoMetrics] = useState<{
    processingTime: string
    confidence: number
    tokensUsed: number
    costEstimate: string
  } | null>(null)

  const runCustomDemo = async () => {
    if (!demoInput.trim()) {
      toast.error(t("agent.enterInputDemo"))
      return
    }

    setIsRunningDemo(true)
    setDemoOutput("")
    setDemoMetrics(null)
    
    // Simulate AI processing with realistic delays
    const startTime = Date.now()
    
    // Simulate processing stages
    toast.info(t("agent.initializingAgent"))
    await new Promise(resolve => setTimeout(resolve, 500))
    
    toast.info(t("agent.processingInput"))
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.info(t("agent.generatingOutput"))
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const endTime = Date.now()
    const processingTime = ((endTime - startTime) / 1000).toFixed(1) + "s"
    
    // Generate realistic demo output based on agent type
    let output = ""
    let confidence = Math.floor(Math.random() * 15) + 85 // 85-99%
    
    switch (selectedAgent.id) {
      case "listing-agent":
        output = `Generated Listing:
Title: ${demoInput.slice(0, 60)}... - Premium Quality, Fast Shipping
Bullets:
• ✓ CE/MDR compliant for European market
• 🚀 Express delivery within 24-48 hours  
• 🏆 Top-rated by 10,000+ customers (4.8★)
• 🔧 Professional installation support included
• 💎 Premium quality with 2-year warranty

Keywords: ${demoInput.toLowerCase().split(' ').slice(0, 5).join(', ')}
Compliance: ✓ All regulations met`
        break
        
      case "pricing-agent":
        const price = (Math.random() * 100 + 20).toFixed(2)
        output = `Pricing Recommendation: €${price}
Buy Box Probability: ${confidence}%
Strategy: Competitive positioning
Expected ROI: +€${(Math.random() * 50 + 10).toFixed(2)}/week

Market Analysis:
- Competitor average: €${(parseFloat(price) + Math.random() * 10).toFixed(2)}
- Demand trend: +${Math.floor(Math.random() * 30 + 10)}%
- Inventory optimization: 12-day supply optimal`
        break
        
      case "social-agent":
        output = `Social Media Campaign Generated:

📱 Instagram Post:
"🌟 Discover ${demoInput}! Perfect for your needs ✨
#QualityFirst #Innovation #TechLife #Goodlink"

💼 LinkedIn Post:
"Introducing ${demoInput} - engineered for professional excellence. 
Learn more about our latest innovation."

📅 Posting Schedule:
- Peak engagement: 2-4 PM CET
- Optimal frequency: 3x weekly
- Hashtag performance: +47% reach expected`
        break
        
      case "whatsapp-agent":
        output = `WhatsApp Auto-Response:
"Hallo! 👋 Danke für Ihre Nachricht zu: ${demoInput}

🤖 Ich kann Ihnen sofort helfen mit:
✓ Produktinformationen
✓ Bestellstatus
✓ Technische Fragen
✓ Rückgabe & Umtausch

Wie kann ich Ihnen heute helfen? 😊"

Features aktiviert:
- Automatische Sprache-Erkennung: Deutsch
- Kundenhistorie geladen
- Produktkatalog bereit
- Menschliche Übergabe verfügbar`
        break
        
      case "marketplace-sync-agent":
        output = `Marketplace Sync Status:
📊 Real-time Updates für: ${demoInput}

Amazon DE: ✓ Synced (0.3s)
eBay DE: ✓ Synced (0.5s)  
OTTO: ✓ Synced (0.4s)
Kaufland: ✓ Synced (0.6s)

Automatische Aktionen:
• Preise aktualisiert basierend auf Konkurrenz
• Lagerbestände synchronisiert
• SEO-Keywords optimiert
• Compliance-Check bestanden

Leistung: +€${(Math.random() * 200 + 50).toFixed(2)} heute`
        break
        
      default:
        output = `Agent Output for "${demoInput}":
✓ Analysis completed successfully
✓ Recommendations generated  
✓ Quality assurance passed
✓ Ready for implementation

Detailed results:
- Processing efficiency: 98.${Math.floor(Math.random() * 10)}%
- Accuracy score: ${confidence}%
- Implementation ready: Yes`
    }
    
    setDemoOutput(output)
    setDemoMetrics({
      processingTime,
      confidence,
      tokensUsed: Math.floor(Math.random() * 2000 + 500),
      costEstimate: `$${(Math.random() * 0.50 + 0.10).toFixed(3)}`
    })
    
    toast.success(t("agent.demoCompleted"))
    setIsRunningDemo(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      {/* Agent Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agentDemos.map((agent) => (
          <Card 
            key={agent.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedAgent.id === agent.id ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                {agent.icon}
                {agent.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {agent.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {agent.type}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {agent.training.accuracy}% accuracy
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Demo Details */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                {selectedAgent.icon}
                {selectedAgent.name}
                <Badge className="ml-2">{selectedAgent.type}</Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                {selectedAgent.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Model Accuracy</div>
              <div className="text-2xl font-bold text-green-600">
                {selectedAgent.training.accuracy}%
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="demo" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="demo">{t("agent.liveDemo")}</TabsTrigger>
              <TabsTrigger value="examples">{t("common.examples")}</TabsTrigger>
              <TabsTrigger value="performance">{t("common.performance")}</TabsTrigger>
              <TabsTrigger value="config">{t("common.configuration")}</TabsTrigger>
              <TabsTrigger value="training">{t("common.training")}</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      {t("agent.tryAgent")}
                    </CardTitle>
                    <CardDescription>
                      {t("agent.enterInput")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>{t("agent.input")}</Label>
                      <Textarea
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        placeholder={t(`Enter input for ${selectedAgent.name}...`)}
                        rows={4}
                        className="mt-1"
                      />
                    </div>
                    <Button 
                      onClick={runCustomDemo} 
                      disabled={isRunningDemo || !demoInput.trim()}
                      className="w-full"
                    >
                      {isRunningDemo ? (
                        <>
                          <Lightning className="h-4 w-4 mr-2 animate-spin" />
                          {t("agent.processing")}
                        </>
                      ) : (
                        <>
                          <Robot className="h-4 w-4 mr-2" />
                          {t("agent.runDemo")}
                        </>
                      )}
                    </Button>
                    
                    {/* Demo Output */}
                    {demoOutput && (
                      <Card className="mt-4">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Sparkle className="h-4 w-4 text-green-500" />
                              {t("agent.demoOutput")}
                            </CardTitle>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(demoOutput)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-48">
                            <pre className="text-sm bg-green-50 border border-green-200 p-4 rounded-md whitespace-pre-wrap">
                              {demoOutput}
                            </pre>
                          </ScrollArea>
                          
                          {demoMetrics && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                  <div className="text-sm text-muted-foreground">Processing Time</div>
                                  <div className="font-semibold">{demoMetrics.processingTime}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-muted-foreground">Confidence</div>
                                  <div className="font-semibold text-green-600">{demoMetrics.confidence}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-muted-foreground">Tokens Used</div>
                                  <div className="font-semibold">{demoMetrics.tokensUsed.toLocaleString()}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-sm text-muted-foreground">Cost Est.</div>
                                  <div className="font-semibold">{demoMetrics.costEstimate}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>

                {/* Capabilities Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkle className="h-4 w-4" />
                      {t("agent.capabilities")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedAgent.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChartBar className="h-4 w-4" />
                      {t("agent.realTimePerformance")}
                    </CardTitle>
                    <CardDescription>
                      {t("agent.liveMetrics")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Performance Stats */}
                      <div className="space-y-4">
                        <h4 className="font-medium">{t("agent.todayPerformance")}</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{t("agent.tasksCompleted")}</span>
                            <span className="font-semibold">{Math.floor(Math.random() * 500 + 200)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{t("agent.successRate")}</span>
                            <span className="font-semibold text-green-600">{selectedAgent.training.accuracy}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{t("agent.avgResponseTime")}</span>
                            <span className="font-semibold">{(Math.random() * 2 + 0.5).toFixed(1)}s</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{t("agent.errorRate")}</span>
                            <span className="font-semibold text-red-600">{(100 - selectedAgent.training.accuracy).toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Usage Trends */}
                      <div className="space-y-4">
                        <h4 className="font-medium">{t("agent.usageTrends")}</h4>
                        <div className="space-y-3">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                            const usage = Math.floor(Math.random() * 100 + 50)
                            return (
                              <div key={day} className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-8">{day}</span>
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${usage}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium w-8">{usage}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* ROI Impact */}
                      <div className="space-y-4">
                        <h4 className="font-medium">{t("agent.businessImpact")}</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="text-sm text-green-700">Revenue Impact</div>
                            <div className="text-lg font-semibold text-green-800">
                              +€{(Math.random() * 5000 + 1000).toFixed(0)}/month
                            </div>
                          </div>
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="text-sm text-blue-700">Time Saved</div>
                            <div className="text-lg font-semibold text-blue-800">
                              {Math.floor(Math.random() * 40 + 20)} hours/week
                            </div>
                          </div>
                          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="text-sm text-purple-700">Efficiency Gain</div>
                            <div className="text-lg font-semibold text-purple-800">
                              +{Math.floor(Math.random() * 50 + 25)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Recent Activity */}
                    <div className="space-y-4">
                      <h4 className="font-medium">{t("agent.recentActivity")}</h4>
                      <div className="space-y-2">
                        {[
                          { action: "Generated product listing", time: "2 minutes ago", status: "success" },
                          { action: "Optimized pricing strategy", time: "5 minutes ago", status: "success" },
                          { action: "Synchronized inventory", time: "8 minutes ago", status: "success" },
                          { action: "Processed customer inquiry", time: "12 minutes ago", status: "success" },
                          { action: "Updated marketplace feeds", time: "15 minutes ago", status: "warning" }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                activity.status === 'success' ? 'bg-green-500' : 
                                activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                              <span className="text-sm">{activity.action}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-6">
              <div className="space-y-6">
                {/* Example Selection */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedAgent.examples.map((example, index) => (
                    <Button
                      key={index}
                      variant={activeExample === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveExample(index)}
                      className="whitespace-nowrap"
                    >
                      {example.title}
                    </Button>
                  ))}
                </div>

                {/* Example Display */}
                {selectedAgent.examples[activeExample] && (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {selectedAgent.examples[activeExample].title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Lightning className="h-3 w-3" />
                              {selectedAgent.examples[activeExample].processingTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {selectedAgent.examples[activeExample].confidence}% confidence
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Input */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm font-medium">Input</Label>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(selectedAgent.examples[activeExample].input)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <ScrollArea className="h-40">
                              <pre className="text-xs bg-muted p-3 rounded-md whitespace-pre-wrap">
                                {selectedAgent.examples[activeExample].input}
                              </pre>
                            </ScrollArea>
                          </div>

                          {/* Output */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm font-medium">Output</Label>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(selectedAgent.examples[activeExample].output)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <ScrollArea className="h-40">
                              <pre className="text-xs bg-green-50 border border-green-200 p-3 rounded-md whitespace-pre-wrap">
                                {selectedAgent.examples[activeExample].output}
                              </pre>
                            </ScrollArea>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Explanation */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            How it works
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {selectedAgent.examples[activeExample].explanation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="config" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gear className="h-4 w-4" />
                    Current Configuration
                  </CardTitle>
                  <CardDescription>
                    View and understand the agent's current settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedAgent.configuration).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <Label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <div className="text-sm bg-muted p-2 rounded">
                          {typeof value === 'boolean' ? (
                            <Badge variant={value ? "default" : "secondary"}>
                              {value ? "Enabled" : "Disabled"}
                            </Badge>
                          ) : Array.isArray(value) ? (
                            <div className="flex flex-wrap gap-1">
                              {value.map((item, index) => (
                                <Badge key={index} variant="outline">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="font-mono">{String(value)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-medium">Configuration Guide</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
                        <div>
                          <strong>Performance:</strong> Higher accuracy settings increase processing time but improve output quality.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
                        <div>
                          <strong>Languages:</strong> Adding more target languages increases processing complexity but improves global reach.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
                        <div>
                          <strong>Real-time:</strong> Enable for immediate responses, disable for batch processing efficiency.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Training Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Model Type</Label>
                          <p className="text-sm bg-muted p-2 rounded mt-1">
                            {selectedAgent.training.modelType}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Data Source</Label>
                          <p className="text-sm bg-muted p-2 rounded mt-1">
                            {selectedAgent.training.dataSource}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Accuracy</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${selectedAgent.training.accuracy}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {selectedAgent.training.accuracy}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Last Trained</Label>
                          <p className="text-sm bg-muted p-2 rounded mt-1">
                            {selectedAgent.training.lastTrained}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h4 className="font-medium">Training Process</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                          <h5 className="font-medium">Data Collection</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            Gather high-quality training data from multiple sources
                          </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                          <h5 className="font-medium">Model Training</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fine-tune models with domain-specific data
                          </p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <ChartBar className="h-8 w-8 mx-auto mb-2 text-green-500" />
                          <h5 className="font-medium">Validation</h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            Test performance on real-world scenarios
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Eye className="h-4 w-4 mt-0.5 text-blue-600" />
                        <div className="text-sm">
                          <strong className="text-blue-900">Continuous Improvement:</strong>
                          <span className="text-blue-700 ml-1">
                            This agent learns from each interaction and is retrained monthly with new data to maintain high accuracy and adapt to changing requirements.
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}