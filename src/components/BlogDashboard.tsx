import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { 
  PencilSimple, 
  Robot, 
  Eye, 
  TrendUp, 
  Globe, 
  Calendar,
  Plus,
  Lightning,
  CheckCircle,
  Warning,
  Clock,
  Target,
  ChartLine
} from "@phosphor-icons/react"

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  status: 'draft' | 'published' | 'scheduled'
  language: 'en' | 'de' | 'zh'
  keywords: string[]
  seoScore: number
  views: number
  publishedAt?: string
  scheduledAt?: string
  aiGenerated: boolean
  category: string
}

interface BlogAnalytics {
  totalViews: number
  totalPosts: number
  avgSeoScore: number
  topKeywords: string[]
  performingPosts: BlogPost[]
}

export function BlogDashboard() {
  const [posts, setPosts] = useKV<BlogPost[]>("blog-posts", [
    {
      id: "1",
      title: "Amazon FBA Success Strategies for German Sellers",
      slug: "amazon-fba-success-strategies-german-sellers",
      content: "Complete guide to succeeding with Amazon FBA in the German market...",
      excerpt: "Learn the top strategies for German sellers to maximize their Amazon FBA success rate and revenue.",
      status: "published",
      language: "de",
      keywords: ["Amazon FBA", "German market", "e-commerce", "selling strategies"],
      seoScore: 92,
      views: 1247,
      publishedAt: "2024-01-15",
      aiGenerated: true,
      category: "E-commerce"
    },
    {
      id: "2", 
      title: "Multi-Marketplace Inventory Management Best Practices",
      slug: "multi-marketplace-inventory-management",
      content: "How to efficiently manage inventory across multiple sales channels...",
      excerpt: "Master the art of inventory management across Amazon, eBay, OTTO and other European marketplaces.",
      status: "published",
      language: "en",
      keywords: ["inventory management", "multi-marketplace", "stock optimization"],
      seoScore: 88,
      views: 892,
      publishedAt: "2024-01-10",
      aiGenerated: false,
      category: "Operations"
    },
    {
      id: "3",
      title: "AI-Powered Product Listing Optimization",
      slug: "ai-powered-product-listing-optimization",
      content: "Leverage AI to create compelling product listings that convert...",
      excerpt: "Discover how AI can revolutionize your product listings and boost conversion rates.",
      status: "draft",
      language: "en",
      keywords: ["AI optimization", "product listings", "conversion rate"],
      seoScore: 76,
      views: 0,
      aiGenerated: true,
      category: "Technology"
    }
  ])

  const [analytics] = useKV<BlogAnalytics>("blog-analytics", {
    totalViews: 2139,
    totalPosts: 3,
    avgSeoScore: 85,
    topKeywords: ["Amazon FBA", "e-commerce", "inventory management", "AI optimization"],
    performingPosts: posts?.slice(0, 2) || []
  })

  const [isCreating, setIsCreating] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: "",
    content: "",
    excerpt: "",
    language: "en",
    keywords: [],
    category: "E-commerce"
  })

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error("Please fill in title and content")
      return
    }

    const post: BlogPost = {
      id: Date.now().toString(),
      title: newPost.title!,
      slug: newPost.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: newPost.content!,
      excerpt: newPost.excerpt || newPost.content!.substring(0, 150) + "...",
      status: "draft",
      language: newPost.language as any || "en",
      keywords: newPost.keywords || [],
      seoScore: Math.floor(Math.random() * 30) + 70, // Simulate SEO scoring
      views: 0,
      aiGenerated: false,
      category: newPost.category || "E-commerce"
    }

    setPosts(current => [...(current || []), post])
    setNewPost({ title: "", content: "", excerpt: "", language: "en", keywords: [], category: "E-commerce" })
    setIsCreating(false)
    toast.success("Blog post created successfully!")
  }

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const prompt = (window as any).spark.llmPrompt`Generate a comprehensive blog post about e-commerce trends in Germany for 2024. Include SEO-optimized title, content, and meta description. Focus on practical insights for online sellers.`
      const result = await (window as any).spark.llm(prompt)
      
      const aiPost: BlogPost = {
        id: Date.now().toString(),
        title: "E-commerce Trends in Germany 2024: What Sellers Need to Know",
        slug: "ecommerce-trends-germany-2024",
        content: result,
        excerpt: "Discover the latest e-commerce trends shaping the German market in 2024 and how to leverage them for business growth.",
        status: "draft",
        language: "de",
        keywords: ["e-commerce trends", "Germany 2024", "online selling", "market insights"],
        seoScore: 94,
        views: 0,
        aiGenerated: true,
        category: "Market Analysis"
      }

      setPosts(current => [...(current || []), aiPost])
      toast.success("AI-generated blog post created!")
    } catch (error) {
      toast.error("Failed to generate AI content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = (id: string) => {
    setPosts(current => 
      current?.map(post => 
        post.id === id 
          ? { ...post, status: "published" as const, publishedAt: new Date().toISOString().split('T')[0] }
          : post
      ) || []
    )
    toast.success("Post published successfully!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'default'
      case 'draft': return 'secondary'
      case 'scheduled': return 'outline'
      default: return 'secondary'
    }
  }

  const getSeoScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Create and manage SEO-optimized content</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleAIGenerate} 
            disabled={isGenerating}
            variant="outline"
          >
            <Robot className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "AI Generate"}
          </Button>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>
                  Write a new blog post or let AI help you generate content
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter blog post title..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={newPost.language} onValueChange={(value) => setNewPost(prev => ({ ...prev, language: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newPost.category} onValueChange={(value) => setNewPost(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                        <SelectItem value="Tutorials">Tutorials</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your blog post content here..."
                    rows={8}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost}>
                    Create Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
            <PencilSimple className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts?.filter(p => p.status === 'published').length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {posts?.filter(p => p.status === 'draft').length || 0} drafts pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
            <TrendUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.avgSeoScore}%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Generated</CardTitle>
            <Robot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts?.filter(p => p.aiGenerated).length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(((posts?.filter(p => p.aiGenerated).length || 0) / (posts?.length || 1)) * 100)}% of total posts
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">All Posts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {/* Posts List */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>Manage your blog content and SEO performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts?.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{post.title}</h3>
                        <Badge variant={getStatusColor(post.status)}>
                          {post.status === 'published' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {post.status === 'draft' && <Clock className="h-3 w-3 mr-1" />}
                          {post.status === 'scheduled' && <Calendar className="h-3 w-3 mr-1" />}
                          {post.status}
                        </Badge>
                        {post.aiGenerated && (
                          <Badge variant="outline">
                            <Robot className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {post.language.toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className={`h-3 w-3 ${getSeoScoreColor(post.seoScore)}`} />
                          SEO: {post.seoScore}%
                        </span>
                        <span>{post.category}</span>
                        {post.publishedAt && <span>Published: {post.publishedAt}</span>}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.keywords.map((keyword, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <PencilSimple className="h-4 w-4" />
                      </Button>
                      {post.status === 'draft' && (
                        <Button 
                          size="sm" 
                          onClick={() => handlePublish(post.id)}
                        >
                          Publish
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Posts with highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.performingPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span className="text-sm">{post.title}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {post.views} views • SEO: {post.seoScore}%
                        </div>
                      </div>
                      <div className="text-right">
                        <ChartLine className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Performance</CardTitle>
                <CardDescription>Content optimization metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average SEO Score</span>
                      <span className="font-medium">{analytics?.avgSeoScore}%</span>
                    </div>
                    <Progress value={analytics?.avgSeoScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Quality</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Keyword Optimization</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
              <CardDescription>Most used keywords across your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analytics?.topKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}