import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/LanguageContext"

import {
  Article,
  MagnifyingGlass,
  Eye,
  Heart,
  ChatCircle,
  Clock,
  ArrowRight,
  BookmarkSimple,
  ShareNetwork,
  ThumbsUp,
  User,
  Calendar,
  Tag,
  TrendUp
} from "@phosphor-icons/react"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  language: 'en' | 'de' | 'zh'
  status: 'draft' | 'published' | 'scheduled'
  publishDate: Date
  views: number
  likes: number
  comments: number
  seoScore: number
  keywords: string[]
  category: string
  isAIGenerated: boolean
  author?: string
  readTime?: number
}

export function BlogReader() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [likedPosts, setLikedPosts] = useKV<string[]>("liked-posts", [])
  const [bookmarkedPosts, setBookmarkedPosts] = useKV<string[]>("bookmarked-posts", [])

  // Simple translation helper
  const getText = (key: string, fallback: string) => {
    const translations: Record<string, Record<string, string>> = {
      'blog.search': {
        'en': 'Search articles...',
        'de': 'Artikel suchen...',
        'zh': '搜索文章...'
      },
      'blog.category': {
        'en': 'Category',
        'de': 'Kategorie', 
        'zh': '分类'
      },
      'blog.allCategories': {
        'en': 'All Categories',
        'de': 'Alle Kategorien',
        'zh': '所有分类'
      },
      'blog.language': {
        'en': 'Language',
        'de': 'Sprache',
        'zh': '语言'
      },
      'blog.allLanguages': {
        'en': 'All Languages',
        'de': 'Alle Sprachen',
        'zh': '所有语言'
      },
      'blog.featured': {
        'en': 'Featured',
        'de': 'Hervorgehoben',
        'zh': '精选'
      },
      'blog.readMore': {
        'en': 'Read More',
        'de': 'Mehr lesen',
        'zh': '阅读更多'
      },
      'blog.latest': {
        'en': 'Latest Articles',
        'de': 'Neueste Artikel',
        'zh': '最新文章'
      },
      'blog.popular': {
        'en': 'Popular',
        'de': 'Beliebt',
        'zh': '热门'
      },
      'blog.bookmarks': {
        'en': 'Bookmarks',
        'de': 'Lesezeichen',
        'zh': '书签'
      },
      'blog.trending': {
        'en': 'Trending Articles',
        'de': 'Trending Artikel',
        'zh': '热门文章'
      },
      'blog.read': {
        'en': 'Read',
        'de': 'Lesen',
        'zh': '阅读'
      },
      'blog.readArticle': {
        'en': 'Read Article',
        'de': 'Artikel lesen',
        'zh': '阅读文章'
      },
      'blog.readSaved': {
        'en': 'Read Saved Article',
        'de': 'Gespeicherten Artikel lesen',
        'zh': '阅读保存的文章'
      },
      'blog.noBookmarks': {
        'en': 'No bookmarks yet',
        'de': 'Noch keine Lesezeichen',
        'zh': '暂无书签'
      },
      'blog.startBookmarking': {
        'en': 'Start bookmarking articles you want to read later',
        'de': 'Beginnen Sie mit dem Markieren von Artikeln, die Sie später lesen möchten',
        'zh': '开始收藏你想稍后阅读的文章'
      }
    }
    
    return translations[key]?.[language] || fallback
  }

  const [blogPosts] = useKV<BlogPost[]>("blog-posts", [
    {
      id: "1",
      title: "Medizinprodukte zwischen Europa und China: Regulatorische Compliance",
      slug: "medizinprodukte-europa-china-compliance",
      content: `Als Brücke zwischen Europa und China spielt Goodlink Germany eine entscheidende Rolle bei der Navigation komplexer Regulierungslandschaften für Medizinprodukte.

## MDR-Compliance für chinesische Hersteller

### CE-Kennzeichnung und Notified Bodies
Die Medical Device Regulation (MDR) erfordert strenge Konformitätsbewertungen. Unsere Expertise hilft chinesischen Herstellern bei:
- Auswahl der richtigen Notified Body
- Technische Dokumentation nach MDR
- Klinische Bewertungen und Post-Market Surveillance

### Qualitätsmanagement-Systeme
ISO 13485 Zertifizierung ist essentiell für den EU-Marktzugang:
- Implementierung von QM-Systemen
- Risikomanagement nach ISO 14971
- Biokompatibilitätsprüfungen

## Unsere Standorte und Expertise

Mit Büros in Shenzhen, Shanghai, Changsha und Hong Kong sowie unserem deutschen Hauptsitz in Köln bieten wir:
- Lokale Unterstützung in China
- EU-Marktexpertise
- Kulturelle Brückenfunktion
- 20 Jahre Erfahrung im Medizinbereich

## Erfolgsgeschichten
Seit 2004 haben wir über 800 Medizinprodukte erfolgreich auf den europäischen Markt gebracht, von einfachen Kabeln bis zu komplexen diagnostischen Geräten.`,
      excerpt: "Wie Goodlink Germany chinesische Medizinprodukt-Hersteller beim EU-Markteintritt unterstützt. 20 Jahre Expertise in Compliance und Qualitätsmanagement.",
      language: 'de',
      status: 'published',
      publishDate: new Date(),
      views: 1247,
      likes: 89,
      comments: 23,
      seoScore: 92,
      keywords: ["Medizinprodukte", "MDR", "CE-Kennzeichnung", "China-Europa", "Compliance"],
      category: "Medical",
      isAIGenerated: true,
      author: "Goodlink Medical Expert",
      readTime: 5
    },
    {
      id: "2",
      title: "Automotive Component Sourcing: Bridging Germany and China",
      slug: "automotive-component-sourcing-germany-china",
      content: `Goodlink Germany's automotive division leverages two decades of experience connecting European OEMs with Chinese suppliers, ensuring quality and compliance across complex supply chains.

## Our Automotive Expertise

### Component Categories
With 600+ automotive components in our portfolio:
- Electric motors and actuators
- Sensors and control units
- Wiring harnesses and connectors
- Mechanical components and castors

### Quality Assurance
Our multi-location presence ensures:
- On-site quality inspections in Shenzhen and Shanghai
- EMC/ROHS compliance testing
- Supplier audits and certification
- Continuous monitoring and improvement

## Strategic Locations

### China Operations
- **Shenzhen**: Electronics and sensors hub
- **Shanghai**: Advanced manufacturing base
- **Hong Kong**: International trade gateway
- **Changsha**: Cost-effective production center

### German Headquarters
Located in Cologne, our European team provides:
- Technical support in German and English
- Local customer service
- Supply chain management
- Regulatory compliance

## Success Metrics
€93M revenue in 2023 demonstrates our ability to deliver value across 500+ B2B partnerships while maintaining the highest quality standards.`,
      excerpt: "Discover how Goodlink Germany's automotive division connects European OEMs with Chinese suppliers through strategic locations and quality assurance.",
      language: 'en',
      status: 'published',
      publishDate: new Date(Date.now() - 86400000),
      views: 892,
      likes: 67,
      comments: 15,
      seoScore: 88,
      keywords: ["Automotive", "Sourcing", "OEM", "Supply Chain", "Germany-China"],
      category: "Automotive",
      isAIGenerated: true,
      author: "Automotive Industry Expert",
      readTime: 7
    },
    {
      id: "3",
      title: "连接器和线束：德中汽车合作的关键组件",
      slug: "lianjieqi-xianshu-dezhong-qiche-hezuo",
      content: `作为始于2004年的专业贸易公司，好联德国在连接器和线束领域拥有深厚的专业知识，为欧洲和中国汽车产业搭建桥梁。

## 我们的产品优势

### 核心产品线
- 汽车连接器：500+变体
- 线束组件：定制化生产
- 电气系统：符合欧标
- 传感器：高精度检测

### 质量保证体系
我们在多个城市的布局确保：
- 深圳：电子元件检测中心
- 上海：先进制造基地
- 香港：国际贸易枢纽
- 长沙：成本优化生产

## 文化桥梁价值

### 专业团队
78名员工分布在四个中国城市，提供：
- 多语言技术支持（德语、英语、中文）
- 本地化服务体验
- 跨文化沟通专长
- 可靠的合作关系

### 合规标准
严格遵循：
- EMC/ROHS欧洲标准
- 汽车行业质量体系
- 环保要求和认证
- 供应链可追溯性

## 市场成就
2023年营收达9300万欧元，反映了我们在建立可靠合作伙伴关系和实现持续增长方面的专业能力。`,
      excerpt: "了解好联德国如何利用20年专业经验，在连接器和线束领域为德中汽车合作提供专业桥梁服务。",
      language: 'zh',
      status: 'published',
      publishDate: new Date(Date.now() - 172800000),
      views: 634,
      likes: 45,
      comments: 12,
      seoScore: 85,
      keywords: ["连接器", "线束", "汽车", "德中合作", "质量保证"],
      category: "Automotive",
      isAIGenerated: true,
      author: "汽车行业专家",
      readTime: 6
    },
    {
      id: "4",
      title: "20 Jahre Goodlink: Von Kabeln zu komplexen Systemlösungen",
      slug: "20-jahre-goodlink-kabel-systemloesungen",
      content: `Die Entwicklung von Goodlink China seit 2004 spiegelt die Transformation der deutsch-chinesischen Handelsbeziehungen wider. Was als Kabel- und Steckverbinder-Geschäft begann, ist heute ein umfassendes Netzwerk für Medizin- und Automobiltechnik.

## Unternehmensevolution

### Die Anfänge (2004-2010)
- Fokus auf Kabel und Steckverbinder
- Aufbau des Lieferantennetzwerks in Shenzhen
- Erste Automotive-Partnerschaften

### Expansion (2010-2020)
- Medizintechnik-Division
- Shanghai und Changsha Standorte
- Erweiterte Produktpalette: Motoren, Rollen, Sensoren

### Goodlink Germany (2020-heute)
- Europäische Tochtergesellschaft in Köln
- Deutsche Anteilseigner und Management
- B2B-Plattform für 500+ Partner

## Kulturelle Brückenfunktion

### Unsere Philosophie
- Persönliche Beziehungen als Geschäftsbasis
- Realistische und ehrliche Kommunikation
- Bewusstsein für kulturelle Unterschiede
- Brücken bauen zwischen den Kulturen

### Team-Stärke
78 Mitarbeiter in vier chinesischen Städten, vereint durch:
- Gemeinsame Werte
- Qualitätsbewusstsein
- Kundenorientierung
- Langfristige Partnerschaften

## Zukunftsausblick
Mit der digitalen Transformation und neuen Technologien wie E-Mobilität und Medizin 4.0 positioniert sich Goodlink als Innovationspartner für die nächsten 20 Jahre.`,
      excerpt: "Die 20-jährige Erfolgsgeschichte von Goodlink: Von einfachen Kabeln zu komplexen Medizin- und Automotive-Lösungen zwischen Deutschland und China.",
      language: 'de',
      status: 'published',
      publishDate: new Date(Date.now() - 259200000),
      views: 1156,
      likes: 78,
      comments: 34,
      seoScore: 90,
      keywords: ["Goodlink", "20 Jahre", "Deutschland-China", "Unternehmensentwicklung", "Automotive"],
      category: "Company",
      isAIGenerated: true,
      author: "Goodlink Management",
      readTime: 8
    },
    {
      id: "5",
      title: "Medical Device Innovation: China-Europe Technology Transfer",
      slug: "medical-device-innovation-china-europe-transfer",
      content: `The medical technology landscape between China and Europe is rapidly evolving. Goodlink Germany facilitates crucial technology transfers while ensuring regulatory compliance and quality standards.

## Innovation Corridors

### Shenzhen Medical Tech Hub
Our Shenzhen Good-Link Medical Tech division specializes in:
- Diagnostic equipment components
- Therapeutic device assemblies
- Digital health connectors
- Biocompatible materials

### Shanghai Advanced Manufacturing
Shanghai Good-Link Medical Tech focuses on:
- Precision manufacturing
- Quality control systems
- Regulatory documentation
- Clinical trial support

## Technology Transfer Excellence

### Compliance Framework
- EU MDR interpretation for Chinese manufacturers
- FDA pathway consultation
- Quality system implementation
- Post-market surveillance setup

### Innovation Support
- R&D collaboration facilitation
- IP protection strategies
- Market entry planning
- Partnership development

## Our Warehouses Network
Strategic inventory management across:
- **Shenzhen**: Components and sub-assemblies
- **Shanghai**: Finished medical devices
- **Hong Kong**: International distribution hub

## Success Stories
Over 800 medical components successfully launched in European markets, from simple connectors to complex diagnostic systems, maintaining a 98% compliance rate.`,
      excerpt: "How Goodlink Germany facilitates medical device innovation and technology transfer between China and Europe while ensuring regulatory compliance.",
      language: 'en',
      status: 'published',
      publishDate: new Date(Date.now() - 345600000),
      views: 723,
      likes: 56,
      comments: 19,
      seoScore: 87,
      keywords: ["Medical Innovation", "Technology Transfer", "China-Europe", "Regulatory", "Compliance"],
      category: "Medical",
      isAIGenerated: true,
      author: "Medical Technology Expert",
      readTime: 6
    },
    {
      id: "6",
      title: "供应链优化：好联德国的物流网络战略",
      slug: "gongyinglian-youhua-haoliandeguo-wuliu-wangluo",
      content: `作为连接中欧的桥梁，好联德国构建了覆盖深圳、上海、香港三地的仓储物流网络，为汽车和医疗设备行业提供高效供应链解决方案。

## 仓储网络布局

### 深圳仓储中心
- 电子元件和连接器
- 汽车传感器和执行器
- 医疗设备组件
- 快速响应华南市场

### 上海物流枢纽
- 完整产品组装
- 质量检测中心
- 欧洲出口准备
- 长三角地区覆盖

### 香港国际港口
- 国际贸易便利
- 免税仓储服务
- 全球物流协调
- 金融服务支持

## 供应链创新

### 数字化管理
- 实时库存监控
- 预测性补货
- 质量追溯系统
- 合规性文档管理

### 合作伙伴网络
- 500+ B2B合作伙伴
- 2000+ 产品组件
- 多元化供应商基础
- 风险分散策略

## 质量保证

### 检测标准
- CE/EMC/ROHS认证
- ISO 13485医疗器械标准
- 汽车行业IATF 16949
- 持续改进机制

## 成就指标
2023年9300万欧元营收证明了我们供应链网络的效率和可靠性，为客户创造持续价值。`,
      excerpt: "深入了解好联德国如何通过三地仓储网络优化供应链，为中欧贸易提供高效物流解决方案。",
      language: 'zh',
      status: 'published',
      publishDate: new Date(Date.now() - 432000000),
      views: 567,
      likes: 42,
      comments: 16,
      seoScore: 84,
      keywords: ["供应链", "物流网络", "仓储管理", "中欧贸易", "质量保证"],
      category: "Logistics",
      isAIGenerated: true,
      author: "供应链专家",
      readTime: 7
    }
  ])

  // Filter posts based on search, category, and language
  const filteredPosts = blogPosts?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || post.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesLanguage = selectedLanguage === "all" || post.language === selectedLanguage
    const isPublished = post.status === 'published'
    
    return matchesSearch && matchesCategory && matchesLanguage && isPublished
  }) || []

  const handleLikePost = (postId: string) => {
    const isLiked = likedPosts?.includes(postId)
    if (isLiked) {
      setLikedPosts((current) => current?.filter(id => id !== postId) || [])
    } else {
      setLikedPosts((current) => [...(current || []), postId])
    }
  }

  const handleBookmarkPost = (postId: string) => {
    const isBookmarked = bookmarkedPosts?.includes(postId)
    if (isBookmarked) {
      setBookmarkedPosts((current) => current?.filter(id => id !== postId) || [])
    } else {
      setBookmarkedPosts((current) => [...(current || []), postId])
    }
  }

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'en': return '🇺🇸'
      case 'de': return '🇩🇪'
      case 'zh': return '🇨🇳'
      default: return '🌐'
    }
  }

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'en': return 'English'
      case 'de': return 'Deutsch'
      case 'zh': return '中文'
      default: return lang
    }
  }

  const categories = Array.from(new Set(blogPosts?.map(post => post.category) || []))
  const languages = Array.from(new Set(blogPosts?.map(post => post.language) || []))

  const featuredPost = filteredPosts[0]
  const recentPosts = filteredPosts.slice(1, 4)
  const popularPosts = filteredPosts.slice().sort((a, b) => b.views - a.views).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-xl border border-border/50">
            <div className="text-center">
              <div className="text-sm font-bold text-slate-800">
                GL
              </div>
            </div>
          </div>
          <Article className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">
          {language === 'de' ? 'Goodlink Wissenszentrum' : language === 'zh' ? 'Goodlink 知识中心' : 'Goodlink Knowledge Hub'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'de' ? 'Entdecken Sie Einblicke in Medizintechnik, Automotive-Komponenten und deutsch-chinesische Handelsbeziehungen' : 
           language === 'zh' ? '探索医疗技术、汽车零部件和中德贸易关系的专业洞察' : 
           'Discover insights in medical technology, automotive components, and Germany-China trade relations'}
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={getText('blog.search', 'Search articles...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder={getText('blog.category', 'Category')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getText('blog.allCategories', 'All Categories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category === 'Medical' && '🏥'} 
                    {category === 'Automotive' && '🚗'} 
                    {category === 'Company' && '🏢'} 
                    {category === 'Logistics' && '📦'} 
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder={getText('blog.language', 'Language')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{getText('blog.allLanguages', 'All Languages')}</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>
                    <span className="flex items-center gap-2">
                      <span>{getLanguageFlag(lang)}</span>
                      {getLanguageName(lang)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="latest" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="latest">{getText('blog.latest', 'Latest Articles')}</TabsTrigger>
          <TabsTrigger value="popular">{getText('blog.popular', 'Popular')}</TabsTrigger>
          <TabsTrigger value="bookmarks">{getText('blog.bookmarks', 'Bookmarks')}</TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="space-y-6">
          {featuredPost && (
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {getText('blog.featured', 'Featured')}
                    </Badge>
                    <span className="text-lg">{getLanguageFlag(featuredPost.language)}</span>
                    <Badge variant="outline">{featuredPost.category}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime} min read
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {featuredPost.views}
                      </div>
                    </div>
                    <Button>
                      {getText('blog.readMore', 'Read More')}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-accent/20 p-6 flex items-center justify-center">
                  <Article className="h-24 w-24 text-primary/50" />
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getLanguageFlag(post.language)}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleBookmarkPost(post.id)}
                      className={bookmarkedPosts?.includes(post.id) ? "text-yellow-600" : ""}
                    >
                      <BookmarkSimple className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}m
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLikePost(post.id)}
                        className={likedPosts?.includes(post.id) ? "text-red-600" : ""}
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ChatCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ShareNetwork className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="outline">
                      {getText('blog.read', 'Read')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendUp className="h-5 w-5" />
            <h3 className="text-lg font-semibold">{getText('blog.trending', 'Trending Articles')}</h3>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularPosts.map((post, index) => (
              <Card key={post.id} className="relative">
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  #{index + 1}
                </div>
                <CardHeader className="pt-12 pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getLanguageFlag(post.language)}</span>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes} likes
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    {getText('blog.readArticle', 'Read Article')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="space-y-6">
          {bookmarkedPosts && bookmarkedPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts?.filter(post => bookmarkedPosts.includes(post.id)).map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getLanguageFlag(post.language)}</span>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleBookmarkPost(post.id)}
                        className="text-yellow-600"
                      >
                        <BookmarkSimple className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      {getText('blog.readSaved', 'Read Saved Article')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BookmarkSimple className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {getText('blog.noBookmarks', 'No bookmarks yet')}
                </h3>
                <p className="text-muted-foreground">
                  {getText('blog.startBookmarking', 'Start bookmarking articles you want to read later')}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}