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
import { LoginDialog } from "@/components/auth/LoginDialog"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { 
  House, 
  Storefront, 
  Article,
  UserCircle,
  ShoppingCart,
  Heart,
  Phone,
  Info,
  User,
  SignOut,
  Gear,
  Package,
  List
} from "@phosphor-icons/react"

interface ClientInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function ClientInterface({ onSwitchMode }: ClientInterfaceProps) {
  const { t, language } = useLanguage()
  const [activeSection, setActiveSection] = useKV("client-active-section", "home")
  const [currentUser, setCurrentUser] = useKV<any>("current-user", null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleNavigation = (section: string) => {
    setActiveSection(section)
    setShowMobileMenu(false)
  }

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    toast.success(t('auth.welcomeBack'))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    toast.success(t('auth.loggedOut'))
  }

  const navigationItems = [
    { id: "home", label: t("nav.home") || "Start", icon: <House className="h-5 w-5" /> },
    { id: "shop", label: t("nav.shop") || "Shop", icon: <Storefront className="h-5 w-5" /> },
    { id: "blog", label: t("nav.blog") || "Blog", icon: <Article className="h-5 w-5" /> },
    { id: "about", label: t("nav.about") || "Über uns", icon: <Info className="h-5 w-5" /> },
    { id: "contact", label: t("nav.contact") || "Kontakt", icon: <Phone className="h-5 w-5" /> }
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
          <div className="space-y-8 px-4 py-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("nav.contact") || "Kontakt"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t("contact.description") || "Nehmen Sie Kontakt mit unserem Team auf."}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6 p-6 bg-gradient-to-br from-background to-muted/30 rounded-2xl border border-border/50 shadow-lg">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t("contact.getInTouch") || "Kontakt aufnehmen"}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">@</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{t("contact.email")}</h3>
                      <p className="text-muted-foreground">info@goodlink-germany.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t("contact.phone")}</h3>
                      <p className="text-muted-foreground">+49 (0) 221 99887766</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{t("contact.address")}</h3>
                      <p className="text-muted-foreground">
                        Goodlink Germany GmbH<br />
                        Hansaring 97<br />
                        50670 Köln, Germany
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 p-6 bg-gradient-to-br from-background to-accent/5 rounded-2xl border border-border/50 shadow-lg">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t("contact.businessHours")}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">{t("contact.mondayFriday")}</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">{t("contact.saturday")}</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">{t("contact.sunday")}</span>
                    <span>{t("contact.closed")}</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-4 py-2 text-sm font-medium shadow-md">
                    ✨ {t("contact.aiSupport")}
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <header className="bg-white/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="group cursor-pointer" onClick={() => handleNavigation("home")}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary via-blue-600 to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-sm lg:text-lg">G</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Goodlink
                    </div>
                    <div className="text-xs lg:text-sm font-semibold text-muted-foreground tracking-wider">
                      GERMANY
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="lg"
                  onClick={() => handleNavigation(item.id)}
                  className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 scale-105" 
                      : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 text-foreground hover:text-primary hover:scale-105"
                  }`}
                >
                  <div className={`transition-transform duration-300 ${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span className="relative">
                    {item.label}
                    {activeSection === item.id && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/50 rounded-full"></div>
                    )}
                  </span>
                </Button>
              ))}
            </nav>

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
              >
                <List className="h-6 w-6" />
              </Button>
            </div>

            <div className="hidden lg:flex items-center gap-2 lg:gap-4 flex-shrink-0">
              {/* Admin Panel Button */}
              <Button 
                onClick={() => onSwitchMode("admin")}
                variant="outline"
                size="sm"
                className="border-primary/20 text-primary hover:bg-primary/10 rounded-lg"
              >
                🔧 Admin Panel
              </Button>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative group hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Heart className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative group hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                    0
                  </div>
                </Button>
              </div>
              
              <LanguageSelector />

              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:scale-105">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                        {currentUser.firstName?.charAt(0) || 'U'}
                      </div>
                      <span className="hidden lg:inline font-medium">{currentUser.firstName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2 rounded-xl shadow-xl border border-border/50">
                    <DropdownMenuLabel className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                          {currentUser.firstName?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">
                            {currentUser.firstName} {currentUser.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem className="group rounded-lg p-3 cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-200">
                      <User className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{t('account.profile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group rounded-lg p-3 cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-200">
                      <Package className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{t('account.orders')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="group rounded-lg p-3 cursor-pointer hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-200">
                      <Gear className="mr-3 h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{t('account.settings')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="group rounded-lg p-3 cursor-pointer hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <SignOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{t('auth.logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => setShowLoginDialog(true)}
                  className="bg-gradient-to-r from-primary to-accent text-white rounded-xl px-6 py-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  {t('auth.login') || 'Anmelden'}
                </Button>
              )}
            </div>
          </div>

          {showMobileMenu && (
            <div className="lg:hidden border-t border-border/50 py-4 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => handleNavigation(item.id)}
                    className={`justify-start gap-3 h-12 px-4 rounded-lg transition-all duration-300 ${
                      activeSection === item.id 
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                        : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
                <div className="border-t border-border/50 pt-2 mt-2">
                  <div className="flex items-center justify-between px-4 py-2">
                    <Button 
                      onClick={() => onSwitchMode("admin")}
                      variant="outline"
                      size="sm"
                      className="border-primary/20 text-primary hover:bg-primary/10 rounded-lg"
                    >
                      🔧 Admin Panel
                    </Button>
                    <LanguageSelector />
                    {!currentUser && (
                      <Button 
                        onClick={() => setShowLoginDialog(true)}
                        size="sm"
                        className="bg-gradient-to-r from-primary to-accent text-white rounded-lg"
                      >
                        <UserCircle className="mr-2 h-4 w-4" />
                        {t('auth.login')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        {renderContent()}
      </main>

      <AICustomerChat />

      <LoginDialog 
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />

      <Footer />
    </div>
  )
}