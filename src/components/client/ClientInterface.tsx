import React, { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { HomePage } from "@/components/client/HomePage"
import { ShopCatalog } from "@/components/client/ShopCatalog"
import { BlogReader } from "@/components/client/BlogReader"
import { AICustomerChat } from "@/components/client/AICustomerChat"
import goodlinkLogo from "@/assets/images/goodlink-logo.svg"
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

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onSwitchMode("admin")}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-500 shadow-sm transition-all duration-200"
      >
        <ShieldCheck className="h-4 w-4" />
        Admin Panel
      </Button>
      <Button 
        size="sm"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-sm"
      >
        <User className="h-4 w-4" />
        {t("Website")}
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onSwitchMode("shop")}
        className="inline-flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200 transition-colors"
      >
        <Storefront className="h-4 w-4" />
        Dashboard
      </Button>
    </div>
  )

  const navigationItems = [
    { id: "home", label: t("Home"), icon: <House className="h-5 w-5" /> },
    { id: "shop", label: t("Shop"), icon: <Storefront className="h-5 w-5" /> },
    { id: "blog", label: t("Blog"), icon: <Article className="h-5 w-5" /> },
    { id: "about", label: t("About"), icon: <Info className="h-5 w-5" /> },
    { id: "contact", label: t("Contact"), icon: <Phone className="h-5 w-5" /> }
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
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">{t("About Goodlink Germany")}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("We are a leading AI-powered commerce platform connecting customers with premium products from trusted brands worldwide.")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t("Our Mission")}</h2>
                <p className="text-muted-foreground">
                  {t("To revolutionize online shopping through artificial intelligence, providing personalized experiences and connecting customers with the perfect products.")}
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{t("Our Values")}</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• {t("Quality first approach")}</li>
                  <li>• {t("Customer satisfaction")}</li>
                  <li>• {t("Innovation through AI")}</li>
                  <li>• {t("Sustainable practices")}</li>
                </ul>
              </div>
            </div>
          </div>
        )
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img 
                  src={goodlinkLogo} 
                  alt="Goodlink Germany" 
                  className="h-10 w-auto"
                />
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Goodlink Germany
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => handleNavigation(item.id)}
                    className={`inline-flex items-center gap-2 ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                        : "hover:bg-blue-50 text-foreground"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
              
              <LanguageSelector />
              
              {/* Mobile Admin Access */}
              <div className="lg:hidden">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => onSwitchMode("admin")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-red-500 shadow-sm transition-all duration-200"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Panel
                </Button>
              </div>
              
              <div className="hidden lg:flex">
                {renderModeSelector()}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 flex items-center gap-4 overflow-x-auto">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleNavigation(item.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap ${
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                    : ""
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
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={goodlinkLogo} 
                  alt="Goodlink Germany" 
                  className="h-8 w-auto"
                />
                <div className="font-bold text-foreground">Goodlink</div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("AI-powered commerce platform connecting you with premium products worldwide.")}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">{t("Quick Links")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleNavigation("home")}>{t("Home")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleNavigation("shop")}>{t("Shop")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleNavigation("blog")}>{t("Blog")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleNavigation("about")}>{t("About")}</Button></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">{t("Support")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleNavigation("contact")}>{t("Contact Us")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Help Center")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Shipping Info")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Returns")}</Button></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">{t("Legal")}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Privacy Policy")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Terms of Service")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Cookie Policy")}</Button></li>
                <li><Button variant="link" size="sm" className="p-0 h-auto">{t("Imprint")}</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Goodlink Germany GmbH. {t("All rights reserved.")}</p>
          </div>
        </div>
      </footer>

      {/* AI Customer Chat */}
      <AICustomerChat />
    </div>
  )
}