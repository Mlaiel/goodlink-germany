import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "@phosphor-icons/react"

export function ComponentTest() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Component Functionality Test
          </CardTitle>
          <CardDescription>Testing key UI components to ensure proper functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Tabs Component */}
          <div>
            <h3 className="font-semibold mb-4">Tabs Component Test</h3>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p>Content for Tab 1 - Tabs are working correctly!</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p>Content for Tab 2 - Navigation is smooth!</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p>Content for Tab 3 - No RovingFocusGroup errors!</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Test Button Component */}
          <div>
            <h3 className="font-semibold mb-4">Button Component Test</h3>
            <div className="flex gap-2">
              <Button>Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="secondary">Secondary Button</Button>
            </div>
          </div>

          {/* Test Badge Component */}
          <div>
            <h3 className="font-semibold mb-4">Badge Component Test</h3>
            <div className="flex gap-2">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}