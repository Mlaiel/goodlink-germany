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
  Brain,
  Sparkle
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
  realAI?: boolean
}

interface ProductInput {
  name: string
  category: string
  description: string
  specifications: string
  targetMarkets: string[]
  complianceRequired: string[]
}

export function AdvancedSpecializedAgentDemo() {
  const { t } = useLanguage()
  const [tasks, setTasks] = useState<AgentTask[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string>("medical-expert")
  const [useRealAI, setUseRealAI] = useState(false)
  const [productInput, setProductInput] = useState<ProductInput>({
    name: "Precision Cardiac Monitor XR-2000",
    category: "medical-devices",
    description: "High-precision cardiac monitoring device for hospital use with advanced ECG capabilities and real-time arrhythmia detection",
    specifications: "12-lead ECG, 0.5-150 Hz frequency range, 16-bit ADC, 1000 Hz sampling rate, Touch screen interface, Wireless connectivity",
    targetMarkets: ["de", "eu"],
    complianceRequired: ["MDR", "CE", "ISO13485"]
  })

  const agents = [
    {
      id: "medical-expert",
      name: "Medical Device Expert",
      icon: Stethoscope,
      specialization: "Medical devices, MDR compliance, CE marking, clinical evaluation",
      categories: ["medical-devices", "diagnostic-equipment", "surgical-instruments"],
      expertise: ["MDR Article 51", "Clinical Evidence", "Risk Management ISO14971", "EUDAMED Registration"],
      prompt: "You are a specialized medical device regulatory expert with deep knowledge of EU MDR, FDA regulations, ISO standards, and clinical evaluation requirements."
    },
    {
      id: "automotive-expert", 
      name: "Automotive Component Expert",
      icon: Car,
      specialization: "Automotive parts, ECE regulations, EMC testing, IATF 16949",
      categories: ["automotive-parts", "electronic-components", "mechanical-parts"],
      expertise: ["ECE R10", "REACH Compliance", "End-of-Life Vehicle", "PPAP Process"],
      prompt: "You are an automotive industry specialist with expertise in ECE regulations, IATF 16949, REACH compliance, and automotive testing standards."
    },
    {
      id: "connector-expert",
      name: "Connector & Cable Specialist", 
      icon: Plug,
      specialization: "Connectors, cables, IEC standards, IP ratings, signal integrity",
      categories: ["connectors", "cables", "wiring-harnesses"],
      expertise: ["IEC 61076", "IP Rating Tests", "Signal Integrity", "RoHS Compliance"],
      prompt: "You are a connector and cable systems expert with deep knowledge of IEC standards, IP rating classifications, and electrical performance testing."
    },
    {
      id: "motor-expert",
      name: "Motor & Sensor Expert",
      icon: Gear,
      specialization: "Motors, sensors, efficiency standards, calibration procedures",
      categories: ["motors", "sensors", "actuators", "control-systems"],
      expertise: ["IEC 60034", "Sensor Calibration", "Energy Efficiency", "EMC Testing"],
      prompt: "You are a motor and sensor technology specialist with expertise in IEC motor standards, sensor calibration procedures, and electromagnetic compatibility."
    }
  ]

  const generateTaskId = () => `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const runRealAITask = async (task: AgentTask) => {
    const agent = agents.find(a => a.id === task.agentId)
    if (!agent) return

    const updateProgress = (progress: number, status?: AgentTask['status']) => {
      setTasks(currentTasks =>
        currentTasks.map(t =>
          t.id === task.id ? { ...t, progress, status: status || t.status } : t
        )
      )
    }

    try {
      updateProgress(10, "running")

      let systemPrompt = agent.prompt
      let userPrompt = ""

      switch (task.type) {
        case "product_analysis":
          userPrompt = `Analyze this product for regulatory compliance and market readiness:

Product: ${productInput.name}
Category: ${productInput.category}
Description: ${productInput.description}
Specifications: ${productInput.specifications}
Target Markets: ${productInput.targetMarkets.join(", ")}
Required Compliance: ${productInput.complianceRequired.join(", ")}

Please provide:
1. Regulatory classification and requirements
2. Required certifications and testing
3. Compliance timeline and costs
4. Risk assessment
5. Recommended next steps

Focus on ${agent.specialization} and provide specific, actionable guidance.`
          break

        case "compliance_check":
          userPrompt = `Perform a detailed compliance assessment for:

Product: ${productInput.name}
Category: ${productInput.category}
Standards Required: ${productInput.complianceRequired.join(", ")}
Target Markets: ${productInput.targetMarkets.join(", ")}

Evaluate compliance status for each required standard and identify any gaps or issues. Provide specific recommendations for achieving full compliance.`
          break

        case "content_generation":
          userPrompt = `Generate professional marketing content for this product:

Product: ${productInput.name}
Category: ${productInput.category}
Description: ${productInput.description}
Specifications: ${productInput.specifications}
Target Markets: ${productInput.targetMarkets.join(", ")}

Create:
1. Product title optimized for ${productInput.targetMarkets.join("/")} markets
2. Professional product description 
3. Key features and benefits
4. Technical specifications summary
5. Compliance certifications highlight
6. SEO keywords

Ensure all content reflects ${agent.specialization} expertise and regulatory requirements.`
          break

        case "translation":
          userPrompt = `Provide professional translations for this product content:

Product: ${productInput.name}
Description: ${productInput.description}

Translate to German, Chinese, and French with:
1. Technical accuracy maintained
2. Regulatory terminology correctly used
3. Cultural adaptation for each market
4. Professional B2B tone

Include localization notes for each language considering ${agent.specialization} requirements.`
          break
      }

      updateProgress(30)

      const fullPrompt = `${systemPrompt}\n\n${userPrompt}`
      const response = await window.spark.llm(fullPrompt, "gpt-4")

      updateProgress(100, "completed")

      setTasks(currentTasks =>
        currentTasks.map(t =>
          t.id === task.id 
            ? { ...t, output: response, completedAt: new Date().toISOString(), realAI: true }
            : t
        )
      )

      toast.success(`${agent.name} completed analysis using real AI`)

    } catch (error) {
      console.error("AI task error:", error)
      updateProgress(0, "error")
      setTasks(currentTasks =>
        currentTasks.map(t =>
          t.id === task.id 
            ? { ...t, output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, completedAt: new Date().toISOString() }
            : t
        )
      )
      toast.error("AI task failed")
    }
  }

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
- Risk management per ISO 14971 required
- Electrical safety per IEC 60601-1 mandatory
` : agent?.id === "automotive-expert" ? `
- ECE R10 electromagnetic compatibility compliance required
- REACH regulation assessment completed - no SVHCs detected
- RoHS directive compliance verified
- End-of-life vehicle directive considerations
- Type approval process required for automotive use
- Environmental testing per ISO 16750 recommended
- IATF 16949 quality management system needed
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
          ? { ...t, output, completedAt: new Date().toISOString(), realAI: false }
          : t
      )
    )

    toast.success(`${agent?.name} completed ${task.type.replace('_', ' ')} (simulated)`)
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
      if (useRealAI && typeof window !== 'undefined' && window.spark && typeof window.spark.llm === 'function') {
        runRealAITask(newTask)
      } else {
        simulateAgentProcessing(newTask)
      }
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
        <h2 className="text-2xl font-bold mb-2">{t("Advanced Specialized Agents Demo")}</h2>
        <p className="text-muted-foreground">
          {t("Test specialized AI agents with real Spark LLM integration")}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="use-real-ai"
              checked={useRealAI}
              onChange={(e) => setUseRealAI(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="use-real-ai" className="text-sm font-medium">
              Use Real AI (Spark LLM)
            </Label>
            {useRealAI && <Sparkle className="h-4 w-4 text-yellow-500" />}
          </div>
          <Badge variant={useRealAI ? "default" : "secondary"}>
            {useRealAI ? "Live AI" : "Simulated"}
          </Badge>
        </div>
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
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {selectedAgentInfo.specialization}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedAgentInfo.expertise.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
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
                disabled={tasks.some(t => t.status === "running")}
              >
                <Brain className="h-4 w-4" />
                {t("Analyze Product")}
              </Button>
              
              <Button 
                onClick={() => handleRunTask("compliance_check")}
                variant="outline"
                className="flex items-center gap-2"
                disabled={tasks.some(t => t.status === "running")}
              >
                <CheckCircle className="h-4 w-4" />
                {t("Check Compliance")}
              </Button>
              
              <Button 
                onClick={() => handleRunTask("content_generation")}
                variant="outline"
                className="flex items-center gap-2"
                disabled={tasks.some(t => t.status === "running")}
              >
                <FileText className="h-4 w-4" />
                {t("Generate Content")}
              </Button>
              
              <Button 
                onClick={() => handleRunTask("translation")}
                variant="outline"
                className="flex items-center gap-2"
                disabled={tasks.some(t => t.status === "running")}
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
            <CardTitle className="flex items-center justify-between">
              <span>{t("Agent Tasks & Results")}</span>
              {tasks.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setTasks([])}
                >
                  Clear All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
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
                            {task.realAI && <Sparkle className="h-3 w-3 text-yellow-500" />}
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
                          <div className="bg-muted/50 rounded-lg p-3 text-sm max-h-48 overflow-y-auto">
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