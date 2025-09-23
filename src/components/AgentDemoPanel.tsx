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
  Lightning,
  ShoppingBag,
  Star,
  Image,
  Translate,
  MegaphoneSimple,
  ChartLineUp,
  ShieldCheck,
  ArrowsCounterClockwise
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
  },
  {
    id: "ebay-kleinanzeigen-agent",
    name: "eBay Kleinanzeigen Agent",
    type: "marketplace",
    icon: <ShoppingBag className="h-5 w-5" />,
    description: "Automated management of eBay Kleinanzeigen listings with local delivery, price negotiation, and spam protection.",
    capabilities: [
      "Local marketplace optimization",
      "Price negotiation handling",
      "Automatic responses",
      "Spam detection and filtering",
      "Multiple payment methods",
      "Location-based delivery"
    ],
    examples: [
      {
        title: "Local Product Listing",
        input: `Product: BPM-2000 Blood Pressure Monitor
Location: Berlin
Condition: New
Price: €89
Delivery: Local pickup + delivery within 25km`,
        output: `eBay Kleinanzeigen Listing Generated:

**Titel:** Digitales Blutdruckmessgerät BPM-2000 - Neu & OVP - Berlin

**Beschreibung:**
Verkaufe ein neues, ungeöffnetes Blutdruckmessgerät BPM-2000.

🏥 Medizingerät der Klasse IIa, CE-zertifiziert
📱 Bluetooth-Verbindung zur Smartphone-App  
👥 Speicher für 2 Nutzer je 120 Messungen
🔋 Automatische Abschaltung, batterieschonend

**Zustand:** Neu mit Originalverpackung
**Preis:** 89€ VB
**Standort:** Berlin-Mitte
**Versand:** Abholung oder Lieferung innerhalb 25km (5€)

✅ Keine Tierhaare, Nichtraucherhaushalt
✅ Rechnung & 2 Jahre Garantie
✅ PayPal, Überweisung oder Bar bei Abholung

Auto-Settings Applied:
🔒 Spam-Filter: Aktiviert
💬 Auto-Antworten: Verfügbarkeit, Zustand, Preis
🚗 Lieferradius: 25km (5€ Aufschlag)
📅 Anzeigen-Dauer: 60 Tage`,
        explanation: "Agent optimized for local marketplace, included trust signals, clear pricing, and enabled automated responses for common inquiries while maintaining personal touch.",
        processingTime: "3.2s",
        confidence: 88
      }
    ],
    configuration: {
      platform: "ebay-kleinanzeigen",
      localRadius: 50,
      autoNegotiation: true,
      spamProtection: true,
      paymentMethods: ["paypal", "bank", "cash"]
    },
    training: {
      modelType: "Local marketplace optimization model",
      dataSource: "German classified ads + regional preferences",
      accuracy: 87.5,
      lastTrained: "2024-01-18"
    }
  },
  {
    id: "email-agent",
    name: "Email Marketing Agent",
    type: "messaging",
    icon: <FileText className="h-5 w-5" />,
    description: "Automated email marketing campaigns, customer service responses, and personalized communication at scale.",
    capabilities: [
      "Automated email campaigns",
      "Personalized responses",
      "A/B testing optimization",
      "Segmentation and targeting",
      "Deliverability optimization",
      "Customer lifecycle management"
    ],
    examples: [
      {
        title: "Customer Support Email",
        input: `Email: "I received my BPM-2000 but the manual is in English only. I need German instructions. Please help."
Customer: Maria Schmidt, Premium customer
Purchase Date: 2024-01-10
Product: BPM-2000`,
        output: `Email Response Generated:

**Betreff:** Deutsche Anleitung für Ihr BPM-2000 - Sofort verfügbar

Liebe Frau Schmidt,

vielen Dank für Ihre Nachricht bezüglich der deutschen Anleitung für Ihr BPM-2000.

Es tut mir leid, dass Sie nur die englische Anleitung erhalten haben. Hier ist sofort Abhilfe:

📱 **Digitale Anleitung:** 
https://goodlink-germany.com/manuals/bpm-2000-de.pdf

📖 **Gedruckte Anleitung:**
Gerne senden wir Ihnen kostenfrei die deutsche Printversion zu.
Versand erfolgt noch heute an Ihre Adresse.

🎥 **Video-Tutorial:**
Kurzes Erklärvideo zur Ersteinrichtung: 
https://youtube.com/watch?v=bpm2000setup-de

Als Premium-Kundin erhalten Sie außerdem:
• Kostenlose Telefon-Hotline: 0800-GOODLINK
• WhatsApp-Support: +49 30 12345678
• Lebenslanger Email-Support

Mit freundlichen Grüßen,
Ihr Good-Link Service Team

Auto-Actions:
✅ German manual shipping scheduled
✅ Customer preference updated (German)
✅ Follow-up reminder set (3 days)
✅ Premium customer badge confirmed`,
        explanation: "Agent identified customer's language preference, provided immediate solutions, offered multiple support channels, and triggered automated follow-up actions for enhanced customer experience.",
        processingTime: "2.1s",
        confidence: 95
      }
    ],
    configuration: {
      personalisation: true,
      languages: ["de", "en", "fr"],
      autoResponse: true,
      abTesting: true,
      deliverability: "high"
    },
    training: {
      modelType: "Email optimization + customer service model",
      dataSource: "20k+ email interactions + deliverability data",
      accuracy: 92.8,
      lastTrained: "2024-01-16"
    }
  },
  {
    id: "social-content-agent",
    name: "Social Media Content Agent",
    type: "content",
    icon: <Users className="h-5 w-5" />,
    description: "Creates engaging social media content across all platforms with optimal timing, hashtags, and cross-platform optimization.",
    capabilities: [
      "Multi-platform content creation",
      "Hashtag strategy optimization",
      "Visual content generation",
      "Posting schedule optimization",
      "Engagement tracking",
      "Trend analysis and adaptation"
    ],
    examples: [
      {
        title: "Product Launch Campaign",
        input: `Product: BPM-3000 (New model launch)
Campaign Goal: Awareness + Pre-orders
Target Audience: Health-conscious Germans 35-65
Budget: €2000/week
Platforms: Instagram, Facebook, LinkedIn, YouTube`,
        output: `Social Media Campaign Created:

📱 **Instagram (7 posts/week):**
Post 1: "🚀 Neu: BPM-3000 mit KI-Analyse"
📸 Product hero shot + tech specs overlay
⏰ Best time: Dienstag 19:30 (highest engagement)
#BlutdruckMessung #DigitaleGesundheit #Innovation2024

Post 2: Story series "Wie funktioniert KI-Blutdruckanalyse?"
🎥 3-part educational series
📊 90% completion rate expected

**💼 LinkedIn B2B Content:**
"Digitale Transformation im Gesundheitswesen: Wie KI-gestützte Blutdruckmessgeräte die Telemedizin revolutionieren"
🎯 Target: Ärzte, Apotheker, Gesundheitsmanager
📈 Engagement boost: +340% für Med-Tech Content

**📺 YouTube:**
"BPM-3000 vs BPM-2000: Was ist neu? [5-Min Review]"
🔍 SEO Keywords: blutdruckmessgerät test 2024, ki gesundheit
🎬 Thumbnail A/B test: Tech-style vs. Lifestyle

**Cross-Platform Strategy:**
⚡ Sequential storytelling across platforms
📊 Unified analytics tracking
🔄 Content repurposing for 5x efficiency
📱 Mobile-first design for 89% mobile users

Expected Results:
👀 Reach: 45k qualified leads
💰 Pre-orders: 180 units (€16,200)
📈 Brand awareness: +28% in target demo`,
        explanation: "Agent created comprehensive multi-platform strategy with platform-specific optimization, sequential storytelling, and data-driven posting schedule to maximize engagement and conversions.",
        processingTime: "8.4s",
        confidence: 91
      }
    ],
    configuration: {
      platforms: ["instagram", "facebook", "linkedin", "youtube", "twitter"],
      contentMix: {promotional: 30, educational: 40, engaging: 30},
      autoPosting: true,
      hashtagOptimization: true
    },
    training: {
      modelType: "Social media optimization + engagement prediction",
      dataSource: "Social analytics + German market trends",
      accuracy: 89.2,
      lastTrained: "2024-01-17"
    }
  },
  {
    id: "review-analysis-agent",
    name: "Review Analysis Agent",
    type: "analytics",
    icon: <Star className="h-5 w-5" />,
    description: "Advanced AI analysis of customer reviews, sentiment tracking, and automated response suggestions across all platforms.",
    capabilities: [
      "Multi-platform review monitoring",
      "Advanced sentiment analysis",
      "Automated response generation",
      "Competitive review benchmarking",
      "Issue trend identification",
      "Review authenticity detection"
    ],
    examples: [
      {
        title: "Negative Review Analysis & Response",
        input: `Review Data:
Platform: Amazon DE
Product: BPM-2000 Blood Pressure Monitor
Rating: 2/5 stars
Review: "Das Gerät ist nach 3 Monaten kaputtgegangen. Bluetooth funktioniert nicht mehr. Sehr enttäuschend für den Preis."
Customer: Verified Purchase, 15 previous reviews
Review Impact: Product rating dropped from 4.6 to 4.4`,
        output: `📊 Sentiment Analysis:
• Overall Sentiment: Highly Negative (-0.84)
• Key Issues: Hardware failure (Bluetooth), Quality concerns, Price dissatisfaction
• Emotion Detection: Disappointment, Frustration
• Authenticity Score: 94% (Verified genuine complaint)

🎯 Impact Assessment:
• Rating Impact: -0.2 stars (significant)
• Sales Risk: Medium-High (technical reliability concern)
• Brand Reputation: Localized impact (German market)
• Similar Issues: 3 related Bluetooth complaints in last 30 days

💬 Suggested Response Strategy:
"Hallo [Kundenname],

vielen Dank für Ihr ehrliches Feedback zum BPM-2000. Es tut uns sehr leid zu hören, dass das Bluetooth-Modul nach 3 Monaten den Dienst versagt hat - das entspricht definitiv nicht unseren Qualitätsstandards.

Sofortige Lösungen:
🔄 Kostenloser Austausch innerhalb 24h
📞 Direkter Technik-Support: 0800-GOODLINK
📱 Firmware-Update verfügbar (löst 89% der BT-Probleme)

Zusätzlich erhalten Sie:
• Verlängerte Garantie auf 3 Jahre
• Premium-Support-Zugang
• 20€ Amazon-Gutschein für die Unannehmlichkeiten

Unser Qualitätsteam wurde über diesen Fall informiert und arbeitet bereits an Verbesserungen für zukünftige Produktionen.

Mit freundlichen Grüßen,
Good-Link Customer Care Team"

🔍 Automated Actions:
✓ Quality team notified about Bluetooth issues
✓ Customer escalated to premium support
✓ Product team tagged for hardware review
✓ Similar reviews flagged for proactive outreach`,
        explanation: "Agent analyzed sentiment, identified technical patterns, assessed business impact, and generated culturally appropriate response with proactive solutions and escalation protocols.",
        processingTime: "2.8s",
        confidence: 92
      }
    ],
    configuration: {
      platforms: ["amazon", "ebay", "google", "trustpilot", "facebook"],
      languages: ["de", "en", "fr", "zh"],
      sentimentThreshold: -0.6,
      autoResponse: false,
      competitorTracking: true
    },
    training: {
      modelType: "BERT + Custom Sentiment + GPT-4",
      dataSource: "150k+ German customer reviews + sentiment data",
      accuracy: 91.8,
      lastTrained: "2024-01-19"
    }
  },
  {
    id: "visual-brand-agent",
    name: "Visual Brand Agent",
    type: "creative",
    icon: <Image className="h-5 w-5" />,
    description: "Complete visual content solution: image/video optimization, generation, SEO enhancement, and brand consistency for all marketing channels.",
    capabilities: [
      "Image optimization & enhancement",
      "AI image generation from prompts",
      "Video optimization & compression",
      "AI video generation & editing",
      "Visual SEO optimization",
      "Brand consistency management",
      "Multi-format output generation",
      "Metadata & alt-text automation"
    ],
    examples: [
      {
        title: "Product Image Generation & Optimization",
        input: `Creative Brief:
Product: BPM-2000 Blood Pressure Monitor
Brand Style: Medical professional, clean, trustworthy
Generation Prompt: "Professional product photo of a modern digital blood pressure monitor on pure white background, studio lighting, medical device photography style, high resolution, clean aesthetic"

Optimization Requirements:
- Amazon format: 2000x2000px, white background
- eBay format: 1600x1600px, lifestyle variant
- Instagram: 1080x1080px, branded template
- SEO: Alt-text in DE/EN, optimized filenames`,
        output: `🎨 Visual Content Suite Generated:

📸 AI Generated Images:
• Main Product Image: 4K studio quality ✓
• Lifestyle Context: Home setting variant ✓
• Detail Shots: 3 close-up angles ✓
• Comparison Chart: VS competitors ✓

🔧 Optimization Results:
• Amazon: 2000x2000px, 180KB, pure white BG ✓
• eBay: 1600x1600px, 120KB, lifestyle setting ✓
• Instagram: 1080x1080px, branded overlay ✓
• Mobile: 800x800px, 60KB, fast loading ✓

📝 SEO Enhancement:
• Filenames: "bmp-2000-blutdruckmessgeraet-digital-amazon.jpg"
• Alt-text DE: "Digitales Blutdruckmessgerät BMP-2000 professionell"
• Alt-text EN: "Professional Digital Blood Pressure Monitor BMP-2000"
• Meta tags: Medical device, CE certified, German quality

🎯 Brand Consistency:
• Logo placement: Bottom right corner ✓
• Color scheme: Medical blue #0066CC ✓
• Typography: Professional sans-serif ✓
• Template applied: Medical device standard ✓

� Performance Prediction:
• CTR improvement: +45% (high-quality visuals)
• Conversion boost: +28% (trust signals)
• Mobile engagement: +67% (optimized loading)
• Brand recognition: +34% (consistent styling)`,
        explanation: "Agent generated professional product images using AI, optimized them for multiple platforms, applied brand guidelines, and enhanced SEO metadata for maximum visibility and conversion.",
        processingTime: "12.3s",
        confidence: 94
      },
      {
        title: "Video Content Creation & Optimization",
        input: `Video Project:
Type: Product demonstration video
Product: BPM-2000 usage tutorial
Duration: 60 seconds
Style: Educational, professional
Platforms: YouTube, Instagram Reels, TikTok

Generation Prompt: "Clean medical demonstration video showing step-by-step blood pressure measurement, professional presenter hands, close-up product shots, educational overlay graphics"

Output Requirements:
- YouTube: 1920x1080p, 60fps, SEO optimized
- Instagram: 1080x1920p (vertical), trending audio
- TikTok: 1080x1920p, engaging hooks
- Amazon: Product demo loop, silent version`,
        output: `🎬 Video Content Suite Created:

🎥 AI Generated Video Content:
• Master Version: 4K 60fps professional demo ✓
• Presenter Hands: Clean medical technique ✓
• Product Close-ups: 5 detailed angles ✓
• Overlay Graphics: Step-by-step instructions ✓

📱 Platform Optimizations:
• YouTube: 1920x1080p, SEO title, chapters, captions ✓
• Instagram: 1080x1920p, trending audio sync ✓
• TikTok: Vertical, hook in first 3s, trending effects ✓
• Amazon: Silent loop, product focus, compliance ✓

🎵 Audio Enhancement:
• Professional voiceover: German + English ✓
• Background music: Medical/professional library ✓
• Sound effects: Button clicks, device sounds ✓
• Captions: Auto-generated in 4 languages ✓

📊 SEO Video Optimization:
• YouTube title: "BPM-2000 Anleitung: Blutdruck richtig messen [Tutorial]"
• Tags: #Blutdruckmessgerät #Gesundheit #Anleitung
• Thumbnail: Custom branded, A/B tested variants
• Description: Keyword-optimized, timestamps

🚀 Performance Metrics:
• Engagement rate: +78% (professional quality)
• Watch time: +45% (clear demonstrations)
• Conversion: +35% (trust building)
• Reach: +156% (multi-platform strategy)`,
        explanation: "Agent created comprehensive video content using AI generation, optimized for each platform's requirements, enhanced with professional audio, and applied SEO best practices for maximum reach.",
        processingTime: "45.2s",
        confidence: 92
      }
    ],
    configuration: {
      aiModels: ["stable-diffusion", "midjourney-api", "runway-ml", "gpt-vision"],
      outputFormats: ["jpeg", "png", "webp", "mp4", "gif"],
      maxResolution: 8000,
      brandTemplates: true,
      seoOptimization: true,
      multiLanguage: ["de", "en", "fr", "zh"]
    },
    training: {
      modelType: "Multimodal AI + Brand Guidelines + SEO Analytics",
      dataSource: "1M+ e-commerce visuals + brand guidelines + performance data",
      accuracy: 93.8,
      lastTrained: "2024-01-25"
    }
  },
  {
    id: "translator-agent",
    name: "Translation Agent",
    type: "content", 
    icon: <Translate className="h-5 w-5" />,
    description: "Professional-grade translation with cultural adaptation, technical terminology, and marketplace localization.",
    capabilities: [
      "Technical document translation",
      "Cultural adaptation and localization",
      "Medical/automotive terminology",
      "Marketplace-specific formatting",
      "Legal compliance translation",
      "SEO keyword translation"
    ],
    examples: [
      {
        title: "Technical Manual Translation",
        input: `Translation Request:
Source: German technical manual for BPM-2000
Text: "Das digitale Blutdruckmessgerät BPM-2000 ist ein Medizinprodukt der Klasse IIa gemäß MDR 2017/745. Bei der Verwendung sind die nationalen Vorschriften zu beachten. Die Kalibrierung erfolgt automatisch alle 24 Monate."
Target Languages: English, French, Chinese
Purpose: International marketplace listings
Technical Level: Medical device documentation`,
        output: `🌍 Professional Translation Results:

🇬🇧 English (Medical Technical):
"The BPM-2000 digital blood pressure monitor is a Class IIa medical device according to MDR 2017/745. National regulations must be observed during use. Calibration is performed automatically every 24 months."

Technical Notes:
• "Medizinprodukt" → "medical device" (regulatory term)
• "Klasse IIa" → "Class IIa" (EU MDR classification)
• "Kalibrierung" → "calibration" (technical precision)

🇫🇷 French (Technical Medical):
"Le tensiomètre numérique BPM-2000 est un dispositif médical de classe IIa conforme au RDM 2017/745. Les réglementations nationales doivent être respectées lors de l'utilisation. L'étalonnage s'effectue automatiquement tous les 24 mois."

Cultural Adaptations:
• "Blutdruckmessgerät" → "tensiomètre" (French medical term)
• "MDR" → "RDM" (French regulatory acronym)
• "Kalibrierung" → "étalonnage" (French technical term)

🇨🇳 Chinese (Simplified - Medical):
"BPM-2000数字血压计是符合MDR 2017/745标准的IIa类医疗器械。使用时必须遵守国家法规。校准每24个月自动执行一次。"

Localization Notes:
• Medical device classification preserved
• Regulatory compliance emphasized
• Technical accuracy maintained for Chinese market

📊 Quality Metrics:
• Translation Accuracy: 98.2%
• Terminology Consistency: 100%
• Cultural Appropriateness: 96.8%
• Technical Precision: 99.1%
• SEO Keyword Preservation: 94.5%

✅ Compliance Verification:
• Medical terminology verified
• Regulatory requirements maintained
• Cultural sensitivities respected
• Marketplace guidelines followed`,
        explanation: "Agent provided professional medical-grade translations with cultural adaptation, maintaining technical accuracy while adapting to local market requirements and regulatory standards.",
        processingTime: "3.6s",
        confidence: 98
      }
    ],
    configuration: {
      languages: ["de", "en", "fr", "zh", "es", "it"],
      specialization: ["medical", "automotive", "technical"],
      culturalAdaptation: true,
      terminologyManagement: true,
      qualityAssurance: "human-verified"
    },
    training: {
      modelType: "Multilingual BERT + Domain-specific LLMs",
      dataSource: "Medical/automotive translations + cultural data",
      accuracy: 97.3,
      lastTrained: "2024-01-20"
    }
  },
  {
    id: "ad-optimizer-agent",
    name: "Advertisement Optimizer Agent",
    type: "advertising",
    icon: <MegaphoneSimple className="h-5 w-5" />,
    description: "AI-powered advertising campaign optimization across Google Ads, Amazon PPC, Facebook Ads with real-time bid management.",
    capabilities: [
      "Multi-platform campaign management",
      "Real-time bid optimization",
      "Audience targeting refinement",
      "Creative performance analysis",
      "Budget allocation optimization",
      "ROI maximization strategies"
    ],
    examples: [
      {
        title: "Amazon PPC Campaign Optimization",
        input: `Campaign Data:
Product: BPM-2000 Blood Pressure Monitor
Platform: Amazon Sponsored Products
Current Performance: 
- CTR: 2.1% (target: 3.5%)
- CPC: €0.89 (budget limit: €1.20)
- ACOS: 28% (target: 20%)
- Conversion Rate: 12.4%
Budget: €500/day
Keywords: 47 active keywords
Competitor Analysis: Available`,
        output: `🎯 Campaign Optimization Strategy:

📊 Performance Analysis:
• CTR below target by 40% → Creative & keyword issues identified
• CPC within budget but ROI suboptimal
• ACOS exceeds target → Need aggressive bid optimization
• Conversion rate strong → Product-market fit confirmed

🔧 Immediate Optimizations:

Keyword Strategy:
✅ Pause 12 low-performing keywords (CTR < 1%)
✅ Increase bids on 8 high-converting terms (+15-25%)
✅ Add 23 new negative keywords to reduce wasted spend
✅ Implement day-parting (peak hours: 18:00-22:00)

Creative Improvements:
• Title A/B Test: "Digital Blood Pressure Monitor" vs "Professional Home BP Monitor"
• Image optimization: Lifestyle image showing ease of use
• Enhanced Brand Content activation
• Bullet point refinement for mobile users

Bid Management:
• High-Intent Keywords: Increase to €1.15 (8 keywords)
• Brand Defense: Competitive bidding on brand terms
• Long-tail Opportunities: Lower bids (€0.45) for discovery

🎯 Projected Improvements (30 days):
• CTR: 2.1% → 3.7% (+76% improvement)
• ACOS: 28% → 18% (-36% improvement)  
• Daily Sales: €890 → €1,340 (+51% revenue)
• ROI: 357% → 556% (+56% profit efficiency)

💰 Budget Reallocation:
• High-performers: +€180/day (60% budget)
• Testing new keywords: +€50/day
• Brand protection: +€70/day
• Reduced waste: -€200/day savings

📈 Advanced Strategies:
• Dayparting: Focus 70% budget on 18:00-22:00
• Geographic optimization: Increase Munich/Hamburg bids
• Device targeting: Mobile bid adjustments (+20%)
• Competitor conquesting: Target competitor keywords`,
        explanation: "Agent analyzed comprehensive campaign data, identified performance gaps, and provided detailed optimization strategy with specific bid adjustments, keyword management, and creative improvements for maximum ROI.",
        processingTime: "5.2s",
        confidence: 94
      }
    ],
    configuration: {
      platforms: ["amazon-ppc", "google-ads", "facebook-ads", "bing-ads"],
      bidStrategy: "target-roas",
      optimizationFrequency: "hourly",
      budgetManagement: "automatic",
      performanceTracking: "real-time"
    },
    training: {
      modelType: "Reinforcement Learning + Campaign Analytics",
      dataSource: "2M+ ad campaigns + performance data",
      accuracy: 88.9,
      lastTrained: "2024-01-21"
    }
  },
  {
    id: "analytics-agent",
    name: "Performance Analytics Agent",
    type: "analytics",
    icon: <ChartLineUp className="h-5 w-5" />,
    description: "Advanced cross-platform analytics with predictive insights, automated reporting, and business intelligence.",
    capabilities: [
      "Cross-platform data integration",
      "Predictive analytics modeling",
      "Automated report generation",
      "Business intelligence insights",
      "Performance benchmarking",
      "Trend analysis and forecasting"
    ],
    examples: [
      {
        title: "Cross-Platform Performance Analysis",
        input: `Analytics Request:
Time Period: Last 90 days
Platforms: Amazon, eBay, OTTO, Facebook Ads, Google Analytics
Products: BPM-2000, H7-LED-6000K, 15 other SKUs
Metrics Focus: Revenue, conversion, customer acquisition
Business Goal: Identify growth opportunities for Q2`,
        output: `📊 Executive Performance Dashboard:

💰 Revenue Analysis (90 days):
• Total Revenue: €247,890 (+23% vs. previous period)
• Amazon: €156,430 (63%) - Best performer
• eBay: €67,200 (27%) - Strong growth +31%
• OTTO: €24,260 (10%) - Opportunity for improvement

🎯 Top Performers:
1. BPM-2000: €89,450 revenue (Best seller)
   - Amazon: 4.8★ rating, 89% Buy Box win
   - eBay: +45% growth, underpriced opportunity
   - Conversion Rate: 12.4% (18% above category average)

2. H7-LED-6000K: €67,230 revenue (Seasonal peak)
   - Strong winter demand (+340% Nov-Jan)
   - Geographic hotspots: Bavaria, NRW
   - Mobile conversion: 76% of sales

📈 Predictive Insights:
• Q2 Revenue Forecast: €310,000-340,000 (+25-35%)
• BPM-2000: Expected demand surge (spring health focus)
• Automotive category: Seasonal decline expected (-20%)
• New customer acquisition: 67% increase opportunity

🚀 Growth Opportunities Identified:

1. OTTO Platform Expansion (+€45k potential):
   • Current share: 10% vs market average 18%
   • Recommendation: Increase product catalog by 40%
   • Investment needed: €8,500 in advertising

2. Mobile Optimization (+€23k potential):
   • Mobile traffic: 68% but conversion: 9.2% vs desktop 15.1%
   • Focus: BPM-2000 mobile checkout optimization
   • Expected impact: +2.8% conversion improvement

3. Geographic Expansion (+€31k potential):
   • Underperforming regions: East Germany, rural areas
   • Solution: Local delivery partnerships
   • Target: Bremen, Leipzig, Dresden markets

📊 Customer Analytics:
• Average Order Value: €76.50 (+€12 vs. competition)
• Customer Lifetime Value: €245
• Repeat Purchase Rate: 34% (excellent for category)
• Peak Purchase Times: 19:00-21:00 weekdays

⚠️ Risk Factors:
• Inventory: H7-LED low stock for spring demand
• Competition: New competitor pricing pressure on BPM series
• Platform dependency: 63% Amazon concentration risk

🎯 Action Plan Recommendations:
1. Increase OTTO investment by €8,500/month
2. Implement mobile-first checkout optimization
3. Diversify inventory for geographic expansion
4. Reduce Amazon dependency to 50% by Q3`,
        explanation: "Agent processed multi-platform data, identified performance patterns, generated predictive insights, and provided actionable recommendations with specific revenue impact projections and risk assessments.",
        processingTime: "7.8s",
        confidence: 91
      }
    ],
    configuration: {
      dataSources: ["amazon", "ebay", "otto", "google-analytics", "facebook"],
      reportingFrequency: "weekly",
      predictionHorizon: 90,
      alertThresholds: "custom",
      dataRetention: 24
    },
    training: {
      modelType: "Time Series + ML Ensemble + BI Analytics",
      dataSource: "E-commerce analytics + market data",
      accuracy: 90.4,
      lastTrained: "2024-01-22"
    }
  },
  {
    id: "compliance-agent",
    name: "Compliance Verification Agent",
    type: "legal",
    icon: <ShieldCheck className="h-5 w-5" />,
    description: "Automated compliance checking for medical devices, automotive parts, and EU regulations with real-time updates.",
    capabilities: [
      "EU MDR compliance verification",
      "CE marking validation",
      "GDPR compliance monitoring",
      "Automotive regulations (ECE)",
      "Product safety standards",
      "Documentation automation"
    ],
    examples: [
      {
        title: "Medical Device Compliance Check",
        input: `Compliance Request:
Product: BPM-2000 Blood Pressure Monitor
Category: Medical Device Class IIa
Markets: Germany, France, Netherlands
Regulations: EU MDR 2017/745, ISO 81060-2
Documentation: Technical file, instructions, labeling
Urgency: Pre-market launch verification`,
        output: `🛡️ Compliance Verification Report:

✅ EU MDR 2017/745 Compliance:
• Class IIa Classification: ✅ Confirmed correct
• Technical Documentation: ✅ Complete (Article 10)
• Clinical Evidence: ✅ ISO 81060-2 validation report present
• Post-Market Surveillance: ✅ System established
• UDI Assignment: ✅ Valid UDI-DI registered
• EUDAMED Registration: ✅ Active registration

📋 Required Documentation Status:
✅ Declaration of Conformity (signed)
✅ Technical File (Article 10 compliant)
✅ Instructions for Use (IFU) - 4 languages
✅ Risk Management File (ISO 14971)
✅ Quality Management System (ISO 13485)
✅ Clinical Evaluation Report

🏷️ Labeling Compliance:
✅ CE Marking: Correct size and placement
✅ Notified Body Number: 0123 (valid)
✅ Manufacturer Information: Complete
✅ Medical Device Symbol: Present
✅ UDI Carrier: Compliant format
✅ Warning Symbols: All required present

🌍 Market-Specific Requirements:

Germany (DE):
✅ MPG compliance (national implementation)
✅ German IFU translation verified
✅ DIMDI database registration completed
✅ Reimbursement code compatibility checked

France (FR):
✅ ANSM notification not required (Class IIa)
✅ French labeling requirements met
✅ LPPR listing eligibility confirmed

Netherlands (NL):
✅ IGJ notification completed
✅ Dutch language requirements satisfied
✅ Reimbursement pathway identified

⚠️ Action Items Required:
1. Update IFU with latest MDR Article 18 requirements
2. Clinical evaluation update due in 8 months
3. Post-market surveillance report due Q2 2024

🔄 Ongoing Monitoring:
• Regulatory changes: Auto-monitored
• Certificate validity: Expires Dec 2025
• Clinical data updates: Next review Oct 2024
• Vigilance reporting: System active

📊 Compliance Score: 96.8%
• Documentation: 98%
• Labeling: 100%
• Registration: 95%
• Market access: 94%

✅ Launch Approval: APPROVED for all target markets
Estimated time to market: 2-3 weeks pending final IFU update`,
        explanation: "Agent performed comprehensive compliance verification across multiple regulatory frameworks, identified all requirements, checked documentation completeness, and provided clear go-to-market approval with specific action items.",
        processingTime: "6.1s",
        confidence: 97
      }
    ],
    configuration: {
      regions: ["eu", "de", "fr", "nl", "uk"],
      productCategories: ["medical", "automotive", "electronics"],
      regulatoryUpdates: "real-time",
      documentTracking: true,
      alerting: "critical-only"
    },
    training: {
      modelType: "Legal NLP + Regulatory Database + Document AI",
      dataSource: "EU regulations + compliance documents",
      accuracy: 96.1,
      lastTrained: "2024-01-23"
    }
  },
  {
    id: "cross-platform-sync-agent",
    name: "Cross-Platform Sync Agent",
    type: "automation",
    icon: <ArrowsCounterClockwise className="h-5 w-5" />,
    description: "Advanced real-time synchronization across all platforms with conflict resolution, data integrity, and automated failover.",
    capabilities: [
      "Real-time multi-platform sync",
      "Conflict resolution automation",
      "Data integrity verification",
      "Automated failover handling",
      "Performance optimization",
      "Audit trail maintenance"
    ],
    examples: [
      {
        title: "Critical Inventory Sync Crisis",
        input: `Sync Emergency:
Issue: Amazon API timeout causing inventory mismatch
Affected Products: 23 SKUs including BPM-2000
Current State: Amazon shows 0 stock, actual inventory: 156 units
Sales Impact: €2,890 lost sales in last 3 hours
Other Platforms: eBay, OTTO functioning normally
Priority Level: Critical - immediate action required`,
        output: `🚨 Emergency Sync Protocol Activated:

⚡ Immediate Actions (0-5 minutes):
✅ Amazon API connection restored via backup endpoint
✅ Emergency inventory push: 23 SKUs updated
✅ BPM-2000: Stock corrected from 0 → 156 units
✅ Sales re-enabled on all affected listings
✅ Customer notifications sent for delayed orders

🔧 Technical Resolution:
• Root Cause: Amazon MWS rate limiting timeout
• Solution: Implemented exponential backoff retry logic
• Failover: Switched to SP-API backup connection
• Data Validation: All 23 SKUs inventory verified accurate
• Performance: Sync time improved from 45s to 12s

📊 Sync Status Dashboard:
• Amazon: ✅ ONLINE (12s sync interval)
• eBay: ✅ ONLINE (15s sync interval)  
• OTTO: ✅ ONLINE (18s sync interval)
• Kaufland: ✅ ONLINE (20s sync interval)
• Internal DB: ✅ SYNCHRONIZED

🔄 Real-Time Monitoring:
• Data Integrity: 100% verified
• Sync Conflicts: 0 active conflicts
• API Health: All endpoints operational
• Latency: Average 8.2s (Target: <15s)
• Error Rate: 0.02% (Well below 1% threshold)

💰 Business Impact Recovery:
• Sales Resume Time: 4 minutes 32 seconds
• Revenue Recovery: €2,890 potential loss prevented
• Customer Experience: No negative impact
• Platform Rankings: Maintained (no out-of-stock penalty)

🛡️ Preventive Measures Implemented:
• Enhanced monitoring: 30-second health checks
• Triple redundancy: 3 backup API endpoints configured  
• Smart retry logic: Exponential backoff with jitter
• Proactive alerts: 95% threshold warnings enabled
• Auto-scaling: Dynamic rate limit adaptation

📈 Performance Improvements:
• Sync Reliability: 99.2% → 99.8%
• Average Resolution Time: 45min → 4.5min
• False Positive Alerts: Reduced by 67%
• System Uptime: 99.97% (last 30 days)

📋 Audit Trail:
• Event Log: All actions recorded with timestamps
• Compliance: SOX audit trail maintained
• Recovery Documentation: Incident report generated
• Post-mortem: Scheduled for tomorrow 10:00 CET

🔮 Predictive Insights:
• Similar Issue Probability: 2.1% next 30 days
• Recommended Infrastructure: Add EU backup region
• Monitoring Enhancement: ML-based anomaly detection`,
        explanation: "Agent handled critical sync emergency with immediate resolution, implemented preventive measures, maintained data integrity, and provided comprehensive business impact analysis with future recommendations.",
        processingTime: "3.4s",
        confidence: 98
      }
    ],
    configuration: {
      syncFrequency: "real-time",
      platforms: ["amazon", "ebay", "otto", "kaufland", "bol"],
      conflictResolution: "automatic",
      failoverMode: "intelligent",
      auditLevel: "comprehensive"
    },
    training: {
      modelType: "Distributed Systems + ML Conflict Resolution",
      dataSource: "Platform APIs + sync pattern data",
      accuracy: 98.7,
      lastTrained: "2024-01-24"
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [demoMetrics, setDemoMetrics] = useState<{
    processingTime: string
    confidence: number
    tokensUsed: number
    costEstimate: string
  } | null>(null)

  const runCustomDemo = async () => {
    if (!demoInput.trim() && uploadedFiles.length === 0) {
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

Keywords: ${(demoInput || '').toLowerCase().split(' ').slice(0, 5).join(', ')}
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
        
      case "ebay-kleinanzeigen-agent":
        output = `eBay Kleinanzeigen Listing:
📍 Standort: Berlin-Mitte
🏷️ Titel: ${demoInput} - Neu & Original verpackt

💰 Preis: €${(Math.random() * 100 + 20).toFixed(2)} VB
🚗 Lieferung: Abholung oder Lieferung (5€ innerhalb 25km)
💳 Zahlung: PayPal, Überweisung, Bar

Auto-Features aktiviert:
✅ Spam-Filter: Verdächtige Anfragen blockiert
✅ Auto-Antworten: Verfügbarkeit bestätigt
✅ Preis-Verhandlung: Minimum 85% akzeptiert
✅ Lieferradius: 25km Zone aktiv

Lokale Optimierung:
- Berliner Dialekt erkannt und angepasst
- Typische Kleinanzeigen-Sprache verwendet
- Vertrauenssignale hinzugefügt`
        break
        
      case "email-agent":
        output = `Email Campaign Generated:

📧 Betreff: Exklusive Neuigkeiten zu ${demoInput}
👥 Zielgruppe: Premium-Kunden (2,340 Empfänger)

Liebe/r Kunde/in,

vielen Dank für Ihr Vertrauen in Good-Link! Wir haben aufregende Neuigkeiten zu ${demoInput}.

🎯 Personalisierte Inhalte:
• Basierend auf Ihren bisherigen Käufen
• Optimale Sendezeit: ${Math.floor(Math.random() * 12) + 8}:${['00', '15', '30', '45'][Math.floor(Math.random() * 4)]} Uhr
• A/B Test: Version mit 23% höherer Öffnungsrate

📊 Erwartete Performance:
• Öffnungsrate: ${Math.floor(Math.random() * 10) + 45}%
• Klickrate: ${Math.floor(Math.random() * 5) + 12}%
• Conversion: ${Math.floor(Math.random() * 3) + 8}%

Auto-Features:
✅ Spam-Score: 2.1/10 (Excellent)
✅ Mobile-optimiert: 100%
✅ DSGVO-konform: Vollständig`
        break
        
      case "social-content-agent":
        output = `Social Media Content Suite:

📱 Instagram (3 Posts/Woche):
Post 1: "${demoInput} - Innovation trifft Design ✨"
📸 Hero-Shot + Carousel mit Features
⏰ Optimale Zeit: Di 19:30 (89% Engagement)
#Innovation #Design #Qualität #${demoInput.replace(/\s+/g, '')}

📘 Facebook Kampagne:
"Entdecken Sie ${demoInput} - Jetzt mit 15% Frühjahrs-Rabatt!"
🎯 Audience: Gesundheitsbewusste 35-65 Jahre
💰 Budget: €50/Tag | ROAS erwartet: 4.2x

💼 LinkedIn B2B:
"Fallstudie: Wie ${demoInput} die Patientenversorgung verbessert"
📊 Zielgruppe: Ärzte, Gesundheitsmanager
📈 Engagement-Rate: +340% vs Standard-Posts

📺 YouTube:
"${demoInput} im Test: Alle Features in 3 Minuten"
🔍 SEO-Keywords: Integriert (150+ relevante Terms)
👀 Erwartete Views: 15k in ersten 30 Tagen

Cross-Platform Analytics:
📊 Unified Tracking über alle Kanäle
🔄 Content-Recycling für 5x Effizienz`
        break
        
      case "blog-agent":
        output = `Blog-Artikel generiert:

📝 Titel: "Der ultimative ${demoInput} Ratgeber 2024"
📊 Ziel-Keywords: ${Math.floor(Math.random() * 15) + 8} strategisch platziert
📖 Wortanzahl: ${Math.floor(Math.random() * 500) + 1200} Wörter

✍️ Content-Struktur:
1. Einleitung mit Hook (150 Wörter)
2. Was ist ${demoInput}? (300 Wörter)
3. Top 5 Vorteile (400 Wörter)
4. Kaufberatung (350 Wörter)
5. FAQ & Fazit (200 Wörter)

🔍 SEO-Optimierung:
• Meta-Description: 155 Zeichen, optimiert
• H2/H3 Struktur: Perfekt für Featured Snippets
• Interne Links: 8 strategische Verlinkungen
• Externe Quellen: 4 autoritäre Referenzen
• Keyword-Dichte: 1.8% (optimal)

📈 Performance-Prognose:
• Ranking-Potenzial: Top 5 in 3-6 Monaten
• Erwarteter Traffic: 2,500 Besucher/Monat
• Conversion-Rate: 8.5% (Branchendurchschnitt: 3.2%)`
        break
        
      case "review-analysis-agent":
        output = `Review Analysis Report:

📊 Sentiment Analysis for "${demoInput}":
• Overall Sentiment: ${Math.random() > 0.7 ? 'Positive (+0.72)' : Math.random() > 0.4 ? 'Neutral (0.12)' : 'Negative (-0.45)'}
• Key Themes: Quality, Performance, Value for money
• Emotion Detection: ${['Satisfaction', 'Excitement', 'Concern', 'Disappointment'][Math.floor(Math.random() * 4)]}
• Authenticity Score: ${Math.floor(Math.random() * 20) + 80}% (High confidence)

📈 Review Impact:
• Rating Influence: ${Math.random() > 0.5 ? '+0.2' : '-0.1'} stars potential
• Sales Correlation: ${Math.floor(Math.random() * 30) + 15}% conversion impact
• Competitive Positioning: ${Math.floor(Math.random() * 20) + 80}% vs category average

💬 Suggested Response Strategy:
"Thank you for your detailed feedback about ${demoInput}. 
We appreciate your honest review and take your concerns seriously.
Our customer service team will contact you within 24 hours."

🔍 Automated Actions:
✓ Customer service team notified
✓ Product team tagged for review
✓ Quality assurance alert triggered
✓ Follow-up reminder set (48 hours)`
        break
        
      case "visual-brand-agent":
        // Handle uploaded files first
        if (uploadedFiles.length > 0) {
          const uploadedFile = uploadedFiles[0]
          const isVideo = uploadedFile.type.startsWith('video/')
          const isImage = uploadedFile.type.startsWith('image/')
          
          if (isImage) {
            output = `🎨 **Image Processing Complete** for "${uploadedFile.name}":

📸 **Original Analysis:**
• Filename: ${uploadedFile.name}
• Size: ${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
• Format: ${uploadedFile.type}
• Dimensions: Auto-detected and analyzed ✓

🔧 **AI-Powered Optimization:**
• Amazon: 2000x2000px, pure white background ✓
• eBay: 1600x1600px, lifestyle context ✓  
• Instagram: 1080x1080px, branded template ✓
• Mobile: 800x800px, optimized for speed ✓

📝 **Smart SEO Enhancement:**
• Auto-generated filenames for each platform ✓
• Multi-language alt-text (DE/EN/FR/ZH) ✓
• Keywords extracted from image content ✓

🎯 **Brand Consistency Applied:**
• Logo placement: Professional positioning ✓
• Color scheme: Brand guidelines enforced ✓
• Quality enhancement: +${Math.floor(Math.random() * 20) + 40}% clarity ✓

📊 **Performance Predictions:**
• CTR improvement: +${Math.floor(Math.random() * 25) + 45}% (professional quality)
• Conversion boost: +${Math.floor(Math.random() * 15) + 30}% (enhanced trust signals)
• Page load speed: ${Math.floor(Math.random() * 2) + 2}.${Math.floor(Math.random() * 9)}x faster (optimization)`
          } else if (isVideo) {
            output = `🎬 **Video Processing Complete** for "${uploadedFile.name}":

🎥 **Original Analysis:**
• Filename: ${uploadedFile.name}
• Size: ${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
• Format: ${uploadedFile.type}
• Duration: ${Math.floor(Math.random() * 120) + 30} seconds analyzed ✓

📱 **Multi-Platform Optimization:**
• YouTube: 1920x1080p, SEO-optimized ✓
• Instagram Reels: 1080x1920p ✓
• TikTok: Vertical format, engagement hooks ✓
• Amazon: Product demo loop ✓

🎵 **Audio Enhancement:**
• Background music: Professional library ✓
• Captions: Auto-generated in ${Math.floor(Math.random() * 3) + 3} languages ✓
• Voiceover: AI-generated professional narration ✓

🎯 **Brand Integration:**
• Logo overlay: Consistent positioning ✓
• Color grading: Brand palette applied ✓
• Intro/outro: Professional templates ✓

📊 **Performance Predictions:**
• Engagement rate: +${Math.floor(Math.random() * 35) + 65}% (professional quality)
• Watch time: +${Math.floor(Math.random() * 25) + 40}% (clear content)
• Conversion rate: +${Math.floor(Math.random() * 20) + 30}% (trust-building)`
          } else {
            output = `❌ **Unsupported File Format**
            
Please upload one of the following:
📸 **Images:** JPG, PNG, WebP, GIF
🎬 **Videos:** MP4, MOV, AVI, WebM

Current file: ${uploadedFile.name} (${uploadedFile.type})`
          }
        } else {
        output = `🎨 Visual Content Generated for "${demoInput}":

📸 AI Image Generation:
• Product Shot: Professional studio quality ✓
• Lifestyle Image: Home setting context ✓
• Detail Views: 3 close-up angles ✓
• Brand Template: Applied consistency ✓

🎬 Video Content (if requested):
• Demo Video: ${Math.floor(Math.random() * 30) + 30}s professional tutorial ✓
• Platform Variants: YouTube, Instagram, TikTok ✓
• Audio: Professional voiceover + music ✓
• SEO: Optimized titles, tags, descriptions ✓

� Multi-Platform Optimization:
• Amazon: 2000x2000px, white background ✓
• eBay: 1600x1600px, lifestyle setting ✓
• Instagram: 1080x1080px, branded overlay ✓
• Mobile: 800x800px, fast loading ✓

📝 SEO & Brand Enhancement:
• Filenames: SEO-optimized naming ✓
• Alt-text: Generated in ${Math.floor(Math.random() * 3) + 2} languages ✓
• Brand colors: Applied consistently ✓
• Logo placement: Optimal positioning ✓

📊 Performance Prediction:
• CTR improvement: +${Math.floor(Math.random() * 25) + 35}%
• Brand recognition: +${Math.floor(Math.random() * 20) + 25}%
• Engagement rate: +${Math.floor(Math.random() * 30) + 45}%

💡 **Tip:** Upload an image or video file for personalized analysis!`
        }
        break
        
      case "translator-agent":
        output = `Professional Translation Complete:

🌍 Translation Results for "${demoInput}":

🇬🇧 English (Technical):
"${demoInput} - Professional-grade solution with advanced features"

🇫🇷 French (Localized):
"${demoInput} - Solution professionnelle avec fonctionnalités avancées"

🇨🇳 Chinese (Simplified):
"${demoInput} - 专业级解决方案，具备先进功能"

📊 Quality Metrics:
• Translation Accuracy: ${Math.floor(Math.random() * 10) + 90}%
• Cultural Adaptation: ${Math.floor(Math.random() * 15) + 85}%
• Technical Precision: ${Math.floor(Math.random() * 8) + 92}%
• SEO Keyword Preservation: ${Math.floor(Math.random() * 12) + 88}%

✅ Compliance Verification:
• Medical terminology: Verified ✓
• Technical accuracy: Maintained ✓
• Cultural appropriateness: Confirmed ✓
• Marketplace guidelines: Followed ✓

🎯 Localization Features:
• Regional preferences adapted
• Currency and units converted  
• Legal requirements integrated
• Cultural sensitivities respected`
        break
        
      case "ad-optimizer-agent":
        output = `Advertisement Optimization Report:

🎯 Campaign Analysis for "${demoInput}":
• Current CTR: ${(Math.random() * 2 + 1).toFixed(1)}%
• Target CTR: ${(Math.random() * 2 + 3).toFixed(1)}%
• Current CPC: €${(Math.random() * 0.5 + 0.5).toFixed(2)}
• ACOS: ${Math.floor(Math.random() * 10) + 20}%

🔧 Optimization Strategy:
• Keyword bid adjustments: ${Math.floor(Math.random() * 15) + 8} keywords optimized
• Negative keywords added: ${Math.floor(Math.random() * 10) + 15} terms
• Ad copy variations: ${Math.floor(Math.random() * 3) + 2} new creatives
• Targeting refinement: Demographics + interests updated

📈 Projected Improvements (30 days):
• CTR increase: +${Math.floor(Math.random() * 30) + 40}%
• ACOS reduction: -${Math.floor(Math.random() * 8) + 12}%
• Revenue growth: +€${(Math.random() * 500 + 200).toFixed(0)}
• ROI improvement: +${Math.floor(Math.random() * 50) + 30}%

💰 Budget Optimization:
• High-performers: +€${Math.floor(Math.random() * 100) + 50}/day
• Underperformers: -€${Math.floor(Math.random() * 50) + 25}/day
• New opportunities: €${Math.floor(Math.random() * 75) + 25}/day testing budget`
        break
        
      case "analytics-agent":
        output = `Performance Analytics Report:

📊 Cross-Platform Analysis for "${demoInput}":

💰 Revenue Breakdown (Last 30 days):
• Total Revenue: €${(Math.random() * 20000 + 10000).toFixed(0)}
• Amazon: ${Math.floor(Math.random() * 30) + 50}% of total
• eBay: ${Math.floor(Math.random() * 20) + 20}% of total
• Other Platforms: ${Math.floor(Math.random() * 15) + 15}% of total

📈 Key Performance Metrics:
• Conversion Rate: ${(Math.random() * 5 + 8).toFixed(1)}%
• Average Order Value: €${(Math.random() * 30 + 50).toFixed(0)}
• Customer Acquisition Cost: €${(Math.random() * 15 + 10).toFixed(0)}
• Customer Lifetime Value: €${(Math.random() * 100 + 150).toFixed(0)}

🔮 Predictive Insights:
• Next 30 days forecast: €${(Math.random() * 25000 + 15000).toFixed(0)}
• Growth opportunity: +${Math.floor(Math.random() * 20) + 15}%
• Risk factors: ${Math.floor(Math.random() * 3) + 1} identified
• Recommended actions: ${Math.floor(Math.random() * 5) + 3} priorities

🎯 Growth Opportunities:
• Platform expansion potential: +€${(Math.random() * 5000 + 2000).toFixed(0)}
• SEO optimization impact: +${Math.floor(Math.random() * 15) + 10}% traffic
• Mobile conversion improvement: +${Math.floor(Math.random() * 8) + 5}%
• Customer retention programs: +${Math.floor(Math.random() * 12) + 8}% repeat sales`
        break
        
      case "compliance-agent":
        output = `Compliance Verification Report:

🛡️ Regulatory Analysis for "${demoInput}":

✅ EU Compliance Status:
• CE Marking: ${Math.random() > 0.1 ? 'Compliant ✓' : 'Action Required ⚠️'}
• GDPR Requirements: ${Math.random() > 0.05 ? 'Fully Compliant ✓' : 'Minor Updates Needed ⚠️'}
• Product Safety: ${Math.random() > 0.15 ? 'Standards Met ✓' : 'Testing Required ⚠️'}
• Documentation: ${Math.random() > 0.1 ? 'Complete ✓' : 'Updates Pending ⚠️'}

📋 Market-Specific Requirements:
Germany (DE): ${Math.random() > 0.1 ? '✅ Compliant' : '⚠️ Action needed'}
France (FR): ${Math.random() > 0.1 ? '✅ Compliant' : '⚠️ Action needed'}
Netherlands (NL): ${Math.random() > 0.1 ? '✅ Compliant' : '⚠️ Action needed'}

🏷️ Labeling & Documentation:
• Technical File: ${Math.random() > 0.1 ? 'Complete' : 'Update required'}
• Instructions for Use: ${Math.random() > 0.1 ? 'Multilingual ready' : 'Translation needed'}
• Risk Assessment: ${Math.random() > 0.1 ? 'Current' : 'Review scheduled'}
• Quality Management: ${Math.random() > 0.1 ? 'ISO certified' : 'Audit pending'}

📊 Compliance Score: ${Math.floor(Math.random() * 10) + 90}%
• Documentation: ${Math.floor(Math.random() * 15) + 85}%
• Regulatory: ${Math.floor(Math.random() * 12) + 88}%
• Market Access: ${Math.floor(Math.random() * 20) + 80}%

✅ Launch Status: ${Math.random() > 0.2 ? 'APPROVED for all markets' : 'PENDING minor corrections'}
Estimated time to market: ${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 3) + 3} weeks`
        break
        
      case "cross-platform-sync-agent":
        output = `Cross-Platform Sync Status:

🔄 Real-time Synchronization for "${demoInput}":

📊 Platform Status:
• Amazon: ✅ SYNCED (${(Math.random() * 10 + 5).toFixed(1)}s)
• eBay: ✅ SYNCED (${(Math.random() * 15 + 8).toFixed(1)}s)
• OTTO: ✅ SYNCED (${(Math.random() * 20 + 10).toFixed(1)}s)
• Kaufland: ✅ SYNCED (${(Math.random() * 25 + 12).toFixed(1)}s)

⚡ Performance Metrics:
• Sync Success Rate: ${(Math.random() * 5 + 95).toFixed(1)}%
• Average Latency: ${(Math.random() * 15 + 8).toFixed(1)} seconds
• Data Integrity: ${(Math.random() * 2 + 98).toFixed(1)}%
• Conflict Resolution: ${Math.floor(Math.random() * 3)} active conflicts

🔧 Automated Actions:
• Inventory levels synchronized across all platforms
• Pricing updates propagated (${Math.floor(Math.random() * 30) + 10} products)
• Product information standardized
• Stock alerts configured for low inventory

📈 Business Impact:
• Revenue protection: €${(Math.random() * 1000 + 500).toFixed(0)}/day
• Out-of-stock prevention: ${Math.floor(Math.random() * 10) + 90}% effective
• Price optimization: +€${(Math.random() * 200 + 100).toFixed(0)}/week
• Operational efficiency: +${Math.floor(Math.random() * 30) + 40}%

🛡️ Failover Status:
• Backup systems: ${Math.floor(Math.random() * 3) + 2} endpoints active
• Recovery time: <${Math.floor(Math.random() * 3) + 2} minutes
• Data backup: Last backup ${Math.floor(Math.random() * 10) + 5} minutes ago
• System health: ${Math.floor(Math.random() * 5) + 95}% optimal`
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
    <div className="space-y-4 sm:space-y-6">
      {/* Agent Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {agentDemos.map((agent) => (
          <Card 
            key={agent.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedAgent.id === agent.id ? 'ring-2 ring-primary shadow-lg' : ''
            }`}
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="flex items-center gap-2 text-xs sm:text-sm">
                {agent.icon}
                {agent.name}
              </CardTitle>
              <CardDescription className="text-[10px] sm:text-xs line-clamp-2">
                {agent.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  {agent.type}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                  <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500" />
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
            <TabsList className="grid w-full gap-1 admin-tabs-mobile grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="demo" className="text-xs sm:text-sm p-2 sm:p-3">{t("agent.liveDemo")}</TabsTrigger>
              <TabsTrigger value="examples" className="text-xs sm:text-sm p-2 sm:p-3">{t("common.examples")}</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs sm:text-sm p-2 sm:p-3 hidden lg:flex">{t("common.performance")}</TabsTrigger>
              <TabsTrigger value="config" className="text-xs sm:text-sm p-2 sm:p-3 hidden lg:flex">{t("common.configuration")}</TabsTrigger>
              <TabsTrigger value="training" className="text-xs sm:text-sm p-2 sm:p-3 hidden lg:flex">{t("common.training")}</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                      {t("agent.tryAgent")}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {t("agent.enterInput")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div>
                      <Label className="text-xs sm:text-sm">{t("agent.input")}</Label>
                      {selectedAgent.id === 'visual-brand-agent' && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 mb-2">
                          💡 Demo simulation: Describe visual content needs (image generation, optimization, video creation)
                        </p>
                      )}
                      <Textarea
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        placeholder={
                          selectedAgent.id === 'visual-brand-agent' 
                            ? 'Describe your visual content needs (e.g., "Generate product photos for BPM-2000" or "Optimize existing images for Amazon")'
                            : selectedAgent.id === 'translator-agent'
                            ? 'Enter text to translate (e.g., product description, technical specs)'
                            : selectedAgent.id === 'review-agent'
                            ? 'Enter customer review text to analyze'
                            : `Enter input for ${selectedAgent.name}...`
                        }
                        rows={3}
                        className="mt-1 text-xs sm:text-sm"
                      />
                    </div>
                    <Button 
                      onClick={runCustomDemo} 
                      disabled={isRunningDemo || !demoInput.trim()}
                      className="w-full text-xs sm:text-sm"
                      size="sm"
                    >
                      {isRunningDemo ? (
                        <>
                          <Lightning className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
                          {t("agent.processing")}
                        </>
                      ) : (
                        <>
                          <Robot className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          {t("agent.runDemo")}
                        </>
                      )}
                    </Button>
                    
                    {/* Demo Output */}
                    {demoOutput && (
                      <Card className="mt-3 sm:mt-4">
                        <CardHeader className="pb-2 sm:pb-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                              <Sparkle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                              {t("agent.demoOutput")}
                            </CardTitle>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(demoOutput)}
                              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                            >
                              <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-32 sm:h-48">
                            <pre className="text-[10px] sm:text-sm bg-green-50 border border-green-200 p-2 sm:p-4 rounded-md whitespace-pre-wrap">
                              {demoOutput}
                            </pre>
                          </ScrollArea>
                          
                          {demoMetrics && (
                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                <div className="text-center">
                                  <div className="text-[10px] sm:text-sm text-muted-foreground">Processing Time</div>
                                  <div className="font-semibold text-xs sm:text-sm">{demoMetrics.processingTime}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-[10px] sm:text-sm text-muted-foreground">Confidence</div>
                                  <div className="font-semibold text-green-600 text-xs sm:text-sm">{demoMetrics.confidence}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-[10px] sm:text-sm text-muted-foreground">Tokens Used</div>
                                  <div className="font-semibold text-xs sm:text-sm">{demoMetrics.tokensUsed.toLocaleString()}</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-[10px] sm:text-sm text-muted-foreground">Cost Est.</div>
                                  <div className="font-semibold text-xs sm:text-sm">{demoMetrics.costEstimate}</div>
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
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <Sparkle className="h-3 w-3 sm:h-4 sm:w-4" />
                      {t("agent.capabilities")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {selectedAgent.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{capability}</span>
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

            <TabsContent value="examples" className="mt-4 sm:mt-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Example Selection */}
                <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
                  {selectedAgent.examples.map((example, index) => (
                    <Button
                      key={index}
                      variant={activeExample === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveExample(index)}
                      className="whitespace-nowrap text-xs sm:text-sm flex-shrink-0"
                    >
                      {example.title}
                    </Button>
                  ))}
                </div>

                {/* Example Display */}
                {selectedAgent.examples[activeExample] && (
                  <div className="space-y-3 sm:space-y-4">
                    <Card>
                      <CardHeader className="pb-2 sm:pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                          <CardTitle className="text-sm sm:text-lg">
                            {selectedAgent.examples[activeExample].title}
                          </CardTitle>
                          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Lightning className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              {selectedAgent.examples[activeExample].processingTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              {selectedAgent.examples[activeExample].confidence}% confidence
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          {/* Input */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-xs sm:text-sm font-medium">Input</Label>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(selectedAgent.examples[activeExample].input)}
                                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                              >
                                <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              </Button>
                            </div>
                            <ScrollArea className="h-32 sm:h-40">
                              <pre className="text-[10px] sm:text-xs bg-muted p-2 sm:p-3 rounded-md whitespace-pre-wrap">
                                {selectedAgent.examples[activeExample].input}
                              </pre>
                            </ScrollArea>
                          </div>

                          {/* Output */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-xs sm:text-sm font-medium">Output</Label>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => copyToClipboard(selectedAgent.examples[activeExample].output)}
                                className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                              >
                                <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              </Button>
                            </div>
                            <ScrollArea className="h-32 sm:h-40">
                              <pre className="text-[10px] sm:text-xs bg-green-50 border border-green-200 p-2 sm:p-3 rounded-md whitespace-pre-wrap">
                                {selectedAgent.examples[activeExample].output}
                              </pre>
                            </ScrollArea>
                          </div>
                        </div>

                        <Separator className="my-3 sm:my-4" />

                        {/* Explanation */}
                        <div>
                          <Label className="text-xs sm:text-sm font-medium mb-2 block">
                            How it works
                          </Label>
                          <p className="text-xs sm:text-sm text-muted-foreground">
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