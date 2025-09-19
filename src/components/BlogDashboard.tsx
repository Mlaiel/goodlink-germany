import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Article,
  Robot,
  TrendUp,
  Eye,
  Heart,
  ChatCircle,
  Globe,
  MagnifyingGlass,
  Lightning,
  CheckCircle,
  Clock,
  Plus,
  PencilSimple,
  Trash,
  Share,
  Target,
  Translate
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
}

interface SEOMetrics {
  organicTraffic: number
  searchRankings: number
  backlinks: number
  domainAuthority: number
}

interface ContentIdea {
  id: string
  title: string
  description: string
  keywords: string[]
  difficulty: 'low' | 'medium' | 'high'
  potential: number
  language: string
  category: string
}

export function BlogDashboard() {
  const [autoPublish, setAutoPublish] = useKV<boolean>("blog-auto-publish", true)
  const [seoOptimization, setSeoOptimization] = useKV<boolean>("blog-seo-optimization", true)
  const [multilingualContent, setMultilingualContent] = useKV<boolean>("blog-multilingual", true)
  
  const [blogPosts] = useKV<BlogPost[]>("blog-posts", [
    {
      id: "1",
      title: "Die Zukunft des E-Commerce: KI-gesteuerte Lösungen",
      slug: "zukunft-ecommerce-ki-loesungen",
      content: "Der E-Commerce-Sektor erlebt eine Revolution...",
      excerpt: "Entdecken Sie, wie künstliche Intelligenz den Online-Handel transformiert",
      language: 'de',
      status: 'published',
      publishDate: new Date(),
      views: 1247,
      likes: 89,
      comments: 23,
      seoScore: 92,
      keywords: ["E-Commerce", "KI", "Online-Handel", "Automatisierung"],
      category: "Technology",
      isAIGenerated: true
    },
    {
      id: "2",
      title: "The Future of Cross-Border E-Commerce",
      slug: "future-cross-border-ecommerce",
      content: "Global e-commerce is expanding rapidly...",
      excerpt: "Explore emerging trends in international online marketplace strategies",
      language: 'en',
      status: 'published',
      publishDate: new Date(Date.now() - 86400000),
      views: 892,
      likes: 67,
      comments: 15,
      seoScore: 88,
      keywords: ["Cross-border", "International", "Marketplace", "Global Trade"],
      category: "Business",
      isAIGenerated: true
    },
    {
      id: "3",
      title: "跨境电商的人工智能解决方案",
      slug: "kuajing-dianshang-ai-jiejuefangan",
      content: "人工智能正在改变跨境电商的运营方式...",
      excerpt: "了解AI如何优化国际电商业务流程",
      language: 'zh',
      status: 'draft',
      publishDate: new Date(Date.now() + 86400000),
      views: 0,
      likes: 0,
      comments: 0,
      seoScore: 85,
      keywords: ["跨境电商", "人工智能", "自动化", "优化"],
      category: "Technology",
      isAIGenerated: true
    }
  ])

  const [contentIdeas] = useKV<ContentIdea[]>("blog-content-ideas", [
    {
      id: "1",
      title: "Amazon FBA vs. Self-Fulfillment: Complete Guide",
      description: "Comprehensive comparison of fulfillment strategies for e-commerce businesses",
      keywords: ["Amazon FBA", "Fulfillment", "Logistics", "E-commerce"],
      difficulty: 'medium',
      potential: 85,
      language: 'en',
      category: "Logistics"
    },
    {
      id: "2",
      title: "DSGVO-konforme Kundendatenverarbeitung im E-Commerce",
      description: "Rechtssichere Handhabung von Kundendaten nach europäischem Datenschutzrecht",
      keywords: ["DSGVO", "Datenschutz", "E-Commerce", "Compliance"],
      difficulty: 'high',
      potential: 92,
      language: 'de',
      category: "Legal"
    },
    {
      id: "3",
      title: "欧洲市场进入策略：合规性与本地化",
      description: "中国企业进入欧洲电商市场的完整指南",
      keywords: ["欧洲市场", "合规性", "本地化", "跨境电商"],
      difficulty: 'high',
      potential: 88,
      language: 'zh',
      category: "Strategy"
    }
  ])

  const [seoMetrics] = useKV<SEOMetrics>("blog-seo-metrics", {
    organicTraffic: 12450,
    searchRankings: 247,
    backlinks: 156,
    domainAuthority: 34
  })

  const handleGenerateContent = async (ideaId: string) => {
    const idea = contentIdeas?.find(i => i.id === ideaId)
    if (!idea) return

    toast.info(`Generating content for: ${idea.title}`)
    
    // Simulate AI content generation
    setTimeout(() => {
      toast.success("AI content generation completed!")
    }, 5000)
  }

  const handlePublishPost = async (postId: string) => {
    toast.info("Publishing blog post...")
    setTimeout(() => {
      toast.success("Blog post published successfully!")
    }, 2000)
  }

  const handleSEOOptimization = async (postId: string) => {
    toast.info("Optimizing content for SEO...")
    setTimeout(() => {
      toast.success("SEO optimization completed!")
    }, 3000)
  }

  const getBlogMetrics = () => {
    const totalPosts = blogPosts?.length || 0
    const publishedPosts = blogPosts?.filter(p => p.status === 'published').length || 0
    const draftPosts = blogPosts?.filter(p => p.status === 'draft').length || 0
    const totalViews = blogPosts?.reduce((sum, post) => sum + post.views, 0) || 0
    const totalLikes = blogPosts?.reduce((sum, post) => sum + post.likes, 0) || 0
    const avgSeoScore = totalPosts > 0 ? (blogPosts?.reduce((sum, post) => sum + post.seoScore, 0) || 0) / totalPosts : 0

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      totalLikes,
      avgSeoScore
    }
  }

  const metrics = getBlogMetrics()

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'en': return '🇺🇸'
      case 'de': return '🇩🇪'
      case 'zh': return '🇨🇳'
      default: return '🌐'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200'
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Article className="h-6 w-6" />
            AI-Powered Content Marketing
          </h2>
          <p className="text-muted-foreground">Multilingual SEO blog with automated content generation</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
          <Button>
            <Robot className="h-4 w-4 mr-2" />
            Generate Content
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Article className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.publishedPosts} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              Likes and shares
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
            <MagnifyingGlass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.avgSeoScore)}</div>
            <p className="text-xs text-muted-foreground">
              Average SEO score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoMetrics?.organicTraffic.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Monthly visitors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domain Authority</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{seoMetrics?.domainAuthority}</div>
            <p className="text-xs text-muted-foreground">
              DA Score
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="ideas">Content Ideas</TabsTrigger>
          <TabsTrigger value="seo">SEO Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Published Content</h3>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-green-50">
                {metrics.publishedPosts} Published
              </Badge>
              <Badge variant="outline" className="bg-yellow-50">
                {metrics.draftPosts} Drafts
              </Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts?.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getLanguageFlag(post.language)}</span>
                        <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                          {post.status}
                        </Badge>
                        {post.isAIGenerated && (
                          <Badge variant="outline" className="text-xs">
                            <Robot className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base line-clamp-2">{post.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span className="text-sm font-medium">{post.views}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span className="text-sm font-medium">{post.likes}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1">
                        <ChatCircle className="h-3 w-3" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Comments</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>SEO Score</span>
                      <span className="font-medium">{post.seoScore}/100</span>
                    </div>
                    <Progress value={post.seoScore} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {post.keywords.slice(0, 2).map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {post.keywords.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.keywords.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="flex-1">
                      <PencilSimple className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {post.status === 'published' ? (
                      <Button size="sm" variant="outline">
                        <Share className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handlePublishPost(post.id)}>
                        Publish
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleSEOOptimization(post.id)}>
                      <MagnifyingGlass className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI-Generated Content Ideas</h3>
            <Button>
              <Lightning className="h-4 w-4 mr-2" />
              Generate Ideas
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contentIdeas?.map((idea) => (
              <Card key={idea.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getLanguageFlag(idea.language)}</span>
                        <Badge className={`text-xs ${getDifficultyColor(idea.difficulty)}`}>
                          {idea.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-base line-clamp-2">{idea.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">{idea.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Potential Score</span>
                      <span className="font-medium">{idea.potential}/100</span>
                    </div>
                    <Progress value={idea.potential} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {idea.keywords.slice(0, 3).map((keyword) => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => handleGenerateContent(idea.id)}
                    >
                      <Robot className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <h3 className="text-lg font-semibold">SEO Performance</h3>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Organic Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoMetrics?.organicTraffic.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Monthly visitors</p>
                <div className="mt-2">
                  <Badge className="bg-green-100 text-green-800">+25% vs last month</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Search Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoMetrics?.searchRankings}</div>
                <p className="text-sm text-muted-foreground">Keywords ranking</p>
                <div className="mt-2">
                  <Badge className="bg-blue-100 text-blue-800">43 in top 10</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Backlinks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoMetrics?.backlinks}</div>
                <p className="text-sm text-muted-foreground">Quality backlinks</p>
                <div className="mt-2">
                  <Badge className="bg-purple-100 text-purple-800">+12 this month</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Domain Authority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoMetrics?.domainAuthority}</div>
                <p className="text-sm text-muted-foreground">Moz DA Score</p>
                <div className="mt-2">
                  <Badge className="bg-orange-100 text-orange-800">+3 improvement</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Blog posts driving the most organic traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blogPosts?.filter(p => p.status === 'published').sort((a, b) => b.views - a.views).slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getLanguageFlag(post.language)}</span>
                        <span className="font-medium">{post.title}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.views} views</span>
                        <span>SEO: {post.seoScore}/100</span>
                        <span>{post.keywords.join(", ")}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">#{1}</div>
                      <div className="text-xs text-muted-foreground">Ranking</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Content Generation Settings</CardTitle>
                <CardDescription>Configure AI-powered content creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Publish Generated Content</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically publish AI-generated posts after review
                    </p>
                  </div>
                  <Switch
                    checked={autoPublish}
                    onCheckedChange={setAutoPublish}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SEO Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize content for search engines
                    </p>
                  </div>
                  <Switch
                    checked={seoOptimization}
                    onCheckedChange={setSeoOptimization}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Multilingual Content</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate content in multiple languages (EN/DE/ZH)
                    </p>
                  </div>
                  <Switch
                    checked={multilingualContent}
                    onCheckedChange={setMultilingualContent}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing Schedule</CardTitle>
                <CardDescription>Configure automatic content publishing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Publishing Frequency</Label>
                  <Input defaultValue="3 times per week" />
                  <p className="text-sm text-muted-foreground">
                    How often to publish new AI-generated content
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Target Keywords Per Post</Label>
                  <Input defaultValue="5-8" />
                  <p className="text-sm text-muted-foreground">
                    Number of target keywords for SEO optimization
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Content Length</Label>
                  <Input defaultValue="1500-2500 words" />
                  <p className="text-sm text-muted-foreground">
                    Target word count for blog posts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Content Preferences</CardTitle>
              <CardDescription>Configure AI writing style and content focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Writing Style</Label>
                  <Input defaultValue="Professional, informative, engaging" />
                  <p className="text-sm text-muted-foreground">
                    Describe the desired tone and style for AI-generated content
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Content Categories</Label>
                  <Textarea 
                    defaultValue="E-commerce strategies, AI in business, Cross-border trade, Marketplace optimization, Customer experience, Technology trends"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">
                    Topics the AI should focus on when generating content ideas
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Textarea 
                    defaultValue="E-commerce business owners, Online marketplace sellers, Digital marketing professionals, International trade companies"
                    rows={2}
                  />
                  <p className="text-sm text-muted-foreground">
                    Define the primary audience for content targeting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}