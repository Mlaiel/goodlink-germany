import React, { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { 
  Robot, 
  X, 
  Minus, 
  ArrowsOutSimple,
  ArrowsInSimple,
  PaperPlaneTilt,
  ThumbsUp,
  ThumbsDown,
  Trash,
  Resize,
  CaretDown,
  CaretUp
} from "@phosphor-icons/react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  isHelpful?: boolean
}

interface ChatPosition {
  x: number
  y: number
  width: number
  height: number
}

export function FloatingAIChat() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "🤖 Demo Mode: Hello! I'm your AI assistant for Good-Link Germany. I can help you explore our medical devices and automotive components, answer compliance questions, provide shipping information, and connect you with our sales team. Try asking me about our products or services!",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState<ChatPosition>({
    x: 20,
    y: 20,
    width: 350,
    height: 500
  })

  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Quick suggestions
  const quickSuggestions = [
    "Show me medical devices",
    "Find automotive parts", 
    "What compliance certificates do you provide?",
    "Tell me about shipping to Europe",
    "I need volume pricing for bulk orders",
    "Connect me with technical support",
    "Show me your product catalog",
    "How do I contact your sales team?",
    "What is Good-Link Germany's history?",
    "Help me find connectors and cables",
    "I need EMC/ROHS certified components",
    "Contact human support specialist"
  ]

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputMessage.trim()
    if (!content || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      // Simulate AI response with shorter delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200))
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
      
      // Show success toast for demo
      toast.success("AI response generated", { duration: 2000 })
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t('chat.errorResponse'),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error("Failed to get AI response")
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Add demo mode indicator
    const demoPrefix = "🤖 Demo Mode: "
    
    if (message.includes('medical') || message.includes('device') || message.includes('hospital') || message.includes('health')) {
      return demoPrefix + "Excellent! We specialize in medical devices with over 800+ certified components. Our medical portfolio includes diagnostic equipment, patient monitoring devices, surgical instruments, and medical electronics. All products meet strict EU MDR/CE standards. Our Shenzhen medical division has 20+ years of experience. Would you like to explore specific medical categories or need compliance documentation?"
    }
    
    if (message.includes('automotive') || message.includes('car') || message.includes('vehicle') || message.includes('motor')) {
      return demoPrefix + "Perfect! Our automotive division offers 600+ premium components including electric motors, sensors, connectors, castors, and wiring harnesses. All parts meet EMC/ROHS standards and are tested for European markets. We serve major automotive manufacturers with reliable China-Europe supply chains. What specific automotive components can I help you find?"
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('pricing')) {
      return demoPrefix + "For competitive pricing on our medical and automotive components, our sales team provides personalized quotes based on volume and specifications. We offer attractive discounts for bulk orders and long-term partnerships. Contact us at sales@goodlink-germany.com or through our sales team for detailed pricing. Volume pricing starts at 100+ units."
    }
    
    if (message.includes('shipping') || message.includes('delivery') || message.includes('logistics')) {
      return demoPrefix + "We offer fast, reliable shipping from our 3 warehouses: Shenzhen, Shanghai, and Hong Kong. Delivery times: Europe (5-7 days), Global (7-14 days). We use DHL, UPS, and other premium carriers. Free shipping available for orders over €500. Our logistics team handles all customs and compliance documentation."
    }
    
    if (message.includes('compliance') || message.includes('certificate') || message.includes('standard') || message.includes('regulation')) {
      return demoPrefix + "Compliance is our top priority! Medical devices: Full MDR/CE certification with detailed documentation. Automotive: EMC/ROHS compliance guaranteed. We provide complete certification packages including test reports, declarations of conformity, and technical files. Our compliance team ensures all products meet European standards before shipment."
    }
    
    if (message.includes('support') || message.includes('help') || message.includes('contact') || message.includes('human')) {
      return demoPrefix + "Our expert technical support team is available in German, English, and Chinese. We provide pre-sale consultation, technical specifications, installation guidance, and after-sales support. Available 24/7 for urgent technical questions. Contact: support@goodlink-germany.com or call our Cologne office."
    }
    
    if (message.includes('company') || message.includes('about') || message.includes('history') || message.includes('background')) {
      return demoPrefix + "Good-Link Germany was founded in 2020 as the European branch of Good-Link China (est. 2004). We're based in Cologne with 78+ employees across China and Germany. 2023 revenue: €93M. We specialize in medical devices and automotive components, bridging Europe and China with cultural expertise and reliable partnerships."
    }
    
    if (message.includes('catalog') || message.includes('products') || message.includes('browse') || message.includes('categories')) {
      return demoPrefix + "Browse our comprehensive catalog: 🏥 Medical Devices (800+ components), 🚗 Automotive Parts (600+ components), 🔌 Connectors & Cables (500+ variants), ⚙️ Motors & Sensors (300+ models), 🛞 Mechanical Components (400+ parts). All products feature detailed specifications, compliance certificates, and technical documentation."
    }
    
    return demoPrefix + "Hello! I'm your AI assistant for Good-Link Germany, your trusted bridge between Europe and China for premium medical devices and automotive components. I can help with product searches, technical specifications, compliance questions, pricing information, and connecting you with our expert sales team. What can I assist you with today?"
  }

  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isHelpful } : msg
      )
    )
    toast.success(t('chat.feedbackReceived'))
  }

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      content: "🤖 Demo Mode: Hello! I'm your AI assistant for Good-Link Germany. I can help you explore our medical devices and automotive components, answer compliance questions, provide shipping information, and connect you with our sales team. Try asking me about our products or services!",
      isUser: false,
      timestamp: new Date()
    }])
    toast.success(t('chat.clearChat'))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === chatRef.current || (e.target as HTMLElement).closest('.chat-header')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition(prev => ({
        ...prev,
        x: Math.max(0, Math.min(window.innerWidth - prev.width, e.clientX - dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - prev.height, e.clientY - dragStart.y))
      }))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart])

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition({ x: 20, y: 20, width: 350, height: 500 })
      setIsMaximized(false)
    } else {
      setPosition({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight })
      setIsMaximized(true)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            size="lg"
            className="rounded-full h-16 w-16 shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 animate-bounce"
            onClick={() => setIsOpen(true)}
          >
            <Robot className="h-7 w-7" />
          </Button>
          <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full shadow-lg">
            Demo
          </div>
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Try AI Chat!
          </div>
        </div>
      </div>
    )
  }

  const chatStyle = {
    position: 'fixed' as const,
    left: position.x,
    top: position.y,
    width: isMinimized ? 300 : position.width,
    height: isMinimized ? 60 : position.height,
    zIndex: 1000,
    cursor: isDragging ? 'grabbing' : 'default',
  }

  return (
    <Card 
      ref={chatRef}
      style={chatStyle}
      className={`shadow-2xl border-2 transition-all duration-300 ${
        isDragging ? 'shadow-3xl' : ''
      } ${isMaximized ? 'rounded-none' : 'rounded-lg'}`}
      onMouseDown={handleMouseDown}
    >
      {/* Chat Header */}
      <CardHeader className="chat-header px-4 py-3 bg-primary text-primary-foreground cursor-grab active:cursor-grabbing">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Robot className="h-5 w-5" />
            <div>
              <CardTitle className="text-sm">{t('chat.aiAssistant')}</CardTitle>
              <p className="text-xs opacity-80">{t('chat.onlineNow')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <CaretUp className="h-4 w-4" /> : <CaretDown className="h-4 w-4" />}
            </Button>
            
            {!isMaximized && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={toggleMaximize}
              >
                <ArrowsOutSimple className="h-4 w-4" />
              </Button>
            )}
            
            {isMaximized && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={toggleMaximize}
              >
                <ArrowsInSimple className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={clearChat}
            >
              <Trash className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Chat Content */}
      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-full">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    
                    {!message.isUser && message.isHelpful === undefined && message.id !== "welcome" && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/20">
                        <span className="text-xs">{t('chat.helpful')}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleFeedback(message.id, true)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleFeedback(message.id, false)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    
                    {message.isHelpful !== undefined && (
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <Badge variant={message.isHelpful ? "default" : "secondary"} className="text-xs">
                          {message.isHelpful ? t('chat.helpfulFeedback') : t('chat.feedbackReceived')}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Robot className="h-4 w-4" />
                      <span className="text-sm">AI is thinking</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t bg-muted/30">
              <p className="text-sm font-medium text-foreground mb-3">💡 Try asking me about:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickSuggestions.slice(0, 6).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-sm h-9 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    <span className="text-left">{suggestion}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                🚀 This is a fully functional demo - try any question!
              </p>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-background/95 backdrop-blur-sm">
            <div className="flex gap-2">
              <Input
                placeholder={t('chat.typeMessage')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                disabled={isLoading}
                className="flex-1 focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className={`transition-all duration-200 ${
                  inputMessage.trim() ? 'bg-primary hover:bg-primary/90' : ''
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <PaperPlaneTilt className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                {t('chat.poweredBy')}
              </p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? 'AI is typing...' : 'Press Enter to send'}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}