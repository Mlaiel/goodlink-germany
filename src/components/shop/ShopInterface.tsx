import React from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ShopDashboard } from "@/components/shop/ShopDashboard"
import goodlinkLogo from "@/assets/images/goodlink-logo.svg"
import { 
  ShoppingBag, 
  Star, 
  Heart, 
  ShoppingCart,
  Storefront,
  UserCircle,
  ShieldCheck,
  User,
  CreditCard,
  Package,
  Activity
} from "@phosphor-icons/react"

interface ShopInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function ShopInterface({ onSwitchMode }: ShopInterfaceProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV("shop-active-tab", "products")

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onSwitchMode("admin")}
        className="inline-flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
      >
        <ShieldCheck className="h-4 w-4" />
        Admin
      </Button>
      <Button 
        variant="outline"
        size="sm"
        onClick={() => onSwitchMode("client")}
        className="inline-flex items-center gap-2 hover:bg-green-50 hover:border-green-200 transition-colors"
      >
        <UserCircle className="h-4 w-4" />
        Client
      </Button>
      <Button 
        size="sm"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-sm"
      >
        <Storefront className="h-4 w-4" />
        Shop
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={goodlinkLogo} 
                alt="Goodlink Germany Logo" 
                className="h-12 w-auto"
              />
              <div className="border-l pl-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Goodlink Store
                </h1>
                <p className="text-sm text-muted-foreground">Premium Products & AI-Powered Shopping</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderModeSelector()}
              <LanguageSelector />
              <Badge 
                variant="outline" 
                className="bg-purple-50 text-purple-700 border-purple-200 shadow-sm"
              >
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Shop Open
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-lg shadow-sm">
            <TabsTrigger 
              value="products" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <ShoppingBag className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger 
              value="cart" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <ShopDashboard />
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Shopping Cart</h3>
                <p className="text-muted-foreground">
                  Review your items and proceed to checkout
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your Favorites</h3>
                <p className="text-muted-foreground">
                  Products you've saved for later
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">My Account</h3>
                <p className="text-muted-foreground">
                  Manage your profile, addresses, and preferences
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="grid gap-6">
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Order History</h3>
                <p className="text-muted-foreground">
                  Track your past orders and delivery status
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}