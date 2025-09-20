import React, { createContext, useContext, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'

type Language = 'en' | 'de' | 'zh' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.marketplaces': 'Marketplaces',
    'nav.products': 'Products',
    'nav.inventory': 'Inventory Sync',
    'nav.shop': 'Shop',
    'nav.blog': 'Blog',
    'nav.whatsapp': 'WhatsApp',
    'nav.agents': 'AI Agents',
    'nav.admin': 'Admin Panel',
    'nav.account': 'My Account',
    'nav.cart': 'Shopping Cart',
    'nav.orders': 'My Orders',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.configure': 'Configure',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.status': 'Status',
    'common.price': 'Price',
    'common.quantity': 'Quantity',
    'common.total': 'Total',
    'common.view': 'View',
    'common.back': 'Back',
    
    // Admin Panel
    'admin.title': 'Admin Control Center',
    'admin.overview': 'System Overview',
    'admin.users': 'User Management',
    'admin.settings': 'Global Settings',
    'admin.analytics': 'Advanced Analytics',
    'admin.logs': 'System Logs',
    
    // Shop
    'shop.title': 'Goodlink Store',
    'shop.categories': 'Categories',
    'shop.featured': 'Featured Products',
    'shop.bestsellers': 'Best Sellers',
    'shop.new': 'New Arrivals',
    'shop.addToCart': 'Add to Cart',
    'shop.buyNow': 'Buy Now',
    'shop.outOfStock': 'Out of Stock',
    'shop.inStock': 'In Stock',
    'shop.productDetails': 'Product Details',
    'shop.reviews': 'Customer Reviews',
    'shop.relatedProducts': 'Related Products',
    'shop.checkout': 'Checkout',
    'shop.cart': 'Shopping Cart',
    'shop.cartEmpty': 'Your cart is empty',
    'shop.continueShopping': 'Continue Shopping',
    'shop.proceedToCheckout': 'Proceed to Checkout',
    
    // User Account
    'user.profile': 'Profile',
    'user.orders': 'Order History',
    'user.addresses': 'Addresses',
    'user.payment': 'Payment Methods',
    'user.preferences': 'Preferences',
    'user.notifications': 'Notifications',
    'user.security': 'Security',
    'user.welcome': 'Welcome back',
    
    // AI Agents
    'agents.title': 'AI Agent Control Center',
    'agents.active': 'Active Agents',
    'agents.training': 'Training',
    'agents.success': 'Avg Success Rate',
    'agents.processed': 'Total Processed',
    'agents.social': 'Social Media',
    'agents.messaging': 'Messaging',
    'agents.content': 'Content',
    'agents.pricing': 'Pricing',
    'agents.analytics': 'Analytics',
    'agents.forecasting': 'Forecasting',
    'agents.support': 'Support',
    
    // Dashboard
    'dashboard.revenue': 'Total Revenue',
    'dashboard.orders': 'Active Orders',
    'dashboard.buybox': 'Buy Box %',
    'dashboard.automations': 'AI Automations',
    'dashboard.performance': 'Performance Trends',
    'dashboard.marketplaceRevenue': 'Revenue by Marketplace',
    
    // Chat
    'chat.aiAssistant': 'AI Assistant',
    'chat.onlineNow': 'Online now',
    'chat.typeMessage': 'Type your message...',
    'chat.helpful': 'Helpful?',
    'chat.helpfulFeedback': 'Helpful feedback received',
    'chat.feedbackReceived': 'Feedback received',
    'chat.poweredBy': 'Powered by Goodlink AI • Available 24/7',
    'chat.showPopularProducts': 'Show me popular products',
    'chat.findElectronics': 'Help me find electronics',
    'chat.bestDeals': 'What are your best deals?',
    'chat.customerSupport': 'I need customer support',
    'chat.shippingInfo': 'Tell me more about shipping',
    'chat.productCategories': 'Show me product categories',
    'chat.returnsInfo': 'How do returns work?',
    'chat.humanSupport': 'Contact human support',
    'chat.tryAgain': 'Try again',
    'chat.errorResponse': "I apologize, I'm having trouble responding right now. Please try again or contact our human support team.",
    
    // Language names
    'lang.english': 'English',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.french': 'Français',
  },
  
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.marketplaces': 'Marktplätze',
    'nav.products': 'Produkte',
    'nav.inventory': 'Inventar Sync',
    'nav.shop': 'Shop',
    'nav.blog': 'Blog',
    'nav.whatsapp': 'WhatsApp',
    'nav.agents': 'KI-Agenten',
    'nav.admin': 'Admin Panel',
    'nav.account': 'Mein Konto',
    'nav.cart': 'Warenkorb',
    'nav.orders': 'Meine Bestellungen',
    'nav.logout': 'Abmelden',
    'nav.login': 'Anmelden',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.delete': 'Löschen',
    'common.edit': 'Bearbeiten',
    'common.add': 'Hinzufügen',
    'common.search': 'Suchen',
    'common.filter': 'Filter',
    'common.export': 'Exportieren',
    'common.import': 'Importieren',
    'common.configure': 'Konfigurieren',
    'common.active': 'Aktiv',
    'common.inactive': 'Inaktiv',
    'common.status': 'Status',
    'common.price': 'Preis',
    'common.quantity': 'Menge',
    'common.total': 'Gesamt',
    'common.view': 'Ansehen',
    'common.back': 'Zurück',
    
    // Admin Panel
    'admin.title': 'Admin Kontrollzentrum',
    'admin.overview': 'Systemübersicht',
    'admin.users': 'Benutzerverwaltung',
    'admin.settings': 'Globale Einstellungen',
    'admin.analytics': 'Erweiterte Analytik',
    'admin.logs': 'Systemprotokolle',
    
    // Shop
    'shop.title': 'Goodlink Store',
    'shop.categories': 'Kategorien',
    'shop.featured': 'Empfohlene Produkte',
    'shop.bestsellers': 'Bestseller',
    'shop.new': 'Neuheiten',
    'shop.addToCart': 'In den Warenkorb',
    'shop.buyNow': 'Jetzt kaufen',
    'shop.outOfStock': 'Nicht vorrätig',
    'shop.inStock': 'Auf Lager',
    'shop.productDetails': 'Produktdetails',
    'shop.reviews': 'Kundenbewertungen',
    'shop.relatedProducts': 'Ähnliche Produkte',
    'shop.checkout': 'Zur Kasse',
    'shop.cart': 'Warenkorb',
    'shop.cartEmpty': 'Ihr Warenkorb ist leer',
    'shop.continueShopping': 'Weiter einkaufen',
    'shop.proceedToCheckout': 'Zur Kasse gehen',
    
    // User Account
    'user.profile': 'Profil',
    'user.orders': 'Bestellhistorie',
    'user.addresses': 'Adressen',
    'user.payment': 'Zahlungsmethoden',
    'user.preferences': 'Einstellungen',
    'user.notifications': 'Benachrichtigungen',
    'user.security': 'Sicherheit',
    'user.welcome': 'Willkommen zurück',
    
    // AI Agents
    'agents.title': 'KI-Agenten Kontrollzentrum',
    'agents.active': 'Aktive Agenten',
    'agents.training': 'Training',
    'agents.success': 'Durchschn. Erfolgsrate',
    'agents.processed': 'Gesamt verarbeitet',
    'agents.social': 'Social Media',
    'agents.messaging': 'Messaging',
    'agents.content': 'Inhalt',
    'agents.pricing': 'Preisgestaltung',
    'agents.analytics': 'Analytik',
    'agents.forecasting': 'Prognose',
    'agents.support': 'Support',
    
    // Dashboard
    'dashboard.revenue': 'Gesamtumsatz',
    'dashboard.orders': 'Aktive Bestellungen',
    'dashboard.buybox': 'Buy Box %',
    'dashboard.automations': 'KI-Automatisierungen',
    'dashboard.performance': 'Leistungstrends',
    'dashboard.marketplaceRevenue': 'Umsatz nach Marktplatz',
    
    // Chat
    'chat.aiAssistant': 'KI-Assistent',
    'chat.onlineNow': 'Jetzt online',
    'chat.typeMessage': 'Nachricht eingeben...',
    'chat.helpful': 'Hilfreich?',
    'chat.helpfulFeedback': 'Hilfreiches Feedback erhalten',
    'chat.feedbackReceived': 'Feedback erhalten',
    'chat.poweredBy': 'Angetrieben von Goodlink KI • 24/7 verfügbar',
    'chat.showPopularProducts': 'Zeige mir beliebte Produkte',
    'chat.findElectronics': 'Hilf mir Elektronik zu finden',
    'chat.bestDeals': 'Was sind eure besten Angebote?',
    'chat.customerSupport': 'Ich brauche Kundensupport',
    'chat.shippingInfo': 'Erzähl mir mehr über Versand',
    'chat.productCategories': 'Zeige mir Produktkategorien',
    'chat.returnsInfo': 'Wie funktionieren Rücksendungen?',
    'chat.humanSupport': 'Menschlichen Support kontaktieren',
    'chat.tryAgain': 'Erneut versuchen',
    'chat.errorResponse': 'Entschuldigung, ich habe gerade Probleme beim Antworten. Bitte versuchen Sie es erneut oder kontaktieren Sie unser menschliches Support-Team.',
    
    // Language names
    'lang.english': 'English',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.french': 'Français',
  },
  
  zh: {
    // Navigation
    'nav.dashboard': '仪表板',
    'nav.marketplaces': '市场平台',
    'nav.products': '产品',
    'nav.inventory': '库存同步',
    'nav.shop': '商店',
    'nav.blog': '博客',
    'nav.whatsapp': 'WhatsApp',
    'nav.agents': 'AI代理',
    'nav.admin': '管理面板',
    'nav.account': '我的账户',
    'nav.cart': '购物车',
    'nav.orders': '我的订单',
    'nav.logout': '退出登录',
    'nav.login': '登录',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.add': '添加',
    'common.search': '搜索',
    'common.filter': '筛选',
    'common.export': '导出',
    'common.import': '导入',
    'common.configure': '配置',
    'common.active': '活跃',
    'common.inactive': '非活跃',
    'common.status': '状态',
    'common.price': '价格',
    'common.quantity': '数量',
    'common.total': '总计',
    'common.view': '查看',
    'common.back': '返回',
    
    // Admin Panel
    'admin.title': '管理控制中心',
    'admin.overview': '系统概览',
    'admin.users': '用户管理',
    'admin.settings': '全局设置',
    'admin.analytics': '高级分析',
    'admin.logs': '系统日志',
    
    // Shop
    'shop.title': 'Goodlink 商店',
    'shop.categories': '分类',
    'shop.featured': '精选产品',
    'shop.bestsellers': '畅销产品',
    'shop.new': '新品上市',
    'shop.addToCart': '添加到购物车',
    'shop.buyNow': '立即购买',
    'shop.outOfStock': '缺货',
    'shop.inStock': '现货',
    'shop.productDetails': '产品详情',
    'shop.reviews': '客户评价',
    'shop.relatedProducts': '相关产品',
    'shop.checkout': '结账',
    'shop.cart': '购物车',
    'shop.cartEmpty': '您的购物车是空的',
    'shop.continueShopping': '继续购物',
    'shop.proceedToCheckout': '去结账',
    
    // User Account
    'user.profile': '个人资料',
    'user.orders': '订单历史',
    'user.addresses': '地址',
    'user.payment': '支付方式',
    'user.preferences': '偏好设置',
    'user.notifications': '通知',
    'user.security': '安全',
    'user.welcome': '欢迎回来',
    
    // AI Agents
    'agents.title': 'AI代理控制中心',
    'agents.active': '活跃代理',
    'agents.training': '训练中',
    'agents.success': '平均成功率',
    'agents.processed': '总处理量',
    'agents.social': '社交媒体',
    'agents.messaging': '消息传递',
    'agents.content': '内容',
    'agents.pricing': '定价',
    'agents.analytics': '分析',
    'agents.forecasting': '预测',
    'agents.support': '支持',
    
    // Dashboard
    'dashboard.revenue': '总收入',
    'dashboard.orders': '活跃订单',
    'dashboard.buybox': 'Buy Box %',
    'dashboard.automations': 'AI自动化',
    'dashboard.performance': '性能趋势',
    'dashboard.marketplaceRevenue': '按市场平台的收入',
    
    // Chat
    'chat.aiAssistant': 'AI助手',
    'chat.onlineNow': '现在在线',
    'chat.typeMessage': '输入您的消息...',
    'chat.helpful': '有帮助吗？',
    'chat.helpfulFeedback': '收到有用反馈',
    'chat.feedbackReceived': '已收到反馈',
    'chat.poweredBy': 'Goodlink AI 驱动 • 24/7 可用',
    'chat.showPopularProducts': '给我看热门产品',
    'chat.findElectronics': '帮我找电子产品',
    'chat.bestDeals': '你们最好的优惠是什么？',
    'chat.customerSupport': '我需要客户支持',
    'chat.shippingInfo': '告诉我更多关于运输的信息',
    'chat.productCategories': '给我看产品类别',
    'chat.returnsInfo': '退货如何工作？',
    'chat.humanSupport': '联系人工支持',
    'chat.tryAgain': '再试一次',
    'chat.errorResponse': '抱歉，我现在回复有困难。请重试或联系我们的人工支持团队。',
    
    // Language names
    'lang.english': 'English',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.french': 'Français',
  },
  
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.marketplaces': 'Places de marché',
    'nav.products': 'Produits',
    'nav.inventory': 'Sync inventaire',
    'nav.shop': 'Boutique',
    'nav.blog': 'Blog',
    'nav.whatsapp': 'WhatsApp',
    'nav.agents': 'Agents IA',
    'nav.admin': 'Panneau Admin',
    'nav.account': 'Mon compte',
    'nav.cart': 'Panier',
    'nav.orders': 'Mes commandes',
    'nav.logout': 'Déconnexion',
    'nav.login': 'Connexion',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.add': 'Ajouter',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
    'common.import': 'Importer',
    'common.configure': 'Configurer',
    'common.active': 'Actif',
    'common.inactive': 'Inactif',
    'common.status': 'Statut',
    'common.price': 'Prix',
    'common.quantity': 'Quantité',
    'common.total': 'Total',
    'common.view': 'Voir',
    'common.back': 'Retour',
    
    // Admin Panel
    'admin.title': 'Centre de contrôle Admin',
    'admin.overview': 'Vue d\'ensemble du système',
    'admin.users': 'Gestion des utilisateurs',
    'admin.settings': 'Paramètres globaux',
    'admin.analytics': 'Analyses avancées',
    'admin.logs': 'Journaux système',
    
    // Shop
    'shop.title': 'Boutique Goodlink',
    'shop.categories': 'Catégories',
    'shop.featured': 'Produits vedettes',
    'shop.bestsellers': 'Meilleures ventes',
    'shop.new': 'Nouveautés',
    'shop.addToCart': 'Ajouter au panier',
    'shop.buyNow': 'Acheter maintenant',
    'shop.outOfStock': 'Rupture de stock',
    'shop.inStock': 'En stock',
    'shop.productDetails': 'Détails du produit',
    'shop.reviews': 'Avis clients',
    'shop.relatedProducts': 'Produits similaires',
    'shop.checkout': 'Commander',
    'shop.cart': 'Panier',
    'shop.cartEmpty': 'Votre panier est vide',
    'shop.continueShopping': 'Continuer les achats',
    'shop.proceedToCheckout': 'Passer la commande',
    
    // User Account
    'user.profile': 'Profil',
    'user.orders': 'Historique des commandes',
    'user.addresses': 'Adresses',
    'user.payment': 'Moyens de paiement',
    'user.preferences': 'Préférences',
    'user.notifications': 'Notifications',
    'user.security': 'Sécurité',
    'user.welcome': 'Bon retour',
    
    // AI Agents
    'agents.title': 'Centre de contrôle des agents IA',
    'agents.active': 'Agents actifs',
    'agents.training': 'Formation',
    'agents.success': 'Taux de réussite moyen',
    'agents.processed': 'Total traité',
    'agents.social': 'Médias sociaux',
    'agents.messaging': 'Messagerie',
    'agents.content': 'Contenu',
    'agents.pricing': 'Tarification',
    'agents.analytics': 'Analytique',
    'agents.forecasting': 'Prévision',
    'agents.support': 'Support',
    
    // Dashboard
    'dashboard.revenue': 'Chiffre d\'affaires total',
    'dashboard.orders': 'Commandes actives',
    'dashboard.buybox': 'Buy Box %',
    'dashboard.automations': 'Automatisations IA',
    'dashboard.performance': 'Tendances de performance',
    'dashboard.marketplaceRevenue': 'Revenus par place de marché',
    
    // Chat
    'chat.aiAssistant': 'Assistant IA',
    'chat.onlineNow': 'En ligne maintenant',
    'chat.typeMessage': 'Tapez votre message...',
    'chat.helpful': 'Utile?',
    'chat.helpfulFeedback': 'Retour utile reçu',
    'chat.feedbackReceived': 'Retour reçu',
    'chat.poweredBy': 'Alimenté par Goodlink IA • Disponible 24/7',
    'chat.showPopularProducts': 'Montrez-moi les produits populaires',
    'chat.findElectronics': 'Aidez-moi à trouver de l\'électronique',
    'chat.bestDeals': 'Quelles sont vos meilleures offres?',
    'chat.customerSupport': 'J\'ai besoin du support client',
    'chat.shippingInfo': 'Parlez-moi plus de la livraison',
    'chat.productCategories': 'Montrez-moi les catégories de produits',
    'chat.returnsInfo': 'Comment fonctionnent les retours?',
    'chat.humanSupport': 'Contacter le support humain',
    'chat.tryAgain': 'Réessayer',
    'chat.errorResponse': 'Je m\'excuse, j\'ai des difficultés à répondre maintenant. Veuillez réessayer ou contacter notre équipe de support humain.',
    
    // Language names
    'lang.english': 'English',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.french': 'Français',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useKV<Language>('app-language', 'en')

  const t = (key: string): string => {
    const currentLang = language || 'en'
    return translations[currentLang]?.[key] || translations.en[key] || key
  }

  const safeSetLanguage = (lang: Language) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language: language || 'en', setLanguage: safeSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}