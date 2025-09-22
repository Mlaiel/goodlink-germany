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
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">
                  Goodlink
                </div>
                <div className="text-sm font-semibold text-slate-600 tracking-wider">
                  GERMANY
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">2004</div>
              <div className="text-sm text-muted-foreground">{t('about.founded')}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">78</div>
              <div className="text-sm text-muted-foreground">{t('about.employees')}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">{t('about.cities')}</div>
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
                    {t('about.germanBranch')}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">{t('about.ourGoal')}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t('about.germanBranchDesc')}
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                    <p className="font-medium text-primary">
                      {t('about.goalDesc')}
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
                    {t('about.chinaOperations')}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">{t('about.revenue2023')}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t('about.chinaDesc')}
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
              <h2 className="text-3xl font-bold">{t('about.businessCulture')}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-sm leading-relaxed">{t('about.culture1')}</p>
              </div>
              <div className="text-center p-6 bg-accent/5 rounded-lg">
                <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
                <p className="text-sm leading-relaxed">{t('about.culture2')}</p>
              </div>
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
                <p className="text-sm leading-relaxed">{t('about.culture3')}</p>
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
                {t('about.offices')}
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
                {t('about.warehouses')}
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
                <p className="text-sm font-medium text-accent">{t('about.medicalFocus')}</p>
                <p className="text-xs text-muted-foreground mt-1">{t('about.medicalDesc')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section - Enhanced Modern Design */}
        <Card className="overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          <CardContent className="p-0">
            {/* Section Header */}
            <div className="text-center py-12 px-8 bg-gradient-to-r from-primary/5 via-background to-accent/5">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mb-6 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                  {t('about.ourTeam')}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t('about.teamDesc')}
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"></div>
              </div>
            </div>

            {/* Team Grid */}
            <div className="px-8 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {teamMembers.map((member, index) => (
                  <div key={index} className="group relative">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"></div>
                    
                    <div className="relative text-center p-6 rounded-2xl transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                      {/* Profile Image with Multiple Layers */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-10 scale-105 group-hover:scale-115 transition-transform duration-700 delay-100"></div>
                        <div className="relative">
                          <img 
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full mx-auto shadow-xl ring-4 ring-white group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                          />
                          {/* Floating Badge */}
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="space-y-3">
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {member.name}
                        </h4>
                        <div className="relative">
                          <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                            {member.position}
                          </p>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500"></div>
                        </div>
                        
                        {/* Social Links or Contact (simulate) */}
                        <div className="pt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-3 h-3 bg-white rounded-sm"></div>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="w-3 h-3 bg-white rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary/60 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent/40 rounded-full group-hover:bg-accent/80 transition-colors duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-border/50">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Join Our Growing Team
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for talented individuals to join our mission of connecting Europe and China through innovative business solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    View Open Positions
                  </button>
                  <button className="px-8 py-3 border border-border rounded-full font-medium hover:bg-muted transition-colors duration-300">
                    Contact HR Team
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}