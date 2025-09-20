import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, TrendUp, Globe, Heart } from "@phosphor-icons/react"
import { useLanguage } from "@/components/LanguageContext"

const teamMembers = [
  {
    name: "Richard Zhang",
    position: "CFO of GL China",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Maria Schmidt",
    position: "Managing Director Germany",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Li Wei",
    position: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Thomas Mueller",
    position: "Business Development",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
  }
]

const offices = [
  { city: "Shenzhen", country: "China", type: "headquarters" },
  { city: "Shanghai", country: "China", type: "office" },
  { city: "Changsha", country: "China", type: "office" },
  { city: "Hong Kong", country: "China", type: "office" },
  { city: "Cologne", country: "Germany", type: "branch" }
]

const warehouses = [
  { city: "Shenzhen", country: "China" },
  { city: "Shanghai", country: "China" },
  { city: "Hong Kong", country: "China" }
]

export function AboutPage() {
  const { language } = useLanguage()

  const translations = {
    en: {
      title: "About Good-Link Germany",
      subtitle: "Bridging Europe and China since 2020",
      germanBranch: "German Branch",
      germanBranchDesc: "Good-Link Germany GmbH is located in the heart of Europe in Cologne, Germany. We are the first Good-Link branch out of China, founded in 2020 in cooperation with German shareholders and management.",
      ourGoal: "Our Goal",
      goalDesc: "Good-Link Germany will become the best channel for European companies who wish to cooperate with partners in China.",
      chinaOperations: "Good-Link China",
      chinaDesc: "Founded in 2004, Good-Link China operates across four cities in China with a team of 78 employees. Specialized in the automotive and medical sectors, we are proud of our established and extensive network of suppliers and customers.",
      revenue2023: "2023 Revenue: €93 Million",
      businessCulture: "Our Business Culture",
      culture1: "Good personal relationships and a reliable way of working characterises our approach to our partners",
      culture2: "Realistic and honest communication ensure an effective and trustful cooperation",
      culture3: "We are aware of cultural differences and enjoy building bridges to cross them",
      offices: "Our Offices",
      warehouses: "Warehouses",
      medicalFocus: "Medical Division",
      medicalDesc: "Specialized medical technology divisions in Shenzhen and Shanghai",
      ourTeam: "Our Team",
      teamDesc: "Meet the professionals driving our success across Europe and China",
      founded: "Founded",
      employees: "Employees",
      cities: "Cities",
      sectors: "Sectors"
    },
    de: {
      title: "Über Good-Link Germany",
      subtitle: "Brücke zwischen Europa und China seit 2020",
      germanBranch: "Deutsche Niederlassung",
      germanBranchDesc: "Die Good-Link Germany GmbH befindet sich im Herzen Europas in Köln, Deutschland. Wir sind die erste Good-Link-Niederlassung aus China, gegründet 2020 in Zusammenarbeit mit deutschen Aktionären und Management.",
      ourGoal: "Unser Ziel",
      goalDesc: "Good-Link Germany wird der beste Kanal für europäische Unternehmen, die mit Partnern in China zusammenarbeiten möchten.",
      chinaOperations: "Good-Link China",
      chinaDesc: "Good-Link China wurde 2004 gegründet und ist in vier Städten in China mit einem Team von 78 Mitarbeitern tätig. Spezialisiert auf die Automobil- und Medizinbranche sind wir stolz auf unser etabliertes und umfangreiches Netzwerk von Lieferanten und Kunden.",
      revenue2023: "Umsatz 2023: 93 Millionen €",
      businessCulture: "Unsere Unternehmenskultur",
      culture1: "Gute persönliche Beziehungen und eine zuverlässige Arbeitsweise kennzeichnen unseren Ansatz zu unseren Partnern",
      culture2: "Realistische und ehrliche Kommunikation gewährleistet eine effektive und vertrauensvolle Zusammenarbeit",
      culture3: "Wir sind uns kultureller Unterschiede bewusst und freuen uns darauf, Brücken zu bauen, um sie zu überwinden",
      offices: "Unsere Büros",
      warehouses: "Lagerhäuser",
      medicalFocus: "Medizinische Abteilung",
      medicalDesc: "Spezialisierte Medizintechnik-Abteilungen in Shenzhen und Shanghai",
      ourTeam: "Unser Team",
      teamDesc: "Lernen Sie die Fachkräfte kennen, die unseren Erfolg in Europa und China vorantreiben",
      founded: "Gegründet",
      employees: "Mitarbeiter",
      cities: "Städte",
      sectors: "Branchen"
    },
    zh: {
      title: "关于好联德国",
      subtitle: "自2020年以来连接欧洲和中国",
      germanBranch: "德国分公司",
      germanBranchDesc: "好联德国有限公司位于欧洲心脏地带的德国科隆。我们是好联从中国走出的第一个分公司，成立于2020年，与德国股东和管理层合作。",
      ourGoal: "我们的目标",
      goalDesc: "好联德国将成为希望与中国合作伙伴合作的欧洲公司的最佳渠道。",
      chinaOperations: "好联中国",
      chinaDesc: "好联中国成立于2004年，在中国四个城市运营，拥有78名员工团队。专注于汽车和医疗行业，我们为我们建立的广泛供应商和客户网络感到自豪。",
      revenue2023: "2023年收入：9300万欧元",
      businessCulture: "我们的企业文化",
      culture1: "良好的个人关系和可靠的工作方式是我们对待合作伙伴的方法特色",
      culture2: "现实和诚实的沟通确保有效和信任的合作",
      culture3: "我们意识到文化差异，并乐于搭建桥梁来跨越它们",
      offices: "我们的办公室",
      warehouses: "仓库",
      medicalFocus: "医疗部门",
      medicalDesc: "深圳和上海的专业医疗技术部门",
      ourTeam: "我们的团队",
      teamDesc: "认识推动我们在欧洲和中国成功的专业人士",
      founded: "成立",
      employees: "员工",
      cities: "城市",
      sectors: "行业"
    },
    fr: {
      title: "À propos de Good-Link Germany",
      subtitle: "Reliant l'Europe et la Chine depuis 2020",
      germanBranch: "Filiale Allemande",
      germanBranchDesc: "Good-Link Germany GmbH est située au cœur de l'Europe à Cologne, en Allemagne. Nous sommes la première filiale Good-Link sortie de Chine, fondée en 2020 en coopération avec des actionnaires et une direction allemands.",
      ourGoal: "Notre Objectif",
      goalDesc: "Good-Link Germany deviendra le meilleur canal pour les entreprises européennes qui souhaitent coopérer avec des partenaires en Chine.",
      chinaOperations: "Good-Link Chine",
      chinaDesc: "Fondée en 2004, Good-Link Chine opère dans quatre villes en Chine avec une équipe de 78 employés. Spécialisés dans les secteurs automobile et médical, nous sommes fiers de notre réseau établi et étendu de fournisseurs et clients.",
      revenue2023: "Chiffre d'affaires 2023 : 93 millions €",
      businessCulture: "Notre Culture d'Entreprise",
      culture1: "De bonnes relations personnelles et une façon de travailler fiable caractérisent notre approche avec nos partenaires",
      culture2: "Une communication réaliste et honnête assure une coopération efficace et de confiance",
      culture3: "Nous sommes conscients des différences culturelles et aimons construire des ponts pour les franchir",
      offices: "Nos Bureaux",
      warehouses: "Entrepôts",
      medicalFocus: "Division Médicale",
      medicalDesc: "Divisions de technologie médicale spécialisées à Shenzhen et Shanghai",
      ourTeam: "Notre Équipe",
      teamDesc: "Rencontrez les professionnels qui conduisent notre succès en Europe et en Chine",
      founded: "Fondée",
      employees: "Employés",
      cities: "Villes",
      sectors: "Secteurs"
    }
  }

  const text = translations[language] || translations.en

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 p-8 rounded-full">
              <Globe className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {text.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">2004</div>
              <div className="text-sm text-muted-foreground">{text.founded}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">78</div>
              <div className="text-sm text-muted-foreground">{text.employees}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">{text.cities}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">€93M</div>
              <div className="text-sm text-muted-foreground">2023</div>
            </CardContent>
          </Card>
        </div>

        {/* German Branch Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    {text.germanBranch}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">{text.ourGoal}</h2>
                  <p className="text-muted-foreground mb-6">
                    {text.germanBranchDesc}
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                    <p className="font-medium text-primary">
                      {text.goalDesc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop"
                  alt="Cologne Germany"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="mt-4 text-center">
                  <p className="font-semibold">Cologne, Germany</p>
                  <p className="text-sm text-muted-foreground">European Headquarters</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* China Operations */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-8 rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1529999395901-98ba5f88b42b?w=500&h=300&fit=crop"
                  alt="China Operations"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-semibold text-2xl text-primary">4</p>
                    <p className="text-sm text-muted-foreground">Cities</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl text-accent">78</p>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    {text.chinaOperations}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">{text.revenue2023}</h2>
                  <p className="text-muted-foreground mb-6">
                    {text.chinaDesc}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">Automotive</Badge>
                    <Badge variant="outline">Medical</Badge>
                    <Badge variant="outline">Electronics</Badge>
                    <Badge variant="outline">Components</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Culture */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold">{text.businessCulture}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-sm leading-relaxed">{text.culture1}</p>
              </div>
              <div className="text-center p-6 bg-accent/5 rounded-lg">
                <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
                <p className="text-sm leading-relaxed">{text.culture2}</p>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-sm leading-relaxed">{text.culture3}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offices and Warehouses */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                {text.offices}
              </h3>
              <div className="space-y-3">
                {offices.map((office, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{office.city}</p>
                      <p className="text-sm text-muted-foreground">{office.country}</p>
                    </div>
                    <Badge variant={office.type === 'headquarters' ? 'default' : 'secondary'}>
                      {office.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendUp className="h-5 w-5 mr-2 text-primary" />
                {text.warehouses}
              </h3>
              <div className="space-y-3">
                {warehouses.map((warehouse, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{warehouse.city}</p>
                      <p className="text-sm text-muted-foreground">{warehouse.country}</p>
                    </div>
                    <Badge variant="outline">Warehouse</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                <p className="text-sm font-medium text-accent">{text.medicalFocus}</p>
                <p className="text-xs text-muted-foreground mt-1">{text.medicalDesc}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{text.ourTeam}</h2>
              <p className="text-muted-foreground">{text.teamDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.position}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}