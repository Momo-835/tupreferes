'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Vérifier l'état de connexion depuis localStorage au chargement
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedInStatus)
  }, [])

  const handleLogout = () => {
    // Déconnecter l'utilisateur
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-4xl font-semibold mb-8 text-center drop-shadow-md">Tu préfères</h1>
      
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md max-w-lg w-full mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Règles du jeu</h2>
        <p className="mb-4 text-center text-base">
          Le principe est simple :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Choisissez un niveau de difficulté.</li>
          <li>Pour chaque question, vous aurez deux options.</li>
          <li>Choisissez l'option que vous préférez.</li>
          <li>Pas de bonne ou mauvaise réponse, soyez honnête !</li>
          <li>À la fin, vous verrez un résumé de vos choix.</li>
        </ul>
      </div>
      
      <div className="space-y-6 text-center">
        <h3 className="text-lg font-semibold">Choisissez votre niveau de difficulté :</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-sm font-semibold py-3 rounded-lg shadow-sm">
            <Link href="/niveau/facile">Facile</Link>
          </Button>
          <Button asChild className="w-full bg-yellow-500 hover:bg-yellow-600 text-sm font-semibold py-3 rounded-lg shadow-sm">
            <Link href="/niveau/moyen">Moyen</Link>
          </Button>
          <Button asChild className="w-full bg-red-500 hover:bg-red-600 text-sm font-semibold py-3 rounded-lg shadow-sm">
            <Link href="/niveau/difficile">Difficile</Link>
          </Button>
        </div>

        {/* Section connexion/déconnexion */}
        <div className="mt-4">
          {isLoggedIn ? (
            <Button className="bg-gray-500 hover:bg-gray-600 text-sm font-semibold py-2 px-5 rounded-lg shadow-sm">
              <button onClick={handleLogout}>Se déconnecter</button>
            </Button>
          ) : (
            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-sm font-semibold py-2 px-5 rounded-lg shadow-sm">
              <Link href="/login">Se connecter</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
