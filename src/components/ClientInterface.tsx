import React from "react"
import { CustomerWebsite } from "@/components/client/CustomerWebsite"

interface ClientInterfaceProps {
  onSwitchMode: (mode: "admin" | "client" | "shop") => void
}

export function ClientInterface({ onSwitchMode }: ClientInterfaceProps) {
  return <CustomerWebsite onSwitchMode={onSwitchMode} />
}