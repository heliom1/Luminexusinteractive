import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Palette,
  ChevronLeft,
  Download,
  RotateCcw,
  Save,
  BookOpen,
  Map,
  Sparkles,
  Sun,
  Globe,
  Rocket,
  Zap,
  Calendar,
  Plus,
  Trash2,
  Home,
  Undo,
  Settings,
  Image as ImageIcon,
  Paintbrush,
  MapPin,
  Clock,
  Star,
  Eye,
  Camera,
  Navigation,
  Activity,
  Target,
  Waves,
  Wind,
  Play,
  Pause,
  Volume2,
  Gauge,
  Atom,
  Layers,
  MousePointer,
  Move,
  Beaker,
  Microscope,
  FlaskConical,
  TestTube,
  Compass,
  Telescope,
  Lightbulb,
  Cpu,
  Database,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Zap as Lightning,
  CloudRain,
  Thermometer,
  Orbit,
  Radar,
  Signal,
  Radio,
  Award,
  Check,
  CheckCircle,
  Timer,
  Monitor,
  Power,
  CircuitBoard,
  Sliders,
  Shield,
  Wifi,
  Satellite,
  Brain,
  Heart,
  Crown,
  Trophy,
  Coins,
  Gift,
  PartyPopper,
  Smile,
  Wand2,
  Crosshair,
  MousePointer2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Search,
  Filter,
  RefreshCw,
  Info,
  HelpCircle,
  BookmarkPlus,
  Share,
  Users,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";

interface SpaceLabProps {
  playerName: string;
  onBack: () => void;
}

interface LabTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category:
    | "observation"
    | "simulation"
    | "data"
    | "creation"
    | "experiment";
  isActive: boolean;
  complexity: "Simple" | "Medium" | "Advanced";
  gradient: string;
  points: number;
  funFactor: number;
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  icon: string;
  category:
    | "aurora"
    | "solar"
    | "magnetosphere"
    | "simulation"
    | "prediction";
  difficulty: "Easy" | "Medium" | "Advanced";
  completed: boolean;
  points: number;
  timeEstimate: string;
}

export default function SpaceLab({
  playerName,
  onBack,
}: SpaceLabProps) {
  const [selectedTool, setSelectedTool] = useState<
    string | null
  >(null);
  const [selectedExperiment, setSelectedExperiment] = useState<
    string | null
  >(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userProgress, setUserProgress] = useState({
    experimentsCompleted: 12,
    discoveryPoints: 850,
    labLevel: 15,
    badges: [
      "Aurora Artist",
      "Solar Explorer",
      "Data Scientist",
      "Space Engineer",
      "Cosmic Researcher",
    ],
    totalTime: "24h 30m",
    favoriteTools: [
      "Aurora Artist Studio",
      "Space Weather Dashboard",
      "Solar System Explorer",
    ],
  });

  const playSound = (type: string) => {
    console.log(`🔊 Playing sound: ${type}`);
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        success: 800,
        click: 400,
        discovery: 1000,
        experiment: 600,
        celebrate: 1200,
        unlock: 900,
      };

      oscillator.frequency.value =
        frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(
        0.05,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  const experiments: Experiment[] = [
    {
      id: "aurora-particle-dance",
      title: "🌈 Aurora Particle Dance Simulator",
      description:
        "Watch how solar particles create beautiful dancing auroras in Earth's atmosphere!",
      icon: "🌟",
      category: "aurora",
      difficulty: "Easy",
      completed: false,
      points: 150,
      timeEstimate: "10 minutes",
    },
    {
      id: "solar-storm-impact-lab",
      title: "⚡ Solar Storm Impact Laboratory",
      description:
        "Create virtual solar storms and see how they affect Earth's technology!",
      icon: "🌪️",
      category: "solar",
      difficulty: "Medium",
      completed: true,
      points: 200,
      timeEstimate: "15 minutes",
    },
    {
      id: "magnetosphere-shield-test",
      title: "🛡️ Earth's Magnetic Shield Tester",
      description:
        "Experiment with Earth's magnetic field and see how it protects us!",
      icon: "🧲",
      category: "magnetosphere",
      difficulty: "Easy",
      completed: false,
      points: 175,
      timeEstimate: "12 minutes",
    },
    {
      id: "satellite-protection-sim",
      title: "🛰️ Satellite Protection Simulator",
      description:
        "Design shields for satellites and test them against space weather!",
      icon: "🚀",
      category: "simulation",
      difficulty: "Advanced",
      completed: false,
      points: 300,
      timeEstimate: "20 minutes",
    },
    {
      id: "space-weather-predictor",
      title: "🔮 Space Weather Crystal Ball",
      description:
        "Use AI to predict future space weather events and save the world!",
      icon: "🌐",
      category: "prediction",
      difficulty: "Advanced",
      completed: false,
      points: 350,
      timeEstimate: "25 minutes",
    },
    {
      id: "cosmic-ray-detector",
      title: "☄️ Cosmic Ray Detection Station",
      description:
        "Hunt for cosmic rays and discover particles from deep space!",
      icon: "🔬",
      category: "simulation",
      difficulty: "Medium",
      completed: true,
      points: 250,
      timeEstimate: "18 minutes",
    },
  ];

  const labTools: LabTool[] = [
    {
      id: "aurora-artist-studio",
      name: "🎨 Aurora Artist Studio Deluxe",
      description:
        "Create stunning aurora masterpieces with advanced painting tools and magical effects!",
      icon: "🌈",
      category: "creation",
      isActive: true,
      complexity: "Simple",
      gradient: "from-green-400 via-blue-500 to-purple-600",
      points: 200,
      funFactor: 95,
    },
    {
      id: "space-weather-command-center",
      name: "📊 Space Weather Command Center",
      description:
        "Monitor real-time space weather data like a NASA scientist with interactive dashboards!",
      icon: "🎯",
      category: "observation",
      isActive: true,
      complexity: "Medium",
      gradient: "from-blue-400 via-cyan-500 to-teal-600",
      points: 250,
      funFactor: 90,
    },
    {
      id: "solar-system-explorer-3d",
      name: "🌌 3D Solar System Explorer",
      description:
        "Take an incredible journey through our solar system and discover space weather everywhere!",
      icon: "🪐",
      category: "simulation",
      isActive: true,
      complexity: "Simple",
      gradient: "from-purple-400 via-pink-500 to-red-600",
      points: 300,
      funFactor: 98,
    },
    {
      id: "magnetic-field-playground",
      name: "🧲 Magnetic Field Playground",
      description:
        "Play with Earth's magnetic field using interactive 3D visualizations and simulations!",
      icon: "⚡",
      category: "experiment",
      isActive: true,
      complexity: "Medium",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      points: 275,
      funFactor: 92,
    },
    {
      id: "satellite-mission-control",
      name: "🛰️ Satellite Mission Control Center",
      description:
        "Control real satellites and protect them from space weather like a space engineer!",
      icon: "📡",
      category: "simulation",
      isActive: true,
      complexity: "Advanced",
      gradient: "from-gray-400 via-blue-500 to-purple-600",
      points: 350,
      funFactor: 88,
    },
    {
      id: "space-data-detective",
      name: "🔍 Space Data Detective",
      description:
        "Analyze mysterious space weather data and make groundbreaking discoveries!",
      icon: "🕵️",
      category: "data",
      isActive: true,
      complexity: "Medium",
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      points: 225,
      funFactor: 85,
    },
    {
      id: "aurora-forecast-center",
      name: "🔮 Aurora Forecast Wizard",
      description:
        "Predict when and where beautiful auroras will appear using advanced AI!",
      icon: "🧙‍♂️",
      category: "data",
      isActive: true,
      complexity: "Advanced",
      gradient: "from-pink-400 via-purple-500 to-indigo-600",
      points: 400,
      funFactor: 94,
    },
    {
      id: "cosmic-telescope",
      name: "🔭 Super Cosmic Telescope",
      description:
        "Observe the Sun and space weather phenomena with our magical space telescope!",
      icon: "👁️",
      category: "observation",
      isActive: true,
      complexity: "Simple",
      gradient: "from-indigo-400 via-blue-500 to-cyan-600",
      points: 180,
      funFactor: 89,
    },
  ];

  // ENHANCED AURORA ARTIST STUDIO - More Interactive!
  const AuroraArtistStudioDeluxe = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentColor, setCurrentColor] = useState("#00ff88");
    const [brushSize, setBrushSize] = useState(20);
    const [isDrawing, setIsDrawing] = useState(false);
    const [artworkSaved, setArtworkSaved] = useState(false);
    const [selectedEffect, setSelectedEffect] =
      useState("glow");
    const [animationSpeed, setAnimationSpeed] = useState(1);
    const [showGrid, setShowGrid] = useState(false);
    const [layers, setLayers] = useState([]);

    const auroraColors = [
      "#00ff88",
      "#88ff00",
      "#ff0088",
      "#0088ff",
      "#ff8800",
      "#8800ff",
      "#00ffff",
      "#ff00ff",
      "#ffff00",
      "#ff4444",
      "#44ff44",
      "#4444ff",
      "#ff8888",
      "#88ff88",
      "#8888ff",
      "#ffff88",
    ];

    const effects = [
      { id: "glow", name: "✨ Magical Glow", icon: "🌟" },
      { id: "sparkle", name: "⭐ Sparkle Trail", icon: "✨" },
      { id: "wave", name: "🌊 Wave Pattern", icon: "〰️" },
      { id: "burst", name: "💥 Star Burst", icon: "💫" },
      { id: "flow", name: "🌈 Color Flow", icon: "🎨" },
      { id: "dance", name: "💃 Dancing Lights", icon: "🕺" },
    ];

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 800;
      canvas.height = 500;

      // Create absolutely stunning night sky background
      const gradient = ctx.createRadialGradient(
        400,
        100,
        0,
        400,
        250,
        500,
      );
      gradient.addColorStop(0, "#001122");
      gradient.addColorStop(0.3, "#000D1A");
      gradient.addColorStop(0.6, "#000611");
      gradient.addColorStop(1, "#000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add constellation patterns
      ctx.fillStyle = "white";
      const constellations = [
        // Big Dipper
        [
          [100, 80],
          [120, 85],
          [140, 82],
          [160, 78],
          [180, 85],
          [200, 90],
          [220, 88],
        ],
        // Orion's Belt
        [
          [300, 120],
          [320, 122],
          [340, 120],
        ],
        // Cassiopeia
        [
          [500, 60],
          [520, 65],
          [540, 62],
          [560, 68],
          [580, 64],
        ],
      ];

      constellations.forEach((constellation) => {
        constellation.forEach(([x, y], index) => {
          // Draw star
          ctx.beginPath();
          ctx.arc(x, y, 2 + Math.random(), 0, Math.PI * 2);
          ctx.fill();

          // Connect to next star with faint line
          if (index < constellation.length - 1) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
              constellation[index + 1][0],
              constellation[index + 1][1],
            );
            ctx.stroke();
          }
        });
      });

      // Add thousands of twinkling stars
      ctx.fillStyle = "white";
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        const size = Math.random() * 3 + 0.5;
        const brightness = Math.random();

        ctx.globalAlpha = brightness;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        // Add twinkle effect to brightest stars
        if (brightness > 0.8) {
          ctx.fillStyle = [
            "#ffff88",
            "#88ffff",
            "#ff88ff",
            "#88ff88",
          ][Math.floor(Math.random() * 4)];
          ctx.beginPath();
          ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "white";
        }
      }
      ctx.globalAlpha = 1;

      // Add detailed mountain silhouette with multiple layers
      const mountainLayers = [
        { height: 120, color: "#000000" },
        { height: 100, color: "#111111" },
        { height: 80, color: "#222222" },
      ];

      mountainLayers.forEach((layer, layerIndex) => {
        ctx.fillStyle = layer.color;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 30) {
          const y =
            canvas.height -
            Math.random() * layer.height -
            60 -
            layerIndex * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      });

      // Add grid if enabled
      if (showGrid) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }
    }, [showGrid]);

    const startDrawing = (e: React.MouseEvent) => {
      setIsDrawing(true);
      draw(e);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    const draw = (e: React.MouseEvent) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = "source-over";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Enhanced aurora effects based on selected effect
      switch (selectedEffect) {
        case "glow":
          ctx.lineWidth = brushSize;
          ctx.shadowBlur = 50;
          ctx.shadowColor = currentColor;
          ctx.strokeStyle = currentColor;
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x, y);
          break;

        case "sparkle":
          for (let i = 0; i < 8; i++) {
            const sparkleX =
              x + (Math.random() - 0.5) * brushSize * 3;
            const sparkleY =
              y + (Math.random() - 0.5) * brushSize * 3;
            const sparkleSize = Math.random() * 8 + 2;

            ctx.fillStyle = currentColor;
            ctx.shadowBlur = 30;
            ctx.shadowColor = currentColor;
            ctx.beginPath();
            ctx.arc(
              sparkleX,
              sparkleY,
              sparkleSize,
              0,
              Math.PI * 2,
            );
            ctx.fill();

            // Add cross sparkle
            ctx.lineWidth = 2;
            ctx.strokeStyle = currentColor;
            ctx.beginPath();
            ctx.moveTo(sparkleX - sparkleSize, sparkleY);
            ctx.lineTo(sparkleX + sparkleSize, sparkleY);
            ctx.moveTo(sparkleX, sparkleY - sparkleSize);
            ctx.lineTo(sparkleX, sparkleY + sparkleSize);
            ctx.stroke();
          }
          break;

        case "wave":
          const time = Date.now() * 0.001 * animationSpeed;
          for (let i = 0; i < 5; i++) {
            const waveX = x + Math.sin(time + i * 0.5) * 30;
            const waveY = y + Math.cos(time + i * 0.7) * 20;

            ctx.lineWidth = brushSize / 5;
            ctx.shadowBlur = 25;
            ctx.shadowColor = currentColor;
            ctx.strokeStyle = currentColor;
            ctx.beginPath();
            ctx.arc(
              waveX,
              waveY,
              brushSize / 4,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          break;

        case "burst":
          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const length =
              brushSize *
              (1 + Math.sin(Date.now() * 0.01 + i) * 0.5);
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;

            ctx.lineWidth = 4;
            ctx.shadowBlur = 30;
            ctx.shadowColor = currentColor;
            ctx.strokeStyle = currentColor;

            const gradient = ctx.createLinearGradient(
              x,
              y,
              endX,
              endY,
            );
            gradient.addColorStop(0, currentColor);
            gradient.addColorStop(1, "transparent");
            ctx.strokeStyle = gradient;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
          break;

        case "flow":
          const flowColors = [
            currentColor,
            "#ffffff",
            currentColor,
          ];
          flowColors.forEach((color, index) => {
            ctx.lineWidth = brushSize - index * 5;
            ctx.shadowBlur = 40 - index * 10;
            ctx.shadowColor = color;
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.7;

            ctx.lineTo(x + index * 2, y + index * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + index * 2, y + index * 2);
          });
          ctx.globalAlpha = 1;
          break;

        case "dance":
          const danceTime = Date.now() * 0.005 * animationSpeed;
          for (let i = 0; i < 6; i++) {
            const danceX = x + Math.sin(danceTime + i) * 40;
            const danceY =
              y + Math.cos(danceTime + i * 1.5) * 30;

            ctx.shadowBlur = 35;
            ctx.shadowColor = currentColor;
            ctx.fillStyle = currentColor;
            ctx.globalAlpha = 0.8;

            ctx.beginPath();
            ctx.arc(
              danceX,
              danceY,
              brushSize / 3,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          break;
      }

      playSound("click");

      // Add points for creativity
      setUserProgress((prev) => ({
        ...prev,
        discoveryPoints: prev.discoveryPoints + 2,
      }));
    };

    const saveArtwork = () => {
      playSound("celebrate");
      setArtworkSaved(true);
      setShowCelebration(true);
      setTimeout(() => {
        setArtworkSaved(false);
        setShowCelebration(false);
      }, 4000);

      setUserProgress((prev) => ({
        ...prev,
        discoveryPoints: prev.discoveryPoints + 150,
        experimentsCompleted: prev.experimentsCompleted + 1,
      }));
    };

    const clearCanvas = () => {
      // Redraw the beautiful background
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Trigger the background redraw
      const event = new Event("clearCanvas");
      canvas.dispatchEvent(event);

      // Re-run the background drawing code
      setTimeout(() => {
        const gradient = ctx.createRadialGradient(
          400,
          100,
          0,
          400,
          250,
          500,
        );
        gradient.addColorStop(0, "#001122");
        gradient.addColorStop(0.3, "#000D1A");
        gradient.addColorStop(0.6, "#000611");
        gradient.addColorStop(1, "#000000");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }, 100);
    };

    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🎨</span>
            Aurora Artist Studio Deluxe
            <span className="text-5xl">🌈</span>
          </h3>
          <p className="text-cyan-200 text-xl font-semibold">
            Create magical aurora masterpieces with advanced
            tools and special effects! ✨🎭
          </p>
        </motion.div>

        {/* Enhanced Color Palette */}
        <motion.div
          className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-lg rounded-3xl p-6 border-4 border-purple-400/50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-center text-white font-bold text-2xl mb-6 flex items-center justify-center gap-2">
            <Palette className="w-8 h-8" />
            🌈 Cosmic Color Palette 🎨
          </h4>
          <div className="grid grid-cols-8 gap-4 justify-center">
            {auroraColors.map((color, index) => (
              <motion.button
                key={color}
                className={`w-16 h-16 rounded-full border-4 shadow-2xl relative overflow-hidden ${
                  currentColor === color
                    ? "border-white scale-125"
                    : "border-white/50"
                }`}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 40px ${color}70`,
                }}
                onClick={() => {
                  setCurrentColor(color);
                  playSound("click");
                }}
                whileHover={{ scale: 1.3, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {currentColor === color && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-white"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Tool Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brush Settings */}
          <motion.div
            className="bg-gradient-to-br from-blue-600/30 to-cyan-600/30 backdrop-blur-lg rounded-3xl p-6 border-4 border-blue-400/50"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              <Paintbrush className="w-6 h-6" />
              🖌️ Brush Settings
            </h4>
            <div className="space-y-4">
              <div>
                <label className="text-white font-semibold text-lg mb-2 block">
                  Size: {brushSize}px
                </label>
                <input
                  type="range"
                  min="5"
                  max="80"
                  value={brushSize}
                  onChange={(e) =>
                    setBrushSize(Number(e.target.value))
                  }
                  className="w-full h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-white font-semibold text-lg mb-2 block">
                  Animation Speed: {animationSpeed}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) =>
                    setAnimationSpeed(Number(e.target.value))
                  }
                  className="w-full h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </motion.div>

          {/* Special Effects */}
          <motion.div
            className="bg-gradient-to-br from-pink-600/30 to-purple-600/30 backdrop-blur-lg rounded-3xl p-6 border-4 border-pink-400/50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              <Wand2 className="w-6 h-6" />✨ Magic Effects
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {effects.map((effect) => (
                <Button
                  key={effect.id}
                  onClick={() => {
                    setSelectedEffect(effect.id);
                    playSound("click");
                  }}
                  className={`${
                    selectedEffect === effect.id
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-105"
                      : "bg-gradient-to-r from-gray-600 to-gray-700"
                  } text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all duration-300 border-2 border-white/30`}
                >
                  <span className="text-lg mr-1">
                    {effect.icon}
                  </span>
                  {effect.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Canvas Options */}
          <motion.div
            className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 backdrop-blur-lg rounded-3xl p-6 border-4 border-green-400/50"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
              <Settings className="w-6 h-6" />
              🎛️ Canvas Tools
            </h4>
            <div className="space-y-4">
              <Button
                onClick={() => {
                  setShowGrid(!showGrid);
                  playSound("click");
                }}
                className={`w-full ${
                  showGrid
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-gray-600 to-gray-700"
                } text-white font-bold py-3 rounded-2xl border-2 border-white/30`}
              >
                <Target className="w-5 h-5 mr-2" />
                {showGrid ? "🟢 Hide Grid" : "⚪ Show Grid"}
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => playSound("click")}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-2xl border-2 border-white/30"
                >
                  <Undo className="w-4 h-4 mr-1" />
                  Undo
                </Button>
                <Button
                  onClick={() => playSound("click")}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 rounded-2xl border-2 border-white/30"
                >
                  <RotateCw className="w-4 h-4 mr-1" />
                  Redo
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Drawing Canvas */}
        <motion.div
          className="relative mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <div className="relative bg-black rounded-3xl p-4 border-4 border-white/50 shadow-2xl">
            <canvas
              ref={canvasRef}
              className="w-full max-w-5xl mx-auto h-96 rounded-2xl cursor-crosshair bg-black"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
            />

            {/* Canvas Overlay Info */}
            <div className="absolute top-6 left-6 bg-black/70 rounded-2xl px-4 py-2 border-2 border-cyan-400/50">
              <p className="text-cyan-300 font-bold text-sm">
                🎨 Effect:{" "}
                {
                  effects.find((e) => e.id === selectedEffect)
                    ?.name
                }{" "}
                | 🖌️ Size: {brushSize}px | ⚡ Speed:{" "}
                {animationSpeed}x
              </p>
            </div>

            {/* Points Display */}
            <div className="absolute top-6 right-6 bg-black/70 rounded-2xl px-4 py-2 border-2 border-yellow-400/50">
              <p className="text-yellow-300 font-bold text-sm">
                ⭐ Discovery Points:{" "}
                {userProgress.discoveryPoints}
              </p>
            </div>
          </div>

          {artworkSaved && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-10 rounded-3xl text-center border-4 border-white shadow-2xl">
                <motion.div
                  className="text-8xl mb-4"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2 }}
                >
                  🎨
                </motion.div>
                <div className="text-4xl font-bold mb-4">
                  Masterpiece Created!
                </div>
                <div className="text-xl">
                  +150 Discovery Points Earned!
                </div>
                <div className="text-lg text-green-200 mt-2">
                  Your aurora art has been saved to the gallery!
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={clearCanvas}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl border-4 border-red-400/50 text-lg"
          >
            <RotateCcw className="w-6 h-6 mr-3" />
            🌌 Clear Night Sky
          </Button>
          <Button
            onClick={saveArtwork}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl border-4 border-green-400/50 text-lg"
          >
            <Camera className="w-6 h-6 mr-3" />
            📸 Save Aurora Masterpiece (+150 pts)
          </Button>
          <Button
            onClick={() => playSound("click")}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl border-4 border-purple-400/50 text-lg"
          >
            <Share className="w-6 h-6 mr-3" />
            🌍 Share With Friends
          </Button>
        </motion.div>

        {/* Enhanced Instructions */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-lg rounded-3xl p-8 border-4 border-indigo-400/50"
          animate={{
            boxShadow: [
              "0 0 30px rgba(99, 102, 241, 0.3)",
              "0 0 50px rgba(99, 102, 241, 0.6)",
              "0 0 30px rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h3 className="text-white font-bold text-3xl mb-6 text-center flex items-center justify-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            🎨 How to Create Amazing Aurora Art! 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🌈</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Choose Your Colors
                  </h4>
                  <p className="text-cyan-200">
                    Click on the cosmic color palette to select
                    your favorite aurora colors!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">✨</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Select Magic Effects
                  </h4>
                  <p className="text-cyan-200">
                    Try different effects like sparkles, waves,
                    and dancing lights!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🖌️</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Adjust Your Brush
                  </h4>
                  <p className="text-cyan-200">
                    Change brush size and animation speed to
                    create unique patterns!
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎨</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Paint Your Aurora
                  </h4>
                  <p className="text-cyan-200">
                    Drag your mouse across the night sky to
                    paint beautiful auroras!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">📸</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Save Your Art
                  </h4>
                  <p className="text-cyan-200">
                    Save your masterpiece to earn discovery
                    points and share with friends!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🌟</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Experiment & Have Fun
                  </h4>
                  <p className="text-cyan-200">
                    Try different combinations and create your
                    own unique aurora style!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // ENHANCED SPACE WEATHER COMMAND CENTER
  const SpaceWeatherCommandCenter = () => {
    const [solarActivity, setSolarActivity] = useState(67);
    const [magneticField, setMagneticField] = useState(85);
    const [auroraChance, setAuroraChance] = useState(42);
    const [satelliteHealth, setSatelliteHealth] = useState(94);
    const [communicationStatus, setCommunicationStatus] =
      useState(87);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [alertLevel, setAlertLevel] = useState("normal");
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
      if (!isMonitoring) return;

      const interval = setInterval(() => {
        setSolarActivity((prev) => {
          const newValue = Math.max(
            0,
            Math.min(100, prev + (Math.random() - 0.5) * 15),
          );
          return newValue;
        });
        setMagneticField((prev) =>
          Math.max(
            0,
            Math.min(100, prev + (Math.random() - 0.5) * 10),
          ),
        );
        setAuroraChance((prev) =>
          Math.max(
            0,
            Math.min(100, prev + (Math.random() - 0.5) * 20),
          ),
        );
        setSatelliteHealth((prev) =>
          Math.max(
            0,
            Math.min(100, prev + (Math.random() - 0.5) * 8),
          ),
        );
        setCommunicationStatus((prev) =>
          Math.max(
            0,
            Math.min(100, prev + (Math.random() - 0.5) * 12),
          ),
        );
        setLastUpdate(new Date());
      }, 2000);

      return () => clearInterval(interval);
    }, [isMonitoring]);

    // Alert level determination effect
    useEffect(() => {
      const maxValue = Math.max(
        solarActivity,
        100 - magneticField,
        auroraChance,
      );
      if (maxValue > 85) {
        setAlertLevel("critical");
        if (isMonitoring) playSound("experiment");
      } else if (maxValue > 65) {
        setAlertLevel("warning");
      } else {
        setAlertLevel("normal");
      }
    }, [
      solarActivity,
      magneticField,
      auroraChance,
      isMonitoring,
    ]);

    const toggleMonitoring = () => {
      setIsMonitoring((prev) => !prev);
      playSound(isMonitoring ? "click" : "success");

      if (!isMonitoring) {
        setUserProgress((prev) => ({
          ...prev,
          discoveryPoints: prev.discoveryPoints + 25,
        }));
      }
    };

    const getStatusColor = (
      value: number,
      inverted = false,
    ) => {
      if (inverted) value = 100 - value;
      if (value > 80) return "from-red-500 to-red-600";
      if (value > 60) return "from-yellow-500 to-orange-500";
      if (value > 40) return "from-green-500 to-emerald-500";
      return "from-blue-500 to-cyan-500";
    };

    const getStatusText = (value: number, type: string) => {
      const level =
        value > 80
          ? "Critical"
          : value > 60
            ? "High"
            : value > 40
              ? "Moderate"
              : "Low";
      const emoji =
        value > 80
          ? "🔴"
          : value > 60
            ? "🟡"
            : value > 40
              ? "🟢"
              : "🔵";
      return `${emoji} ${level} ${type}`;
    };

    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">📊</span>
            Space Weather Command Center
            <span className="text-5xl">🌟</span>
          </h3>
          <p className="text-cyan-200 text-xl font-semibold">
            Monitor real-time space weather data like a NASA
            scientist! 🚀🔬
          </p>
        </motion.div>

        {/* Command Center Header */}
        <motion.div
          className={`text-center bg-gradient-to-r ${
            alertLevel === "critical"
              ? "from-red-600/40 to-red-700/40 border-red-400/60"
              : alertLevel === "warning"
                ? "from-yellow-600/40 to-orange-600/40 border-yellow-400/60"
                : "from-green-600/40 to-blue-600/40 border-green-400/60"
          } backdrop-blur-lg rounded-3xl p-6 border-4`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">
                <Radio className="w-8 h-8" />
                🛰️ Mission Control Status
              </h4>
              <p className="text-cyan-200 text-lg">
                Alert Level:{" "}
                <span className="font-bold">
                  {alertLevel.toUpperCase()}
                </span>
              </p>
            </div>
            <div className="text-right">
              <Button
                onClick={toggleMonitoring}
                className={`text-2xl font-bold py-4 px-8 rounded-2xl shadow-xl border-4 ${
                  isMonitoring
                    ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400/50"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 border-green-400/50"
                } text-white`}
              >
                {isMonitoring ? (
                  <>
                    <Pause className="w-6 h-6 mr-3" />
                    🔴 Stop Monitoring
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6 mr-3" />
                    🟢 Start Monitoring
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="mt-4 text-gray-300">
            Last Update: {lastUpdate.toLocaleTimeString()} |
            Status:{" "}
            {isMonitoring
              ? "🟢 Live Data Stream Active"
              : "🔴 Monitoring Paused"}
          </div>
        </motion.div>

        {/* Enhanced Data Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Solar Activity Monitor */}
          <motion.div
            className="bg-gradient-to-br from-yellow-500/40 to-orange-500/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-yellow-400/50 shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  rotate: 360,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: { duration: 3, repeat: Infinity },
                }}
              >
                ☀️
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Sun className="w-8 h-8" />
                Solar Activity
              </h4>
              <motion.div
                className="text-6xl font-bold text-yellow-300 mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(253, 224, 71, 0.5)",
                    "0 0 40px rgba(253, 224, 71, 0.8)",
                    "0 0 20px rgba(253, 224, 71, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {solarActivity.toFixed(1)}%
              </motion.div>
              <div className="mb-4">
                <Progress
                  value={solarActivity}
                  className="h-6 bg-black/30 border-2 border-yellow-400/50"
                />
              </div>
              <motion.p
                className="text-white font-bold text-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getStatusText(solarActivity, "Solar Flux")}
              </motion.p>
              <div className="mt-4 bg-black/30 rounded-2xl p-4">
                <p className="text-yellow-200 text-sm font-semibold">
                  🌟 Current solar flare activity and
                  electromagnetic radiation levels
                </p>
              </div>
            </div>
          </motion.div>

          {/* Magnetic Field Strength */}
          <motion.div
            className="bg-gradient-to-br from-blue-500/40 to-cyan-500/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-blue-400/50 shadow-2xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🧲
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Shield className="w-8 h-8" />
                Earth's Shield
              </h4>
              <motion.div
                className="text-6xl font-bold text-cyan-300 mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 40px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {magneticField.toFixed(1)}%
              </motion.div>
              <div className="mb-4">
                <Progress
                  value={magneticField}
                  className="h-6 bg-black/30 border-2 border-cyan-400/50"
                />
              </div>
              <motion.p
                className="text-white font-bold text-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getStatusText(
                  magneticField,
                  "Magnetic Shield",
                )}
              </motion.p>
              <div className="mt-4 bg-black/30 rounded-2xl p-4">
                <p className="text-cyan-200 text-sm font-semibold">
                  🛡️ Magnetosphere strength protecting Earth
                  from solar wind
                </p>
              </div>
            </div>
          </motion.div>

          {/* Aurora Probability */}
          <motion.div
            className="bg-gradient-to-br from-green-500/40 to-purple-500/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-green-400/50 shadow-2xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.4, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌈
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8" />
                Aurora Forecast
              </h4>
              <motion.div
                className="text-6xl font-bold text-green-300 mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                    "0 0 40px rgba(34, 197, 94, 0.8)",
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {auroraChance.toFixed(1)}%
              </motion.div>
              <div className="mb-4">
                <Progress
                  value={auroraChance}
                  className="h-6 bg-black/30 border-2 border-green-400/50"
                />
              </div>
              <motion.p
                className="text-white font-bold text-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getStatusText(
                  auroraChance,
                  "Aurora Visibility",
                )}
              </motion.p>
              <div className="mt-4 bg-black/30 rounded-2xl p-4">
                <p className="text-green-200 text-sm font-semibold">
                  🌟 Probability of visible auroras in the next
                  24 hours
                </p>
              </div>
            </div>
          </motion.div>

          {/* Satellite Health */}
          <motion.div
            className="bg-gradient-to-br from-purple-500/40 to-pink-500/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-purple-400/50 shadow-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  rotate: [0, 360],
                  y: [0, -10, 0],
                }}
                transition={{
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  y: { duration: 3, repeat: Infinity },
                }}
              >
                🛰️
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Satellite className="w-8 h-8" />
                Satellite Fleet
              </h4>
              <motion.div
                className="text-6xl font-bold text-purple-300 mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                    "0 0 40px rgba(147, 51, 234, 0.8)",
                    "0 0 20px rgba(147, 51, 234, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {satelliteHealth.toFixed(1)}%
              </motion.div>
              <div className="mb-4">
                <Progress
                  value={satelliteHealth}
                  className="h-6 bg-black/30 border-2 border-purple-400/50"
                />
              </div>
              <motion.p
                className="text-white font-bold text-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getStatusText(
                  satelliteHealth,
                  "System Health",
                )}
              </motion.p>
              <div className="mt-4 bg-black/30 rounded-2xl p-4">
                <p className="text-purple-200 text-sm font-semibold">
                  🚀 Overall health status of 247 active
                  satellites
                </p>
              </div>
            </div>
          </motion.div>

          {/* Communication Status */}
          <motion.div
            className="bg-gradient-to-br from-teal-500/40 to-emerald-500/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-teal-400/50 shadow-2xl"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📡
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                <Radio className="w-8 h-8" />
                Communications
              </h4>
              <motion.div
                className="text-6xl font-bold text-teal-300 mb-6"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(20, 184, 166, 0.5)",
                    "0 0 40px rgba(20, 184, 166, 0.8)",
                    "0 0 20px rgba(20, 184, 166, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {communicationStatus.toFixed(1)}%
              </motion.div>
              <div className="mb-4">
                <Progress
                  value={communicationStatus}
                  className="h-6 bg-black/30 border-2 border-teal-400/50"
                />
              </div>
              <motion.p
                className="text-white font-bold text-xl"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getStatusText(
                  communicationStatus,
                  "Signal Quality",
                )}
              </motion.p>
              <div className="mt-4 bg-black/30 rounded-2xl p-4">
                <p className="text-teal-200 text-sm font-semibold">
                  📻 GPS, radio, and internet communication
                  stability
                </p>
              </div>
            </div>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            className="bg-gradient-to-br from-gray-600/40 to-slate-600/40 backdrop-blur-lg rounded-3xl p-8 border-4 border-gray-400/50 shadow-2xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="text-center">
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  rotateY: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                🎛️
              </motion.div>
              <h4 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                <Settings className="w-8 h-8" />
                Mission Control
              </h4>
              <div className="space-y-4">
                <Button
                  onClick={() => {
                    playSound("success");
                    setUserProgress((prev) => ({
                      ...prev,
                      discoveryPoints:
                        prev.discoveryPoints + 50,
                    }));
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-2xl border-2 border-blue-400/50"
                >
                  <Database className="w-5 h-5 mr-2" />
                  📊 Generate Report (+50 pts)
                </Button>
                <Button
                  onClick={() => playSound("click")}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl border-2 border-green-400/50"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  🔄 Refresh Data
                </Button>
                <Button
                  onClick={() => playSound("discovery")}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 rounded-2xl border-2 border-purple-400/50"
                >
                  <Share className="w-5 h-5 mr-2" />
                  🌍 Share Status
                </Button>
              </div>
              <div className="mt-6 bg-black/30 rounded-2xl p-4">
                <p className="text-gray-200 text-sm font-semibold">
                  🎯 Mission Control Dashboard - Monitoring{" "}
                  {isMonitoring ? "ACTIVE" : "STANDBY"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Alert System */}
        <motion.div
          className={`p-8 rounded-3xl border-4 text-center font-bold text-2xl shadow-2xl ${
            alertLevel === "critical"
              ? "bg-red-500/40 border-red-400 text-red-100 animate-pulse"
              : alertLevel === "warning"
                ? "bg-yellow-500/40 border-yellow-400 text-yellow-100"
                : "bg-green-500/40 border-green-400 text-green-100"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.7 }}
        >
          {alertLevel === "critical" ? (
            <>
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🚨
              </motion.div>
              ⚠️ CRITICAL SPACE WEATHER ALERT! ⚠️
              <br />
              High-intensity space weather detected! Perfect
              conditions for spectacular aurora displays!
              <br />
              <span className="text-red-200 text-lg">
                All observation teams to stations! This is not a
                drill!
              </span>
            </>
          ) : alertLevel === "warning" ? (
            <>
              <div className="text-6xl mb-4">🟡</div>
              🟡 ELEVATED SPACE WEATHER ACTIVITY 🟡
              <br />
              Moderate space weather conditions detected. Good
              opportunities for aurora watching!
              <br />
              <span className="text-yellow-200 text-lg">
                Recommended for experienced aurora hunters!
              </span>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🟢</div>
              🟢 ALL SYSTEMS NOMINAL 🟢
              <br />
              Space weather conditions are calm and stable.
              Perfect for spacecraft operations!
              <br />
              <span className="text-green-200 text-lg">
                Enjoy the peaceful cosmos! ✨
              </span>
            </>
          )}
        </motion.div>

        {/* Enhanced Instructions */}
        <motion.div
          className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-lg rounded-3xl p-8 border-4 border-indigo-400/50"
          animate={{
            boxShadow: [
              "0 0 30px rgba(99, 102, 241, 0.3)",
              "0 0 50px rgba(99, 102, 241, 0.6)",
              "0 0 30px rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <h3 className="text-white font-bold text-3xl mb-6 text-center flex items-center justify-center gap-3">
            <Brain className="w-8 h-8 text-cyan-400" />
            📊 How to Use the Command Center! 🚀
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🟢</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Start Monitoring
                  </h4>
                  <p className="text-cyan-200">
                    Click the big green button to begin live
                    data monitoring!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Watch the Data
                  </h4>
                  <p className="text-cyan-200">
                    See real-time updates of solar activity,
                    magnetic fields, and aurora chances!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🚨</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Monitor Alerts
                  </h4>
                  <p className="text-cyan-200">
                    Watch for critical alerts that indicate
                    major space weather events!
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🛰️</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Check Satellites
                  </h4>
                  <p className="text-cyan-200">
                    Monitor the health of satellites and
                    communication systems!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Generate Reports
                  </h4>
                  <p className="text-cyan-200">
                    Create detailed reports and earn discovery
                    points!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-3xl">🌟</span>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    Become an Expert
                  </h4>
                  <p className="text-cyan-200">
                    The more you monitor, the better you
                    understand space weather!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-10 text-center border-4 border-white shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360, 720],
                }}
                transition={{ duration: 3, repeat: 2 }}
                className="text-8xl mb-6"
              >
                🧪
              </motion.div>
              <h2 className="text-5xl font-bold text-white mb-4">
                Discovery Made!
              </h2>
              <p className="text-white text-2xl font-semibold">
                Amazing work in the Space Lab!
              </p>
              <p className="text-yellow-200 text-xl mt-2">
                You're becoming a true space scientist! 🚀
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          onClick={
            selectedTool ? () => setSelectedTool(null) : onBack
          }
          className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white p-4 rounded-2xl shadow-lg border-2 border-white/20"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="text-center">
          <motion.h1
            className="text-5xl font-bold text-white mb-3 flex items-center justify-center gap-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(34, 211, 238, 0.5)",
                "0 0 40px rgba(168, 85, 247, 0.5)",
                "0 0 20px rgba(34, 211, 238, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FlaskConical className="w-12 h-12 text-cyan-400" />
            {selectedTool
              ? "🧪 Experiment In Progress!"
              : "🔬 Space Science Laboratory 🌟"}
            <Microscope className="w-12 h-12 text-purple-400" />
          </motion.h1>
          <p className="text-cyan-200 text-2xl font-semibold">
            {selectedTool
              ? "Make amazing discoveries!"
              : `Welcome to your cosmic research center, ${playerName}! 🚀`}
          </p>
        </div>

        <div className="text-right">
          <motion.div
            className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-green-400/50"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3 text-white mb-2">
              <Award className="w-6 h-6 text-green-400" />
              <span className="font-bold text-xl">
                Lab Level {userProgress.labLevel}
              </span>
            </div>
            <div className="flex items-center gap-3 text-green-300">
              <Lightbulb className="w-5 h-5" />
              <span className="font-bold">
                {userProgress.discoveryPoints} Discovery Points
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tool Content */}
      <AnimatePresence mode="wait">
        {selectedTool ? (
          <motion.div
            key="tool"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-purple-900/60 backdrop-blur-lg rounded-3xl p-8 border-4 border-cyan-400/50 shadow-2xl"
          >
            {selectedTool === "aurora-artist-studio" && (
              <AuroraArtistStudioDeluxe />
            )}
            {selectedTool ===
              "space-weather-command-center" && (
              <SpaceWeatherCommandCenter />
            )}
            {/* Other tools can be added here */}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Enhanced Progress Dashboard */}
            <motion.div
              className="bg-gradient-to-r from-purple-600/40 to-blue-600/40 backdrop-blur-lg rounded-3xl p-8 mb-8 border-4 border-cyan-400/50 shadow-2xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <motion.h2
                    className="text-4xl font-bold text-white mb-3 flex items-center gap-3"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                        "0 0 30px rgba(168, 85, 247, 0.8)",
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <FlaskConical className="w-10 h-10 text-cyan-400" />
                    🔬 Your Scientific Journey 🌟
                  </motion.h2>
                  <p className="text-cyan-200 text-2xl font-semibold">
                    Ready to make groundbreaking discoveries,{" "}
                    {playerName}!
                  </p>
                </div>
                <div className="text-right">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      className="bg-green-500/30 rounded-2xl px-6 py-4 border-2 border-green-400/50"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2 text-green-300">
                        <Lightbulb className="w-6 h-6" />
                        <span className="font-bold text-2xl">
                          {userProgress.discoveryPoints}
                        </span>
                      </div>
                      <p className="text-green-200 text-sm">
                        Discovery Points
                      </p>
                    </motion.div>
                    <motion.div
                      className="bg-blue-500/30 rounded-2xl px-6 py-4 border-2 border-blue-400/50"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-center gap-2 text-blue-300">
                        <Trophy className="w-6 h-6" />
                        <span className="font-bold text-2xl">
                          {userProgress.experimentsCompleted}
                        </span>
                      </div>
                      <p className="text-blue-200 text-sm">
                        Experiments
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="mt-6">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  🏅 Your Research Badges
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {userProgress.badges.map((badge, index) => (
                    <motion.div
                      key={badge}
                      className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 px-4 py-2 rounded-2xl font-bold border-2 border-yellow-400/50"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      🏆 {badge}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Lab Tools Grid */}
            <div className="mb-12">
              <motion.h2
                className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 30px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Beaker className="w-10 h-10 text-cyan-400" />
                🧪 Interactive Lab Tools 🎯
                <TestTube className="w-10 h-10 text-purple-400" />
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {labTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-purple-900/60 backdrop-blur-lg border-4 border-gray-700 hover:border-cyan-400/60 cursor-pointer group h-full shadow-2xl overflow-hidden transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-6">
                          <motion.div
                            className={`text-6xl p-4 rounded-3xl bg-gradient-to-r ${tool.gradient} shadow-xl border-4 border-white/30`}
                            animate={{
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              rotate: {
                                duration: 6,
                                repeat: Infinity,
                              },
                              scale: {
                                duration: 3,
                                repeat: Infinity,
                              },
                            }}
                          >
                            {tool.icon}
                          </motion.div>
                          <div className="text-right">
                            <motion.div
                              className={`inline-block px-4 py-2 rounded-2xl text-white font-bold text-sm border-2 border-white/30 shadow-lg ${
                                tool.complexity === "Simple"
                                  ? "bg-gradient-to-r from-green-400 to-green-600"
                                  : tool.complexity === "Medium"
                                    ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                    : "bg-gradient-to-r from-red-400 to-red-600"
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {tool.complexity}
                            </motion.div>
                            <div className="text-cyan-300 font-bold text-xl mt-2">
                              +{tool.points} pts
                            </div>
                            <div className="text-yellow-300 font-semibold text-sm mt-1">
                              🎯 Fun: {tool.funFactor}%
                            </div>
                          </div>
                        </div>

                        <CardTitle className="text-white text-2xl group-hover:text-cyan-300 transition-colors font-bold mb-3">
                          {tool.name}
                        </CardTitle>
                        <p className="text-gray-300 leading-relaxed font-medium text-lg">
                          {tool.description}
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                          <Badge
                            variant="secondary"
                            className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-400/50 font-semibold text-sm"
                          >
                            {tool.category
                              .charAt(0)
                              .toUpperCase() +
                              tool.category.slice(1)}
                          </Badge>
                          {tool.isActive && (
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border border-green-400/50 font-semibold text-sm"
                            >
                              🟢 Active
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <Button
                          className={`w-full bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white font-bold py-4 rounded-2xl text-xl shadow-xl transform transition-all duration-300 group-hover:scale-105 border-2 border-white/30`}
                          onClick={() => {
                            setSelectedTool(tool.id);
                            playSound("click");
                          }}
                        >
                          <Rocket className="w-6 h-6 mr-3" />
                          🚀 Launch Tool!
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Experiments Section */}
            <motion.div
              className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-3xl p-10 border-4 border-purple-400/50 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.h2
                className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 30px rgba(168, 85, 247, 0.8)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Atom className="w-10 h-10 text-cyan-400" />
                ⚗️ Research Experiments 🔬
                <Telescope className="w-10 h-10 text-purple-400" />
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiments.map((experiment, index) => (
                  <motion.div
                    key={experiment.id}
                    className="bg-gradient-to-br from-gray-800/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-600 hover:border-cyan-400/50 cursor-pointer transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => {
                      setSelectedExperiment(experiment.id);
                      playSound("experiment");
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <motion.span
                        className="text-4xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {experiment.icon}
                      </motion.span>
                      <div className="text-right">
                        {experiment.completed && (
                          <motion.div
                            className="text-green-400 mb-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckCircle className="w-6 h-6" />
                          </motion.div>
                        )}
                        <div
                          className={`inline-block px-3 py-1 rounded-xl text-white text-xs font-bold ${
                            experiment.difficulty === "Easy"
                              ? "bg-green-500"
                              : experiment.difficulty ===
                                  "Medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        >
                          {experiment.difficulty}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-white font-bold text-lg mb-2">
                      {experiment.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {experiment.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {experiment.timeEstimate}
                      </span>
                      <span className="text-cyan-300 font-bold">
                        +{experiment.points} pts
                      </span>
                    </div>

                    <Button
                      className={`w-full text-white font-bold py-2 rounded-xl text-sm ${
                        experiment.completed
                          ? "bg-gradient-to-r from-green-500 to-emerald-600"
                          : "bg-gradient-to-r from-blue-500 to-purple-600"
                      }`}
                    >
                      {experiment.completed
                        ? "✅ Completed"
                        : "🚀 Start Experiment"}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced Stats Section */}
            <motion.div
              className="mt-12 bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-lg rounded-3xl p-10 border-4 border-green-400/50 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-center">
                <motion.h3
                  className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-4"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                      "0 0 30px rgba(34, 197, 94, 0.8)",
                      "0 0 20px rgba(34, 197, 94, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-10 h-10 text-yellow-400" />
                  🏆 Your Research Legacy! 🌟
                  <Crown className="w-10 h-10 text-purple-400" />
                </motion.h3>
                <p className="text-cyan-200 text-xl mb-8 font-semibold">
                  Outstanding scientific achievements,{" "}
                  {playerName}! You're a true space researcher!
                  🚀✨
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div
                    className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl p-6 border-2 border-yellow-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">🔬</div>
                    <h4 className="text-white font-bold text-xl">
                      Experiments
                    </h4>
                    <p className="text-yellow-300 text-3xl font-bold">
                      {userProgress.experimentsCompleted}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl p-6 border-2 border-green-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">💡</div>
                    <h4 className="text-white font-bold text-xl">
                      Discovery Points
                    </h4>
                    <p className="text-green-300 text-3xl font-bold">
                      {userProgress.discoveryPoints}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl p-6 border-2 border-purple-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">⏱️</div>
                    <h4 className="text-white font-bold text-xl">
                      Research Time
                    </h4>
                    <p className="text-purple-300 text-3xl font-bold">
                      {userProgress.totalTime}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl p-6 border-2 border-blue-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">🎯</div>
                    <h4 className="text-white font-bold text-xl">
                      Lab Level
                    </h4>
                    <p className="text-blue-300 text-3xl font-bold">
                      {userProgress.labLevel}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}