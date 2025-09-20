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
      content: "Hello! I'm your AI assistant. How can I help you today?",
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
    t('chat.showPopularProducts'),
    t('chat.findMedicalDevices'),
    t('chat.findAutomotiveParts'),
    t('chat.complianceCerts'),
    t('chat.volumePricing'),
    t('chat.technicalDocs'),
    t('chat.bestDeals'),
    t('chat.customerSupport'),
    t('chat.shippingInfo'),
    t('chat.productCategories'),
    t('chat.returnsInfo'),
    t('chat.humanSupport')
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
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t('chat.errorResponse'),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('medical') || message.includes('device')) {
      return "I can help you find medical devices. We offer over 800+ certified medical components meeting EU/CE standards. Would you like to see our medical device categories or need help with specific compliance requirements?"
    }
    
    if (message.includes('automotive') || message.includes('car')) {
      return "Great! We have 600+ automotive components. Our automotive parts include connectors, sensors, motors, and mechanical components. All parts meet EMC/ROHS standards. What specific automotive components are you looking for?"
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return "For pricing information, I'd recommend contacting our sales team for personalized quotes. We offer volume discounts for bulk orders and have competitive pricing on all components. Would you like me to connect you with our sales team?"
    }
    
    if (message.includes('shipping') || message.includes('delivery')) {
      return "We offer worldwide shipping from our warehouses in Shenzhen, Shanghai, and Hong Kong. Delivery times vary by location: Europe (5-7 days), Global (7-14 days). Free shipping available for orders over €500. Need specific shipping information for your location?"
    }
    
    if (message.includes('compliance') || message.includes('certificate')) {
      return "All our products come with proper compliance certificates. Medical devices: MDR/CE certified. Automotive: EMC/ROHS compliant. We can provide detailed compliance documentation for any product. Which specific certifications do you need?"
    }
    
    if (message.includes('support') || message.includes('help')) {
      return "Our technical support team speaks German, English, and Chinese. We're available 24/7 for product questions, technical specifications, and order assistance. Would you like me to transfer you to a human specialist?"
    }
    
    return "Thank you for your question! As a leading supplier of medical devices and automotive components, I'm here to help. Could you please provide more details about what you're looking for? I can assist with product searches, technical specifications, pricing, or compliance information."
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
      content: "Hello! I'm your AI assistant. How can I help you today?",
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
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Robot className="h-6 w-6" />
        </Button>
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
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse">●</div>
                      <div className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</div>
                      <div className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="p-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
              <div className="grid grid-cols-1 gap-1">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-xs h-8"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder={t('chat.typeMessage')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
              >
                <PaperPlaneTilt className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t('chat.poweredBy')}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}