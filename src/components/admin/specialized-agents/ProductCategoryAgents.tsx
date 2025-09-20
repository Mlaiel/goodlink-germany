import React, { useState } from "react"
import { useLanguage } from "@/components/LanguageContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { 
  Robot,
  Hospital,
  Car,
  Plug,
  Gear,
  Circle,
  Play,
  Pause,
  Brain,
  TrendUp,
  Shield,
  Globe,
  Lightbulb,
  Target,
  CheckCircle,
  Clock,
  Users
} from "@phosphor-icons/react"

interface AgentConfig {
  id: string
  name: string
  category: string
  icon: React.ReactNode
  description: string
  expertise: string[]
  languages: string[]
  isActive: boolean
  performance: {
    accuracy: number
    responseTime: number
    satisfaction: number
  }
  capabilities: string[]
  lastTrained: string
  modelVersion: string
}

interface CategoryAgent extends AgentConfig {
  productTypes: string[]
  complianceStandards: string[]
  marketExpertise: string[]
  specializedKnowledge: string[]
}

const medicalAgent: CategoryAgent = {
  id: "medical-expert",
  name: "Medical Device Expert AI",
  category: "medical",
  icon: <Hospital className="h-5 w-5" />,
  description: "Specialized in medical devices, healthcare regulations, and patient safety standards",
  expertise: ["MDR/CE Compliance", "FDA Regulations", "ISO 13485", "Medical Device Classification", "Clinical Trials"],
  languages: ["de", "en", "zh", "fr"],
  isActive: true,
  performance: {
    accuracy: 96,
    responseTime: 1.2,
    satisfaction: 94
  },
  capabilities: [
    "Medical device classification",
    "Regulatory compliance guidance",
    "Technical documentation",
    "Risk assessment consultation",
    "Clinical data interpretation"
  ],
  lastTrained: "2024-01-15",
  modelVersion: "v3.2",
  productTypes: [
    "Diagnostic Equipment",
    "Patient Monitoring",
    "Surgical Instruments", 
    "Medical Electronics",
    "Therapeutic Devices",
    "Laboratory Equipment"
  ],
  complianceStandards: [
    "EU MDR 2017/745",
    "ISO 13485:2016",
    "IEC 62304",
    "ISO 14971",
    "FDA 21 CFR Part 820"
  ],
  marketExpertise: [
    "European Union",
    "United States",
    "China",
    "Japan",
    "Canada"
  ],
  specializedKnowledge: [
    "Biocompatibility testing",
    "Sterilization methods",
    "Software as Medical Device (SaMD)",
    "Clinical evaluation protocols",
    "Post-market surveillance"
  ]
}

const automotiveAgent: CategoryAgent = {
  id: "automotive-expert",
  name: "Automotive Components AI",
  category: "automotive",
  icon: <Car className="h-5 w-5" />,
  description: "Expert in automotive parts, safety standards, and performance specifications",
  expertise: ["IATF 16949", "ISO/TS Standards", "ROHS Compliance", "EMC Testing", "FMEA Analysis"],
  languages: ["de", "en", "zh", "fr"],
  isActive: true,
  performance: {
    accuracy: 94,
    responseTime: 0.9,
    satisfaction: 92
  },
  capabilities: [
    "Component specification analysis",
    "Quality standards verification",
    "Supply chain optimization",
    "Performance testing guidance",
    "Cost optimization strategies"
  ],
  lastTrained: "2024-01-20",
  modelVersion: "v3.1",
  productTypes: [
    "Engine Components",
    "Electrical Systems",
    "Brake Systems",
    "Transmission Parts",
    "Suspension Components",
    "Electronic Control Units"
  ],
  complianceStandards: [
    "IATF 16949:2016",
    "ISO 26262 (Functional Safety)",
    "ECE R Regulations",
    "FMVSS Standards",
    "JIS Automotive Standards"
  ],
  marketExpertise: [
    "Germany (VDA)",
    "United States (SAE)",
    "Japan (JASO)",
    "China (GB Standards)",
    "European Union"
  ],
  specializedKnowledge: [
    "Functional safety assessment",
    "Automotive cybersecurity",
    "Electric vehicle components",
    "Advanced driver assistance systems",
    "Vehicle homologation processes"
  ]
}

const electronicsAgent: CategoryAgent = {
  id: "electronics-expert", 
  name: "Electronics & Connectors AI",
  category: "electronics",
  icon: <Plug className="h-5 w-5" />,
  description: "Specialized in electronic components, connectors, and EMC compliance",
  expertise: ["EMC/EMI Standards", "IPC Standards", "RoHS Compliance", "Signal Integrity", "Connector Design"],
  languages: ["de", "en", "zh", "fr"],
  isActive: true,
  performance: {
    accuracy: 95,
    responseTime: 0.8,
    satisfaction: 93
  },
  capabilities: [
    "Connector specification matching",
    "EMC compliance verification",
    "Signal integrity analysis",
    "Material compatibility check",
    "Environmental testing guidance"
  ],
  lastTrained: "2024-01-18",
  modelVersion: "v3.3",
  productTypes: [
    "Connectors & Cables",
    "Circuit Boards",
    "Power Supplies",
    "Sensors",
    "Switches",
    "Electronic Assemblies"
  ],
  complianceStandards: [
    "IPC-A-610",
    "IEC 61000 Series",
    "RoHS Directive 2011/65/EU",
    "REACH Regulation",
    "UL Safety Standards"
  ],
  marketExpertise: [
    "Industrial Automation",
    "Telecommunications",
    "Consumer Electronics",
    "Aerospace & Defense",
    "Medical Electronics"
  ],
  specializedKnowledge: [
    "High-speed signal design",
    "Power integrity analysis", 
    "Thermal management",
    "Miniaturization techniques",
    "Reliability engineering"
  ]
}

const mechanicalAgent: CategoryAgent = {
  id: "mechanical-expert",
  name: "Mechanical Components AI", 
  category: "mechanical",
  icon: <Gear className="h-5 w-5" />,
  description: "Expert in mechanical parts, materials science, and manufacturing processes",
  expertise: ["Materials Engineering", "Manufacturing Processes", "Quality Control", "Dimensional Analysis", "Stress Testing"],
  languages: ["de", "en", "zh", "fr"],
  isActive: true,
  performance: {
    accuracy: 93,
    responseTime: 1.0,
    satisfaction: 91
  },
  capabilities: [
    "Material selection guidance",
    "Manufacturing process optimization",
    "Quality inspection protocols",
    "Dimensional tolerance analysis",
    "Stress and fatigue analysis"
  ],
  lastTrained: "2024-01-22",
  modelVersion: "v3.0",
  productTypes: [
    "Castors & Wheels",
    "Bearings",
    "Fasteners",
    "Springs",
    "Gaskets & Seals",
    "Machined Components"
  ],
  complianceStandards: [
    "ISO 9001:2015",
    "DIN Standards",
    "ASTM International",
    "JIS Mechanical Standards",
    "EN European Norms"
  ],
  marketExpertise: [
    "Industrial Machinery",
    "Construction Equipment",
    "Material Handling",
    "HVAC Systems",
    "Food Processing"
  ],
  specializedKnowledge: [
    "Tribology and lubrication",
    "Corrosion resistance",
    "Load calculation methods",
    "Precision machining tolerances",
    "Surface treatment processes"
  ]
}

export function ProductCategoryAgents() {
  const { t } = useLanguage()
  const [selectedAgent, setSelectedAgent] = useState<CategoryAgent>(medicalAgent)
  const [isTraining, setIsTraining] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("medical")

  const agents: CategoryAgent[] = [medicalAgent, automotiveAgent, electronicsAgent, mechanicalAgent]

  const handleAgentToggle = (agentId: string, isActive: boolean) => {
    // Update agent status
    toast.success(
      isActive 
        ? `Agent ${agents.find(a => a.id === agentId)?.name} aktiviert`
        : `Agent ${agents.find(a => a.id === agentId)?.name} deaktiviert`
    )
  }

  const handleTraining = async (agentId: string) => {
    setIsTraining(true)
    toast.info("Training gestartet...")
    
    // Simulate training process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsTraining(false)
    toast.success("Agent erfolgreich trainiert!")
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical": return <Hospital className="h-4 w-4" />
      case "automotive": return <Car className="h-4 w-4" />
      case "electronics": return <Plug className="h-4 w-4" />
      case "mechanical": return <Gear className="h-4 w-4" />
      default: return <Robot className="h-4 w-4" />
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.specializedAgents')}</h2>
          <p className="text-muted-foreground">
            Gestion des agents IA spécialisés par catégorie de produits
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {agents.filter(a => a.isActive).length}/{agents.length} Agents Actifs
        </Badge>
      </div>

      {/* Agents Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <Card 
            key={agent.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedAgent.id === agent.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedAgent(agent)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {agent.icon}
                  <Badge 
                    variant={agent.isActive ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {agent.isActive ? "Actif" : "Inactif"}
                  </Badge>
                </div>
                <Switch
                  checked={agent.isActive}
                  onCheckedChange={(checked) => handleAgentToggle(agent.id, checked)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <CardTitle className="text-sm">{agent.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {agent.description}
                </p>
                
                {/* Performance Metrics */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Précision</span>
                    <span className={getPerformanceColor(agent.performance.accuracy)}>
                      {agent.performance.accuracy}%
                    </span>
                  </div>
                  <Progress value={agent.performance.accuracy} className="h-1" />
                  
                  <div className="flex justify-between text-xs">
                    <span>Satisfaction</span>
                    <span className={getPerformanceColor(agent.performance.satisfaction)}>
                      {agent.performance.satisfaction}%
                    </span>
                  </div>
                  <Progress value={agent.performance.satisfaction} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Agent Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedAgent.icon}
              <CardTitle>{selectedAgent.name}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTraining(selectedAgent.id)}
                disabled={isTraining}
              >
                {isTraining ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Training...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Entraîner l'Agent
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="products">Produits</TabsTrigger>
              <TabsTrigger value="compliance">Conformité</TabsTrigger>
              <TabsTrigger value="knowledge">Expertise</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Performance Metrics */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendUp className="h-4 w-4" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Précision</span>
                        <span className={getPerformanceColor(selectedAgent.performance.accuracy)}>
                          {selectedAgent.performance.accuracy}%
                        </span>
                      </div>
                      <Progress value={selectedAgent.performance.accuracy} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Temps de réponse</span>
                        <span className="text-blue-600">{selectedAgent.performance.responseTime}s</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Satisfaction</span>
                        <span className={getPerformanceColor(selectedAgent.performance.satisfaction)}>
                          {selectedAgent.performance.satisfaction}%
                        </span>
                      </div>
                      <Progress value={selectedAgent.performance.satisfaction} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Agent Info */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Robot className="h-4 w-4" />
                      Informations Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>{selectedAgent.modelVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dernière formation:</span>
                      <span>{selectedAgent.lastTrained}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Langues:</span>
                      <div className="flex gap-1">
                        {selectedAgent.languages.map(lang => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Capabilities */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Capacités
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedAgent.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{capability}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Types de Produits Spécialisés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAgent.productTypes.map((type, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Standards de Conformité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAgent.complianceStandards.map((standard, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">{standard}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Expertise Marché</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedAgent.marketExpertise.map((market, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{market}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Connaissances Spécialisées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAgent.specializedKnowledge.map((knowledge, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">{knowledge}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Configuration Agent</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Température de Créativité</Label>
                      <div className="flex items-center gap-2">
                        <Input type="range" min="0" max="100" defaultValue="75" className="flex-1" />
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Seuil de Confiance</Label>
                      <div className="flex items-center gap-2">
                        <Input type="range" min="0" max="100" defaultValue="85" className="flex-1" />
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Niveau de Détail</Label>
                      <Select defaultValue="detailed">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brief">Bref</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="detailed">Détaillé</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Préférences de Réponse</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Inclure des références</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Vérification automatique</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Mode apprentissage</Label>
                      <Switch />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Instructions personnalisées</Label>
                      <Textarea 
                        placeholder="Ajoutez des instructions spécifiques pour cet agent..."
                        className="h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}