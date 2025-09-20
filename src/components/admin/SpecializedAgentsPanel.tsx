import React, { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Robot,
  ShieldCheck,
  Wrench,
  Heart,
  Car,
  Cpu,
  Gear,
  Lightning,
  CheckCircle,
  Warning,
  GearSix,
  Database,
  ChartLine,
  TrendUp,
  Eye,
  PaintBrush
} from '@phosphor-icons/react'
import { useLanguage } from '@/components/LanguageContext'

interface SpecializedAgentConfig {
  id: string
  name: string
  category: 'medical' | 'automotive' | 'electronics' | 'mechanical'
  enabled: boolean
  expertise: string[]
  knowledge_base: string
  confidence_threshold: number
  auto_learning: boolean
  compliance_checks: boolean
  accuracy_score: number
  last_updated: string
  specializations: {
    product_analysis: boolean
    compliance_validation: boolean
    technical_documentation: boolean
    quality_assessment: boolean
    safety_protocols: boolean
    certification_guidance: boolean
  }
}

interface CategoryExpertise {
  medical: {
    regulations: string[]
    standards: string[]
    certifications: string[]
    risk_categories: string[]
  }
  automotive: {
    standards: string[]
    testing_protocols: string[]
    safety_requirements: string[]
    emissions_standards: string[]
  }
  electronics: {
    compliance_standards: string[]
    safety_certifications: string[]
    testing_requirements: string[]
    environmental_standards: string[]
  }
  mechanical: {
    material_standards: string[]
    safety_protocols: string[]
    quality_standards: string[]
    testing_procedures: string[]
  }
}

export function SpecializedAgentsPanel() {
  const { t } = useLanguage()
  
  const defaultAgents: SpecializedAgentConfig[] = [
    {
      id: 'medical-specialist',
      name: 'Medical Device Specialist',
      category: 'medical',
      enabled: true,
      expertise: ['MDR Compliance', 'CE Marking', 'Risk Assessment', 'Clinical Evaluation'],
      knowledge_base: 'EU MDR 2017/745, ISO 13485, ISO 14971, IEC 62304',
      confidence_threshold: 85,
      auto_learning: true,
      compliance_checks: true,
      accuracy_score: 94.2,
      last_updated: '2024-01-15',
      specializations: {
        product_analysis: true,
        compliance_validation: true,
        technical_documentation: true,
        quality_assessment: true,
        safety_protocols: true,
        certification_guidance: true
      }
    },
    {
      id: 'automotive-specialist',
      name: 'Automotive Components Expert',
      category: 'automotive',
      enabled: true,
      expertise: ['ECE Regulations', 'IATF 16949', 'Functional Safety', 'ROHS Compliance'],
      knowledge_base: 'IATF 16949, ISO 26262, ECE Regulations, REACH',
      confidence_threshold: 80,
      auto_learning: true,
      compliance_checks: true,
      accuracy_score: 91.8,
      last_updated: '2024-01-14',
      specializations: {
        product_analysis: true,
        compliance_validation: true,
        technical_documentation: true,
        quality_assessment: true,
        safety_protocols: true,
        certification_guidance: false
      }
    },
    {
      id: 'electronics-specialist',
      name: 'Electronics & EMC Expert',
      category: 'electronics',
      enabled: true,
      expertise: ['CE Marking', 'EMC Directive', 'ROHS', 'WEEE Directive'],
      knowledge_base: 'EMC Directive 2014/30/EU, ROHS Directive, IEC Standards',
      confidence_threshold: 82,
      auto_learning: true,
      compliance_checks: true,
      accuracy_score: 89.5,
      last_updated: '2024-01-13',
      specializations: {
        product_analysis: true,
        compliance_validation: true,
        technical_documentation: false,
        quality_assessment: true,
        safety_protocols: true,
        certification_guidance: true
      }
    },
    {
      id: 'mechanical-specialist',
      name: 'Mechanical Components Analyst',
      category: 'mechanical',
      enabled: true,
      expertise: ['Material Analysis', 'Stress Testing', 'Quality Control', 'Durability Assessment'],
      knowledge_base: 'DIN Standards, ISO 9001, Material Science, Fatigue Analysis',
      confidence_threshold: 78,
      auto_learning: true,
      compliance_checks: false,
      accuracy_score: 87.3,
      last_updated: '2024-01-12',
      specializations: {
        product_analysis: true,
        compliance_validation: false,
        technical_documentation: true,
        quality_assessment: true,
        safety_protocols: true,
        certification_guidance: false
      }
    }
  ]

  const categoryExpertise: CategoryExpertise = {
    medical: {
      regulations: ['EU MDR 2017/745', 'FDA 21 CFR', 'ISO 13485', 'ISO 14971'],
      standards: ['IEC 62304', 'IEC 62366', 'ISO 10993', 'IEC 60601'],
      certifications: ['CE Marking', 'FDA Clearance', 'Notified Body', 'Quality System'],
      risk_categories: ['Class I', 'Class IIa', 'Class IIb', 'Class III']
    },
    automotive: {
      standards: ['IATF 16949', 'ISO 26262', 'ISO 9001', 'VDA Standards'],
      testing_protocols: ['Crash Testing', 'Emissions Testing', 'Durability Testing', 'Climate Testing'],
      safety_requirements: ['Functional Safety', 'Passive Safety', 'Active Safety', 'Cybersecurity'],
      emissions_standards: ['Euro 6', 'EPA Standards', 'CARB', 'China VI']
    },
    electronics: {
      compliance_standards: ['CE Marking', 'FCC', 'IC', 'RCM'],
      safety_certifications: ['UL', 'TÜV', 'CSA', 'VDE'],
      testing_requirements: ['EMC Testing', 'Safety Testing', 'Environmental Testing', 'Performance Testing'],
      environmental_standards: ['ROHS', 'REACH', 'WEEE', 'Energy Star']
    },
    mechanical: {
      material_standards: ['DIN Standards', 'ASTM', 'ISO Material Standards', 'EN Standards'],
      safety_protocols: ['Machine Safety', 'Workplace Safety', 'Product Safety', 'Transport Safety'],
      quality_standards: ['ISO 9001', 'Six Sigma', 'Lean Manufacturing', 'Statistical Process Control'],
      testing_procedures: ['Tensile Testing', 'Fatigue Testing', 'Hardness Testing', 'Corrosion Testing']
    }
  }

  const [agents, setAgents] = useKV<SpecializedAgentConfig[]>('specialized-agents-config', defaultAgents)
  const [selectedAgent, setSelectedAgent] = useState<string>(defaultAgents[0].id)

  const currentAgent = agents?.find(agent => agent.id === selectedAgent) || defaultAgents[0]

  const updateAgent = (agentId: string, updates: Partial<SpecializedAgentConfig>) => {
    setAgents((prev = defaultAgents) => 
      prev.map(agent => 
        agent.id === agentId ? { ...agent, ...updates } : agent
      )
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'medical': return <Heart className="h-5 w-5 text-red-500" />
      case 'automotive': return <Car className="h-5 w-5 text-blue-500" />
      case 'electronics': return <Cpu className="h-5 w-5 text-purple-500" />
      case 'mechanical': return <Gear className="h-5 w-5 text-orange-500" />
      default: return <Robot className="h-5 w-5 text-gray-500" />
    }
  }

  const getAccuracyColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Specialized AI Agents
          </h2>
          <p className="text-muted-foreground">
            Configure AI agents with expert knowledge for different product categories
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent">
          <Lightning className="h-4 w-4 mr-2" />
          Train All Agents
        </Button>
      </div>

      {/* Agents Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {agents?.map((agent) => (
          <Card 
            key={agent.id} 
            className={`cursor-pointer transition-all duration-200 ${
              selectedAgent === agent.id 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedAgent(agent.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                {getCategoryIcon(agent.category)}
                <Badge variant={agent.enabled ? "default" : "secondary"}>
                  {agent.enabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm mb-1">{agent.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {agent.category.charAt(0).toUpperCase() + agent.category.slice(1)} Specialist
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Accuracy</span>
                <span className={`font-semibold ${getAccuracyColor(agent.accuracy_score)}`}>
                  {agent.accuracy_score}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Agent Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(currentAgent.category)}
                {currentAgent.name}
              </CardTitle>
              <CardDescription>
                Configure the specialized AI agent for {currentAgent.category} products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Agent Status</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Enable Agent</span>
                    <Switch 
                      checked={currentAgent.enabled}
                      onCheckedChange={(checked) => 
                        updateAgent(currentAgent.id, { enabled: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Confidence Threshold (%)</Label>
                  <Slider
                    value={[currentAgent.confidence_threshold]}
                    onValueChange={([value]) => 
                      updateAgent(currentAgent.id, { confidence_threshold: value })
                    }
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Current: {currentAgent.confidence_threshold}%
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Knowledge Base</Label>
                <Textarea 
                  value={currentAgent.knowledge_base}
                  onChange={(e) => 
                    updateAgent(currentAgent.id, { knowledge_base: e.target.value })
                  }
                  rows={3}
                  placeholder="Define the knowledge base and standards this agent should be trained on..."
                />
              </div>

              <div className="space-y-4">
                <Label>Agent Capabilities</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries(currentAgent.specializations).map(([key, enabled]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">
                        {key.replace('_', ' ')}
                      </span>
                      <Switch 
                        checked={enabled}
                        onCheckedChange={(checked) => 
                          updateAgent(currentAgent.id, {
                            specializations: {
                              ...currentAgent.specializations,
                              [key]: checked
                            }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Learning</Label>
                    <p className="text-xs text-muted-foreground">
                      Learn from new product data automatically
                    </p>
                  </div>
                  <Switch 
                    checked={currentAgent.auto_learning}
                    onCheckedChange={(checked) => 
                      updateAgent(currentAgent.id, { auto_learning: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compliance Checks</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically validate regulatory compliance
                    </p>
                  </div>
                  <Switch 
                    checked={currentAgent.compliance_checks}
                    onCheckedChange={(checked) => 
                      updateAgent(currentAgent.id, { compliance_checks: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Expertise Areas
              </CardTitle>
              <CardDescription>
                Manage the specific areas of expertise for this agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Expertise</Label>
                <div className="flex gap-2 flex-wrap">
                  {currentAgent.expertise.map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Add New Expertise Area</Label>
                <div className="flex gap-2">
                  <Input placeholder="e.g., ISO 14971 Risk Management" className="flex-1" />
                  <Button size="sm">
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Suggested Areas for {currentAgent.category.charAt(0).toUpperCase() + currentAgent.category.slice(1)}</Label>
                <div className="grid gap-2 text-sm">
                  {(() => {
                    const categoryData = categoryExpertise[currentAgent.category as keyof CategoryExpertise]
                    let items: string[] = []
                    
                    if ('regulations' in categoryData) {
                      items = categoryData.regulations
                    } else if ('standards' in categoryData) {
                      items = categoryData.standards
                    } else if ('compliance_standards' in categoryData) {
                      items = categoryData.compliance_standards
                    } else if ('material_standards' in categoryData) {
                      items = categoryData.material_standards
                    }
                    
                    return items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                        <span>{item}</span>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    ))
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Accuracy Score</span>
                  <span className={`font-semibold ${getAccuracyColor(currentAgent.accuracy_score)}`}>
                    {currentAgent.accuracy_score}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${currentAgent.accuracy_score}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Tasks Completed</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Success Rate</span>
                  <span className="font-semibold text-green-600">96.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Avg Response Time</span>
                  <span className="font-semibold">2.1s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Training</span>
                  <span className="font-semibold">{currentAgent.last_updated}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <TrendUp className="h-4 w-4 mr-2" />
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Knowledge Base</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  Up to Date
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Regulatory Standards</span>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  Compliant
                </Badge>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Warning className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Training Data</span>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Needs Update
                </Badge>
              </div>

              <Button className="w-full" size="sm">
                <GearSix className="h-4 w-4 mr-2" />
                Update Compliance
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PaintBrush className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm" variant="outline">
                <Lightning className="h-4 w-4 mr-2" />
                Retrain Agent
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Test Agent
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Export Knowledge
              </Button>
              <Button className="w-full" size="sm" variant="outline">
                <GearSix className="h-4 w-4 mr-2" />
                Advanced Config
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}