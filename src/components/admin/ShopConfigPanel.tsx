import React from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/components/LanguageContext"
import { toast } from "sonner"
import {
  Storefront,
  Globe,
  CurrencyCircleDollar,
  Truck,
  CreditCard,
  Shield,
  Palette,
  Bell,
  Archive,
  Users,
  ChartLine,
  Gear,
  FloppyDisk,
  ArrowClockwise
} from "@phosphor-icons/react"

interface ShopConfig {
  // Basic Settings
  shopName: string
  shopDescription: string
  shopLogo: string
  shopUrl: string
  contactEmail: string
  supportPhone: string
  
  // Appearance
  primaryColor: string
  secondaryColor: string
  theme: "light" | "dark" | "auto"
  
  // Currency & Language
  defaultCurrency: string
  defaultLanguage: string
  supportedCurrencies: string[]
  supportedLanguages: string[]
  
  // Payment
  enableStripe: boolean
  enablePaypal: boolean
  enableKlarna: boolean
  enableSEPA: boolean
  enableApplePay: boolean
  enableGooglePay: boolean
  
  // Shipping
  enableFreeShipping: boolean
  freeShippingThreshold: number
  shippingZones: string[]
  enableExpressShipping: boolean
  
  // Features
  enableReviews: boolean
  enableWishlist: boolean
  enableCompare: boolean
  enableCoupons: boolean
  enableLoyaltyProgram: boolean
  enableLiveChat: boolean
  
  // SEO & Analytics
  googleAnalyticsId: string
  facebookPixelId: string
  enableSEO: boolean
  enableSitemap: boolean
  
  // Inventory
  enableStockManagement: boolean
  lowStockThreshold: number
  enableBackorders: boolean
  
  // Security
  enableSSL: boolean
  enable2FA: boolean
  enableCaptcha: boolean
  
  // Notifications
  enableEmailNotifications: boolean
  enableSMSNotifications: boolean
  enablePushNotifications: boolean
}

export function ShopConfigPanel() {
  const { t } = useLanguage()
  
  const defaultConfig: ShopConfig = {
    shopName: "Goodlink Germany Medical & Automotive",
    shopDescription: "Premium medical devices, automotive components and connectors. Bridging Europe-China trade since 2020.",
    shopLogo: "",
    shopUrl: "https://shop.goodlink-germany.com",
    contactEmail: "info@goodlink-germany.com", 
    supportPhone: "+49 (0) 221 XXX XXXX", // Cologne number
    
    primaryColor: "#0f172a", // Deep navy reflecting medical precision
    secondaryColor: "#dc2626", // Professional red for automotive
    theme: "light",
    
    defaultCurrency: "EUR",
    defaultLanguage: "de", 
    supportedCurrencies: ["EUR", "USD", "CNY", "HKD"], // Added Chinese currencies
    supportedLanguages: ["de", "en", "zh", "fr"], // Multi-language for international trade
    
    enableStripe: true,
    enablePaypal: true,
    enableKlarna: true,
    enableSEPA: true,
    enableApplePay: true,
    enableGooglePay: true,
    
    enableFreeShipping: true,
    freeShippingThreshold: 500, // Higher threshold for B2B medical/automotive
    shippingZones: ["DE", "EU", "China", "Hong Kong", "Worldwide"],
    enableExpressShipping: true,
    
    enableReviews: true,
    enableWishlist: true,
    enableCompare: true,
    enableCoupons: true,
    enableLoyaltyProgram: true,
    enableLiveChat: true,
    
    googleAnalyticsId: "",
    facebookPixelId: "",
    enableSEO: true,
    enableSitemap: true,
    
    enableStockManagement: true,
    lowStockThreshold: 25, // Higher threshold for medical/automotive inventory
    enableBackorders: true, // Important for specialized components
    
    enableSSL: true,
    enable2FA: true,
    enableCaptcha: true,
    
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enablePushNotifications: true
  }

  const [config, setConfig] = useKV<ShopConfig>("shop-config", defaultConfig)

  const handleSave = () => {
    toast.success("Shop configuration saved successfully!")
  }

  const handleReset = () => {
    setConfig(defaultConfig)
    toast.info("Configuration reset to defaults")
  }

  const updateConfig = (key: keyof ShopConfig, value: any) => {
    setConfig(current => ({ ...current!, [key]: value }))
  }

  if (!config) return null

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shop Configuration</h2>
          <p className="text-muted-foreground">
            Configure your online shop settings, features, and integrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <ArrowClockwise className="h-4 w-4" />
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <FloppyDisk className="h-4 w-4" />
            Save Configuration
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Basic Information */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Storefront className="h-5 w-5 text-blue-600" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Configure your shop's basic information and branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name</Label>
                <Input
                  id="shopName"
                  value={config.shopName}
                  onChange={(e) => updateConfig("shopName", e.target.value)}
                  placeholder="Enter shop name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopUrl">Shop URL</Label>
                <Input
                  id="shopUrl"
                  value={config.shopUrl}
                  onChange={(e) => updateConfig("shopUrl", e.target.value)}
                  placeholder="https://your-shop.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopDescription">Shop Description</Label>
              <Textarea
                id="shopDescription"
                value={config.shopDescription}
                onChange={(e) => updateConfig("shopDescription", e.target.value)}
                placeholder="Describe your shop"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={config.contactEmail}
                  onChange={(e) => updateConfig("contactEmail", e.target.value)}
                  placeholder="contact@shop.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportPhone">Support Phone</Label>
                <Input
                  id="supportPhone"
                  value={config.supportPhone}
                  onChange={(e) => updateConfig("supportPhone", e.target.value)}
                  placeholder="+49 (0) 123 456 789"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-600" />
              Appearance & Branding
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your shop
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig("primaryColor", e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={config.primaryColor}
                    onChange={(e) => updateConfig("primaryColor", e.target.value)}
                    placeholder="#1e293b"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={config.secondaryColor}
                    onChange={(e) => updateConfig("secondaryColor", e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input
                    value={config.secondaryColor}
                    onChange={(e) => updateConfig("secondaryColor", e.target.value)}
                    placeholder="#ef4444"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={config.theme} onValueChange={(value: "light" | "dark" | "auto") => updateConfig("theme", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency & Language */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Currency & Localization
            </CardTitle>
            <CardDescription>
              Configure supported currencies and languages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Default Currency</Label>
                <Select value={config.defaultCurrency} onValueChange={(value) => updateConfig("defaultCurrency", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Default Language</Label>
                <Select value={config.defaultLanguage} onValueChange={(value) => updateConfig("defaultLanguage", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Supported Languages</Label>
              <div className="flex flex-wrap gap-2">
                {["de", "en", "zh", "fr"].map((lang) => (
                  <Badge key={lang} variant="outline" className="cursor-pointer">
                    {lang === "de" ? "Deutsch" : lang === "en" ? "English" : lang === "zh" ? "中文" : "Français"}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              Configure supported payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {[
                { key: "enableStripe", label: "Stripe", icon: CreditCard },
                { key: "enablePaypal", label: "PayPal", icon: CreditCard },
                { key: "enableKlarna", label: "Klarna", icon: CreditCard },
                { key: "enableSEPA", label: "SEPA", icon: CreditCard },
                { key: "enableApplePay", label: "Apple Pay", icon: CreditCard },
                { key: "enableGooglePay", label: "Google Pay", icon: CreditCard }
              ].map((payment) => (
                <div key={payment.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <payment.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{payment.label}</span>
                  </div>
                  <Switch
                    checked={config[payment.key as keyof ShopConfig] as boolean}
                    onCheckedChange={(checked) => updateConfig(payment.key as keyof ShopConfig, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-600" />
              Shipping Configuration
            </CardTitle>
            <CardDescription>
              Configure shipping options and zones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Free Shipping</div>
                <div className="text-sm text-muted-foreground">Enable free shipping for orders above threshold</div>
              </div>
              <Switch
                checked={config.enableFreeShipping}
                onCheckedChange={(checked) => updateConfig("enableFreeShipping", checked)}
              />
            </div>
            
            {config.enableFreeShipping && (
              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (€)</Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={config.freeShippingThreshold}
                  onChange={(e) => updateConfig("freeShippingThreshold", Number(e.target.value))}
                  placeholder="50"
                />
              </div>
            )}

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Express Shipping</div>
                <div className="text-sm text-muted-foreground">Offer express shipping options</div>
              </div>
              <Switch
                checked={config.enableExpressShipping}
                onCheckedChange={(checked) => updateConfig("enableExpressShipping", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gear className="h-5 w-5 text-indigo-600" />
              Shop Features
            </CardTitle>
            <CardDescription>
              Enable or disable shop features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "enableReviews", label: "Product Reviews" },
                { key: "enableWishlist", label: "Wishlist" },
                { key: "enableCompare", label: "Product Compare" },
                { key: "enableCoupons", label: "Discount Coupons" },
                { key: "enableLoyaltyProgram", label: "Loyalty Program" },
                { key: "enableLiveChat", label: "Live Chat Support" }
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="font-medium">{feature.label}</div>
                  <Switch
                    checked={config[feature.key as keyof ShopConfig] as boolean}
                    onCheckedChange={(checked) => updateConfig(feature.key as keyof ShopConfig, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Configure security and protection features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { key: "enableSSL", label: "SSL Certificate", desc: "Force HTTPS for all connections" },
                { key: "enable2FA", label: "Two-Factor Authentication", desc: "Require 2FA for admin accounts" },
                { key: "enableCaptcha", label: "CAPTCHA Protection", desc: "Protect forms from spam and bots" }
              ].map((security) => (
                <div key={security.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{security.label}</div>
                    <div className="text-sm text-muted-foreground">{security.desc}</div>
                  </div>
                  <Switch
                    checked={config[security.key as keyof ShopConfig] as boolean}
                    onCheckedChange={(checked) => updateConfig(security.key as keyof ShopConfig, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { key: "enableEmailNotifications", label: "Email Notifications", desc: "Send notifications via email" },
                { key: "enableSMSNotifications", label: "SMS Notifications", desc: "Send notifications via SMS" },
                { key: "enablePushNotifications", label: "Push Notifications", desc: "Send browser push notifications" }
              ].map((notification) => (
                <div key={notification.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{notification.label}</div>
                    <div className="text-sm text-muted-foreground">{notification.desc}</div>
                  </div>
                  <Switch
                    checked={config[notification.key as keyof ShopConfig] as boolean}
                    onCheckedChange={(checked) => updateConfig(notification.key as keyof ShopConfig, checked)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}