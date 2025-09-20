import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { 
  Stethoscope, 
  Car, 
  Plug, 
  Gear, 
  GearSix,
  Play,
  Pause,
  ArrowClockwise,
  Activity,
  TrendUp
} from "@phosphor-icons/react"
import { useLanguage } from "@/components/LanguageContext"
import { toast } from "sonner"

interface SpecializedAgent {
  id: string
  name: string
  category: string
  icon: React.ComponentType<any>
  status: "active" | "inactive" | "training" | "error"
  expertise: string[]
  performance: number
  tasks: number
  lastUpdate: string
  configuration: {
    temperature: number
    maxTokens: number
    model: string
    specialization: string
    compliance: string[]
    languages: string[]
  }
}

const defaultAgents: SpecializedAgent[] = [
  {
    id: "medical-expert",
    name: "Medical Device Expert",
    category: "Medical",
    icon: Stethoscope,
    status: "active",
    expertise: ["MDR Compliance", "CE Marking", "Medical Standards", "Risk Assessment"],
    performance: 94,
    tasks: 847,
    lastUpdate: "2024-01-15T10:30:00Z",
    configuration: {
      temperature: 0.3,
      maxTokens: 2000,
      model: "gpt-4",
      specialization: "medical-devices",
      compliance: ["MDR", "CE", "ISO13485", "IEC62304"],
      languages: ["de", "en", "zh", "fr"]
    }
  },
  {
    id: "automotive-expert",
    name: "Automotive Component Expert",
    category: "Automotive",
    icon: Car,
    status: "active",
    expertise: ["ECE Regulations", "EMC Testing", "ROHS Compliance", "REACH Standards"],
    performance: 91,
    tasks: 623,
    lastUpdate: "2024-01-15T09:45:00Z",
    configuration: {
      temperature: 0.4,
      maxTokens: 1800,
      model: "gpt-4",
      specialization: "automotive-components",
      compliance: ["ECE", "EMC", "ROHS", "REACH", "WLTP"],
      languages: ["de", "en", "zh", "fr"]
    }
  },
  {
    id: "connector-expert",
    name: "Connector & Cable Specialist",
    category: "Electronics",
    icon: Plug,
    status: "training",
    expertise: ["IEC Standards", "IP Rating", "Signal Integrity", "Material Safety"],
    performance: 89,
    tasks: 334,
    lastUpdate: "2024-01-15T08:20:00Z",
    configuration: {
      temperature: 0.5,
      maxTokens: 1600,
      model: "gpt-4",
      specialization: "connectors-cables",
      compliance: ["IEC", "UL", "VDE", "CSA"],
      languages: ["de", "en", "zh"]
    }
  },
  {
    id: "motor-expert",
    name: "Motor & Sensor Expert",
    category: "Mechanical",
    icon: Gear,
    status: "active",
    expertise: ["Motor Control", "Sensor Calibration", "Efficiency Standards", "Torque Analysis"],
    performance: 92,
    tasks: 412,
    lastUpdate: "2024-01-15T11:15:00Z",
    configuration: {
      temperature: 0.4,
      maxTokens: 1700,
      model: "gpt-4",
      specialization: "motors-sensors",
      compliance: ["IEC", "NEMA", "JIS", "DIN"],
      languages: ["de", "en", "zh"]
    }
  }
]

export function SpecializedAgentsManager() {
  const { t } = useLanguage()
  const [agents, setAgents] = useState<SpecializedAgent[]>(defaultAgents)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [isConfiguring, setIsConfiguring] = useState(false)

  const handleToggleAgent = (agentId: string) => {
    setAgents(currentAgents => 
      currentAgents.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: agent.status === "active" ? "inactive" : "active" }
          : agent
      )
    )
    toast.success(t("Agent status updated"))
  }

  const handleTrainAgent = (agentId: string) => {
    setAgents(currentAgents => 
      currentAgents.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: "training" }
          : agent
      )
    )
    toast.info(t("Agent training started"))
    
    // Simulate training completion
    setTimeout(() => {
      setAgents(currentAgents => 
        currentAgents.map(agent => 
          agent.id === agentId 
            ? { ...agent, status: "active", performance: Math.min(100, agent.performance + Math.random() * 5) }
            : agent
        )
      )
      toast.success(t("Agent training completed"))
    }, 3000)
  }

  const handleUpdateConfiguration = (agentId: string, config: any) => {
    setAgents(currentAgents => 
      currentAgents.map(agent => 
        agent.id === agentId 
          ? { ...agent, configuration: { ...agent.configuration, ...config } }
          : agent
      )
    )
    toast.success(t("Configuration updated"))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "inactive": return "bg-gray-400"
      case "training": return "bg-blue-500"
      case "error": return "bg-red-500"
      default: return "bg-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return t("Active")
      case "inactive": return t("Inactive")
      case "training": return t("Training")
      case "error": return t("Error")
      default: return t("Unknown")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t("Specialized AI Agents")}</h2>
          <p className="text-muted-foreground">{t("Expert knowledge for medical devices and automotive components")}</p>
        </div>
        <Button onClick={() => setIsConfiguring(!isConfiguring)}>
          <GearSix className="h-4 w-4 mr-2" />
          {t("Configure")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const IconComponent = agent.icon
          return (
            <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedAgent(agent.id)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-8 w-8 text-primary" />
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                    <Badge variant="secondary" className="text-xs">
                      {getStatusText(agent.status)}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-sm">{agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t("Performance")}</span>
                    <span className="font-medium">{agent.performance}%</span>
                  </div>
                  <Progress value={agent.performance} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{t("Tasks")}</span>
                  <span>{agent.tasks.toLocaleString()}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {agent.expertise.slice(0, 2).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {agent.expertise.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.expertise.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedAgent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{agents.find(a => a.id === selectedAgent)?.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleToggleAgent(selectedAgent)}
                >
                  {agents.find(a => a.id === selectedAgent)?.status === "active" ? (
                    <>
                      <Pause className="h-4 w-4 mr-1" />
                      {t("Pause")}
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      {t("Activate")}
                    </>
                  )}
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleTrainAgent(selectedAgent)}
                  disabled={agents.find(a => a.id === selectedAgent)?.status === "training"}
                >
                  <ArrowClockwise className="h-4 w-4 mr-1" />
                  {t("Retrain")}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">{t("Overview")}</TabsTrigger>
                <TabsTrigger value="expertise">{t("Expertise")}</TabsTrigger>
                <TabsTrigger value="performance">{t("Performance")}</TabsTrigger>
                <TabsTrigger value="config">{t("Configuration")}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {(() => {
                  const agent = agents.find(a => a.id === selectedAgent)
                  if (!agent) return null

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">{t("Status & Metrics")}</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Status")}</span>
                            <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                              {getStatusText(agent.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Tasks Completed")}</span>
                            <span className="font-medium">{agent.tasks}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Performance")}</span>
                            <span className="font-medium">{agent.performance}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Category")}</span>
                            <Badge variant="outline">{agent.category}</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">{t("Compliance Standards")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.configuration.compliance.map((standard) => (
                            <Badge key={standard} variant="secondary">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">{t("Supported Languages")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.configuration.languages.map((lang) => (
                            <Badge key={lang} variant="outline">
                              {lang.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </TabsContent>

              <TabsContent value="expertise" className="space-y-4">
                {(() => {
                  const agent = agents.find(a => a.id === selectedAgent)
                  if (!agent) return null

                  return (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3">{t("Core Expertise Areas")}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {agent.expertise.map((skill) => (
                            <div key={skill} className="flex items-center justify-between p-3 border rounded-lg">
                              <span>{skill}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={85 + Math.random() * 15} className="w-16 h-2" />
                                <span className="text-sm text-muted-foreground">
                                  {Math.floor(85 + Math.random() * 15)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3">{t("Knowledge Base")}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Standards Documents")}</span>
                            <span className="font-medium">247</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Product Specifications")}</span>
                            <span className="font-medium">1,834</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Compliance Guides")}</span>
                            <span className="font-medium">89</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{t("Last Knowledge Update")}</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(agent.lastUpdate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t("Response Quality")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("Accuracy")}</span>
                          <span className="font-medium">96.2%</span>
                        </div>
                        <Progress value={96.2} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("Compliance Check")}</span>
                          <span className="font-medium">98.7%</span>
                        </div>
                        <Progress value={98.7} className="h-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("User Satisfaction")}</span>
                          <span className="font-medium">94.8%</span>
                        </div>
                        <Progress value={94.8} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t("Task Statistics")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("Tasks Today")}</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("Average Response Time")}</span>
                          <span className="font-medium">2.3s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("Success Rate")}</span>
                          <span className="font-medium">97.1%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t("Error Rate")}</span>
                          <span className="font-medium">2.9%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="config" className="space-y-6">
                {(() => {
                  const agent = agents.find(a => a.id === selectedAgent)
                  if (!agent) return null

                  return (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold">{t("Model Configuration")}</h4>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="model">{t("AI Model")}</Label>
                              <Select value={agent.configuration.model} 
                                      onValueChange={(value) => handleUpdateConfiguration(selectedAgent, { model: value })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                  <SelectItem value="claude-3">Claude 3</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="temperature">{t("Temperature")}: {agent.configuration.temperature}</Label>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={agent.configuration.temperature}
                                onChange={(e) => handleUpdateConfiguration(selectedAgent, { temperature: parseFloat(e.target.value) })}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <Label htmlFor="maxTokens">{t("Max Tokens")}</Label>
                              <Input
                                type="number"
                                value={agent.configuration.maxTokens}
                                onChange={(e) => handleUpdateConfiguration(selectedAgent, { maxTokens: parseInt(e.target.value) })}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">{t("Specialization Settings")}</h4>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="specialization">{t("Focus Area")}</Label>
                              <Select value={agent.configuration.specialization}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="medical-devices">{t("Medical Devices")}</SelectItem>
                                  <SelectItem value="automotive-components">{t("Automotive Components")}</SelectItem>
                                  <SelectItem value="connectors-cables">{t("Connectors & Cables")}</SelectItem>
                                  <SelectItem value="motors-sensors">{t("Motors & Sensors")}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>{t("Active Compliance Standards")}</Label>
                              <div className="mt-2 space-y-2">
                                {["MDR", "CE", "ISO13485", "ECE", "EMC", "ROHS"].map((standard) => (
                                  <div key={standard} className="flex items-center space-x-2">
                                    <Switch
                                      checked={agent.configuration.compliance.includes(standard)}
                                      onCheckedChange={(checked) => {
                                        const newCompliance = checked
                                          ? [...agent.configuration.compliance, standard]
                                          : agent.configuration.compliance.filter(c => c !== standard)
                                        handleUpdateConfiguration(selectedAgent, { compliance: newCompliance })
                                      }}
                                    />
                                    <Label className="text-sm">{standard}</Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label>{t("Custom Instructions")}</Label>
                        <Textarea
                          placeholder={t("Enter specific instructions for this agent...")}
                          className="mt-2"
                          rows={4}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setSelectedAgent(null)}>
                          {t("Cancel")}
                        </Button>
                        <Button onClick={() => toast.success(t("Configuration saved"))}>
                          {t("Save Configuration")}
                        </Button>
                      </div>
                    </div>
                  )
                })()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}