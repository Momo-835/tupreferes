'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question1: string;
  image: string; // URL de l'image pour question1
  question2: string;
  image1: string; // URL de l'image pour question2
}

export default function TuPreferesMoyen() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  // Récupération des questions depuis Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('TuPreferes')
        .select('id, question1, image, question2, image1')
        .eq('difficultes', 2); // Niveau "moyen"

      if (error) {
        console.error('Erreur lors de la récupération des questions :', error.message);
        return;
      }

      setQuestions(data || []);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  const handleChoice = (choice: string) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push(`/resultats?niveau=moyen&reponses=${encodeURIComponent(JSON.stringify(newAnswers))}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Chargement des questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Aucune question disponible pour le niveau moyen.
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex flex-col items-center justify-center p-4 text-white">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg">Tu préfères... (Niveau Moyen)</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="mb-6" />
          <p className="text-center mb-6">Question {currentQuestion + 1}/{questions.length}</p>
          <div className="space-y-8">
            {/* Option 1 */}
            <div className="text-center">
              <img
                src={question.image}
                alt={question.question1}
                className="w-full max-w-sm mx-auto mb-4 rounded-lg shadow-lg"
              />
              <Button
                onClick={() => handleChoice(question.question1)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 text-lg"
              >
                {question.question1}
              </Button>
            </div>
            {/* Option 2 */}
            <div className="text-center">
              <img
                src={question.image1}
                alt={question.question2}
                className="w-full max-w-sm mx-auto mb-4 rounded-lg shadow-lg"
              />
              <Button
                onClick={() => handleChoice(question.question2)}
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
              >
                {question.question2}
              </Button>
            </div>
          </div>
          <Button asChild className="w-full mt-6" variant="outline">
            <Link href="/">
              Retour à l'accueil
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
