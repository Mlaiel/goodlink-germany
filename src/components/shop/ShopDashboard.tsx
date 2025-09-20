import React from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/components/LanguageContext"
import { 
  ShoppingBag, 
  Star, 
  Heart, 
  ShoppingCart,
  MagnifyingGlass,
  Funnel,
  GridFour,
  List,
  Plus,
  Minus
} from "@phosphor-icons/react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  inStock: boolean
  sale: boolean
}

interface CartItem extends Product {
  quantity: number
}

// Shop interface for customer shopping experience
export function ShopDashboard() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useKV<string>("shop-search", "")
  const [viewMode, setViewMode] = useKV<"grid" | "list">("shop-view-mode", "grid")
  const [selectedCategory, setSelectedCategory] = useKV<string>("shop-category", "all")
  const [cart, setCart] = useKV<CartItem[]>("shop-cart", [])
  const [favorites, setFavorites] = useKV<string[]>("shop-favorites", [])

  // Ensure state is properly initialized
  const safeSearchTerm = searchTerm || ""
  const safeCart = cart || []
  const safeFavorites = favorites || []

  const categories = [
    { id: "all", name: "All Products", count: 245 },
    { id: "electronics", name: "Electronics", count: 89 },
    { id: "fashion", name: "Fashion", count: 67 },
    { id: "home", name: "Home & Garden", count: 45 },
    { id: "sports", name: "Sports", count: 34 },
    { id: "books", name: "Books", count: 10 }
  ]

  const products: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviews: 342,
      image: "/api/placeholder/300/300",
      category: "electronics",
      inStock: true,
      sale: true
    },
    {
      id: "2", 
      name: "Smart Fitness Watch",
      price: 299.99,
      rating: 4.6,
      reviews: 156,
      image: "/api/placeholder/300/300",
      category: "electronics",
      inStock: true,
      sale: false
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.7,
      reviews: 89,
      image: "/api/placeholder/300/300",
      category: "fashion",
      inStock: true,
      sale: true
    },
    {
      id: "4",
      name: "Professional Coffee Maker",
      price: 149.99,
      rating: 4.9,
      reviews: 234,
      image: "/api/placeholder/300/300",
      category: "home",
      inStock: false,
      sale: false
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(safeSearchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const safeCurrentCart = currentCart || []
      const existingItem = safeCurrentCart.find(item => item.id === product.id)
      if (existingItem) {
        return safeCurrentCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...safeCurrentCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(currentCart => {
      const safeCurrentCart = currentCart || []
      const existingItem = safeCurrentCart.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return safeCurrentCart.map(item =>
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      } else {
        return safeCurrentCart.filter(item => item.id !== productId)
      }
    })
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(currentFavorites => {
      const safeCurrentFavorites = currentFavorites || []
      if (safeCurrentFavorites.includes(productId)) {
        return safeCurrentFavorites.filter(id => id !== productId)
      } else {
        return [...safeCurrentFavorites, productId]
      }
    })
  }

  const cartTotal = safeCart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemsCount = safeCart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Header with search and cart */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={safeSearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <GridFour className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cartItemsCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Funnel className="h-5 w-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Shopping Cart Summary */}
          {safeCart.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {safeCart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-muted-foreground">€{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => addToCart(item)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-3">
                    Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={`w-full object-cover ${
                      viewMode === "grid" ? "h-48" : "h-32"
                    }`}
                  />
                  {product.sale && (
                    <Badge className="absolute top-2 left-2" variant="destructive">
                      Sale
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className={`absolute top-2 right-2 h-8 w-8 p-0 ${
                      safeFavorites.includes(product.id) ? 'text-red-500' : ''
                    }`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        safeFavorites.includes(product.id) ? 'fill-current' : ''
                      }`} 
                    />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className={`${viewMode === "list" ? "flex gap-4" : ""}`}>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-3 w-3 ${
                                star <= Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold">€{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            €{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          className="flex-1" 
                          disabled={!product.inStock}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}