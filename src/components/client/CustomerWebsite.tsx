import React, { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { LoginDialog } from "@/components/auth/LoginDialog"
import { CartButton } from "@/components/cart/ShoppingCart"
import { FloatingAIChat } from "@/components/chat/FloatingAIChat"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  User,
  UserCheck,
  ShieldCheck,
  Storefront,
  Heart,
  Star,
  ArrowRight,
  Package,
  Truck,
  Shield,
  Headphones,
  Globe,
  Users,
  TrendUp,
  MapPin,
  Phone,
  Envelope,
  Buildings,
  Article
} from "@phosphor-icons/react"

interface ClientInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isLoggedIn: boolean
}

export function CustomerWebsite({ onSwitchMode }: ClientInterfaceProps) {
  const { t, language } = useLanguage()
  const [user, setUser] = useKV<User | null>("current-user", null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    toast.success(t('auth.signOut'))
  }

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => onSwitchMode("admin")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted transition-colors"
      >
        <ShieldCheck className="h-4 w-4" />
        {t('nav.admin')}
      </button>
      <button 
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md"
      >
        <Globe className="h-4 w-4" />
        {t('nav.client')}
      </button>
      <button 
        onClick={() => onSwitchMode("shop")}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted transition-colors"
      >
        <Storefront className="h-4 w-4" />
        B2B Shop
      </button>
    </div>
  )

  const renderHeader = () => (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with language and mode selectors */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Cologne, Germany</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">+49 123 456 7890</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            {renderModeSelector()}
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-primary">
              Goodlink Germany
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentPage("home")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === "home" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => setCurrentPage("shop")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === "shop" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t('nav.shop')}
              </button>
              <button 
                onClick={() => setCurrentPage("blog")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === "blog" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t('nav.blog')}
              </button>
              <button 
                onClick={() => setCurrentPage("about")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === "about" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => setCurrentPage("contact")}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === "contact" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t('nav.contact')}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <CartButton />
            
            {user?.isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  <span className="font-medium">{t('user.welcome')}, {user.firstName}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t('auth.signOut')}
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setIsLoginOpen(true)}>
                <User className="h-4 w-4 mr-2" />
                {t('auth.login')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )

  const renderHomePage = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6">
              🏥 {t('client.heroTitle')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Goodlink Germany
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('client.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setCurrentPage("shop")}>
                {t('client.browseCatalog')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => setCurrentPage("about")}>
                {t('client.learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">🛍️</div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">{t('client.partners')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">📦</div>
              <div className="text-2xl font-bold">2,000+</div>
              <div className="text-sm text-muted-foreground">{t('client.components')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">⏱️</div>
              <div className="text-2xl font-bold">20+</div>
              <div className="text-sm text-muted-foreground">{t('client.experience')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">💰</div>
              <div className="text-2xl font-bold">€93M</div>
              <div className="text-sm text-muted-foreground">{t('client.revenue')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('client.whyChoose')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('client.whyChooseDesc')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('client.medicalGrade')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('client.medicalGradeDesc')}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('client.chinaBridge')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('client.chinaBridgeDesc')}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('client.compliance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('client.complianceDesc')}</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('client.expertSupport')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('client.expertSupportDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('client.shopByCategory')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('client.shopByCategoryDesc')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏥", title: t('client.medicalDevices'), count: "800+" },
              { icon: "🚗", title: t('client.automotiveParts'), count: "600+" },
              { icon: "🔌", title: t('client.connectorsCables'), count: "500+" },
              { icon: "⚙️", title: t('client.motorsSensors'), count: "300+" },
              { icon: "🛞", title: t('client.mechanicalComponents'), count: "400+" },
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.count} {t('client.components')}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('client.readyToStart')}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t('client.readyToStartDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setCurrentPage("shop")}>
              {t('client.browseProducts')}
            </Button>
            <Button variant="outline" size="lg" onClick={() => setCurrentPage("blog")}>
              {t('client.readBlog')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )

  const renderAboutPage = () => (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('client.aboutTitle')}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            {t('client.aboutDesc')}
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('client.ourMission')}</h2>
              <p className="text-muted-foreground">{t('client.missionDesc')}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('client.businessCulture')}</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• {t('client.personalRelationships')}</li>
                <li>• {t('client.honestCommunication')}</li>
                <li>• {t('client.culturalBridges')}</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-4">{t('client.officesChina')}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Shenzhen</li>
                <li>• Shanghai</li>
                <li>• Changsha</li>
                <li>• Hong Kong</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">{t('client.officesGermany')}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Cologne, Germany</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">{t('client.warehouses')}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Shenzhen</li>
                <li>• Shanghai</li>
                <li>• Hong Kong</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{t('client.goodlinkChina')}</h3>
            <p className="text-muted-foreground">
              {t('client.goodlinkChinaDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContactPage = () => (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('nav.contact')}</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    Cologne, Germany<br />
                    Heart of Europe
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+49 123 456 7890</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Envelope className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">contact@goodlink-germany.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>We'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input className="w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea rows={4} className="w-full px-3 py-2 border rounded-md"></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage()
      case "about":
        return renderAboutPage()
      case "contact":
        return renderContactPage()
      case "shop":
        return (
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('nav.shop')}</h1>
            <p className="text-muted-foreground mb-12 text-center">Browse our premium medical devices and automotive components</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample Products */}
              {[
                {
                  id: "med-001",
                  name: "Digital Blood Pressure Monitor",
                  price: 299.99,
                  category: "Medical Devices",
                  sku: "MED-001",
                  description: "CE certified digital blood pressure monitor with Bluetooth connectivity"
                },
                {
                  id: "auto-001", 
                  name: "Automotive Sensor Module",
                  price: 89.99,
                  category: "Automotive Parts",
                  sku: "AUTO-001",
                  description: "EMC/ROHS compliant temperature sensor for automotive applications"
                },
                {
                  id: "conn-001",
                  name: "Medical Grade Connector",
                  price: 45.50,
                  category: "Connectors & Cables", 
                  sku: "CONN-001",
                  description: "IP67 rated medical connector with gold-plated contacts"
                },
                {
                  id: "motor-001",
                  name: "Precision Stepper Motor",
                  price: 156.80,
                  category: "Motors & Sensors",
                  sku: "MOT-001", 
                  description: "High precision stepper motor for medical equipment"
                },
                {
                  id: "mech-001",
                  name: "Titanium Medical Bracket",
                  price: 234.00,
                  category: "Mechanical Components",
                  sku: "MECH-001",
                  description: "Biocompatible titanium bracket for surgical instruments"
                },
                {
                  id: "auto-002",
                  name: "Car ECU Module",
                  price: 445.99,
                  category: "Automotive Parts", 
                  sku: "AUTO-002",
                  description: "Advanced ECU module with CAN bus interface"
                }
              ].map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-32 bg-muted rounded-md flex items-center justify-center mb-4">
                      <Package className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">€{product.price}</span>
                      <Badge variant="outline">SKU: {product.sku}</Badge>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        // Add to cart functionality
                        const cartItems = JSON.parse(localStorage.getItem('shopping-cart') || '[]')
                        const existingItem = cartItems.find((item: any) => item.id === product.id)
                        
                        if (existingItem) {
                          existingItem.quantity += 1
                        } else {
                          cartItems.push({ ...product, quantity: 1 })
                        }
                        
                        localStorage.setItem('shopping-cart', JSON.stringify(cartItems))
                        
                        // Trigger a storage event to update the cart
                        window.dispatchEvent(new Event('storage'))
                        
                        toast.success(t('cart.addedToCart'))
                      }}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      {t('shop.addToCart')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button onClick={() => onSwitchMode("shop")} variant="outline">
                Visit Full B2B Dashboard
              </Button>
            </div>
          </div>
        )
      case "blog":
        return (
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-center">{t('nav.blog')}</h1>
            <p className="text-muted-foreground mb-12 text-center">Industry insights and updates from Goodlink Germany</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Medical Device Compliance in Europe 2024",
                  excerpt: "Understanding the latest MDR requirements and CE certification processes for medical devices in the European market.",
                  date: "2024-01-15",
                  category: "Medical Devices",
                  readTime: "5 min read"
                },
                {
                  title: "Automotive Industry Trends in China",
                  excerpt: "Exploring the latest developments in Chinese automotive manufacturing and supply chain innovations.",
                  date: "2024-01-10", 
                  category: "Automotive",
                  readTime: "7 min read"
                },
                {
                  title: "Quality Assurance in Cross-Border Trade",
                  excerpt: "Best practices for maintaining product quality when sourcing components from international suppliers.",
                  date: "2024-01-05",
                  category: "Business",
                  readTime: "6 min read"
                },
                {
                  title: "Sustainable Manufacturing Practices",
                  excerpt: "How eco-friendly manufacturing processes are shaping the future of medical and automotive components.",
                  date: "2023-12-20",
                  category: "Sustainability", 
                  readTime: "4 min read"
                },
                {
                  title: "Digital Transformation in Healthcare",
                  excerpt: "The role of connected medical devices and IoT in modern healthcare systems and patient care.",
                  date: "2023-12-15",
                  category: "Technology",
                  readTime: "8 min read"
                },
                {
                  title: "Supply Chain Resilience Strategies",
                  excerpt: "Building robust supply chains that can adapt to global disruptions and market changes.",
                  date: "2023-12-10",
                  category: "Supply Chain",
                  readTime: "6 min read"
                }
              ].map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center mb-4">
                      <Article className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      <main>
        {renderContent()}
      </main>
      
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Goodlink Germany GmbH. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LoginDialog 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin}
      />

      <FloatingAIChat />
    </div>
  )
}