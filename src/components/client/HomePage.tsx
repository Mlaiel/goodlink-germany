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
      title: t("home.medicalQuality"),
      description: t("home.medicalQualityDesc")
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: t("home.chinaBridge"), 
      description: t("home.chinaBridgeDesc")
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("home.compliance"),
      description: t("home.complianceDesc")
    },
    {
      icon: <ChatCircle className="h-6 w-6" />,
      title: t("home.expertSupport"),
      description: t("home.expertSupportDesc")
    }
  ]

  const stats = [
    { label: t("home.partners"), value: "500+", icon: <Users className="h-5 w-5" /> },
    { label: t("home.components"), value: "2,000+", icon: <Package className="h-5 w-5" /> },
    { label: t("home.experience"), value: "20+", icon: <Globe className="h-5 w-5" /> },
    { label: t("home.revenue"), value: "€93M", icon: <TrendUp className="h-5 w-5" /> }
  ]

  const categories = [
    {
      name: t("home.medicalDevices"),
      image: "🏥",
      count: t("home.medicalDevicesCount"),
      description: t("home.medicalDevicesDesc")
    },
    {
      name: t("home.automotiveParts"), 
      image: "🚗",
      count: t("home.automotivePartsCount"),
      description: t("home.automotivePartsDesc")
    },
    {
      name: t("home.connectors"),
      image: "🔌",
      count: t("home.connectorsCount"),
      description: t("home.connectorsDesc")
    },
    {
      name: t("home.motors"),
      image: "⚙️",
      count: t("home.motorsCount"),
      description: t("home.motorsDesc")
    },
    {
      name: t("home.mechanical"),
      image: "🛞",
      count: t("home.mechanicalCount"),
      description: t("home.mechanicalDesc")
    }
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section - Full Width Horizontal */}
      <section className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-8 md:p-12">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-12">
          <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 w-fit mx-auto lg:mx-0">
              {t("home.title")}
            </Badge>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t("home.subtitle")}
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("home.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mobile-button-group">
              <Button 
                onClick={() => onNavigate("shop")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all w-full sm:w-auto touch-friendly"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                {t("home.browseCatalog")}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate("blog")}
                className="border-2 hover:bg-blue-50 transition-colors w-full sm:w-auto touch-friendly"
              >
                {t("home.learnMore")}
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0 hidden sm:block">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl sm:rounded-3xl flex items-center justify-center text-4xl sm:text-5xl md:text-6xl">
                🛍️
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-yellow-400 rounded-full p-2 sm:p-3 shadow-lg animate-bounce">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Horizontal */}
      <section className="bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-1 sm:mb-2 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features - Horizontal Grid */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{t("home.whyChoose")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("home.whyChooseDesc")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1 text-center">
              <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 px-3 sm:px-6">
                <div className="flex justify-center mb-3 sm:mb-4 text-blue-600">{feature.icon}</div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories - Horizontal Layout */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{t("home.shopByCategory")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {t("home.shopByCategoryDesc")}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 text-center group"
              onClick={() => onNavigate("shop")}
            >
              <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 px-2 sm:px-4">
                <div className="text-2xl sm:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  {category.image}
                </div>
                <h3 className="font-semibold mb-1 text-xs sm:text-sm line-clamp-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground mb-1 hidden sm:block">{category.count}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section - Horizontal */}
      <section className="relative">
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-0 overflow-hidden">
          <CardContent className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                  {t("Ready to Start Shopping?")}
                </h3>
                <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0">
                  {t("Join thousands of satisfied customers and discover amazing products with our AI-powered shopping experience.")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mobile-button-group">
                  <Button 
                    variant="secondary"
                    onClick={() => onNavigate("shop")}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg w-full sm:w-auto touch-friendly"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    {t("Browse Products")}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate("blog")}
                    size="lg"
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto touch-friendly"
                  >
                    {t("Read Our Blog")}
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0 hidden sm:block">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <div className="text-base sm:text-xl font-bold text-white">
                      Goodlink
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white/80 tracking-wider">
                      GERMANY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}