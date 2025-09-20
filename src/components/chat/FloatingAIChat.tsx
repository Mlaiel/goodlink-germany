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
  CaretUp,
  ArrowUp,
  ArrowDown
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
    width: Math.min(380, window.innerWidth - 40),
    height: Math.min(600, window.innerHeight - 40)
  })

  const chatRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle window resize to keep chat in viewport
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        ...prev,
        x: Math.max(10, Math.min(prev.x, window.innerWidth - prev.width - 10)),
        y: Math.max(10, Math.min(prev.y, window.innerHeight - prev.height - 10)),
        width: Math.min(prev.width, window.innerWidth - 20),
        height: Math.min(prev.height, window.innerHeight - 20)
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Ensure proper mobile positioning
  useEffect(() => {
    if (window.innerWidth < 640) { // Mobile breakpoint
      setPosition(prev => ({
        ...prev,
        x: 10,
        y: 10,
        width: window.innerWidth - 20,
        height: window.innerHeight - 20
      }))
    }
  }, [isOpen])

  // Quick suggestions
  const quickSuggestions = [
    "Show me medical devices with MDR certification",
    "Find automotive parts for electric vehicles", 
    "I need EMC compliant electronic connectors",
    "Show me precision mechanical components",
    "What compliance certificates do you provide?",
    "Tell me about shipping to Europe",
    "I need volume pricing for bulk orders",
    "Connect me with technical support",
    "Show me your medical device catalog",
    "Find automotive brake system components",
    "I need high-speed electronic connectors",
    "Show me industrial castors and wheels",
    "How do I contact your sales team?",
    "What is Good-Link Germany's compliance process?",
    "Help me find ISO 13485 certified devices",
    "I need IATF 16949 automotive components",
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
    
    // Medical Agent Responses
    if (message.includes('medical') || message.includes('device') || message.includes('hospital') || message.includes('health') || message.includes('diagnostic') || message.includes('patient') || message.includes('surgical')) {
      return demoPrefix + "🏥 Medical Device Expert AI activated: Excellent! We specialize in medical devices with over 800+ certified components. Our medical portfolio includes diagnostic equipment, patient monitoring devices, surgical instruments, and medical electronics. All products meet strict EU MDR/CE standards with ISO 13485:2016 compliance. Our Shenzhen medical division has 20+ years of experience in healthcare solutions. I can help with device classification, regulatory guidance, clinical data interpretation, and risk assessment. Would you like to explore specific medical categories or need compliance documentation?"
    }
    
    // Automotive Agent Responses  
    if (message.includes('automotive') || message.includes('car') || message.includes('vehicle') || message.includes('motor') || message.includes('brake') || message.includes('engine') || message.includes('transmission')) {
      return demoPrefix + "🚗 Automotive Components AI activated: Perfect! Our automotive division offers 600+ premium components including electric motors, sensors, connectors, castors, and wiring harnesses. All parts meet IATF 16949:2016, EMC/ROHS standards and are tested for European markets. We serve major automotive manufacturers with reliable China-Europe supply chains. I can assist with component specifications, quality standards verification, functional safety assessment (ISO 26262), and supply chain optimization. What specific automotive components can I help you find?"
    }
    
    // Electronics Agent Responses
    if (message.includes('connector') || message.includes('cable') || message.includes('electronic') || message.includes('circuit') || message.includes('sensor') || message.includes('switch') || message.includes('plug')) {
      return demoPrefix + "🔌 Electronics & Connectors AI activated: Great choice! We offer 500+ connector variants and electronic components with full EMC/EMI compliance. Our portfolio includes high-speed connectors, power supplies, sensors, switches, and electronic assemblies. All products meet IPC-A-610, IEC 61000 series, and RoHS Directive standards. I can help with connector specification matching, signal integrity analysis, EMC compliance verification, and material compatibility checks. Need specific connector types or technical specifications?"
    }
    
    // Mechanical Agent Responses
    if (message.includes('castor') || message.includes('wheel') || message.includes('bearing') || message.includes('mechanical') || message.includes('fastener') || message.includes('spring') || message.includes('gasket')) {
      return demoPrefix + "⚙️ Mechanical Components AI activated: Excellent! We provide 400+ mechanical parts including castors, wheels, bearings, fasteners, springs, gaskets, and machined components. All parts meet ISO 9001:2015, DIN standards, and ASTM specifications. I can assist with material selection guidance, load calculations, manufacturing process optimization, dimensional tolerance analysis, and stress testing protocols. Looking for specific mechanical components or load requirements?"
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('pricing')) {
      return demoPrefix + "💰 Pricing Specialist: For competitive pricing on our medical and automotive components, our sales team provides personalized quotes based on volume and specifications. We offer attractive discounts for bulk orders and long-term partnerships. Medical devices start from €50-5000+ depending on complexity. Automotive components range €5-500+ per unit. Volume pricing begins at 100+ units with up to 25% savings. Contact: sales@goodlink-germany.com for detailed pricing."
    }
    
    if (message.includes('shipping') || message.includes('delivery') || message.includes('logistics')) {
      return demoPrefix + "🚚 Logistics Expert: We offer fast, reliable shipping from our 3 warehouses: Shenzhen, Shanghai, and Hong Kong. Delivery times: Europe (5-7 days), Global (7-14 days). We use DHL, UPS, and other premium carriers. Free shipping available for orders over €500. Our logistics team handles all customs, compliance documentation, and temperature-controlled shipping for sensitive medical devices."
    }
    
    if (message.includes('compliance') || message.includes('certificate') || message.includes('standard') || message.includes('regulation') || message.includes('mdr') || message.includes('iso') || message.includes('ce')) {
      return demoPrefix + "🛡️ Compliance Specialist: Compliance is our top priority! Medical devices: Full MDR/CE certification with detailed documentation, ISO 13485:2016, IEC 62304 for software. Automotive: IATF 16949:2016, ISO 26262 functional safety, EMC/ROHS compliance guaranteed. Electronics: IPC standards, RoHS directive compliance. We provide complete certification packages including test reports, declarations of conformity, and technical files."
    }
    
    if (message.includes('support') || message.includes('help') || message.includes('contact') || message.includes('human') || message.includes('technical')) {
      return demoPrefix + "🎯 Technical Support: Our expert technical support team is available in German, English, and Chinese. We provide pre-sale consultation, technical specifications, installation guidance, and after-sales support. Available 24/7 for urgent technical questions. Our specialists include: Medical Device Engineers, Automotive Quality Experts, Electronics Design Engineers, Mechanical Engineering Consultants. Contact: support@goodlink-germany.com"
    }
    
    if (message.includes('company') || message.includes('about') || message.includes('history') || message.includes('background')) {
      return demoPrefix + "🏢 Company Info: Good-Link Germany was founded in 2020 as the European branch of Good-Link China (est. 2004). We're based in Cologne with 78+ employees across China and Germany. 2023 revenue: €93M. We specialize in medical devices and automotive components, bridging Europe and China with cultural expertise and reliable partnerships. Our focus: Premium quality, regulatory compliance, and long-term customer relationships."
    }
    
    if (message.includes('catalog') || message.includes('products') || message.includes('browse') || message.includes('categories')) {
      return demoPrefix + "📋 Product Catalog: Browse our comprehensive catalog organized by specialized AI agents: 🏥 Medical Devices (800+ components) - Diagnostic, monitoring, surgical, therapeutic. 🚗 Automotive Parts (600+ components) - Engine, electrical, brake, transmission systems. 🔌 Connectors & Cables (500+ variants) - High-speed, power, industrial connectors. ⚙️ Mechanical Components (400+ parts) - Castors, bearings, fasteners, precision parts. All with detailed specs and compliance certificates."
    }
    
    return demoPrefix + "Hello! I'm your AI assistant for Good-Link Germany, powered by specialized expert agents for medical devices, automotive components, electronics, and mechanical parts. I can help with product searches, technical specifications, compliance questions, pricing information, and connecting you with our expert sales team. Each product category has a dedicated AI specialist with deep industry knowledge. What can I assist you with today?"
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
      setPosition({ 
        x: 20, 
        y: 20, 
        width: Math.min(380, window.innerWidth - 40), 
        height: Math.min(600, window.innerHeight - 40) 
      })
      setIsMaximized(false)
    } else {
      setPosition({ 
        x: 0, 
        y: 0, 
        width: window.innerWidth, 
        height: window.innerHeight 
      })
      setIsMaximized(true)
    }
  }

  // Move chat window up by 50px
  const moveUp = () => {
    setPosition(prev => ({
      ...prev,
      y: Math.max(10, prev.y - 50)
    }))
    toast.success("Fenêtre déplacée vers le haut", { duration: 1000 })
  }

  // Move chat window down by 50px
  const moveDown = () => {
    setPosition(prev => ({
      ...prev,
      y: Math.min(window.innerHeight - prev.height - 10, prev.y + 50)
    }))
    toast.success("Fenêtre déplacée vers le bas", { duration: 1000 })
  }

  // Keyboard shortcuts for vertical movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when chat is open and focused
      if (!isOpen || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            moveUp()
            break
          case 'ArrowDown':
            e.preventDefault()
            moveDown()
            break
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <div className="relative">
          <Button
            size="lg"
            className="rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 animate-bounce"
            onClick={() => setIsOpen(true)}
          >
            <Robot className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
          <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full shadow-lg">
            Demo
          </div>
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:block">
            Try AI Chat!
          </div>
        </div>
      </div>
    )
  }

  const chatStyle = {
    position: 'fixed' as const,
    left: Math.max(10, Math.min(position.x, window.innerWidth - position.width - 10)),
    top: Math.max(10, Math.min(position.y, window.innerHeight - position.height - 10)),
    width: isMinimized ? Math.min(300, window.innerWidth - 20) : Math.min(position.width, window.innerWidth - 20),
    height: isMinimized ? 60 : Math.min(position.height, window.innerHeight - 20),
    zIndex: 1000,
    cursor: isDragging ? 'grabbing' : 'default',
  }

  return (
    <Card 
      ref={chatRef}
      style={chatStyle}
      className={`shadow-2xl border-2 transition-all duration-300 ${
        isDragging ? 'shadow-3xl' : ''
      } ${isMaximized ? 'rounded-none' : 'rounded-lg'} ${
        window.innerWidth < 640 ? 'chat-mobile-adjust' : ''
      }`}
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
            {/* Vertical Movement Controls Group */}
            <div className="flex items-center gap-0.5 mr-1 bg-primary-foreground/10 rounded-md p-0.5">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={moveUp}
                title="Monter (Ctrl+↑)"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={moveDown}
                title="Descendre (Ctrl+↓)"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            {/* Window Controls */}
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Agrandir" : "Réduire"}
            >
              {isMinimized ? <CaretUp className="h-4 w-4" /> : <CaretDown className="h-4 w-4" />}
            </Button>
            
            {!isMaximized && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={toggleMaximize}
                title="Plein écran"
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
                title="Fenêtrer"
              >
                <ArrowsInSimple className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={clearChat}
              title="Vider le chat"
            >
              <Trash className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
              title="Fermer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Chat Content */}
      {!isMinimized && (
        <CardContent className="p-0 flex flex-col overflow-hidden" style={{ height: 'calc(100% - 80px)' }}>
          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-2" style={{ maxHeight: 'calc(100% - 200px)' }}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg break-words ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    
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
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[85%]">
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
            <div className="px-4 py-3 border-t bg-muted/30 max-h-48 overflow-y-auto">
              <p className="text-sm font-medium text-foreground mb-3">💡 Try asking me about:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs h-8 hover:bg-primary hover:text-primary-foreground transition-colors text-left p-2"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    <span className="truncate">{suggestion}</span>
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                🚀 Fully functional demo
              </p>
            </div>
          )}

          {/* Input - Fixed at bottom */}
          <div className="chat-input-container p-3 border-t bg-background/95 backdrop-blur-sm mt-auto shrink-0">
            <div className="flex gap-2 items-end">
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
                className="flex-1 focus:ring-2 focus:ring-primary/20 min-h-[40px] resize-none"
                autoFocus
              />
              <Button
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className={`transition-all duration-200 h-10 w-10 p-0 shrink-0 ${
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
              <p className="text-xs text-muted-foreground truncate">
                {t('chat.poweredBy')}
              </p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? 'AI typing...' : 'Enter to send'}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}