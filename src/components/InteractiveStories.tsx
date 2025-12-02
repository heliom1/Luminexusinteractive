import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import SpaceDictionary from "./SpaceDictionary";
import { ImageWithFallback } from "./figma/ImageWithFallback";
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
  Atom,
} from "lucide-react";

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
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  description: string;
  category:
    | "farmers"
    | "pilots"
    | "astronauts"
    | "power"
    | "everyday";
  gradient: string;
  scenes: StoryScene[];
}

interface StoryScene {
  id: number;
  title: string;
  background: string;
  character: string;
  text: string;
  imageType: string; // Changed from illustration to imageType for simplicity
  choices: Array<{
    text: string;
    next: number;
    points: number;
    feedback?: string;
  }>;
  vocabulary?: Array<{
    word: string;
    meaning: string;
    example: string;
  }>;
  funFact?: string;
  animation?: string;
}

export default function InteractiveStories({
  playerName,
  onBack,
  userProfile,
}: InteractiveStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<
    string | null
  >(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [gameState, setGameState] = useState({
    score: 0,
    lives: 3,
    completedStories: 0,
    wordsLearned: 0,
    achievements: [] as string[],
  });
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictionaryWord, setDictionaryWord] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<string[]>(
    [],
  );
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Image-based Illustration Component - MOBILE FRIENDLY & EASY TO EDIT
  const SpaceIllustration = ({ type }: { type: string }) => {
    const getImageSrc = () => {
      switch (type) {
        case "farmer_gps":
          return "https://images.unsplash.com/photo-1764680206441-01eec1ec79ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D";
        case "satellite_signals":
          return "https://images.unsplash.com/photo-1764679933757-fea110dd750e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8fA%3D%3D";
        case "solar_storm":
          return "https://images.unsplash.com/photo-1764680000207-d61a70a73945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NXx8fGVufDB8fHx8fA%3D%3D";
        case "earth_shield":
          return "https://images.unsplash.com/photo-1764679867645-da7b8f424e4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D";
        case "pilot_aurora":
          return "https://images.unsplash.com/photo-1764681575791-d804444301c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D";
        case "communication_issues":
          return "https://images.unsplash.com/photo-1764681944698-3a335c5adda1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D";
        case "astronaut_space":
          return "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1200&h=800&fit=crop";
        case "power_grid":
          return "https://images.unsplash.com/photo-1509390144105-d6e5c5a90ece?w=1200&h=800&fit=crop";
        case "solutions":
          return "https://images.unsplash.com/photo-1764680767668-5f8e67587551?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D";
        case "celebration":
          return "https://images.unsplash.com/photo-1764681081891-6f20087d29b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D";
        default:
          return "https://images.unsplash.com/photo-1764681081891-6f20087d29b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D";
      }
    };

    const getCaption = () => {
      switch (type) {
        case "farmer_gps":
          return "GPS: \"You're in a lake!\" 🌊 - But I'm clearly in my cornfield! 🌽🌽🌽";
        case "satellite_signals":
          return "24 Satellites send signals to Earth! 🛰️";
        case "solar_storm":
          return "Solar storm confuses GPS signals! ⚡☀️";
        case "earth_shield":
          return "Earth's magnetic field protects us like a superhero shield! 🛡️🌍";
        case "pilot_aurora":
          return "Beautiful aurora lights dancing in the night sky! 🌈✨";
        case "communication_issues":
          return "Aurora interferes with radio communications! 📻⚡";
        case "astronaut_space":
          return "Space is an amazing but dangerous place! 🚀👨‍🚀";
        case "power_grid":
          return "Solar storms can affect power grids! ⚡🔌";
        case "solutions":
          return "Smart solutions keep us safe! 🧠💡";
        case "celebration":
          return "🏆 Mission Complete! You're a Space Weather Expert! 🌟";
        default:
          return "Exploring the wonders of space weather! 🌌";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4 md:mb-6 w-full"
      >
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
          {/* Main Image - Easy to replace with your own */}
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={getImageSrc()}
              alt={getCaption()}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>

          {/* Caption Box - Mobile Friendly */}
          <div className="mt-3 md:mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl p-3 md:p-4 shadow-lg">
            <p className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed">
              {getCaption()}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Enhanced stories with image-based illustrations - EASY TO EDIT
  const stories: Story[] = [
    {
      id: "farmer-sarah-adventure",
      title: "🌾 Sarah's GPS Mystery",
      character: "Farmer Sarah",
      emoji: "👩‍🌾",
      difficulty: "Easy",
      duration: "10 min",
      description:
        "Help Farmer Sarah solve the mysterious GPS problem during a solar storm!",
      category: "farmers",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      scenes: [
        {
          id: 0,
          title: "🌾 Meet Farmer Sarah",
          background:
            "bg-gradient-to-b from-sky-400 via-green-400 to-green-600",
          character: "👩‍🌾",
          text: `Hi there, ${playerName}! I'm Sarah, and I'm a farmer who loves technology! I use GPS to help me plant my crops in perfect straight rows. But today something really weird is happening - my GPS is telling me I'm standing in the middle of a lake, but I'm clearly in my cornfield! Can you help me figure out what's going on?`,
          imageType: "farmer_gps",
          choices: [
            {
              text: "How does GPS actually work? 🛰️",
              next: 1,
              points: 10,
            },
            {
              text: "Could space weather be affecting it? 🌌",
              next: 2,
              points: 15,
            },
          ],
          vocabulary: [
            {
              word: "GPS",
              meaning:
                "Global Positioning System - uses satellites to find your exact location",
              example:
                "Like a magical compass that tells you exactly where you are!",
            },
            {
              word: "Satellite",
              meaning:
                "A machine that orbits around Earth in space",
              example:
                "Like helpful robots flying around our planet!",
            },
          ],
          funFact:
            "Did you know GPS needs signals from at least 4 satellites to pinpoint your exact location? It's like having 4 friends point to you from different corners of a playground!",
        },
        {
          id: 1,
          title: "🛰️ How GPS Really Works",
          background:
            "bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600",
          character: "🛰️",
          text: "Excellent question! GPS is like a cosmic game of Marco Polo! There are 24 satellites flying around Earth about 20,000 kilometers up in space. Each satellite has a super accurate clock and constantly broadcasts the time and its position. Your GPS device listens to at least 4 satellites and uses math to figure out exactly where you are!",
          imageType: "satellite_signals",
          choices: [
            {
              text: "So why isn't it working today? ⚡",
              next: 3,
              points: 15,
            },
            {
              text: "How accurate is GPS normally? 📏",
              next: 4,
              points: 10,
            },
          ],
          vocabulary: [
            {
              word: "Orbit",
              meaning:
                "The path a satellite takes as it goes around Earth",
              example: "Like a race track, but in space!",
            },
            {
              word: "Signal",
              meaning: "A message sent through the air",
              example:
                "Like invisible text messages from space!",
            },
          ],
          funFact:
            "GPS satellites travel at about 14,000 kilometers per hour - that's faster than any car on Earth!",
        },
        {
          id: 2,
          title: "☀️ Solar Storm Alert!",
          background:
            "bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600",
          character: "☀️",
          text: "Wow, you're absolutely right! There's a solar storm happening right now! The Sun is having a cosmic tantrum and shooting out extra energy and particles toward Earth. Think of it like the Sun sneezing really hard! This extra energy can make GPS signals get mixed up and confused, just like how loud music can make it hard to hear someone talking.",
          imageType: "solar_storm",
          choices: [
            {
              text: "How does solar energy mess with GPS? 🔬",
              next: 5,
              points: 20,
            },
            {
              text: "When will my GPS work normally again? ⏰",
              next: 6,
              points: 15,
            },
          ],
          vocabulary: [
            {
              word: "Solar storm",
              meaning:
                "When the Sun sends extra energy and particles toward Earth",
              example:
                "Like the Sun having a really big sneeze that reaches Earth!",
            },
            {
              word: "Particles",
              meaning:
                "Tiny invisible pieces of energy from the Sun",
              example:
                "Like cosmic dust that you can't see but it affects electronics!",
            },
          ],
          funFact:
            "Solar storms can also create beautiful aurora lights (Northern Lights) that dance in the sky like nature's own light show!",
          animation: "pulse",
        },
        {
          id: 3,
          title: "🛡️ Earth's Invisible Shield",
          background:
            "bg-gradient-to-b from-purple-400 via-blue-500 to-cyan-600",
          character: "🛡️",
          text: "Here's the amazing part! Earth has an invisible shield called a magnetic field that protects us from most space weather, just like a superhero's force field! But during a solar storm, this shield gets all stirred up like water in a shaken bottle. The GPS signals have to travel through this 'shaken' shield, which can bend or delay them, making your GPS confused about where you are!",
          imageType: "earth_shield",
          choices: [
            {
              text: "How can farmers deal with this problem? 🚜",
              next: 7,
              points: 25,
            },
            {
              text: "Tell me more about Earth's magnetic shield! 🌍",
              next: 8,
              points: 20,
            },
          ],
          vocabulary: [
            {
              word: "Magnetic field",
              meaning:
                "Earth's invisible protective shield made of magnetism",
              example:
                "Like an invisible superhero cape that surrounds our whole planet!",
            },
            {
              word: "Atmosphere",
              meaning: "The layers of air around Earth",
              example:
                "Like a cozy blanket of air that keeps us safe and lets us breathe!",
            },
          ],
          funFact:
            "Earth's magnetic field is so powerful it can be detected by compasses, and it's what makes the needle always point north!",
        },
        {
          id: 4,
          title: "📏 GPS Accuracy Facts",
          background:
            "bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600",
          character: "📏",
          text: "Great question! On a normal day, GPS is incredibly accurate - usually within 5 to 10 meters (about 15 to 30 feet)! That's accurate enough to know exactly which room you're in! But during solar storms, that accuracy can drop to 50 meters or more, which is why it might think you're in a lake when you're really in your field!",
          imageType: "satellite_signals",
          choices: [
            {
              text: "How can farmers deal with this problem? 🚜",
              next: 7,
              points: 20,
            },
            {
              text: "Why does the Sun affect GPS signals? ☀️",
              next: 2,
              points: 15,
            },
          ],
          vocabulary: [
            {
              word: "Accuracy",
              meaning:
                "How close something is to being exactly right",
              example: "Like hitting the bullseye in darts!",
            },
            {
              word: "Meter",
              meaning: "A unit of measurement (about 3 feet)",
              example: "About the length of a guitar!",
            },
          ],
          funFact:
            "Military GPS is even more accurate - it can pinpoint locations within just a few centimeters!",
        },
        {
          id: 5,
          title: "🔬 The Science of GPS Interference",
          background:
            "bg-gradient-to-b from-red-400 via-orange-500 to-yellow-600",
          character: "🔬",
          text: "Here's the science! GPS signals are radio waves traveling from satellites to your device. During a solar storm, Earth's atmosphere gets charged with extra particles, creating what scientists call 'ionospheric disturbances.' These charged particles bend and slow down the GPS signals, just like how a straw looks bent when you put it in water! This bending confuses your GPS receiver about where the signal came from.",
          imageType: "solar_storm",
          choices: [
            {
              text: "How can farmers deal with this problem? 🚜",
              next: 7,
              points: 25,
            },
            {
              text: "Tell me more about Earth's protection! 🛡️",
              next: 3,
              points: 20,
            },
          ],
          vocabulary: [
            {
              word: "Ionosphere",
              meaning:
                "A layer of Earth's atmosphere filled with charged particles",
              example:
                "Like an invisible electric blanket around Earth!",
            },
            {
              word: "Radio waves",
              meaning:
                "Invisible waves that carry signals through the air",
              example:
                "Like invisible messengers that travel at the speed of light!",
            },
          ],
          funFact:
            "The ionosphere is about 50-600 miles above Earth - that's higher than where planes fly!",
        },
        {
          id: 6,
          title: "⏰ Storm Duration",
          background:
            "bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600",
          character: "⏰",
          text: "Good news - most solar storms only last a few hours to a couple of days! Scientists monitor the Sun 24/7 using special satellites and can often predict when storms will happen. Once the storm passes, your GPS will return to normal accuracy. Think of it like a weather storm - it comes, causes some disruption, and then clears up!",
          imageType: "solar_storm",
          choices: [
            {
              text: "How can farmers deal with this problem? 🚜",
              next: 7,
              points: 25,
            },
            {
              text: "Can scientists predict these storms? 🔮",
              next: 10,
              points: 20,
            },
          ],
          vocabulary: [
            {
              word: "Predict",
              meaning:
                "To figure out what will happen before it happens",
              example:
                "Like guessing it will rain because you see dark clouds!",
            },
            {
              word: "Monitor",
              meaning: "To watch something carefully over time",
              example:
                "Like keeping an eye on a pot of water to see when it boils!",
            },
          ],
          funFact:
            "NASA has special satellites called SOHO and SDO that watch the Sun constantly, just like weather satellites watch Earth!",
        },
        {
          id: 7,
          title: "🚜 Smart Farming Solutions",
          background:
            "bg-gradient-to-b from-green-400 via-yellow-500 to-orange-500",
          character: "🧠",
          text: `You're thinking like a real problem-solver, ${playerName}! Smart farmers like me always have backup plans. During solar storms, I can: use different GPS systems that work better during storms (like European Galileo or Russian GLONASS), wait for the storm to calm down before planting, use traditional farming methods that don't need GPS, or rely on my years of experience knowing my land! The most important thing is being flexible and having multiple solutions!`,
          imageType: "solutions",
          choices: [
            {
              text: "This is amazing! What did we learn? 🌟",
              next: 9,
              points: 30,
            },
            {
              text: "Can scientists predict solar storms? 🔮",
              next: 10,
              points: 25,
            },
          ],
          vocabulary: [
            {
              word: "Flexible",
              meaning:
                "Being able to change and adapt when needed",
              example:
                "Like a tree that bends in the wind instead of breaking!",
            },
            {
              word: "Traditional",
              meaning:
                "Old ways of doing things that have worked for a long time",
              example:
                "Like recipes passed down from grandparents!",
            },
          ],
          funFact:
            "Many farmers use multiple GPS systems at the same time, so if one gets confused by space weather, they still have backups!",
        },
        {
          id: 8,
          title: "🌍 Earth's Amazing Magnetic Field",
          background:
            "bg-gradient-to-b from-purple-500 via-blue-600 to-cyan-600",
          character: "🌍",
          text: "Earth's magnetic field is created by swirling molten iron in our planet's core - like a giant magnet inside Earth! This field extends thousands of miles into space, creating a protective bubble called the magnetosphere. It shields us from dangerous solar radiation and cosmic rays. Without it, solar wind would strip away our atmosphere, and life on Earth wouldn't exist! Birds and sea animals use this field to navigate, and it's what makes compass needles point north!",
          imageType: "earth_shield",
          choices: [
            {
              text: "How can farmers deal with this problem? 🚜",
              next: 7,
              points: 25,
            },
            {
              text: "This is fascinating! What did we learn? 🌟",
              next: 9,
              points: 30,
            },
          ],
          vocabulary: [
            {
              word: "Magnetosphere",
              meaning:
                "The magnetic bubble around Earth that protects us from space radiation",
              example:
                "Like an invisible force field protecting our planet!",
            },
            {
              word: "Molten",
              meaning: "Super hot liquid metal",
              example:
                "Like melted crayons, but metal and thousands of degrees hot!",
            },
            {
              word: "Core",
              meaning: "The center of Earth",
              example: "Like the pit in the middle of a peach!",
            },
          ],
          funFact:
            "Earth's magnetic field flips every few hundred thousand years - north becomes south and south becomes north! Scientists call these 'magnetic reversals'!",
        },
        {
          id: 9,
          title: "🎓 Sarah's GPS Mystery Solved!",
          background:
            "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
          character: "🏆",
          text: `Outstanding detective work, ${playerName}! You've learned that GPS uses satellite signals from space, solar storms can interfere with these signals by affecting Earth's protective magnetic field, and smart farmers always have backup plans! You're now officially a space weather expert! Sarah's GPS will work normally again once the solar storm calms down, which usually takes a few hours to a few days.`,
          imageType: "celebration",
          choices: [
            {
              text: "I want to learn more! Show me another story! 📚",
              next: -1,
              points: 50,
            },
            {
              text: "Thank you, Sarah! That was amazing! 🙏",
              next: -1,
              points: 40,
            },
          ],
          vocabulary: [
            {
              word: "Expert",
              meaning:
                "Someone who knows a lot about a specific topic",
              example:
                "Like becoming a champion at your favorite video game!",
            },
          ],
          funFact:
            "Congratulations! You now know more about how space weather affects GPS than most adults do!",
          animation: "celebrate",
        },
        {
          id: 10,
          title: "🔮 Predicting Solar Storms",
          background:
            "bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-600",
          character: "🔮",
          text: "Yes! Scientists are getting better at predicting solar storms! They use special satellites to watch the Sun 24/7, looking for solar flares and coronal mass ejections (big bursts of solar material). When they detect a storm heading toward Earth, they can warn us 1-3 days in advance! This gives farmers, pilots, and power grid operators time to prepare. It's like having a weather forecast, but for space weather!",
          imageType: "solar_storm",
          choices: [
            {
              text: "That's incredible! What did we learn? 🌟",
              next: 9,
              points: 30,
            },
            {
              text: "How can farmers deal with this? 🚜",
              next: 7,
              points: 25,
            },
          ],
          vocabulary: [
            {
              word: "Solar flare",
              meaning: "A huge explosion on the Sun's surface",
              example:
                "Like a massive firework going off on the Sun!",
            },
            {
              word: "Coronal mass ejection",
              meaning:
                "A giant cloud of solar material shot out from the Sun",
              example:
                "Like the Sun sneezing out a huge cloud of hot gas!",
            },
          ],
          funFact:
            "The National Oceanic and Atmospheric Administration (NOAA) has a Space Weather Prediction Center that monitors the Sun and issues alerts!",
        },
      ],
    },
    {
      id: "pilot-alex-aurora",
      title: "✈️ Captain Alex's Aurora Adventure",
      character: "Pilot Alex",
      emoji: "👨‍✈️",
      difficulty: "Medium",
      duration: "12 min",
      description:
        "Fly with Captain Alex and discover the magic of auroras while learning about aviation safety!",
      category: "pilots",
      gradient: "from-blue-400 via-purple-500 to-pink-600",
      scenes: [
        {
          id: 0,
          title: "✈️ Welcome Aboard Flight 203!",
          background:
            "bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-600",
          character: "👨‍✈️",
          text: `Welcome aboard Flight 203, ${playerName}! I'm Captain Alex, and tonight we're flying from New York to London. We're cruising at 35,000 feet when suddenly... WOW! Look out your window! Do you see those incredible green and purple lights dancing across the sky? Those are auroras - also called Northern Lights! They're absolutely magical, but they're also telling us something important about space weather.`,
          imageType: "pilot_aurora",
          choices: [
            {
              text: "What creates those beautiful dancing lights? 🌈",
              next: 1,
              points: 10,
            },
            {
              text: "Is it safe to fly during auroras? ✈️",
              next: 2,
              points: 15,
            },
          ],
          vocabulary: [
            {
              word: "Aurora",
              meaning:
                "Beautiful colored lights that dance in the sky, also called Northern Lights",
              example:
                "Like nature's own disco party in the sky!",
            },
            {
              word: "Cruising altitude",
              meaning:
                "The height where airplanes fly during most of their journey",
              example:
                "Like flying as high as three Mount Everests stacked on top of each other!",
            },
          ],
          funFact:
            "Auroras usually happen near the North and South Poles, but during strong space weather, they can be seen much farther south!",
        },
        {
          id: 1,
          title: "🌈 The Aurora Light Show Science",
          background:
            "bg-gradient-to-b from-green-400 via-purple-500 to-pink-600",
          character: "🔬",
          text: "Great question! Auroras are like a cosmic light show created by the Sun and Earth working together! The Sun constantly sends out tiny invisible particles called solar wind. When these particles reach Earth, our planet's magnetic field catches them and guides them toward the North and South Poles. As these particles hit gases in our atmosphere, they light up like a neon sign - oxygen creates green light, and nitrogen creates purple and red!",
          imageType: "pilot_aurora",
          choices: [
            {
              text: "That's beautiful! What's the impact on flying? ✈️",
              next: 3,
              points: 15,
            },
            {
              text: "Can auroras affect our airplane? ⚡",
              next: 4,
              points: 20,
            },
          ],
          vocabulary: [
            {
              word: "Solar wind",
              meaning:
                "A stream of particles constantly flowing from the Sun",
              example:
                "Like an invisible river of tiny particles flowing through space!",
            },
            {
              word: "Magnetic field",
              meaning:
                "Earth's invisible protective force field",
              example:
                "Like an invisible superhero shield around our planet!",
            },
            {
              word: "Atmosphere",
              meaning:
                "The layers of gases that surround Earth",
              example:
                "Like a warm blanket of air that protects and surrounds our planet!",
            },
          ],
          funFact:
            "The colors of auroras depend on which gases the solar particles hit! Oxygen makes green and red, while nitrogen creates blue and purple!",
        },
        {
          id: 2,
          title: "✈️ Aviation Safety During Auroras",
          background:
            "bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-600",
          character: "✈️",
          text: "Excellent question about safety! Flying during auroras is generally safe, but we pilots need to be extra careful. The same solar activity that creates beautiful auroras can also cause increased radiation levels at high altitudes, interfere with our communication and navigation systems, and create turbulence. That's why we monitor space weather forecasts just like we monitor regular weather! We might change our flight path or altitude to minimize exposure.",
          imageType: "pilot_aurora",
          choices: [
            {
              text: "How do auroras affect communications? 📻",
              next: 4,
              points: 20,
            },
            {
              text: "What creates these beautiful lights? 🌈",
              next: 1,
              points: 10,
            },
          ],
          vocabulary: [
            {
              word: "Radiation",
              meaning: "Energy that travels through space",
              example:
                "Like invisible energy waves from the Sun!",
            },
            {
              word: "Turbulence",
              meaning: "Bumpy air that makes planes shake",
              example:
                "Like driving on a bumpy road, but in the sky!",
            },
          ],
          funFact:
            "Pilots flying over polar regions during strong space weather can receive as much radiation as a chest X-ray!",
        },
        {
          id: 3,
          title: "✈️ Flying Through Aurora Country",
          background:
            "bg-gradient-to-b from-purple-400 via-pink-500 to-orange-600",
          character: "✈️",
          text: "Flying when auroras are visible is actually quite common on routes to Europe, Alaska, or Scandinavia! For us pilots, seeing auroras means we need to be more alert. We monitor our instruments more carefully, keep in closer contact with air traffic control, and check our radiation exposure levels. But for passengers like you, it's a once-in-a-lifetime view! Many people fly specifically to see auroras from above the clouds!",
          imageType: "pilot_aurora",
          choices: [
            {
              text: "Can auroras affect our airplane systems? ⚡",
              next: 4,
              points: 20,
            },
            {
              text: "How do you navigate during space weather? 🧭",
              next: 5,
              points: 25,
            },
          ],
          vocabulary: [
            {
              word: "Scandinavia",
              meaning:
                "Northern European countries like Norway, Sweden, and Finland",
              example:
                "Countries close to the North Pole where auroras are common!",
            },
            {
              word: "Instruments",
              meaning:
                "The tools and gauges pilots use to fly safely",
              example:
                "Like the dashboard in a car, but much more complex!",
            },
          ],
          funFact:
            "Some airlines offer special 'Aurora Hunter' flights that fly routes specifically to give passengers the best aurora views!",
        },
        {
          id: 4,
          title: "📻 Communication Challenges in the Sky",
          background:
            "bg-gradient-to-b from-orange-400 via-red-500 to-purple-600",
          character: "📻",
          text: "You're thinking like a real pilot! During strong aurora activity, our radio communications can get fuzzy or even stop working completely. It's like trying to have a phone conversation during a thunderstorm - the signals get all mixed up! The same charged particles that create the beautiful lights also interfere with radio waves. That's why we have multiple backup communication systems and sometimes need to change our flight path to areas with clearer communication.",
          imageType: "communication_issues",
          choices: [
            {
              text: "How do you navigate without clear radio? 🧭",
              next: 5,
              points: 25,
            },
            {
              text: "Do passengers know about these challenges? 👥",
              next: 6,
              points: 20,
            },
          ],
          vocabulary: [
            {
              word: "Communication",
              meaning:
                "Talking or sending messages between people or devices",
              example:
                "Like using walkie-talkies to talk to air traffic control!",
            },
            {
              word: "Navigation",
              meaning:
                "Finding your way from one place to another",
              example:
                "Like using a treasure map to find your destination!",
            },
            {
              word: "Flight path",
              meaning:
                "The route an airplane takes through the sky",
              example:
                "Like a highway in the sky that planes follow!",
            },
          ],
          funFact:
            "Pilots train extensively for these situations and always have multiple backup plans to ensure passenger safety!",
        },
        {
          id: 5,
          title: "🧭 Advanced Navigation Systems",
          background:
            "bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600",
          character: "🧭",
          text: `Excellent question, ${playerName}! Modern airplanes are like flying computers with many navigation systems. We have GPS (when it's working properly), inertial navigation systems that remember where we've been, radio beacons on the ground, and we can even navigate by the stars like sailors did centuries ago! Plus, air traffic control has radar that can track us even when our radios are fuzzy. Safety always comes first!`,
          imageType: "solutions",
          choices: [
            {
              text: "This is incredible! What did I learn? 🌟",
              next: 7,
              points: 30,
            },
            {
              text: "How often do auroras affect flights? 📅",
              next: 8,
              points: 25,
            },
          ],
          vocabulary: [
            {
              word: "Inertial navigation",
              meaning:
                "A system that tracks movement by remembering where you started",
              example:
                "Like having a really good memory of every turn and move you make!",
            },
            {
              word: "Radar",
              meaning:
                "A system that uses radio waves to detect and track objects",
              example:
                "Like having super vision that can see things far away using invisible waves!",
            },
            {
              word: "Air traffic control",
              meaning:
                "People on the ground who help guide airplanes safely",
              example:
                "Like traffic directors for the sky highways!",
            },
          ],
          funFact:
            "Commercial airplanes have so many backup navigation systems that they're incredibly safe, even during the strongest space weather events!",
        },
        {
          id: 6,
          title: "👥 Passenger Safety First",
          background:
            "bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600",
          character: "👥",
          text: "Great question! Most passengers don't realize when space weather is affecting our systems because we handle it all behind the scenes! We're trained to deal with these challenges smoothly. If we need to change altitude or route due to space weather, we make these adjustments carefully. The extra radiation during strong auroras is monitored, but flight crews are exposed to more radiation than passengers, and we stay well within safe limits. Your safety is always our top priority!",
          imageType: "pilot_aurora",
          choices: [
            {
              text: "How do you navigate with backup systems? 🧭",
              next: 5,
              points: 25,
            },
            {
              text: "Wow! What did I learn from this flight? 🌟",
              next: 7,
              points: 30,
            },
          ],
          vocabulary: [
            {
              word: "Altitude",
              meaning:
                "How high the airplane is above the ground",
              example:
                "Like how high up a mountain you've climbed!",
            },
            {
              word: "Radiation exposure",
              meaning: "How much radiation energy you receive",
              example:
                "Like measuring how much sunshine you get!",
            },
            {
              word: "Safe limits",
              meaning:
                "Amounts that are proven to not cause harm",
              example:
                "Like eating enough candy to enjoy it, but not so much you get sick!",
            },
          ],
          funFact:
            "Flight attendants and pilots are classified as 'radiation workers' by some agencies because they fly so much, but it's still much less than what medical workers get from X-rays!",
        },
        {
          id: 7,
          title: "🎓 Captain Alex's Aurora Flight Complete!",
          background:
            "bg-gradient-to-b from-gold via-yellow-400 to-orange-500",
          character: "🏆",
          text: `Outstanding work, ${playerName}! You've learned that auroras are created when solar particles interact with Earth's magnetic field and atmosphere, they can interfere with radio communications and navigation systems, pilots have multiple backup systems for safety, and aviation safety always comes first during space weather events. You'd make an excellent pilot or atmospheric scientist! Thanks for flying with us tonight - I hope you enjoyed the aurora show!`,
          imageType: "celebration",
          choices: [
            {
              text: "I want to learn more! Show me another story! 📚",
              next: -1,
              points: 50,
            },
            {
              text: "Thank you, Captain Alex! That was amazing! 🙏",
              next: -1,
              points: 40,
            },
          ],
          vocabulary: [
            {
              word: "Atmospheric scientist",
              meaning:
                "Someone who studies Earth's atmosphere and weather",
              example:
                "Like a detective who solves mysteries about air and weather!",
            },
          ],
          funFact:
            "Many pilots keep journals of aurora sightings and compare them with space weather forecasts to improve their understanding!",
          animation: "celebrate",
        },
        {
          id: 8,
          title: "📅 Aurora Frequency and Patterns",
          background:
            "bg-gradient-to-b from-purple-500 via-indigo-600 to-blue-600",
          character: "📅",
          text: "Auroras follow the Sun's activity cycle! The Sun has an 11-year cycle of activity. During solar maximum (the most active period), we see auroras several times a week on polar routes! During solar minimum, they're less common. Pilots on routes crossing the Arctic Circle see auroras frequently - Alaska Airlines and Scandinavian Airlines pilots might see them once a week or more during active periods! It's one of the perks of the job!",
          imageType: "pilot_aurora",
          choices: [
            {
              text: "How do you prepare for space weather? 🧭",
              next: 5,
              points: 25,
            },
            {
              text: "Amazing! What did I learn? 🌟",
              next: 7,
              points: 30,
            },
          ],
          vocabulary: [
            {
              word: "Solar cycle",
              meaning:
                "The Sun's 11-year pattern of activity changes",
              example: "Like the seasons, but for the Sun!",
            },
            {
              word: "Solar maximum",
              meaning:
                "When the Sun is most active with lots of storms",
              example:
                "Like the Sun being in a super energetic mood!",
            },
            {
              word: "Arctic Circle",
              meaning: "The region around the North Pole",
              example:
                "The super cold northern part of Earth where Santa lives!",
            },
          ],
          funFact:
            "The last solar maximum was in 2014, and the next one is expected around 2025 - perfect timing for amazing aurora displays!",
        },
      ],
    },
  ];

  const currentStory = stories.find(
    (s) => s.id === selectedStory,
  );
  const currentSceneData = currentStory?.scenes.find(
    (s) => s.id === currentScene,
  );

  const handleChoice = (choice: any) => {
    if (soundEnabled) {
      // Play sound effect
    }

    setGameState((prev) => ({
      ...prev,
      score: prev.score + choice.points,
    }));

    setPlayerChoices([...playerChoices, choice.text]);

    if (choice.next === -1) {
      // Story complete
      setShowCelebration(true);
      setGameState((prev) => ({
        ...prev,
        completedStories: prev.completedStories + 1,
      }));

      setTimeout(() => {
        setShowCelebration(false);
        setSelectedStory(null);
        setCurrentScene(0);
        setPlayerChoices([]);
      }, 3000);
    } else {
      setCurrentScene(choice.next);
    }
  };

  const openDictionary = (word: string) => {
    setDictionaryWord(word);
    setShowDictionary(true);
  };

  // Show full dictionary if requested
  if (showDictionary) {
    return (
      <SpaceDictionary
        onBack={() => setShowDictionary(false)}
        searchWord={dictionaryWord}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Mobile Friendly */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 mb-4 md:mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white">
                Interactive Stories
              </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto flex-wrap">
              <div className="bg-yellow-500/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                <span className="text-white text-sm md:text-base font-bold">
                  {gameState.score}
                </span>
              </div>
              <Button
                onClick={() => setShowDictionary(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm md:text-base px-3 md:px-4 py-2 shadow-lg"
              >
                <BookOpen className="w-4 h-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">
                  Dictionary
                </span>
                <span className="sm:hidden">📚</span>
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/30 text-white text-sm md:text-base"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Story Selection - Mobile Friendly */}
        {!selectedStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
          >
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedStory(story.id)}
              >
                <Card
                  className={`bg-gradient-to-br ${story.gradient} border-4 border-white/20 hover:border-white/40 transition-all h-full`}
                >
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <div className="text-4xl md:text-5xl lg:text-6xl">
                        {story.emoji}
                      </div>
                      <Badge className="bg-white/20 text-white text-xs md:text-sm">
                        {story.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl text-white mb-2">
                      {story.title}
                    </CardTitle>
                    <p className="text-white/90 text-sm md:text-base mb-3">
                      {story.description}
                    </p>
                    <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{story.duration}</span>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Story Viewer - Mobile Friendly */}
        {selectedStory && currentSceneData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Progress Bar - Mobile Friendly */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-xs md:text-sm font-bold">
                  Scene {currentScene + 1} of{" "}
                  {currentStory?.scenes.length}
                </span>
                <span className="text-yellow-400 text-xs md:text-sm font-bold">
                  +{gameState.score} points
                </span>
              </div>
              <Progress
                value={
                  ((currentScene + 1) /
                    (currentStory?.scenes.length || 1)) *
                  100
                }
                className="h-2 md:h-3"
              />
            </Card>

            {/* Scene Content - Mobile Friendly */}
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Scene Card */}
              <Card
                className={`${currentSceneData.background} border-4 border-white/30 overflow-hidden`}
              >
                <CardHeader className="p-3 sm:p-4 md:p-6 lg:p-8">
                  {/* Title */}
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <span className="text-3xl md:text-4xl lg:text-5xl">
                      {currentSceneData.character}
                    </span>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white">
                      {currentSceneData.title}
                    </CardTitle>
                  </div>

                  {/* IMAGE ILLUSTRATION - EASY TO REPLACE */}
                  <SpaceIllustration
                    type={currentSceneData.imageType}
                  />

                  {/* Story Text - Mobile Friendly */}
                  <div className="bg-white/90 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 mt-4 md:mt-6">
                    <p className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                      {currentSceneData.text}
                    </p>
                  </div>

                  {/* Fun Fact - Mobile Friendly with BETTER CONTRAST */}
                  {currentSceneData.funFact && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-yellow-400 border-4 border-yellow-600 rounded-xl md:rounded-2xl p-4 md:p-5 mt-4 md:mt-6 shadow-lg"
                    >
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="bg-white rounded-full p-2 md:p-3 flex-shrink-0">
                          <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="text-yellow-900 font-bold text-base md:text-lg mb-2">
                            💡 Fun Fact!
                          </h4>
                          <p className="text-gray-900 font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                            {currentSceneData.funFact}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Vocabulary - Mobile Friendly with EASY DICTIONARY ACCESS */}
                  {currentSceneData.vocabulary &&
                    currentSceneData.vocabulary.length > 0 && (
                      <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
                        <h4 className="text-white font-bold text-base md:text-lg flex items-center gap-2 bg-purple-600/40 px-4 py-2 rounded-xl border-2 border-white/30">
                          <BookMarked className="w-5 h-5 md:w-6 md:h-6" />
                          📚 New Words to Learn - Click to open
                          Dictionary!
                        </h4>
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                          {currentSceneData.vocabulary.map(
                            (vocab, index) => (
                              <motion.button
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.1,
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 rounded-xl md:rounded-2xl p-4 md:p-5 cursor-pointer transition-all shadow-lg hover:shadow-xl text-left group"
                                onClick={() =>
                                  openDictionary(vocab.word)
                                }
                              >
                                <div className="flex items-start gap-3 md:gap-4">
                                  <div className="bg-white/90 rounded-full p-2 md:p-3 flex-shrink-0">
                                    <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h5 className="text-gray-900 font-bold text-base md:text-lg">
                                        {vocab.word}
                                      </h5>
                                      <Badge className="bg-purple-600 text-white text-xs">
                                        Click for Dictionary
                                      </Badge>
                                    </div>
                                    <p className="text-gray-800 font-medium text-sm md:text-base mt-1">
                                      {vocab.meaning}
                                    </p>
                                    <p className="text-gray-700 text-xs md:text-sm mt-2 italic bg-white/50 rounded-lg px-3 py-2">
                                      💡 {vocab.example}
                                    </p>
                                  </div>
                                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </motion.button>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                  {/* Choices - Mobile Friendly */}
                  <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                    <h4 className="text-white font-bold text-sm md:text-base lg:text-lg">
                      What would you like to do?
                    </h4>
                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      {currentSceneData.choices.map(
                        (choice, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleChoice(choice)}
                            className="bg-white hover:bg-yellow-100 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 text-left transition-all shadow-lg hover:shadow-xl group"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-gray-800 font-bold text-sm sm:text-base md:text-lg group-hover:text-purple-600 transition-colors">
                                {choice.text}
                              </span>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Badge className="bg-yellow-500 text-white text-xs md:text-sm">
                                  +{choice.points}
                                </Badge>
                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </motion.button>
                        ),
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Celebration Modal */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.5, rotate: 10 }}
                className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center max-w-md md:max-w-lg"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="text-6xl md:text-7xl lg:text-8xl mb-4 md:mb-6"
                >
                  🏆
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-4">
                  Story Complete!
                </h2>
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6">
                  Amazing work, {playerName}!
                </p>
                <div className="flex items-center justify-center gap-3 md:gap-4 text-white">
                  <div className="bg-white/20 rounded-xl px-4 md:px-6 py-2 md:py-3">
                    <div className="text-xs md:text-sm opacity-80">
                      Score
                    </div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                      {gameState.score}
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-xl px-4 md:px-6 py-2 md:py-3">
                    <div className="text-xs md:text-sm opacity-80">
                      Stories
                    </div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                      {gameState.completedStories}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}