import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  Gear,
  Play,
  Pause,
  ArrowCounterClockwise,
  FloppyDisk,
  Clock,
  Lightning,
  Target,
  Brain,
  ChatCircle,
  TrendUp,
  Eye,
  Users,
  CurrencyDollar,
  Globe,
  Palette,
  Camera,
  FileText,
  ShoppingCart,
  ChartBar,
  Calendar,
  Warning,
  CheckCircle,
  Activity
} from "@phosphor-icons/react"

interface AgentConfig {
  id: string
  name: string
  type: string
  status: "active" | "paused" | "training" | "error"
  settings: Record<string, any>
}

interface AgentControlPanelProps {
  agent: AgentConfig
  onConfigUpdate: (config: AgentConfig) => void
}

export function AgentControlPanel({ agent, onConfigUpdate }: AgentControlPanelProps) {
  const [config, setConfig] = useState<AgentConfig>(agent)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onConfigUpdate(config)
    setIsEditing(false)
    toast.success(`${agent.name} configuration saved`)
  }

  const handleReset = () => {
    setConfig(agent)
    setIsEditing(false)
    toast.info("Configuration reset to last saved state")
  }

  const toggleStatus = () => {
    const newStatus = config.status === "active" ? "paused" : "active"
    setConfig({ ...config, status: newStatus })
    toast.info(`${agent.name} ${newStatus}`)
  }

  const updateSetting = (key: string, value: any) => {
    setConfig({
      ...config,
      settings: { ...config.settings, [key]: value }
    })
    setIsEditing(true)
  }

  const renderControlsForType = () => {
    switch (agent.type) {
      case "social":
        return renderSocialMediaControls()
      case "messaging":
        return renderMessagingControls()
      case "content":
        return renderContentControls()
      case "pricing":
        return renderPricingControls()
      case "analytics":
        return renderAnalyticsControls()
      case "forecasting":
        return renderForecastingControls()
      case "support":
        return renderSupportControls()
      default:
        return renderGenericControls()
    }
  }

  const renderSocialMediaControls = () => (
    <div className="space-y-6">
      {/* Posting Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Posting Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Posts per day</Label>
              <Slider
                value={[config.settings.postsPerDay || 3]}
                onValueChange={([value]) => updateSetting("postsPerDay", value)}
                max={10}
                min={1}
                step={1}
                className="mt-2"
              />
              <span className="text-sm text-muted-foreground">{config.settings.postsPerDay || 3} posts</span>
            </div>
            <div>
              <Label>Optimal posting times</Label>
              <Select value={config.settings.postingTimes || "auto"} onValueChange={(value) => updateSetting("postingTimes", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-optimize</SelectItem>
                  <SelectItem value="morning">Morning (8-10 AM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (2-4 PM)</SelectItem>
                  <SelectItem value="evening">Evening (6-8 PM)</SelectItem>
                  <SelectItem value="custom">Custom schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.weekendPosting || false}
              onCheckedChange={(checked) => updateSetting("weekendPosting", checked)}
            />
            <Label>Post on weekends</Label>
          </div>
        </CardContent>
      </Card>

      {/* Content Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Content Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Content tone</Label>
            <Select value={config.settings.contentTone || "professional"} onValueChange={(value) => updateSetting("contentTone", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Hashtag strategy</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label className="text-sm">Hashtags per post</Label>
                <Slider
                  value={[config.settings.hashtagCount || 5]}
                  onValueChange={([value]) => updateSetting("hashtagCount", value)}
                  max={30}
                  min={0}
                  step={1}
                />
                <span className="text-xs text-muted-foreground">{config.settings.hashtagCount || 5} hashtags</span>
              </div>
              <div>
                <Label className="text-sm">Trending hashtag %</Label>
                <Slider
                  value={[config.settings.trendingHashtagPercent || 20]}
                  onValueChange={([value]) => updateSetting("trendingHashtagPercent", value)}
                  max={100}
                  min={0}
                  step={5}
                />
                <span className="text-xs text-muted-foreground">{config.settings.trendingHashtagPercent || 20}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.autoRepost || false}
              onCheckedChange={(checked) => updateSetting("autoRepost", checked)}
            />
            <Label>Auto-repost top performing content</Label>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Engagement Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Response time (minutes)</Label>
              <Input
                type="number"
                value={config.settings.responseTime || 15}
                onChange={(e) => updateSetting("responseTime", parseInt(e.target.value))}
                min={1}
                max={1440}
              />
            </div>
            <div>
              <Label>Auto-like threshold</Label>
              <Slider
                value={[config.settings.autoLikeThreshold || 70]}
                onValueChange={([value]) => updateSetting("autoLikeThreshold", value)}
                max={100}
                min={0}
                step={5}
              />
              <span className="text-xs text-muted-foreground">{config.settings.autoLikeThreshold || 70}% relevance</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.autoFollow || false}
              onCheckedChange={(checked) => updateSetting("autoFollow", checked)}
            />
            <Label>Auto-follow relevant accounts</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMessagingControls = () => (
    <div className="space-y-6">
      {/* Response Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChatCircle className="h-4 w-4" />
            Response Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Response delay (seconds)</Label>
              <Slider
                value={[config.settings.responseDelay || 3]}
                onValueChange={([value]) => updateSetting("responseDelay", value)}
                max={30}
                min={0}
                step={1}
              />
              <span className="text-xs text-muted-foreground">{config.settings.responseDelay || 3}s delay</span>
            </div>
            <div>
              <Label>Max conversation length</Label>
              <Input
                type="number"
                value={config.settings.maxConversationLength || 50}
                onChange={(e) => updateSetting("maxConversationLength", parseInt(e.target.value))}
                min={5}
                max={200}
              />
            </div>
          </div>
          
          <div>
            <Label>Language detection</Label>
            <Select value={config.settings.languageDetection || "auto"} onValueChange={(value) => updateSetting("languageDetection", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="en">English only</SelectItem>
                <SelectItem value="de">German only</SelectItem>
                <SelectItem value="zh">Chinese only</SelectItem>
                <SelectItem value="multi">Multi-language</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.humanHandoff || true}
              onCheckedChange={(checked) => updateSetting("humanHandoff", checked)}
            />
            <Label>Enable human handoff for complex queries</Label>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Business Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start time</Label>
              <Input
                type="time"
                value={config.settings.businessStart || "09:00"}
                onChange={(e) => updateSetting("businessStart", e.target.value)}
              />
            </div>
            <div>
              <Label>End time</Label>
              <Input
                type="time"
                value={config.settings.businessEnd || "18:00"}
                onChange={(e) => updateSetting("businessEnd", e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Label>Timezone</Label>
            <Select value={config.settings.timezone || "Europe/Berlin"} onValueChange={(value) => updateSetting("timezone", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Europe/Berlin">Europe/Berlin (CET)</SelectItem>
                <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                <SelectItem value="Asia/Shanghai">Asia/Shanghai (CST)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.weekendSupport || false}
              onCheckedChange={(checked) => updateSetting("weekendSupport", checked)}
            />
            <Label>Weekend support</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContentControls = () => (
    <div className="space-y-6">
      {/* Content Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Content Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Writing style</Label>
            <Select value={config.settings.writingStyle || "informative"} onValueChange={(value) => updateSetting("writingStyle", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="informative">Informative</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="conversational">Conversational</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Content length</Label>
              <Select value={config.settings.contentLength || "medium"} onValueChange={(value) => updateSetting("contentLength", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (100-300 words)</SelectItem>
                  <SelectItem value="medium">Medium (300-800 words)</SelectItem>
                  <SelectItem value="long">Long (800-1500 words)</SelectItem>
                  <SelectItem value="variable">Variable length</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>SEO optimization level</Label>
              <Slider
                value={[config.settings.seoLevel || 80]}
                onValueChange={([value]) => updateSetting("seoLevel", value)}
                max={100}
                min={0}
                step={10}
              />
              <span className="text-xs text-muted-foreground">{config.settings.seoLevel || 80}% SEO focus</span>
            </div>
          </div>

          <div>
            <Label>Target keywords per content</Label>
            <Slider
              value={[config.settings.targetKeywords || 3]}
              onValueChange={([value]) => updateSetting("targetKeywords", value)}
              max={10}
              min={1}
              step={1}
            />
            <span className="text-xs text-muted-foreground">{config.settings.targetKeywords || 3} keywords</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.autoPublish || false}
              onCheckedChange={(checked) => updateSetting("autoPublish", checked)}
            />
            <Label>Auto-publish approved content</Label>
          </div>
        </CardContent>
      </Card>

      {/* Translation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Translation Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Target languages</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["en", "de", "zh", "fr", "es", "it"].map(lang => (
                <Badge
                  key={lang}
                  variant={config.settings.targetLanguages?.includes(lang) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    const current = config.settings.targetLanguages || ["en", "de"]
                    const updated = current.includes(lang) 
                      ? current.filter((l: string) => l !== lang)
                      : [...current, lang]
                    updateSetting("targetLanguages", updated)
                  }}
                >
                  {lang.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <Label>Translation quality</Label>
            <Select value={config.settings.translationQuality || "high"} onValueChange={(value) => updateSetting("translationQuality", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (Fast)</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="high">High Quality</SelectItem>
                <SelectItem value="premium">Premium (Human Review)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.culturalAdaptation || true}
              onCheckedChange={(checked) => updateSetting("culturalAdaptation", checked)}
            />
            <Label>Cultural adaptation for local markets</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPricingControls = () => (
    <div className="space-y-6">
      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CurrencyDollar className="h-4 w-4" />
            Pricing Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Pricing strategy</Label>
            <Select value={config.settings.pricingStrategy || "competitive"} onValueChange={(value) => updateSetting("pricingStrategy", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="competitive">Competitive</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="penetration">Market Penetration</SelectItem>
                <SelectItem value="skimming">Price Skimming</SelectItem>
                <SelectItem value="dynamic">Dynamic Pricing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min margin %</Label>
              <Input
                type="number"
                value={config.settings.minMargin || 15}
                onChange={(e) => updateSetting("minMargin", parseFloat(e.target.value))}
                min={0}
                max={100}
                step={0.1}
              />
            </div>
            <div>
              <Label>Max price change %</Label>
              <Input
                type="number"
                value={config.settings.maxPriceChange || 10}
                onChange={(e) => updateSetting("maxPriceChange", parseFloat(e.target.value))}
                min={0}
                max={50}
                step={0.1}
              />
            </div>
          </div>

          <div>
            <Label>Competitor monitoring frequency</Label>
            <Select value={config.settings.monitoringFrequency || "hourly"} onValueChange={(value) => updateSetting("monitoringFrequency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Every hour</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.buyBoxOptimization || true}
              onCheckedChange={(checked) => updateSetting("buyBoxOptimization", checked)}
            />
            <Label>Buy Box optimization priority</Label>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Adjustments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Dynamic Adjustments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Inventory impact</Label>
              <Slider
                value={[config.settings.inventoryImpact || 50]}
                onValueChange={([value]) => updateSetting("inventoryImpact", value)}
                max={100}
                min={0}
                step={5}
              />
              <span className="text-xs text-muted-foreground">{config.settings.inventoryImpact || 50}% weight</span>
            </div>
            <div>
              <Label>Seasonality factor</Label>
              <Slider
                value={[config.settings.seasonalityFactor || 30]}
                onValueChange={([value]) => updateSetting("seasonalityFactor", value)}
                max={100}
                min={0}
                step={5}
              />
              <span className="text-xs text-muted-foreground">{config.settings.seasonalityFactor || 30}% weight</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.demandBasedPricing || true}
              onCheckedChange={(checked) => updateSetting("demandBasedPricing", checked)}
            />
            <Label>Demand-based pricing</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.flashSaleOptimization || false}
              onCheckedChange={(checked) => updateSetting("flashSaleOptimization", checked)}
            />
            <Label>Flash sale optimization</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalyticsControls = () => (
    <div className="space-y-6">
      {/* Data Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            Data Collection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Analysis frequency</Label>
            <Select value={config.settings.analysisFrequency || "daily"} onValueChange={(value) => updateSetting("analysisFrequency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Data retention period (days)</Label>
            <Input
              type="number"
              value={config.settings.dataRetention || 365}
              onChange={(e) => updateSetting("dataRetention", parseInt(e.target.value))}
              min={30}
              max={1095}
            />
          </div>

          <div>
            <Label>Alert thresholds</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label className="text-sm">Revenue drop %</Label>
                <Input
                  type="number"
                  value={config.settings.revenueDropAlert || 15}
                  onChange={(e) => updateSetting("revenueDropAlert", parseFloat(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
              <div>
                <Label className="text-sm">Conversion drop %</Label>
                <Input
                  type="number"
                  value={config.settings.conversionDropAlert || 20}
                  onChange={(e) => updateSetting("conversionDropAlert", parseFloat(e.target.value))}
                  min={0}
                  max={100}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.competitorTracking || true}
              onCheckedChange={(checked) => updateSetting("competitorTracking", checked)}
            />
            <Label>Competitor performance tracking</Label>
          </div>
        </CardContent>
      </Card>

      {/* Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reporting
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Report frequency</Label>
            <Select value={config.settings.reportFrequency || "weekly"} onValueChange={(value) => updateSetting("reportFrequency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Report recipients</Label>
            <Textarea
              value={config.settings.reportRecipients || "admin@goodlink-germany.com"}
              onChange={(e) => updateSetting("reportRecipients", e.target.value)}
              placeholder="Enter email addresses separated by commas"
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.autoInsights || true}
              onCheckedChange={(checked) => updateSetting("autoInsights", checked)}
            />
            <Label>Auto-generate insights and recommendations</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderForecastingControls = () => (
    <div className="space-y-6">
      {/* Model Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Forecasting model</Label>
            <Select value={config.settings.forecastModel || "prophet"} onValueChange={(value) => updateSetting("forecastModel", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prophet">Prophet (Facebook)</SelectItem>
                <SelectItem value="arima">ARIMA</SelectItem>
                <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                <SelectItem value="ensemble">Ensemble Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Forecast horizon (days)</Label>
              <Input
                type="number"
                value={config.settings.forecastHorizon || 30}
                onChange={(e) => updateSetting("forecastHorizon", parseInt(e.target.value))}
                min={7}
                max={365}
              />
            </div>
            <div>
              <Label>Training data window (days)</Label>
              <Input
                type="number"
                value={config.settings.trainingWindow || 365}
                onChange={(e) => updateSetting("trainingWindow", parseInt(e.target.value))}
                min={30}
                max={1095}
              />
            </div>
          </div>

          <div>
            <Label>Retraining frequency</Label>
            <Select value={config.settings.retrainingFrequency || "weekly"} onValueChange={(value) => updateSetting("retrainingFrequency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="adaptive">Adaptive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.seasonalityDetection || true}
              onCheckedChange={(checked) => updateSetting("seasonalityDetection", checked)}
            />
            <Label>Automatic seasonality detection</Label>
          </div>
        </CardContent>
      </Card>

      {/* External Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendUp className="h-4 w-4" />
            External Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Weather impact weight</Label>
            <Slider
              value={[config.settings.weatherWeight || 20]}
              onValueChange={([value]) => updateSetting("weatherWeight", value)}
              max={100}
              min={0}
              step={5}
            />
            <span className="text-xs text-muted-foreground">{config.settings.weatherWeight || 20}% influence</span>
          </div>

          <div>
            <Label>Economic indicators weight</Label>
            <Slider
              value={[config.settings.economicWeight || 15]}
              onValueChange={([value]) => updateSetting("economicWeight", value)}
              max={100}
              min={0}
              step={5}
            />
            <span className="text-xs text-muted-foreground">{config.settings.economicWeight || 15}% influence</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.holidayAdjustment || true}
              onCheckedChange={(checked) => updateSetting("holidayAdjustment", checked)}
            />
            <Label>Holiday and event adjustments</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.competitorImpact || true}
              onCheckedChange={(checked) => updateSetting("competitorImpact", checked)}
            />
            <Label>Competitor activity impact</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSupportControls = () => (
    <div className="space-y-6">
      {/* Response Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChatCircle className="h-4 w-4" />
            Response Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Max response time (minutes)</Label>
              <Input
                type="number"
                value={config.settings.maxResponseTime || 5}
                onChange={(e) => updateSetting("maxResponseTime", parseInt(e.target.value))}
                min={1}
                max={60}
              />
            </div>
            <div>
              <Label>Escalation threshold</Label>
              <Select value={config.settings.escalationThreshold || "medium"} onValueChange={(value) => updateSetting("escalationThreshold", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low complexity</SelectItem>
                  <SelectItem value="medium">Medium complexity</SelectItem>
                  <SelectItem value="high">High complexity only</SelectItem>
                  <SelectItem value="never">Never escalate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Knowledge base confidence threshold</Label>
            <Slider
              value={[config.settings.confidenceThreshold || 80]}
              onValueChange={([value]) => updateSetting("confidenceThreshold", value)}
              max={100}
              min={0}
              step={5}
            />
            <span className="text-xs text-muted-foreground">{config.settings.confidenceThreshold || 80}% confidence required</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.sentimentAnalysis || true}
              onCheckedChange={(checked) => updateSetting("sentimentAnalysis", checked)}
            />
            <Label>Real-time sentiment analysis</Label>
          </div>
        </CardContent>
      </Card>

      {/* Learning & Improvement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Learning & Improvement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Learning mode</Label>
            <Select value={config.settings.learningMode || "active"} onValueChange={(value) => updateSetting("learningMode", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active learning</SelectItem>
                <SelectItem value="passive">Passive learning</SelectItem>
                <SelectItem value="supervised">Supervised only</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Feedback collection rate</Label>
            <Slider
              value={[config.settings.feedbackRate || 30]}
              onValueChange={([value]) => updateSetting("feedbackRate", value)}
              max={100}
              min={0}
              step={5}
            />
            <span className="text-xs text-muted-foreground">{config.settings.feedbackRate || 30}% of conversations</span>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.autoKnowledgeUpdate || true}
              onCheckedChange={(checked) => updateSetting("autoKnowledgeUpdate", checked)}
            />
            <Label>Auto-update knowledge base from successful resolutions</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGenericControls = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Processing frequency</Label>
            <Select value={config.settings.frequency || "hourly"} onValueChange={(value) => updateSetting("frequency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={config.settings.enabled || true}
              onCheckedChange={(checked) => updateSetting("enabled", checked)}
            />
            <Label>Enable automated processing</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Gear className="h-5 w-5" />
              {agent.name} Configuration
            </CardTitle>
            <CardDescription>
              Configure parameters and behavior for this AI agent
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={config.status === "active" ? "default" : "secondary"}>
              {config.status}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleStatus}
              className="flex items-center gap-1"
            >
              {config.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {config.status === "active" ? "Pause" : "Start"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6">
            {renderControlsForType()}
          </TabsContent>

          <TabsContent value="monitoring" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Monitoring & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Alert email</Label>
                      <Input
                        type="email"
                        value={config.settings.alertEmail || "admin@goodlink-germany.com"}
                        onChange={(e) => updateSetting("alertEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Log retention (days)</Label>
                      <Input
                        type="number"
                        value={config.settings.logRetention || 30}
                        onChange={(e) => updateSetting("logRetention", parseInt(e.target.value))}
                        min={7}
                        max={365}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.settings.errorAlerts || true}
                      onCheckedChange={(checked) => updateSetting("errorAlerts", checked)}
                    />
                    <Label>Error alerts</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.settings.performanceAlerts || true}
                      onCheckedChange={(checked) => updateSetting("performanceAlerts", checked)}
                    />
                    <Label>Performance alerts</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightning className="h-4 w-4" />
                    Performance Tuning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Max concurrent operations</Label>
                      <Input
                        type="number"
                        value={config.settings.maxConcurrent || 10}
                        onChange={(e) => updateSetting("maxConcurrent", parseInt(e.target.value))}
                        min={1}
                        max={100}
                      />
                    </div>
                    <div>
                      <Label>Timeout (seconds)</Label>
                      <Input
                        type="number"
                        value={config.settings.timeout || 30}
                        onChange={(e) => updateSetting("timeout", parseInt(e.target.value))}
                        min={5}
                        max={300}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Resource allocation</Label>
                    <Select value={config.settings.resourceAllocation || "medium"} onValueChange={(value) => updateSetting("resourceAllocation", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Shared resources)</SelectItem>
                        <SelectItem value="medium">Medium (Balanced)</SelectItem>
                        <SelectItem value="high">High (Dedicated resources)</SelectItem>
                        <SelectItem value="maximum">Maximum (Priority)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={config.settings.autoScaling || true}
                      onCheckedChange={(checked) => updateSetting("autoScaling", checked)}
                    />
                    <Label>Auto-scaling based on load</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isEditing && (
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                <Warning className="h-3 w-3 mr-1" />
                Unsaved changes
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing && (
              <Button variant="outline" onClick={handleReset}>
                <ArrowCounterClockwise className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
            <Button onClick={handleSave} disabled={!isEditing}>
              <FloppyDisk className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}