import React, { useState, useRef, useEffect } from "react"
import { useKV } from "@github/spark/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { 
  ChatCircle, 
  X, 
  PaperPlaneTilt,
  Robot,
  User,
  Sparkle,
  ThumbsUp,
  ThumbsDown,
  ShoppingCart,
  Heart,
  Star,
  Minus,
  ArrowsOut,
  ArrowsIn,
  DotsSixVertical
} from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: number
  products?: Product[]
  suggestions?: string[]
  rating?: number
}

interface Product {
  id: string
  name: string
  price: string
  image: string
  rating: number
  category: string
}

interface AICustomerChatProps {
  className?: string
}

export function AICustomerChat({ className = "" }: AICustomerChatProps) {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useKV<boolean>("chat-is-open", false)
  const [isMinimized, setIsMinimized] = useKV<boolean>("chat-is-minimized", false)
  const [isMaximized, setIsMaximized] = useKV<boolean>("chat-is-maximized", false)
  const [position, setPosition] = useKV<{x: number, y: number}>("chat-position", { x: 24, y: 24 })
  const [size, setSize] = useKV<{width: number, height: number}>("chat-size", { width: 384, height: 600 })
  const [messages, setMessages] = useKV<Message[]>("chat-messages", [])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useKV<string[]>("chat-history", [])
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || e.button !== 0) return // Only left mouse button
    e.preventDefault()
    setIsDragging(true)
    setDragStart({
      x: e.clientX - (position?.x || 24),
      y: e.clientY - (position?.y || 24)
    })
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || e.button !== 0) return // Only left mouse button
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size?.width || 384,
      height: size?.height || 600
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        const currentSize = size || { width: 384, height: 600 }
        const newX = Math.max(0, Math.min(window.innerWidth - currentSize.width, e.clientX - dragStart.x))
        const newY = Math.max(0, Math.min(window.innerHeight - currentSize.height, e.clientY - dragStart.y))
        setPosition({ x: newX, y: newY })
      }
      
      if (isResizing && !isMaximized) {
        const newWidth = Math.max(300, Math.min(800, resizeStart.width + (e.clientX - resizeStart.x)))
        const newHeight = Math.max(400, Math.min(800, resizeStart.height + (e.clientY - resizeStart.y)))
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, isMaximized, setPosition, setSize])

  const toggleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false)
    } else {
      setIsMaximized(true)
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  // Initialize with welcome message if no messages
  useEffect(() => {
    if (!messages || messages.length === 0) {
      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        type: "bot",
        content: getWelcomeMessage(),
        timestamp: Date.now(),
        suggestions: [
          t("chat.showPopularProducts"),
          t("chat.findElectronics"),
          t("chat.bestDeals"),
          t("chat.customerSupport")
        ]
      }
      setMessages((prev) => [welcomeMessage])
    }
  }, [])

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: "👋 Hello! I'm your AI shopping assistant. How can I help you find the perfect products today?",
      de: "👋 Hallo! Ich bin Ihr KI-Shopping-Assistent. Wie kann ich Ihnen heute dabei helfen, die perfekten Produkte zu finden?",
      zh: "👋 您好！我是您的AI购物助手。今天我可以如何帮助您找到完美的产品？",
      fr: "👋 Bonjour! Je suis votre assistant shopping IA. Comment puis-je vous aider à trouver les produits parfaits aujourd'hui?"
    }
    return welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en
  }

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // Create prompt using global spark object
    const prompt = `You are a friendly AI customer support assistant for Goodlink Germany, an AI-powered e-commerce platform. 
    
    Customer message: "${userMessage}"
    Language: ${language}
    
    Respond in ${language} language. Be helpful, friendly, and provide specific product recommendations when appropriate.
    
    If the customer asks about:
    - Products: Suggest relevant categories and mention popular items
    - Shipping: Mention free shipping over €29, fast delivery
    - Returns: 30-day return policy, easy process
    - Support: Available 24/7, multiple contact methods
    
    Keep responses concise but informative. Include emojis appropriately.`

    try {
      const response = await window.spark.llm(prompt, "gpt-4o-mini")
      
      // Mock product suggestions based on context
      let products: Product[] = []
      let suggestions: string[] = []
      
      if (userMessage.toLowerCase().includes('electronic') || userMessage.toLowerCase().includes('tech')) {
        products = [
          {
            id: "1",
            name: "Wireless Headphones Pro",
            price: "€89.99",
            image: "/api/placeholder/80/80",
            rating: 4.8,
            category: "Electronics"
          },
          {
            id: "2", 
            name: "Smart Watch Series 5",
            price: "€299.99",
            image: "/api/placeholder/80/80",
            rating: 4.6,
            category: "Electronics"
          }
        ]
      }
      
      suggestions = [
        t("chat.shippingInfo"),
        t("chat.productCategories"),
        t("chat.returnsInfo"),
        t("chat.humanSupport")
      ]

      return {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: response,
        timestamp: Date.now(),
        products: products.length > 0 ? products : undefined,
        suggestions
      }
    } catch (error) {
      console.error('AI response error:', error)
      return {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: t("chat.errorResponse"),
        timestamp: Date.now(),
        suggestions: [
          t("chat.humanSupport"), 
          t("chat.tryAgain")
        ]
      }
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: input.trim(),
      timestamp: Date.now()
    }

    setMessages(prev => [...(prev || []), userMessage])
    setChatHistory(prev => [...(prev || []).slice(-9), input.trim()]) // Keep last 10 messages
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = await generateAIResponse(userMessage.content)
      setMessages(prev => [...(prev || []), botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  const rateResponse = (messageId: string, rating: number) => {
    setMessages(prev => (prev || []).map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ))
  }

  const clearChat = () => {
    setMessages((prev) => [])
    setChatHistory((prev) => [])
    // Add welcome message
    const welcomeMessage: Message = {
      id: `welcome-${Date.now()}`,
      type: "bot",
      content: getWelcomeMessage(),
      timestamp: Date.now(),
      suggestions: [
        t("chat.showPopularProducts"),
        t("chat.findElectronics"),
        t("chat.bestDeals"),
        t("chat.customerSupport")
      ]
    }
    setMessages((prev) => [welcomeMessage])
  }

  if (!isOpen) {
    return (
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl relative"
          title={t("chat.aiAssistant")}
        >
          <ChatCircle className="h-8 w-8 text-white" />
          {/* Pulse indicator */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Notification badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-white text-xs font-bold">●</span>
          </motion.div>
        </Button>
      </motion.div>
    )
  }

  const currentPosition = position || { x: 24, y: 24 }
  const currentSize = size || { width: 384, height: 600 }

  return (
    <motion.div
      ref={chatRef}
      className={`fixed z-50 ${className}`}
      style={{
        left: isMaximized ? 0 : currentPosition.x,
        top: isMaximized ? 0 : currentPosition.y,
        width: isMaximized ? '100vw' : currentSize.width,
        height: isMaximized ? '100vh' : (isMinimized ? 'auto' : currentSize.height),
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <Card className={`flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm transition-all duration-200 ${isMaximized ? 'rounded-none h-full' : 'rounded-lg'} ${isDragging ? 'shadow-3xl scale-105' : ''} ${isResizing ? 'shadow-3xl' : ''}`}>
        {/* Header */}
        <div 
          className={`flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white select-none ${isMaximized ? 'rounded-none' : 'rounded-t-lg'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <DotsSixVertical className="h-4 w-4 opacity-60" />
            <div className="relative">
              <Robot className="h-7 w-7" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{t("chat.aiAssistant")}</h3>
              <p className="text-xs opacity-90">{t("chat.onlineNow")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              title={t("chat.clearChat")}
            >
              <Sparkle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMinimize}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              title={isMinimized ? t("chat.restore") : t("chat.minimize")}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMaximize}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              title={isMaximized ? t("chat.restore") : t("chat.maximize")}
            >
              {isMaximized ? <ArrowsIn className="h-4 w-4" /> : <ArrowsOut className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChat}
              className="text-white hover:bg-red-500/30 h-8 w-8 p-0 ml-1"
              title={t("chat.closeChat")}
            >
              <X className="h-4 w-4 font-bold" weight="bold" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: isMaximized ? 'calc(100vh - 120px)' : currentSize.height - 120 }}>
              <AnimatePresence>
                {(messages || []).map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}
                  >
                    {message.type === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Robot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {/* Products */}
                      {message.products && (
                        <div className="mt-3 space-y-2">
                          {message.products.map((product) => (
                            <div key={product.id} className="bg-white border rounded-lg p-3 shadow-sm">
                              <div className="flex gap-3">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{product.name}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="font-bold text-blue-600">{product.price}</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-xs text-gray-600">{product.rating}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Button size="sm" className="h-7 w-7 p-0">
                                    <ShoppingCart className="h-3 w-3" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                    <Heart className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      {/* Rating for bot messages */}
                      {message.type === "bot" && !message.rating && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{t("chat.helpful")}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => rateResponse(message.id, 1)}
                            className="h-6 w-6 p-0 hover:bg-green-100"
                          >
                            <ThumbsUp className="h-3 w-3 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => rateResponse(message.id, -1)}
                            className="h-6 w-6 p-0 hover:bg-red-100"
                          >
                            <ThumbsDown className="h-3 w-3 text-red-600" />
                          </Button>
                        </div>
                      )}
                      
                      {message.rating && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {message.rating > 0 ? 
                              t("chat.helpfulFeedback") : 
                              t("chat.feedbackReceived")}
                          </Badge>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Robot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chat.typeMessage")}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <PaperPlaneTilt className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {t("chat.poweredBy")}
              </p>
            </div>
          </>
        )}

        {/* Resize handle */}
        {!isMaximized && !isMinimized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-50 hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeMouseDown}
          >
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-gray-400 transform rotate-0"></div>
            <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-gray-300"></div>
          </div>
        )}
      </Card>
    </motion.div>
  )
}