import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/LanguageContext"
import { 
  ShoppingCart, 
  Star, 
  MagnifyingGlass,
  GridFour,
  ListDashes,
  Heart,
  Plus,
  Minus,
  Lightning
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
  fastShipping: boolean
  discount?: number
}

interface ShopCatalogProps {
  onNavigate: (section: string) => void
}

export function ShopCatalog({ onNavigate }: ShopCatalogProps) {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [cart, setCart] = useState<{[key: string]: number}>({})
  const [wishlist, setWishlist] = useState<string[]>([])

  // Medical devices and automotive components catalog
  const products: Product[] = [
    {
      id: "1",
      name: "Medical ECG Cable Assembly - 12-lead",
      price: 189.99,
      originalPrice: 220.00,
      rating: 4.9,
      reviews: 847,
      image: "🏥",
      category: "medical",
      inStock: true,
      fastShipping: true,
      discount: 14
    },
    {
      id: "2", 
      name: "Automotive Wire Harness - Premium Series",
      price: 95.50,
      rating: 4.7,
      reviews: 523,
      image: "🚗",
      category: "automotive",
      inStock: true,
      fastShipping: true
    },
    {
      id: "3",
      name: "Medical Pressure Sensor - High Precision",
      price: 340.00,
      rating: 4.8,
      reviews: 292,
      image: "⚕️",
      category: "medical",
      inStock: true,
      fastShipping: false
    },
    {
      id: "4",
      name: "Automotive Connector Set - 32-pin",
      price: 67.99,
      originalPrice: 89.99,
      rating: 4.6,
      reviews: 1234,
      image: "🔌",
      category: "automotive",
      inStock: true,
      fastShipping: true,
      discount: 24
    },
    {
      id: "5",
      name: "Medical Motor for Infusion Pump",
      price: 429.99,
      rating: 4.9,
      reviews: 167,
      image: "⚙️",
      category: "medical",
      inStock: false,
      fastShipping: false
    },
    {
      id: "6",
      name: "Industrial Castor Wheels - Medical Grade",
      price: 156.00,
      rating: 4.8,
      reviews: 445,
      image: "🛞",
      category: "medical",
      inStock: true,
      fastShipping: true
    },
    {
      id: "7",
      name: "Automotive CAN Bus Cable - 2m",
      price: 45.90,
      rating: 4.5,
      reviews: 789,
      image: "📡",
      category: "automotive", 
      inStock: true,
      fastShipping: true
    },
    {
      id: "8",
      name: "Medical Device Housing - Sterilizable",
      price: 289.00,
      originalPrice: 350.00,
      rating: 4.7,
      reviews: 134,
      image: "📦",
      category: "medical",
      inStock: true,
      fastShipping: false,
      discount: 17
    }
  ]

  const categories = [
    { value: "all", label: t("All Products") },
    { value: "medical", label: t("Medical Devices") },
    { value: "automotive", label: t("Automotive Components") },
    { value: "connectors", label: t("Connectors & Cables") },
    { value: "sensors", label: t("Sensors & Electronics") },
    { value: "mechanical", label: t("Mechanical Parts") }
  ]

  const sortOptions = [
    { value: "popularity", label: t("Most Popular") },
    { value: "price-low", label: t("Price: Low to High") },
    { value: "price-high", label: t("Price: High to Low") },
    { value: "rating", label: t("Best Rated") },
    { value: "newest", label: t("Newest") }
  ]

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId] -= 1
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      default:
        return b.reviews - a.reviews
    }
  })

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0)

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${!product.inStock ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
            {product.image}
          </div>
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{product.discount}%
            </Badge>
          )}
          {product.fastShipping && (
            <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
              <Lightning className="h-3 w-3 mr-1" />
              {t("Fast")}
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className={`absolute bottom-2 right-2 p-2 ${wishlist.includes(product.id) ? 'text-red-500 border-red-200' : ''}`}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">€{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">€{product.originalPrice}</span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {product.inStock ? t("In Stock") : t("Out of Stock")}
            </div>
          </div>
        </div>
        
        {product.inStock ? (
          <div className="flex items-center gap-2">
            {cart[product.id] ? (
              <div className="flex items-center gap-2 flex-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeFromCart(product.id)}
                  className="p-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-[2rem] text-center font-medium">{cart[product.id]}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addToCart(product.id)}
                  className="p-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => addToCart(product.id)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t("Add to Cart")}
              </Button>
            )}
          </div>
        ) : (
          <Button disabled className="w-full">
            {t("Out of Stock")}
          </Button>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("Shop Our Products")}</h1>
          <p className="text-muted-foreground">{t("Discover amazing products with fast shipping")}</p>
        </div>
        {cartItemsCount > 0 && (
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {cartItemsCount} {t("items in cart")}
          </Badge>
        )}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 block">{t("Search Products")}</label>
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search for products...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("Category")}</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t("Sort By")}</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="p-2"
            >
              <GridFour className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="p-2"
            >
              <ListDashes className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t("Showing")} {sortedProducts.length} {t("products")}
        </p>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">{t("No products found")}</h3>
          <p className="text-muted-foreground mb-4">
            {t("Try adjusting your filters or search terms")}
          </p>
          <Button onClick={() => {
            setSearchQuery("")
            setSelectedCategory("all")
          }}>
            {t("Clear Filters")}
          </Button>
        </div>
      )}
    </div>
  )
}