import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  BookOpen, 
  Sun, 
  Zap, 
  Globe, 
  Rocket, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Plane,
  Radio,
  Shield,
  Heart,
  Star,
  Smile,
  Search,
  Book,
  Home,
  Brain,
  Eye,
  Lightbulb,
  Target,
  Volume2,
  Award,
  Clock,
  MapPin,
  Activity,
  Atom,
  Wind,
  Waves,
  Play,
  MousePointer,
  Camera,
  Palette,
  Navigation,
  Gauge,
  Check,
  X,
  RotateCcw,
  Settings,
  HelpCircle,
  Satellite,
  Wifi,
  Database,
  Monitor,
  Truck,
  Power,
  Headphones,
  Map,
  Compass,
  Signal,
  AlertTriangle,
  Timer,
  BarChart3,
  TrendingUp,
  Save,
  Pause,
  Volume,
  Mic,
  Phone,
  Cpu,
  Battery,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  CloudRain,
  CloudSnow,
  Thermometer,
  FastForward,
  SkipForward
} from 'lucide-react';

interface EnhancedStellarStoriesProps {
  playerName: string;
  onBack: () => void;
  userProfile?: any;
}

interface Story {
  id: string;
  title: string;
  character: string;
  emoji: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  description: string;
  isUnlocked: boolean;
  category: 'farmers' | 'pilots' | 'astronauts' | 'power' | 'everyday';
  gradient: string;
  completed: boolean;
}

interface StoryScene {
  id: number;
  title: string;
  background: string;
  character: string;
  text: string;
  choices: Array<{
    text: string;
    next: number;
    points: number;
    effect?: any;
  }>;
  showCanvas?: boolean;
  miniGame?: {
    type: string;
    description: string;
  };
  cutscene?: {
    type: 'zoom' | 'rotate' | 'particles' | 'explosion';
    duration: number;
  };
  evaluationSection?: {
    questions: Array<{
      question: string;
      options: string[];
      correct: number;
    }>;
    canSkip: boolean;
  };
}

export default function EnhancedStellarStories({ playerName, onBack, userProfile }: EnhancedStellarStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState({
    storiesCompleted: 6,
    totalStories: 12,
    knowledgePoints: 420,
    badges: ['Space Weather Explorer', 'Aurora Watcher', 'Solar Storm Survivor']
  });

  const playSound = (type: string) => {
    console.log(`🔊 Playing sound: ${type}`);
    // Simple sound feedback simulation
    if (typeof window !== 'undefined') {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
          case 'success':
            oscillator.frequency.value = 800;
            break;
          case 'click':
            oscillator.frequency.value = 400;
            break;
          case 'wrong':
            oscillator.frequency.value = 200;
            break;
          default:
            oscillator.frequency.value = 600;
        }
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        // Silently fail if audio context is not available
      }
    }
  };

  const stories: Story[] = [
    {
      id: 'farmer-sarah',
      title: 'Farmer Sarah\'s GPS Adventure',
      character: 'Sarah the Smart Farmer',
      emoji: '👩‍🌾',
      difficulty: 'Beginner',
      duration: '8 min',
      description: 'Help Sarah understand why her GPS goes crazy during solar storms!',
      isUnlocked: true,
      category: 'farmers',
      gradient: 'from-green-400 to-blue-500',
      completed: true
    },
    {
      id: 'pilot-alex',
      title: 'Captain Alex Flies Through Aurora',
      character: 'Alex the Pilot',
      emoji: '👨‍✈️',
      difficulty: 'Beginner',
      duration: '10 min',
      description: 'Join Captain Alex as he navigates through beautiful but dangerous aurora!',
      isUnlocked: true,
      category: 'pilots',
      gradient: 'from-blue-400 to-purple-500',
      completed: true
    },
    {
      id: 'astronaut-maya',
      title: 'Astronaut Maya\'s Space Station Challenge',
      character: 'Maya the Astronaut',
      emoji: '👩‍🚀',
      difficulty: 'Intermediate',
      duration: '12 min',
      description: 'Experience space weather from orbit with Maya on the space station!',
      isUnlocked: true,
      category: 'astronauts',
      gradient: 'from-purple-400 to-pink-500',
      completed: false
    },
    {
      id: 'engineer-carlos',
      title: 'Carlos Protects the Power Grid',
      character: 'Carlos the Engineer',
      emoji: '👨‍🔧',
      difficulty: 'Intermediate',
      duration: '11 min',
      description: 'Help Carlos keep the lights on during a massive solar storm!',
      isUnlocked: true,
      category: 'power',
      gradient: 'from-yellow-400 to-orange-500',
      completed: false
    },
    {
      id: 'scientist-dr-kim',
      title: 'Dr. Kim Predicts Space Weather',
      character: 'Dr. Kim the Scientist',
      emoji: '👩‍🔬',
      difficulty: 'Advanced',
      duration: '15 min',
      description: 'Learn how scientists predict space weather with Dr. Kim!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-cyan-400 to-blue-600',
      completed: false
    },
    {
      id: 'satellite-sam',
      title: 'Sam\'s Satellite Rescue Mission',
      character: 'Sam the Satellite Operator',
      emoji: '📡',
      difficulty: 'Intermediate',
      duration: '9 min',
      description: 'Help Sam protect communication satellites from space weather!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-indigo-400 to-purple-600',
      completed: false
    },
    {
      id: 'aurora-hunter-emma',
      title: 'Emma\'s Aurora Photography Quest',
      character: 'Emma the Aurora Hunter',
      emoji: '📸',
      difficulty: 'Beginner',
      duration: '7 min',
      description: 'Join Emma on an epic quest to photograph the northern lights!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-green-400 to-cyan-500',
      completed: true
    },
    {
      id: 'trucker-joe',
      title: 'Trucker Joe\'s GPS Troubles',
      character: 'Joe the Truck Driver',
      emoji: '🚛',
      difficulty: 'Beginner',
      duration: '6 min',
      description: 'Help Joe deliver his cargo when solar storms mess with GPS!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-orange-400 to-red-500',
      completed: false
    },
    {
      id: 'radio-operator-lisa',
      title: 'Lisa\'s Radio Wave Adventure',
      character: 'Lisa the Radio Operator',
      emoji: '📻',
      difficulty: 'Intermediate',
      duration: '8 min',
      description: 'Discover how space weather affects radio communication!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-pink-400 to-purple-600',
      completed: false
    },
    {
      id: 'meteorologist-david',
      title: 'David Forecasts Space Storms',
      character: 'David the Meteorologist',
      emoji: '🌦️',
      difficulty: 'Advanced',
      duration: '13 min',
      description: 'Learn to forecast space weather with meteorologist David!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-blue-400 to-teal-600',
      completed: false
    },
    {
      id: 'miner-rosa',
      title: 'Rosa\'s Underground Adventure',
      character: 'Rosa the Miner',
      emoji: '⛏️',
      difficulty: 'Intermediate',
      duration: '9 min',
      description: 'See how space weather affects mining operations underground!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-gray-400 to-yellow-600',
      completed: false
    },
    {
      id: 'coast-guard-mike',
      title: 'Captain Mike\'s Ocean Rescue',
      character: 'Mike the Coast Guard',
      emoji: '⚓',
      difficulty: 'Intermediate',
      duration: '10 min',
      description: 'Help Mike navigate ocean rescues during space weather events!',
      isUnlocked: true,
      category: 'everyday',
      gradient: 'from-blue-500 to-cyan-600',
      completed: false
    }
  ];

  // Define unique story content for each character
  const getStoryScenes = (storyId: string): StoryScene[] => {
    const baseScenes: { [key: string]: StoryScene[] } = {
      'farmer-sarah': [
        {
          id: 0,
          title: "🌾 Meet Farmer Sarah! 🚜",
          background: "bg-gradient-to-b from-blue-400 via-green-400 to-green-500",
          character: "👩‍🌾",
          text: `Hi there, ${playerName}! I'm Sarah, and I grow the most amazing corn you've ever seen! 🌽 Today I'm using my super-smart GPS tractor, but something strange is happening... My precision farming system that usually plants seeds in perfect rows is going haywire!`,
          choices: [
            { text: "What's wrong with your GPS? 🤔", next: 1, points: 10 },
            { text: "Tell me about precision farming! 🌱", next: 2, points: 5 }
          ],
          showCanvas: false
        },
        {
          id: 1,
          title: "📡 GPS Getting Confused! 😵",
          background: "bg-gradient-to-b from-red-400 via-orange-400 to-yellow-500",
          character: "📡",
          text: "My GPS is telling me I'm planting in the middle of a lake when I'm clearly in my field! 😂 The satellites that help my GPS work are 20,000 kilometers above Earth, and something in space is making their signals go wonky!",
          choices: [
            { text: "What could affect satellites in space? 🛰️", next: 3, points: 15 },
            { text: "How does GPS help farming? 🚜", next: 4, points: 10 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'gps-satellites',
            description: 'Help fix the GPS satellites!'
          }
        },
        {
          id: 2,
          title: "🌱 Precision Farming Magic! ✨",
          background: "bg-gradient-to-b from-green-400 via-yellow-400 to-brown-400",
          character: "🚜",
          text: "Precision farming is like having super powers! My GPS tractor can plant seeds exactly 6 inches apart, apply fertilizer only where needed, and even harvest crops with centimeter accuracy! This saves money, protects the environment, and grows better crops! 🌟",
          choices: [
            { text: "Wow! But what's affecting the GPS today? 📡", next: 1, points: 10 },
            { text: "Show me how precise it needs to be! 📏", next: 5, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 3,
          title: "☀️ Solar Storms Strike! ⚡",
          background: "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
          character: "☀️",
          text: "The Sun is having a temper tantrum! 😤 Solar flares and coronal mass ejections are shooting charged particles toward Earth at millions of miles per hour! When these particles hit our atmosphere and satellites, they can scramble GPS signals!",
          choices: [
            { text: "How do we protect against this? 🛡️", next: 6, points: 20 },
            { text: "When will my GPS work again? ⏰", next: 7, points: 15 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'particles',
            duration: 3000
          },
          evaluationSection: {
            questions: [
              {
                question: "What can cause GPS satellites to give wrong signals?",
                options: ["Solar storms from the Sun", "Too much rain", "Loud noises", "Cold weather"],
                correct: 0
              },
              {
                question: "How far above Earth are GPS satellites?",
                options: ["100 kilometers", "1,000 kilometers", "20,000 kilometers", "100,000 kilometers"],
                correct: 2
              }
            ],
            canSkip: true
          }
        },
        {
          id: 4,
          title: "🎯 GPS Precision in Action! 📍",
          background: "bg-gradient-to-b from-blue-400 via-green-400 to-yellow-500",
          character: "🎯",
          text: "GPS helps me place seeds with incredible accuracy! Instead of planting randomly, I can create perfect rows, avoid overlap, and ensure every seed gets the best chance to grow. One GPS error of just 3 feet could waste thousands of seeds and gallons of fertilizer!",
          choices: [
            { text: "That's amazing! But what's wrong today? ⚡", next: 3, points: 15 },
            { text: "How do you fix GPS problems? 🔧", next: 6, points: 10 }
          ],
          showCanvas: false,
          miniGame: {
            type: 'precision-planting',
            description: 'Help Sarah plant seeds in perfect rows!'
          }
        },
        {
          id: 5,
          title: "📏 Millimeter Perfect! 🎯",
          background: "bg-gradient-to-b from-purple-400 via-blue-400 to-green-500",
          character: "📏",
          text: "Let me show you! My GPS system can position the tractor within 2 centimeters - that's smaller than your thumb! 👍 Watch as I demonstrate... oh no! Today it's off by 3 meters! That would plant seeds in completely wrong places!",
          choices: [
            { text: "Why is it so far off today? 🤯", next: 3, points: 20 },
            { text: "Can we still farm without GPS? 🤷‍♀️", next: 8, points: 10 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'precision-demo',
            description: 'See the difference between normal and disrupted GPS!'
          }
        },
        {
          id: 6,
          title: "🛡️ Farmer's Solutions! 💡",
          background: "bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600",
          character: "💡",
          text: "Smart farmers like me have backup plans! I use multiple GPS systems, check space weather forecasts, and have manual override modes. During big solar storms, I sometimes wait for better conditions or use ground-based correction signals!",
          choices: [
            { text: "How do you check space weather? 📊", next: 9, points: 20 },
            { text: "What are correction signals? 📡", next: 10, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 7,
          title: "⏰ Waiting for Clear Skies! 🌤️",
          background: "bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-600",
          character: "⏰",
          text: "Solar storms usually last 1-3 days. I check space weather websites like NOAA's Space Weather Prediction Center! They tell me when conditions will improve. Sometimes I have to delay planting, but it's better than planting in the wrong spots!",
          choices: [
            { text: "You're so smart! Can I learn more? 📚", next: 11, points: 25 },
            { text: "Show me the space weather tools! 🔧", next: 9, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 8,
          title: "🌾 Old School Farming! 👴",
          background: "bg-gradient-to-b from-brown-400 via-green-400 to-blue-500",
          character: "👴",
          text: "Before GPS, farmers used landmarks, compasses, and good old experience! But modern farming feeds millions more people with less waste. GPS helps us be environmental superheroes - using exactly what's needed, where it's needed! 🌍",
          choices: [
            { text: "I want to be an environmental superhero too! 🦸‍♀️", next: 11, points: 25 },
            { text: "Tell me more about space weather! 🌌", next: 9, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 9,
          title: "📊 Space Weather Station! 🌌",
          background: "bg-gradient-to-b from-black via-blue-900 to-purple-900",
          character: "📊",
          text: "I have apps on my phone that show space weather! Green means 'all clear', yellow means 'be careful', and red means 'GPS might be wonky today!' Scientists use satellites to watch the Sun 24/7 and warn us about incoming solar storms!",
          choices: [
            { text: "That's incredible! You're like a space farmer! 🚀", next: 11, points: 30 },
            { text: "Can regular people use these apps too? 📱", next: 12, points: 20 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'space-weather-monitor',
            description: 'Check the space weather conditions!'
          }
        },
        {
          id: 10,
          title: "📡 Correction Signals to the Rescue! 🦸‍♂️",
          background: "bg-gradient-to-b from-gray-400 via-blue-500 to-green-600",
          character: "📡",
          text: "Ground-based stations can send correction signals to make GPS more accurate! It's like having a local guide helping the satellites. These stations know exactly where they are, so they can spot GPS errors and fix them in real-time!",
          choices: [
            { text: "Technology is amazing! What else should I know? 🤓", next: 11, points: 25 },
            { text: "How can I become a smart farmer like you? 👩‍🌾", next: 13, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 11,
          title: "🌟 You're Now a Space Weather Expert! 🎓",
          background: "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
          character: "🎓",
          text: `Congratulations, ${playerName}! You now understand how space weather affects farming! You've learned about GPS precision, solar storms, and how farmers adapt to space weather. You're ready to help farmers around the world! 🌍`,
          choices: [
            { text: "I want to learn about other careers affected by space weather! 🚀", next: -1, points: 50 },
            { text: "Can I visit your farm again someday? 🌾", next: -1, points: 30 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'explosion',
            duration: 2000
          }
        },
        {
          id: 12,
          title: "📱 Apps for Everyone! 🌍",
          background: "bg-gradient-to-b from-purple-400 via-blue-500 to-cyan-600",
          character: "📱",
          text: "Absolutely! Space weather affects everyone - pilots, drivers, emergency services, even your cell phone! There are free apps like 'Space Weather Live' and websites where you can check conditions. Knowledge is power! 💪",
          choices: [
            { text: "I'm definitely downloading those apps! 📲", next: 11, points: 25 },
            { text: "What other jobs are affected by space weather? 🤔", next: -1, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 13,
          title: "👩‍🌾 Future Farmer Training! 🎯",
          background: "bg-gradient-to-b from-green-400 via-blue-500 to-purple-600",
          character: "👩‍🌾",
          text: "Study agriculture, technology, and Earth sciences! Learn about GPS, weather patterns, and space science. Many universities have precision agriculture programs. The future of farming is high-tech and super cool! 🌟",
          choices: [
            { text: "I'm inspired! Thank you, Sarah! 🙏", next: 11, points: 30 },
            { text: "Will you be my farming mentor? 👩‍🏫", next: 11, points: 25 }
          ],
          showCanvas: false
        }
      ],

      'pilot-alex': [
        {
          id: 0,
          title: "✈️ Meet Captain Alex! 👨‍✈️",
          background: "bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-600",
          character: "👨‍✈️",
          text: `Welcome aboard, ${playerName}! I'm Captain Alex, and I've been flying for 15 years! Today we're flying from New York to London, but mission control just warned me about aurora activity over the North Atlantic. Beautiful to see, but it can affect our navigation and communications!`,
          choices: [
            { text: "What's aurora and why is it dangerous? 🌈", next: 1, points: 10 },
            { text: "How do you navigate over the ocean? 🗺️", next: 2, points: 5 }
          ],
          showCanvas: false
        },
        {
          id: 1,
          title: "🌈 Aurora - Nature's Light Show! ✨",
          background: "bg-gradient-to-b from-green-400 via-purple-500 to-pink-600",
          character: "🌈",
          text: "Aurora are like nature's disco lights! 🕺 They happen when solar particles hit Earth's magnetic field, creating beautiful colors in the sky. But these same particles can interfere with our radio communications and GPS navigation!",
          choices: [
            { text: "How do particles from space reach Earth? 🚀", next: 3, points: 15 },
            { text: "What happens to the plane during aurora? ✈️", next: 4, points: 10 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'aurora-particles',
            description: 'Watch how solar particles create aurora!'
          }
        },
        {
          id: 2,
          title: "🗺️ Navigation Over the Ocean! 🌊",
          background: "bg-gradient-to-b from-blue-400 via-cyan-500 to-blue-600",
          character: "🧭",
          text: "Over the ocean, we can't see landmarks! We use GPS satellites, radio beacons, and inertial navigation systems. It's like having multiple backup compasses that all work together to keep us on course to our destination!",
          choices: [
            { text: "What if all systems fail? 😰", next: 5, points: 15 },
            { text: "How accurate does navigation need to be? 🎯", next: 6, points: 10 }
          ],
          showCanvas: false
        },
        {
          id: 3,
          title: "☀️ Solar Wind Journey! 🌪️",
          background: "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
          character: "☀️",
          text: "The Sun constantly shoots out a 'solar wind' of charged particles! Normally, Earth's magnetic field deflects them like a shield. But during solar storms, some particles slip through and collide with gases in our atmosphere, creating aurora!",
          choices: [
            { text: "How does this affect our flight? ✈️", next: 4, points: 20 },
            { text: "Can we predict when aurora will happen? 🔮", next: 7, points: 15 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'particles',
            duration: 3000
          },
          evaluationSection: {
            questions: [
              {
                question: "What creates the beautiful aurora lights?",
                options: ["Solar particles hitting Earth's atmosphere", "Lightning in clouds", "City lights reflecting", "Airplane exhaust"],
                correct: 0
              },
              {
                question: "Why might aurora interfere with airplane navigation?",
                options: ["They're too bright to see through", "Solar particles disrupt radio and GPS signals", "They create strong winds", "They make the air too cold"],
                correct: 1
              }
            ],
            canSkip: true
          }
        },
        {
          id: 4,
          title: "📻 Communication Challenges! 📡",
          background: "bg-gradient-to-b from-purple-400 via-blue-500 to-cyan-600",
          character: "📻",
          text: "During strong aurora events, our radio communications can get static or cut out completely! GPS signals might be less accurate, and our backup navigation systems become super important. It's like flying through an invisible storm!",
          choices: [
            { text: "How do you handle communication problems? 🛠️", next: 8, points: 20 },
            { text: "Is it dangerous to fly during aurora? ⚠️", next: 9, points: 15 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'radio-communication',
            description: 'Help restore communication with air traffic control!'
          }
        },
        {
          id: 5,
          title: "🆘 Backup Navigation Systems! 🛡️",
          background: "bg-gradient-to-b from-gray-400 via-blue-500 to-purple-600",
          character: "🛡️",
          text: "We always have multiple backups! Inertial navigation uses gyroscopes to track our movement, star navigation uses celestial bodies, and we can even use radio beacons from ships and islands. Pilots are trained for every scenario!",
          choices: [
            { text: "That's so cool! How do you use stars? ⭐", next: 10, points: 20 },
            { text: "What's the most challenging navigation situation? 🤔", next: 11, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 6,
          title: "🎯 Precision Flying! 📐",
          background: "bg-gradient-to-b from-orange-400 via-red-500 to-purple-600",
          character: "🎯",
          text: "We need to be incredibly precise! Off by just 1 degree over the Atlantic, and we could miss our destination by 60 miles! During aurora events, GPS accuracy can drop from 3 meters to 30 meters or more. That's why we have multiple systems!",
          choices: [
            { text: "How do you compensate for GPS errors? 🔧", next: 8, points: 20 },
            { text: "Do you ever have to change flight paths? 🛤️", next: 12, points: 15 }
          ],
          showCanvas: false,
          miniGame: {
            type: 'precision-navigation',
            description: 'Help Captain Alex navigate with precision!'
          }
        },
        {
          id: 7,
          title: "🔮 Space Weather Forecasting! 📊",
          background: "bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-600",
          character: "🔮",
          text: "Yes! We have space weather forecasts just like regular weather! Scientists monitor the Sun 24/7 and can predict solar storms 1-3 days in advance. Airlines use this information to plan safer flight routes!",
          choices: [
            { text: "How do airlines change routes for space weather? 🗺️", next: 12, points: 20 },
            { text: "Do passengers ever notice space weather effects? 👥", next: 13, points: 15 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'space-weather-forecast',
            description: 'Check the space weather forecast for your flight!'
          }
        },
        {
          id: 8,
          title: "🛠️ Pilot Problem Solving! 💡",
          background: "bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600",
          character: "💡",
          text: "When GPS gets unreliable, we cross-check with our inertial navigation, increase radio contact frequency, and sometimes request vectors (directions) from air traffic control. We're trained to fly safely even if multiple systems have problems!",
          choices: [
            { text: "You pilots are like astronauts! 🚀", next: 14, points: 25 },
            { text: "What's the most advanced backup system? 🤖", next: 15, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 9,
          title: "⚠️ Safety First! 🛡️",
          background: "bg-gradient-to-b from-red-400 via-orange-500 to-yellow-600",
          character: "🛡️",
          text: "Aurora themselves aren't dangerous, but the space weather that causes them can affect our electronics. We have procedures for everything! Sometimes we fly at different altitudes, change routes, or delay flights until conditions improve. Safety always comes first!",
          choices: [
            { text: "How do you decide when it's safe to fly? 🤔", next: 16, points: 20 },
            { text: "Have you ever seen aurora while flying? 👀", next: 17, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 10,
          title: "⭐ Celestial Navigation! 🌟",
          background: "bg-gradient-to-b from-black via-blue-900 to-purple-900",
          character: "⭐",
          text: "Celestial navigation uses stars, the sun, and moon as reference points! It's an ancient technique that sailors and pilots still learn. During major space weather events, when modern systems fail, these old-school methods can save the day!",
          choices: [
            { text: "That's amazing! Can you teach me? 📚", next: 18, points: 25 },
            { text: "Do modern pilots really need to know this? 🤷‍♂️", next: 19, points: 15 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'star-navigation',
            description: 'Use stars to find your direction!'
          }
        },
        {
          id: 11,
          title: "🤔 Most Challenging Situations! ⛈️",
          background: "bg-gradient-to-b from-gray-400 via-purple-500 to-red-600",
          character: "⛈️",
          text: "Flying through major aurora events while crossing polar regions is the trickiest! GPS can be unreliable, radio blackouts happen, and we're far from emergency landing sites. That's when all our training and backup systems really matter!",
          choices: [
            { text: "How do you stay calm in those situations? 😌", next: 20, points: 25 },
            { text: "What advice do you have for future pilots? 💭", next: 21, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 12,
          title: "🗺️ Changing Flight Paths! 🛤️",
          background: "bg-gradient-to-b from-green-400 via-blue-500 to-indigo-600",
          character: "🗺️",
          text: "During severe space weather, we might fly farther south to avoid polar regions where effects are strongest. It uses more fuel and takes longer, but passenger safety is worth it! We call these 'space weather diversions.'",
          choices: [
            { text: "Do passengers understand these delays? 🤷‍♀️", next: 13, points: 15 },
            { text: "How much extra time does this add? ⏰", next: 22, points: 10 }
          ],
          showCanvas: false
        },
        {
          id: 13,
          title: "👥 Passenger Experience! ✈️",
          background: "bg-gradient-to-b from-blue-400 via-purple-500 to-pink-600",
          character: "👥",
          text: "Most passengers never notice space weather effects! We handle navigation challenges behind the scenes. Sometimes they might see beautiful aurora out the window, or notice we're taking a different route. We keep flights safe and smooth!",
          choices: [
            { text: "I'd love to see aurora from a plane! 😍", next: 17, points: 20 },
            { text: "How do you explain space weather to curious passengers? 📢", next: 23, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 14,
          title: "🚀 Pilots and Astronauts! 🌌",
          background: "bg-gradient-to-b from-black via-blue-900 to-purple-900",
          character: "🚀",
          text: "We do share a lot of skills! Both pilots and astronauts need to understand space weather, navigation, and emergency procedures. Many astronauts are former pilots, and we all deal with the same space environment challenges!",
          choices: [
            { text: "Could you become an astronaut? 👨‍🚀", next: 24, points: 25 },
            { text: "What's the biggest difference between flying and space? 🌌", next: 25, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 15,
          title: "🤖 Advanced Backup Systems! 🔧",
          background: "bg-gradient-to-b from-silver via-blue-500 to-cyan-600",
          character: "🤖",
          text: "Our most advanced backup is the inertial reference system - it uses laser gyroscopes and accelerometers to track every movement! It's so precise it can detect the Earth's rotation. Even if all satellites fail, it knows exactly where we are!",
          choices: [
            { text: "Technology is incredible! What's next for aviation? 🔮", next: 26, points: 25 },
            { text: "How did pilots navigate before these systems? 📜", next: 27, points: 15 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'inertial-navigation',
            description: 'Experience how inertial navigation works!'
          }
        },
        {
          id: 16,
          title: "🤔 Decision Making Process! ⚖️",
          background: "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
          character: "⚖️",
          text: "We use space weather alerts, check multiple forecasts, and consult with dispatch and air traffic control. If space weather severity is high, we might delay takeoff, change altitude, or take alternate routes. It's all about risk assessment!",
          choices: [
            { text: "How accurate are space weather predictions? 📊", next: 28, points: 20 },
            { text: "What if space weather changes during flight? 📻", next: 29, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 17,
          title: "👀 Aurora from the Sky! 🌈",
          background: "bg-gradient-to-b from-green-400 via-purple-500 to-pink-600",
          character: "👀",
          text: "Yes! I've seen aurora many times, and it's absolutely magical! Green curtains dancing across the sky, sometimes purple or red. It's one of the best parts of flying polar routes. Passengers often gasp in wonder when they see them!",
          choices: [
            { text: "I want to be a pilot to see aurora! ✈️", next: 30, points: 30 },
            { text: "What's the most beautiful aurora you've seen? 🌟", next: 31, points: 20 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'aurora',
            duration: 4000
          }
        },
        {
          id: 30,
          title: "🎓 Future Pilot Training! ✈️",
          background: "bg-gradient-to-b from-blue-400 via-cyan-500 to-green-600",
          character: "🎓",
          text: `That's wonderful, ${playerName}! To become a pilot, study math, physics, and meteorology. Learn about space weather, navigation, and aviation technology. Flying is an amazing career that combines science, technology, and adventure!`,
          choices: [
            { text: "Thank you for inspiring me, Captain Alex! 🙏", next: -1, points: 50 },
            { text: "Can I visit the cockpit sometime? 👀", next: -1, points: 30 }
          ],
          showCanvas: false
        },
        {
          id: 31,
          title: "🌟 Most Beautiful Aurora! 💫",
          background: "bg-gradient-to-b from-green-400 via-purple-500 to-pink-600",
          character: "💫",
          text: "Once, flying over northern Canada, I saw aurora that looked like a giant green tornado spinning in the sky! It lasted for 20 minutes, and even the flight attendants came to the cockpit to watch. Nature's most incredible light show!",
          choices: [
            { text: "That sounds absolutely magical! ✨", next: 30, points: 25 },
            { text: "I hope I can experience that someday! 🤞", next: 30, points: 20 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'aurora-tornado',
            duration: 3000
          }
        }
      ],

      'astronaut-maya': [
        {
          id: 0,
          title: "🚀 Meet Astronaut Maya! 👩‍🚀",
          background: "bg-gradient-to-b from-black via-blue-900 to-purple-900",
          character: "👩‍🚀",
          text: `Greetings from space, ${playerName}! I'm Maya, and I'm currently aboard the International Space Station, orbiting 400 kilometers above Earth! Up here, we experience space weather directly - no atmosphere to protect us like you have down there!`,
          choices: [
            { text: "What's it like experiencing space weather in space? 🌌", next: 1, points: 10 },
            { text: "How do you stay safe from space radiation? 🛡️", next: 2, points: 5 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'space-station-orbit',
            description: 'Experience orbiting Earth!'
          }
        },
        {
          id: 1,
          title: "🌌 Space Weather Up Close! ⚡",
          background: "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
          character: "⚡",
          text: "It's incredible and scary! When solar storms hit, our radiation detectors go crazy. We can see aurora dancing below us like green ribbons on Earth's surface. Sometimes the space station's electronics glitch, and we have to take shelter in shielded areas!",
          choices: [
            { text: "Where do you take shelter? 🏠", next: 3, points: 15 },
            { text: "Do solar storms affect your experiments? 🧪", next: 4, points: 10 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'solar-storm',
            duration: 3000
          }
        },
        {
          id: 2,
          title: "🛡️ Radiation Protection! ☢️",
          background: "bg-gradient-to-b from-gray-400 via-blue-500 to-purple-600",
          character: "🛡️",
          text: "We monitor radiation levels constantly! The space station has special shielded areas, we wear dosimeters to track exposure, and during major solar events, we retreat to the Russian Zvezda module - it has the best shielding! It's like having a storm shelter in space!",
          choices: [
            { text: "How much radiation do you normally get? 📊", next: 5, points: 15 },
            { text: "What happens during a radiation storm? ⛈️", next: 6, points: 10 }
          ],
          showCanvas: false
        },
        {
          id: 3,
          title: "🏠 Safe Haven in Space! 🔒",
          background: "bg-gradient-to-b from-silver via-blue-500 to-green-600",
          character: "🔒",
          text: "The Zvezda service module is our 'storm shelter!' It has thicker walls and extra shielding. During major solar particle events, all crew members gather there. We monitor radiation levels and wait for the storm to pass - sometimes for hours or even days!",
          choices: [
            { text: "What do you do while waiting in the shelter? 🕰️", next: 7, points: 20 },
            { text: "How do you know when it's safe to come out? 📡", next: 8, points: 15 }
          ],
          showCanvas: false,
          evaluationSection: {
            questions: [
              {
                question: "Why do astronauts need radiation shielding in space?",
                options: ["Space is cold", "No atmosphere to block harmful particles", "Aliens might attack", "Gravity is different"],
                correct: 1
              },
              {
                question: "What serves as a 'storm shelter' on the International Space Station?",
                options: ["The cupola", "Zvezda service module", "The lab module", "Outside the station"],
                correct: 1
              }
            ],
            canSkip: true
          }
        },
        {
          id: 4,
          title: "🧪 Experiments in Danger! ⚠️",
          background: "bg-gradient-to-b from-green-400 via-blue-500 to-purple-600",
          character: "🧪",
          text: "Space weather can ruin months of work! High-energy particles can damage our cameras, corrupt computer data, and interfere with precision measurements. We often have to power down sensitive equipment and restart experiments after storms pass!",
          choices: [
            { text: "How do you protect important experiments? 🔬", next: 9, points: 20 },
            { text: "Have you ever lost valuable research data? 💾", next: 10, points: 15 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'protect-experiments',
            description: 'Help Maya protect the space experiments!'
          }
        },
        {
          id: 5,
          title: "📊 Radiation Exposure Levels! ☢️",
          background: "bg-gradient-to-b from-red-400 via-orange-500 to-yellow-600",
          character: "📊",
          text: "In one day up here, I get as much radiation as most people get in a year on Earth! During solar storms, it can be 100 times higher. We track every dose carefully - too much exposure could affect our health or even cut our mission short!",
          choices: [
            { text: "How do you monitor your radiation exposure? 📱", next: 11, points: 20 },
            { text: "What are the health effects of space radiation? 🏥", next: 12, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 6,
          title: "⛈️ Radiation Storm Alert! 🚨",
          background: "bg-gradient-to-b from-red-500 via-purple-600 to-black",
          character: "🚨",
          text: "When a radiation storm hits, alarms sound throughout the station! We have about 30 minutes to secure experiments, power down non-essential systems, and get to our shelter. It's like a fire drill, but in space!",
          choices: [
            { text: "That sounds intense! How often does this happen? 📅", next: 13, points: 20 },
            { text: "What's the scariest radiation storm you've experienced? 😰", next: 14, points: 15 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'radiation-alert',
            duration: 2000
          }
        },
        {
          id: 7,
          title: "🕰️ Shelter Time Activities! 📚",
          background: "bg-gradient-to-b from-blue-400 via-purple-500 to-indigo-600",
          character: "📚",
          text: "During shelter periods, we review procedures, conduct virtual reality training, write reports, or even play games! The longest I've been in shelter was 18 hours during a major solar proton event. We made the best of it!",
          choices: [
            { text: "Do you get bored during long shelter periods? 😴", next: 15, points: 15 },
            { text: "How do you stay connected with mission control? 📻", next: 16, points: 20 }
          ],
          showCanvas: false
        },
        {
          id: 8,
          title: "📡 All Clear Signal! ✅",
          background: "bg-gradient-to-b from-green-400 via-blue-500 to-cyan-600",
          character: "✅",
          text: "Mission Control constantly monitors space weather and tells us when radiation levels drop to safe levels. We have instruments on the station that measure radiation in real-time. Green light means we can resume normal operations!",
          choices: [
            { text: "How does Mission Control predict space weather? 🔮", next: 17, points: 20 },
            { text: "What's the first thing you do after leaving shelter? 🏃‍♀️", next: 18, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 9,
          title: "🔬 Protecting Space Science! 🛡️",
          background: "bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600",
          character: "🔬",
          text: "We use special radiation-hardened computers, store backups of all data on Earth, and have protocols to quickly power down sensitive equipment. Some experiments are designed to continue running even during storms - they're built tough!",
          choices: [
            { text: "What makes computers 'radiation-hardened'? 💻", next: 19, points: 20 },
            { text: "Which experiments can survive space storms? 🧬", next: 20, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 10,
          title: "💾 Data Loss Disasters! 😞",
          background: "bg-gradient-to-b from-red-400 via-purple-500 to-gray-600",
          character: "😞",
          text: "Yes, we once lost three weeks of protein crystal growth data during an unexpected solar particle event! The cosmic rays corrupted our storage systems. It was heartbreaking, but we learned to backup everything multiple ways!",
          choices: [
            { text: "How do you prevent data loss now? 💽", next: 21, points: 20 },
            { text: "Do you ever get frustrated with space weather? 😤", next: 22, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 11,
          title: "📱 Personal Radiation Monitors! 👨‍⚕️",
          background: "bg-gradient-to-b from-yellow-400 via-green-500 to-blue-600",
          character: "👨‍⚕️",
          text: "Each astronaut wears multiple dosimeters - some give real-time readings, others store data for later analysis. We also have area monitors throughout the station. It's like having a Geiger counter constantly telling us about our radiation environment!",
          choices: [
            { text: "What happens if you get too much radiation? ⚠️", next: 23, points: 20 },
            { text: "How do you compare radiation levels to Earth? 🌍", next: 24, points: 15 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'radiation-monitor',
            description: 'Monitor radiation levels around the space station!'
          }
        },
        {
          id: 12,
          title: "🏥 Space Radiation Health Effects! 🧬",
          background: "bg-gradient-to-b from-red-400 via-orange-500 to-pink-600",
          character: "🧬",
          text: "Space radiation can increase cancer risk, affect our eyes, and even cause memory problems. That's why we limit exposure time and constantly monitor our health. Future Mars missions will face even higher radiation - we're learning how to protect astronauts!",
          choices: [
            { text: "How will you protect astronauts going to Mars? 🚀", next: 25, points: 25 },
            { text: "Do you worry about the health risks? 😟", next: 26, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 13,
          title: "📅 Storm Frequency! 🌪️",
          background: "bg-gradient-to-b from-purple-400 via-blue-500 to-cyan-600",
          character: "🌪️",
          text: "Major radiation storms happen about 3-5 times per year, but smaller events occur monthly! Solar activity follows an 11-year cycle. During solar maximum, we can have storms weekly. It's all about the Sun's mood swings!",
          choices: [
            { text: "How do you plan missions around solar cycles? 📊", next: 27, points: 20 },
            { text: "What's solar maximum like for astronauts? ☀️", next: 28, points: 15 }
          ],
          showCanvas: false
        },
        {
          id: 14,
          title: "😰 Scariest Storm Experience! ⚡",
          background: "bg-gradient-to-b from-black via-red-900 to-purple-900",
          character: "⚡",
          text: "During a massive solar proton event, radiation levels spiked so high that even our shelter wasn't completely safe! We could see flashes in our eyes - cosmic rays hitting our optic nerves! Mission Control considered emergency evacuation procedures!",
          choices: [
            { text: "You can see cosmic rays?! 👁️", next: 29, points: 25 },
            { text: "Have astronauts ever had to evacuate the station? 🚨", next: 30, points: 20 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'cosmic-ray-flashes',
            duration: 3000
          }
        },
        {
          id: 29,
          title: "👁️ Seeing Cosmic Rays! ✨",
          background: "bg-gradient-to-b from-black via-blue-900 to-purple-900",
          character: "👁️",
          text: "Yes! When high-energy cosmic rays pass through your eyeball, they create tiny flashes of light - like little sparks in your vision! It's amazing and unsettling at the same time. Even with eyes closed, you see these cosmic light shows!",
          choices: [
            { text: "That's incredible! What else is unique about space? 🌌", next: 31, points: 25 },
            { text: "Does this damage your eyes? 👀", next: 32, points: 20 }
          ],
          showCanvas: true,
          miniGame: {
            type: 'cosmic-ray-vision',
            description: 'Experience seeing cosmic rays!'
          }
        },
        {
          id: 31,
          title: "🌌 Unique Space Experiences! 🎭",
          background: "bg-gradient-to-b from-indigo-400 via-purple-500 to-pink-600",
          character: "🎭",
          text: `Space changes your perspective on everything, ${playerName}! You see Earth as one beautiful, fragile planet. Space weather reminds us how connected everything is - the Sun, Earth, and all life. You develop a deep appreciation for our planet's protective atmosphere!`,
          choices: [
            { text: "I want to become an astronaut like you! 🚀", next: 33, points: 30 },
            { text: "What advice do you have for future space explorers? 💫", next: 34, points: 25 }
          ],
          showCanvas: true,
          cutscene: {
            type: 'earth-view',
            duration: 4000
          }
        },
        {
          id: 33,
          title: "🚀 Becoming an Astronaut! 🎓",
          background: "bg-gradient-to-b from-blue-400 via-cyan-500 to-green-600",
          character: "🎓",
          text: `That's wonderful, ${playerName}! Study STEM subjects, stay physically fit, learn multiple languages, and never stop being curious! Understanding space weather is crucial for future astronauts. We need people like you to explore Mars and beyond!`,
          choices: [
            { text: "Thank you for inspiring me, Maya! 🙏", next: -1, points: 50 },
            { text: "I'll work hard to join you among the stars! ⭐", next: -1, points: 40 }
          ],
          showCanvas: false
        },
        {
          id: 34,
          title: "💫 Advice for Future Explorers! 🌟",
          background: "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
          character: "🌟",
          text: "Never stop learning, be brave but respect the dangers, and remember that space exploration is a team effort! Understanding space weather will be essential for Mars missions. Every challenge teaches us something new about living beyond Earth!",
          choices: [
            { text: "I'll remember your words forever! 💝", next: -1, points: 30 },
            { text: "Thank you for this amazing space adventure! 🌌", next: -1, points: 25 }
          ],
          showCanvas: false
        }
      ]
    };

    return baseScenes[storyId] || baseScenes['farmer-sarah'];
  };

  const renderStorySelection = () => (
    <div className="space-y-8 max-w-7xl mx-auto">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
      >
        <motion.h2 
          className="text-5xl md:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-6"
          animate={{
            textShadow: [
              '0 0 20px rgba(59, 130, 246, 0.8)',
              '0 0 40px rgba(147, 51, 234, 0.8)',
              '0 0 20px rgba(59, 130, 246, 0.8)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📚 STELLAR STORIES! 🌟
        </motion.h2>
        <motion.p 
          className="text-2xl md:text-4xl text-white/95 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Amazing space weather adventures await you, {playerName}! 🚀
        </motion.p>
      </motion.div>

      {/* Animated Progress Dashboard */}
      <motion.div 
        className="bg-gradient-to-r from-purple-500/30 to-cyan-500/30 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
      >
        <motion.h3 
          className="text-3xl font-bold text-white text-center mb-6 flex items-center justify-center gap-3"
          animate={{ 
            color: ['#ffffff', '#00ffff', '#ff00ff', '#ffff00', '#ffffff'] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Award className="w-10 h-10" />
          </motion.div>
          Your Story Journey
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Award className="w-10 h-10" />
          </motion.div>
        </motion.h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Stories Read', value: userProgress.storiesCompleted, icon: '📖', color: 'text-green-400' },
            { label: 'Knowledge Points', value: userProgress.knowledgePoints, icon: '🧠', color: 'text-blue-400' },
            { label: 'Total Stories', value: userProgress.totalStories, icon: '📚', color: 'text-purple-400' },
            { label: 'Badges Earned', value: userProgress.badges.length, icon: '🏆', color: 'text-yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/15 rounded-3xl p-6 border-2 border-white/20"
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.15, 
                y: -15, 
                rotateY: 10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
              }}
            >
              <motion.div 
                className="text-6xl mb-3"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {stat.icon}
              </motion.div>
              <motion.div 
                className={`text-5xl font-bold ${stat.color} mb-2`}
                animate={{
                  textShadow: [
                    '0 0 10px currentColor',
                    '0 0 20px currentColor',
                    '0 0 10px currentColor'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.div>
              <div className="text-white font-bold text-xl">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Stories Grid with Complex Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ 
              opacity: 0, 
              y: 100, 
              rotateY: 45,
              scale: 0.7
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotateY: 0,
              scale: 1
            }}
            transition={{ 
              delay: 0.8 + index * 0.15,
              duration: 0.8,
              type: "spring",
              bounce: 0.4
            }}
            whileHover={{ 
              scale: 1.08, 
              rotateY: 8,
              z: 50,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Card 
              className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg border-4 border-white/40 cursor-pointer overflow-hidden relative group h-full min-h-[500px] shadow-2xl"
              onClick={() => {
                playSound('click');
                setSelectedStory(story.id);
              }}
            >
              {/* Completion badge with animation */}
              {story.completed && (
                <motion.div 
                  className="absolute top-4 right-4 z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                >
                  <motion.div 
                    className="bg-green-500 rounded-full p-2 border-2 border-white shadow-lg"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(34, 197, 94, 0.5)',
                        '0 0 20px rgba(34, 197, 94, 0.8)',
                        '0 0 10px rgba(34, 197, 94, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              )}

              {/* Animated gradient background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${story.gradient} opacity-20`}
                animate={{
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Complex floating particles */}
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-white/60"
                    style={{
                      left: `${10 + i * 6}%`,
                      top: `${20 + (i % 5) * 15}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 10, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3 + i * 0.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="text-8xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    {story.emoji}
                  </motion.div>
                  <div className="flex flex-col gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Badge className={`${
                        story.difficulty === 'Beginner' ? 'bg-green-500' :
                        story.difficulty === 'Intermediate' ? 'bg-yellow-500' :
                        'bg-red-500'
                      } text-white font-bold text-lg px-4 py-2 rounded-2xl`}>
                        {story.difficulty}
                      </Badge>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <Badge className="bg-blue-500 text-white font-bold text-lg px-4 py-2 rounded-2xl">
                        <Clock className="w-4 h-4 mr-1" />
                        {story.duration}
                      </Badge>
                    </motion.div>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardTitle className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                    {story.title}
                  </CardTitle>
                </motion.div>
                
                <motion.p 
                  className="text-cyan-300 text-xl font-bold mb-2"
                  animate={{
                    textShadow: [
                      '0 0 5px rgba(103, 232, 249, 0.5)',
                      '0 0 15px rgba(103, 232, 249, 0.8)',
                      '0 0 5px rgba(103, 232, 249, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {story.character}
                </motion.p>
                <p className="text-white/95 text-lg font-bold mb-4">{story.description}</p>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/30 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className={`w-full bg-gradient-to-r ${story.gradient} hover:opacity-90 text-white text-2xl py-6 rounded-2xl font-bold shadow-xl border-4 border-white/60 transition-all duration-300 hover:shadow-2xl`}
                      size="lg"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <BookOpen className="w-6 h-6 mr-3" />
                      </motion.div>
                      {story.completed ? 'READ AGAIN!' : 'START STORY!'}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 15, -15, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-6 h-6 ml-3" />
                      </motion.div>
                    </Button>
                  </motion.div>
                  <motion.p 
                    className="text-white/90 mt-3 font-bold text-lg"
                    animate={{
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Click to begin adventure!
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Learning Categories with 3D Effects */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-lg rounded-3xl p-10 border-4 border-white/40 shadow-2xl"
        initial={{ opacity: 0, y: 100, rotateX: 45 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 1.5, duration: 1, type: "spring" }}
        whileHover={{ 
          rotateX: 5,
          boxShadow: "0 30px 60px rgba(0,0,0,0.4)"
        }}
      >
        <motion.h3 
          className="text-4xl font-bold text-white text-center mb-8 flex items-center justify-center gap-4"
          animate={{
            backgroundImage: [
              'linear-gradient(45deg, #ff0080, #00ff80)',
              'linear-gradient(45deg, #00ff80, #0080ff)',
              'linear-gradient(45deg, #0080ff, #ff0080)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Brain className="w-10 h-10" />
          </motion.div>
          What You'll Learn!
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, delay: 1 }
            }}
          >
            <Brain className="w-10 h-10" />
          </motion.div>
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'How GPS Works', icon: '🗺️', description: 'Learn why satellites get confused!', color: 'from-green-400 to-blue-500' },
            { title: 'Flying Through Storms', icon: '✈️', description: 'Pilot safety in space weather!', color: 'from-blue-400 to-purple-500' },
            { title: 'Space Station Life', icon: '🚀', description: 'Living above Earth\'s protection!', color: 'from-purple-400 to-pink-500' },
            { title: 'Power Grid Protection', icon: '⚡', description: 'Keeping the lights on!', color: 'from-yellow-400 to-orange-500' },
            { title: 'Everyday Technology', icon: '📱', description: 'How space weather affects you!', color: 'from-cyan-400 to-blue-600' }
          ].map((topic, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-r ${topic.color} rounded-3xl p-6 text-center text-white shadow-xl border-4 border-white/30`}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                rotateY: index % 2 === 0 ? -45 : 45
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                rotateY: 0
              }}
              transition={{ 
                delay: 1.8 + index * 0.2,
                duration: 0.8,
                type: "spring"
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -15,
                rotateY: 10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
              }}
            >
              <motion.div 
                className="text-6xl mb-4"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {topic.icon}
              </motion.div>
              <motion.h4 
                className="text-white font-bold text-xl mb-3"
                whileHover={{ scale: 1.1 }}
              >
                {topic.title}
              </motion.h4>
              <motion.p 
                className="text-white/90 font-bold text-lg"
                animate={{
                  textShadow: [
                    '0 0 5px rgba(255,255,255,0.5)',
                    '0 0 15px rgba(255,255,255,0.8)',
                    '0 0 5px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {topic.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Universal Story Component Generator
  const UniversalStoryComponent = ({ storyId }: { storyId: string }) => {
    const [currentScene, setCurrentScene] = useState(0);
    const [userChoices, setUserChoices] = useState<string[]>([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [showCutscene, setShowCutscene] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [showMiniGame, setShowMiniGame] = useState(false);
    const [showEvaluation, setShowEvaluation] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [evaluationAnswers, setEvaluationAnswers] = useState<number[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Get story-specific data based on the ID
    const storyScenes = getStoryScenes(storyId);
    const currentStoryScene = storyScenes[currentScene] || storyScenes[0];
    const story = stories.find(s => s.id === storyId);

    // Canvas Animation Component
    const CanvasAnimation = () => {
      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let animationFrame: number;
        const particles: Array<{x: number, y: number, vx: number, vy: number, color: string, size: number}> = [];

        // Create particles based on story theme
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            size: Math.random() * 5 + 2
          });
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = particle.color;
          });

          animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
        };
      }, []);

      return (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        />
      );
    };

    // Mini Game Component
    const MiniGameComponent = ({ gameType }: { gameType: string }) => {
      const [gameScore, setGameScore] = useState(0);
      const [gameActive, setGameActive] = useState(false);
      const [gameCompleted, setGameCompleted] = useState(false);

      const startGame = () => {
        playSound('click');
        setGameActive(true);
        setGameCompleted(false);
        setGameScore(0);
      };

      const completeGame = () => {
        playSound('success');
        setGameActive(false);
        setGameCompleted(true);
        setPlayerScore(prev => prev + 50);
      };

      return (
        <motion.div
          className="bg-gradient-to-r from-purple-500/30 to-cyan-500/30 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-2xl"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h3 
            className="text-3xl font-bold text-white text-center mb-6"
            animate={{ 
              textShadow: [
                '0 0 10px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.8)',
                '0 0 10px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮 Fun Mini Game! 🌟
          </motion.h3>
          
          <div className="text-center">
            {!gameActive && !gameCompleted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-white text-xl mb-6 font-bold">
                  {currentStoryScene.miniGame?.description}
                </p>
                <Button
                  onClick={startGame}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-2xl py-4 px-8 rounded-2xl font-bold"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Start Game!
                  <Sparkles className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>
            )}

            {gameActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <div className="bg-black/80 rounded-3xl p-8 mb-6 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                  {/* Simple interactive game area */}
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      setGameScore(prev => prev + 10);
                      if (gameScore >= 40) {
                        setTimeout(completeGame, 500);
                      }
                    }}
                    animate={{
                      x: [0, 50, -50, 0],
                      y: [0, -30, 30, 0],
                      rotate: 360
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      ⭐
                    </div>
                  </motion.div>
                  
                  {/* Score display */}
                  <div className="absolute top-4 left-4 bg-white/20 rounded-2xl p-4">
                    <p className="text-white font-bold text-2xl">Score: {gameScore}</p>
                  </div>
                </div>
                
                <p className="text-white text-lg font-bold">
                  Click the moving star to collect points! 🌟
                </p>
              </motion.div>
            )}

            {gameCompleted && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.6 }}
              >
                <div className="bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-3xl p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-8xl mb-4"
                  >
                    🏆
                  </motion.div>
                  <h4 className="text-3xl font-bold text-white mb-4">Awesome Job!</h4>
                  <p className="text-white text-xl mb-6 font-bold">
                    You scored {gameScore} points! 🌟
                  </p>
                  <Button
                    onClick={() => setShowMiniGame(false)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl py-3 px-6 rounded-2xl font-bold"
                  >
                    Continue Story! 📖
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      );
    };

    // Evaluation Section Component
    const EvaluationSection = () => {
      const handleAnswer = (answerIndex: number) => {
        playSound('click');
        const newAnswers = [...evaluationAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setEvaluationAnswers(newAnswers);

        if (answerIndex === currentStoryScene.evaluationSection!.questions[currentQuestion].correct) {
          playSound('success');
          setPlayerScore(prev => prev + 25);
        } else {
          playSound('wrong');
        }

        if (currentQuestion < currentStoryScene.evaluationSection!.questions.length - 1) {
          setTimeout(() => setCurrentQuestion(prev => prev + 1), 1000);
        } else {
          setTimeout(() => {
            setShowEvaluation(false);
            setCurrentQuestion(0);
            setEvaluationAnswers([]);
          }, 1500);
        }
      };

      const skipEvaluation = () => {
        playSound('click');
        setShowEvaluation(false);
        setCurrentQuestion(0);
        setEvaluationAnswers([]);
      };

      const currentEvalQuestion = currentStoryScene.evaluationSection!.questions[currentQuestion];

      return (
        <motion.div
          className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-2xl"
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="flex justify-between items-center mb-6">
            <motion.h3 
              className="text-3xl font-bold text-white"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.8)',
                  '0 0 10px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠 Quick Quiz! 🌟
            </motion.h3>
            
            {currentStoryScene.evaluationSection?.canSkip && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={skipEvaluation}
                  variant="outline"
                  className="bg-white/20 border-white/40 text-white hover:bg-white/30 font-bold"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Quiz
                </Button>
              </motion.div>
            )}
          </div>

          <div className="mb-6">
            <Progress 
              value={(currentQuestion + 1) / currentStoryScene.evaluationSection!.questions.length * 100} 
              className="h-4 mb-4"
            />
            <p className="text-white text-center font-bold">
              Question {currentQuestion + 1} of {currentStoryScene.evaluationSection!.questions.length}
            </p>
          </div>

          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-2xl font-bold text-white mb-6 text-center">
              {currentEvalQuestion.question}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentEvalQuestion.options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleAnswer(index)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg py-6 rounded-2xl font-bold border-2 border-white/30"
                    size="lg"
                    disabled={evaluationAnswers[currentQuestion] !== undefined}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </Button>
                </motion.div>
              ))}
            </div>

            {evaluationAnswers[currentQuestion] !== undefined && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                {evaluationAnswers[currentQuestion] === currentEvalQuestion.correct ? (
                  <div className="text-green-400 text-2xl font-bold">
                    ✅ Correct! Great job! 🌟
                  </div>
                ) : (
                  <div className="text-red-400 text-2xl font-bold">
                    ❌ Not quite! The answer was: {currentEvalQuestion.options[currentEvalQuestion.correct]}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      );
    };

    const handleChoice = (choice: any) => {
      playSound('click');
      setPlayerScore(prev => prev + choice.points);
      setUserChoices(prev => [...prev, choice.text]);
      
      if (choice.next >= 0 && choice.next < storyScenes.length) {
        setCurrentScene(choice.next);
        
        // Check if next scene has evaluation
        const nextScene = storyScenes[choice.next];
        if (nextScene.evaluationSection) {
          setShowEvaluation(true);
        }
        
        // Check if next scene has mini game
        if (nextScene.miniGame) {
          setShowMiniGame(true);
        }
      } else {
        // Story completed
        playSound('success');
        setSelectedStory(null);
        setUserProgress(prev => ({
          ...prev,
          storiesCompleted: prev.storiesCompleted + 1,
          knowledgePoints: prev.knowledgePoints + playerScore
        }));
      }
    };

    if (!story) return null;

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${story.gradient}`}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Canvas Animation */}
        {currentStoryScene.showCanvas && <CanvasAnimation />}

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              onClick={() => {
                playSound('click');
                setSelectedStory(null);
              }}
              className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-lg rounded-2xl p-4 border-2 border-white/40"
            >
              <ChevronLeft className="w-6 h-6 mr-2" />
              Back to Stories
            </Button>

            <motion.div 
              className="text-center"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.8)',
                  '0 0 10px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h2 className="text-white text-2xl font-bold">Score: {playerScore} 🌟</h2>
            </motion.div>
          </motion.div>

          {/* Story Content */}
          <div className="max-w-4xl mx-auto">
            {showEvaluation ? (
              <EvaluationSection />
            ) : showMiniGame ? (
              <MiniGameComponent gameType={currentStoryScene.miniGame?.type || ''} />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene}
                  initial={{ x: 100, opacity: 0, scale: 0.8 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: -100, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <Card className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg border-4 border-white/40 shadow-2xl">
                    <CardHeader>
                      <motion.div
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                      >
                        <motion.div 
                          className="text-8xl mb-4"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {currentStoryScene.character}
                        </motion.div>
                        <CardTitle className="text-4xl font-bold text-white mb-4">
                          {currentStoryScene.title}
                        </CardTitle>
                      </motion.div>
                    </CardHeader>

                    <CardContent>
                      <motion.p 
                        className="text-white text-xl font-bold mb-8 text-center leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {currentStoryScene.text}
                      </motion.p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentStoryScene.choices.map((choice, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => handleChoice(choice)}
                              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white text-lg py-6 rounded-2xl font-bold shadow-xl border-2 border-white/30"
                              size="lg"
                            >
                              <div className="flex items-center justify-center gap-3">
                                <span>{choice.text}</span>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                  <Star className="w-5 h-5" />
                                </motion.div>
                              </div>
                              <div className="text-sm opacity-75 mt-1">
                                +{choice.points} points
                              </div>
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (selectedStory) {
    return <UniversalStoryComponent storyId={selectedStory} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="relative z-10 p-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Button
          onClick={() => {
            playSound('click');
            onBack();
          }}
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-lg rounded-2xl p-4 border-2 border-white/40"
        >
          <Home className="w-6 h-6 mr-2" />
          Back to Main
        </Button>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        {renderStorySelection()}
      </div>
    </div>
  );
}