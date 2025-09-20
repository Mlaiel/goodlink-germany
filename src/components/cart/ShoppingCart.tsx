import React, { useState, useEffect } from "react"
import { useKV } from "@github/spark/hooks"
import { useLanguage } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { 
  ShoppingCart, 
  Trash, 
  Plus, 
  Minus, 
  X,
  Package,
  CreditCard
} from "@phosphor-icons/react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  category: string
  sku: string
}

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export function ShoppingCartDialog({ isOpen, onClose }: ShoppingCartProps) {
  const { t } = useLanguage()
  const [cartItems, setCartItems] = useKV<CartItem[]>("shopping-cart", [])
  const [isLoading, setIsLoading] = useState(false)

  // Calculate totals
  const subtotal = (cartItems || []).reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 50 // Free shipping over €500
  const tax = subtotal * 0.19 // 19% VAT
  const total = subtotal + shipping + tax

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }

    setCartItems((currentItems = []) => 
      currentItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
    toast.success(t('cart.quantityUpdated'))
  }

  const removeItem = (itemId: string) => {
    setCartItems((currentItems = []) => currentItems.filter(item => item.id !== itemId))
    toast.success(t('cart.removedFromCart'))
  }

  const clearCart = () => {
    setCartItems([])
    toast.success("Cart cleared")
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart after successful checkout
      setCartItems([])
      toast.success("Order placed successfully!")
      onClose()
    } catch (error) {
      toast.error("Checkout failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              {t('cart.title')}
              <Badge variant="secondary" className="ml-2">
                {(cartItems || []).length} {(cartItems || []).length === 1 ? t('cart.item') : t('cart.items')}
              </Badge>
            </div>
            {(cartItems || []).length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {(cartItems || []).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t('cart.empty')}</h3>
            <p className="text-muted-foreground mb-6">{t('cart.emptyDesc')}</p>
            <Button onClick={onClose}>{t('cart.continueShopping')}</Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {(cartItems || []).map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku} • {item.category}
                      </p>
                      <p className="font-semibold text-lg">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive mt-1"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>{t('cart.subtotal')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('cart.shipping')}</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('cart.tax')} (19%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('cart.total')}</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  {t('cart.continueShopping')}
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isLoading ? t('common.loading') : t('cart.checkout')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function CartButton() {
  const { t } = useLanguage()
  const [cartItems, setCartItems] = useKV<CartItem[]>("shopping-cart", [])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Listen for storage events to update cart when items are added
  useEffect(() => {
    const handleStorageChange = () => {
      const items = JSON.parse(localStorage.getItem('shopping-cart') || '[]')
      setCartItems(items)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [setCartItems])

  const itemCount = (cartItems || []).reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {t('nav.cart')}
        {itemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {itemCount > 9 ? '9+' : itemCount}
          </Badge>
        )}
      </Button>

      <ShoppingCartDialog 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
}

// Helper function for other components to add items to cart
export function addToCart(item: Omit<CartItem, 'quantity'>) {
  // This would typically be called from product components
  const cartItems = JSON.parse(localStorage.getItem('shopping-cart') || '[]') as CartItem[]
  
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({ ...item, quantity: 1 })
  }
  
  localStorage.setItem('shopping-cart', JSON.stringify(cartItems))
  toast.success('Added to cart')
}