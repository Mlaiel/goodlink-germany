import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  Stethoscope, 
  Car, 
  Plug, 
  Gear,
  Play,
  Stop,
  CheckCircle,
  Clock,
  Warning,
  FileText,
  Target,
  Brain
} from "@phosphor-icons/react"
import { useLanguage } from "@/components/LanguageContext"
import { toast } from "sonner"

interface AgentTask {
  id: string
  agentId: string
  type: "product_analysis" | "compliance_check" | "content_generation" | "translation"
  input: string
  output?: string
  status: "pending" | "running" | "completed" | "error"
  progress: number
  createdAt: string
  completedAt?: string
}

interface ProductInput {
  name: string
  category: string
  description: string
  specifications: string
  targetMarkets: string[]
  complianceRequired: string[]
}

export function SpecializedAgentDemo() {
  const { t } = useLanguage()
  const [tasks, setTasks] = useState<AgentTask[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string>("medical-expert")
  const [productInput, setProductInput] = useState<ProductInput>({
    name: "",
    category: "medical-devices",
    description: "",
    specifications: "",
    targetMarkets: ["de", "eu"],
    complianceRequired: ["MDR", "CE"]
  })

  const agents = [
    {
      id: "medical-expert",
      name: "Medical Device Expert",
      icon: Stethoscope,
      specialization: "Medical devices, MDR compliance, CE marking",
      categories: ["medical-devices", "diagnostic-equipment", "surgical-instruments"]
    },
    {
      id: "automotive-expert", 
      name: "Automotive Component Expert",
      icon: Car,
      specialization: "Automotive parts, ECE regulations, EMC testing",
      categories: ["automotive-parts", "electronic-components", "mechanical-parts"]
    },
    {
      id: "connector-expert",
      name: "Connector & Cable Specialist", 
      icon: Plug,
      specialization: "Connectors, cables, IEC standards, IP ratings",
      categories: ["connectors", "cables", "wiring-harnesses"]
    },
    {
      id: "motor-expert",
      name: "Motor & Sensor Expert",
      icon: Gear,
      specialization: "Motors, sensors, efficiency standards, calibration",
      categories: ["motors", "sensors", "actuators", "control-systems"]
    }
  ]

  const generateTaskId = () => `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const simulateAgentProcessing = async (task: AgentTask) => {
    const updateProgress = (progress: number, status?: AgentTask['status']) => {
      setTasks(currentTasks =>
        currentTasks.map(t =>
          t.id === task.id ? { ...t, progress, status: status || t.status } : t
        )
      )
    }

    // Simulate processing steps
    updateProgress(10, "running")
    await new Promise(resolve => setTimeout(resolve, 800))
    
    updateProgress(30)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    updateProgress(60)
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    updateProgress(85)
    await new Promise(resolve => setTimeout(resolve, 800))

    // Generate mock output based on agent and task type
    const agent = agents.find(a => a.id === task.agentId)
    let output = ""

    switch (task.type) {
      case "product_analysis":
        output = `**${agent?.name} Analysis Report**

**Product Classification:** ${productInput.category}
**Compliance Requirements:** ${productInput.complianceRequired.join(", ")}

**Key Findings:**
${agent?.id === "medical-expert" ? `
- Medical Device Class: Class IIa (moderate risk)
- MDR Article 51 applies - Notified Body involvement required
- Essential Requirements: Annex I (safety and performance)
- Clinical evidence required per Annex XIV
- EUDAMED registration mandatory
- Post-market surveillance plan needed
` : agent?.id === "automotive-expert" ? `
- ECE R10 electromagnetic compatibility compliance required
- REACH regulation assessment completed - no SVHCs detected
- RoHS directive compliance verified
- End-of-life vehicle directive considerations
- Type approval process required for automotive use
- Environmental testing per ISO 16750 recommended
` : `
- Product meets IEC standards for category
- IP rating assessment: IP67 suitable for application
- Temperature range: -40°C to +85°C operational
- Signal integrity analysis completed
- Material safety assessment passed
- UL listing requirements identified
`}

**Recommended Actions:**
1. Obtain necessary certifications
2. Prepare technical documentation
3. Conduct required testing
4. Update product labeling
5. Implement quality management system

**Estimated Timeline:** 3-6 months for full compliance
**Estimated Cost:** €15,000 - €35,000`
        break

      case "compliance_check":
        output = `**Compliance Assessment Report**

**Standards Checked:** ${productInput.complianceRequired.join(", ")}
**Assessment Date:** ${new Date().toLocaleDateString()}

**Compliance Status:**
${productInput.complianceRequired.map(std => 
  `- ${std}: ✅ Compliant (98% confidence)`
).join("\n")}

**Risk Assessment:**
- Overall Risk Level: Low to Moderate
- Critical Non-conformities: 0
- Minor Observations: 2
- Recommendations: 5

**Next Steps:**
1. Address minor observations
2. Schedule periodic review
3. Update documentation
4. Monitor regulatory changes`
        break

      case "content_generation":
        output = `**Generated Product Content**

**Product Title (DE):** ${productInput.name} - Hochwertige ${productInput.category} für medizinische/automotive Anwendungen

**Description (DE):**
${agent?.id === "medical-expert" ? `
Professionelle medizinische Ausrüstung nach höchsten Qualitätsstandards. MDR-konform und CE-zertifiziert für den Einsatz in medizinischen Einrichtungen. Entwickelt in Zusammenarbeit mit führenden deutschen Medizintechnik-Experten.

**Technische Spezifikationen:**
- Medizinprodukte-Klassifikation: Klasse IIa
- Sterilisation: Dampfsterilisation bei 134°C
- Biokompatibilität: ISO 10993 getestet
- Elektromagnetische Verträglichkeit: IEC 60601-1-2
` : `
Premium automotive components engineered for reliability and performance. ECE-approved and RoHS compliant for European markets. Manufactured to ISO/TS 16949 standards with comprehensive quality assurance.

**Technical Specifications:**
- Operating Temperature: -40°C to +125°C
- Vibration Resistance: ISO 16750-3 compliant
- EMC Performance: ECE R10 certified
- Material: High-grade automotive plastics
`}

**SEO Keywords:** ${productInput.complianceRequired.join(", ")}, ${productInput.category}, German quality, EU compliant

**Target Markets:** ${productInput.targetMarkets.join(", ").toUpperCase()}`
        break

      case "translation":
        output = `**Multi-Language Content Package**

**German (DE):**
${productInput.name} - Hochpräzise ${productInput.category} für professionelle Anwendungen

**English (EN):**
${productInput.name} - High-precision ${productInput.category} for professional applications

**Chinese (ZH):**
${productInput.name} - 专业应用的高精度${productInput.category === "medical-devices" ? "医疗设备" : "汽车零件"}

**French (FR):**
${productInput.name} - ${productInput.category === "medical-devices" ? "Dispositifs médicaux" : "Composants automobiles"} de haute précision pour applications professionnelles

**Localization Notes:**
- German: Emphasis on precision and quality standards
- Chinese: Focus on professional grade and reliability  
- French: Highlight compliance and European standards
- All translations maintain technical accuracy and regulatory compliance`
        break
    }

    updateProgress(100, "completed")
    
    setTasks(currentTasks =>
      currentTasks.map(t =>
        t.id === task.id 
          ? { ...t, output, completedAt: new Date().toISOString() }
          : t
      )
    )

    toast.success(`${agent?.name} completed ${task.type.replace('_', ' ')}`)
  }

  const handleRunTask = (taskType: AgentTask['type']) => {
    if (!productInput.name || !productInput.description) {
      toast.error("Please fill in product name and description")
      return
    }

    const newTask: AgentTask = {
      id: generateTaskId(),
      agentId: selectedAgent,
      type: taskType,
      input: JSON.stringify(productInput),
      status: "pending",
      progress: 0,
      createdAt: new Date().toISOString()
    }

    setTasks(currentTasks => [newTask, ...currentTasks])
    
    // Start processing after a brief delay
    setTimeout(() => {
      simulateAgentProcessing(newTask)
    }, 500)
  }

  const getTaskStatusIcon = (status: AgentTask['status']) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />
      case "running": return <Play className="h-4 w-4 text-blue-500 animate-spin" />
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error": return <Warning className="h-4 w-4 text-red-500" />
    }
  }

  const selectedAgentInfo = agents.find(a => a.id === selectedAgent)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t("Specialized Agents Demo")}</h2>
        <p className="text-muted-foreground">
          {t("Test specialized AI agents with your product data")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t("Product Information")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="agent-select">{t("Select Specialized Agent")}</Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => {
                    const IconComponent = agent.icon
                    return (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {agent.name}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {selectedAgentInfo && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedAgentInfo.specialization}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="product-name">{t("Product Name")}</Label>
              <Input
                id="product-name"
                value={productInput.name}
                onChange={(e) => setProductInput({...productInput, name: e.target.value})}
                placeholder="e.g., Precision Medical Sensor XR-2000"
              />
            </div>

            <div>
              <Label htmlFor="category">{t("Category")}</Label>
              <Select 
                value={productInput.category} 
                onValueChange={(value) => setProductInput({...productInput, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical-devices">Medical Devices</SelectItem>
                  <SelectItem value="automotive-parts">Automotive Parts</SelectItem>
                  <SelectItem value="connectors">Connectors</SelectItem>
                  <SelectItem value="motors">Motors & Sensors</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">{t("Product Description")}</Label>
              <Textarea
                id="description"
                value={productInput.description}
                onChange={(e) => setProductInput({...productInput, description: e.target.value})}
                placeholder="Detailed product description including key features and applications..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="specifications">{t("Technical Specifications")}</Label>
              <Textarea
                id="specifications"
                value={productInput.specifications}
                onChange={(e) => setProductInput({...productInput, specifications: e.target.value})}
                placeholder="Technical specifications, dimensions, performance characteristics..."
                rows={3}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => handleRunTask("product_analysis")}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                {t("Analyze Product")}
              </Button>
              
              <Button 
                onClick={() => handleRunTask("compliance_check")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                {t("Check Compliance")}
              </Button>
              
              <Button 
                onClick={() => handleRunTask("content_generation")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                {t("Generate Content")}
              </Button>
              
              <Button 
                onClick={() => handleRunTask("translation")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                {t("Multi-Language")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Agent Tasks & Results")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>{t("No tasks yet. Run an agent task to see results.")}</p>
                </div>
              ) : (
                tasks.map((task) => {
                  const agent = agents.find(a => a.id === task.agentId)
                  const IconComponent = agent?.icon || Brain
                  
                  return (
                    <Card key={task.id} className="border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span className="font-medium text-sm">
                              {agent?.name} - {task.type.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTaskStatusIcon(task.status)}
                            <Badge variant="outline" className="text-xs">
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        {task.status === "running" && (
                          <Progress value={task.progress} className="h-2" />
                        )}
                      </CardHeader>
                      
                      {task.output && (
                        <CardContent className="pt-0">
                          <div className="bg-muted/50 rounded-lg p-3 text-sm">
                            <pre className="whitespace-pre-wrap font-sans">
                              {task.output}
                            </pre>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}