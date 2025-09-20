import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/LanguageContext"
import goodlinkLogo from "@/assets/images/goodlink-logo.svg"
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
      title: "Die Zukunft des E-Commerce: KI-gesteuerte Lösungen",
      slug: "zukunft-ecommerce-ki-loesungen",
      content: `Der E-Commerce-Sektor erlebt eine Revolution durch künstliche Intelligenz. Von automatisierten Kundenbetreuung bis hin zu personalisierten Produktempfehlungen - KI transformiert die Art, wie wir online einkaufen und verkaufen.

## Hauptvorteile von KI im E-Commerce

### 1. Personalisierte Kundenerfahrung
KI-Algorithmen analysieren das Kundenverhalten und bieten maßgeschneiderte Produktvorschläge, die die Conversion-Rate erheblich steigern können.

### 2. Automatisierte Kundenbetreuung
Chatbots und virtuelle Assistenten können 24/7 Kundenfragen beantworten und einfache Probleme lösen, wodurch die Kundenzufriedenheit steigt.

### 3. Optimierte Preisgestaltung
Dynamische Preisalgorithmen helfen dabei, Preise basierend auf Nachfrage, Konkurrenz und anderen Marktfaktoren anzupassen.

## Implementierung in der Praxis

Erfolgreiche E-Commerce-Unternehmen nutzen KI bereits in verschiedenen Bereichen:
- Produktempfehlungen
- Bestandsmanagement  
- Betrugsbekämpfung
- Content-Generierung
- Kundensegmentierung

Die Zukunft des E-Commerce liegt in der intelligenten Automatisierung, die menschliche Intuition mit maschineller Präzision kombiniert.`,
      excerpt: "Entdecken Sie, wie künstliche Intelligenz den Online-Handel transformiert und welche Vorteile KI-gesteuerte Lösungen für E-Commerce-Unternehmen bieten.",
      language: 'de',
      status: 'published',
      publishDate: new Date(),
      views: 1247,
      likes: 89,
      comments: 23,
      seoScore: 92,
      keywords: ["E-Commerce", "KI", "Online-Handel", "Automatisierung", "Digitalisierung"],
      category: "Technology",
      isAIGenerated: true,
      author: "AI Content Generator",
      readTime: 5
    },
    {
      id: "2",
      title: "The Future of Cross-Border E-Commerce",
      slug: "future-cross-border-ecommerce",
      content: `Global e-commerce is expanding rapidly, with cross-border online sales expected to reach $4.8 trillion by 2026. This growth presents both opportunities and challenges for businesses looking to expand internationally.

## Key Trends Shaping Cross-Border Commerce

### 1. Mobile-First Approach
With mobile commerce accounting for over 70% of online purchases in many markets, optimizing for mobile is crucial for international success.

### 2. Localization Beyond Translation
Success requires understanding local cultures, payment preferences, and shopping behaviors, not just translating content.

### 3. Logistics Innovation
Advanced fulfillment networks and partnerships are making international shipping faster and more affordable.

## Overcoming Common Challenges

### Regulatory Compliance
- Understanding local tax requirements
- Meeting consumer protection laws
- Handling data privacy regulations like GDPR

### Payment Processing
- Offering local payment methods
- Managing currency conversions
- Ensuring secure transactions

### Customer Trust
- Building credibility in new markets
- Providing local customer support
- Handling returns and disputes effectively

The businesses that succeed in cross-border e-commerce are those that combine global scalability with local relevance.`,
      excerpt: "Explore emerging trends in international online marketplace strategies and learn how to navigate the complexities of cross-border e-commerce.",
      language: 'en',
      status: 'published',
      publishDate: new Date(Date.now() - 86400000),
      views: 892,
      likes: 67,
      comments: 15,
      seoScore: 88,
      keywords: ["Cross-border", "International", "Marketplace", "Global Trade", "E-commerce"],
      category: "Business",
      isAIGenerated: true,
      author: "Global Commerce Expert",
      readTime: 7
    },
    {
      id: "3",
      title: "跨境电商的人工智能解决方案",
      slug: "kuajing-dianshang-ai-jiejuefangan",
      content: `人工智能正在改变跨境电商的运营方式。从智能翻译到动态定价，AI技术帮助企业更好地服务全球客户。

## AI在跨境电商中的应用

### 1. 智能翻译与本地化
- 实时内容翻译
- 文化适应性调整
- 多语言客户服务

### 2. 智能定价策略
- 根据市场需求调整价格
- 竞争对手价格监控
- 汇率波动优化

### 3. 客户行为分析
- 购买模式识别
- 个性化推荐
- 客户生命周期管理

## 技术实施要点

成功的跨境电商AI系统需要：
- 多语言数据处理能力
- 实时市场分析
- 文化敏感性算法
- 合规性检查机制

通过合理运用AI技术，跨境电商企业可以在激烈的国际竞争中获得显著优势。`,
      excerpt: "了解AI如何优化国际电商业务流程，提升跨境贸易效率。",
      language: 'zh',
      status: 'published',
      publishDate: new Date(Date.now() - 172800000),
      views: 634,
      likes: 45,
      comments: 12,
      seoScore: 85,
      keywords: ["跨境电商", "人工智能", "自动化", "优化", "国际贸易"],
      category: "Technology",
      isAIGenerated: true,
      author: "技术专家",
      readTime: 6
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
            <img 
              src={goodlinkLogo} 
              alt="Goodlink Germany" 
              className="h-8 w-auto"
            />
          </div>
          <Article className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">
          {language === 'de' ? 'Wissenszentrum' : language === 'zh' ? '知识中心' : 'Knowledge Hub'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'de' ? 'Entdecken Sie Einblicke, Trends und bewährte Praktiken in E-Commerce, KI und internationalem Handel' : 
           language === 'zh' ? '探索电商、人工智能和国际贸易的洞察、趋势和最佳实践' : 
           'Discover insights, trends, and best practices in e-commerce, AI, and international trade'}
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