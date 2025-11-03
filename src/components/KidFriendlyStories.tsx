import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
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
  SkipForward,
  BookmarkPlus,
  MessageSquare,
  Info
} from 'lucide-react';

interface KidFriendlyStoriesProps {
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
  category: 'farmers' | 'pilots' | 'astronauts' | 'power' | 'everyday' | 'indigenous';
  gradient: string;
  kidFriendlyInfo: {
    mainIdea: string;
    funFacts: string[];
    vocabulary: Array<{ word: string; meaning: string; example: string }>;
  };
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
    explanation?: string;
  }>;
  vocabulary?: Array<{ word: string; meaning: string; example: string }>;
  funFact?: string;
  miniGame?: {
    type: string;
    description: string;
    instructions: string;
  };
  cutscene?: {
    type: 'zoom' | 'rotate' | 'particles' | 'explosion' | 'aurora';
    duration: number;
  };
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export default function KidFriendlyStories({ playerName, onBack, userProfile }: KidFriendlyStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [gameState, setGameState] = useState({
    score: 0,
    lives: 3,
    knowledgePoints: 0,
    completedStories: 0
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCutscene, setShowCutscene] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [vocabularyWords, setVocabularyWords] = useState<Array<{ word: string; meaning: string; example: string }>>([]);

  // Kid-friendly stories with simple language and vocabulary help
  const stories: Story[] = [
    {
      id: 'under-one-sky',
      title: 'Under One Sky - Ari and Liam\'s Space Adventure',
      character: 'Ari & Liam',
      emoji: '🌟',
      difficulty: 'Easy',
      duration: '10 min',
      description: 'Meet Ari from the mountains and Liam in space! Discover how they\'re connected by space weather!',
      category: 'indigenous',
      gradient: 'from-green-400 to-blue-500',
      kidFriendlyInfo: {
        mainIdea: 'People all around the world are connected by space weather, even if they live far apart!',
        funFacts: [
          'The sun sends invisible waves to Earth that can affect our technology!',
          'Auroras (pretty lights in the sky) happen when space particles dance with Earth\'s invisible shield!',
          'Indigenous people have been watching the sky and weather for thousands of years!'
        ],
        vocabulary: [
          { word: 'GPS', meaning: 'A system that uses satellites to tell you where you are', example: 'Like a magical map in your phone!' },
          { word: 'Solar flare', meaning: 'A big burst of energy from the sun', example: 'Like the sun sneezing really hard!' },
          { word: 'Aurora', meaning: 'Beautiful colored lights in the sky', example: 'Like nature\'s own light show!' },
          { word: 'Satellite', meaning: 'A machine that flies around Earth in space', example: 'Like a robot helper floating above us!' },
          { word: 'Indigenous', meaning: 'The first people who lived in a place', example: 'Like the original families of a land!' }
        ]
      }
    },
    {
      id: 'farmer-gps-adventure',
      title: 'Sarah\'s Farm GPS Mystery',
      character: 'Farmer Sarah',
      emoji: '👩‍🌾',
      difficulty: 'Easy',
      duration: '8 min',
      description: 'Help Farmer Sarah figure out why her GPS is acting weird during a space storm!',
      category: 'farmers',
      gradient: 'from-green-400 to-yellow-500',
      kidFriendlyInfo: {
        mainIdea: 'Space weather can make GPS stop working properly, just like rain can make TV fuzzy!',
        funFacts: [
          'Farmers use GPS to plant seeds in perfectly straight lines!',
          'GPS satellites are like helpers flying 20,000 kilometers above us!',
          'When the sun gets angry, it can confuse the GPS satellites!'
        ],
        vocabulary: [
          { word: 'GPS', meaning: 'Global Positioning System - helps you know where you are', example: 'Like having a map that always knows your location!' },
          { word: 'Satellite', meaning: 'A machine that orbits around Earth', example: 'Like a robot flying in circles around our planet!' },
          { word: 'Solar storm', meaning: 'When the sun sends out extra energy toward Earth', example: 'Like the sun having a bad mood day!' },
          { word: 'Precision farming', meaning: 'Using technology to farm very carefully', example: 'Like being super exact when planting seeds!' }
        ]
      }
    },
    {
      id: 'pilot-aurora-flight',
      title: 'Captain Alex\'s Amazing Aurora Flight',
      character: 'Pilot Alex',
      emoji: '👨‍✈️',
      difficulty: 'Medium',
      duration: '12 min',
      description: 'Fly with Captain Alex and see beautiful auroras while learning about space weather!',
      category: 'pilots',
      gradient: 'from-blue-400 to-purple-500',
      kidFriendlyInfo: {
        mainIdea: 'Pilots need to be careful during space weather because it can affect airplane equipment!',
        funFacts: [
          'Auroras are like giant colored curtains hanging in the sky!',
          'Pilots sometimes have to change their route when space weather is strong!',
          'The same space weather that makes pretty auroras can also mess up radios!'
        ],
        vocabulary: [
          { word: 'Aurora', meaning: 'Colorful lights that dance in the sky', example: 'Like nature\'s own disco lights!' },
          { word: 'Radio waves', meaning: 'Invisible signals that carry messages through the air', example: 'Like throwing invisible balls to send messages!' },
          { word: 'Magnetic field', meaning: 'An invisible force around Earth that protects us', example: 'Like Earth wearing an invisible superhero cape!' },
          { word: 'Pilot', meaning: 'A person who flies airplanes', example: 'Like a driver, but for planes in the sky!' }
        ]
      }
    },
    {
      id: 'astronaut-space-station',
      title: 'Maya\'s Space Station Adventure',
      character: 'Astronaut Maya',
      emoji: '👩‍🚀',
      difficulty: 'Medium',
      duration: '15 min',
      description: 'Join Astronaut Maya on the space station and see space weather from space!',
      category: 'astronauts',
      gradient: 'from-purple-400 to-pink-500',
      kidFriendlyInfo: {
        mainIdea: 'Astronauts in space can see space weather happening and need to stay safe from it!',
        funFacts: [
          'Astronauts can see auroras from above - they look like giant glowing donuts!',
          'The space station goes around Earth once every 90 minutes!',
          'Space weather can be dangerous for astronauts, so they hide in special safe rooms!'
        ],
        vocabulary: [
          { word: 'Space station', meaning: 'A big house that floats in space where astronauts live', example: 'Like a floating apartment above Earth!' },
          { word: 'Astronaut', meaning: 'A person who travels and works in space', example: 'Like an explorer of the sky!' },
          { word: 'Radiation', meaning: 'Invisible energy that can be harmful', example: 'Like invisible sunlight that\'s too strong!' },
          { word: 'Solar particles', meaning: 'Tiny pieces of energy that come from the sun', example: 'Like tiny invisible balls shot from the sun!' }
        ]
      }
    },
    {
      id: 'power-grid-hero',
      title: 'Carlos Saves the Lights',
      character: 'Engineer Carlos',
      emoji: '👨‍🔧',
      difficulty: 'Medium',
      duration: '10 min',
      description: 'Help Carlos keep the electricity working when space weather tries to turn off the lights!',
      category: 'power',
      gradient: 'from-yellow-400 to-red-500',
      kidFriendlyInfo: {
        mainIdea: 'Space weather can affect electricity and make lights go out in whole cities!',
        funFacts: [
          'Electricity travels through big cables like water through pipes!',
          'Space weather can make extra electricity flow where it shouldn\'t go!',
          'Engineers are like doctors for machines - they fix them when they get sick!'
        ],
        vocabulary: [
          { word: 'Power grid', meaning: 'A network of cables that brings electricity to homes', example: 'Like roads for electricity to travel on!' },
          { word: 'Engineer', meaning: 'A person who designs and fixes machines', example: 'Like a doctor for machines and technology!' },
          { word: 'Blackout', meaning: 'When all the lights and electricity stop working', example: 'Like the whole city taking a nap at the same time!' },
          { word: 'Current', meaning: 'The flow of electricity through wires', example: 'Like water flowing through a hose!' }
        ]
      }
    },
    {
      id: 'communication-rescue',
      title: 'Lisa\'s Radio Rescue Mission',
      character: 'Radio Operator Lisa',
      emoji: '📻',
      difficulty: 'Easy',
      duration: '9 min',
      description: 'Help Lisa fix the radios when space weather makes them stop working!',
      category: 'everyday',
      gradient: 'from-pink-400 to-purple-600',
      kidFriendlyInfo: {
        mainIdea: 'Space weather can make radios and phones stop working properly!',
        funFacts: [
          'Radio waves are invisible messages that travel through the air!',
          'Sometimes space weather makes radio messages sound like they\'re underwater!',
          'Emergency workers use radios to help people during storms and accidents!'
        ],
        vocabulary: [
          { word: 'Radio waves', meaning: 'Invisible signals that carry sound through the air', example: 'Like invisible messengers flying around!' },
          { word: 'Communication', meaning: 'Talking or sending messages to other people', example: 'Like having a conversation with someone far away!' },
          { word: 'Static', meaning: 'Crackling noise that sometimes comes from radios', example: 'Like the sound of rice popping in a pan!' },
          { word: 'Emergency', meaning: 'When someone needs help right away', example: 'Like when you need to call for help quickly!' }
        ]
      }
    }
  ];

  // Kid-friendly story content with simple language
  const getStoryScenes = (storyId: string): StoryScene[] => {
    switch (storyId) {
      case 'under-one-sky':
        return [
          {
            id: 0,
            title: "🏔️ Meet Ari in the Mountains",
            background: "bg-gradient-to-b from-blue-400 via-green-400 to-green-500",
            character: "👧",
            text: `Hi ${playerName}! I'm Ari! I live in the beautiful mountains of Bukidnon with my family and friends. Today, my teacher is showing us how to use a special tablet with GPS to make maps of our farms. It's like having a magic map that always knows where we are! But something strange is happening...`,
            choices: [
              { text: "What's happening with the GPS? 📱", next: 1, points: 10 },
              { text: "Tell me about your home! 🏔️", next: 2, points: 5 }
            ],
            vocabulary: [
              { word: 'GPS', meaning: 'A system that uses satellites to tell you where you are', example: 'Like a magical map in your tablet!' },
              { word: 'Indigenous', meaning: 'The first people who lived in a place', example: 'Like the original families of our land!' }
            ],
            funFact: "Indigenous communities have been watching the sky and weather patterns for thousands of years!"
          },
          {
            id: 1,
            title: "📱 The GPS Goes Crazy!",
            background: "bg-gradient-to-b from-red-400 via-orange-400 to-yellow-500",
            character: "😵",
            text: "Our GPS tablet is acting really weird! It says we're in the middle of a lake, but we're clearly on dry land! The screen keeps freezing, and our community radio is making crackling sounds. The sunlight seems extra bright today too. What could be causing this?",
            choices: [
              { text: "Maybe something in space is affecting it? 🌌", next: 3, points: 15 },
              { text: "Is the tablet broken? 🔧", next: 4, points: 10 }
            ],
            vocabulary: [
              { word: 'GPS', meaning: 'Global Positioning System - helps you know where you are', example: 'Like having a map that always knows your location!' },
              { word: 'Satellite', meaning: 'A machine that orbits around Earth', example: 'Like a robot flying in circles around our planet!' }
            ],
            funFact: "GPS needs at least 4 satellites working together to tell you exactly where you are!"
          },
          {
            id: 2,
            title: "🏔️ Beautiful Bukidnon",
            background: "bg-gradient-to-b from-green-400 via-blue-400 to-purple-500",
            character: "🌄",
            text: "I live in the mountains of Bukidnon in the Philippines! My family has lived here for many generations. We grow rice, corn, and vegetables. We also study the stars and weather patterns - my grandparents taught me that everything in the sky is connected to life on Earth!",
            choices: [
              { text: "That's so cool! But what about the GPS problem? 📡", next: 1, points: 10 },
              { text: "How do you study the stars? ⭐", next: 5, points: 15 }
            ],
            vocabulary: [
              { word: 'Indigenous', meaning: 'The first people who lived in a place', example: 'Like the original families of a land!' },
              { word: 'Generation', meaning: 'A group of people born around the same time', example: 'Like your grandparents, parents, and you!' }
            ],
            funFact: "Indigenous communities around the world have their own ways of understanding weather and space!"
          },
          {
            id: 3,
            title: "🚀 Meet Astronaut Liam!",
            background: "bg-gradient-to-b from-black via-blue-900 to-purple-900",
            character: "👨‍🚀",
            text: `Hi there! I'm Liam, and I'm an astronaut floating high above Earth on the International Space Station! From up here, I can see amazing colored lights dancing around the North and South Poles - we call them auroras! They look like giant ribbons of green and purple light!`,
            choices: [
              { text: "Wow! What causes those pretty lights? 🌈", next: 6, points: 15 },
              { text: "Can you see Ari's home from space? 🌍", next: 7, points: 10 }
            ],
            vocabulary: [
              { word: 'International Space Station', meaning: 'A big house in space where astronauts live and work', example: 'Like a floating apartment above Earth!' },
              { word: 'Aurora', meaning: 'Colorful lights that dance in the sky near the poles', example: 'Like nature\'s own light show!' }
            ],
            funFact: "The International Space Station travels around Earth once every 90 minutes!"
          },
          {
            id: 6,
            title: "🌈 The Science of Pretty Lights",
            background: "bg-gradient-to-b from-green-400 via-purple-500 to-pink-600",
            character: "🌌",
            text: "Great question! The Sun sends out tiny invisible particles called 'solar wind' - it's like the Sun is blowing bubbles toward Earth! When these particles hit Earth's invisible magnetic shield, they create those beautiful dancing lights we call auroras!",
            choices: [
              { text: "Could this affect Ari's GPS down on Earth? 🤔", next: 8, points: 20 },
              { text: "Tell me more about Earth's invisible shield! 🛡️", next: 9, points: 15 }
            ],
            vocabulary: [
              { word: 'Solar wind', meaning: 'Invisible particles that the Sun sends toward Earth', example: 'Like the Sun blowing invisible bubbles our way!' },
              { word: 'Magnetic field', meaning: 'An invisible force around Earth that protects us', example: 'Like Earth wearing an invisible superhero cape!' }
            ],
            funFact: "The same space weather that makes beautiful auroras can also affect technology on Earth!"
          },
          {
            id: 8,
            title: "🔗 The Connection!",
            background: "bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600",
            character: "💡",
            text: "You're absolutely right! The same space weather that's creating these beautiful auroras up here is also affecting Ari's GPS down in the Philippines! When the Sun gets very active, it can make GPS satellites confused, just like how bright lights can make it hard to see!",
            choices: [
              { text: "So we're all connected by space weather! 🌍", next: 10, points: 25 },
              { text: "How can we predict when this will happen? 🔮", next: 11, points: 20 }
            ],
            vocabulary: [
              { word: 'Space weather', meaning: 'Changes in space that can affect things on Earth', example: 'Like regular weather, but happening in space!' },
              { word: 'GPS satellite', meaning: 'A machine in space that helps GPS work', example: 'Like helpers floating above us to show directions!' }
            ],
            funFact: "Space weather affects people all around the world at the same time!"
          },
          {
            id: 10,
            title: "🌟 Under One Sky - We're All Connected!",
            background: "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
            character: "🌍",
            text: `That's exactly right, ${playerName}! Even though Ari is in the mountains of the Philippines and Liam is floating in space, they're both affected by the same space weather! We all live under one sky, and we're all connected by the amazing forces of space weather!`,
            choices: [
              { text: "I want to learn more about space weather! 🚀", next: 12, points: 30 },
              { text: "How can I help study space weather too? 📚", next: 13, points: 25 }
            ],
            vocabulary: [
              { word: 'Connected', meaning: 'Joined together or affecting each other', example: 'Like being part of the same big family!' }
            ],
            funFact: "Scientists around the world work together to study space weather and protect everyone!",
            cutscene: { type: 'explosion', duration: 2000 }
          },
          {
            id: 12,
            title: "🎓 Becoming a Space Weather Explorer!",
            background: "bg-gradient-to-b from-purple-400 via-blue-500 to-cyan-600",
            character: "🎓",
            text: `Wonderful, ${playerName}! You can learn about space weather through Luminexus! Play games, watch videos, and take quizzes to become a space weather expert! Remember, just like Ari and Liam discovered - we're all connected under one sky!`,
            choices: [
              { text: "Let's explore more space weather stories! 📖", next: -1, points: 50 },
              { text: "Thank you for this amazing adventure! 🙏", next: -1, points: 40 }
            ],
            vocabulary: [
              { word: 'Explorer', meaning: 'Someone who discovers new things', example: 'Like being a detective for space science!' }
            ],
            funFact: "Every day, scientists discover something new about how space weather affects our planet!"
          }
        ];

      case 'farmer-gps-adventure':
        return [
          {
            id: 0,
            title: "🌾 Meet Farmer Sarah!",
            background: "bg-gradient-to-b from-blue-400 via-green-400 to-green-500",
            character: "👩‍🌾",
            text: `Hi ${playerName}! I'm Sarah, and I'm a farmer! I grow corn, wheat, and vegetables to feed lots of people. Today I'm using my super-smart GPS tractor to plant seeds in perfectly straight lines. But something weird is happening - my GPS is telling me I'm in a lake when I'm clearly in my field!`,
            choices: [
              { text: "Why do you need GPS for farming? 🚜", next: 1, points: 10 },
              { text: "What's wrong with your GPS today? 📡", next: 2, points: 5 }
            ],
            vocabulary: [
              { word: 'GPS', meaning: 'A system that uses satellites to tell you exactly where you are', example: 'Like a magical map that never gets lost!' },
              { word: 'Tractor', meaning: 'A big farm machine that helps plant seeds and harvest crops', example: 'Like a super strong farm helper!' }
            ],
            funFact: "Modern farmers use GPS to plant seeds with amazing accuracy - sometimes within just 2 centimeters!"
          },
          {
            id: 1,
            title: "🎯 Super Precise Farming!",
            background: "bg-gradient-to-b from-green-400 via-yellow-400 to-brown-400",
            character: "🎯",
            text: "GPS helps me plant seeds in perfectly straight rows, exactly 6 inches apart! It's like having superpowers for farming! This way, I don't waste seeds or fertilizer, and the plants have the perfect amount of space to grow big and healthy. It's like giving each plant its own perfect bedroom!",
            choices: [
              { text: "That's amazing! But what's wrong today? ⚡", next: 2, points: 15 },
              { text: "How accurate does GPS need to be? 📏", next: 3, points: 10 }
            ],
            vocabulary: [
              { word: 'Precise', meaning: 'Very exact and accurate', example: 'Like hitting the bullseye every time!' },
              { word: 'Fertilizer', meaning: 'Special food that helps plants grow better', example: 'Like vitamins for plants!' }
            ],
            funFact: "Precision farming can save up to 40% of seeds and fertilizer while growing more food!"
          },
          {
            id: 2,
            title: "☀️ The Sun Gets Angry!",
            background: "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
            character: "😤",
            text: "The Sun is having a bad day today! Scientists call it a 'solar storm' - it's like the Sun is sneezing really hard and sending extra energy toward Earth! This energy can confuse the GPS satellites that are floating high above us in space.",
            choices: [
              { text: "How do solar storms affect GPS? 🛰️", next: 4, points: 15 },
              { text: "When will the GPS work again? ⏰", next: 5, points: 10 }
            ],
            vocabulary: [
              { word: 'Solar storm', meaning: 'When the Sun sends out extra energy toward Earth', example: 'Like the Sun having a really big sneeze!' },
              { word: 'Satellite', meaning: 'A machine that flies around Earth in space', example: 'Like a robot helper floating way above us!' }
            ],
            funFact: "GPS satellites are so high up that it takes their signals about 0.1 seconds to reach Earth!",
            cutscene: { type: 'particles', duration: 3000 }
          },
          {
            id: 4,
            title: "📡 Confused Satellites",
            background: "bg-gradient-to-b from-purple-400 via-blue-500 to-green-600",
            character: "😵‍💫",
            text: "When a solar storm happens, it's like putting invisible fog between Earth and the GPS satellites! The satellites try to send location signals to my GPS, but the 'space fog' makes the signals take longer to arrive. It's like trying to see through thick fog!",
            choices: [
              { text: "How can farmers deal with this? 🤔", next: 6, points: 20 },
              { text: "How long do solar storms last? ⏱️", next: 7, points: 15 }
            ],
            vocabulary: [
              { word: 'Signal', meaning: 'A message sent from one place to another', example: 'Like waving hello to a friend far away!' },
              { word: 'Space weather', meaning: 'Changes in space that can affect things on Earth', example: 'Like regular weather, but happening way up in space!' }
            ],
            funFact: "During big solar storms, GPS can be off by 10 meters or more instead of just 3 meters!"
          },
          {
            id: 6,
            title: "🧠 Smart Farmer Solutions!",
            background: "bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600",
            character: "💡",
            text: "Smart farmers like me have backup plans! I check space weather forecasts just like regular weather forecasts. When a big solar storm is coming, I might wait a day or two before planting, or I use special ground stations that help make GPS more accurate!",
            choices: [
              { text: "There are space weather forecasts? 📊", next: 8, points: 20 },
              { text: "What are ground stations? 📡", next: 9, points: 15 }
            ],
            vocabulary: [
              { word: 'Forecast', meaning: 'Predicting what will happen in the future', example: 'Like guessing if it will rain tomorrow!' },
              { word: 'Ground station', meaning: 'A special antenna on Earth that helps GPS work better', example: 'Like a helper on the ground for space signals!' }
            ],
            funFact: "Farmers can check space weather forecasts on their phones, just like regular weather!"
          },
          {
            id: 8,
            title: "🌟 You're Now a Farming Expert!",
            background: "bg-gradient-to-b from-gold via-yellow-400 to-green-500",
            character: "🏆",
            text: `Great job, ${playerName}! You now understand how space weather affects farming! Just like weather on Earth, space weather can change how technology works. But smart farmers like Sarah know how to adapt and keep growing the food we all need!`,
            choices: [
              { text: "I want to learn about other jobs affected by space weather! 🚀", next: -1, points: 50 },
              { text: "Thank you for teaching me, Sarah! 🙏", next: -1, points: 30 }
            ],
            vocabulary: [
              { word: 'Adapt', meaning: 'To change the way you do things when conditions change', example: 'Like wearing a jacket when it gets cold!' }
            ],
            funFact: "Farmers feed the world by growing enough food for everyone - even when space weather tries to interfere!",
            cutscene: { type: 'explosion', duration: 2000 }
          }
        ];

      default:
        return [];
    }
  };

  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies = {
        click: 400,
        success: 800,
        wrong: 200,
        celebrate: 1000,
        cutscene: 600,
        transition: 500
      };
      
      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 400;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  const handleChoiceClick = (choice: any, scenes: StoryScene[]) => {
    playSound('click');
    setGameState(prev => ({
      ...prev,
      score: prev.score + choice.points,
      knowledgePoints: prev.knowledgePoints + choice.points
    }));

    if (choice.next === -1) {
      // Story completed
      setGameState(prev => ({ ...prev, completedStories: prev.completedStories + 1 }));
      setShowCelebration(true);
      playSound('celebrate');
      setTimeout(() => {
        setShowCelebration(false);
        setSelectedStory(null);
        setCurrentScene(0);
      }, 3000);
    } else {
      const nextScene = scenes[choice.next];
      if (nextScene?.cutscene) {
        setShowCutscene(true);
        setTimeout(() => {
          setShowCutscene(false);
          setCurrentScene(choice.next);
        }, nextScene.cutscene.duration);
      } else {
        setCurrentScene(choice.next);
      }
    }
  };

  const showVocabularyHelper = (words: Array<{ word: string; meaning: string; example: string }>) => {
    setVocabularyWords(words);
    setShowVocabulary(true);
  };

  const renderVocabularyHelper = () => (
    <AnimatePresence>
      {showVocabulary && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowVocabulary(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 max-w-2xl w-full border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Word Helper Dictionary 📚
              </h3>
              <Button
                onClick={() => setShowVocabulary(false)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {vocabularyWords.map((vocab, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30"
                >
                  <h4 className="text-xl font-bold text-yellow-300 mb-2">
                    {vocab.word}
                  </h4>
                  <p className="text-white text-lg mb-2">
                    <strong>What it means:</strong> {vocab.meaning}
                  </p>
                  <p className="text-cyan-200 text-lg">
                    <strong>Example:</strong> {vocab.example}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowVocabulary(false)}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 text-xl rounded-2xl"
              >
                Got it! Thanks! 👍
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderStoryPlayer = () => {
    const story = stories.find(s => s.id === selectedStory);
    if (!story) return null;

    const scenes = getStoryScenes(selectedStory!);
    const scene = scenes[currentScene];
    if (!scene) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4"
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6 flex-wrap gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button
            onClick={() => {
              setSelectedStory(null);
              setCurrentScene(0);
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Stories
          </Button>
          
          <div className="flex items-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg">
              Score: {gameState.score}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-lg">
              Knowledge: {gameState.knowledgePoints}
            </Badge>
            {scene.vocabulary && (
              <Button
                onClick={() => showVocabularyHelper(scene.vocabulary!)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Word Helper
              </Button>
            )}
          </div>
        </motion.div>

        {/* Story Scene */}
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${scene.background} rounded-3xl p-6 md:p-8 mb-6 border-4 border-white/30 shadow-2xl`}
        >
          <div className="text-center mb-6">
            <motion.div
              className="text-6xl md:text-8xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {scene.character}
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{scene.title}</h2>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6">
            <p className="text-white text-lg md:text-xl leading-relaxed">{scene.text}</p>
          </div>

          {scene.funFact && (
            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 mb-6 border-2 border-cyan-400/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-lg">Fun Fact!</span>
              </div>
              <p className="text-cyan-100 text-base md:text-lg">{scene.funFact}</p>
            </motion.div>
          )}

          {scene.quiz && (
            <motion.div
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border-2 border-purple-400/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-purple-400 font-bold text-lg">Quick Question!</span>
              </div>
              <p className="text-white text-lg mb-4">{scene.quiz.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scene.quiz.options.map((option, index) => (
                  <Button
                    key={index}
                    className={`p-4 text-left justify-start text-base ${
                      index === scene.quiz!.correct 
                        ? 'bg-green-500/20 border-2 border-green-400 hover:bg-green-500/30' 
                        : 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                    } text-white`}
                    onClick={() => playSound(index === scene.quiz!.correct ? 'success' : 'wrong')}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <p className="text-cyan-200 text-sm md:text-base mt-4 italic">{scene.quiz.explanation}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scene.choices.map((choice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
              >
                <Button
                  onClick={() => handleChoiceClick(choice, scenes)}
                  className="w-full p-4 md:p-6 text-base md:text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl border-2 border-white/30 shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-left flex-1">{choice.text}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-400 text-black text-sm">+{choice.points}</Badge>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {scene.miniGame && (
            <motion.div
              className="mt-6 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-400/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Gamepad2 className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-bold text-lg">Fun Activity!</span>
              </div>
              <p className="text-white text-base md:text-lg mb-2">{scene.miniGame.description}</p>
              <p className="text-green-200 text-sm md:text-base mb-4">{scene.miniGame.instructions}</p>
              <Button
                onClick={() => playSound('success')}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Activity
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 mb-4">
          <Progress 
            value={(currentScene / (scenes.length - 1)) * 100} 
            className="h-3"
          />
          <p className="text-center text-white mt-2 text-sm md:text-base">
            Scene {currentScene + 1} of {scenes.length}
          </p>
        </div>

        {renderVocabularyHelper()}

        {/* Cutscene and Celebration overlays remain the same */}
        <AnimatePresence>
          {showCutscene && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 max-w-2xl mx-4 text-center border-4 border-white"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl md:text-8xl mb-6"
                >
                  🌟
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Loading Next Scene...</h3>
                <div className="w-full bg-white/20 rounded-full h-4">
                  <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.5, rotate: 180 }}
                className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 md:p-12 max-w-2xl mx-4 text-center border-4 border-white shadow-2xl"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl md:text-8xl mb-6"
                >
                  🏆
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Story Completed!</h3>
                <p className="text-white text-lg md:text-xl mb-6">
                  You earned {gameState.score} points and learned so much about space weather!
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
                      className="text-3xl md:text-4xl"
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
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8 flex-wrap gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-lg md:text-xl px-4 md:px-6 py-3 rounded-2xl"
        >
          <Home className="w-5 md:w-6 h-5 md:h-6" />
          Back to Home
        </Button>
        
        <div className="text-center flex-1">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            📚 Fun Space Weather Stories
          </h1>
          <p className="text-lg md:text-xl text-cyan-200">
            Learn about space weather through exciting adventures!
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 md:px-4 py-2 text-base md:text-lg">
            Stories: {gameState.completedStories}/{stories.length}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 md:px-4 py-2 text-base md:text-lg">
            Points: {gameState.knowledgePoints}
          </Badge>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-6 mb-8 border-2 border-cyan-400/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h3 className="text-2xl font-bold text-white">Your Learning Journey</h3>
          <Award className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-cyan-400">{gameState.completedStories}</div>
            <div className="text-cyan-200">Stories Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">{gameState.knowledgePoints}</div>
            <div className="text-purple-200">Knowledge Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400">{Math.round((gameState.completedStories / stories.length) * 100)}%</div>
            <div className="text-green-200">Progress</div>
          </div>
        </div>
      </motion.div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card className={`bg-gradient-to-br ${story.gradient} border-2 border-white/30 shadow-2xl cursor-pointer h-full`}>
              <CardHeader className="text-center">
                <motion.div
                  className="text-5xl md:text-6xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {story.emoji}
                </motion.div>
                <CardTitle className="text-xl md:text-2xl text-white mb-2">{story.title}</CardTitle>
                <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                  <Badge className={`${
                    story.difficulty === 'Easy' ? 'bg-green-500' :
                    story.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white text-sm`}>
                    {story.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {story.duration}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-white text-base md:text-lg leading-relaxed">{story.description}</p>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-cyan-300 font-bold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    What You'll Learn
                  </h4>
                  <p className="text-cyan-100 text-sm md:text-base">{story.kidFriendlyInfo.mainIdea}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-yellow-300 font-bold mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Fun Facts
                  </h4>
                  <ul className="text-yellow-100 text-sm space-y-1">
                    {story.kidFriendlyInfo.funFacts.slice(0, 2).map((fact, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1 text-xs">•</span>
                        <span className="text-sm">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Word Helper
                  </h4>
                  <p className="text-purple-100 text-sm">
                    {story.kidFriendlyInfo.vocabulary.length} helpful words explained!
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setSelectedStory(story.id);
                    setCurrentScene(0);
                    playSound('click');
                  }}
                  className="w-full bg-white/20 hover:bg-white/30 text-white text-base md:text-lg py-4 md:py-6 rounded-2xl border-2 border-white/50 transition-all duration-300 hover:shadow-xl"
                >
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Start Story Adventure
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Fun Learning Tips */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-gray-800/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-600/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Learning Tips for Young Explorers! 🌟</h3>
          <p className="text-gray-300 text-base md:text-lg">
            All stories are based on real NASA science but explained in simple, fun ways!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-200 font-semibold">Use the Word Helper</p>
            <p className="text-blue-100 text-sm mt-1">Click the dictionary button for help with difficult words!</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-200 font-semibold">Learn Fun Facts</p>
            <p className="text-yellow-100 text-sm mt-1">Discover amazing things about space weather!</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-200 font-semibold">Earn Points</p>
            <p className="text-green-100 text-sm mt-1">Make good choices to earn knowledge points!</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (selectedStory) {
    return renderStoryPlayer();
  }

  return renderStorySelection();
}