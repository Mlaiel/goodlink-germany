import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Package, 
  CreditCard,
  User,
  MapPin,
  Bell,
  Shield,
  Globe,
  Plus,
  Minus,
  Eye,
  FunnelSimple as Filter,
  MagnifyingGlass as Search
} from '@phosphor-icons/react'
import { useLanguage } from './LanguageContext'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  inStock: boolean
  tags?: string[]
  description?: string
}

interface CartItem extends Product {
  quantity: number
}

interface UserProfile {
  name: string
  email: string
  avatar: string
  memberSince: string
  totalOrders: number
  totalSpent: number
}

export function ShopInterface() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useKV('shop-active-tab', 'products')
  const [cart, setCart] = useKV<CartItem[]>('shop-cart', [])
  const [wishlist, setWishlist] = useKV<number[]>('shop-wishlist', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  
  // Mock user profile
  const userProfile: UserProfile = {
    name: 'Max Mustermann',
    email: 'max@example.com',
    avatar: '',
    memberSince: '2023-03-15',
    totalOrders: 27,
    totalSpent: 3456.78
  }

  // Mock products data
  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      image: '🎧',
      rating: 4.8,
      reviews: 234,
      category: 'electronics',
      inStock: true,
      tags: ['wireless', 'premium', 'noise-cancelling'],
      description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.'
    },
    {
      id: 2,
      name: 'Smart Fitness Tracker',
      price: 199.99,
      image: '⌚',
      rating: 4.6,
      reviews: 156,
      category: 'wearables',
      inStock: true,
      tags: ['fitness', 'smart', 'health'],
      description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking.'
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 79.99,
      originalPrice: 99.99,
      image: '🔊',
      rating: 4.5,
      reviews: 89,
      category: 'electronics',
      inStock: true,
      tags: ['portable', 'bluetooth', 'waterproof'],
      description: 'Compact waterproof speaker with 12-hour battery and powerful sound.'
    },
    {
      id: 4,
      name: 'Professional Camera Lens',
      price: 599.99,
      image: '📷',
      rating: 4.9,
      reviews: 67,
      category: 'photography',
      inStock: false,
      tags: ['professional', 'photography', 'lens'],
      description: 'Professional-grade camera lens for stunning photography results.'
    },
    {
      id: 5,
      name: 'Gaming Mechanical Keyboard',
      price: 149.99,
      image: '⌨️',
      rating: 4.7,
      reviews: 203,
      category: 'gaming',
      inStock: true,
      tags: ['gaming', 'mechanical', 'rgb'],
      description: 'Mechanical gaming keyboard with RGB backlighting and customizable keys.'
    },
    {
      id: 6,
      name: 'Wireless Charging Pad',
      price: 39.99,
      originalPrice: 59.99,
      image: '📱',
      rating: 4.4,
      reviews: 124,
      category: 'electronics',
      inStock: true,
      tags: ['wireless', 'charging', 'fast'],
      description: 'Fast wireless charging pad compatible with all Qi-enabled devices.'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: products.length },
    { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'electronics').length },
    { id: 'wearables', name: 'Wearables', count: products.filter(p => p.category === 'wearables').length },
    { id: 'photography', name: 'Photography', count: products.filter(p => p.category === 'photography').length },
    { id: 'gaming', name: 'Gaming', count: products.filter(p => p.category === 'gaming').length },
  ]

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        case 'newest': return b.id - a.id
        default: return 0 // featured
      }
    })

  const addToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error(t('shop.outOfStock'))
      return
    }

    setCart((currentCart = []) => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...currentCart, { ...product, quantity: 1 }]
      }
    })
    toast.success(`${product.name} added to cart`)
  }

  const removeFromCart = (productId: number) => {
    setCart((currentCart = []) => {
      const existingItem = currentCart.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      } else {
        return currentCart.filter(item => item.id !== productId)
      }
    })
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((currentWishlist = []) => {
      if (currentWishlist.includes(productId)) {
        return currentWishlist.filter(id => id !== productId)
      } else {
        return [...currentWishlist, productId]
      }
    })
  }

  const getTotalCartValue = () => {
    return (cart || []).reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalCartItems = () => {
    return (cart || []).reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('shop.title')}</h1>
          <p className="text-muted-foreground">Premium products for every need</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
            {(wishlist || []).length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs">
                {(wishlist || []).length}
              </Badge>
            )}
          </Button>
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t('shop.cart')}
            {(cart || []).length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs">
                {getTotalCartItems()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="cart">Cart ({getTotalCartItems()})</TabsTrigger>
          <TabsTrigger value="account">My Account</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={t('common.search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="aspect-square bg-muted flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${(wishlist || []).includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Sale
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="absolute bottom-2 left-2">
                      {t('shop.outOfStock')}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">€{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          €{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? t('shop.addToCart') : t('shop.outOfStock')}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('shop.cart')}</CardTitle>
              <CardDescription>
                {(cart || []).length === 0 ? t('shop.cartEmpty') : `${getTotalCartItems()} items in your cart`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(cart || []).length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{t('shop.cartEmpty')}</h3>
                  <Button onClick={() => setActiveTab('products')}>
                    {t('shop.continueShopping')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(cart || []).map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">€{item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>{t('common.total')}:</span>
                      <span>€{getTotalCartValue().toFixed(2)}</span>
                    </div>
                    <Button className="w-full mt-4" size="lg">
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t('shop.proceedToCheckout')}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t('user.profile')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback>
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since {new Date(userProfile.memberSince).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userProfile.totalOrders}</div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">€{userProfile.totalSpent.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </div>
                <Button className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('user.addresses')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {t('user.payment')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  {t('user.notifications')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('user.security')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Language & Region
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('user.orders')}</CardTitle>
              <CardDescription>View and track your order history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((orderId) => (
                  <div key={orderId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Order #{orderId.toString().padStart(6, '0')}</h4>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(2024, 0, orderId * 3).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={orderId === 1 ? "default" : "secondary"}>
                        {orderId === 1 ? "Delivered" : orderId === 2 ? "Shipped" : "Processing"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      2 items • €{(299.99 * orderId).toFixed(2)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {orderId === 1 && (
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}