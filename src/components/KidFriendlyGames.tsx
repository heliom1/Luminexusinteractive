import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import {
  Gamepad2,
  Sun,
  Zap,
  Globe,
  ChevronLeft,
  Star,
  Stars,
  Trophy,
  RotateCcw,
  Play,
  Pause,
  Target,
  Sparkles,
  Shield,
  Brain,
  Coins,
  Award,
  Rocket,
  Heart,
  Crown,
  Home,
  Check,
  X,
  Timer,
  Volume2,
  MousePointer,
  Gauge,
  Activity,
  AlertTriangle,
  Flame,
  Waves,
  PartyPopper,
  Gift,
  Smile,
  Camera,
  Palette,
  Wand2,
  Crosshair,
  Bomb,
  Lightbulb,
  Radio,
  Satellite,
  Cpu,
  Database,
  BarChart3,
  TrendingUp,
  Settings,
  Compass,
  Navigation,
  MapPin,
  Eye,
  Clock,
  Users,
  BookOpen,
  Atom,
  Wind,
  Layers,
  Signal,
  Power,
  Monitor,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Move,
  Maximize2,
  Minimize2,
  SkipForward,
  FastForward,
  Rewind,
  Volume,
  VolumeX,
  Info,
  HelpCircle,
  Beaker,
  Microscope,
  FlaskConical,
  TestTube,
  Telescope,
  Orbit,
  Radar,
  CircuitBoard,
  Sliders,
  Wifi,
  Bluetooth,
  Save,
  Download,
  Upload,
  Share2,
  Copy,
  Edit,
  Trash2,
  Search,
  Filter,
  SortAsc,
  List,
  Grid,
  Calendar,
  Map,
  Thermometer,
  CloudRain,
  CloudSnow,
  Snowflake,
  Sunrise,
  Sunset,
  Moon,
  CloudLightning,
  Bolt,
} from "lucide-react";

interface KidFriendlyGamesProps {
  playerName: string;
  onBack: () => void;
}

interface GameState {
  score: number;
  level: number;
  lives: number;
  timeLeft: number;
  isActive: boolean;
  isCompleted: boolean;
  gameStarted: boolean;
  highScore: number;
  achievements: string[];
}

interface GameObject {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type:
    | "earth"
    | "solar_particle"
    | "shield"
    | "satellite"
    | "debris"
    | "aurora_particle"
    | "magnetic_field"
    | "good_particle"
    | "bad_particle";
  health?: number;
  energy?: number;
  protected?: boolean;
  color?: string;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  difficulty: string;
  difficultyColor: string;
  points: number;
  gameType: string;
  instructions: string;
  controls: string;
  kidFriendlyInfo: {
    whatYouDo: string;
    howToPlay: string;
    whatYouLearn: string;
    vocabulary: Array<{ word: string; meaning: string }>;
  };
}

export default function KidFriendlyGames({
  playerName,
  onBack,
}: KidFriendlyGamesProps) {
  const [selectedGame, setSelectedGame] = useState<
    string | null
  >(null);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    lives: 3,
    timeLeft: 60,
    isActive: false,
    isCompleted: false,
    gameStarted: false,
    highScore: 0,
    achievements: [],
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameObjectsRef = useRef<GameObject[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const keysPressed = useRef<Set<string>>(new Set());

  const [showInstructions, setShowInstructions] =
    useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    cosmicCoins: 347,
    gamesWon: 23,
    totalPlayTime: "4h 32m",
    favoriteGame: "Earth Protector",
  });

  // Kid-friendly games with simple explanations
  const kidFriendlyGames: Game[] = [
    {
      id: "earth-protector",
      title: "🌍 Earth Protector Game",
      description:
        "Help protect Earth from space particles! Move Earth around and use magical shields!",
      icon: "🛡️",
      gradient: "from-blue-400 via-green-500 to-cyan-600",
      difficulty: "Super Fun!",
      difficultyColor:
        "bg-gradient-to-r from-blue-400 to-green-500",
      points: 100,
      gameType: "Action Adventure",
      instructions:
        "Space particles are coming toward Earth! Move Earth around to avoid the red (bad) particles and collect the blue (good) particles. Click to create magical shields that protect Earth!",
      controls:
        "Mouse: Move Earth around the screen | Click: Create magical shield | Space: Super shield power!",
      kidFriendlyInfo: {
        whatYouDo:
          "You are Earth's superhero protector! Keep our planet safe from harmful space particles.",
        howToPlay:
          "Move your mouse to move Earth. Click to make shields. Avoid red particles, collect blue ones!",
        whatYouLearn:
          "Earth has an invisible magnetic shield that protects us from harmful space particles every day!",
        vocabulary: [
          {
            word: "Solar particles",
            meaning:
              "Tiny invisible pieces that come from the Sun",
          },
          {
            word: "Magnetic shield",
            meaning:
              "Earth's invisible protection that keeps us safe",
          },
          {
            word: "Space weather",
            meaning: "Changes in space that can affect Earth",
          },
        ],
      },
    },
    {
      id: "aurora-artist",
      title: "🌈 Aurora Artist Studio",
      description:
        "Create beautiful aurora lights in the sky! Mix colors and make pretty patterns!",
      icon: "🎨",
      gradient: "from-green-400 via-purple-500 to-pink-600",
      difficulty: "Creative Fun!",
      difficultyColor:
        "bg-gradient-to-r from-green-400 to-purple-500",
      points: 150,
      gameType: "Creative Art",
      instructions:
        "Use the color sliders to create beautiful aurora lights! Different colors appear at different heights in the sky. Green auroras are lower, red auroras are higher!",
      controls:
        "Sliders: Change aurora colors | Mouse: Paint aurora patterns | Keys 1-5: Different aurora shapes",
      kidFriendlyInfo: {
        whatYouDo:
          "You are an aurora artist! Create the most beautiful light show in the sky.",
        howToPlay:
          "Use the color controls to paint pretty lights in the sky. Try different colors and patterns!",
        whatYouLearn:
          "Auroras are real lights that dance in the sky when space particles meet Earth's atmosphere!",
        vocabulary: [
          {
            word: "Aurora",
            meaning:
              "Beautiful colored lights that dance in the sky",
          },
          {
            word: "Atmosphere",
            meaning: "The air around Earth",
          },
          {
            word: "Light show",
            meaning: "Pretty lights moving in patterns",
          },
        ],
      },
    },
    {
      id: "satellite-helper",
      title: "🛰️ Satellite Helper Mission",
      description:
        "Help fix satellites that got confused by space weather! Guide them back home!",
      icon: "🔧",
      gradient: "from-blue-400 via-cyan-500 to-teal-600",
      difficulty: "Space Helper!",
      difficultyColor:
        "bg-gradient-to-r from-blue-400 to-cyan-500",
      points: 200,
      gameType: "Puzzle Adventure",
      instructions:
        "Space weather mixed up the satellites! Use your arrow keys to guide them back to their correct positions. Avoid the space storms (swirling clouds)!",
      controls:
        "Arrow Keys: Move your satellite | Space: Boost speed | Enter: Send signal to other satellites",
      kidFriendlyInfo: {
        whatYouDo:
          "You are a satellite rescue hero! Help lost satellites find their way home.",
        howToPlay:
          "Use arrow keys to move satellites. Avoid the swirling storm clouds. Get satellites to safe zones!",
        whatYouLearn:
          "Satellites help us with GPS, weather, and communication, but space weather can confuse them!",
        vocabulary: [
          {
            word: "Satellite",
            meaning:
              "A helpful robot that flies around Earth in space",
          },
          {
            word: "GPS",
            meaning: "A system that tells you where you are",
          },
          {
            word: "Communication",
            meaning: "Talking or sending messages to people",
          },
        ],
      },
    },
    {
      id: "magnetic-field-builder",
      title: "🧲 Magnetic Field Builder",
      description:
        "Build Earth's invisible superhero shield! Make it strong enough to protect everyone!",
      icon: "⚡",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      difficulty: "Shield Master!",
      difficultyColor:
        "bg-gradient-to-r from-purple-400 to-pink-500",
      points: 250,
      gameType: "Strategy Building",
      instructions:
        "Drag and drop magnetic field pieces to build Earth's protective shield! Make sure there are no gaps where space particles can get through!",
      controls:
        "Mouse: Drag field pieces | Click: Rotate pieces | Space: Test your shield strength",
      kidFriendlyInfo: {
        whatYouDo:
          "You are Earth's shield engineer! Build the strongest magnetic shield to keep everyone safe.",
        howToPlay:
          "Drag the shield pieces around Earth. Make sure there are no holes for bad particles to get through!",
        whatYouLearn:
          "Earth's magnetic field is like an invisible superhero cape that protects us every day!",
        vocabulary: [
          {
            word: "Magnetic field",
            meaning:
              "An invisible force that protects Earth like a superhero shield",
          },
          {
            word: "Protect",
            meaning: "To keep safe from harm",
          },
          {
            word: "Invisible",
            meaning:
              "Something you can't see but is still there",
          },
        ],
      },
    },
    {
      id: "space-weather-detective",
      title: "🔍 Space Weather Detective",
      description:
        "Solve space weather mysteries! Find clues and predict when space storms will happen!",
      icon: "🕵️",
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      difficulty: "Smart Detective!",
      difficultyColor:
        "bg-gradient-to-r from-yellow-400 to-orange-500",
      points: 300,
      gameType: "Mystery Solving",
      instructions:
        "Look at the clues from space! When you see the Sun getting brighter and sending out flares, predict when the space weather will reach Earth!",
      controls:
        "Mouse: Click on clues | Number keys: Make predictions | Enter: Submit your detective report",
      kidFriendlyInfo: {
        whatYouDo:
          "You are a space weather detective! Use clues to predict when space storms will happen.",
        howToPlay:
          "Look for clues like bright flashes from the Sun. Guess when the space weather will reach Earth!",
        whatYouLearn:
          "Scientists watch the Sun all the time to predict space weather and keep people safe!",
        vocabulary: [
          {
            word: "Predict",
            meaning: "To guess what will happen in the future",
          },
          {
            word: "Solar flare",
            meaning: "A bright flash of energy from the Sun",
          },
          {
            word: "Detective",
            meaning:
              "Someone who solves mysteries by finding clues",
          },
        ],
      },
    },
    {
      id: "communication-rescue",
      title: "📻 Communication Rescue Squad",
      description:
        "Help people talk to each other when space weather makes radios fuzzy! Fix the signals!",
      icon: "📡",
      gradient: "from-pink-400 via-purple-500 to-blue-600",
      difficulty: "Signal Hero!",
      difficultyColor:
        "bg-gradient-to-r from-pink-400 to-purple-500",
      points: 175,
      gameType: "Rescue Mission",
      instructions:
        "Space weather is making radio signals all mixed up! Connect the signal paths to help people talk to each other again!",
      controls:
        "Mouse: Click and drag to connect signals | Space: Clear all connections | Enter: Test the connections",
      kidFriendlyInfo: {
        whatYouDo:
          "You are a communication hero! Help people talk to each other when space weather causes problems.",
        howToPlay:
          "Connect the signal lines to match the same colors. Make sure each person can talk to their friend!",
        whatYouLearn:
          "Space weather can make radios and phones not work well, just like how storms affect TV signals!",
        vocabulary: [
          {
            word: "Radio signal",
            meaning:
              "Invisible messages that travel through the air",
          },
          {
            word: "Communication",
            meaning:
              "Talking or sending messages to other people",
          },
          {
            word: "Signal",
            meaning: "A message sent from one place to another",
          },
        ],
      },
    },
  ];

  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        success: 880,
        click: 440,
        wrong: 220,
        coin: 660,
        win: 1100,
        powerup: 1320,
        celebrate: 1760,
        explosion: 150,
        laser: 800,
        shield: 600,
        warning: 300,
      };

      oscillator.frequency.value =
        frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(
        0.03,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.3,
      );
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (
      gameState.isActive &&
      gameState.timeLeft > 0 &&
      !gameState.isCompleted
    ) {
      interval = setInterval(() => {
        setGameState((prev) => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            playSound("wrong");
            return {
              ...prev,
              timeLeft: 0,
              isActive: false,
              isCompleted: true,
            };
          }
          if (newTimeLeft <= 10) {
            playSound("warning");
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    gameState.isActive,
    gameState.timeLeft,
    gameState.isCompleted,
  ]);

  // Earth Protector Game Logic
  const initializeEarthProtector = useCallback(() => {
    gameObjectsRef.current = [
      {
        id: "earth",
        x: 400,
        y: 300,
        vx: 0,
        vy: 0,
        size: 50,
        type: "earth",
        health: 100,
      },
    ];

    // Add friendly and harmful particles
    for (let i = 0; i < 8; i++) {
      gameObjectsRef.current.push({
        id: `good_particle_${i}`,
        x: Math.random() * 800,
        y: -50,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1,
        size: Math.random() * 10 + 8,
        type: "good_particle",
        color: "blue",
      });
    }

    for (let i = 0; i < 5; i++) {
      gameObjectsRef.current.push({
        id: `bad_particle_${i}`,
        x: Math.random() * 800,
        y: -50,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 12 + 10,
        type: "bad_particle",
        color: "red",
      });
    }
  }, []);

  const updateEarthProtector = useCallback(
    (deltaTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const objects = gameObjectsRef.current;
      const earth = objects.find((obj) => obj.type === "earth");
      if (!earth) return;

      // Update particle positions
      objects.forEach((obj) => {
        if (
          obj.type === "good_particle" ||
          obj.type === "bad_particle"
        ) {
          obj.x += obj.vx * deltaTime * 60;
          obj.y += obj.vy * deltaTime * 60;

          // Check collision with Earth
          const dx = obj.x - earth.x;
          const dy = obj.y - earth.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (
            distance < earth.size + obj.size &&
            !obj.protected
          ) {
            if (obj.type === "good_particle") {
              playSound("coin");
              setGameState((prev) => ({
                ...prev,
                score: prev.score + 10,
              }));
            } else {
              playSound("explosion");
              setGameState((prev) => ({
                ...prev,
                lives: Math.max(0, prev.lives - 1),
                score: Math.max(0, prev.score - 5),
              }));
            }

            // Remove particle
            const index = objects.indexOf(obj);
            objects.splice(index, 1);
          }

          // Remove particles that go off screen
          if (
            obj.y > canvas.height + 50 ||
            obj.x < -50 ||
            obj.x > canvas.width + 50
          ) {
            const index = objects.indexOf(obj);
            objects.splice(index, 1);
          }
        }

        if (obj.type === "shield") {
          obj.size -= deltaTime * 20; // Shields decay
          if (obj.size <= 0) {
            const index = objects.indexOf(obj);
            objects.splice(index, 1);
          }
        }
      });

      // Add new particles periodically
      if (Math.random() < 0.03) {
        const isGood = Math.random() < 0.6; // 60% chance of good particles
        objects.push({
          id: `${isGood ? "good" : "bad"}_particle_${Date.now()}`,
          x: Math.random() * canvas.width,
          y: -50,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 3 + 1,
          size: Math.random() * 12 + 8,
          type: isGood ? "good_particle" : "bad_particle",
          color: isGood ? "blue" : "red",
        });
      }

      // Update score for survival
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 1,
      }));

      // Check win condition
      if (gameState.score > 500) {
        endGame(true);
      }

      // Check lose condition
      if (gameState.lives <= 0) {
        endGame(false);
      }
    },
    [gameState.score, gameState.lives],
  );

  const renderEarthProtector = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with space background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, "#0f0f2e");
    gradient.addColorStop(0.5, "#1a1a4e");
    gradient.addColorStop(1, "#0f0f2e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw twinkling stars
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % canvas.width;
      const y = (i * 73) % canvas.height;
      const twinkle =
        Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5;
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw game objects
    gameObjectsRef.current.forEach((obj) => {
      ctx.save();
      ctx.translate(obj.x, obj.y);

      switch (obj.type) {
        case "earth":
          // Draw Earth with a happy face
          const earthGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            obj.size,
          );
          earthGradient.addColorStop(0, "#4a90e2");
          earthGradient.addColorStop(0.7, "#357abd");
          earthGradient.addColorStop(1, "#1e3a5f");
          ctx.fillStyle = earthGradient;
          ctx.beginPath();
          ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw continents
          ctx.fillStyle = "#2d5a2d";
          ctx.beginPath();
          ctx.arc(-15, -10, 12, 0, Math.PI * 2);
          ctx.arc(10, 5, 10, 0, Math.PI * 2);
          ctx.arc(-5, 20, 8, 0, Math.PI * 2);
          ctx.fill();

          // Draw happy face
          ctx.fillStyle = "#ffffff";
          // Eyes
          ctx.beginPath();
          ctx.arc(-12, -8, 3, 0, Math.PI * 2);
          ctx.arc(12, -8, 3, 0, Math.PI * 2);
          ctx.fill();

          // Smile
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 5, 15, 0.2 * Math.PI, 0.8 * Math.PI);
          ctx.stroke();

          // Draw protective magnetic field
          ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, obj.size + 15, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case "good_particle":
          // Draw friendly blue particle with sparkles
          const goodGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            obj.size,
          );
          goodGradient.addColorStop(0, "#00aaff");
          goodGradient.addColorStop(1, "#0066cc");
          ctx.fillStyle = goodGradient;
          ctx.beginPath();
          ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
          ctx.fill();

          // Add sparkles
          ctx.fillStyle = "#ffffff";
          for (let i = 0; i < 4; i++) {
            const angle =
              (i / 4) * Math.PI * 2 + Date.now() * 0.01;
            const sparkleX = Math.cos(angle) * obj.size * 1.5;
            const sparkleY = Math.sin(angle) * obj.size * 1.5;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;

        case "bad_particle":
          // Draw dangerous red particle with warning spikes
          const badGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            obj.size,
          );
          badGradient.addColorStop(0, "#ff4444");
          badGradient.addColorStop(1, "#cc0000");
          ctx.fillStyle = badGradient;
          ctx.beginPath();
          ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
          ctx.fill();

          // Add warning spikes
          ctx.strokeStyle = "#ff8888";
          ctx.lineWidth = 3;
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const spikeX = Math.cos(angle) * obj.size * 1.3;
            const spikeY = Math.sin(angle) * obj.size * 1.3;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(spikeX, spikeY);
            ctx.stroke();
          }
          break;

        case "shield":
          // Draw magical protective shield
          const shieldGradient = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            obj.size,
          );
          shieldGradient.addColorStop(
            0,
            "rgba(0, 255, 255, 0.8)",
          );
          shieldGradient.addColorStop(
            1,
            "rgba(0, 255, 255, 0.1)",
          );
          ctx.fillStyle = shieldGradient;
          ctx.beginPath();
          ctx.arc(0, 0, obj.size, 0, Math.PI * 2);
          ctx.fill();

          // Add magical sparkles around the shield
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          for (let i = 0; i < 8; i++) {
            const angle =
              (i / 8) * Math.PI * 2 + Date.now() * 0.005;
            const sparkleX = Math.cos(angle) * obj.size * 1.2;
            const sparkleY = Math.sin(angle) * obj.size * 1.2;
            ctx.beginPath();
            ctx.arc(sparkleX, sparkleY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
      }

      ctx.restore();
    });

    // Draw kid-friendly UI
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(10, 10, 250, 140);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Arial";
    ctx.fillText(`Score: ${gameState.score}`, 20, 35);
    ctx.fillText(
      `Lives: ${"❤️".repeat(gameState.lives)}`,
      20,
      60,
    );
    ctx.fillText(`Time: ${gameState.timeLeft}s`, 20, 85);
    ctx.fillText(`Level: ${gameState.level}`, 20, 110);

    // Draw instructions
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(canvas.width - 280, 10, 270, 100);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Arial";
    ctx.fillText(
      "🖱️ Move mouse to move Earth!",
      canvas.width - 270,
      35,
    );
    ctx.fillText(
      "🖱️ Click to make shields!",
      canvas.width - 270,
      55,
    );
    ctx.fillText(
      "Collect 🔵 blue particles!",
      canvas.width - 270,
      75,
    );
    ctx.fillText(
      "Avoid 🔴 red particles!",
      canvas.width - 270,
      95,
    );
  }, [gameState]);

  // Mouse movement handler for Earth
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!gameState.isActive) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const earth = gameObjectsRef.current.find(
        (obj) => obj.type === "earth",
      );
      if (earth) {
        earth.x = x;
        earth.y = y;
      }
    },
    [gameState.isActive],
  );

  // Canvas click handler for shields
  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!gameState.isActive) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Create shield at click position
      gameObjectsRef.current.push({
        id: `shield_${Date.now()}`,
        x,
        y,
        vx: 0,
        vy: 0,
        size: 40,
        type: "shield",
      });

      // Protect nearby particles
      gameObjectsRef.current.forEach((obj) => {
        if (obj.type === "bad_particle") {
          const dx = obj.x - x;
          const dy = obj.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 60) {
            obj.protected = true;
            setGameState((prev) => ({
              ...prev,
              score: prev.score + 15,
            }));
            playSound("shield");
          }
        }
      });

      playSound("laser");
    },
    [gameState.isActive],
  );

  // Game loop
  const gameLoop = useCallback(
    (currentTime: number) => {
      if (!gameState.isActive) return;

      const deltaTime =
        (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Update game based on selected game
      switch (selectedGame) {
        case "earth-protector":
          updateEarthProtector(deltaTime);
          renderEarthProtector();
          break;
        // Add other game renderers here
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    },
    [
      selectedGame,
      gameState.isActive,
      updateEarthProtector,
      renderEarthProtector,
    ],
  );

  const startGame = (gameId: string) => {
    playSound("click");
    setGameState({
      score: 0,
      level: 1,
      lives: 3,
      timeLeft: 120, // 2 minutes
      isActive: true,
      isCompleted: false,
      gameStarted: true,
      highScore: gameState.highScore,
      achievements: gameState.achievements,
    });

    // Initialize game based on type
    switch (gameId) {
      case "earth-protector":
        initializeEarthProtector();
        break;
      // Add other game initializers here
    }

    // Start game loop
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  const endGame = (won: boolean) => {
    setGameState((prev) => ({
      ...prev,
      isActive: false,
      isCompleted: true,
      highScore: Math.max(prev.highScore, prev.score),
    }));

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (won) {
      playSound("win");
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
      setPlayerStats((prev) => ({
        ...prev,
        cosmicCoins:
          prev.cosmicCoins + (50 + gameState.level * 15),
        gamesWon: prev.gamesWon + 1,
      }));
    } else {
      playSound("wrong");
    }
  };

  const resetGame = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setGameState((prev) => ({
      score: 0,
      level: 1,
      lives: 3,
      timeLeft: 120,
      isActive: false,
      isCompleted: false,
      gameStarted: false,
      highScore: prev.highScore,
      achievements: prev.achievements,
    }));

    gameObjectsRef.current = [];
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const renderGamePlayer = () => {
    const game = kidFriendlyGames.find(
      (g) => g.id === selectedGame,
    );
    if (!game) return null;

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
              resetGame();
              setSelectedGame(null);
            }}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Games
          </Button>

          <div className="text-center flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {game.title}
            </h2>
            <p className="text-cyan-200">{game.gameType}</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 md:px-4 py-2">
              Score: {gameState.score}
            </Badge>
            <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 md:px-4 py-2">
              Lives: {gameState.lives}
            </Badge>
            <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 md:px-4 py-2">
              Time: {gameState.timeLeft}s
            </Badge>
          </div>
        </motion.div>

        {/* Game Canvas */}
        <motion.div
          className="bg-black rounded-3xl p-4 shadow-2xl border-4 border-cyan-400/30 mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
            className="w-full h-auto rounded-2xl cursor-crosshair border-2 border-white/20"
            style={{ maxHeight: "400px" }}
          />
        </motion.div>

        {/* Game Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Gamepad2 className="w-6 h-6" />
                How to Play
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-sm">
                {game.kidFriendlyInfo.howToPlay}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-2 border-cyan-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                What You Learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white text-sm">
                {game.kidFriendlyInfo.whatYouLearn}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-white text-sm">
                <div>High Score: {gameState.highScore}</div>
                <div>Level: {gameState.level}</div>
                <div>Games Won: {playerStats.gamesWon}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Actions */}
        <div className="flex justify-center gap-4 flex-wrap">
          {!gameState.isActive && !gameState.gameStarted && (
            <Button
              onClick={() => startGame(selectedGame!)}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 md:px-8 py-4 text-lg md:text-xl rounded-2xl"
            >
              <Play className="w-5 md:w-6 h-5 md:h-6 mr-2" />
              Start Game
            </Button>
          )}

          {gameState.isActive && (
            <Button
              onClick={() =>
                setGameState((prev) => ({
                  ...prev,
                  isActive: !prev.isActive,
                }))
              }
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 md:px-8 py-4 text-lg md:text-xl rounded-2xl"
            >
              {gameState.isActive ? (
                <Pause className="w-5 md:w-6 h-5 md:h-6 mr-2" />
              ) : (
                <Play className="w-5 md:w-6 h-5 md:h-6 mr-2" />
              )}
              {gameState.isActive ? "Pause" : "Resume"}
            </Button>
          )}

          {(gameState.isCompleted || gameState.gameStarted) && (
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 md:px-8 py-4 text-lg md:text-xl rounded-2xl"
            >
              <RotateCcw className="w-5 md:w-6 h-5 md:h-6 mr-2" />
              Play Again
            </Button>
          )}

          <Button
            onClick={() => setShowInstructions(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 md:px-8 py-4 text-lg md:text-xl rounded-2xl"
          >
            <HelpCircle className="w-5 md:w-6 h-5 md:h-6 mr-2" />
            Help
          </Button>
        </div>

        {/* Instructions Modal */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowInstructions(false)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 md:p-8 max-w-2xl w-full border-4 border-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <HelpCircle className="w-8 h-8" />
                    How to Play {game.title}
                  </h3>
                  <Button
                    onClick={() => setShowInstructions(false)}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <h4 className="text-xl font-bold text-yellow-300 mb-2">
                      What You Do:
                    </h4>
                    <p className="text-white text-base md:text-lg">
                      {game.kidFriendlyInfo.whatYouDo}
                    </p>
                  </div>

                  <div className="bg-white/20 rounded-2xl p-4">
                    <h4 className="text-xl font-bold text-green-300 mb-2">
                      How to Play:
                    </h4>
                    <p className="text-white text-base md:text-lg">
                      {game.kidFriendlyInfo.howToPlay}
                    </p>
                  </div>

                  <div className="bg-white/20 rounded-2xl p-4">
                    <h4 className="text-xl font-bold text-purple-300 mb-2">
                      Controls:
                    </h4>
                    <p className="text-white text-base md:text-lg">
                      {game.controls}
                    </p>
                  </div>

                  <div className="bg-white/20 rounded-2xl p-4">
                    <h4 className="text-xl font-bold text-cyan-300 mb-2">
                      Word Helper:
                    </h4>
                    <div className="space-y-2">
                      {game.kidFriendlyInfo.vocabulary.map(
                        (vocab, index) => (
                          <div
                            key={index}
                            className="text-white"
                          >
                            <strong className="text-yellow-300">
                              {vocab.word}:
                            </strong>{" "}
                            {vocab.meaning}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    onClick={() => setShowInstructions(false)}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-8 py-3 text-xl rounded-2xl"
                  >
                    Got it! Let's Play! 🚀
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-cyan-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
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
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl md:text-8xl mb-6"
                >
                  🏆
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Amazing Job!
                </h3>
                <p className="text-white text-lg md:text-xl mb-6">
                  You're a space weather hero! You earned{" "}
                  {gameState.score} points!
                </p>
                <div className="flex justify-center gap-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 360],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
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

  const renderGameSelection = () => (
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
            🎮 Fun Space Weather Games
          </h1>
          <p className="text-lg md:text-xl text-cyan-200">
            Play super fun games and learn about space weather!
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 md:px-4 py-2 text-base md:text-lg">
            Coins: {playerStats.cosmicCoins}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 md:px-4 py-2 text-base md:text-lg">
            Won: {playerStats.gamesWon}
          </Badge>
        </div>
      </motion.div>

      {/* Player Stats */}
      <motion.div
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 mb-8 border-2 border-purple-400/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h3 className="text-2xl font-bold text-white">
            Your Gaming Adventure
          </h3>
          <Crown className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">
              {playerStats.cosmicCoins}
            </div>
            <div className="text-purple-200">Cosmic Coins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400">
              {playerStats.gamesWon}
            </div>
            <div className="text-green-200">Games Won</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400">
              {playerStats.totalPlayTime}
            </div>
            <div className="text-blue-200">Play Time</div>
          </div>
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-cyan-400">
              {playerStats.favoriteGame}
            </div>
            <div className="text-cyan-200">Favorite Game</div>
          </div>
        </div>
      </motion.div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {kidFriendlyGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30, rotateY: 15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              rotateY: 3,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.97 }}
          >
            <Card
              className={`bg-gradient-to-br ${game.gradient} border-2 border-white/30 shadow-2xl cursor-pointer h-full overflow-hidden`}
            >
              <CardHeader className="text-center relative">
                {/* Floating particles effect */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-white/60"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${30 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  className="text-6xl md:text-8xl mb-4 relative z-10"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  {game.icon}
                </motion.div>

                <CardTitle className="text-xl md:text-2xl text-white mb-3 relative z-10">
                  {game.title}
                </CardTitle>

                <div className="flex items-center justify-center gap-2 mb-4 relative z-10 flex-wrap">
                  <Badge
                    className={`${game.difficultyColor} text-white text-sm`}
                  >
                    {game.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white text-sm">
                    <Trophy className="w-4 h-4 mr-1" />
                    {game.points} pts
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative z-10">
                <p className="text-white text-base md:text-lg leading-relaxed">
                  {game.description}
                </p>

                {/* What You'll Learn */}
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <h4 className="text-cyan-300 font-bold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    What You'll Learn
                  </h4>
                  <p className="text-cyan-100 text-sm md:text-base">
                    {game.kidFriendlyInfo.whatYouLearn}
                  </p>
                </div>

                {/* Game Type */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold flex items-center gap-2 text-sm md:text-base">
                      <Gamepad2 className="w-5 h-5" />
                      {game.gameType}
                    </span>
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-300 font-bold">
                        +{game.points}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vocabulary Preview */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <p className="text-white text-sm">
                    <BookOpen className="w-4 h-4 inline mr-2" />
                    Learn{" "}
                    {game.kidFriendlyInfo.vocabulary.length} new
                    words while playing!
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setSelectedGame(game.id);
                    playSound("click");
                  }}
                  className="w-full bg-white/20 hover:bg-white/30 text-white text-base md:text-xl py-4 md:py-6 rounded-2xl border-2 border-white/50 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                  <Play className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Let's Play!
                  <Rocket className="w-5 h-5 md:w-6 md:h-6 ml-2" />
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
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Gaming Tips for Young Heroes! 🌟
          </h3>
          <p className="text-gray-300 text-base md:text-lg">
            All games teach real space science in super fun
            ways!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Gamepad2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-200 font-semibold">
              Play & Learn
            </p>
            <p className="text-blue-100 text-sm mt-1">
              Have fun while learning about space!
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Lightbulb className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-200 font-semibold">
              New Words
            </p>
            <p className="text-yellow-100 text-sm mt-1">
              Learn cool space science words!
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Trophy className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-200 font-semibold">
              Earn Rewards
            </p>
            <p className="text-green-100 text-sm mt-1">
              Get points and cosmic coins!
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-pink-200 font-semibold">
              Have Fun
            </p>
            <p className="text-pink-100 text-sm mt-1">
              Most importantly, enjoy playing!
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (selectedGame) {
    return renderGamePlayer();
  }

  return renderGameSelection();
}