import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Globe,
  MapPin,
  Clock,
  Camera,
  Star,
  Zap,
  ChevronLeft,
  RefreshCw,
  Play,
  Info,
  Eye,
  Calendar,
  Navigation,
  Sparkles,
  Heart,
  Crown,
  Award,
  Trophy,
  Gift,
  Smile,
  PartyPopper,
  Sun,
  Moon,
  Cloud,
  Snowflake,
  Wind,
  Thermometer,
  Compass,
  Map,
  Telescope,
  Binoculars,
  Search,
  Filter,
  Share,
  BookmarkPlus,
  MessageSquare,
  ThumbsUp,
  Users,
  Timer,
  Target,
  Crosshair,
  MousePointer,
  Settings,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Home,
  Pause,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  X,
  Check,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Brain,
  Rocket,
  Satellite,
  Radio,
  Wifi,
  Signal,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Database,
  Monitor,
  Bell,
} from "lucide-react";
interface AuroraGlobeProps {
  onBack: () => void;
}
interface AuroraData {
  id: number;
  location: string;
  country: string;
  coordinates: { lat: number; lng: number };
  intensity: number;
  timestamp: string;
  color: string;
  visibility:
    | "Excellent"
    | "Good"
    | "Fair"
    | "Amazing"
    | "Spectacular";
  description: string;
  temperature: number;
  cloudCover: number;
  windSpeed: number;
  photoCount: number;
  viewerCount: number;
  forecast: string;
  bestTime: string;
  season: "Winter" | "Spring" | "Summer" | "Autumn";
}
export default function AuroraGlobe({
  onBack,
}: AuroraGlobeProps) {
  const [selectedLocation, setSelectedLocation] =
    useState<AuroraData | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [globeSpeed, setGlobeSpeed] = useState(1);
  const [view, setView] = useState<"global" | "detailed">(
    "global",
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [playSound, setPlaySound] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showWeather, setShowWeather] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all");
  const [intensityFilter, setIntensityFilter] = useState(0);
  // Enhanced aurora data with more kid-friendly content
  const auroraData: AuroraData[] = [
    {
      id: 1,
      location: "Tromsø Magic Valley",
      country: "Norway 🇳🇴",
      coordinates: { lat: 69.6492, lng: 18.9553 },
      intensity: 9.5,
      timestamp: "2 hours ago",
      color: "#00ff88",
      visibility: "Spectacular",
      description:
        "WOW! Amazing green aurora dancing like magical spirits across the entire sky! Kids are outside with their families watching this incredible light show! The aurora looks like green curtains waving in the cosmic wind! 🌟✨",
      temperature: -12,
      cloudCover: 15,
      windSpeed: 8,
      photoCount: 847,
      viewerCount: 2341,
      forecast:
        "Perfect viewing conditions for the next 6 hours!",
      bestTime: "10 PM - 2 AM",
      season: "Winter",
    },
    {
      id: 2,
      location: "Yellowknife Aurora Park",
      country: "Canada 🇨🇦",
      coordinates: { lat: 62.454, lng: -114.3718 },
      intensity: 8.2,
      timestamp: "45 minutes ago",
      color: "#ff0088",
      visibility: "Amazing",
      description:
        "Incredible pink and green aurora show! The lights are dancing and swirling like colorful ribbons in the sky! Local aurora guides say this is one of the best displays they've seen this year! Perfect for photography! 📸🌈",
      temperature: -18,
      cloudCover: 5,
      windSpeed: 12,
      photoCount: 523,
      viewerCount: 1876,
      forecast:
        "Excellent conditions continuing through the night!",
      bestTime: "9 PM - 3 AM",
      season: "Winter",
    },
    {
      id: 3,
      location: "Fairbanks Northern Lights Center",
      country: "Alaska, USA 🇺🇸",
      coordinates: { lat: 64.8378, lng: -147.7164 },
      intensity: 9.8,
      timestamp: "15 minutes ago",
      color: "#8800ff",
      visibility: "Spectacular",
      description:
        "RARE purple aurora corona overhead! This is absolutely magical - the entire sky is glowing with purple and violet lights! Scientists are calling this a once-in-a-decade event! Kids and families are gathering in parks to witness this cosmic wonder! 🟣💜",
      temperature: -22,
      cloudCover: 0,
      windSpeed: 6,
      photoCount: 1234,
      viewerCount: 4567,
      forecast:
        "Historic aurora event continues for next 4 hours!",
      bestTime: "8 PM - 4 AM",
      season: "Winter",
    },
    {
      id: 4,
      location: "Reykjavik Aurora Beach",
      country: "Iceland 🇮🇸",
      coordinates: { lat: 64.1466, lng: -21.9426 },
      intensity: 7.8,
      timestamp: "1 hour ago",
      color: "#00ffff",
      visibility: "Excellent",
      description:
        "Bright blue-green aurora reflecting on the ocean! The northern lights are creating a magical mirror effect on the water. Tourists and locals are gathering on the beach with hot chocolate to enjoy this beautiful natural light show! 🌊✨",
      temperature: -8,
      cloudCover: 20,
      windSpeed: 15,
      photoCount: 678,
      viewerCount: 1923,
      forecast:
        "Good viewing conditions with occasional clouds",
      bestTime: "10 PM - 1 AM",
      season: "Winter",
    },
    {
      id: 5,
      location: "Kiruna Aurora Station",
      country: "Sweden 🇸🇪",
      coordinates: { lat: 67.8558, lng: 20.2253 },
      intensity: 10.0,
      timestamp: "30 minutes ago",
      color: "#ffff00",
      visibility: "Spectacular",
      description:
        '⭐ LEGENDARY GOLDEN AURORA CORONA! ⭐ This is absolutely incredible - a rare golden aurora is covering the entire sky like a celestial dome! Aurora scientists are calling this a "once in a lifetime" event! The Sami people say this brings good luck and joy! 🌟👑',
      temperature: -15,
      cloudCover: 0,
      windSpeed: 3,
      photoCount: 2156,
      viewerCount: 8934,
      forecast:
        "Perfect clear skies - legendary viewing conditions!",
      bestTime: "9 PM - 5 AM",
      season: "Winter",
    },
    {
      id: 6,
      location: "Murmansk Polar Station",
      country: "Russia 🇷🇺",
      coordinates: { lat: 68.9585, lng: 33.0827 },
      intensity: 8.7,
      timestamp: "20 minutes ago",
      color: "#ff4400",
      visibility: "Amazing",
      description:
        "Stunning red and orange aurora! The northern lights look like fire dancing in the sky! Local families are having aurora parties with warm drinks and traditional songs. The colors are so bright you can see them reflecting on the snow! 🔥❄️",
      temperature: -25,
      cloudCover: 10,
      windSpeed: 8,
      photoCount: 789,
      viewerCount: 2456,
      forecast: "Excellent viewing with crystal clear skies!",
      bestTime: "8 PM - 2 AM",
      season: "Winter",
    },
    {
      id: 7,
      location: "Finnish Lapland Aurora Village",
      country: "Finland 🇫🇮",
      coordinates: { lat: 68.0736, lng: 27.4281 },
      intensity: 8.9,
      timestamp: "10 minutes ago",
      color: "#00cc99",
      visibility: "Spectacular",
      description:
        "Magical turquoise aurora dancing over the snowy forest! The lights are creating amazing patterns that look like cosmic butterflies! Children are making wishes on the aurora while families enjoy traditional Finnish aurora-watching treats! 🦋🌲",
      temperature: -20,
      cloudCover: 5,
      windSpeed: 10,
      photoCount: 943,
      viewerCount: 3127,
      forecast:
        "Perfect conditions in winter wonderland setting!",
      bestTime: "9 PM - 3 AM",
      season: "Winter",
    },
    {
      id: 8,
      location: "Greenland Aurora Observatory",
      country: "Greenland 🇬🇱",
      coordinates: { lat: 77.1539, lng: -69.2075 },
      intensity: 9.3,
      timestamp: "5 minutes ago",
      color: "#cc00ff",
      visibility: "Amazing",
      description:
        "Incredible magenta aurora spiral! The northern lights are forming a beautiful spiral pattern that looks like a cosmic tornado made of light! This is one of the most unique aurora shapes ever photographed! 🌪️💖",
      temperature: -30,
      cloudCover: 0,
      windSpeed: 5,
      photoCount: 1567,
      viewerCount: 5234,
      forecast:
        "Extreme arctic conditions - spectacular viewing!",
      bestTime: "7 PM - 6 AM",
      season: "Winter",
    },
  ];
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([
    1, 3, 5,
  ]);
  const [userStats, setUserStats] = useState({
    locationsVisited: 15,
    photosLiked: 234,
    auroraPoints: 1250,
    level: 8,
    achievements: [
      "Aurora Hunter",
      "Photo Expert",
      "Globe Explorer",
      "Northern Lights Master",
    ],
  });
  useEffect(() => {
    if (!liveUpdates) return;
    const interval = setInterval(() => {
      // Simulate live updates with more dynamic changes
      console.log(
        "🌌 Updating aurora data from space weather satellites...",
      );

      // Update viewing counts and recent activity
      if (Math.random() > 0.3) {
        const randomLocation =
          auroraData[
            Math.floor(Math.random() * auroraData.length)
          ];
        randomLocation.viewerCount +=
          Math.floor(Math.random() * 50) + 10;
        randomLocation.photoCount +=
          Math.floor(Math.random() * 20) + 5;
      }
    }, 15000); // Update every 15 seconds
    return () => clearInterval(interval);
  }, [liveUpdates]);
  const playAudioFeedback = (type: string) => {
    if (!playSound) return;

    console.log(`🔊 Playing sound: ${type}`);
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        click: 400,
        success: 800,
        magic: 1000,
        discovery: 1200,
        favorite: 600,
        celebrate: 1500,
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
  const toggleFavorite = (locationId: number) => {
    setFavorites((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId],
    );
    playAudioFeedback("favorite");
  };
  const EnhancedGlobe3D = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const apiRef = useRef<any>(null);
    const defaultCameraRef = useRef<{
      position: number[];
      target: number[];
    }>({ position: [], target: [] });
    const radiusRef = useRef<number>(1);
    const centerRef = useRef<number[]>([0, 0, 0]);

    useEffect(() => {
      const loadViewer = () => {
        if (window.Sketchfab) {
          initViewer();
        } else {
          const script = document.createElement("script");
          script.src =
            "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
          script.onload = initViewer;
          document.body.appendChild(script);
        }
      };

      const initViewer = () => {
        const Sketchfab = window.Sketchfab;
        const client = new Sketchfab(iframeRef.current);
        client.init("b7174b568e9e47dca8b40cdd0eff3202", {
          success: (api: any) => {
            apiRef.current = api;
            api.start();
            api.addEventListener("viewerready", () => {
              // Get default camera
              api.getCameraLookAt(
                (position: number[], target: number[]) => {
                  defaultCameraRef.current = {
                    position,
                    target,
                  };
                },
              );

              // Get scene AABB for radius and center
              api.getSceneAABB(
                (min: number[], max: number[]) => {
                  centerRef.current = [
                    (min[0] + max[0]) / 2,
                    (min[1] + max[1]) / 2,
                    (min[2] + max[2]) / 2,
                  ];
                  const dx = (max[0] - min[0]) / 2;
                  const dy = (max[1] - min[1]) / 2;
                  const dz = (max[2] - min[2]) / 2;
                  radiusRef.current = Math.max(dx, dy, dz);
                },
              );

              // Add annotations
              auroraData.forEach((aurora, index) => {
                const rad = Math.PI / 180;
                const theta =
                  (90 - aurora.coordinates.lat) * rad;
                const phi = aurora.coordinates.lng * rad;
                const unit_x = Math.sin(theta) * Math.cos(phi);
                const unit_y = Math.cos(theta);
                const unit_z = Math.sin(theta) * Math.sin(phi);
                const annot_radius = radiusRef.current * 1.01;
                const eye_radius = radiusRef.current * 1.5;
                const position = [
                  centerRef.current[0] + annot_radius * unit_x,
                  centerRef.current[1] + annot_radius * unit_y,
                  centerRef.current[2] + annot_radius * unit_z,
                ];
                const eye = [
                  centerRef.current[0] + eye_radius * unit_x,
                  centerRef.current[1] + eye_radius * unit_y,
                  centerRef.current[2] + eye_radius * unit_z,
                ];
                const target = position;
                api.addAnnotation(
                  position,
                  eye,
                  target,
                  `${aurora.location} (${aurora.intensity})`,
                  aurora.description,
                );
              });

              // Annotation select event
              api.addEventListener(
                "annotationSelect",
                (index: number) => {
                  if (index !== -1) {
                    const aurora = auroraData[index];
                    setSelectedLocation(aurora);
                    playAudioFeedback("discovery");
                  } else {
                    setSelectedLocation(null);
                  }
                },
              );
            });
          },
          error: () => {
            console.error("Sketchfab API error");
          },
        });
      };

      loadViewer();

      return () => {
        if (apiRef.current) {
          apiRef.current.stop();
        }
      };
    }, []);

    // Rotation effect
    useEffect(() => {
      if (!apiRef.current || !isRotating) return;

      let angle = 0;
      const interval = setInterval(() => {
        const deltaAngle = 0.01 * globeSpeed;
        angle += deltaAngle;
        apiRef.current.getCameraLookAt(
          (pos: number[], target: number[]) => {
            const dx = pos[0] - target[0];
            const dz = pos[2] - target[2];
            const radius = Math.sqrt(dx * dx + dz * dz);
            const currentAngle = Math.atan2(dx, dz);
            const newAngle = currentAngle + deltaAngle;
            const newX =
              target[0] + radius * Math.sin(newAngle);
            const newZ =
              target[2] + radius * Math.cos(newAngle);
            apiRef.current.setCameraLookAt(
              [newX, pos[1], newZ],
              target,
              0,
            );
          },
        );
      }, 50);

      return () => clearInterval(interval);
    }, [isRotating, globeSpeed]);

    // Zoom effect
    useEffect(() => {
      if (!apiRef.current) return;
      apiRef.current.setFov(45 / zoomLevel);
    }, [zoomLevel]);

    // Filter effect
    useEffect(() => {
      if (!apiRef.current) return;
      const api = apiRef.current;
      auroraData.forEach((aurora, index) => {
        const isRecent =
          parseInt(aurora.timestamp.split(" ")[0]) <= 60;
        const isActive = aurora.intensity >= 8;
        const show =
          (timeFilter === "all" ||
            (timeFilter === "recent" && isRecent) ||
            (timeFilter === "active" && isActive)) &&
          aurora.intensity >= intensityFilter;
        if (show) {
          api.showAnnotation(index);
        } else {
          api.hideAnnotation(index);
        }
      });
    }, [timeFilter, intensityFilter]);

    // Reset camera when deselecting location
    useEffect(() => {
      if (
        selectedLocation === null &&
        apiRef.current &&
        defaultCameraRef.current.position.length > 0
      ) {
        apiRef.current.setCameraLookAt(
          defaultCameraRef.current.position,
          defaultCameraRef.current.target,
        );
      }
    }, [selectedLocation]);

    return (
      <div className="relative w-full h-[500px] flex items-center justify-center">
        {/* Beautiful Starry Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-3xl overflow-hidden">
          {/* Twinkling Stars */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          {/* Magical Cosmic Dust */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
        {/* Sketchfab Iframe */}
        <iframe
          ref={iframeRef}
          title="Aurora borealis on Earth's atmosphere"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          src="https://sketchfab.com/models/b7174b568e9e47dca8b40cdd0eff3202/embed?autostart=1&ui_controls=1&ui_infos=0&camera=0&ui_annotations=1"
          className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden border-4 border-cyan-400/50"
        />
        {/* Enhanced Globe Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          <Button
            onClick={() => {
              setIsRotating(!isRotating);
              playAudioFeedback("click");
            }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-2xl shadow-lg border-2 border-cyan-400/50"
          >
            {isRotating ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRotating ? "⏸️ Pause" : "▶️ Spin"}
          </Button>

          <Button
            onClick={() => {
              setLiveUpdates(!liveUpdates);
              playAudioFeedback("success");
            }}
            className={`${liveUpdates ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-gray-500 to-gray-600"} text-white px-4 py-2 rounded-2xl shadow-lg border-2 border-white/30`}
          >
            <Eye className="w-4 h-4 mr-2" />
            {liveUpdates ? "🟢 Live" : "⚪ Paused"}
          </Button>
          <Button
            onClick={() => {
              setZoomLevel(zoomLevel === 1 ? 1.5 : 1);
              playAudioFeedback("click");
            }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-4 py-2 rounded-2xl shadow-lg border-2 border-purple-400/50"
          >
            {zoomLevel === 1 ? (
              <ZoomIn className="w-4 h-4 mr-2" />
            ) : (
              <ZoomOut className="w-4 h-4 mr-2" />
            )}
            {zoomLevel === 1 ? "🔍 Zoom" : "🔍 Reset"}
          </Button>
        </div>
        {/* Speed Control */}
        <div className="absolute top-6 right-6 bg-black/60 rounded-2xl p-4 border-2 border-cyan-400/50">
          <label className="text-white font-bold text-sm mb-2 block">
            🌍 Globe Speed
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={globeSpeed}
            onChange={(e) =>
              setGlobeSpeed(Number(e.target.value))
            }
            className="w-20 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-cyan-300 text-xs mt-1 text-center">
            {globeSpeed}x
          </div>
        </div>
        {/* Filter Controls */}
        <div className="absolute top-6 left-6 bg-black/60 rounded-2xl p-4 border-2 border-cyan-400/50 space-y-3">
          <h4 className="text-white font-bold text-sm">
            🔍 Filters
          </h4>
          <div>
            <label className="text-white text-xs block mb-1">
              Time
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-600"
            >
              <option value="all">All Time</option>
              <option value="recent">Last Hour</option>
              <option value="active">High Activity</option>
            </select>
          </div>
          <div>
            <label className="text-white text-xs block mb-1">
              Min Intensity: {intensityFilter}
            </label>
            <input
              type="range"
              min="0"
              max="9"
              value={intensityFilter}
              onChange={(e) =>
                setIntensityFilter(Number(e.target.value))
              }
              className="w-full h-1 bg-gradient-to-r from-green-500 to-red-500 rounded appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  };
  const EnhancedAuroraDetails = ({
    aurora,
  }: {
    aurora: AuroraData;
  }) => {
    const getIntensityColor = (intensity: number) => {
      if (intensity >= 9.5)
        return "from-purple-500 to-pink-500";
      if (intensity >= 9) return "from-red-500 to-orange-500";
      if (intensity >= 8)
        return "from-orange-500 to-yellow-500";
      if (intensity >= 7) return "from-yellow-500 to-green-500";
      return "from-green-500 to-blue-500";
    };
    const getVisibilityEmoji = (visibility: string) => {
      switch (visibility) {
        case "Spectacular":
          return "🤩";
        case "Amazing":
          return "😍";
        case "Excellent":
          return "🤗";
        case "Good":
          return "😊";
        default:
          return "🙂";
      }
    };
    const getWeatherEmoji = (temp: number) => {
      if (temp > 0) return "🌤️";
      if (temp > -10) return "❄️";
      if (temp > -20) return "🥶";
      return "🧊";
    };
    return (
      <motion.div
        className="bg-gradient-to-br from-gray-900/90 to-blue-900/90 backdrop-blur-lg rounded-3xl p-8 border-4 border-cyan-400/50 shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.9 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-6xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: { duration: 2, repeat: Infinity },
              }}
            >
              {aurora.intensity >= 9.5
                ? "👑"
                : aurora.intensity >= 9
                  ? "⭐"
                  : aurora.intensity >= 8
                    ? "✨"
                    : aurora.intensity >= 7
                      ? "🌟"
                      : "💫"}
            </motion.div>
            <div>
              <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                <MapPin className="w-8 h-8 text-cyan-400" />
                {aurora.location}
              </h3>
              <p className="text-cyan-300 text-xl font-semibold">
                {aurora.country}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => toggleFavorite(aurora.id)}
              className={`${
                favorites.includes(aurora.id)
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                  : "bg-gradient-to-r from-gray-600 to-gray-700"
              } text-white p-3 rounded-2xl border-2 border-white/30`}
            >
              {favorites.includes(aurora.id)
                ? "⭐ Favorite"
                : "☆ Add Favorite"}
            </Button>
            <Button
              onClick={() => setSelectedLocation(null)}
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white p-3 rounded-2xl border-2 border-white/30"
            >
              ✕
            </Button>
          </div>
        </div>
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            className="bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-2xl p-4 border-2 border-red-400/50"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-bold text-lg">
                Intensity
              </span>
            </div>
            <div
              className={`bg-gradient-to-r ${getIntensityColor(aurora.intensity)} h-4 rounded-full mb-2`}
            />
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-2xl">
                {aurora.intensity}/10
              </span>
              <span className="text-2xl">
                {aurora.intensity >= 9.5
                  ? "🔥"
                  : aurora.intensity >= 9
                    ? "⚡"
                    : aurora.intensity >= 8
                      ? "✨"
                      : aurora.intensity >= 7
                        ? "🌟"
                        : "💫"}
              </span>
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl p-4 border-2 border-green-400/50"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-green-400" />
              <span className="text-white font-bold text-lg">
                Last Seen
              </span>
            </div>
            <span className="text-green-300 font-bold text-xl">
              {aurora.timestamp}
            </span>
            <div className="text-green-200 text-sm mt-1">
              🕐 {aurora.bestTime}
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl p-4 border-2 border-blue-400/50"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-6 h-6 text-blue-400" />
              <span className="text-white font-bold text-lg">
                Visibility
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-300 font-bold text-xl">
                {aurora.visibility}
              </span>
              <span className="text-2xl">
                {getVisibilityEmoji(aurora.visibility)}
              </span>
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl p-4 border-2 border-purple-400/50"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-6 h-6 text-purple-400" />
              <span className="text-white font-bold text-lg">
                Aurora Color
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                style={{
                  backgroundColor: aurora.color,
                  boxShadow: `0 0 20px ${aurora.color}70`,
                }}
              />
              <span className="text-white font-bold">
                {aurora.color}
              </span>
            </div>
          </motion.div>
        </div>
        {/* Weather Information */}
        <motion.div
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 mb-6 border-2 border-cyan-400/30"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Cloud className="w-6 h-6 text-cyan-400" />
            🌤️ Weather Conditions
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">
                {getWeatherEmoji(aurora.temperature)}
              </div>
              <div className="text-white font-bold">
                Temperature
              </div>
              <div className="text-cyan-300 text-lg">
                {aurora.temperature}°C
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">☁️</div>
              <div className="text-white font-bold">
                Cloud Cover
              </div>
              <div className="text-cyan-300 text-lg">
                {aurora.cloudCover}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💨</div>
              <div className="text-white font-bold">
                Wind Speed
              </div>
              <div className="text-cyan-300 text-lg">
                {aurora.windSpeed} km/h
              </div>
            </div>
          </div>
        </motion.div>
        {/* Aurora Description */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-6 border-2 border-purple-400/30"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-purple-400" />
            📖 Aurora Story
          </h4>
          <p className="text-gray-300 leading-relaxed text-lg font-medium">
            {aurora.description}
          </p>

          <div className="mt-4 p-4 bg-black/30 rounded-xl border border-purple-400/30">
            <p className="text-purple-200 font-semibold">
              🔮 {aurora.forecast}
            </p>
          </div>
        </motion.div>
        {/* Community Stats */}
        <motion.div
          className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-6 mb-6 border-2 border-green-400/30"
          whileHover={{ scale: 1.02 }}
        >
          <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-green-400" />
            👥 Community Activity
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">📸</div>
              <div className="text-white font-bold text-lg">
                Photos Shared
              </div>
              <div className="text-green-300 text-2xl font-bold">
                {aurora.photoCount.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👀</div>
              <div className="text-white font-bold text-lg">
                People Watching
              </div>
              <div className="text-green-300 text-2xl font-bold">
                {aurora.viewerCount.toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>
        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-green-400/50 font-bold text-lg"
            onClick={() => {
              playAudioFeedback("success");
              // Simulate viewing photos - could open a modal or something
              console.log(
                `Viewing photos for ${aurora.location}`,
              );
            }}
          >
            <Camera className="w-5 h-5" />
            📸 View Photos ({aurora.photoCount})
          </Button>

          <Button
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-blue-400/50 font-bold text-lg"
            onClick={() => {
              playAudioFeedback("click");
              // Simulate getting directions
              console.log(
                `Getting directions to ${aurora.location}`,
              );
            }}
          >
            <Navigation className="w-5 h-5" />
            🧭 Get Directions
          </Button>

          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-purple-400/50 font-bold text-lg"
            onClick={() => {
              playAudioFeedback("magic");
              // Simulate sharing
              console.log(`Sharing ${aurora.location}`);
            }}
          >
            <Share className="w-5 h-5" />
            🌍 Share Location
          </Button>

          <Button
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-yellow-400/50 font-bold text-lg"
            onClick={() => {
              playAudioFeedback("celebrate");
              // Simulate setting alert
              console.log(
                `Setting alert for ${aurora.location}`,
              );
            }}
          >
            <Bell className="w-5 h-5" />
            🔔 Set Alert
          </Button>
        </div>
      </motion.div>
    );
  };
  const filteredAuroraData = auroraData
    .filter(
      (aurora) =>
        timeFilter === "all" ||
        (timeFilter === "recent" &&
          parseInt(aurora.timestamp.split(" ")[0]) <= 60) ||
        (timeFilter === "active" && aurora.intensity >= 8),
    )
    .filter((aurora) => aurora.intensity >= intensityFilter);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6">
      {/* Enhanced Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          onClick={onBack}
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
            <Globe className="w-12 h-12 text-cyan-400" />
            🌍 Magical Aurora Globe 🌟
            <Sparkles className="w-12 h-12 text-purple-400" />
          </motion.h1>
          <p className="text-cyan-200 text-2xl font-semibold">
            Discover amazing aurora lights around the world!
            ✨🌈
          </p>
        </div>
        <div className="text-right">
          <motion.div
            className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-green-400/50"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3 text-white mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="font-bold text-xl">
                🛰️ Live Aurora Tracking
              </span>
            </div>
            <p className="text-green-300 font-semibold">
              {filteredAuroraData.length} active locations •
              Updated every 15 seconds
            </p>
          </motion.div>
        </div>
      </motion.div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Globe Section */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-purple-900/60 backdrop-blur-lg border-4 border-cyan-400/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white text-center text-3xl flex items-center justify-center gap-3 font-bold">
                <Globe className="w-8 h-8 text-cyan-400" />
                🌍 Real-Time Aurora Globe 🌟
              </CardTitle>
              <p className="text-cyan-200 text-center text-lg font-semibold">
                Click on the glowing aurora markers to discover
                amazing light shows! ✨
              </p>
            </CardHeader>
            <CardContent>
              <EnhancedGlobe3D />

              <div className="mt-6 text-center">
                <p className="text-gray-300 mb-4 text-lg font-semibold">
                  🌈 Aurora Color Guide: Each color represents
                  different space weather conditions!
                </p>
                <div className="flex justify-center gap-6 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 bg-green-400 rounded-full shadow-lg"
                      style={{ boxShadow: "0 0 10px #4ade80" }}
                    />
                    <span className="text-gray-300 font-semibold">
                      🟢 Green Aurora
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 bg-pink-400 rounded-full shadow-lg"
                      style={{ boxShadow: "0 0 10px #f472b6" }}
                    />
                    <span className="text-gray-300 font-semibold">
                      🩷 Pink Aurora
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 bg-purple-400 rounded-full shadow-lg"
                      style={{ boxShadow: "0 0 10px #c084fc" }}
                    />
                    <span className="text-gray-300 font-semibold">
                      🟣 Purple Aurora
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
                      style={{ boxShadow: "0 0 10px #facc15" }}
                    />
                    <span className="text-gray-300 font-semibold">
                      🟡 Golden Aurora
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Enhanced Side Panel */}
        <div>
          <AnimatePresence mode="wait">
            {selectedLocation ? (
              <EnhancedAuroraDetails
                aurora={selectedLocation}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Aurora Hotspots */}
                <Card className="bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-purple-900/60 backdrop-blur-lg border-4 border-cyan-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center gap-2">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      🌟 Aurora Hotspots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {filteredAuroraData
                        .sort(
                          (a, b) => b.intensity - a.intensity,
                        )
                        .map((aurora) => (
                          <motion.div
                            key={aurora.id}
                            className="bg-gradient-to-r from-gray-700/50 to-blue-800/50 rounded-2xl p-4 cursor-pointer border-2 border-gray-600 hover:border-cyan-400/60 transition-all duration-300"
                            onClick={() => {
                              setSelectedLocation(aurora);
                              playAudioFeedback("discovery");
                              if (apiRef.current) {
                                apiRef.current.gotoAnnotation(
                                  aurora.id - 1,
                                  1,
                                  "ease-in-out",
                                );
                              }
                            }}
                            whileHover={{ scale: 1.03, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 * aurora.id,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className="text-3xl"
                                  animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1],
                                  }}
                                  transition={{
                                    rotate: {
                                      duration: 8,
                                      repeat: Infinity,
                                      ease: "linear",
                                    },
                                    scale: {
                                      duration: 2,
                                      repeat: Infinity,
                                    },
                                  }}
                                >
                                  {aurora.intensity >= 9.5
                                    ? "👑"
                                    : aurora.intensity >= 9
                                      ? "⭐"
                                      : aurora.intensity >= 8
                                        ? "✨"
                                        : aurora.intensity >= 7
                                          ? "🌟"
                                          : "💫"}
                                </motion.div>
                                <div>
                                  <h4 className="text-white font-bold text-lg">
                                    {aurora.location}
                                  </h4>
                                  <p className="text-gray-400 text-sm">
                                    {aurora.country}
                                  </p>
                                  <p className="text-cyan-300 text-xs">
                                    {aurora.visibility}{" "}
                                    visibility
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2 mb-1">
                                  <div
                                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                                    style={{
                                      backgroundColor:
                                        aurora.color,
                                      boxShadow: `0 0 15px ${aurora.color}70`,
                                    }}
                                  />
                                  <span className="text-white font-bold text-xl">
                                    {aurora.intensity}/10
                                  </span>
                                </div>
                                {favorites.includes(
                                  aurora.id,
                                ) && (
                                  <motion.div
                                    className="text-yellow-400 text-right"
                                    animate={{
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                    }}
                                  >
                                    ⭐
                                  </motion.div>
                                )}
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                              <span>🕐 {aurora.timestamp}</span>
                              <span>
                                👥{" "}
                                {aurora.viewerCount.toLocaleString()}{" "}
                                watching
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                {/* User Stats */}
                <motion.div
                  className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-3xl p-6 border-4 border-purple-400/50 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    🏆 Your Aurora Journey
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">🌍</div>
                      <div className="text-white font-bold">
                        Locations
                      </div>
                      <div className="text-yellow-300 text-xl font-bold">
                        {userStats.locationsVisited}
                      </div>
                    </div>
                    <div className="bg-pink-500/20 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">💖</div>
                      <div className="text-white font-bold">
                        Photos Liked
                      </div>
                      <div className="text-pink-300 text-xl font-bold">
                        {userStats.photosLiked}
                      </div>
                    </div>
                    <div className="bg-green-500/20 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-white font-bold">
                        Aurora Points
                      </div>
                      <div className="text-green-300 text-xl font-bold">
                        {userStats.auroraPoints}
                      </div>
                    </div>
                    <div className="bg-blue-500/20 rounded-xl p-3 text-center">
                      <div className="text-2xl mb-1">🎯</div>
                      <div className="text-white font-bold">
                        Explorer Level
                      </div>
                      <div className="text-blue-300 text-xl font-bold">
                        {userStats.level}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">
                      🏅 Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {userStats.achievements.map(
                        (achievement, index) => (
                          <motion.span
                            key={achievement}
                            className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 px-3 py-1 rounded-xl text-sm font-bold border border-yellow-400/50"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            🏆 {achievement}
                          </motion.span>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
                {/* Fun Aurora Facts */}
                <Card className="bg-gradient-to-br from-green-600/30 to-teal-600/30 backdrop-blur-lg border-4 border-green-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                      🤓 Fun Aurora Facts!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                        <div>
                          <h4 className="text-white font-bold">
                            What creates auroras?
                          </h4>
                          <p className="text-green-200 text-sm">
                            Solar particles dancing with Earth's
                            magnetic field create these magical
                            lights! ✨
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Globe className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="text-white font-bold">
                            Best places to see them
                          </h4>
                          <p className="text-green-200 text-sm">
                            Northern regions with dark, clear
                            skies away from city lights! 🌌
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-6 h-6 text-blue-400 mt-1" />
                        <div>
                          <h4 className="text-white font-bold">
                            Perfect viewing time
                          </h4>
                          <p className="text-green-200 text-sm">
                            Between 9 PM and 4 AM during winter
                            months for the best show! 🌙
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Camera className="w-6 h-6 text-purple-400 mt-1" />
                        <div>
                          <h4 className="text-white font-bold">
                            Aurora colors
                          </h4>
                          <p className="text-green-200 text-sm">
                            Green is most common, but you can
                            also see pink, purple, blue, and
                            rare red auroras! 🌈
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Sound Control */}
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => {
            setPlaySound(!playSound);
            playAudioFeedback("click");
          }}
          className={`${
            playSound
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : "bg-gradient-to-r from-gray-500 to-gray-600"
          } text-white p-4 rounded-full shadow-lg border-2 border-white/30`}
        >
          {playSound ? (
            <Volume2 className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}