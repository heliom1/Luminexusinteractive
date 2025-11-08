import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import SpaceDictionary from './SpaceDictionary';
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
  BookOpen,
  Award,
  Timer,
  Lightbulb,
  Rocket,
  Home,
  Heart,
  Zap,
  Globe,
  Sun,
  Satellite,
  Shield,
  Radio,
  Crown,
  Gift,
  Sparkles,
  ThumbsUp,
  Volume2,
  VolumeX,
  HelpCircle,
  Info,
  Eye,
  Headphones,
  Smile,
  Users,
  Map,
  Compass,
  FlaskConical,
  Microscope,
  Telescope,
  Atom,
  Activity,
  TrendingUp,
  BarChart,
  PieChart,
  Settings
} from 'lucide-react';

interface FunctionalQuizzesProps {
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
  funFact: string;
  vocabulary?: Array<{ word: string; meaning: string; example: string }>;
  illustration?: React.ReactNode;
  points: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  questions: QuizQuestion[];
  timeLimit?: number;
}

interface QuizState {
  currentQuestion: number;
  score: number;
  correctAnswers: number;
  answers: number[];
  timeLeft: number;
  isCompleted: boolean;
  startTime: number;
}

export default function FunctionalQuizzes({ playerName, onBack }: FunctionalQuizzesProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    correctAnswers: 0,
    answers: [],
    timeLeft: 0,
    isCompleted: false,
    startTime: 0
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictionaryWord, setDictionaryWord] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [playerStats, setPlayerStats] = useState({
    quizzesCompleted: 0,
    totalScore: 0,
    averageScore: 0,
    perfectScores: 0,
    wordsLearned: 0
  });

  // Beautiful Quiz Illustration Component
  const QuizIllustration = ({ type, animated = true }: { type: string; animated?: boolean }) => {
    const getIllustration = () => {
      switch(type) {
        case 'solar_system':
          return (
            <div className="text-center p-6 bg-gradient-to-br from-purple-800 via-blue-800 to-indigo-900 rounded-3xl border-4 border-cyan-400">
              <motion.div 
                className="text-5xl mb-4"
                animate={animated ? { rotate: [0, 360] } : {}}
                transition={{ duration: 8, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              <div className="flex justify-center items-center gap-4 mb-4">
                <motion.span 
                  className="text-2xl"
                  animate={animated ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  🌍
                </motion.span>
                <motion.span 
                  className="text-xl"
                  animate={animated ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  🌙
                </motion.span>
                <motion.span 
                  className="text-3xl"
                  animate={animated ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  🪐
                </motion.span>
              </div>
              <div className="text-white font-bold">Our Solar System</div>
            </div>
          );

        case 'space_weather':
          return (
            <div className="text-center p-6 bg-gradient-to-br from-orange-600 via-red-600 to-purple-700 rounded-3xl border-4 border-orange-400">
              <motion.div 
                className="text-4xl mb-4"
                animate={animated ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              <motion.div 
                className="flex justify-center gap-2 mb-4"
                animate={animated ? { x: [0, 50] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-yellow-400">⚡</span>
                <span className="text-orange-400">⚡</span>
                <span className="text-red-400">⚡</span>
              </motion.div>
              <motion.div 
                className="text-4xl mb-4"
                animate={animated ? { scale: [1, 0.9, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🌍
              </motion.div>
              <div className="text-white font-bold">Space Weather in Action</div>
            </div>
          );

        case 'satellites':
          return (
            <div className="text-center p-6 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 rounded-3xl border-4 border-cyan-400">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div 
                  animate={animated ? { y: [0, -15, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="text-3xl"
                >
                  🛰️
                </motion.div>
                <motion.div 
                  animate={animated ? { y: [0, -15, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-3xl"
                >
                  🛰️
                </motion.div>
                <motion.div 
                  animate={animated ? { y: [0, -15, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="text-3xl"
                >
                  🛰️
                </motion.div>
                <motion.div 
                  animate={animated ? { y: [0, -15, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  className="text-3xl"
                >
                  🛰️
                </motion.div>
              </div>
              <div className="text-white font-bold">Satellite Network</div>
            </div>
          );

        case 'aurora':
          return (
            <div className="text-center p-6 bg-gradient-to-br from-green-600 via-purple-600 to-pink-600 rounded-3xl border-4 border-green-400">
              <motion.div 
                className="h-20 rounded-2xl flex items-center justify-center text-4xl mb-4"
                animate={animated ? { 
                  background: [
                    'linear-gradient(45deg, #22c55e, #8b5cf6)',
                    'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    'linear-gradient(45deg, #ec4899, #22c55e)'
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌈💚💜💙💛🌈
              </motion.div>
              <div className="text-white font-bold">Beautiful Aurora</div>
            </div>
          );

        default:
          return (
            <div className="text-center p-6 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl">
              <motion.div 
                className="text-5xl"
                animate={animated ? { rotate: [0, 360] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧠
              </motion.div>
            </div>
          );
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        {getIllustration()}
      </motion.div>
    );
  };

  // Enhanced quizzes with more questions and better content
  const quizzes: Quiz[] = [
    {
      id: 'space-weather-basics',
      title: '🌟 Space Weather Basics',
      description: 'Test your knowledge about space weather fundamentals!',
      icon: '☀️',
      gradient: 'from-yellow-400 via-orange-500 to-red-600',
      difficulty: 'Easy',
      category: 'Fundamentals',
      timeLimit: 300, // 5 minutes
      questions: [
        {
          id: 1,
          question: "What is the main source of space weather?",
          options: ["The Moon", "The Sun", "Jupiter", "Mars"],
          correctAnswer: 1,
          explanation: "The Sun is the main source of space weather! It constantly sends out energy and particles that create space weather events when they interact with Earth's magnetic field.",
          difficulty: 'Easy',
          category: 'Solar Physics',
          funFact: "The Sun releases as much energy in one second as humans have used in all of history!",
          vocabulary: [
            { word: 'Space weather', meaning: 'Conditions in space that can affect Earth and technology', example: 'Like weather on Earth, but in space!' },
            { word: 'Solar energy', meaning: 'Energy that comes from the Sun', example: 'The power that makes the Sun shine and warm our planet!' }
          ],
          illustration: <QuizIllustration type="solar_system" />,
          points: 10
        },
        {
          id: 2,
          question: "What protects Earth from most harmful space weather?",
          options: ["The atmosphere only", "Earth's magnetic field", "The ozone layer", "Gravity"],
          correctAnswer: 1,
          explanation: "Earth's magnetic field acts like an invisible shield, deflecting most harmful particles from space away from our planet. It's like Earth's own superhero force field!",
          difficulty: 'Easy',
          category: 'Earth Science',
          funFact: "Earth's magnetic field extends far into space, creating a protective bubble called the magnetosphere!",
          vocabulary: [
            { word: 'Magnetic field', meaning: 'An invisible force field around Earth created by its core', example: 'Like an invisible superhero shield protecting our planet!' },
            { word: 'Magnetosphere', meaning: 'The region around Earth controlled by its magnetic field', example: 'Earth\'s magnetic neighborhood in space!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 10
        },
        {
          id: 3,
          question: "What creates the beautiful aurora lights (Northern Lights)?",
          options: ["Airplanes flying high", "Solar particles hitting Earth's atmosphere", "City lights reflecting", "Moon phases"],
          correctAnswer: 1,
          explanation: "Auroras are created when solar particles interact with gases in Earth's atmosphere! Oxygen creates green and red colors, while nitrogen creates blue and purple. It's like nature's own light show!",
          difficulty: 'Easy',
          category: 'Aurora Physics',
          funFact: "Auroras can occur on other planets too! Jupiter and Saturn have spectacular auroras at their poles!",
          vocabulary: [
            { word: 'Aurora', meaning: 'Beautiful colored lights that dance in the sky near the poles', example: 'Nature\'s own disco lights in the sky!' },
            { word: 'Solar particles', meaning: 'Tiny invisible pieces of energy that come from the Sun', example: 'Like cosmic dust particles that glow when they hit our atmosphere!' }
          ],
          illustration: <QuizIllustration type="aurora" />,
          points: 10
        },
        {
          id: 4,
          question: "How many satellites does GPS typically need to determine your location?",
          options: ["At least 2", "At least 4", "At least 8", "Just 1"],
          correctAnswer: 1,
          explanation: "GPS needs signals from at least 4 satellites to pinpoint your exact location! It's like having 4 friends point to you from different corners of a playground - they can figure out exactly where you are!",
          difficulty: 'Medium',
          category: 'GPS Technology',
          funFact: "There are actually 24 GPS satellites orbiting Earth, so your device can always 'see' at least 4 of them!",
          vocabulary: [
            { word: 'GPS', meaning: 'Global Positioning System - uses satellites to find your exact location', example: 'Like a magical map that always knows exactly where you are!' },
            { word: 'Satellite', meaning: 'A machine that orbits around Earth in space', example: 'Like helpful robots flying around our planet sending signals!' }
          ],
          illustration: <QuizIllustration type="satellites" />,
          points: 15
        },
        {
          id: 5,
          question: "During a solar storm, what might happen to GPS accuracy?",
          options: ["It becomes more accurate", "It becomes less accurate", "Nothing changes", "GPS stops working forever"],
          correctAnswer: 1,
          explanation: "During solar storms, GPS can become less accurate because the extra energy in the atmosphere can delay or bend GPS signals. It's like trying to see clearly through water - things can look a bit off!",
          difficulty: 'Medium',
          category: 'Space Weather Effects',
          funFact: "Some GPS errors during solar storms can make your location appear to be hundreds of meters away from where you actually are!",
          vocabulary: [
            { word: 'Solar storm', meaning: 'When the Sun sends extra energy and particles toward Earth', example: 'Like the Sun having a really big sneeze that reaches Earth!' },
            { word: 'Accuracy', meaning: 'How close something is to being exactly right', example: 'Like hitting the bullseye on a target!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 15
        }
      ]
    },
    {
      id: 'solar-science',
      title: '☀️ Solar Science Explorer',
      description: 'Discover amazing facts about our nearest star and its effects!',
      icon: '☀️',
      gradient: 'from-orange-400 via-yellow-500 to-red-600',
      difficulty: 'Medium',
      category: 'Solar Physics',
      timeLimit: 420, // 7 minutes
      questions: [
        {
          id: 1,
          question: "How long does it take for light from the Sun to reach Earth?",
          options: ["1 minute", "8 minutes", "1 hour", "1 day"],
          correctAnswer: 1,
          explanation: "Sunlight takes about 8 minutes to travel from the Sun to Earth! Light is incredibly fast, but space is so big that even light takes time to travel. By the time you see the Sun, you're seeing what it looked like 8 minutes ago!",
          difficulty: 'Medium',
          category: 'Solar Physics',
          funFact: "If the Sun suddenly turned off, we wouldn't know for 8 minutes because that's how long it takes for the light to reach us!",
          vocabulary: [
            { word: 'Light speed', meaning: 'The fastest speed possible in the universe', example: 'Light travels so fast it could go around Earth 7 times in just 1 second!' },
            { word: 'Solar radiation', meaning: 'Energy that travels from the Sun in all directions', example: 'Like invisible rays of energy that warm our planet!' }
          ],
          illustration: <QuizIllustration type="solar_system" />,
          points: 15
        },
        {
          id: 2,
          question: "What are solar flares?",
          options: ["Small fires on the Sun", "Sudden bursts of energy from the Sun", "Solar panels breaking", "Sunspots moving"],
          correctAnswer: 1,
          explanation: "Solar flares are sudden, powerful bursts of energy from the Sun's surface! They're like giant cosmic explosions that can send energy racing toward Earth at incredible speeds. They're much more powerful than any explosion on Earth!",
          difficulty: 'Medium',
          category: 'Solar Activity',
          funFact: "A single large solar flare can release as much energy as billions of hydrogen bombs exploding at once!",
          vocabulary: [
            { word: 'Solar flare', meaning: 'A sudden explosion of energy from the Sun\'s surface', example: 'Like a cosmic firework going off on the Sun!' },
            { word: 'Energy burst', meaning: 'A sudden release of a lot of energy all at once', example: 'Like a balloon popping and releasing all its air at once!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 20
        },
        {
          id: 3,
          question: "What is the solar wind?",
          options: ["Wind that blows on the Sun", "A constant stream of particles from the Sun", "Solar panels spinning", "Hot air from the Sun"],
          correctAnswer: 1,
          explanation: "The solar wind is a constant stream of particles flowing from the Sun in all directions! It's like an invisible river of tiny particles that flows through the entire solar system. Earth's magnetic field protects us from most of these particles!",
          difficulty: 'Medium',
          category: 'Solar Physics',
          funFact: "The solar wind travels at speeds of about 400 kilometers per second - that's over 1 million miles per hour!",
          vocabulary: [
            { word: 'Solar wind', meaning: 'A constant flow of particles from the Sun', example: 'Like an invisible river flowing from the Sun through space!' },
            { word: 'Particle stream', meaning: 'A flow of tiny invisible pieces', example: 'Like a river made of tiny invisible sand grains!' }
          ],
          illustration: <QuizIllustration type="solar_system" />,
          points: 20
        },
        {
          id: 4,
          question: "What happens during a coronal mass ejection (CME)?",
          options: ["The Sun gets smaller", "The Sun shoots out a huge bubble of particles", "The Sun changes color", "The Sun stops shining"],
          correctAnswer: 1,
          explanation: "A coronal mass ejection is when the Sun shoots out a massive bubble of particles and magnetic field into space! It's like the Sun blowing a giant soap bubble, but this bubble is made of energy and particles and can be bigger than Earth!",
          difficulty: 'Hard',
          category: 'Solar Activity',
          funFact: "Some CMEs are so large they could contain several planet Earths inside them!",
          vocabulary: [
            { word: 'Coronal mass ejection', meaning: 'When the Sun shoots out a huge bubble of particles', example: 'Like the Sun blowing the biggest bubble ever!' },
            { word: 'Magnetic field bubble', meaning: 'A region where magnetic forces are contained like in a bubble', example: 'Like an invisible soap bubble made of magnetic force!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 25
        },
        {
          id: 5,
          question: "How hot is the Sun's core?",
          options: ["About 1,000°C", "About 100,000°C", "About 15 million°C", "About 1 billion°C"],
          correctAnswer: 2,
          explanation: "The Sun's core is about 15 million degrees Celsius! That's incredibly hot - hot enough to melt anything in just an instant. It's so hot that atoms fuse together, creating the energy that makes the Sun shine!",
          difficulty: 'Hard',
          category: 'Solar Physics',
          funFact: "The Sun's core is about 250 times hotter than the hottest ovens on Earth!",
          vocabulary: [
            { word: 'Nuclear fusion', meaning: 'When atoms stick together and create energy', example: 'Like tiny invisible Lego blocks combining to make power!' },
            { word: 'Solar core', meaning: 'The center of the Sun where all the energy is made', example: 'Like the engine room of the Sun!' }
          ],
          illustration: <QuizIllustration type="solar_system" />,
          points: 25
        }
      ]
    },
    {
      id: 'technology-impacts',
      title: '📱 Technology & Space Weather',
      description: 'Learn how space weather affects the technology we use every day!',
      icon: '📱',
      gradient: 'from-blue-400 via-purple-500 to-pink-600',
      difficulty: 'Medium',
      category: 'Technology',
      timeLimit: 360, // 6 minutes
      questions: [
        {
          id: 1,
          question: "Which technology is most commonly affected by space weather?",
          options: ["Kitchen microwaves", "GPS navigation", "Light bulbs", "Bicycles"],
          correctAnswer: 1,
          explanation: "GPS navigation is the most commonly affected technology! Space weather can interfere with satellite signals, making GPS less accurate. This affects everything from your phone's maps to airplane navigation!",
          difficulty: 'Easy',
          category: 'GPS Technology',
          funFact: "During major space weather events, some GPS systems can be off by hundreds of meters!",
          vocabulary: [
            { word: 'Navigation', meaning: 'Finding your way from one place to another', example: 'Like using a treasure map to find where you want to go!' },
            { word: 'Satellite signal', meaning: 'Messages sent from satellites in space', example: 'Like invisible text messages from space robots!' }
          ],
          illustration: <QuizIllustration type="satellites" />,
          points: 10
        },
        {
          id: 2,
          question: "How can space weather affect power grids?",
          options: ["It makes electricity green", "It can cause blackouts", "It makes power cheaper", "It has no effect"],
          correctAnswer: 1,
          explanation: "Space weather can cause blackouts by creating electrical currents in power lines! During strong space weather events, these currents can overload transformers and cause power outages. It's like nature creating too much electricity!",
          difficulty: 'Medium',
          category: 'Power Systems',
          funFact: "The largest space weather blackout in recent history left 6 million people in Quebec, Canada without power for 9 hours in 1989!",
          vocabulary: [
            { word: 'Power grid', meaning: 'The network that brings electricity to homes and businesses', example: 'Like a giant web of wires that brings power everywhere!' },
            { word: 'Electrical current', meaning: 'The flow of electricity through wires', example: 'Like water flowing through pipes, but with electricity!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 15
        },
        {
          id: 3,
          question: "What happens to radio communications during a solar storm?",
          options: ["They become clearer", "They can become fuzzy or stop working", "They work faster", "Nothing changes"],
          correctAnswer: 1,
          explanation: "Radio communications can become fuzzy or stop working during solar storms! The extra energy in the atmosphere can interfere with radio waves, like trying to listen to music during a thunderstorm. That's why pilots and ships have backup communication systems!",
          difficulty: 'Medium',
          category: 'Communications',
          funFact: "During the strongest solar storms, even amateur radio operators around the world can lose communication for hours!",
          vocabulary: [
            { word: 'Radio waves', meaning: 'Invisible waves that carry information through the air', example: 'Like invisible rivers carrying messages!' },
            { word: 'Communication', meaning: 'Sending and receiving messages', example: 'Like talking to someone, but using invisible waves!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 15
        },
        {
          id: 4,
          question: "Why do airlines sometimes change flight paths during space weather events?",
          options: ["To see auroras better", "To avoid communication problems", "To save fuel", "To fly faster"],
          correctAnswer: 1,
          explanation: "Airlines change flight paths to avoid communication problems! During space weather events, radio communication with air traffic control can become unreliable. Flying different routes ensures pilots can always stay in contact for safety!",
          difficulty: 'Medium',
          category: 'Aviation',
          funFact: "Polar flights are most affected because that's where space weather has the strongest effects on Earth!",
          vocabulary: [
            { word: 'Flight path', meaning: 'The route an airplane takes through the sky', example: 'Like a highway in the sky for airplanes!' },
            { word: 'Air traffic control', meaning: 'People who help guide airplanes safely', example: 'Like traffic directors for the sky!' }
          ],
          illustration: <QuizIllustration type="satellites" />,
          points: 20
        },
        {
          id: 5,
          question: "How do satellites protect themselves from space weather?",
          options: ["They hide behind the Moon", "They have shielding and can go into safe mode", "They fly away from Earth", "They don't need protection"],
          correctAnswer: 1,
          explanation: "Satellites have special shielding and can go into 'safe mode' during space weather events! Safe mode is like the satellite taking a nap - it turns off non-essential systems to protect itself until the space weather calms down!",
          difficulty: 'Hard',
          category: 'Satellite Technology',
          funFact: "Some satellites can automatically detect space weather and put themselves into safe mode without any human control!",
          vocabulary: [
            { word: 'Shielding', meaning: 'Special protection to block harmful energy', example: 'Like armor that protects satellites from space weather!' },
            { word: 'Safe mode', meaning: 'When a satellite turns off non-essential systems to protect itself', example: 'Like a turtle hiding in its shell when there\'s danger!' }
          ],
          illustration: <QuizIllustration type="satellites" />,
          points: 25
        }
      ]
    },
    {
      id: 'earth-protection',
      title: '🛡️ Earth\'s Natural Shields',
      description: 'Explore how our planet protects us from space weather!',
      icon: '🛡️',
      gradient: 'from-green-400 via-blue-500 to-purple-600',
      difficulty: 'Medium',
      category: 'Earth Science',
      timeLimit: 300,
      questions: [
        {
          id: 1,
          question: "What creates Earth's magnetic field?",
          options: ["The Sun", "Earth's spinning liquid iron core", "The Moon", "The atmosphere"],
          correctAnswer: 1,
          explanation: "Earth's magnetic field is created by its spinning liquid iron core! Deep inside Earth, liquid iron moves around as our planet spins, creating electrical currents that make a magnetic field. It's like Earth is a giant magnet!",
          difficulty: 'Medium',
          category: 'Geophysics',
          funFact: "Earth's magnetic field is about 100 times weaker than a refrigerator magnet, but it extends thousands of kilometers into space!",
          vocabulary: [
            { word: 'Liquid iron core', meaning: 'Melted iron at the center of Earth', example: 'Like a giant ball of liquid metal at Earth\'s center!' },
            { word: 'Magnetic field', meaning: 'An invisible force field around Earth', example: 'Like an invisible superhero shield protecting our planet!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 15
        },
        {
          id: 2,
          question: "What is the magnetosphere?",
          options: ["A sphere made of magnets", "The region around Earth controlled by its magnetic field", "Earth's atmosphere", "A layer of the Sun"],
          correctAnswer: 1,
          explanation: "The magnetosphere is the region around Earth controlled by its magnetic field! It's like Earth's magnetic neighborhood in space - a huge bubble that deflects most harmful particles from the Sun away from our planet!",
          difficulty: 'Medium',
          category: 'Space Physics',
          funFact: "The magnetosphere extends about 65,000 kilometers on the side facing the Sun - that's 5 times wider than Earth itself!",
          vocabulary: [
            { word: 'Magnetosphere', meaning: 'Earth\'s magnetic neighborhood in space', example: 'Like a protective bubble around Earth made of magnetic force!' },
            { word: 'Deflect', meaning: 'To push something away or make it bounce off', example: 'Like a shield bouncing arrows away!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 20
        },
        {
          id: 3,
          question: "How does Earth's atmosphere help protect us?",
          options: ["It reflects all space weather", "It absorbs and scatters harmful radiation", "It pushes space weather away", "It doesn't help protect us"],
          correctAnswer: 1,
          explanation: "Earth's atmosphere absorbs and scatters harmful radiation from space! It's like a thick blanket that protects us. Most harmful particles from space get absorbed by the atmosphere before they can reach the ground where we live!",
          difficulty: 'Medium',
          category: 'Atmospheric Science',
          funFact: "Our atmosphere is so good at protecting us that astronauts in space stations get 100 times more radiation exposure than people on Earth!",
          vocabulary: [
            { word: 'Atmosphere', meaning: 'The layers of gases around Earth', example: 'Like a warm, protective blanket of air around our planet!' },
            { word: 'Radiation', meaning: 'Energy that travels through space', example: 'Like invisible rays of energy from the Sun!' }
          ],
          illustration: <QuizIllustration type="space_weather" />,
          points: 20
        },
        {
          id: 4,
          question: "What happens when solar particles reach Earth's magnetic field?",
          options: ["They bounce off randomly", "They get guided toward the poles", "They disappear", "They turn into light immediately"],
          correctAnswer: 1,
          explanation: "Solar particles get guided toward Earth's poles by our magnetic field! The magnetic field lines act like invisible slides that guide the particles toward the North and South poles, where they create beautiful auroras!",
          difficulty: 'Medium',
          category: 'Aurora Physics',
          funFact: "The shape of Earth's magnetic field is why auroras are usually seen near the North and South poles!",
          vocabulary: [
            { word: 'Magnetic field lines', meaning: 'Invisible paths that show where magnetic force points', example: 'Like invisible roller coaster tracks in space!' },
            { word: 'Poles', meaning: 'The top and bottom points of Earth', example: 'Like the very top and bottom of a spinning ball!' }
          ],
          illustration: <QuizIllustration type="aurora" />,
          points: 20
        },
        {
          id: 5,
          question: "Why don't we see auroras at the equator very often?",
          options: ["It's too hot there", "Magnetic field lines don't guide particles there", "There's too much light pollution", "The atmosphere is different"],
          correctAnswer: 1,
          explanation: "We don't see auroras at the equator because magnetic field lines don't guide particles there! Earth's magnetic field naturally directs solar particles toward the poles, so that's where auroras usually happen. During very strong space weather, auroras can sometimes be seen farther from the poles!",
          difficulty: 'Hard',
          category: 'Aurora Physics',
          funFact: "During the strongest space weather events in history, auroras have been seen as far south as the Caribbean!",
          vocabulary: [
            { word: 'Equator', meaning: 'An imaginary line around the middle of Earth', example: 'Like a belt around Earth\'s waist!' },
            { word: 'Magnetic guidance', meaning: 'How magnetic fields direct the path of particles', example: 'Like invisible train tracks guiding particles to specific places!' }
          ],
          illustration: <QuizIllustration type="aurora" />,
          points: 25
        }
      ]
    }
  ];

  const playSound = (type: string) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies = {
        success: 880,
        click: 440,
        wrong: 220,
        complete: 1100,
        tick: 600,
        celebration: 1320
      };
      
      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (selectedQuiz && quizState.timeLeft > 0 && !quizState.isCompleted && !showExplanation) {
      interval = setInterval(() => {
        setQuizState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            return { ...prev, timeLeft: 0, isCompleted: true };
          }
          if (newTimeLeft <= 10) {
            playSound('tick');
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedQuiz, quizState.timeLeft, quizState.isCompleted, showExplanation]);

  const startQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    setSelectedQuiz(quizId);
    setQuizState({
      currentQuestion: 0,
      score: 0,
      correctAnswers: 0,
      answers: [],
      timeLeft: quiz.timeLimit || 300,
      isCompleted: false,
      startTime: Date.now()
    });
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowResults(false);
    playSound('click');
  };

  const selectAnswer = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
    playSound('click');
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return;

    const currentQ = quiz.questions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    setQuizState(prev => ({
      ...prev,
      answers: [...prev.answers, selectedAnswer],
      score: prev.score + (isCorrect ? currentQ.points : 0),
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0)
    }));

    setShowExplanation(true);
    playSound(isCorrect ? 'success' : 'wrong');

    // Auto-advance after showing explanation
    setTimeout(() => {
      if (quizState.currentQuestion < quiz.questions.length - 1) {
        setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setQuizState(prev => ({ ...prev, isCompleted: true }));
        setShowResults(true);
        playSound('complete');
        
        // Update player stats
        const totalQuestions = quiz.questions.length;
        const correctCount = quizState.correctAnswers + (isCorrect ? 1 : 0);
        const percentage = Math.round((correctCount / totalQuestions) * 100);
        
        setPlayerStats(prev => ({
          quizzesCompleted: prev.quizzesCompleted + 1,
          totalScore: prev.totalScore + quizState.score + (isCorrect ? currentQ.points : 0),
          averageScore: Math.round(((prev.totalScore + quizState.score + (isCorrect ? currentQ.points : 0)) / (prev.quizzesCompleted + 1))),
          perfectScores: prev.perfectScores + (percentage === 100 ? 1 : 0),
          wordsLearned: prev.wordsLearned
        }));
      }
    }, 4000);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuizState({
      currentQuestion: 0,
      score: 0,
      correctAnswers: 0,
      answers: [],
      timeLeft: 0,
      isCompleted: false,
      startTime: 0
    });
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowResults(false);
    playSound('click');
  };

  const openDictionary = (word: string) => {
    setDictionaryWord(word);
    setShowDictionary(true);
    setPlayerStats(prev => ({ ...prev, wordsLearned: prev.wordsLearned + 1 }));
    playSound('click');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuizPlayer = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz || showResults) return null;

    const currentQ = quiz.questions[quizState.currentQuestion];
    const progress = ((quizState.currentQuestion + 1) / quiz.questions.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4"
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button
            onClick={resetQuiz}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-lg px-6 py-3 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" />
            Back to Quizzes
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg">
              Score: {quizState.score}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-lg">
              {quizState.currentQuestion + 1}/{quiz.questions.length}
            </Badge>
            <Badge className={`${quizState.timeLeft <= 30 ? 'bg-red-500' : 'bg-gray-600'} text-white px-4 py-2 text-lg`}>
              <Timer className="w-5 h-5 mr-2" />
              {formatTime(quizState.timeLeft)}
            </Badge>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-full p-3 mb-6 max-w-4xl mx-auto">
          <Progress value={progress} className="h-4" />
          <p className="text-center text-white mt-3 text-lg">
            Question {quizState.currentQuestion + 1} of {quiz.questions.length}
          </p>
        </div>

        {/* Quiz Content */}
        <motion.div
          key={quizState.currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-4 border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Badge className={`${
                  currentQ.difficulty === 'Easy' ? 'bg-green-500' :
                  currentQ.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                } text-white text-lg px-4 py-2`}>
                  {currentQ.difficulty}
                </Badge>
                <Badge className="bg-purple-500 text-white text-lg px-4 py-2">
                  {currentQ.category}
                </Badge>
                <Badge className="bg-cyan-500 text-white text-lg px-4 py-2">
                  {currentQ.points} pts
                </Badge>
              </div>
              
              <CardTitle className="text-3xl text-white mb-6">{currentQ.question}</CardTitle>
              
              {/* Illustration */}
              {currentQ.illustration && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  {currentQ.illustration}
                </motion.div>
              )}
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Button
                      onClick={() => selectAnswer(index)}
                      disabled={showExplanation}
                      className={`w-full p-6 text-xl text-left transition-all duration-300 ${
                        selectedAnswer === index
                          ? showExplanation
                            ? index === currentQ.correctAnswer
                              ? 'bg-green-600 border-green-400'
                              : 'bg-red-600 border-red-400'
                            : 'bg-cyan-600 border-cyan-400'
                          : showExplanation && index === currentQ.correctAnswer
                            ? 'bg-green-600 border-green-400'
                            : 'bg-white/10 hover:bg-white/20 border-white/30'
                      } border-2 rounded-xl`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex-1">{option}</span>
                        {showExplanation && (
                          <div className="ml-4">
                            {index === currentQ.correctAnswer ? (
                              <Check className="w-6 h-6 text-green-200" />
                            ) : selectedAnswer === index ? (
                              <X className="w-6 h-6 text-red-200" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              {!showExplanation && (
                <div className="text-center">
                  <Button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-xl rounded-xl disabled:opacity-50"
                  >
                    Submit Answer
                  </Button>
                </div>
              )}

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className={`p-6 rounded-2xl border-2 ${
                      selectedAnswer === currentQ.correctAnswer
                        ? 'bg-green-500/20 border-green-400'
                        : 'bg-red-500/20 border-red-400'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        {selectedAnswer === currentQ.correctAnswer ? (
                          <Check className="w-8 h-8 text-green-400" />
                        ) : (
                          <X className="w-8 h-8 text-red-400" />
                        )}
                        <span className="text-white font-bold text-2xl">
                          {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Not quite right!'}
                        </span>
                      </div>
                      <p className="text-white text-xl leading-relaxed">{currentQ.explanation}</p>
                    </div>

                    {/* Fun Fact */}
                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-cyan-400/30">
                      <div className="flex items-center gap-3 mb-3">
                        <Lightbulb className="w-6 h-6 text-cyan-300" />
                        <span className="text-cyan-200 font-bold text-xl">Fun Fact!</span>
                      </div>
                      <p className="text-cyan-100 text-xl">{currentQ.funFact}</p>
                    </div>

                    {/* Vocabulary */}
                    {currentQ.vocabulary && (
                      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-400/30">
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="w-6 h-6 text-purple-300" />
                          <span className="text-purple-200 font-bold text-xl">Learn New Words!</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {currentQ.vocabulary.map((word, index) => (
                            <Button
                              key={index}
                              onClick={() => openDictionary(word.word)}
                              className="bg-purple-500/30 hover:bg-purple-500/40 text-purple-100 border-2 border-purple-400/30 text-lg px-4 py-2 rounded-xl"
                            >
                              {word.word} 📖
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dictionary */}
        <SpaceDictionary
          isOpen={showDictionary}
          onClose={() => setShowDictionary(false)}
          searchWord={dictionaryWord}
        />
      </motion.div>
    );
  };

  const renderResults = () => {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    if (!quiz) return null;

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((quizState.correctAnswers / totalQuestions) * 100);
    const timeTaken = Math.floor((Date.now() - quizState.startTime) / 1000);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 flex items-center justify-center"
      >
        <Card className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md border-4 border-yellow-400/50 shadow-2xl max-w-2xl w-full">
          <CardHeader className="text-center">
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              {percentage >= 90 ? '🏆' : percentage >= 70 ? '🥈' : percentage >= 50 ? '🥉' : '📚'}
            </motion.div>
            
            <CardTitle className="text-4xl text-white mb-4">Quiz Complete!</CardTitle>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-400">{quizState.score}</div>
                <div className="text-white">Points Earned</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400">{percentage}%</div>
                <div className="text-white">Accuracy</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-400">{quizState.correctAnswers}/{totalQuestions}</div>
                <div className="text-white">Correct Answers</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-cyan-400">{formatTime(timeTaken)}</div>
                <div className="text-white">Time Taken</div>
              </div>
            </div>

            <div className="text-2xl text-white mb-6">
              {percentage >= 90 ? `🌟 Outstanding! You're a space weather expert!` :
               percentage >= 70 ? `⭐ Great job! You really understand space weather!` :
               percentage >= 50 ? `👍 Good work! Keep learning about space weather!` :
               `📚 Keep studying! Space weather is fascinating to learn about!`}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center gap-4">
              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-xl rounded-xl"
              >
                <RotateCcw className="w-6 h-6 mr-3" />
                Try Another Quiz
              </Button>
              
              <Button
                onClick={() => startQuiz(selectedQuiz!)}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-4 text-xl rounded-xl"
              >
                <Play className="w-6 h-6 mr-3" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const renderQuizSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xl px-6 py-4 rounded-2xl"
        >
          <Home className="w-6 h-6" />
          Back to Home
        </Button>
        
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            🧠 Space Weather Quizzes
          </h1>
          <p className="text-2xl text-cyan-200">
            Test your space weather knowledge and learn amazing facts!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg">
            Completed: {playerStats.quizzesCompleted}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-lg">
            Words: {playerStats.wordsLearned}
          </Badge>
        </div>
      </motion.div>

      {/* Quiz Stats */}
      <motion.div
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border-2 border-purple-400/30 max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-yellow-400">{playerStats.quizzesCompleted}</div>
            <div className="text-white">Quizzes Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-green-400">{playerStats.averageScore}</div>
            <div className="text-white">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-purple-400">{playerStats.perfectScores}</div>
            <div className="text-white">Perfect Scores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-cyan-400">{playerStats.wordsLearned}</div>
            <div className="text-white">Words Learned</div>
          </div>
        </div>
      </motion.div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03, rotateY: 2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card className={`bg-gradient-to-br ${quiz.gradient} border-4 border-white/30 shadow-2xl cursor-pointer h-full overflow-hidden`}>
              <CardHeader className="text-center">
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {quiz.icon}
                </motion.div>
                <CardTitle className="text-3xl text-white mb-4">{quiz.title}</CardTitle>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Badge className={`${
                    quiz.difficulty === 'Easy' ? 'bg-green-500' :
                    quiz.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white text-lg px-4 py-2`}>
                    {quiz.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                    <Timer className="w-5 h-5 mr-2" />
                    {Math.floor((quiz.timeLimit || 300) / 60)} min
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-white text-xl leading-relaxed">{quiz.description}</p>
                
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6">
                  <h4 className="text-cyan-300 font-bold mb-3 flex items-center gap-2 text-xl">
                    <Brain className="w-6 h-6" />
                    Quiz Details
                  </h4>
                  <div className="space-y-2 text-cyan-100 text-lg">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="font-bold">{quiz.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="font-bold">{quiz.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span className="font-bold">{Math.floor((quiz.timeLimit || 300) / 60)} minutes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h4 className="text-white font-bold mb-3 text-xl">Features:</h4>
                  <div className="space-y-2 text-white">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-blue-400" />
                      <span>Beautiful illustrations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-green-400" />
                      <span>Interactive dictionary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <span>Fun facts & explanations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Headphones className="w-5 h-5 text-purple-400" />
                      <span>Sound effects</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => startQuiz(quiz.id)}
                  className="w-full bg-white/20 hover:bg-white/30 text-white text-2xl py-6 rounded-2xl border-2 border-white/50 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Quiz
                  <Brain className="w-6 h-6 ml-3" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 border-2 border-cyan-400/30 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">🌟 Enhanced Learning Experience! 🌟</h3>
          <p className="text-cyan-200 text-xl">
            Every quiz features beautiful illustrations, interactive dictionary, and real NASA science!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  if (showResults) {
    return renderResults();
  }

  if (selectedQuiz) {
    return renderQuizPlayer();
  }

  return renderQuizSelection();
}