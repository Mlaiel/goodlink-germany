import React, { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { HomePage } from "@/components/client/HomePage"
import { ShopCatalog } from "@/components/client/ShopCatalog"
import { BlogReader } from "@/components/client/BlogReader"
import { AboutPage } from "@/components/client/AboutPage"
import { AICustomerChat } from "@/components/client/AICustomerChat"
import { Footer } from "@/components/Footer"

import { 
  House, 
  Storefront, 
  Article,
  UserCircle,
  ShoppingCart,
  Heart,
  Phone,
  Info,
  ShieldCheck,
  User
} from "@phosphor-icons/react"

interface ClientInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function ClientInterface({ onSwitchMode }: ClientInterfaceProps) {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useKV("client-active-section", "home")

  const handleNavigation = (section: string) => {
    setActiveSection(section)
  }

  const navigationItems = [
    { id: "home", label: t("nav.home") || "Home", icon: <House className="h-5 w-5" /> },
    { id: "shop", label: t("nav.shop") || "Shop", icon: <Storefront className="h-5 w-5" /> },
    { id: "blog", label: t("nav.blog") || "Blog", icon: <Article className="h-5 w-5" /> },
    { id: "about", label: t("nav.about") || "About", icon: <Info className="h-5 w-5" /> },
    { id: "contact", label: t("nav.contact") || "Contact", icon: <Phone className="h-5 w-5" /> }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <HomePage onNavigate={handleNavigation} />
      case "shop":
        return <ShopCatalog onNavigate={handleNavigation} />
      case "blog":
        return <BlogReader />
      case "about":
        return <AboutPage />
      case "contact":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">{t("Contact Us")}</h1>
              <p className="text-lg text-muted-foreground">
                {t("Get in touch with our team for any questions or support.")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">{t("Get in Touch")}</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{t("Email")}</h3>
                    <p className="text-muted-foreground">support@goodlink-germany.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t("Phone")}</h3>
                    <p className="text-muted-foreground">+49 (0) 30 12345678</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">{t("Address")}</h3>
                    <p className="text-muted-foreground">
                      Goodlink Germany GmbH<br />
                      Unter den Linden 1<br />
                      10117 Berlin, Germany
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">{t("Business Hours")}</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>{t("Monday - Friday")}: 9:00 - 18:00</p>
                  <p>{t("Saturday")}: 10:00 - 16:00</p>
                  <p>{t("Sunday")}: {t("Closed")}</p>
                </div>
                <div className="pt-4">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {t("24/7 AI Support Available")}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <HomePage onNavigate={handleNavigation} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div>
                <div className="text-xl font-bold text-slate-800">
                  Goodlink
                </div>
                <div className="text-sm font-semibold text-slate-600 tracking-wider">
                  GERMANY
                </div>
              </div>
            </div>
            
            {/* Main Navigation - Horizontal */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 ${
                    activeSection === item.id 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm" 
                      : "hover:bg-blue-50 text-foreground hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
              
              <LanguageSelector />
              
              {/* Admin Panel Access */}
              <Button 
                variant="outline"
                size="sm"
                onClick={() => onSwitchMode("admin")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-500 shadow-sm transition-all duration-200"
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Admin Panel</span>
                <span className="sm:hidden">Admin</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Horizontal Scroll */}
          <nav className="lg:hidden mt-3 pb-2 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleNavigation(item.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                    : "hover:bg-blue-50"
                }`}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Customer Chat */}
      <AICustomerChat />
    </div>
  )
}