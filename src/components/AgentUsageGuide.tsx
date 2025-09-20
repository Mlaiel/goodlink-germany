import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  PlayCircle,
  Gear as Settings,
  Monitor,
  CheckCircle,
  Warning as AlertTriangle,
  TrendUp,
  Users,
  ArrowRight,
  Lightbulb,
  Target,
  Gear,
  Activity
} from "@phosphor-icons/react"

export function AgentUsageGuide() {
  return (
    <div className="space-y-6">
      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get started with AI agents in 4 simple steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-medium mb-2">Select Agent</h3>
              <p className="text-sm text-muted-foreground">
                Choose the AI agent that matches your business need
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-medium mb-2">Configure Settings</h3>
              <p className="text-sm text-muted-foreground">
                Adjust parameters to match your business requirements
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-medium mb-2">Test & Demo</h3>
              <p className="text-sm text-muted-foreground">
                Run demos to understand how the agent processes your data
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-medium mb-2">Deploy & Monitor</h3>
              <p className="text-sm text-muted-foreground">
                Activate the agent and monitor its performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Management Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Agent Management Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Start with Conservative Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Begin with lower automation levels and gradually increase as you gain confidence in the agent's performance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Monitor Performance Regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Check agent performance metrics daily during the first week, then weekly for ongoing optimization.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Use A/B Testing</h4>
                <p className="text-sm text-muted-foreground">
                  Test different configurations on small product sets before applying to your entire catalog.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Set Appropriate Limits</h4>
                <p className="text-sm text-muted-foreground">
                  Configure safety limits for pricing, inventory changes, and content generation to prevent unexpected outcomes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gear className="h-5 w-5" />
            Configuration Workflow
          </CardTitle>
          <CardDescription>
            Step-by-step process for configuring each agent type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Listing Agent Workflow */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Badge variant="outline">Listing Agent</Badge>
                Configuration Steps
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>1. Select target marketplaces (Amazon, eBay, etc.)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>2. Choose content languages (DE, EN, ZH, FR)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>3. Set SEO optimization level (recommended: 80-90%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>4. Enable compliance checking for medical/automotive</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>5. Test with sample products before bulk generation</span>
                </div>
              </div>
            </div>

            {/* Pricing Agent Workflow */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Badge variant="outline">Pricing Agent</Badge>
                Configuration Steps
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>1. Set minimum margin thresholds (recommended: 15-20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>2. Configure maximum price change limits (5-15%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>3. Choose monitoring frequency (hourly for competitive markets)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>4. Enable Buy Box optimization for Amazon</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>5. Set up price alerts and notifications</span>
                </div>
              </div>
            </div>

            {/* Social Media Agent Workflow */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Badge variant="outline">Social Media Agent</Badge>
                Configuration Steps
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>1. Connect social media accounts (LinkedIn, Instagram, Facebook)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>2. Set posting frequency (recommended: 1-2 posts/day)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>3. Choose content tone (professional for B2B, friendly for B2C)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>4. Configure hashtag strategy (5-10 hashtags per post)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>5. Set up engagement automation rules</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendUp className="h-5 w-5" />
            Performance Optimization
          </CardTitle>
          <CardDescription>
            Tips to maximize agent effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-green-600">✓ Do's</h4>
              <div className="space-y-2 text-sm">
                <div>• Provide high-quality training data</div>
                <div>• Update product catalogs regularly</div>
                <div>• Monitor competitor activities</div>
                <div>• Use seasonal adjustment settings</div>
                <div>• Review performance reports weekly</div>
                <div>• Test new features on small sets first</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-red-600">✗ Don'ts</h4>
              <div className="space-y-2 text-sm">
                <div>• Set overly aggressive pricing rules</div>
                <div>• Ignore compliance requirements</div>
                <div>• Use outdated product information</div>
                <div>• Skip testing before full deployment</div>
                <div>• Set unrealistic performance expectations</div>
                <div>• Forget to backup configurations</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Issues & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h4 className="font-medium text-orange-800">Agent Not Generating Expected Results</h4>
              <p className="text-sm text-orange-700 mt-1">
                <strong>Solution:</strong> Check input data quality, verify configuration settings match your requirements, 
                and ensure the agent has sufficient training data for your product category.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <h4 className="font-medium text-red-800">Performance Issues or Slow Processing</h4>
              <p className="text-sm text-red-700 mt-1">
                <strong>Solution:</strong> Reduce batch sizes, check resource allocation settings, 
                and consider upgrading to higher performance tiers for large catalogs.
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-medium text-blue-800">Compliance Violations or Policy Issues</h4>
              <p className="text-sm text-blue-700 mt-1">
                <strong>Solution:</strong> Update compliance rules, review marketplace policies, 
                and enable stricter content filtering for regulated product categories.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-medium text-green-800">Integration or API Connection Problems</h4>
              <p className="text-sm text-green-700 mt-1">
                <strong>Solution:</strong> Verify API credentials, check marketplace permissions, 
                and ensure all required scopes are enabled for your integrations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support & Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Support & Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Monitor className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h4 className="font-medium">Live Monitoring</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Real-time agent performance dashboard
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Open Dashboard
              </Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h4 className="font-medium">Expert Support</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Contact our AI specialists for help
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Get Support
              </Button>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h4 className="font-medium">Performance Reports</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Detailed analytics and insights
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                View Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}