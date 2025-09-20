import React from "react"
import { useLanguage } from "@/components/LanguageContext"

import { Heart, Globe, Shield } from "@phosphor-icons/react"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-muted/30 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-800">
                  Goodlink
                </div>
                <div className="text-xs font-semibold text-slate-600 tracking-wider">
                  GERMANY
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  Goodlink Germany
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("Premium medical devices and automotive components")}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              {t("Your trusted bridge between Europe and China since 2020. Specializing in medical-grade quality and automotive excellence.")}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{t("Global Reach")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>{t("EU Compliant")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{t("Made with care")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">{t("Quick Links")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("About Us")}</li>
              <li>{t("Products")}</li>
              <li>{t("Blog")}</li>
              <li>{t("Contact")}</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">{t("Support")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("Help Center")}</li>
              <li>{t("Privacy Policy")}</li>
              <li>{t("Terms of Service")}</li>
              <li>{t("Shipping Info")}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2024 Goodlink Germany GmbH. {t("All rights reserved.")}</p>
          <p>{t("Designed & Built with")} <Heart className="h-4 w-4 inline text-red-500" /> {t("in Germany")}</p>
        </div>
      </div>
    </footer>
  )
}