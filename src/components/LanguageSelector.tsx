import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Globe } from '@phosphor-icons/react'
import { useLanguage } from './LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'en' as const, name: t('lang.english'), flag: '🇺🇸' },
    { code: 'de' as const, name: t('lang.german'), flag: '🇩🇪' },
    { code: 'zh' as const, name: t('lang.chinese'), flag: '🇨🇳' },
    { code: 'fr' as const, name: t('lang.french'), flag: '🇫🇷' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline">{currentLanguage?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`gap-2 ${language === lang.code ? 'bg-accent' : ''}`}
          >
            <span className="text-lg">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}