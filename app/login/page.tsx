'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle, FaGithub } from 'react-icons/fa'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = () => {
    // Simuler une connexion en enregistrant l'état dans localStorage
    localStorage.setItem('isLoggedIn', 'true')
    router.push('/') // Redirection vers la page principale
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous avec votre compte Gmail ou GitHub
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-red-500 hover:bg-red-600" onClick={handleLogin}>
            <FaGoogle className="mr-2" />
            Se connecter avec Gmail
          </Button>
          <Button className="w-full bg-gray-800 hover:bg-gray-900" onClick={handleLogin}>
            <FaGithub className="mr-2" />
            Se connecter avec GitHub
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Ou</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="exemple@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Se connecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
