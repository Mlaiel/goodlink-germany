import { useState } from "react"
import { useKV } from "@github/spark/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/LanguageContext"
import { toast } from "sonner"

import {
  User,
  Lock,
  Envelope,
  Eye,
  EyeSlash,
  UserPlus,
  Buildings,
  MapPin,
  Phone,
  Globe,
  Heart,
  ShieldCheck,
  ArrowLeft
} from "@phosphor-icons/react"

interface LoginInterfaceProps {
  onClose: () => void
  onLoginSuccess: (user: any) => void
}

export function LoginInterface({ onClose, onLoginSuccess }: LoginInterfaceProps) {
  const { language } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useKV<any[]>("registered-users", [])
  const [currentUser, setCurrentUser] = useKV<any>("current-user", null)

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    businessType: "",
    country: "",
    phone: "",
    acceptTerms: false,
    acceptMarketing: false
  })

  // Translation helper
  const getText = (key: string, fallback: string) => {
    const translations: Record<string, Record<string, string>> = {
      'login.title': {
        'en': 'Login to Your Account',
        'de': 'In Ihr Konto einloggen',
        'zh': '登录您的账户'
      },
      'login.subtitle': {
        'en': 'Access your B2B portal for medical and automotive components',
        'de': 'Zugriff auf Ihr B2B-Portal für Medizin- und Automotive-Komponenten',
        'zh': '访问您的医疗和汽车零部件B2B门户'
      },
      'login.email': {
        'en': 'Email Address',
        'de': 'E-Mail-Adresse',
        'zh': '电子邮箱'
      },
      'login.password': {
        'en': 'Password',
        'de': 'Passwort',
        'zh': '密码'
      },
      'login.remember': {
        'en': 'Remember me',
        'de': 'Angemeldet bleiben',
        'zh': '记住我'
      },
      'login.button': {
        'en': 'Sign In',
        'de': 'Anmelden',
        'zh': '登录'
      },
      'login.forgot': {
        'en': 'Forgot password?',
        'de': 'Passwort vergessen?',
        'zh': '忘记密码？'
      },
      'register.title': {
        'en': 'Create B2B Account',
        'de': 'B2B-Konto erstellen',
        'zh': '创建B2B账户'
      },
      'register.subtitle': {
        'en': 'Join our network of 500+ B2B partners',
        'de': 'Werden Sie Teil unseres Netzwerks von 500+ B2B-Partnern',
        'zh': '加入我们500+B2B合作伙伴网络'
      },
      'register.firstName': {
        'en': 'First Name',
        'de': 'Vorname',
        'zh': '名'
      },
      'register.lastName': {
        'en': 'Last Name',
        'de': 'Nachname',
        'zh': '姓'
      },
      'register.company': {
        'en': 'Company Name',
        'de': 'Firmenname',
        'zh': '公司名称'
      },
      'register.businessType': {
        'en': 'Business Type',
        'de': 'Geschäftstyp',
        'zh': '业务类型'
      },
      'register.country': {
        'en': 'Country',
        'de': 'Land',
        'zh': '国家'
      },
      'register.phone': {
        'en': 'Phone Number',
        'de': 'Telefonnummer',
        'zh': '电话号码'
      },
      'register.confirmPassword': {
        'en': 'Confirm Password',
        'de': 'Passwort bestätigen',
        'zh': '确认密码'
      },
      'register.terms': {
        'en': 'I agree to the Terms of Service and Privacy Policy',
        'de': 'Ich stimme den Nutzungsbedingungen und Datenschutzrichtlinien zu',
        'zh': '我同意服务条款和隐私政策'
      },
      'register.marketing': {
        'en': 'I want to receive product updates and industry insights',
        'de': 'Ich möchte Produktupdates und Brancheneinblicke erhalten',
        'zh': '我希望接收产品更新和行业见解'
      },
      'register.button': {
        'en': 'Create Account',
        'de': 'Konto erstellen',
        'zh': '创建账户'
      },
      'login.success': {
        'en': 'Login successful! Welcome back.',
        'de': 'Anmeldung erfolgreich! Willkommen zurück.',
        'zh': '登录成功！欢迎回来。'
      },
      'register.success': {
        'en': 'Account created successfully! Welcome to Goodlink Germany.',
        'de': 'Konto erfolgreich erstellt! Willkommen bei Goodlink Germany.',
        'zh': '账户创建成功！欢迎来到好联德国。'
      },
      'error.invalidCredentials': {
        'en': 'Invalid email or password',
        'de': 'Ungültige E-Mail oder Passwort',
        'zh': '无效的邮箱或密码'
      },
      'error.emailExists': {
        'en': 'Email already registered',
        'de': 'E-Mail bereits registriert',
        'zh': '邮箱已注册'
      },
      'error.passwordMismatch': {
        'en': 'Passwords do not match',
        'de': 'Passwörter stimmen nicht überein',
        'zh': '密码不匹配'
      },
      'error.requiredFields': {
        'en': 'Please fill in all required fields',
        'de': 'Bitte füllen Sie alle Pflichtfelder aus',
        'zh': '请填写所有必填字段'
      },
      'business.manufacturer': {
        'en': 'Manufacturer',
        'de': 'Hersteller',
        'zh': '制造商'
      },
      'business.distributor': {
        'en': 'Distributor',
        'de': 'Distributor',
        'zh': '分销商'
      },
      'business.hospital': {
        'en': 'Hospital/Clinic',
        'de': 'Krankenhaus/Klinik',
        'zh': '医院/诊所'
      },
      'business.automotive': {
        'en': 'Automotive OEM',
        'de': 'Automotive OEM',
        'zh': '汽车OEM'
      },
      'business.retailer': {
        'en': 'Retailer',
        'de': 'Einzelhändler',
        'zh': '零售商'
      },
      'business.other': {
        'en': 'Other',
        'de': 'Andere',
        'zh': '其他'
      }
    }
    
    return translations[key]?.[language] || fallback
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simple authentication check
      const user = users?.find(u => 
        u.email === loginForm.email && u.password === loginForm.password
      )

      if (user) {
        setCurrentUser(user)
        onLoginSuccess(user)
        toast.success(getText('login.success', 'Login successful! Welcome back.'))
        onClose()
      } else {
        toast.error(getText('error.invalidCredentials', 'Invalid email or password'))
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validation
      if (!registerForm.firstName || !registerForm.lastName || !registerForm.email || 
          !registerForm.password || !registerForm.company || !registerForm.acceptTerms) {
        toast.error(getText('error.requiredFields', 'Please fill in all required fields'))
        return
      }

      if (registerForm.password !== registerForm.confirmPassword) {
        toast.error(getText('error.passwordMismatch', 'Passwords do not match'))
        return
      }

      // Check if email already exists
      if (users?.find(u => u.email === registerForm.email)) {
        toast.error(getText('error.emailExists', 'Email already registered'))
        return
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...registerForm,
        registrationDate: new Date(),
        isVerified: false,
        preferences: {
          language: language,
          currency: 'EUR',
          notifications: registerForm.acceptMarketing
        }
      }

      setUsers((current) => [...(current || []), newUser])
      setCurrentUser(newUser)
      
      onLoginSuccess(newUser)
      toast.success(getText('register.success', 'Account created successfully! Welcome to Goodlink Germany.'))
      onClose()
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const businessTypes = [
    { value: 'manufacturer', label: getText('business.manufacturer', 'Manufacturer') },
    { value: 'distributor', label: getText('business.distributor', 'Distributor') },
    { value: 'hospital', label: getText('business.hospital', 'Hospital/Clinic') },
    { value: 'automotive', label: getText('business.automotive', 'Automotive OEM') },
    { value: 'retailer', label: getText('business.retailer', 'Retailer') },
    { value: 'other', label: getText('business.other', 'Other') }
  ]

  const countries = [
    { value: 'de', label: 'Deutschland', flag: '🇩🇪' },
    { value: 'us', label: 'United States', flag: '🇺🇸' },
    { value: 'cn', label: '中国', flag: '🇨🇳' },
    { value: 'fr', label: 'France', flag: '🇫🇷' },
    { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
    { value: 'it', label: 'Italia', flag: '🇮🇹' },
    { value: 'es', label: 'España', flag: '🇪🇸' },
    { value: 'nl', label: 'Nederland', flag: '🇳🇱' },
    { value: 'at', label: 'Österreich', flag: '🇦🇹' },
    { value: 'ch', label: 'Schweiz', flag: '🇨🇭' }
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-2 rounded-lg border border-border/50">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-800">GL</div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold">Goodlink Germany</h2>
                <p className="text-xs text-muted-foreground">B2B Portal</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText('login.button', 'Sign In')}
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                {getText('register.button', 'Create Account')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {getText('login.title', 'Login to Your Account')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getText('login.subtitle', 'Access your B2B portal for medical and automotive components')}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">
                    {getText('login.email', 'Email Address')}
                  </Label>
                  <div className="relative">
                    <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@company.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">
                    {getText('login.password', 'Password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-9 pr-9"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginForm.rememberMe}
                      onCheckedChange={(checked) => 
                        setLoginForm(prev => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">
                      {getText('login.remember', 'Remember me')}
                    </Label>
                  </div>
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    {getText('login.forgot', 'Forgot password?')}
                  </Button>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {getText('login.button', 'Sign In')}
                    </div>
                  ) : (
                    getText('login.button', 'Sign In')
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  {getText('register.title', 'Create B2B Account')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getText('register.subtitle', 'Join our network of 500+ B2B partners')}
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {getText('register.firstName', 'First Name')} *
                    </Label>
                    <Input
                      id="firstName"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {getText('register.lastName', 'Last Name')} *
                    </Label>
                    <Input
                      id="lastName"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">
                    {getText('login.email', 'Email Address')} *
                  </Label>
                  <div className="relative">
                    <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@company.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    {getText('register.company', 'Company Name')} *
                  </Label>
                  <div className="relative">
                    <Buildings className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      value={registerForm.company}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, company: e.target.value }))}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">
                      {getText('register.businessType', 'Business Type')}
                    </Label>
                    <Select
                      value={registerForm.businessType}
                      onValueChange={(value) => setRegisterForm(prev => ({ ...prev, businessType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      {getText('register.country', 'Country')}
                    </Label>
                    <Select
                      value={registerForm.country}
                      onValueChange={(value) => setRegisterForm(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country..." />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country.value} value={country.value}>
                            <div className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              {country.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {getText('register.phone', 'Phone Number')}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">
                    {getText('login.password', 'Password')} *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-9 pr-9"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {getText('register.confirmPassword', 'Confirm Password')} *
                  </Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pl-9 pr-9"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerForm.acceptTerms}
                      onCheckedChange={(checked) => 
                        setRegisterForm(prev => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                      required
                    />
                    <Label htmlFor="terms" className="text-sm leading-5">
                      {getText('register.terms', 'I agree to the Terms of Service and Privacy Policy')} *
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={registerForm.acceptMarketing}
                      onCheckedChange={(checked) => 
                        setRegisterForm(prev => ({ ...prev, acceptMarketing: checked as boolean }))
                      }
                    />
                    <Label htmlFor="marketing" className="text-sm leading-5">
                      {getText('register.marketing', 'I want to receive product updates and industry insights')}
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {getText('register.button', 'Create Account')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      {getText('register.button', 'Create Account')}
                    </div>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}