import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TestErrorComponent() {
  try {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Component</CardTitle>
        </CardHeader>
        <CardContent>
          <p>If you can see this, basic components are working.</p>
        </CardContent>
      </Card>
    )
  } catch (error) {
    console.error('TestErrorComponent error:', error)
    return <div>Error in test component</div>
  }
}