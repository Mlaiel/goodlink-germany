import React from "react"
import { useKV } from "@github/spark/hooks"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { ShopDashboard } from "@/components/shop/ShopDashboard"
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
      <button 
        onClick={() => onSwitchMode("admin")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
      >
        <ShieldCheck className="h-4 w-4" />
        Admin
      </button>
      <button 
        onClick={() => onSwitchMode("client")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted"
      >
        <UserCircle className="h-4 w-4" />
        Client
      </button>
      <button 
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md"
      >
        <Storefront className="h-4 w-4" />
        Shop
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Goodlink Store</h1>
                <p className="text-sm text-muted-foreground">Premium products for every need</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {renderModeSelector()}
              <LanguageSelector />
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                <Activity className="h-3 w-3 mr-1" />
                Shop Open
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Browse Products
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Shopping Cart
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              My Account
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Order History
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