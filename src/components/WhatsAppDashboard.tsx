import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  WhatsappLogo,
  Robot,
  CheckCircle,
  Warning,
  XCircle,
  Clock,
  TrendUp,
  ChatCircle,
  Users,
  ShoppingCart,
  Headphones,
  Lightning,
  Gear,
  Plus,
  PaperPlaneTilt,
  Phone,
  Globe
} from "@phosphor-icons/react"

interface WhatsAppMessage {
  id: string
  from: string
  message: string
  timestamp: Date
  type: 'incoming' | 'outgoing'
  status: 'delivered' | 'read' | 'pending'
  isAutomated: boolean
}

interface WhatsAppContact {
  phone: string
  name: string
  lastMessage: Date
  status: 'active' | 'inactive'
  orderCount: number
  totalSpent: number
}

interface AutomationTemplate {
  id: string
  name: string
  trigger: string
  message: string
  enabled: boolean
  usage: number
}

export function WhatsAppDashboard() {
  const [apiKey, setApiKey] = useKV("whatsapp-api-key", "")
  const [phoneNumber, setPhoneNumber] = useKV("whatsapp-business-number", "")
  const [isConnected, setIsConnected] = useKV<boolean>("whatsapp-connected", false)
  const [autoResponses, setAutoResponses] = useKV<boolean>("whatsapp-auto-responses", true)
  const [businessHours, setBusinessHours] = useKV<boolean>("whatsapp-business-hours", true)
  
  const [messages] = useKV<WhatsAppMessage[]>("whatsapp-messages", [
    {
      id: "1",
      from: "+49123456789",
      message: "Hi! I need help with my order GL-12345",
      timestamp: new Date(),
      type: 'incoming',
      status: 'read',
      isAutomated: false
    },
    {
      id: "2", 
      from: "+49123456789",
      message: "Hello! I can help you with your order. Let me check the status for GL-12345...",
      timestamp: new Date(),
      type: 'outgoing',
      status: 'delivered',
      isAutomated: true
    }
  ])

  const [contacts] = useKV<WhatsAppContact[]>("whatsapp-contacts", [
    {
      phone: "+49123456789",
      name: "Anna Mueller",
      lastMessage: new Date(),
      status: 'active',
      orderCount: 3,
      totalSpent: 299.99
    },
    {
      phone: "+49987654321", 
      name: "Max Schmidt",
      lastMessage: new Date(Date.now() - 86400000),
      status: 'inactive',
      orderCount: 1,
      totalSpent: 89.99
    }
  ])

  const [templates] = useKV<AutomationTemplate[]>("whatsapp-templates", [
    {
      id: "welcome",
      name: "Welcome Message",
      trigger: "first_contact",
      message: "Welcome to Goodlink Germany! 🛍️ How can I assist you today?",
      enabled: true,
      usage: 156
    },
    {
      id: "order_status",
      name: "Order Status Inquiry",
      trigger: "order_status",
      message: "I can help you track your order! Please provide your order number (e.g., GL-12345).",
      enabled: true,
      usage: 89
    },
    {
      id: "product_inquiry",
      name: "Product Information",
      trigger: "product_info",
      message: "I'd be happy to help you find the perfect product! What are you looking for?",
      enabled: true,
      usage: 234
    },
    {
      id: "support",
      name: "Technical Support",
      trigger: "support",
      message: "Our technical support team is here to help! Please describe the issue you're experiencing.",
      enabled: true,
      usage: 67
    },
    {
      id: "business_hours",
      name: "After Hours Response",
      trigger: "after_hours",
      message: "Thank you for contacting us! Our support team is currently offline (9 AM - 6 PM CET). We'll respond first thing tomorrow!",
      enabled: true,
      usage: 45
    }
  ])

  const handleConnect = async () => {
    if (!apiKey || !phoneNumber) {
      toast.error("Please enter both API key and phone number")
      return
    }

    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true)
      toast.success("Successfully connected to WhatsApp Business API!")
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    toast.info("Disconnected from WhatsApp Business API")
  }

  const handleSendMessage = async (phone: string, message: string) => {
    // Simulate sending message via WhatsApp API
    toast.success(`Message sent to ${phone}`)
  }

  const getTotalMetrics = () => {
    const totalMessages = messages?.length || 0
    const automatedMessages = messages?.filter(m => m.isAutomated).length || 0
    const responseRate = automatedMessages > 0 ? Math.round((automatedMessages / totalMessages) * 100) : 0
    const activeContacts = contacts?.filter(c => c.status === 'active').length || 0

    return {
      totalMessages,
      automatedMessages, 
      responseRate,
      activeContacts,
      totalRevenue: contacts?.reduce((sum, c) => sum + c.totalSpent, 0) || 0
    }
  }

  const metrics = getTotalMetrics()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <WhatsappLogo className="h-6 w-6 text-green-600" />
            WhatsApp Business Integration
          </h2>
          <p className="text-muted-foreground">Automated customer service and messaging</p>
        </div>
        <Badge variant={isConnected ? "default" : "secondary"} className="text-sm">
          {isConnected ? (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </>
          ) : (
            <>
              <XCircle className="h-3 w-3 mr-1" />
              Disconnected
            </>
          )}
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <ChatCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              +23% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Responses</CardTitle>
            <Robot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.automatedMessages}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.responseRate}% automation rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeContacts}</div>
            <p className="text-xs text-muted-foreground">
              +12 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34s</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue via WA</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{metrics.totalRevenue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              +15% conversion rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Setup & Config</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="h-5 w-5" />
                WhatsApp Business API Configuration
              </CardTitle>
              <CardDescription>
                Connect your WhatsApp Business account to enable automated customer service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="api-key">WhatsApp Business API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Business Phone Number</Label>
                  <Input
                    id="phone-number"
                    placeholder="+49 xxx xxx xxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {isConnected ? (
                  <Button variant="destructive" onClick={handleDisconnect}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                ) : (
                  <Button onClick={handleConnect}>
                    <WhatsappLogo className="h-4 w-4 mr-2" />
                    Connect to WhatsApp
                  </Button>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Automation Settings</h4>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Responses</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically respond to customer inquiries
                    </p>
                  </div>
                  <Switch
                    checked={autoResponses}
                    onCheckedChange={setAutoResponses}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Business Hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Only send automated responses during business hours
                    </p>
                  </div>
                  <Switch
                    checked={businessHours}
                    onCheckedChange={setBusinessHours}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Active Conversations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChatCircle className="h-5 w-5" />
                  Active Conversations
                </CardTitle>
                <CardDescription>Recent customer interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts?.slice(0, 3).map((contact) => (
                    <div key={contact.phone} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{contact.name}</span>
                          <Badge variant={contact.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {contact.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {contact.phone} • {contact.orderCount} orders
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last: {new Date(contact.lastMessage).toLocaleTimeString()}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ChatCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Messages
                </CardTitle>
                <CardDescription>Latest customer messages and responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages?.slice(0, 4).map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.type === 'outgoing' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="text-sm">{message.message}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                          {message.isAutomated && (
                            <Robot className="h-3 w-3 opacity-70" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Message Templates</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates?.map((template) => (
              <Card key={template.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Switch
                      checked={template.enabled}
                      onCheckedChange={(checked) => {
                        // Update template enabled status
                        toast.success(`Template ${checked ? 'enabled' : 'disabled'}`)
                      }}
                    />
                  </div>
                  <CardDescription>Trigger: {template.trigger}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2 bg-muted rounded text-sm">
                    {template.message}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Used {template.usage} times</span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="h-5 w-5" />
                AI-Powered Responses
              </CardTitle>
              <CardDescription>
                Configure intelligent automated responses based on customer intent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Order Status Automation</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={92} className="flex-1" />
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically handles order status inquiries
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Product Recommendations</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={87} className="flex-1" />
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI suggests relevant products based on customer queries
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Support Ticket Creation</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={94} className="flex-1" />
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automatically creates support tickets for complex issues
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Language Detection</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={98} className="flex-1" />
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Responds in customer's preferred language (EN/DE/ZH)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Response Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Response Time</span>
                    <span className="font-medium">34 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">First Response Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Resolution Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                    <span className="font-medium">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Message Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Order Inquiries</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Product Questions</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Support Requests</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">General Inquiries</span>
                    <span className="font-medium">9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Business Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <span className="font-medium text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Support Cost Savings</span>
                    <span className="font-medium text-green-600">-42%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Customer Retention</span>
                    <span className="font-medium text-green-600">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue Attribution</span>
                    <span className="font-medium">€12,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Automation Triggers</CardTitle>
              <CardDescription>Most commonly triggered automated responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates?.sort((a, b) => b.usage - a.usage).map((template) => (
                  <div key={template.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="font-medium">{template.name}</span>
                      <div className="text-sm text-muted-foreground">
                        Trigger: {template.trigger}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{template.usage}</div>
                      <div className="text-sm text-muted-foreground">uses</div>
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