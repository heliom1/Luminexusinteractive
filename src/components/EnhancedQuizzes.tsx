import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain,
  Star,
  Clock,
  Check,
  X,
  Trophy,
  Sparkles,
  Home,
  ChevronLeft,
  Target,
  Zap,
  Sun,
  Globe,
  Rocket,
  Eye,
  BookOpen,
  Image as ImageIcon,
  Volume2,
  Lightbulb,
  Award,
  Timer,
  ChevronRight,
  Lock,
  Search
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SpaceDictionary from './SpaceDictionary';

interface EnhancedQuizzesProps {
  playerName: string;
  onBack: () => void;
}

export default function EnhancedQuizzes({ playerName, onBack }: EnhancedQuizzesProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [showDictionary, setShowDictionary] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>(['space-weather-basics']); // First quiz unlocked
  const [playerStats, setPlayerStats] = useState({
    quizzesTaken: 1,
    perfectScores: 0,
    totalPoints: 80,
    streak: 1
  });

  const quizzes = [
    {
      id: 'space-weather-basics',
      title: 'Space Weather Basics',
      description: 'Learn simple facts about space weather phenomena',
      icon: '🌟',
      difficulty: 'Beginner',
      questions: 6,
      timeLimit: 60,
      points: 80,
      gradient: 'from-blue-400 to-cyan-500',
      unlocked: true
    },
    {
      id: 'solar-flares',
      title: 'Solar Flares & CMEs', 
      description: 'Understand explosive solar events and their effects',
      icon: '☀️',
      difficulty: 'Intermediate',
      questions: 8,
      timeLimit: 90,
      points: 120,
      gradient: 'from-orange-400 to-red-500',
      unlocked: completedQuizzes.includes('space-weather-basics')
    },
    {
      id: 'auroras',
      title: 'Aurora Science',
      description: 'Discover the magic behind northern and southern lights',
      icon: '🌈',
      difficulty: 'Intermediate', 
      questions: 8,
      timeLimit: 90,
      points: 150,
      gradient: 'from-green-400 to-purple-500',
      unlocked: completedQuizzes.includes('solar-flares')
    },
    {
      id: 'magnetic-fields',
      title: 'Magnetic Fields',
      description: 'Explore Earth\'s magnetic shield and space protection',
      icon: '🧲',
      difficulty: 'Advanced',
      questions: 10,
      timeLimit: 120,
      points: 200,
      gradient: 'from-purple-400 to-pink-500',
      unlocked: completedQuizzes.includes('auroras')
    },
    {
      id: 'space-technology',
      title: 'Space Technology Impact',
      description: 'How space weather affects satellites and technology',
      icon: '🛰️',
      difficulty: 'Advanced',
      questions: 12,
      timeLimit: 150,
      points: 250,
      gradient: 'from-indigo-400 to-blue-600',
      unlocked: completedQuizzes.includes('magnetic-fields')
    },
    {
      id: 'extreme-events',
      title: 'Extreme Space Weather',
      description: 'Study the most powerful solar storms in history',
      icon: '⚡',
      difficulty: 'Expert',
      questions: 15,
      timeLimit: 180,
      points: 300,
      gradient: 'from-red-500 to-purple-600',
      unlocked: completedQuizzes.includes('space-technology')
    }
  ];

  const playSound = (type: 'click' | 'success' | 'error' | 'correct' | 'wrong' | 'complete') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          break;
        case 'success':
        case 'complete':
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
          break;
        case 'correct':
          oscillator.frequency.setValueAtTime(700, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(900, audioContext.currentTime + 0.1);
          break;
        case 'wrong':
        case 'error':
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.3);
          break;
      }
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently handle audio context errors
    }
  };

  const renderQuizContent = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return null;
    
    return <QuizGame quiz={quiz} playerName={playerName} onComplete={(score, passed) => {
      playSound('complete');
      if (passed && !completedQuizzes.includes(quiz.id)) {
        setCompletedQuizzes(prev => [...prev, quiz.id]);
      }
      setPlayerStats(prev => ({
        ...prev,
        quizzesTaken: prev.quizzesTaken + 1,
        perfectScores: score === quiz.points ? prev.perfectScores + 1 : prev.perfectScores,
        totalPoints: prev.totalPoints + score,
        streak: score >= quiz.points * 0.8 ? prev.streak + 1 : 0
      }));
      setSelectedQuiz(null);
    }} />;
  };

  if (showDictionary) {
    return <SpaceDictionary onBack={() => setShowDictionary(false)} />;
  }

  if (selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-3 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => {
                playSound('click');
                setSelectedQuiz(null);
              }}
              className="flex items-center gap-2 md:gap-3 bg-white/90 hover:bg-white text-gray-800 border-2 md:border-4 border-purple-300 text-base md:text-xl px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Back to Quizzes</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
          {renderQuizContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-gray-800 text-2xl md:text-4xl font-bold">Knowledge Quizzes</h1>
          </div>
          
          <div className="flex gap-2 md:gap-4 w-full md:w-auto">
            <Button 
              onClick={() => {
                playSound('click');
                setShowDictionary(true);
              }}
              className="flex items-center gap-2 md:gap-3 bg-green-600 hover:bg-green-700 text-white text-sm md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg flex-1 md:flex-none"
            >
              <BookOpen className="w-4 h-4 md:w-6 md:h-6" />
              <span className="hidden sm:inline">Dictionary</span>
              <span className="sm:hidden">📖</span>
            </Button>
            <Button 
              onClick={() => {
                playSound('click');
                onBack();
              }}
              className="flex items-center gap-2 md:gap-3 bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-xl px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg flex-1 md:flex-none"
            >
              <Home className="w-4 h-4 md:w-6 md:h-6" />
              <span className="hidden sm:inline">Home</span>
              <span className="sm:hidden">🏠</span>
            </Button>
          </div>
        </div>

        {/* Main Header Section */}
        <div className="text-center mb-6 md:mb-8">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>
          
          <h1 className="text-gray-800 text-2xl md:text-5xl font-bold mb-3 md:mb-4 px-2">Test Your Space Weather Knowledge</h1>
          <p className="text-gray-700 text-base md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
            Challenge yourself with interactive quizzes! Complete each quiz to unlock the next level!
          </p>
        </div>

        {/* Player Stats Dashboard */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-8 mb-6 md:mb-8 border-2 md:border-4 border-purple-300 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-blue-600 text-xl md:text-3xl font-bold">{playerStats.quizzesTaken}</p>
              <p className="text-gray-600 text-xs md:text-lg font-medium">Quizzes Taken</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-yellow-600 text-xl md:text-3xl font-bold">{playerStats.perfectScores}</p>
              <p className="text-gray-600 text-xs md:text-lg font-medium">Perfect Scores</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-green-600 text-xl md:text-3xl font-bold">{playerStats.totalPoints}</p>
              <p className="text-gray-600 text-xs md:text-lg font-medium">Total Points</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <p className="text-purple-600 text-xl md:text-3xl font-bold">{playerStats.streak}</p>
              <p className="text-gray-600 text-xs md:text-lg font-medium">Current Streak</p>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden cursor-pointer transform transition-all duration-300 ${
                  quiz.unlocked ? 'hover:scale-105 hover:shadow-3xl hover:border-purple-400' : 'opacity-60'
                }`}
                onClick={() => {
                  if (quiz.unlocked) {
                    playSound('click');
                    setSelectedQuiz(quiz.id);
                  } else {
                    playSound('error');
                  }
                }}
              >
                <div className={`h-40 bg-gradient-to-br ${quiz.gradient} relative overflow-hidden`}>
                  <div className="absolute top-4 left-4">
                    <Badge className={`${
                      quiz.difficulty === 'Beginner' ? 'bg-green-500' :
                      quiz.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                      quiz.difficulty === 'Advanced' ? 'bg-orange-500' :
                      'bg-red-500'
                    } text-white text-sm px-3 py-1 font-bold`}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-white text-sm px-3 py-1 font-bold">
                      +{quiz.points}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-7xl">
                      {quiz.unlocked ? quiz.icon : '🔒'}
                    </div>
                  </div>
                  {!quiz.unlocked && (
                    <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-6">
                      <p className="text-white text-lg font-bold">Complete previous quiz</p>
                    </div>
                  )}
                  {completedQuizzes.includes(quiz.id) && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white text-sm px-3 py-1 font-bold">
                        ✓ Completed
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-800 text-xl">{quiz.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                    {quiz.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-4 h-4" />
                      <span>{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{quiz.timeLimit} Seconds</span>
                    </div>
                  </div>
                  
                  {quiz.unlocked ? (
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-lg py-3 rounded-xl font-bold shadow-lg">
                      <Brain className="w-5 h-5 mr-2" />
                      {completedQuizzes.includes(quiz.id) ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-gray-400 text-white text-lg py-3 rounded-xl font-bold">
                      <Lock className="w-5 h-5 mr-2" />
                      Locked
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Quiz Game Component with difficulty-appropriate questions
function QuizGame({ quiz, playerName, onComplete }: {
  quiz: any;
  playerName: string;
  onComplete: (score: number, passed: boolean) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  // Difficulty-appropriate questions
  const questionSets = {
    'space-weather-basics': [
      {
        question: "What is space weather?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "Weather on other planets",
          "Changes in space that affect Earth",
          "Storms inside spacecraft",
          "Temperature in space"
        ],
        correct: 1,
        explanation: "Space weather means changes in space (like from the Sun) that can affect Earth and our technology.",
        difficulty: "beginner"
      },
      {
        question: "What causes space weather?",
        image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
        options: [
          "The Moon",
          "The Sun",
          "Earth's atmosphere",
          "Other planets"
        ],
        correct: 1,
        explanation: "The Sun is what causes space weather by sending out energy and particles.",
        difficulty: "beginner"
      },
      {
        question: "What are the Northern Lights called?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: [
          "Aurora Borealis",
          "Solar Flares",
          "Magnetic Storms",
          "Cosmic Rays"
        ],
        correct: 0,
        explanation: "The Northern Lights are called Aurora Borealis. They are beautiful lights in the sky!",
        difficulty: "beginner"
      },
      {
        question: "What protects Earth from harmful space radiation?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "The atmosphere only",
          "The Moon",
          "Earth's magnetic field",
          "Clouds"
        ],
        correct: 2,
        explanation: "Earth's magnetic field acts like a protective bubble around our planet.",
        difficulty: "beginner"
      },
      {
        question: "When do we see more auroras?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: [
          "During winter only",
          "When the Sun is more active",
          "During full moon",
          "When it's cloudy"
        ],
        correct: 1,
        explanation: "We see more auroras when the Sun is more active and sends more particles to Earth.",
        difficulty: "beginner"
      },
      {
        question: "What can space weather affect?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Only satellites",
          "Only power grids",
          "Satellites, GPS, and power systems",
          "Ocean tides"
        ],
        correct: 2,
        explanation: "Space weather can affect many things we use every day like GPS, satellites, and electricity.",
        difficulty: "beginner"
      }
    ],
    'solar-flares': [
      {
        question: "What is a solar flare?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "A solar eclipse",
          "A sudden burst of energy from the Sun",
          "A planet passing in front of the Sun",
          "The Sun getting brighter"
        ],
        correct: 1,
        explanation: "Solar flares are sudden releases of electromagnetic energy from the Sun's surface.",
        difficulty: "intermediate"
      },
      {
        question: "How long do solar flares typically last?",
        image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
        options: [
          "A few seconds",
          "Minutes to hours",
          "Several days",
          "Weeks"
        ],
        correct: 1,
        explanation: "Solar flares usually last from a few minutes to several hours.",
        difficulty: "intermediate"
      },
      {
        question: "What does CME stand for?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "Cosmic Magnetic Energy",
          "Coronal Mass Ejection",
          "Cosmic Matter Explosion",
          "Central Magnetic Event"
        ],
        correct: 1,
        explanation: "CME stands for Coronal Mass Ejection - a massive burst of solar material.",
        difficulty: "intermediate"
      },
      {
        question: "How long does it take for solar particles to reach Earth?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "8 minutes",
          "1-3 days",
          "1 week",
          "1 month"
        ],
        correct: 1,
        explanation: "Solar particles from CMEs typically take 1-3 days to travel from the Sun to Earth.",
        difficulty: "intermediate"
      },
      {
        question: "Which solar flare class is the strongest?",
        image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
        options: [
          "A-class",
          "C-class",
          "M-class",
          "X-class"
        ],
        correct: 3,
        explanation: "X-class flares are the strongest and can cause significant disruptions on Earth.",
        difficulty: "intermediate"
      },
      {
        question: "What happens during a geomagnetic storm?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: [
          "Earth's magnetic field is disturbed",
          "The Sun explodes",
          "Earth's gravity changes",
          "The Moon moves closer"
        ],
        correct: 0,
        explanation: "Geomagnetic storms occur when solar activity disturbs Earth's magnetic field.",
        difficulty: "intermediate"
      },
      {
        question: "What is the solar cycle?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "The Sun's daily rotation",
          "An 11-year pattern of solar activity",
          "The Sun's yearly orbit",
          "Solar flares happening every month"
        ],
        correct: 1,
        explanation: "The solar cycle is approximately 11 years long, with varying levels of solar activity.",
        difficulty: "intermediate"
      },
      {
        question: "What are sunspots?",
        image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
        options: [
          "Dark, cool areas on the Sun's surface",
          "Hot spots on the Sun",
          "Planets in front of the Sun",
          "Shadows on the Sun"
        ],
        correct: 0,
        explanation: "Sunspots are darker, cooler regions on the Sun's surface caused by magnetic activity.",
        difficulty: "intermediate"
      }
    ],
    'auroras': [
      {
        question: "What gas creates the most common green aurora color?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: ["Nitrogen", "Oxygen", "Hydrogen", "Carbon dioxide"],
        correct: 1,
        explanation: "Oxygen atoms at 100-300km altitude produce the characteristic green glow in auroras.",
        difficulty: "intermediate"
      },
      {
        question: "At what altitude do most green auroras occur?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: ["50-80 km", "100-300 km", "400-500 km", "600-800 km"],
        correct: 1,
        explanation: "Green auroras typically occur at altitudes of 100-300 kilometers above Earth.",
        difficulty: "intermediate"
      },
      {
        question: "What causes the different colors in auroras?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: [
          "Different gases in the atmosphere",
          "Distance from Earth",
          "Time of day",
          "Season of the year"
        ],
        correct: 0,
        explanation: "Different atmospheric gases emit different colors when excited by solar particles.",
        difficulty: "intermediate"
      },
      {
        question: "Why are auroras more common near the poles?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "It's colder there",
          "Magnetic field lines converge there",
          "There's less atmosphere",
          "The Sun is closer"
        ],
        correct: 1,
        explanation: "Earth's magnetic field lines converge at the poles, allowing solar particles to enter the atmosphere.",
        difficulty: "intermediate"
      },
      {
        question: "What is the southern aurora called?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: ["Aurora Borealis", "Aurora Australis", "Aurora Magneticus", "Aurora Solaris"],
        correct: 1,
        explanation: "The southern lights are called Aurora Australis, while the northern lights are Aurora Borealis.",
        difficulty: "intermediate"
      },
      {
        question: "What creates the red color in auroras?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: [
          "Nitrogen at low altitude",
          "Oxygen at very high altitude",
          "Hydrogen molecules",
          "Carbon monoxide"
        ],
        correct: 1,
        explanation: "Red auroras are created by oxygen atoms at very high altitudes (300+ km).",
        difficulty: "intermediate"
      },
      {
        question: "How fast can aurora displays move across the sky?",
        image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
        options: ["1 km/s", "5 km/s", "20 km/s", "100 km/s"],
        correct: 2,
        explanation: "Aurora displays can move across the sky at speeds of up to 20 kilometers per second.",
        difficulty: "intermediate"
      },
      {
        question: "During which solar cycle phase are auroras most frequent?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: ["Solar minimum", "Solar maximum", "Solar decline", "They're equally frequent"],
        correct: 1,
        explanation: "Auroras are most frequent during solar maximum when solar activity is at its peak.",
        difficulty: "intermediate"
      }
    ],
    'magnetic-fields': [
      {
        question: "What generates Earth's magnetic field?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "The atmosphere",
          "Molten iron in the core",
          "The Moon's gravity",
          "Solar wind"
        ],
        correct: 1,
        explanation: "Earth's magnetic field is generated by the movement of molten iron in our planet's outer core.",
        difficulty: "advanced"
      },
      {
        question: "How far does Earth's magnetosphere extend on the sunward side?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "About 5 Earth radii",
          "About 10 Earth radii",
          "About 20 Earth radii",
          "About 50 Earth radii"
        ],
        correct: 1,
        explanation: "Earth's magnetosphere extends about 10 Earth radii (approximately 64,000 km) on the sunward side.",
        difficulty: "advanced"
      },
      {
        question: "What are the Van Allen radiation belts?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "Solar wind streams",
          "Regions of trapped charged particles",
          "Magnetic field lines",
          "Aurora formation zones"
        ],
        correct: 1,
        explanation: "The Van Allen belts are donut-shaped regions where charged particles are trapped by Earth's magnetic field.",
        difficulty: "advanced"
      },
      {
        question: "How often do Earth's magnetic poles reverse?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "Every 100 years",
          "Every 1,000 years",
          "Every 100,000-1,000,000 years",
          "Never"
        ],
        correct: 2,
        explanation: "Magnetic pole reversals occur irregularly, typically every 100,000 to 1,000,000 years.",
        difficulty: "advanced"
      },
      {
        question: "What is magnetic reconnection?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "When magnetic field lines break and reconnect",
          "When magnets stick together",
          "The creation of new magnetic fields",
          "The destruction of magnetic fields"
        ],
        correct: 0,
        explanation: "Magnetic reconnection occurs when magnetic field lines break and reconnect, releasing large amounts of energy.",
        difficulty: "advanced"
      },
      {
        question: "What would happen to Earth without its magnetic field?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "Nothing would change",
          "We'd have more auroras",
          "Our atmosphere would be stripped away",
          "The planet would get colder"
        ],
        correct: 2,
        explanation: "Without our magnetic field, solar wind would gradually strip away Earth's atmosphere, like what happened to Mars.",
        difficulty: "advanced"
      },
      {
        question: "What is the magnetopause?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "The center of Earth's magnetic field",
          "The boundary between Earth's magnetosphere and solar wind",
          "A type of magnetic storm",
          "The weakest part of the magnetic field"
        ],
        correct: 1,
        explanation: "The magnetopause is the boundary where Earth's magnetic field meets and deflects the solar wind.",
        difficulty: "advanced"
      },
      {
        question: "How does solar wind pressure affect Earth's magnetosphere?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "It has no effect",
          "It compresses the sunward side",
          "It expands the magnetosphere",
          "It only affects the poles"
        ],
        correct: 1,
        explanation: "Solar wind pressure compresses Earth's magnetosphere on the sunward side and stretches it into a long tail on the night side.",
        difficulty: "advanced"
      },
      {
        question: "What is a substorm in the magnetosphere?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "A small solar flare",
          "A localized disruption in the magnetotail",
          "A type of aurora",
          "A magnetic field reversal"
        ],
        correct: 1,
        explanation: "A substorm is a localized disruption in the magnetotail that can trigger auroral displays and other phenomena.",
        difficulty: "advanced"
      },
      {
        question: "How do scientists study Earth's magnetic field?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Only from ground-based observatories",
          "Only from satellites",
          "Using magnetometers on ground and in space",
          "By studying rocks only"
        ],
        correct: 2,
        explanation: "Scientists use magnetometers both on the ground and on satellites to study Earth's magnetic field in detail.",
        difficulty: "advanced"
      }
    ],
    'space-technology': [
      {
        question: "How can space weather affect GPS systems?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "It can't affect GPS",
          "It can cause position errors of several meters",
          "It only affects military GPS",
          "It makes GPS work better"
        ],
        correct: 1,
        explanation: "Space weather can cause GPS position errors of several meters by affecting signal propagation through the ionosphere.",
        difficulty: "advanced"
      },
      {
        question: "What is the most vulnerable part of satellites during space weather events?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Solar panels",
          "Electronic components",
          "Communication antennas",
          "Fuel systems"
        ],
        correct: 1,
        explanation: "Electronic components are most vulnerable to space weather, particularly to energetic particles and electrostatic discharge.",
        difficulty: "advanced"
      },
      {
        question: "How do airlines respond to space weather forecasts?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "They ignore them",
          "They may reroute polar flights",
          "They only fly during storms",
          "They cancel all flights"
        ],
        correct: 1,
        explanation: "Airlines may reroute polar flights to lower latitudes during severe space weather events to avoid radiation exposure and communication disruptions.",
        difficulty: "advanced"
      },
      {
        question: "What was significant about the 1859 Carrington Event?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "First observed solar flare",
          "Strongest geomagnetic storm in recorded history",
          "Discovery of the solar wind",
          "First satellite launch"
        ],
        correct: 1,
        explanation: "The 1859 Carrington Event was the strongest geomagnetic storm in recorded history, causing telegraph systems worldwide to fail.",
        difficulty: "advanced"
      },
      {
        question: "How do power grids protect against space weather?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "They can't be protected",
          "Using surge protectors and load management",
          "By turning off during storms",
          "Using underground cables only"
        ],
        correct: 1,
        explanation: "Power grids use surge protectors, load management, and monitoring systems to protect against geomagnetically induced currents.",
        difficulty: "advanced"
      },
      {
        question: "What is satellite anomaly correlation with space weather?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "No correlation exists",
          "Strong correlation during solar maximum",
          "Only affects old satellites",
          "Only during lunar eclipses"
        ],
        correct: 1,
        explanation: "There's a strong correlation between satellite anomalies and space weather events, especially during solar maximum periods.",
        difficulty: "advanced"
      },
      {
        question: "How do astronauts protect themselves from space weather?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "They don't need protection",
          "Using shielded areas of spacecraft",
          "Only by wearing spacesuits",
          "By staying on Earth"
        ],
        correct: 1,
        explanation: "Astronauts take shelter in shielded areas of spacecraft during severe space weather events to avoid radiation exposure.",
        difficulty: "advanced"
      },
      {
        question: "What is the economic impact of severe space weather events?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "No economic impact",
          "Millions to billions of dollars",
          "Only affects government",
          "Less than $1000"
        ],
        correct: 1,
        explanation: "Severe space weather events can cause economic impacts ranging from millions to billions of dollars due to infrastructure damage and service disruptions.",
        difficulty: "advanced"
      },
      {
        question: "How accurate are current space weather forecasts?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "100% accurate",
          "Moderately accurate for 1-3 days",
          "Only accurate for minutes",
          "Completely inaccurate"
        ],
        correct: 1,
        explanation: "Current space weather forecasts are moderately accurate for 1-3 days ahead, similar to terrestrial weather forecasting.",
        difficulty: "advanced"
      },
      {
        question: "What is space weather's effect on radio communications?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Always improves signals",
          "Can cause blackouts and interference",
          "No effect on radio",
          "Only affects AM radio"
        ],
        correct: 1,
        explanation: "Space weather can cause radio blackouts and interference by affecting the ionosphere's ability to reflect radio waves.",
        difficulty: "advanced"
      },
      {
        question: "How do scientists monitor space weather in real-time?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Only from Earth",
          "Using a network of satellites and ground stations",
          "By looking at the Sun",
          "Using weather balloons"
        ],
        correct: 1,
        explanation: "Scientists use a global network of satellites, ground-based magnetometers, and solar observatories to monitor space weather 24/7.",
        difficulty: "advanced"
      },
      {
        question: "What is the L1 Lagrange point's importance for space weather monitoring?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "It's not important",
          "Provides 30-60 minute early warning",
          "Only used for communications",
          "It's too close to Earth"
        ],
        correct: 1,
        explanation: "The L1 Lagrange point, located between Earth and the Sun, provides 30-60 minutes early warning of incoming solar storms.",
        difficulty: "advanced"
      }
    ],
    'extreme-events': [
      {
        question: "What made the 1859 Carrington Event so devastating?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "It lasted for months",
          "It was the fastest CME ever recorded",
          "It overwhelmed all technological systems of the time",
          "It changed Earth's magnetic field permanently"
        ],
        correct: 2,
        explanation: "The Carrington Event overwhelmed all telegraph systems worldwide, causing sparks, fires, and making some systems work without power.",
        difficulty: "expert"
      },
      {
        question: "What is the estimated frequency of Carrington-level events?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "Every 10 years",
          "Every 50 years",
          "Every 150 years",
          "Every 500 years"
        ],
        correct: 2,
        explanation: "Carrington-level geomagnetic storms are estimated to occur approximately every 150 years on average.",
        difficulty: "expert"
      },
      {
        question: "What was unique about the March 1989 Quebec blackout?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "It was caused by a solar eclipse",
          "Geomagnetically induced currents collapsed the power grid",
          "It only lasted a few minutes",
          "It affected only one city"
        ],
        correct: 1,
        explanation: "The March 1989 event caused geomagnetically induced currents that tripped circuit breakers and collapsed Quebec's entire power grid.",
        difficulty: "expert"
      },
      {
        question: "What is a 'perfect solar storm' scenario?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "A solar flare that creates beautiful auroras",
          "Multiple CMEs arriving simultaneously with optimal magnetic orientation",
          "A solar eclipse during a geomagnetic storm",
          "The Sun's maximum brightness"
        ],
        correct: 1,
        explanation: "A 'perfect solar storm' involves multiple fast CMEs with southward magnetic fields arriving simultaneously, maximizing geomagnetic effects.",
        difficulty: "expert"
      },
      {
        question: "How would a Carrington-level event affect modern technology?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "No significant impact",
          "Minor inconveniences only",
          "Widespread infrastructure collapse lasting months",
          "Only affects satellites"
        ],
        correct: 2,
        explanation: "A Carrington-level event today could cause widespread power grid failures, satellite damage, and infrastructure collapse lasting months.",
        difficulty: "expert"
      },
      {
        question: "What is the Miyake Event of 774-775 CE?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "A massive volcanic eruption",
          "An extreme cosmic ray event recorded in tree rings",
          "A large earthquake",
          "A comet impact"
        ],
        correct: 1,
        explanation: "The Miyake Event was an extreme increase in cosmic rays, possibly from a massive solar storm, recorded in tree rings worldwide.",
        difficulty: "expert"
      },
      {
        question: "What is the estimated economic impact of an extreme space weather event today?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "$1-10 billion",
          "$10-100 billion",
          "$1-2 trillion",
          "$10-20 trillion"
        ],
        correct: 2,
        explanation: "Studies estimate that an extreme space weather event could cause $1-2 trillion in damages globally, with recovery taking years.",
        difficulty: "expert"
      },
      {
        question: "What is a 'Dragon King' event in space weather?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "A type of solar flare",
          "An extremely rare, devastating event beyond normal statistics",
          "A Chinese space weather satellite",
          "A constellation pattern during storms"
        ],
        correct: 1,
        explanation: "Dragon King events are extremely rare, catastrophic events that fall outside normal statistical distributions and could be devastating.",
        difficulty: "expert"
      },
      {
        question: "How do we study ancient extreme space weather events?",
        image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
        options: [
          "We can't study ancient events",
          "Only through written records",
          "Using cosmogenic isotopes in ice cores and tree rings",
          "By studying the Sun directly"
        ],
        correct: 2,
        explanation: "Scientists study cosmogenic isotopes like Carbon-14 and Beryllium-10 in ice cores and tree rings to detect ancient extreme solar events.",
        difficulty: "expert"
      },
      {
        question: "What is the 'Halloween Storm' of 2003?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "A meteorological storm",
          "A series of powerful solar storms affecting Earth",
          "An asteroid impact",
          "A lunar eclipse event"
        ],
        correct: 1,
        explanation: "The Halloween Storm was a series of powerful solar storms in October-November 2003 that caused widespread technological disruptions.",
        difficulty: "expert"
      },
      {
        question: "What makes some CMEs particularly dangerous?",
        image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
        options: [
          "Their temperature",
          "Their size only",
          "High speed and southward magnetic field orientation",
          "Their color"
        ],
        correct: 2,
        explanation: "The most dangerous CMEs combine high speed (>1000 km/s) with strong southward magnetic fields that efficiently couple with Earth's magnetosphere.",
        difficulty: "expert"
      },
      {
        question: "What is space weather forecasting's biggest challenge?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Lack of satellites",
          "Predicting the magnetic orientation of CMEs",
          "Understanding solar physics",
          "International cooperation"
        ],
        correct: 1,
        explanation: "The biggest challenge is predicting the magnetic field orientation of CMEs, which determines how effectively they will interact with Earth's magnetosphere.",
        difficulty: "expert"
      },
      {
        question: "How would extreme space weather affect critical infrastructure interdependencies?",
        image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
        options: [
          "Each system would fail independently",
          "Cascading failures across multiple interconnected systems",
          "Only power grids would be affected",
          "Modern systems are completely protected"
        ],
        correct: 1,
        explanation: "Modern infrastructure is highly interconnected; failure of power grids would cascade to telecommunications, transportation, financial systems, and more.",
        difficulty: "expert"
      },
      {
        question: "What is the significance of the Dst index in measuring storm intensity?",
        image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
        options: [
          "It measures solar wind speed",
          "It quantifies the disturbance to Earth's magnetic field",
          "It measures aurora brightness",
          "It counts sunspots"
        ],
        correct: 1,
        explanation: "The Dst (Disturbance storm time) index measures the intensity of the ring current and quantifies global magnetic field disturbance during storms.",
        difficulty: "expert"
      },
      {
        question: "What role do energetic particles play in extreme space weather events?",
        image: "https://images.unsplash.com/photo-1711992635223-ad1ad38f7329?w=400",
        options: [
          "They only create auroras",
          "They can damage satellites and threaten astronaut safety",
          "They have no significant effects",
          "They only affect radio communications"
        ],
        correct: 1,
        explanation: "Energetic particles can penetrate spacecraft shielding, damage electronics, pose radiation hazards to astronauts, and affect aviation at high altitudes.",
        difficulty: "expert"
      }
    ]
  };

  const questions = questionSets[quiz.id as keyof typeof questionSets] || questionSets['space-weather-basics'];

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [gameStarted, timeLeft]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + Math.round(quiz.points / questions.length));
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const passed = score >= quiz.points * 0.6; // 60% to pass
    onComplete(score, passed);
  };

  const startQuiz = () => {
    setGameStarted(true);
    setTimeLeft(quiz.timeLimit);
  };

  if (!gameStarted) {
    return (
      <Card className="bg-white/90 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-gray-800 text-4xl font-bold mb-4">{quiz.title}</CardTitle>
          <p className="text-gray-600 text-xl">{quiz.description}</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-2xl">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="text-gray-800 font-bold text-lg">{questions.length} Questions</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-2xl">
              <Timer className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <p className="text-gray-800 font-bold text-lg">{quiz.timeLimit} Seconds</p>
            </div>
            <div className="bg-green-100 p-6 rounded-2xl">
              <Trophy className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="text-gray-800 font-bold text-lg">{quiz.points} Points</p>
            </div>
          </div>
          
          <Button 
            onClick={startQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-2xl px-12 py-6 rounded-2xl font-bold shadow-lg"
          >
            <Brain className="w-8 h-8 mr-3" />
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-white/90 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="text-gray-800">
              <p className="text-lg font-bold">Question {currentQuestion + 1} of {questions.length}</p>
              <p className="text-lg font-bold">Score: {score}/{quiz.points}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-800">
            <Clock className="w-6 h-6 text-blue-600" />
            <p className="text-xl font-bold">{timeLeft}s</p>
          </div>
        </div>
        <Progress value={progress} className="h-4 mb-4" />
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Question with Image */}
        <div className="text-center">
          <div className="mb-6">
            <ImageWithFallback
              src={currentQ.image}
              alt="Question illustration"
              className="w-full h-64 object-cover rounded-2xl border-4 border-purple-200"
            />
          </div>
          <h3 className="text-gray-800 text-3xl font-bold mb-6">{currentQ.question}</h3>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ.options.map((option, index) => {
            let buttonClass = "p-6 rounded-2xl border-4 transition-all text-xl font-bold ";
            
            if (selectedAnswer === null) {
              buttonClass += "border-purple-200 bg-white hover:border-purple-400 hover:bg-purple-50 text-gray-800";
            } else if (index === currentQ.correct) {
              buttonClass += "border-green-500 bg-green-100 text-green-800";
            } else if (index === selectedAnswer && index !== currentQ.correct) {
              buttonClass += "border-red-500 bg-red-100 text-red-800";
            } else {
              buttonClass += "border-gray-300 bg-gray-100 text-gray-600";
            }
            
            return (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={buttonClass}
                disabled={selectedAnswer !== null}
                whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {selectedAnswer !== null && index === currentQ.correct && (
                    <Check className="w-6 h-6 text-green-600 ml-auto" />
                  )}
                  {selectedAnswer === index && index !== currentQ.correct && (
                    <X className="w-6 h-6 text-red-600 ml-auto" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-4 border-blue-200 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-blue-800 font-bold text-xl mb-2">Explanation</h4>
                <p className="text-blue-700 text-lg leading-relaxed">{currentQ.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Button */}
        {showExplanation && (
          <div className="text-center">
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl px-8 py-4 rounded-2xl font-bold"
            >
              {currentQuestion + 1 === questions.length ? (
                <>
                  <Trophy className="w-6 h-6 mr-3" />
                  Complete Quiz
                </>
              ) : (
                <>
                  <ChevronRight className="w-6 h-6 mr-3" />
                  Next Question
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Enhanced Dictionary Component with more terms and better images
function SpaceWeatherDictionary({ onBack }: { onBack: () => void }) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const dictionaryTerms = [
    {
      term: "Aurora",
      definition: "Beautiful light shows in the sky caused when tiny particles from the Sun hit gases in our air. These create amazing colors like green, blue, and red that dance across the sky!",
      image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
      examples: ["Northern Lights (Aurora Borealis)", "Southern Lights (Aurora Australis)"],
      relatedTerms: ["Solar Wind", "Magnetosphere", "Atmospheric Gases"],
      category: "phenomena"
    },
    {
      term: "Solar Flare",
      definition: "A huge burst of energy from the Sun's surface. Imagine the Sun like a giant firecracker going off! These bursts can affect our technology on Earth.",
      image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
      examples: ["X-class flares (strongest)", "M-class flares (medium)", "C-class flares (small)"],
      relatedTerms: ["Coronal Mass Ejection", "Solar Wind", "Sunspots"],
      category: "solar"
    },
    {
      term: "Coronal Mass Ejection (CME)",
      definition: "A giant cloud of particles shot out from the Sun into space. It's like the Sun sneezing a huge bubble of energy that travels through space!",
      image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
      examples: ["Can take 1-3 days to reach Earth", "Causes beautiful auroras", "Can affect satellites"],
      relatedTerms: ["Solar Flare", "Geomagnetic Storm", "Solar Wind"],
      category: "solar"
    },
    {
      term: "Magnetosphere",
      definition: "Earth's invisible protective bubble made by our planet's magnetic field. It acts like a superhero shield, protecting us from harmful space particles!",
      image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
      examples: ["Protects us from solar wind", "Creates the Van Allen belts", "Guides auroras to the poles"],
      relatedTerms: ["Magnetic Field", "Solar Wind", "Aurora"],
      category: "earth"
    },
    {
      term: "Geomagnetic Storm",
      definition: "When space weather shakes up Earth's magnetic field. It's like our planet's magnetic bubble getting wobbly, which can create amazing auroras but also affect our technology.",
      image: "https://images.unsplash.com/photo-1644659513503-abcbf75b4521?w=400",
      examples: ["Can disrupt GPS systems", "May affect power grids", "Creates beautiful auroras"],
      relatedTerms: ["Aurora", "Solar Wind", "CME"],
      category: "phenomena"
    },
    {
      term: "Solar Wind",
      definition: "A stream of tiny particles that constantly flows from the Sun through space. Think of it like an invisible wind made of energy that travels super fast!",
      image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
      examples: ["Travels at 400-800 km/s", "Made of protons and electrons", "Takes 4 days to reach Earth"],
      relatedTerms: ["Solar Flare", "CME", "Magnetosphere"],
      category: "solar"
    },
    {
      term: "Sunspots",
      definition: "Dark spots on the Sun's surface that are cooler than the rest. They look dark but are still incredibly hot! More sunspots usually mean more space weather activity.",
      image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
      examples: ["Follow an 11-year cycle", "Still over 3000°C hot", "Indicate solar activity"],
      relatedTerms: ["Solar Cycle", "Solar Flare", "Magnetic Field"],
      category: "solar"
    },
    {
      term: "Space Weather",
      definition: "Changes in space (especially from the Sun) that can affect Earth and our technology. Just like regular weather, but happening in space!",
      image: "https://images.unsplash.com/photo-1712624236454-da22c22bb020?w=400",
      examples: ["Affects satellites", "Can disrupt communications", "Creates auroras"],
      relatedTerms: ["Solar Activity", "Geomagnetic Storm", "Aurora"],
      category: "phenomena"
    },
    {
      term: "Van Allen Belts",
      definition: "Two donut-shaped regions around Earth where dangerous particles get trapped by our magnetic field. They act like cosmic particle jails!",
      image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
      examples: ["Protect us from radiation", "Discovered by James Van Allen", "Spacecraft must pass through quickly"],
      relatedTerms: ["Magnetosphere", "Radiation", "Magnetic Field"],
      category: "earth"
    },
    {
      term: "Magnetic Field",
      definition: "An invisible force field around Earth created by our planet's spinning core. It's like Earth has superpowers that protect us from space!",
      image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
      examples: ["Generated by Earth's core", "Protects our atmosphere", "Guides compass needles"],
      relatedTerms: ["Magnetosphere", "Van Allen Belts", "Magnetic Poles"],
      category: "earth"
    },
    {
      term: "Solar Cycle",
      definition: "The Sun's 11-year pattern of getting more and less active. It's like the Sun has moods that change over time, from quiet to very active!",
      image: "https://images.unsplash.com/photo-1692576451105-5db2a280ce38?w=400",
      examples: ["Lasts about 11 years", "Solar maximum = most active", "Solar minimum = least active"],
      relatedTerms: ["Sunspots", "Solar Activity", "Solar Flare"],
      category: "solar"
    },
    {
      term: "Ionosphere",
      definition: "A layer of Earth's atmosphere where gases become electrically charged. Radio waves can bounce off it like a trampoline!",
      image: "https://images.unsplash.com/photo-1640074130674-146cf793baac?w=400",
      examples: ["Helps radio communication", "Creates ionospheric storms", "Affected by solar activity"],
      relatedTerms: ["Atmosphere", "Radio Waves", "Space Weather"],
      category: "earth"
    },
    {
      term: "Cosmic Rays",
      definition: "Super-fast particles that zoom through space from far away. They're like tiny cosmic bullets traveling at incredible speeds!",
      image: "https://images.unsplash.com/photo-1711992635223-ad1ad38f7329?w=400",
      examples: ["Come from deep space", "Can affect electronics", "Create air showers"],
      relatedTerms: ["Radiation", "Space Weather", "Magnetosphere"],
      category: "phenomena"
    },
    {
      term: "Satellite",
      definition: "A spacecraft that orbits Earth to help us with communication, weather forecasting, and navigation. Space weather can affect how well they work!",
      image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
      examples: ["GPS satellites", "Weather satellites", "Communication satellites"],
      relatedTerms: ["Space Weather", "Technology", "Orbit"],
      category: "technology"
    },
    {
      term: "GPS",
      definition: "Global Positioning System - satellites that help us know exactly where we are on Earth. Space weather can make GPS less accurate!",
      image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?w=400",
      examples: ["Used in phones and cars", "Can be affected by space weather", "Needs multiple satellites"],
      relatedTerms: ["Satellite", "Technology", "Ionosphere"],
      category: "technology"
    }
  ];

  const filteredTerms = dictionaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = {
    solar: { name: "Solar Phenomena", color: "from-orange-400 to-red-500", icon: "☀️" },
    earth: { name: "Earth's Protection", color: "from-blue-400 to-green-500", icon: "🌍" },
    phenomena: { name: "Space Weather Events", color: "from-purple-400 to-pink-500", icon: "⚡" },
    technology: { name: "Technology Effects", color: "from-cyan-400 to-blue-500", icon: "🛰️" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-gray-800 text-4xl font-bold">Space Weather Dictionary</h1>
          </div>
          
          <Button 
            onClick={onBack}
            className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white text-xl px-8 py-4 rounded-2xl shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
            Back to Quizzes
          </Button>
        </div>

        {!selectedTerm && (
          <>
            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search vocabulary terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-xl border-4 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Dictionary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTerms.map((entry, index) => {
                const category = categories[entry.category as keyof typeof categories];
                return (
                  <motion.div
                    key={entry.term}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-purple-400"
                      onClick={() => setSelectedTerm(entry.term)}
                    >
                      <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${category.color}`}>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-800 text-sm px-3 py-1 font-bold">
                            {category.name}
                          </Badge>
                        </div>
                        <ImageWithFallback
                          src={entry.image}
                          alt={entry.term}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-bold text-2xl">{entry.term}</h3>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <p className="text-gray-600 text-lg mb-4 leading-relaxed line-clamp-3">
                          {entry.definition}
                        </p>
                        
                        <div className="flex items-center gap-2 text-purple-600">
                          <Eye className="w-5 h-5" />
                          <span className="font-bold">Click to learn more</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* Detailed Term Modal */}
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {(() => {
              const entry = dictionaryTerms.find(e => e.term === selectedTerm)!;
              const category = categories[entry.category as keyof typeof categories];
              return (
                <Card className="bg-white/95 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
                  <div className={`h-80 relative overflow-hidden bg-gradient-to-br ${category.color}`}>
                    <ImageWithFallback
                      src={entry.image}
                      alt={entry.term}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute top-6 right-6">
                      <Button
                        onClick={() => setSelectedTerm(null)}
                        className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 rounded-xl"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge className="bg-white/90 text-gray-800 text-lg px-4 py-2 font-bold mb-4">
                        {category.name}
                      </Badge>
                      <h1 className="text-white font-bold text-5xl">{entry.term}</h1>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 space-y-8">
                    <div>
                      <h3 className="text-gray-800 font-bold text-2xl mb-4 flex items-center gap-3">
                        <Lightbulb className="w-8 h-8 text-yellow-500" />
                        What is it?
                      </h3>
                      <p className="text-gray-700 text-xl leading-relaxed">{entry.definition}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-800 font-bold text-2xl mb-4 flex items-center gap-3">
                        <Star className="w-8 h-8 text-blue-500" />
                        Examples & Facts
                      </h3>
                      <ul className="space-y-3">
                        {entry.examples.map((example, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-700 text-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-gray-800 font-bold text-2xl mb-4 flex items-center gap-3">
                        <Target className="w-8 h-8 text-purple-500" />
                        Related Terms
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {entry.relatedTerms.map((related, index) => (
                          <Badge
                            key={index}
                            className="bg-purple-100 text-purple-800 text-lg px-4 py-2 font-bold cursor-pointer hover:bg-purple-200 transition-colors"
                            onClick={() => setSelectedTerm(related)}
                          >
                            {related}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}