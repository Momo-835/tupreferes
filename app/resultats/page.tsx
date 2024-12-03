'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Resultats() {
  const searchParams = useSearchParams()
  const niveau = searchParams.get('niveau') || 'inconnu'
  const reponses = JSON.parse(decodeURIComponent(searchParams.get('reponses') || '[]'))

  const getBgColor = () => {
    switch (niveau) {
      case 'facile':
        return 'from-green-400 to-blue-500'
      case 'moyen':
        return 'from-yellow-400 to-orange-500'
      case 'difficile':
        return 'from-red-500 to-purple-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${getBgColor()} flex flex-col items-center justify-center p-4 text-white`}>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Résultats - Niveau {niveau.charAt(0).toUpperCase() + niveau.slice(1)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Vos choix :</p>
          <ul className="list-disc pl-5 mb-4">
            {reponses.map((reponse: string, index: number) => (
              <li key={index}>{reponse}</li>
            ))}
          </ul>
          <Button asChild className="w-full mt-4">
            <Link href="/">
              Retour à l'accueil
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

