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
      title: t("Quality Products"),
      description: t("Curated selection of premium products from trusted brands worldwide")
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: t("Fast Shipping"), 
      description: t("Quick and reliable delivery across Germany and Europe")
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t("Secure Payment"),
      description: t("Safe and secure payment processing with multiple options")
    },
    {
      icon: <ChatCircle className="h-6 w-6" />,
      title: t("AI Support"),
      description: t("24/7 intelligent customer support in multiple languages")
    }
  ]

  const stats = [
    { label: t("Happy Customers"), value: "50,000+", icon: <Users className="h-5 w-5" /> },
    { label: t("Products"), value: "10,000+", icon: <Package className="h-5 w-5" /> },
    { label: t("Countries"), value: "25+", icon: <Globe className="h-5 w-5" /> },
    { label: t("Rating"), value: "4.8/5", icon: <Star className="h-5 w-5" /> }
  ]

  const categories = [
    {
      name: t("Electronics"),
      image: "📱",
      count: "2,500+ products"
    },
    {
      name: t("Home & Garden"), 
      image: "🏠",
      count: "1,800+ products"
    },
    {
      name: t("Fashion"),
      image: "👕",
      count: "3,200+ products"
    },
    {
      name: t("Health & Beauty"),
      image: "💄",
      count: "1,500+ products"
    },
    {
      name: t("Sports & Outdoor"),
      image: "⚽",
      count: "900+ products"
    },
    {
      name: t("Automotive"),
      image: "🚗",
      count: "700+ products"
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 md:p-12">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              {t("🚀 AI-Powered Commerce Platform")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t("Welcome to Goodlink Germany")}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("Discover premium products with AI-powered shopping experience. Quality, convenience, and innovation all in one place.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate("shop")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t("Shop Now")}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onNavigate("blog")}
                className="border-2 hover:bg-blue-50 transition-colors"
              >
                {t("Learn More")}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center text-6xl">
              🛍️
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg animate-bounce">
              <Star className="h-6 w-6 text-yellow-800" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-2 text-blue-600">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">{t("Why Choose Goodlink Germany?")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Experience the future of online shopping with our innovative features and commitment to excellence.")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="text-blue-600 mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">{t("Shop by Category")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Explore our diverse range of products across multiple categories.")}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 text-center group"
              onClick={() => onNavigate("shop")}
            >
              <CardContent className="pt-6 pb-4">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.image}
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("Ready to Start Shopping?")}
          </h2>
          <p className="text-lg opacity-90">
            {t("Join thousands of satisfied customers and discover amazing products with our AI-powered shopping experience.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate("shop")}
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t("Browse Products")}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate("blog")}
              className="border-white text-white hover:bg-white/10"
            >
              {t("Read Our Blog")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}