import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Trophy, 
  Star, 
  Target, 
  ChevronLeft,
  Check,
  X,
  RotateCcw,
  Play,
  Award,
  Home,
  Zap,
  Globe,
  Sun,
  Satellite,
  Shield,
  Crown,
  Sparkles,
  ThumbsUp,
  Coins,
  Timer,
  Lightbulb
} from 'lucide-react';

interface MobileFriendlyQuizzesProps {
  playerName: string;
  onBack: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  points: number;
  illustration: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: QuizQuestion[];
  coinsReward: number;
}

export default function MobileFriendlyQuizzes({ playerName, onBack }: MobileFriendlyQuizzesProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const quizzes: Quiz[] = [
    {
      id: 'quiz1',
      title: 'Space Weather Basics',
      description: 'Learn the fundamentals!',
      icon: '🌟',
      gradient: 'from-blue-400 to-cyan-400',
      difficulty: 'Easy',
      coinsReward: 50,
      questions: [
        {
          id: 1,
          question: 'What is space weather?',
          options: [
            'Weather in outer space',
            'Changes in space caused by the Sun',
            'Rain and clouds in space',
            'Wind on other planets'
          ],
          correctAnswer: 1,
          explanation: 'Space weather refers to changes in space caused by solar activity that can affect Earth!',
          difficulty: 'Easy',
          category: 'Basics',
          points: 10,
          illustration: '🌟'
        },
        {
          id: 2,
          question: 'What creates auroras (Northern Lights)?',
          options: [
            'The Moon reflecting sunlight',
            'Solar particles hitting Earth\'s atmosphere',
            'Clouds lit up by lightning',
            'Stars twinkling brightly'
          ],
          correctAnswer: 1,
          explanation: 'Auroras happen when solar particles collide with gases in Earth\'s atmosphere, creating beautiful lights!',
          difficulty: 'Easy',
          category: 'Aurora',
          points: 10,
          illustration: '🌈'
        },
        {
          id: 3,
          question: 'What protects Earth from harmful space radiation?',
          options: [
            'The atmosphere only',
            'The magnetic field',
            'The oceans',
            'Nothing protects us'
          ],
          correctAnswer: 1,
          explanation: 'Earth\'s magnetic field acts like an invisible shield, protecting us from harmful solar radiation!',
          difficulty: 'Easy',
          category: 'Protection',
          points: 10,
          illustration: '🛡️'
        }
      ]
    },
    {
      id: 'quiz2',
      title: 'Solar Flares & Sun',
      description: 'Discover solar storms!',
      icon: '☀️',
      gradient: 'from-yellow-400 to-orange-500',
      difficulty: 'Medium',
      coinsReward: 75,
      questions: [
        {
          id: 1,
          question: 'What is a solar flare?',
          options: [
            'A burst of energy from the Sun',
            'A type of sunspot',
            'A comet passing by the Sun',
            'The Sun getting dimmer'
          ],
          correctAnswer: 0,
          explanation: 'Solar flares are sudden explosions of energy from the Sun\'s surface!',
          difficulty: 'Medium',
          category: 'Solar Activity',
          points: 15,
          illustration: '💥'
        },
        {
          id: 2,
          question: 'How long does it take for solar wind to reach Earth?',
          options: [
            'A few minutes',
            '1-5 days',
            'A few weeks',
            'Several months'
          ],
          correctAnswer: 1,
          explanation: 'Solar wind takes about 1-5 days to travel from the Sun to Earth!',
          difficulty: 'Medium',
          category: 'Solar Wind',
          points: 15,
          illustration: '💨'
        }
      ]
    },
    {
      id: 'quiz3',
      title: 'Technology Impact',
      description: 'How space weather affects us!',
      icon: '🛰️',
      gradient: 'from-purple-400 to-pink-500',
      difficulty: 'Medium',
      coinsReward: 75,
      questions: [
        {
          id: 1,
          question: 'What technology can be affected by space weather?',
          options: [
            'Only radio communications',
            'GPS, satellites, and power grids',
            'Just mobile phones',
            'None of the above'
          ],
          correctAnswer: 1,
          explanation: 'Space weather can disrupt GPS, damage satellites, and even cause power outages!',
          difficulty: 'Medium',
          category: 'Technology',
          points: 15,
          illustration: '📡'
        },
        {
          id: 2,
          question: 'Why do astronauts need to be careful during solar storms?',
          options: [
            'They might get lost',
            'Increased radiation exposure',
            'Their spaceship might overheat',
            'Communication stops working'
          ],
          correctAnswer: 1,
          explanation: 'Solar storms increase radiation levels, which can be dangerous for astronauts in space!',
          difficulty: 'Medium',
          category: 'Safety',
          points: 15,
          illustration: '👨‍🚀'
        }
      ]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const currentQ = selectedQuiz!.questions[currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(score + currentQ.points);
      setCorrectAnswers(correctAnswers + 1);
      playSound('success');
    } else {
      playSound('error');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const coinsEarned = Math.floor(score * 0.5) + selectedQuiz!.coinsReward;
      setEarnedCoins(coinsEarned);
      setIsCompleted(true);
      playSound('celebrate');
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCorrectAnswers(0);
    setIsCompleted(false);
    setEarnedCoins(0);
  };

  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      const frequencies = {
        success: 800,
        error: 200,
        celebrate: 1000,
        click: 400
      };
      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Quiz Results Screen
  if (isCompleted && selectedQuiz) {
    const percentage = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-3 md:p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="text-6xl md:text-9xl mb-4 md:mb-8"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 1 }}
            >
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
            </motion.div>

            <h2 className="text-3xl md:text-6xl text-white mb-2 md:mb-4">
              {percentage >= 80 ? 'Amazing!' : percentage >= 60 ? 'Great Job!' : 'Good Try!'}
            </h2>

            <Card className="bg-white/10 backdrop-blur-lg border-2 md:border-4 border-cyan-400 mb-4 md:mb-8">
              <CardContent className="p-4 md:p-8">
                <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                  <div className="text-center">
                    <Target className="w-8 h-8 md:w-12 md:h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-3xl md:text-5xl text-white mb-1 md:mb-2">{correctAnswers}/{selectedQuiz.questions.length}</p>
                    <p className="text-sm md:text-lg text-cyan-200">Correct</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 mx-auto mb-2" />
                    <p className="text-3xl md:text-5xl text-white mb-1 md:mb-2">{score}</p>
                    <p className="text-sm md:text-lg text-cyan-200">Points</p>
                  </div>
                </div>

                <motion.div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-center gap-2 md:gap-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Coins className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  <span className="text-white text-2xl md:text-4xl">
                    +{earnedCoins} Cosmic Coins!
                  </span>
                </motion.div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                onClick={handleRetakeQuiz}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base md:text-xl px-6 py-4 md:px-8 md:py-6 rounded-xl md:rounded-2xl flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
                Retake Quiz
              </Button>
              <Button
                onClick={() => setSelectedQuiz(null)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-base md:text-xl px-6 py-4 md:px-8 md:py-6 rounded-xl md:rounded-2xl flex items-center gap-2"
              >
                <Trophy className="w-5 h-5 md:w-6 md:h-6" />
                Choose Another Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz Playing Screen
  if (selectedQuiz) {
    const currentQ = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-3 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header - Mobile Optimized */}
          <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
            <Button
              onClick={() => setSelectedQuiz(null)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-xl flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            
            <div className="flex-1 text-center">
              <h2 className="text-lg md:text-2xl text-white">{selectedQuiz.title}</h2>
              <p className="text-xs md:text-sm text-cyan-200">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 md:px-4 md:py-3 rounded-xl flex-shrink-0">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-white text-sm md:text-base">{score}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2 md:h-3 mb-4 md:mb-6" />

          {/* Question Card - Mobile Optimized */}
          <Card className="bg-white/10 backdrop-blur-lg border-2 md:border-4 border-cyan-400 mb-4 md:mb-6">
            <CardContent className="p-4 md:p-8">
              {/* Illustration */}
              <motion.div
                className="text-5xl md:text-8xl text-center mb-4 md:mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                {currentQ.illustration}
              </motion.div>

              {/* Question */}
              <h3 className="text-xl md:text-3xl text-white text-center mb-4 md:mb-8 leading-tight">
                {currentQ.question}
              </h3>

              {/* Answer Options - Mobile Optimized */}
              <div className="space-y-3 md:space-y-4">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQ.correctAnswer;
                  const showCorrect = showExplanation && isCorrect;
                  const showWrong = showExplanation && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 md:border-4 text-left text-base md:text-xl transition-all ${
                        showCorrect
                          ? 'bg-green-500 border-green-300 text-white'
                          : showWrong
                          ? 'bg-red-500 border-red-300 text-white'
                          : isSelected
                          ? 'bg-cyan-500 border-cyan-300 text-white'
                          : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                      }`}
                      whileHover={!showExplanation ? { scale: 1.02 } : {}}
                      whileTap={!showExplanation ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex-1 leading-tight">{option}</span>
                        {showCorrect && <Check className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />}
                        {showWrong && <X className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation - Mobile Optimized */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl md:rounded-2xl border-2 border-cyan-400/50"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <p className="text-white text-sm md:text-lg leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Next Button - Mobile Optimized */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg md:text-2xl py-6 md:py-8 rounded-xl md:rounded-2xl"
              >
                {currentQuestion < selectedQuiz.questions.length - 1 ? 'Next Question' : 'See Results'} →
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Quiz Selection Screen - Mobile Optimized
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-3 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="flex items-center justify-between mb-4 md:mb-8 gap-2">
          <Button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm md:text-xl px-4 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl flex-shrink-0"
          >
            <Home className="w-4 h-4 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:inline md:hidden">Back</span>
          </Button>

          <div className="text-center flex-1">
            <h1 className="text-2xl md:text-5xl text-white mb-1 md:mb-2">
              Space Weather Quizzes
            </h1>
            <p className="text-sm md:text-xl text-cyan-200">
              Test your knowledge!
            </p>
          </div>

          <div className="w-16 md:w-auto"></div>
        </div>

        {/* Quiz Cards - Mobile Optimized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`bg-gradient-to-br ${quiz.gradient} border-2 md:border-4 border-white/30 shadow-2xl cursor-pointer h-full`}
                onClick={() => {
                  setSelectedQuiz(quiz);
                  playSound('click');
                }}
              >
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-4xl md:text-6xl">{quiz.icon}</span>
                    <Badge className={`${getDifficultyColor(quiz.difficulty)} text-white text-xs md:text-sm`}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl md:text-2xl mb-2">
                    {quiz.title}
                  </CardTitle>
                  <p className="text-white/90 text-sm md:text-base">
                    {quiz.description}
                  </p>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-2 md:space-y-3 mb-3 md:mb-4 text-sm md:text-base text-white/90">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 md:w-5 md:h-5" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
                      <span>Earn up to {quiz.coinsReward} Coins</span>
                    </div>
                  </div>

                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white text-base md:text-lg py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-white/50 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
