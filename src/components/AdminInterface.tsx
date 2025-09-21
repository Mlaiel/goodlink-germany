import React from "react"
import { useKV } from "@github/spark/hooks"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"
import { AdminPanel } from "@/components/AdminPanel"
import { 
  CheckCircle,
  ShieldCheck,
  UserCircle,
  Storefront
} from "@phosphor-icons/react"

interface AdminInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function AdminInterface({ onSwitchMode }: AdminInterfaceProps) {
  const { t } = useLanguage()

  const renderModeSelector = () => (
    <div className="flex items-center gap-2">
      <button 
        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium shadow-sm"
      >
        <ShieldCheck className="h-4 w-4" />
        {t('nav.admin')} Panel
      </button>
      <button 
        onClick={() => onSwitchMode("client")}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <UserCircle className="h-4 w-4" />
        {t('nav.client')} Interface
      </button>
      <button 
        onClick={() => onSwitchMode("shop")}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Storefront className="h-4 w-4" />
        {t('nav.shop')} Interface
      </button>
      <LanguageSelector />
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Goodlink Germany
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('admin.systemManagementDesc')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {renderModeSelector()}
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                {t('system.operational')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <AdminPanel />
      </main>
    </div>
  )
}