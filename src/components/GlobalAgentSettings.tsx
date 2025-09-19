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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  Gear,
  Globe,
  Clock,
  CurrencyDollar,
  Brain,
  Eye,
  Warning,
  Shield,
  Lightning
} from "@phosphor-icons/react"

interface GlobalAgentSettingsProps {
  onClose: () => void
}

export function GlobalAgentSettings({ onClose }: GlobalAgentSettingsProps) {
  const [globalSettings, setGlobalSettings] = useKV<Record<string, any>>("global-agent-settings", {
    maxRequestsPerHour: 1000,
    maxConcurrentAgents: 50,
    dataRetentionDays: 365,
    enableAuditLogging: true,
    defaultTimeout: 30,
    retryAttempts: 3,
    circuitBreakerThreshold: 10,
    maxMonthlyCost: 5000,
    costAlertThreshold: 80,
    enableCostOptimization: true,
    primaryLLMProvider: "openai",
    fallbackLLMProvider: "anthropic",
    maxTokensPerRequest: 4000,
    enableLocalModels: false,
    healthCheckInterval: 60,
    alertEmail: "admin@goodlink-germany.com",
    slackWebhook: "",
    enableRealTimeMonitoring: true,
    gdprCompliance: true,
    dataProcessingRegion: "eu-central-1",
    enableDataMinimization: true,
    consentRequired: true
  })

  const [isEditing, setIsEditing] = useState(false)

  const getSetting = (key: string, defaultValue: any = null) => {
    return globalSettings?.[key] ?? defaultValue
  }

  const updateSetting = (key: string, value: any) => {
    setGlobalSettings((current: any) => ({
      ...current,
      [key]: value
    }))
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success("Global agent settings saved")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Global Agent Settings</h2>
          <p className="text-muted-foreground">Configure system-wide parameters for all AI agents</p>
        </div>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="h-4 w-4" />
                Performance Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Max requests per hour</Label>
                  <Input
                    type="number"
                    value={getSetting("maxRequestsPerHour", 1000)}
                    onChange={(e) => updateSetting("maxRequestsPerHour", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Max concurrent agents</Label>
                  <Input
                    type="number"
                    value={getSetting("maxConcurrentAgents", 50)}
                    onChange={(e) => updateSetting("maxConcurrentAgents", parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div>
                <Label>Default timeout: {getSetting("defaultTimeout", 30)}s</Label>
                <Slider
                  value={[getSetting("defaultTimeout", 30)]}
                  onValueChange={([value]) => updateSetting("defaultTimeout", value)}
                  max={300}
                  min={5}
                  step={5}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Data retention (days)</Label>
                <Input
                  type="number"
                  value={getSetting("dataRetentionDays", 365)}
                  onChange={(e) => updateSetting("dataRetentionDays", parseInt(e.target.value))}
                />
              </div>

              <div>
                <Label>Data processing region</Label>
                <Select 
                  value={getSetting("dataProcessingRegion", "eu-central-1")} 
                  onValueChange={(value) => updateSetting("dataProcessingRegion", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eu-central-1">EU Central (Frankfurt)</SelectItem>
                    <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={getSetting("enableAuditLogging", true)}
                    onCheckedChange={(checked) => updateSetting("enableAuditLogging", checked)}
                  />
                  <Label>Enable audit logging</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={getSetting("gdprCompliance", true)}
                    onCheckedChange={(checked) => updateSetting("gdprCompliance", checked)}
                  />
                  <Label>GDPR compliance mode</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrencyDollar className="h-4 w-4" />
                Cost Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Max monthly cost (EUR)</Label>
                <Input
                  type="number"
                  value={getSetting("maxMonthlyCost", 5000)}
                  onChange={(e) => updateSetting("maxMonthlyCost", parseInt(e.target.value))}
                />
              </div>

              <div>
                <Label>Cost alert threshold: {getSetting("costAlertThreshold", 80)}%</Label>
                <Slider
                  value={[getSetting("costAlertThreshold", 80)]}
                  onValueChange={([value]) => updateSetting("costAlertThreshold", value)}
                  max={100}
                  min={50}
                  step={5}
                  className="mt-2"
                />
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Current Month Usage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent: €1,247</span>
                    <span>Budget: €{getSetting("maxMonthlyCost", 5000)}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min((1247 / getSetting("maxMonthlyCost", 5000)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Model Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary LLM provider</Label>
                  <Select 
                    value={getSetting("primaryLLMProvider", "openai")} 
                    onValueChange={(value) => updateSetting("primaryLLMProvider", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                      <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                      <SelectItem value="local">Local Models</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fallback provider</Label>
                  <Select 
                    value={getSetting("fallbackLLMProvider", "anthropic")} 
                    onValueChange={(value) => updateSetting("fallbackLLMProvider", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                      <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                      <SelectItem value="local">Local Models</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Max tokens per request: {getSetting("maxTokensPerRequest", 4000)}</Label>
                <Slider
                  value={[getSetting("maxTokensPerRequest", 4000)]}
                  onValueChange={([value]) => updateSetting("maxTokensPerRequest", value)}
                  max={8000}
                  min={100}
                  step={100}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
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
                  <Label>Health check interval (seconds)</Label>
                  <Input
                    type="number"
                    value={getSetting("healthCheckInterval", 60)}
                    onChange={(e) => updateSetting("healthCheckInterval", parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Alert email</Label>
                  <Input
                    type="email"
                    value={getSetting("alertEmail", "admin@goodlink-germany.com")}
                    onChange={(e) => updateSetting("alertEmail", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={getSetting("enableRealTimeMonitoring", true)}
                  onCheckedChange={(checked) => updateSetting("enableRealTimeMonitoring", checked)}
                />
                <Label>Enable real-time monitoring</Label>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">System Health</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>API Response Time</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Optimal</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Error Rate</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">0.8%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center gap-2">
          {isEditing && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              <Warning className="h-3 w-3 mr-1" />
              Unsaved changes
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={!isEditing}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}