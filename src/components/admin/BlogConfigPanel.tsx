import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useLanguage } from "@/components/LanguageContext"
import {
  Article,
  Robot,
  Gear,
  Globe,
  Calendar,
  Clock,
  PencilSimple,
  Target,
  TrendUp,
  Eye,
  Share,
  Translate,
  CheckCircle,
  Play,
  Pause,
  Upload,
  Download
} from "@phosphor-icons/react"

interface BlogConfig {
  // Content Generation Settings
  autoPublish: boolean
  seoOptimization: boolean
  multilingualContent: boolean
  contentLanguages: string[]
  
  // Publishing Schedule
  publishingFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly'
  publishingDays: string[]
  publishingTime: string
  maxPostsPerWeek: number
  
  // Content Quality Settings
  targetKeywordsPerPost: number
  minimumWordCount: number
  maximumWordCount: number
  seoScoreThreshold: number
  
  // AI Settings
  writingStyle: string
  contentCategories: string[]
  targetAudience: string
  brandVoice: 'professional' | 'friendly' | 'technical' | 'casual'
  contentTone: 'informative' | 'persuasive' | 'educational' | 'entertaining'
  
  // Advanced Settings
  aiModel: 'gpt-4o' | 'gpt-4o-mini'
  autoTranslation: boolean
  contentModeration: boolean
  plagiarismCheck: boolean
  factChecking: boolean
  
  // SEO & Marketing
  metaDescriptionLength: number
  socialMediaOptimization: boolean
  internalLinking: boolean
  externalLinkLimit: number
  imageOptimization: boolean
  structuredData: boolean
}

export function BlogConfigPanel() {
  const { language } = useLanguage()
  const [config, setConfig] = useKV<BlogConfig>("blog-config", {
    // Content Generation Settings
    autoPublish: false,
    seoOptimization: true,
    multilingualContent: true,
    contentLanguages: ['en', 'de', 'zh'],
    
    // Publishing Schedule
    publishingFrequency: 'weekly',
    publishingDays: ['monday', 'wednesday', 'friday'],
    publishingTime: '09:00',
    maxPostsPerWeek: 5,
    
    // Content Quality Settings
    targetKeywordsPerPost: 6,
    minimumWordCount: 800,
    maximumWordCount: 2500,
    seoScoreThreshold: 80,
    
    // AI Settings
    writingStyle: 'Professional, informative, engaging with industry expertise',
    contentCategories: [
      'E-commerce Strategies',
      'AI in Business',
      'Cross-border Trade',
      'Marketplace Optimization',
      'Customer Experience',
      'Technology Trends',
      'Digital Marketing',
      'Supply Chain Management'
    ],
    targetAudience: 'E-commerce business owners, online marketplace sellers, digital marketing professionals, international trade companies',
    brandVoice: 'professional',
    contentTone: 'informative',
    
    // Advanced Settings
    aiModel: 'gpt-4o',
    autoTranslation: true,
    contentModeration: true,
    plagiarismCheck: true,
    factChecking: true,
    
    // SEO & Marketing
    metaDescriptionLength: 160,
    socialMediaOptimization: true,
    internalLinking: true,
    externalLinkLimit: 3,
    imageOptimization: true,
    structuredData: true
  })

  // Early return if config is not loaded yet
  if (!config) {
    return <div>Loading configuration...</div>
  }

  const updateConfig = (updates: Partial<BlogConfig>) => {
    setConfig(current => {
      if (!current) return { ...config!, ...updates }
      return { ...current, ...updates }
    })
    toast.success("Blog configuration updated")
  }

  const exportConfig = () => {
    if (!config) return
    const configJson = JSON.stringify(config, null, 2)
    const blob = new Blob([configJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'blog-config.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Configuration exported")
  }

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedConfig = JSON.parse(e.target?.result as string)
        setConfig(importedConfig)
        toast.success("Configuration imported successfully")
      } catch (error) {
        toast.error("Invalid configuration file")
      }
    }
    reader.readAsText(file)
  }

  const getText = (key: string, fallback: string) => {
    const translations: Record<string, Record<string, string>> = {
      'config.title': {
        'en': 'Blog Content Configuration',
        'de': 'Blog-Inhalts-Konfiguration',
        'zh': '博客内容配置'
      },
      'config.subtitle': {
        'en': 'Configure AI-powered content generation and publishing settings',
        'de': 'KI-gesteuerte Inhaltsgenerierung und Veröffentlichungseinstellungen konfigurieren',
        'zh': '配置AI驱动的内容生成和发布设置'
      }
    }
    
    return translations[key]?.[language] || fallback
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Article className="h-6 w-6" />
            {getText('config.title', 'Blog Content Configuration')}
          </h2>
          <p className="text-muted-foreground">
            {getText('config.subtitle', 'Configure AI-powered content generation and publishing settings')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportConfig}>
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Import Config
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importConfig}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <Tabs defaultValue="generation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="generation">Content Generation</TabsTrigger>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
          <TabsTrigger value="quality">Quality Control</TabsTrigger>
          <TabsTrigger value="seo">SEO & Marketing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="generation" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Robot className="h-5 w-5" />
                  AI Content Settings
                </CardTitle>
                <CardDescription>Configure how AI generates your blog content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>AI Model</Label>
                  <Select 
                    value={config.aiModel} 
                    onValueChange={(value: 'gpt-4o' | 'gpt-4o-mini') => updateConfig({ aiModel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">
                        GPT-4O (High Quality)
                      </SelectItem>
                      <SelectItem value="gpt-4o-mini">
                        GPT-4O Mini (Fast & Efficient)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Brand Voice</Label>
                  <Select 
                    value={config.brandVoice} 
                    onValueChange={(value: 'professional' | 'friendly' | 'technical' | 'casual') => updateConfig({ brandVoice: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Content Tone</Label>
                  <Select 
                    value={config.contentTone} 
                    onValueChange={(value: 'informative' | 'persuasive' | 'educational' | 'entertaining') => updateConfig({ contentTone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="entertaining">Entertaining</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Writing Style</Label>
                  <Textarea 
                    value={config.writingStyle}
                    onChange={(e) => updateConfig({ writingStyle: e.target.value })}
                    rows={3}
                    placeholder="Describe the desired tone and style for AI-generated content"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Multilingual Settings
                </CardTitle>
                <CardDescription>Configure language and translation options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Multilingual Content</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate content in multiple languages
                    </p>
                  </div>
                  <Switch
                    checked={config.multilingualContent}
                    onCheckedChange={(checked) => updateConfig({ multilingualContent: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Translation</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically translate content to other languages
                    </p>
                  </div>
                  <Switch
                    checked={config.autoTranslation}
                    onCheckedChange={(checked) => updateConfig({ autoTranslation: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {['en', 'de', 'zh'].map(lang => (
                      <Badge 
                        key={lang}
                        variant={config.contentLanguages.includes(lang) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const languages = config.contentLanguages.includes(lang)
                            ? config.contentLanguages.filter(l => l !== lang)
                            : [...config.contentLanguages, lang]
                          updateConfig({ contentLanguages: languages })
                        }}
                      >
                        {lang === 'en' && '🇺🇸 English'}
                        {lang === 'de' && '🇩🇪 Deutsch'}
                        {lang === 'zh' && '🇨🇳 中文'}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Content Focus Areas
              </CardTitle>
              <CardDescription>Define what topics and audiences to focus on</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Content Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {config.contentCategories.map((category, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {category}
                      <button
                        onClick={() => {
                          const categories = config.contentCategories.filter((_, i) => i !== index)
                          updateConfig({ contentCategories: categories })
                        }}
                        className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new category"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement
                        if (target.value.trim()) {
                          updateConfig({ 
                            contentCategories: [...config.contentCategories, target.value.trim()] 
                          })
                          target.value = ''
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Textarea 
                  value={config.targetAudience}
                  onChange={(e) => updateConfig({ targetAudience: e.target.value })}
                  rows={2}
                  placeholder="Define the primary audience for content targeting"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publishing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Publishing Schedule
                </CardTitle>
                <CardDescription>Configure when and how often to publish content</CardDescription>
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
                    checked={config.autoPublish}
                    onCheckedChange={(checked) => updateConfig({ autoPublish: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Publishing Frequency</Label>
                  <Select 
                    value={config.publishingFrequency} 
                    onValueChange={(value: 'daily' | 'weekly' | 'biweekly' | 'monthly') => updateConfig({ publishingFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Publishing Time</Label>
                  <Input 
                    type="time"
                    value={config.publishingTime}
                    onChange={(e) => updateConfig({ publishingTime: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Max Posts Per Week: {config.maxPostsPerWeek}</Label>
                  <Slider
                    value={[config.maxPostsPerWeek]}
                    onValueChange={([value]) => updateConfig({ maxPostsPerWeek: value })}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Publishing Days
                </CardTitle>
                <CardDescription>Select which days to publish content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <Badge 
                      key={day}
                      variant={config.publishingDays.includes(day) ? "default" : "outline"}
                      className="cursor-pointer justify-center py-2"
                      onClick={() => {
                        const days = config.publishingDays.includes(day)
                          ? config.publishingDays.filter(d => d !== day)
                          : [...config.publishingDays, day]
                        updateConfig({ publishingDays: days })
                      }}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PencilSimple className="h-5 w-5" />
                  Content Quality Settings
                </CardTitle>
                <CardDescription>Define content length and quality requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Target Keywords Per Post: {config.targetKeywordsPerPost}</Label>
                  <Slider
                    value={[config.targetKeywordsPerPost]}
                    onValueChange={([value]) => updateConfig({ targetKeywordsPerPost: value })}
                    max={15}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Minimum Word Count: {config.minimumWordCount}</Label>
                  <Slider
                    value={[config.minimumWordCount]}
                    onValueChange={([value]) => updateConfig({ minimumWordCount: value })}
                    max={2000}
                    min={300}
                    step={100}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Word Count: {config.maximumWordCount}</Label>
                  <Slider
                    value={[config.maximumWordCount]}
                    onValueChange={([value]) => updateConfig({ maximumWordCount: value })}
                    max={5000}
                    min={1000}
                    step={100}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>SEO Score Threshold: {config.seoScoreThreshold}%</Label>
                  <Slider
                    value={[config.seoScoreThreshold]}
                    onValueChange={([value]) => updateConfig({ seoScoreThreshold: value })}
                    max={100}
                    min={60}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Quality Assurance
                </CardTitle>
                <CardDescription>Content validation and moderation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Content Moderation</Label>
                    <p className="text-sm text-muted-foreground">
                      Check content for inappropriate material
                    </p>
                  </div>
                  <Switch
                    checked={config.contentModeration}
                    onCheckedChange={(checked) => updateConfig({ contentModeration: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Plagiarism Check</Label>
                    <p className="text-sm text-muted-foreground">
                      Verify content originality
                    </p>
                  </div>
                  <Switch
                    checked={config.plagiarismCheck}
                    onCheckedChange={(checked) => updateConfig({ plagiarismCheck: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Fact Checking</Label>
                    <p className="text-sm text-muted-foreground">
                      Validate factual accuracy of content
                    </p>
                  </div>
                  <Switch
                    checked={config.factChecking}
                    onCheckedChange={(checked) => updateConfig({ factChecking: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendUp className="h-5 w-5" />
                  SEO Optimization
                </CardTitle>
                <CardDescription>Search engine optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SEO Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize content for search engines
                    </p>
                  </div>
                  <Switch
                    checked={config.seoOptimization}
                    onCheckedChange={(checked) => updateConfig({ seoOptimization: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Internal Linking</Label>
                    <p className="text-sm text-muted-foreground">
                      Add internal links to other blog posts
                    </p>
                  </div>
                  <Switch
                    checked={config.internalLinking}
                    onCheckedChange={(checked) => updateConfig({ internalLinking: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Structured Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Add schema markup for better search visibility
                    </p>
                  </div>
                  <Switch
                    checked={config.structuredData}
                    onCheckedChange={(checked) => updateConfig({ structuredData: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Meta Description Length: {config.metaDescriptionLength} characters</Label>
                  <Slider
                    value={[config.metaDescriptionLength]}
                    onValueChange={([value]) => updateConfig({ metaDescriptionLength: value })}
                    max={200}
                    min={120}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>External Link Limit: {config.externalLinkLimit}</Label>
                  <Slider
                    value={[config.externalLinkLimit]}
                    onValueChange={([value]) => updateConfig({ externalLinkLimit: value })}
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share className="h-5 w-5" />
                  Social Media & Marketing
                </CardTitle>
                <CardDescription>Social media optimization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Social Media Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Optimize content for social sharing
                    </p>
                  </div>
                  <Switch
                    checked={config.socialMediaOptimization}
                    onCheckedChange={(checked) => updateConfig({ socialMediaOptimization: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Image Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize images for web
                    </p>
                  </div>
                  <Switch
                    checked={config.imageOptimization}
                    onCheckedChange={(checked) => updateConfig({ imageOptimization: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
              <CardDescription>Advanced settings for power users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/20">
                  <h4 className="font-medium mb-2">Configuration Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">AI Model</div>
                      <div className="font-medium">{config.aiModel}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Languages</div>
                      <div className="font-medium">{config.contentLanguages.length}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Publishing</div>
                      <div className="font-medium">{config.publishingFrequency}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Auto-Publish</div>
                      <div className="font-medium">{config.autoPublish ? 'Enabled' : 'Disabled'}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => {
                      // Simulate testing configuration
                      toast.info("Testing blog configuration...")
                      setTimeout(() => {
                        toast.success("Configuration test passed!")
                      }, 2000)
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Test Configuration
                  </Button>
                  
                  <Button variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}