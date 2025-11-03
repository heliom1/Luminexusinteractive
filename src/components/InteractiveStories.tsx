import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import SpaceDictionary from './SpaceDictionary';
import { 
  BookOpen, 
  Sun, 
  Zap, 
  Globe, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Plane,
  Shield,
  Heart,
  Star,
  Home,
  Brain,
  Lightbulb,
  Volume2,
  Award,
  Clock,
  Play,
  Pause,
  RotateCcw,
  HelpCircle,
  Rocket,
  Satellite,
  Radio,
  Power,
  Settings,
  X,
  Check,
  BookMarked,
  Headphones,
  Eye,
  Smile,
  ThumbsUp,
  Gift,
  Crown,
  Target,
  Timer,
  VolumeX,
  ArrowRight,
  Info,
  Map,
  Compass,
  Telescope,
  Microscope,
  FlaskConical,
  Atom
} from 'lucide-react';

interface InteractiveStoriesProps {
  playerName: string;
  onBack: () => void;
  userProfile?: any;
}

interface Story {
  id: string;
  title: string;
  character: string;
  emoji: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  description: string;
  category: 'farmers' | 'pilots' | 'astronauts' | 'power' | 'everyday';
  gradient: string;
  scenes: StoryScene[];
}

interface StoryScene {
  id: number;
  title: string;
  background: string;
  character: string;
  text: string;
  illustration: React.ReactNode;
  choices: Array<{
    text: string;
    next: number;
    points: number;
    feedback?: string;
  }>;
  vocabulary?: Array<{ word: string; meaning: string; example: string }>;
  funFact?: string;
  animation?: string;
}

export default function InteractiveStories({ playerName, onBack, userProfile }: InteractiveStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [gameState, setGameState] = useState({
    score: 0,
    lives: 3,
    completedStories: 0,
    wordsLearned: 0,
    achievements: [] as string[]
  });
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictionaryWord, setDictionaryWord] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Beautiful Interactive Illustration Component
  const SpaceIllustration = ({ type, animated = true }: { type: string; animated?: boolean }) => {
    const getIllustration = () => {
      switch(type) {
        case 'farmer_gps':
          return (
            <div className="text-center p-8 bg-gradient-to-b from-sky-200 via-green-200 to-green-400 rounded-3xl border-4 border-green-500">
              <motion.div 
                className="text-6xl mb-4"
                animate={animated ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                👩‍🌾
              </motion.div>
              <div className="space-y-4">
                <motion.div 
                  className="flex justify-center items-center gap-4"
                  animate={animated ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-3xl">🚜</span>
                  <span className="text-3xl">📡</span>
                  <span className="text-3xl">❌</span>
                </motion.div>
                <motion.div 
                  className="bg-blue-400 rounded-xl p-3 text-white font-bold"
                  animate={animated ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  GPS: "You're in a lake!" 🌊
                </motion.div>
                <div className="text-green-800 font-bold">
                  But I'm clearly in my cornfield! 🌽🌽🌽
                </div>
              </div>
            </div>
          );

        case 'satellite_signals':
          return (
            <div className="text-center p-8 bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-900 rounded-3xl border-4 border-cyan-400">
              <div className="relative">
                <motion.div 
                  className="text-4xl mb-6"
                  animate={animated ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🛰️ 🛰️ 🛰️ 🛰️
                </motion.div>
                <motion.div 
                  className="flex justify-center gap-2 mb-4"
                  animate={animated ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-cyan-400 text-2xl">📡</span>
                  <span className="text-cyan-400 text-2xl">📡</span>
                  <span className="text-cyan-400 text-2xl">📡</span>
                  <span className="text-cyan-400 text-2xl">📡</span>
                </motion.div>
                <motion.div 
                  className="text-5xl"
                  animate={animated ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                >
                  🌍
                </motion.div>
                <div className="text-white mt-4 font-bold">
                  24 Satellites send signals to Earth!
                </div>
              </div>
            </div>
          );

        case 'solar_storm':
          return (
            <div className="text-center p-8 bg-gradient-to-b from-yellow-300 via-orange-400 to-red-600 rounded-3xl border-4 border-red-500">
              <motion.div 
                className="text-6xl mb-4"
                animate={animated ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              <motion.div 
                className="flex justify-center gap-2 mb-4"
                animate={animated ? { x: [0, 50] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-yellow-200 text-3xl">⚡</span>
                <span className="text-orange-200 text-3xl">⚡</span>
                <span className="text-red-200 text-3xl">⚡</span>
              </motion.div>
              <motion.div 
                className="text-4xl mb-4"
                animate={animated ? { scale: [1, 0.9, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                🌍
              </motion.div>
              <div className="text-white font-bold text-xl bg-red-600/50 rounded-xl p-3">
                Solar storm confuses GPS signals!
              </div>
            </div>
          );

        case 'earth_shield':
          return (
            <div className="text-center p-8 bg-gradient-to-b from-purple-600 via-blue-600 to-cyan-600 rounded-3xl border-4 border-cyan-400">
              <motion.div 
                className="text-4xl mb-4"
                animate={animated ? { rotate: [0, 360] } : {}}
                transition={{ duration: 8, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              <motion.div 
                className="flex justify-center gap-1 mb-4"
                animate={animated ? { y: [0, 20, 40] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-yellow-300">•</span>
                <span className="text-orange-300">•</span>
                <span className="text-red-300">•</span>
              </motion.div>
              <motion.div 
                className="relative mb-4"
                animate={animated ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-5xl">🛡️</span>
                <span className="text-4xl absolute inset-0 flex items-center justify-center">🌍</span>
              </motion.div>
              <div className="text-white font-bold text-lg">
                Earth's magnetic field protects us like a superhero shield!
              </div>
            </div>
          );

        case 'pilot_aurora':
          return (
            <div className="text-center p-8 bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 rounded-3xl border-4 border-purple-400">
              <motion.div 
                className="text-5xl mb-4"
                animate={animated ? { x: [0, 30, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ✈️
              </motion.div>
              <motion.div 
                className="mb-4"
                animate={animated ? { 
                  background: [
                    'linear-gradient(45deg, #22c55e, #8b5cf6)',
                    'linear-gradient(45deg, #8b5cf6, #ec4899)',
                    'linear-gradient(45deg, #ec4899, #22c55e)'
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="h-20 rounded-2xl flex items-center justify-center text-4xl">
                  🌈 💚💜💙💛 🌈
                </div>
              </motion.div>
              <div className="text-white font-bold text-lg">
                Beautiful aurora lights dancing in the night sky!
              </div>
            </div>
          );

        case 'communication_issues':
          return (
            <div className="text-center p-8 bg-gradient-to-b from-orange-600 via-red-600 to-purple-700 rounded-3xl border-4 border-red-400">
              <motion.div 
                className="text-4xl mb-4"
                animate={animated ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                📻
              </motion.div>
              <motion.div 
                className="bg-red-800/50 rounded-xl p-4 mb-4"
                animate={animated ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="text-red-200 font-mono text-xl">
                  "Control tower... *bzzt* ...can you... *static* ...hear me?"
                </div>
              </motion.div>
              <motion.div 
                className="flex justify-center gap-2"
                animate={animated ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-yellow-400 text-3xl">⚡</span>
                <span className="text-orange-400 text-3xl">📡</span>
                <span className="text-red-400 text-3xl">❌</span>
              </motion.div>
              <div className="text-white font-bold mt-4">
                Aurora interferes with radio communications!
              </div>
            </div>
          );

        default:
          return (
            <div className="text-center p-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-3xl">
              <motion.div 
                className="text-6xl"
                animate={animated ? { rotate: [0, 360] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌌
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

  // Enhanced stories with beautiful illustrations
  const stories: Story[] = [
    {
      id: 'farmer-sarah-adventure',
      title: '🌾 Sarah\'s GPS Mystery',
      character: 'Farmer Sarah',
      emoji: '👩‍🌾',
      difficulty: 'Easy',
      duration: '10 min',
      description: 'Help Farmer Sarah solve the mysterious GPS problem during a solar storm!',
      category: 'farmers',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      scenes: [
        {
          id: 0,
          title: "🌾 Meet Farmer Sarah",
          background: "bg-gradient-to-b from-sky-400 via-green-400 to-green-600",
          character: "👩‍🌾",
          text: `Hi there, ${playerName}! I'm Sarah, and I'm a farmer who loves technology! I use GPS to help me plant my crops in perfect straight rows. But today something really weird is happening - my GPS is telling me I'm standing in the middle of a lake, but I'm clearly in my cornfield! Can you help me figure out what's going on?`,
          illustration: <SpaceIllustration type="farmer_gps" />,
          choices: [
            { text: "How does GPS actually work? 🛰️", next: 1, points: 10 },
            { text: "Could space weather be affecting it? 🌌", next: 2, points: 15 }
          ],
          vocabulary: [
            { word: 'GPS', meaning: 'Global Positioning System - uses satellites to find your exact location', example: 'Like a magical compass that tells you exactly where you are!' },
            { word: 'Satellite', meaning: 'A machine that orbits around Earth in space', example: 'Like helpful robots flying around our planet!' }
          ],
          funFact: "Did you know GPS needs signals from at least 4 satellites to pinpoint your exact location? It's like having 4 friends point to you from different corners of a playground!"
        },
        {
          id: 1,
          title: "🛰️ How GPS Really Works",
          background: "bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600",
          character: "🛰️",
          text: "Excellent question! GPS is like a cosmic game of Marco Polo! There are 24 satellites flying around Earth about 20,000 kilometers up in space. Each satellite has a super accurate clock and constantly broadcasts the time and its position. Your GPS device listens to at least 4 satellites and uses math to figure out exactly where you are!",
          illustration: <SpaceIllustration type="satellite_signals" />,
          choices: [
            { text: "So why isn't it working today? ⚡", next: 3, points: 15 },
            { text: "How accurate is GPS normally? 📏", next: 4, points: 10 }
          ],
          vocabulary: [
            { word: 'Orbit', meaning: 'The path a satellite takes as it goes around Earth', example: 'Like a race track, but in space!' },
            { word: 'Signal', meaning: 'A message sent through the air', example: 'Like invisible text messages from space!' }
          ],
          funFact: "GPS satellites travel at about 14,000 kilometers per hour - that's faster than any car on Earth!"
        },
        {
          id: 2,
          title: "☀️ Solar Storm Alert!",
          background: "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
          character: "☀️",
          text: "Wow, you're absolutely right! There's a solar storm happening right now! The Sun is having a cosmic tantrum and shooting out extra energy and particles toward Earth. Think of it like the Sun sneezing really hard! This extra energy can make GPS signals get mixed up and confused, just like how loud music can make it hard to hear someone talking.",
          illustration: <SpaceIllustration type="solar_storm" />,
          choices: [
            { text: "How does solar energy mess with GPS? 🔬", next: 5, points: 20 },
            { text: "When will my GPS work normally again? ⏰", next: 6, points: 15 }
          ],
          vocabulary: [
            { word: 'Solar storm', meaning: 'When the Sun sends extra energy and particles toward Earth', example: 'Like the Sun having a really big sneeze that reaches Earth!' },
            { word: 'Particles', meaning: 'Tiny invisible pieces of energy from the Sun', example: 'Like cosmic dust that you can\'t see but it affects electronics!' }
          ],
          funFact: "Solar storms can also create beautiful aurora lights (Northern Lights) that dance in the sky like nature's own light show!",
          animation: "pulse"
        },
        {
          id: 3,
          title: "🛡️ Earth's Invisible Shield",
          background: "bg-gradient-to-b from-purple-400 via-blue-500 to-cyan-600",
          character: "🛡️",
          text: "Here's the amazing part! Earth has an invisible shield called a magnetic field that protects us from most space weather, just like a superhero's force field! But during a solar storm, this shield gets all stirred up like water in a shaken bottle. The GPS signals have to travel through this 'shaken' shield, which can bend or delay them, making your GPS confused about where you are!",
          illustration: <SpaceIllustration type="earth_shield" />,
          choices: [
            { text: "How can farmers deal with this problem? 🚜", next: 7, points: 25 },
            { text: "Tell me more about Earth's magnetic shield! 🌍", next: 8, points: 20 }
          ],
          vocabulary: [
            { word: 'Magnetic field', meaning: 'Earth\'s invisible protective shield made of magnetism', example: 'Like an invisible superhero cape that surrounds our whole planet!' },
            { word: 'Atmosphere', meaning: 'The layers of air around Earth', example: 'Like a cozy blanket of air that keeps us safe and lets us breathe!' }
          ],
          funFact: "Earth's magnetic field is so powerful it can be detected by compasses, and it's what makes the needle always point north!"
        },
        {
          id: 7,
          title: "🚜 Smart Farming Solutions",
          background: "bg-gradient-to-b from-green-400 via-yellow-500 to-orange-500",
          character: "🧠",
          text: `You're thinking like a real problem-solver, ${playerName}! Smart farmers like me always have backup plans. During solar storms, I can: use different GPS systems that work better during storms, wait for the storm to calm down, use traditional farming methods that don't need GPS, or even use my knowledge of the land that I've learned over years! The most important thing is being flexible and having multiple solutions!`,
          illustration: (
            <div className="text-center p-6 bg-gradient-to-b from-green-200 to-yellow-200 rounded-3xl border-4 border-green-500">
              <div className="grid grid-cols-2 gap-4">
                <motion.div className="bg-white/80 rounded-xl p-3" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>
                  <div className="text-2xl">📡</div>
                  <div className="text-sm font-bold">Backup GPS</div>
                </motion.div>
                <motion.div className="bg-white/80 rounded-xl p-3" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                  <div className="text-2xl">⏰</div>
                  <div className="text-sm font-bold">Wait for Storm</div>
                </motion.div>
                <motion.div className="bg-white/80 rounded-xl p-3" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                  <div className="text-2xl">📖</div>
                  <div className="text-sm font-bold">Traditional Methods</div>
                </motion.div>
                <motion.div className="bg-white/80 rounded-xl p-3" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}>
                  <div className="text-2xl">🧠</div>
                  <div className="text-sm font-bold">Local Knowledge</div>
                </motion.div>
              </div>
              <div className="mt-4 text-green-800 font-bold">Smart farmers always have a Plan B!</div>
            </div>
          ),
          choices: [
            { text: "This is amazing! What did we learn? 🌟", next: 9, points: 30 },
            { text: "Can scientists predict solar storms? 🔮", next: 10, points: 25 }
          ],
          vocabulary: [
            { word: 'Flexible', meaning: 'Being able to change and adapt when needed', example: 'Like a tree that bends in the wind instead of breaking!' },
            { word: 'Traditional', meaning: 'Old ways of doing things that have worked for a long time', example: 'Like recipes passed down from grandparents!' }
          ],
          funFact: "Many farmers use multiple GPS systems at the same time, so if one gets confused by space weather, they still have backups!"
        },
        {
          id: 9,
          title: "🎓 Sarah's GPS Mystery Solved!",
          background: "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
          character: "🏆",
          text: `Outstanding detective work, ${playerName}! You've learned that GPS uses satellite signals from space, solar storms can interfere with these signals by affecting Earth's protective magnetic field, and smart farmers always have backup plans! You're now officially a space weather expert! Sarah's GPS will work normally again once the solar storm calms down, which usually takes a few hours to a few days.`,
          illustration: (
            <div className="text-center p-8 bg-gradient-to-b from-yellow-200 via-orange-200 to-pink-200 rounded-3xl border-4 border-yellow-500">
              <motion.div 
                className="text-6xl mb-4"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏆
              </motion.div>
              <div className="space-y-3">
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold text-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                >
                  ✅ How GPS works with satellites
                </motion.div>
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold text-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  ✅ Solar storms affect GPS signals
                </motion.div>
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold text-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                  ✅ Earth has a protective magnetic field
                </motion.div>
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold text-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                >
                  ✅ Smart farmers have backup plans
                </motion.div>
              </div>
              <div className="mt-4 text-2xl">🌟 Space Weather Expert! 🌟</div>
            </div>
          ),
          choices: [
            { text: "I want to learn more! Show me another story! 📚", next: -1, points: 50 },
            { text: "Thank you, Sarah! That was amazing! 🙏", next: -1, points: 40 }
          ],
          vocabulary: [
            { word: 'Expert', meaning: 'Someone who knows a lot about a specific topic', example: 'Like becoming a champion at your favorite video game!' }
          ],
          funFact: "Congratulations! You now know more about how space weather affects GPS than most adults do!",
          animation: "celebrate"
        }
      ]
    },
    {
      id: 'pilot-alex-aurora',
      title: '✈️ Captain Alex\'s Aurora Adventure',
      character: 'Pilot Alex',
      emoji: '👨‍✈️',
      difficulty: 'Medium',
      duration: '12 min',
      description: 'Fly with Captain Alex and discover the magic of auroras while learning about aviation safety!',
      category: 'pilots',
      gradient: 'from-blue-400 via-purple-500 to-pink-600',
      scenes: [
        {
          id: 0,
          title: "✈️ Welcome Aboard Flight 203!",
          background: "bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-600",
          character: "👨‍✈️",
          text: `Welcome aboard Flight 203, ${playerName}! I'm Captain Alex, and tonight we're flying from New York to London. We're cruising at 35,000 feet when suddenly... WOW! Look out your window! Do you see those incredible green and purple lights dancing across the sky? Those are auroras - also called Northern Lights! They're absolutely magical, but they're also telling us something important about space weather.`,
          illustration: <SpaceIllustration type="pilot_aurora" />,
          choices: [
            { text: "What creates those beautiful dancing lights? 🌈", next: 1, points: 10 },
            { text: "Is it safe to fly during auroras? ✈️", next: 2, points: 15 }
          ],
          vocabulary: [
            { word: 'Aurora', meaning: 'Beautiful colored lights that dance in the sky, also called Northern Lights', example: 'Like nature\'s own disco party in the sky!' },
            { word: 'Cruising altitude', meaning: 'The height where airplanes fly during most of their journey', example: 'Like flying as high as three Mount Everests stacked on top of each other!' }
          ],
          funFact: "Auroras usually happen near the North and South Poles, but during strong space weather, they can be seen much farther south!"
        },
        {
          id: 1,
          title: "🌈 The Aurora Light Show Science",
          background: "bg-gradient-to-b from-green-400 via-purple-500 to-pink-600",
          character: "🔬",
          text: "Great question! Auroras are like a cosmic light show created by the Sun and Earth working together! The Sun constantly sends out tiny invisible particles called solar wind. When these particles reach Earth, our planet's magnetic field catches them and guides them toward the North and South Poles. As these particles hit gases in our atmosphere, they light up like a neon sign - oxygen creates green light, and nitrogen creates purple and red!",
          illustration: (
            <div className="text-center p-8 bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-700 rounded-3xl border-4 border-purple-400">
              <motion.div 
                className="text-4xl mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                ☀️
              </motion.div>
              <motion.div 
                className="flex justify-center gap-1 mb-4"
                animate={{ x: [0, 100] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-yellow-200">•</span>
                <span className="text-orange-200">•</span>
                <span className="text-red-200">•</span>
              </motion.div>
              <motion.div 
                className="relative mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-5xl">🌍</span>
                <motion.div 
                  className="absolute inset-0 text-3xl"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, #22c55e, transparent)',
                      'linear-gradient(45deg, #8b5cf6, transparent)',
                      'linear-gradient(45deg, #ec4899, transparent)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💚💜❤️
                </motion.div>
              </motion.div>
              <div className="text-white font-bold">
                Solar particles + Earth's magnetic field + Atmosphere = Aurora Magic!
              </div>
            </div>
          ),
          choices: [
            { text: "Why are they different colors? 🎨", next: 3, points: 15 },
            { text: "Can auroras affect our airplane? ⚡", next: 4, points: 20 }
          ],
          vocabulary: [
            { word: 'Solar wind', meaning: 'A stream of particles constantly flowing from the Sun', example: 'Like an invisible river of tiny particles flowing through space!' },
            { word: 'Magnetic field', meaning: 'Earth\'s invisible protective force field', example: 'Like an invisible superhero shield around our planet!' },
            { word: 'Atmosphere', meaning: 'The layers of gases that surround Earth', example: 'Like a warm blanket of air that protects and surrounds our planet!' }
          ],
          funFact: "The colors of auroras depend on which gases the solar particles hit! Oxygen makes green and red, while nitrogen creates blue and purple!"
        },
        {
          id: 4,
          title: "📻 Communication Challenges in the Sky",
          background: "bg-gradient-to-b from-orange-400 via-red-500 to-purple-600",
          character: "📻",
          text: "You're thinking like a real pilot! During strong aurora activity, our radio communications can get fuzzy or even stop working completely. It's like trying to have a phone conversation during a thunderstorm - the signals get all mixed up! That's why we have multiple backup communication systems and sometimes need to change our flight path to areas with clearer communication.",
          illustration: <SpaceIllustration type="communication_issues" />,
          choices: [
            { text: "How do you navigate without clear radio? 🧭", next: 5, points: 25 },
            { text: "Do passengers know about these challenges? 👥", next: 6, points: 20 }
          ],
          vocabulary: [
            { word: 'Communication', meaning: 'Talking or sending messages between people or devices', example: 'Like using walkie-talkies to talk to air traffic control!' },
            { word: 'Navigation', meaning: 'Finding your way from one place to another', example: 'Like using a treasure map to find your destination!' },
            { word: 'Flight path', meaning: 'The route an airplane takes through the sky', example: 'Like a highway in the sky that planes follow!' }
          ],
          funFact: "Pilots train extensively for these situations and always have multiple backup plans to ensure passenger safety!"
        },
        {
          id: 5,
          title: "🧭 Advanced Navigation Systems",
          background: "bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600",
          character: "🧭",
          text: `Excellent question, ${playerName}! Modern airplanes are like flying computers with many navigation systems. We have GPS (when it's working properly), inertial navigation systems that remember where we've been, radio beacons on the ground, and we can even navigate by the stars like sailors did centuries ago! Plus, air traffic control has radar that can track us even when our radios are fuzzy. Safety always comes first!`,
          illustration: (
            <div className="text-center p-8 bg-gradient-to-b from-blue-800 via-cyan-700 to-teal-600 rounded-3xl border-4 border-cyan-400">
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="bg-white/20 rounded-xl p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  <div className="text-3xl mb-2">🛰️</div>
                  <div className="text-white font-bold">GPS System</div>
                </motion.div>
                <motion.div 
                  className="bg-white/20 rounded-xl p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-3xl mb-2">🧭</div>
                  <div className="text-white font-bold">Inertial Nav</div>
                </motion.div>
                <motion.div 
                  className="bg-white/20 rounded-xl p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-white font-bold">Star Navigation</div>
                </motion.div>
                <motion.div 
                  className="bg-white/20 rounded-xl p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <div className="text-3xl mb-2">📡</div>
                  <div className="text-white font-bold">Radar Tracking</div>
                </motion.div>
              </div>
              <div className="mt-4 text-white font-bold text-xl">
                Multiple backup systems keep flights safe!
              </div>
            </div>
          ),
          choices: [
            { text: "This is incredible! What else should I know? 🌟", next: 7, points: 30 },
            { text: "How often do auroras affect flights? 📅", next: 8, points: 25 }
          ],
          vocabulary: [
            { word: 'Inertial navigation', meaning: 'A system that tracks movement by remembering where you started', example: 'Like having a really good memory of every turn and move you make!' },
            { word: 'Radar', meaning: 'A system that uses radio waves to detect and track objects', example: 'Like having super vision that can see things far away using invisible waves!' },
            { word: 'Air traffic control', meaning: 'People on the ground who help guide airplanes safely', example: 'Like traffic directors for the sky highways!' }
          ],
          funFact: "Commercial airplanes have so many backup navigation systems that they're incredibly safe, even during the strongest space weather events!"
        },
        {
          id: 7,
          title: "🎓 Captain Alex's Aurora Flight Complete!",
          background: "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
          character: "🏆",
          text: `Outstanding work, ${playerName}! You've learned that auroras are created when solar particles interact with Earth's magnetic field and atmosphere, they can interfere with radio communications, pilots have multiple backup navigation systems, and aviation safety always comes first. You'd make an excellent pilot or atmospheric scientist! Thanks for flying with us tonight!`,
          illustration: (
            <div className="text-center p-8 bg-gradient-to-b from-yellow-200 via-orange-200 to-red-200 rounded-3xl border-4 border-yellow-500">
              <motion.div 
                className="flex justify-center gap-4 mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-4xl">✈️</span>
                <span className="text-4xl">🌈</span>
                <span className="text-4xl">👨‍✈️</span>
              </motion.div>
              <div className="space-y-3">
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  ✅ Aurora science mastered!
                </motion.div>
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  ✅ Aviation safety understood!
                </motion.div>
                <motion.div 
                  className="bg-white/80 rounded-xl p-3 font-bold"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  ✅ Navigation systems learned!
                </motion.div>
              </div>
              <div className="mt-6 text-2xl">🎖️ Future Pilot Certificate! 🎖️</div>
            </div>
          ),
          choices: [
            { text: "I want to explore more space weather stories! 🚀", next: -1, points: 50 },
            { text: "Thank you for the amazing flight, Captain! 👨‍✈️", next: -1, points: 40 }
          ],
          vocabulary: [
            { word: 'Atmospheric scientist', meaning: 'A scientist who studies the air and weather around Earth', example: 'Like a detective who solves mysteries about the sky and weather!' }
          ],
          funFact: "You now understand the connection between space weather and aviation better than most frequent flyers!",
          animation: "celebrate"
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
        success: 800,
        click: 400,
        complete: 1000,
        wrong: 200,
        celebrate: 1200,
        page: 600,
        achievement: 1400
      };
      
      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      // Silent fail
    }
  };

  const handleChoiceClick = (choice: any) => {
    playSound('click');
    
    setPlayerChoices(prev => [...prev, choice.text]);
    setGameState(prev => ({
      ...prev,
      score: prev.score + choice.points
    }));

    if (choice.next === -1) {
      // Story completed
      setGameState(prev => ({ 
        ...prev, 
        completedStories: prev.completedStories + 1,
        achievements: [...prev.achievements, `Completed ${selectedStory}`]
      }));
      setShowCelebration(true);
      playSound('celebrate');
      setTimeout(() => {
        setShowCelebration(false);
        setSelectedStory(null);
        setCurrentScene(0);
        setPlayerChoices([]);
      }, 4000);
    } else {
      setCurrentScene(choice.next);
      playSound('page');
    }
  };

  const openDictionary = (word: string) => {
    setDictionaryWord(word);
    setShowDictionary(true);
    setGameState(prev => ({ ...prev, wordsLearned: prev.wordsLearned + 1 }));
    playSound('achievement');
  };

  const resetStory = () => {
    setCurrentScene(0);
    setPlayerChoices([]);
    setGameState(prev => ({ ...prev, score: 0 }));
    playSound('click');
  };

  const renderStoryPlayer = () => {
    const story = stories.find(s => s.id === selectedStory);
    if (!story) return null;

    const scene = story.scenes[currentScene];
    if (!scene) return null;

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
            onClick={() => {
              setSelectedStory(null);
              setCurrentScene(0);
              setPlayerChoices([]);
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-lg px-6 py-3 rounded-xl"
          >
            <ChevronLeft className="w-6 h-6" />
            Back to Stories
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg">
              Score: {gameState.score}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-lg">
              Scene: {currentScene + 1}/{story.scenes.length}
            </Badge>
            <Button
              onClick={() => setShowDictionary(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Dictionary
            </Button>
          </div>
        </motion.div>

        {/* Story Scene */}
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${scene.background} rounded-3xl p-6 mb-6 border-4 border-white/20 shadow-2xl max-w-6xl mx-auto`}
        >
          <div className="text-center mb-6">
            <motion.div
              className="text-6xl mb-4"
              animate={{ 
                scale: scene.animation === 'celebrate' ? [1, 1.2, 1] : [1, 1.05, 1],
                rotate: scene.animation === 'pulse' ? [0, 2, -2, 0] : [0, 0, 0, 0]
              }}
              transition={{ 
                duration: scene.animation ? 2 : 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {scene.character}
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-4">{scene.title}</h2>
          </div>

          {/* Beautiful Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            {scene.illustration}
          </motion.div>

          {/* Story Text */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-white/20">
            <motion.p 
              className="text-white text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {scene.text}
            </motion.p>
          </div>

          {/* Vocabulary Helper */}
          {scene.vocabulary && (
            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-purple-400/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-300" />
                <span className="text-purple-200 font-bold text-xl">Learn New Words!</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {scene.vocabulary.map((word, index) => (
                  <Button
                    key={index}
                    onClick={() => openDictionary(word.word)}
                    className="bg-purple-500/30 hover:bg-purple-500/40 text-purple-100 border-2 border-purple-400/30 text-lg px-4 py-2 rounded-xl transition-all hover:scale-105"
                  >
                    {word.word} 📖
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fun Fact */}
          {scene.funFact && (
            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-6 mb-6 border-2 border-cyan-400/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-6 h-6 text-cyan-300" />
                <span className="text-cyan-200 font-bold text-xl">Did You Know?</span>
              </div>
              <p className="text-cyan-100 text-xl leading-relaxed">{scene.funFact}</p>
            </motion.div>
          )}

          {/* Choices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scene.choices.map((choice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.2 }}
              >
                <Button
                  onClick={() => handleChoiceClick(choice)}
                  className="w-full p-6 text-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl border-2 border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-left flex-1 leading-relaxed">{choice.text}</span>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-400 text-black text-base font-bold px-3 py-1">
                        +{choice.points}
                      </Badge>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-full p-3 mb-6 max-w-4xl mx-auto">
          <Progress 
            value={(currentScene / (story.scenes.length - 1)) * 100} 
            className="h-4"
          />
          <p className="text-center text-white mt-3 text-lg">
            Progress: {currentScene + 1} of {story.scenes.length} scenes
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={resetStory}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 text-lg rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Restart Story
          </Button>
          
          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`${soundEnabled 
              ? 'bg-gradient-to-r from-green-500 to-teal-500' 
              : 'bg-gradient-to-r from-gray-500 to-gray-600'
            } text-white px-6 py-3 text-lg rounded-xl`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {/* Dictionary */}
        <SpaceDictionary
          isOpen={showDictionary}
          onClose={() => setShowDictionary(false)}
          searchWord={dictionaryWord}
        />

        {/* Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-cyan-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.5, rotate: 180 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-12 max-w-2xl mx-auto text-center border-4 border-white shadow-2xl"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-8xl mb-6"
                >
                  🏆
                </motion.div>
                <h3 className="text-4xl font-bold text-white mb-6">Story Complete!</h3>
                <p className="text-white text-2xl mb-8">
                  Amazing job! You earned {gameState.score} points and learned so much about space weather!
                </p>
                <div className="flex justify-center gap-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="text-4xl"
                    >
                      ⭐
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderStorySelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6"
    >
      {/* Header - Mobile Optimized */}
      <motion.div 
        className="mb-8 space-y-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm md:text-xl px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl flex-shrink-0"
          >
            <Home className="w-4 h-4 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <Button
            onClick={() => {
              setShowDictionary(true);
              playSound('click');
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white text-sm md:text-xl px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl border-2 md:border-4 border-white flex-shrink-0"
          >
            <BookOpen className="w-4 h-4 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Learn New Words</span>
            <span className="sm:hidden">Dictionary</span>
            <Sparkles className="w-4 h-4 md:w-6 md:h-6" />
          </Button>

          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 md:px-4 md:py-2 text-xs md:text-lg whitespace-nowrap">
              ✅ {gameState.completedStories}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-2 py-1 md:px-4 md:py-2 text-xs md:text-lg whitespace-nowrap">
              📖 {gameState.wordsLearned}
            </Badge>
          </div>
        </div>

        {/* Title Row */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            📚 Interactive Space Stories
          </h1>
          <p className="text-lg md:text-2xl text-cyan-200">
            Learn about space weather through amazing adventures!
          </p>
        </div>
      </motion.div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03, rotateY: 2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card className={`bg-gradient-to-br ${story.gradient} border-4 border-white/30 shadow-2xl cursor-pointer h-full overflow-hidden`}>
              <CardHeader className="text-center">
                <motion.div
                  className="text-8xl mb-6"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {story.emoji}
                </motion.div>
                <CardTitle className="text-3xl text-white mb-4">{story.title}</CardTitle>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Badge className={`${
                    story.difficulty === 'Easy' ? 'bg-green-500' :
                    story.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white text-lg px-4 py-2`}>
                    {story.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                    <Clock className="w-5 h-5 mr-2" />
                    {story.duration}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-white text-xl leading-relaxed">{story.description}</p>
                
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6">
                  <h4 className="text-cyan-300 font-bold mb-3 flex items-center gap-2 text-xl">
                    <Lightbulb className="w-6 h-6" />
                    What You'll Learn
                  </h4>
                  <ul className="text-cyan-100 text-lg space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">🔬</span>
                      <span>Real space weather science</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">📖</span>
                      <span>New vocabulary with examples</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">🎯</span>
                      <span>Problem-solving skills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">🌟</span>
                      <span>Amazing space facts</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold text-xl flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      {story.scenes.length} Interactive Scenes
                    </span>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-300 font-bold text-lg">Points to Earn</span>
                    </div>
                  </div>
                  <div className="text-sm text-white/80">
                    Beautiful illustrations • Sound effects • Dictionary help
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedStory(story.id);
                    setCurrentScene(0);
                    playSound('click');
                  }}
                  className="w-full bg-white/20 hover:bg-white/30 text-white text-2xl py-6 rounded-2xl border-2 border-white/50 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Adventure
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Fun Learning Stats */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border-2 border-purple-400/30 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-4">🌟 Interactive Learning Experience! 🌟</h3>
          <p className="text-purple-200 text-xl">
            Every story features beautiful illustrations, sound effects, and teaches real NASA science!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 rounded-2xl p-6 text-center">
            <Eye className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <p className="text-blue-200 font-bold text-xl">Visual</p>
            <p className="text-blue-100 text-lg mt-2">Beautiful illustrations!</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 text-center">
            <Headphones className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-green-200 font-bold text-xl">Audio</p>
            <p className="text-green-100 text-lg mt-2">Sound effects!</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 text-center">
            <Brain className="w-12 h-12 text-pink-400 mx-auto mb-3" />
            <p className="text-pink-200 font-bold text-xl">Educational</p>
            <p className="text-pink-100 text-lg mt-2">Real NASA science!</p>
          </div>
          <motion.div 
            className="bg-white/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowDictionary(true);
              playSound('click');
            }}
          >
            <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-yellow-200 font-bold text-xl">Dictionary</p>
            <p className="text-yellow-100 text-lg mt-2">Learn new words!</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Dictionary Modal
  if (showDictionary) {
    return <SpaceDictionary onBack={() => setShowDictionary(false)} searchWord={dictionaryWord} />;
  }

  if (selectedStory) {
    return renderStoryPlayer();
  }

  return renderStorySelection();
}