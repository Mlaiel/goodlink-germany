import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { 
  ShoppingCart, 
  Truck, 
  Shield, 
  Star, 
  TrendUp, 
  Globe,
  ArrowRight,
  Users,
  Package,
  ChatCircle
} from "@phosphor-icons/react"

interface HomePageProps {
  onNavigate: (section: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage()

  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: t("Medical Grade Quality"),
      description: t("Certified medical devices and automotive components meeting EU/CE standards")
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: t("China-EU Bridge"), 
      description: t("Direct sourcing from trusted manufacturers in Shenzhen, Shanghai, and Hong Kong")
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("Compliance Assured"),
      description: t("Full regulatory compliance for medical devices (MDR/CE) and automotive (EMC/ROHS)")
    },
    {
      icon: <ChatCircle className="h-6 w-6" />,
      title: t("Expert Support"),
      description: t("Technical support from specialists in German, English, and Chinese")
    }
  ]

  const stats = [
    { label: t("B2B Partners"), value: "500+", icon: <Users className="h-5 w-5" /> },
    { label: t("Components"), value: "2,000+", icon: <Package className="h-5 w-5" /> },
    { label: t("Years Experience"), value: "20+", icon: <Globe className="h-5 w-5" /> },
    { label: t("Revenue 2023"), value: "€93M", icon: <TrendUp className="h-5 w-5" /> }
  ]

  const categories = [
    {
      name: t("Medical Devices"),
      image: "🏥",
      count: "800+ components",
      description: "ECG cables, pressure sensors, infusion pump motors"
    },
    {
      name: t("Automotive Parts"), 
      image: "🚗",
      count: "600+ components",
      description: "Wire harnesses, connectors, CAN bus cables"
    },
    {
      name: t("Connectors & Cables"),
      image: "🔌",
      count: "500+ variants",
      description: "Medical grade and automotive certified connections"
    },
    {
      name: t("Motors & Sensors"),
      image: "⚙️",
      count: "300+ models",
      description: "Precision motors, sensors for medical and automotive use"
    },
    {
      name: t("Mechanical Components"),
      image: "🛞",
      count: "400+ parts",
      description: "Castors, housings, mechanical assemblies"
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section - More Compact */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 md:p-8">
        <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 w-fit">
              {t("🏥 Medical & Automotive Excellence")}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t("Good-Link Germany")}
              </span>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("Premium medical devices and automotive components. Your trusted bridge between Europe and China since 2020.")}
            </p>
            <div className="flex flex-row gap-3">
              <Button 
                onClick={() => onNavigate("shop")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t("Browse Catalog")}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate("blog")}
                className="border-2 hover:bg-blue-50 transition-colors"
              >
                {t("Learn More")}
              </Button>
            </div>
          </div>
          <div className="relative lg:col-span-1">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-4xl">
              🛍️
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-lg animate-bounce">
              <Star className="h-4 w-4 text-yellow-800" />
            </div>
          </div>
        </div>
      </section>

      {/* Combined Stats & Features Section */}
      <section className="grid lg:grid-cols-5 gap-6">
        {/* Stats Column */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-center lg:text-left">{t("Our Numbers")}</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-center mb-1 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Column */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-xl font-semibold text-center lg:text-left">{t("Why Choose Us?")}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-all hover:-translate-y-0.5">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories & CTA Combined Section */}
      <section className="grid lg:grid-cols-3 gap-8">
        {/* Categories Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-2">{t("Shop by Category")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("Explore our diverse range of products across multiple categories.")}
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 text-center group"
                onClick={() => onNavigate("shop")}
              >
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {category.image}
                  </div>
                  <h3 className="font-medium text-xs mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 h-full flex flex-col">
            <CardContent className="pt-6 pb-6 flex-1 flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold mb-3">
                {t("Ready to Start Shopping?")}
              </h3>
              <p className="text-sm opacity-90 mb-4">
                {t("Join thousands of satisfied customers and discover amazing products with our AI-powered shopping experience.")}
              </p>
              <div className="space-y-3">
                <Button 
                  variant="secondary"
                  onClick={() => onNavigate("shop")}
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg w-full"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("Browse Products")}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate("blog")}
                  className="border-white text-white hover:bg-white/10 w-full"
                  size="sm"
                >
                  {t("Read Our Blog")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}