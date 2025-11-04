import React, {
  useState,
  useEffect,
  useRef,
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
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import {
  Gamepad2,
  Sun,
  Zap,
  Globe,
  Palette,
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
  Lock,
  Rocket,
  Heart,
  Crown,
  Home,
  Check,
  X,
  Timer,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Atom,
  Volume2,
  MousePointer,
  Gauge,
  Activity,
  AlertTriangle,
  Flame,
  Waves,
  Wind,
  Download,
} from "lucide-react";

interface CosmicGamesProps {
  playerName: string;
  onBack: () => void;
}

export default function CosmicGames({
  playerName,
  onBack,
}: CosmicGamesProps) {
  const [selectedGame, setSelectedGame] = useState<
    string | null
  >(null);

  const playSound = (type: string) => {
    console.log(`🔊 Sound: ${type}`);
  };

  const [playerStats, setPlayerStats] = useState({
    cosmicCoins: 187,
    gamesWon: 12,
    quizzesPassed: 8,
    level: 15,
  });

  const interactiveGames = [
    {
      id: "solar-flare-catcher",
      title: "Solar Flare Catcher",
      description:
        "Catch magical solar flares with your mouse! Super easy and fun!",
      icon: "🌟",
      gradient: "from-yellow-400 via-orange-500 to-red-600",
      difficulty: "Super Fun!",
      difficultyColor: "bg-green-500",
      points: "50",
      gameType: "Mouse Adventure",
      isLocked: false,
    },
    {
      id: "aurora-creator",
      title: "Magical Aurora Painter",
      description:
        "Paint beautiful northern lights! Create amazing cosmic art!",
      icon: "🌈",
      gradient: "from-green-400 via-blue-500 to-purple-600",
      difficulty: "Creative Joy",
      difficultyColor: "bg-green-500",
      points: "75",
      gameType: "Art Mode",
      isLocked: false,
    },
    {
      id: "cosmic-dodger",
      title: "Space Ship Adventure",
      description:
        "Fly through space! Collect stars and avoid space storms!",
      icon: "🚀",
      gradient: "from-purple-400 via-pink-500 to-red-600",
      difficulty: "Epic Fun",
      difficultyColor: "bg-yellow-500",
      points: "100",
      gameType: "Flying Game",
      isLocked: false,
    },
    {
      id: "satellite-defense",
      title: "Satellite Protector",
      description:
        "Protect Earth's satellites! Use your shield to block space weather!",
      icon: "🛰️",
      gradient: "from-cyan-400 via-blue-600 to-indigo-800",
      difficulty: "Hero Mode",
      difficultyColor: "bg-orange-500",
      points: "125",
      gameType: "Defense Game",
      isLocked: false,
    },
  ];

  const renderGameSelection = () => (
    <div className="space-y-8 max-w-7xl mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 flex items-center justify-center gap-6">
          🎮 SUPER COSMIC GAMES! 🚀
        </h2>
        <p className="text-2xl md:text-4xl text-white/95 font-bold">
          Ready for amazing space adventures, {playerName}?
          Let's play! 🌟
        </p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-purple-500/30 to-blue-500/30 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Cosmic Coins",
              value: playerStats.cosmicCoins,
              icon: "🪙",
              color: "text-yellow-400",
            },
            {
              label: "Games Won",
              value: playerStats.gamesWon,
              icon: "🏆",
              color: "text-green-400",
            },
            {
              label: "Space Level",
              value: playerStats.level,
              icon: "⭐",
              color: "text-purple-400",
            },
            {
              label: "Achievements",
              value: playerStats.quizzesPassed,
              icon: "🎯",
              color: "text-blue-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/15 rounded-3xl p-6 border-2 border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.15, y: -8 }}
            >
              <div className="text-6xl mb-3">{stat.icon}</div>
              <div
                className={`text-5xl font-bold ${stat.color} mb-2`}
              >
                {stat.value}
              </div>
              <div className="text-white font-bold text-xl">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {interactiveGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 60, rotateY: 30 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: 0.8 + index * 0.3 }}
            whileHover={{ scale: 1.08, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="bg-gradient-to-br from-white/25 to-white/15 backdrop-blur-lg border-4 border-white/40 cursor-pointer overflow-hidden relative group h-full min-h-[500px] shadow-2xl"
              onClick={() => {
                setSelectedGame(game.id);
                playSound("game-start");
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${game.gradient} opacity-30`}
              />

              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full bg-white/60"
                    style={{
                      left: `${10 + i * 8}%`,
                      top: `${20 + (i % 4) * 20}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-8xl">{game.icon}</div>
                  <div className="flex flex-col gap-3">
                    <Badge
                      className={`${game.difficultyColor} text-white font-bold text-xl px-6 py-3 rounded-2xl`}
                    >
                      {game.difficulty}
                    </Badge>
                    <div className="bg-yellow-500 text-white font-bold text-xl px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
                      <Coins className="w-6 h-6" />
                      {game.points}
                    </div>
                  </div>
                </div>

                <CardTitle className="text-4xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">
                  {game.title}
                </CardTitle>

                <p className="text-white/95 text-2xl font-bold mb-6">
                  {game.description}
                </p>

                <div className="mb-6">
                  <Badge className="bg-purple-500 text-white font-bold text-xl px-6 py-3 rounded-2xl">
                    {game.gameType}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="relative z-10">
                <div className="bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/40 text-center">
                  <Button
                    className={`w-full bg-gradient-to-r ${game.gradient} hover:opacity-90 text-white text-3xl py-8 rounded-2xl font-bold shadow-xl border-4 border-white/60 transition-all duration-300 hover:shadow-2xl`}
                    size="lg"
                  >
                    <Play className="w-8 h-8 mr-4" />
                    PLAY NOW!
                    <Sparkles className="w-8 h-8 ml-4" />
                  </Button>
                  <p className="text-white/90 mt-4 font-bold text-xl">
                    Click anywhere to start!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-lg rounded-3xl p-10 border-4 border-white/40 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <h3 className="text-5xl font-bold text-white text-center mb-8 flex items-center justify-center gap-4">
          <Crown className="w-12 h-12" />
          Today's Space Challenges!
          <Crown className="w-12 h-12" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              challenge: "Catch 100 Solar Flares",
              progress: 75,
              reward: "50 Coins",
              icon: "🌟",
              color: "from-yellow-400 to-orange-500",
            },
            {
              challenge: "Create 15 Amazing Auroras",
              progress: 40,
              reward: "75 Coins",
              icon: "🌈",
              color: "from-green-400 to-blue-500",
            },
            {
              challenge: "Navigate Space for 10 Minutes",
              progress: 60,
              reward: "100 Coins",
              icon: "🚀",
              color: "from-purple-400 to-pink-500",
            },
          ].map((challenge, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-r ${challenge.color} rounded-3xl p-8 text-center text-white shadow-xl border-4 border-white/30`}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -80 : 80,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1 + index * 0.3 }}
              whileHover={{ scale: 1.08, y: -10 }}
            >
              <div className="text-8xl mb-4">
                {challenge.icon}
              </div>
              <h4 className="text-white font-bold text-2xl mb-4">
                {challenge.challenge}
              </h4>
              <div className="mb-4">
                <Progress
                  value={challenge.progress}
                  className="h-6 bg-white/20"
                />
                <p className="text-white/90 font-bold mt-3 text-xl">
                  {challenge.progress}% Complete
                </p>
              </div>
              <div className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-full text-xl">
                🏆 {challenge.reward}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  // Enhanced Solar Flare Catcher Game
  const SolarFlareCatcher = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const [gameState, setGameState] = useState<
      "playing" | "paused" | "gameOver"
    >("playing");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [timeLeft, setTimeLeft] = useState(90);
    const [playerPos, setPlayerPos] = useState({
      x: 400,
      y: 500,
    });
    const particlesRef = useRef<any[]>([]);
    const powerUpsRef = useRef<any[]>([]);

    useEffect(() => {
      if (gameState !== "playing") return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gameLoop = () => {
        // Gradient background
        const gradient = ctx.createLinearGradient(
          0,
          0,
          0,
          canvas.height,
        );
        gradient.addColorStop(0, "#1e1b4b");
        gradient.addColorStop(0.5, "#312e81");
        gradient.addColorStop(1, "#1e3a8a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated stars
        for (let i = 0; i < 100; i++) {
          const x = (i * 67) % canvas.width;
          const y = (i * 43) % canvas.height;
          const twinkle =
            0.5 + Math.sin(Date.now() * 0.003 + i) * 0.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
          const size = 1 + Math.sin(Date.now() * 0.002 + i) * 2;
          ctx.fillRect(x, y, size, size);
        }

        // Spawn solar flares
        if (Math.random() < 0.05) {
          particlesRef.current.push({
            id: Math.random(),
            x: Math.random() * (canvas.width - 60) + 30,
            y: -30,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 20 + 15,
            color: `hsl(${Math.random() * 60 + 30}, 100%, 60%)`,
            energy: 50,
            glow: Math.random() * 20 + 10,
          });
        }

        // Spawn power-ups occasionally
        if (Math.random() < 0.01) {
          powerUpsRef.current.push({
            id: Math.random(),
            x: Math.random() * (canvas.width - 40) + 20,
            y: -20,
            vy: 1.5,
            size: 25,
            type: Math.random() < 0.5 ? "life" : "points",
            rotation: 0,
          });
        }

        // Update and draw solar flares
        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: (p.rotation || 0) + 0.1,
          }))
          .filter((p) => {
            const distance = Math.sqrt(
              (p.x - playerPos.x) ** 2 +
                (p.y - playerPos.y) ** 2,
            );
            if (distance < 70) {
              setScore((s) => s + p.energy);
              playSound("collect");
              return false;
            }
            if (p.y > canvas.height + 50) {
              setLives((l) => Math.max(0, l - 1));
              if (lives <= 1) setGameState("gameOver");
              return false;
            }
            return true;
          });

        // Draw solar flares with glow effect
        particlesRef.current.forEach((p) => {
          ctx.save();
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.glow;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.shadowBlur = 5;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Update and draw power-ups
        powerUpsRef.current = powerUpsRef.current
          .map((p) => ({
            ...p,
            y: p.y + p.vy,
            rotation: p.rotation + 0.2,
          }))
          .filter((p) => {
            const distance = Math.sqrt(
              (p.x - playerPos.x) ** 2 +
                (p.y - playerPos.y) ** 2,
            );
            if (distance < 60) {
              if (p.type === "life") {
                setLives((l) => l + 1);
                playSound("power-up");
              } else {
                setScore((s) => s + 100);
                playSound("bonus");
              }
              return false;
            }
            return p.y < canvas.height + 50;
          });

        // Draw power-ups
        powerUpsRef.current.forEach((p) => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.shadowBlur = 15;

          if (p.type === "life") {
            ctx.shadowColor = "#ff0066";
            ctx.fillStyle = "#ff0066";
            // Heart shape
            ctx.beginPath();
            ctx.moveTo(0, p.size * 0.3);
            ctx.bezierCurveTo(
              -p.size * 0.5,
              -p.size * 0.2,
              -p.size * 0.8,
              p.size * 0.1,
              0,
              p.size * 0.8,
            );
            ctx.bezierCurveTo(
              p.size * 0.8,
              p.size * 0.1,
              p.size * 0.5,
              -p.size * 0.2,
              0,
              p.size * 0.3,
            );
            ctx.fill();
          } else {
            ctx.shadowColor = "#00ff88";
            ctx.fillStyle = "#00ff88";
            // Star shape
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
              const x = Math.cos(angle) * p.size;
              const y = Math.sin(angle) * p.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);

              const innerAngle =
                ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
              const innerX =
                Math.cos(innerAngle) * (p.size * 0.4);
              const innerY =
                Math.sin(innerAngle) * (p.size * 0.4);
              ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        });

        // Draw player with enhanced glow
        ctx.save();
        ctx.shadowColor = "#00aaff";
        ctx.shadowBlur = 30;
        ctx.fillStyle = "#00aaff";
        ctx.beginPath();
        ctx.arc(playerPos.x, playerPos.y, 50, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 15;
        ctx.fillStyle = "#66ccff";
        ctx.beginPath();
        ctx.arc(playerPos.x, playerPos.y, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 5;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(playerPos.x, playerPos.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Enhanced UI
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, 80);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 28px Arial";
        ctx.fillText(`🌟 Score: ${score}`, 30, 40);
        ctx.fillText(`💖 Lives: ${lives}`, 250, 40);
        ctx.fillText(`⏱️ Time: ${timeLeft}s`, 450, 40);

        ctx.fillStyle = "#ffdd00";
        ctx.font = "bold 20px Arial";
        ctx.fillText(
          "Move mouse to catch solar flares!",
          30,
          65,
        );
        ctx.restore();

        if (gameState === "playing") {
          animationRef.current =
            requestAnimationFrame(gameLoop);
        }
      };

      gameLoop();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [gameState, score, lives, timeLeft, playerPos]);

    // Timer
    useEffect(() => {
      if (gameState !== "playing") return;

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState("gameOver");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [gameState]);

    // Mouse controls
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || gameState !== "playing") return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        setPlayerPos({
          x: Math.max(60, Math.min(canvas.width - 60, mouseX)),
          y: Math.max(
            140,
            Math.min(canvas.height - 60, mouseY),
          ),
        });
      };

      canvas.addEventListener("mousemove", handleMouseMove);

      return () => {
        canvas.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
      };
    }, [gameState]);

    if (gameState === "gameOver") {
      return (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold text-white mb-6">
              🎉 AMAZING JOB! 🎉
            </h2>
            <div className="text-8xl font-bold text-yellow-400 mb-6">
              {score}
            </div>
            <p className="text-white text-3xl mb-8">
              Fantastic Final Score!
            </p>

            <div className="flex justify-center gap-6">
              <Button
                onClick={() => {
                  setGameState("playing");
                  setScore(0);
                  setLives(5);
                  setTimeLeft(90);
                  particlesRef.current = [];
                  powerUpsRef.current = [];
                  playSound("click");
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 text-3xl rounded-2xl font-bold shadow-xl"
              >
                🚀 Play Again!
              </Button>

              <Button
                onClick={() => setSelectedGame(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-3xl rounded-2xl font-bold shadow-xl"
              >
                🎮 More Games
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            🌟 SOLAR FLARE CATCHER! 🌟
          </h2>
          <p className="text-white text-2xl">
            Move your mouse to catch the magical solar flares
            and power-ups!
          </p>
        </div>

        <Card className="bg-black border-4 border-white/40 overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full cursor-none"
            />
          </CardContent>
        </Card>

        <div className="flex justify-center gap-6">
          <Button
            onClick={() =>
              setGameState(
                gameState === "paused" ? "playing" : "paused",
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-2xl rounded-2xl font-bold shadow-xl"
          >
            {gameState === "paused" ? (
              <Play className="w-6 h-6 mr-3" />
            ) : (
              <Pause className="w-6 h-6 mr-3" />
            )}
            {gameState === "paused" ? "Resume" : "Pause"}
          </Button>

          <Button
            onClick={() => setSelectedGame(null)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-2xl rounded-2xl font-bold shadow-xl"
          >
            <Home className="w-6 h-6 mr-3" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  };

  // Enhanced Aurora Creator
  const AuroraCreator = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedColor, setSelectedColor] =
      useState("#00ff88");
    const [brushSize, setBrushSize] = useState(50);
    const [isDrawing, setIsDrawing] = useState(false);
    const [creationMode, setCreationMode] = useState<
      "paint" | "fireworks"
    >("paint");
    const particlesRef = useRef<any[]>([]);

    const colors = [
      {
        name: "Aurora Green",
        color: "#00ff88",
        gas: "Oxygen",
        description: "Classic northern lights!",
      },
      {
        name: "Electric Blue",
        color: "#0088ff",
        gas: "Nitrogen",
        description: "Brilliant blue glow!",
      },
      {
        name: "Cosmic Purple",
        color: "#8800ff",
        gas: "Helium",
        description: "Mysterious purple!",
      },
      {
        name: "Solar Pink",
        color: "#ff0088",
        gas: "Hydrogen",
        description: "Vibrant pink magic!",
      },
      {
        name: "Golden Sun",
        color: "#ffaa00",
        gas: "Neon",
        description: "Warm golden light!",
      },
      {
        name: "Cyan Dream",
        color: "#00ffff",
        gas: "Argon",
        description: "Cool cyan waves!",
      },
    ];

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationId: number;

      const animate = () => {
        // Gradient sky background
        const gradient = ctx.createLinearGradient(
          0,
          0,
          0,
          canvas.height,
        );
        gradient.addColorStop(0, "#0a0a2e");
        gradient.addColorStop(0.7, "#1a1a4e");
        gradient.addColorStop(1, "#000");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated stars
        for (let i = 0; i < 150; i++) {
          const x = (i * 67) % canvas.width;
          const y = (i * 43) % (canvas.height * 0.7);
          const brightness =
            0.3 + Math.sin(Date.now() * 0.002 + i) * 0.5;
          const size =
            1 + Math.sin(Date.now() * 0.001 + i) * 1.5;
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          ctx.fillRect(x, y, size, size);
        }

        // Update and draw aurora particles
        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            alpha: p.alpha * 0.998,
            y: p.y + Math.sin(Date.now() * 0.003 + p.id) * 0.8,
            x:
              p.x +
              Math.sin(Date.now() * 0.002 + p.id * 2) * 0.3,
          }))
          .filter((p) => p.alpha > 0.02);

        particlesRef.current.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.size;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Enhanced ground with trees
        const groundGradient = ctx.createLinearGradient(
          0,
          canvas.height - 100,
          0,
          canvas.height,
        );
        groundGradient.addColorStop(0, "#001122");
        groundGradient.addColorStop(1, "#000");
        ctx.fillStyle = groundGradient;
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

        // Draw trees with more detail
        for (let i = 0; i < 12; i++) {
          const x = (i * canvas.width) / 12;
          const height = 60 + Math.sin(i) * 20;

          // Tree trunk
          ctx.fillStyle = "#000";
          ctx.fillRect(x, canvas.height - height, 10, height);

          // Tree top
          ctx.beginPath();
          ctx.moveTo(x - 20, canvas.height - height);
          ctx.lineTo(x + 5, canvas.height - height - 30);
          ctx.lineTo(x + 30, canvas.height - height);
          ctx.closePath();
          ctx.fill();
        }

        animationId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }, []);

    const handleCanvasInteraction = (
      e: React.MouseEvent<HTMLCanvasElement>,
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      if (creationMode === "fireworks") {
        // Create firework explosion
        for (let i = 0; i < 30; i++) {
          const angle = (Math.PI * 2 * i) / 30;
          const speed = Math.random() * 5 + 2;
          const size = Math.random() * 8 + 4;

          particlesRef.current.push({
            id: Math.random(),
            x: x + Math.cos(angle) * speed * 3,
            y: y + Math.sin(angle) * speed * 3,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: size,
            color: selectedColor,
            alpha: 1,
          });
        }
      } else {
        // Paint mode
        const particleCount = Math.max(
          5,
          Math.floor(brushSize / 8),
        );

        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount;
          const radius = Math.random() * (brushSize / 2);
          const offsetX = Math.cos(angle) * radius;
          const offsetY = Math.sin(angle) * radius;

          particlesRef.current.push({
            id: Math.random(),
            x: x + offsetX,
            y: y + offsetY,
            size:
              brushSize / 6 + Math.random() * (brushSize / 4),
            color: selectedColor,
            alpha: 0.9 + Math.random() * 0.1,
          });
        }
      }

      playSound("paint");
    };

    const clearCanvas = () => {
      particlesRef.current = [];
      playSound("erase");
    };

    const saveArt = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const link = document.createElement("a");
      link.download = `my-aurora-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      playSound("save");
    };

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            🎨 MAGICAL AURORA CREATOR! 🌈
          </h2>
          <p className="text-3xl text-white/95 font-bold">
            Create spectacular northern lights! Choose colors
            and paint the cosmic sky!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="bg-black rounded-3xl overflow-hidden border-4 border-white/40 shadow-2xl">
              <CardContent className="p-0 relative">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={700}
                  className="w-full cursor-crosshair"
                  onClick={handleCanvasInteraction}
                  onMouseDown={(e) => {
                    setIsDrawing(true);
                    handleCanvasInteraction(e);
                  }}
                  onMouseUp={() => setIsDrawing(false)}
                  onMouseLeave={() => setIsDrawing(false)}
                  onMouseMove={(e) => {
                    if (isDrawing) {
                      handleCanvasInteraction(e);
                    }
                  }}
                />

                <div className="absolute bottom-6 left-6 flex gap-4">
                  <Button
                    onClick={clearCanvas}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl"
                  >
                    <RotateCcw className="w-6 h-6" />
                    Clear Sky
                  </Button>

                  <Button
                    onClick={saveArt}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl"
                  >
                    <Download className="w-6 h-6" />
                    Save Art
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-xl">
              <h3 className="text-white font-bold text-3xl mb-6 flex items-center gap-3">
                <Palette className="w-8 h-8" />
                Creation Mode
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => setCreationMode("paint")}
                  className={`p-6 rounded-2xl font-bold text-center transition-all ${
                    creationMode === "paint"
                      ? "bg-blue-500 ring-4 ring-white scale-105"
                      : "bg-blue-400 hover:scale-102"
                  }`}
                >
                  <div className="text-white text-2xl">
                    🖌️ Paint Mode
                  </div>
                  <div className="text-white/90 text-lg">
                    Smooth painting
                  </div>
                </button>

                <button
                  onClick={() => setCreationMode("fireworks")}
                  className={`p-6 rounded-2xl font-bold text-center transition-all ${
                    creationMode === "fireworks"
                      ? "bg-purple-500 ring-4 ring-white scale-105"
                      : "bg-purple-400 hover:scale-102"
                  }`}
                >
                  <div className="text-white text-2xl">
                    🎆 Fireworks Mode
                  </div>
                  <div className="text-white/90 text-lg">
                    Aurora explosions
                  </div>
                </button>
              </div>
            </Card>

            <Card className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-xl">
              <h3 className="text-white font-bold text-3xl mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                Aurora Colors
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.color}
                    onClick={() => {
                      setSelectedColor(color.color);
                      playSound("click");
                    }}
                    className={`p-4 rounded-2xl font-bold text-center transition-all ${
                      selectedColor === color.color
                        ? "ring-4 ring-white scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    <div className="text-white drop-shadow-lg">
                      <div className="font-bold text-lg">
                        {color.name}
                      </div>
                      <div className="text-sm opacity-90">
                        {color.gas}
                      </div>
                      <div className="text-xs opacity-80">
                        {color.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {creationMode === "paint" && (
              <Card className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 border-4 border-white/40 shadow-xl">
                <h3 className="text-white font-bold text-3xl mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8" />
                  Brush Size
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div
                      className="rounded-full border-4 border-white shadow-lg"
                      style={{
                        backgroundColor: selectedColor,
                        width: `${Math.min(brushSize, 80)}px`,
                        height: `${Math.min(brushSize, 80)}px`,
                        boxShadow: `0 0 20px ${selectedColor}`,
                      }}
                    />
                  </div>

                  <input
                    type="range"
                    min="20"
                    max="120"
                    value={brushSize}
                    onChange={(e) =>
                      setBrushSize(Number(e.target.value))
                    }
                    className="w-full h-8 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${selectedColor}, ${selectedColor})`,
                    }}
                  />

                  <div className="text-white text-center font-bold text-3xl">
                    {brushSize}px
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Space Navigator Game
  const SpaceNavigator = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const [gameState, setGameState] = useState<
      "playing" | "paused" | "gameOver"
    >("playing");
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [fuel, setFuel] = useState(100);
    const [playerPos, setPlayerPos] = useState({
      x: 400,
      y: 500,
    });
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const keysPressed = useRef<Set<string>>(new Set());
    const obstaclesRef = useRef<any[]>([]);
    const collectiblesRef = useRef<any[]>([]);

    // Key handling
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

    useEffect(() => {
      if (gameState !== "playing") return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gameLoop = () => {
        // Space background
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width,
        );
        gradient.addColorStop(0, "#1a1a4e");
        gradient.addColorStop(1, "#0a0a2e");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Moving stars
        for (let i = 0; i < 100; i++) {
          const x = (i * 67 + Date.now() * 0.05) % canvas.width;
          const y = (i * 43) % canvas.height;
          const brightness =
            0.3 + Math.sin(Date.now() * 0.001 + i) * 0.4;
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
          ctx.fillRect(x, y, 2, 2);
        }

        // Handle input
        let thrustX = 0,
          thrustY = 0;
        if (
          keysPressed.current.has("arrowleft") ||
          keysPressed.current.has("a")
        )
          thrustX = -0.5;
        if (
          keysPressed.current.has("arrowright") ||
          keysPressed.current.has("d")
        )
          thrustX = 0.5;
        if (
          keysPressed.current.has("arrowup") ||
          keysPressed.current.has("w")
        )
          thrustY = -0.5;
        if (
          keysPressed.current.has("arrowdown") ||
          keysPressed.current.has("s")
        )
          thrustY = 0.5;

        if (thrustX !== 0 || thrustY !== 0) {
          setFuel((f) => Math.max(0, f - 0.2));
          if (fuel > 0) {
            setVelocity((v) => ({
              x: Math.max(-8, Math.min(8, v.x + thrustX)),
              y: Math.max(-8, Math.min(8, v.y + thrustY)),
            }));
          }
        }

        // Apply physics
        setPlayerPos((pos) => ({
          x: Math.max(
            50,
            Math.min(canvas.width - 50, pos.x + velocity.x),
          ),
          y: Math.max(
            50,
            Math.min(canvas.height - 50, pos.y + velocity.y),
          ),
        }));

        setVelocity((v) => ({
          x: v.x * 0.98,
          y: v.y * 0.98,
        }));

        // Spawn obstacles
        if (Math.random() < 0.02) {
          obstaclesRef.current.push({
            id: Math.random(),
            x: Math.random() * canvas.width,
            y: -30,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 30 + 20,
            type: "asteroid",
            rotation: 0,
          });
        }

        // Spawn collectibles
        if (Math.random() < 0.015) {
          collectiblesRef.current.push({
            id: Math.random(),
            x: Math.random() * canvas.width,
            y: -20,
            vy: 2,
            size: 20,
            type: Math.random() < 0.3 ? "fuel" : "star",
            rotation: 0,
          });
        }

        // Update obstacles
        obstaclesRef.current = obstaclesRef.current
          .map((obs) => ({
            ...obs,
            y: obs.y + obs.vy,
            rotation: obs.rotation + 0.05,
          }))
          .filter((obs) => {
            const distance = Math.sqrt(
              (obs.x - playerPos.x) ** 2 +
                (obs.y - playerPos.y) ** 2,
            );
            if (distance < obs.size + 40) {
              setLives((l) => l - 1);
              if (lives <= 1) setGameState("gameOver");
              playSound("hit");
              return false;
            }
            return obs.y < canvas.height + 50;
          });

        // Update collectibles
        collectiblesRef.current = collectiblesRef.current
          .map((col) => ({
            ...col,
            y: col.y + col.vy,
            rotation: col.rotation + 0.1,
          }))
          .filter((col) => {
            const distance = Math.sqrt(
              (col.x - playerPos.x) ** 2 +
                (col.y - playerPos.y) ** 2,
            );
            if (distance < col.size + 40) {
              if (col.type === "fuel") {
                setFuel((f) => Math.min(100, f + 20));
                playSound("fuel");
              } else {
                setScore((s) => s + 100);
                playSound("collect");
              }
              return false;
            }
            return col.y < canvas.height + 50;
          });

        // Draw obstacles
        obstaclesRef.current.forEach((obs) => {
          ctx.save();
          ctx.translate(obs.x, obs.y);
          ctx.rotate(obs.rotation);
          ctx.fillStyle = "#ff4444";
          ctx.shadowColor = "#ff4444";
          ctx.shadowBlur = 15;

          // Draw asteroid
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const radius =
              obs.size * (0.8 + Math.sin(i * 3) * 0.2);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });

        // Draw collectibles
        collectiblesRef.current.forEach((col) => {
          ctx.save();
          ctx.translate(col.x, col.y);
          ctx.rotate(col.rotation);

          if (col.type === "fuel") {
            ctx.fillStyle = "#00ff88";
            ctx.shadowColor = "#00ff88";
            ctx.shadowBlur = 20;
            // Draw fuel tank
            ctx.fillRect(
              -col.size / 2,
              -col.size / 2,
              col.size,
              col.size,
            );
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
              -col.size / 4,
              -col.size / 4,
              col.size / 2,
              col.size / 2,
            );
          } else {
            ctx.fillStyle = "#ffdd00";
            ctx.shadowColor = "#ffdd00";
            ctx.shadowBlur = 20;
            // Draw star
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
              const x = Math.cos(angle) * col.size;
              const y = Math.sin(angle) * col.size;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);

              const innerAngle =
                ((i + 0.5) * Math.PI * 2) / 5 - Math.PI / 2;
              const innerX =
                Math.cos(innerAngle) * (col.size * 0.4);
              const innerY =
                Math.sin(innerAngle) * (col.size * 0.4);
              ctx.lineTo(innerX, innerY);
            }
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        });

        // Draw spaceship with thrust effects
        ctx.save();
        ctx.translate(playerPos.x, playerPos.y);

        // Thrust effects
        if ((thrustX !== 0 || thrustY !== 0) && fuel > 0) {
          ctx.fillStyle = "#00aaff";
          ctx.shadowColor = "#00aaff";
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(-20, 0, 15, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(-20, 0, 8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Spaceship body
        ctx.fillStyle = "#4488ff";
        ctx.shadowColor = "#4488ff";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(30, 0);
        ctx.lineTo(-20, -15);
        ctx.lineTo(-15, 0);
        ctx.lineTo(-20, 15);
        ctx.closePath();
        ctx.fill();

        // Cockpit
        ctx.fillStyle = "#88ccff";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Enhanced UI
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, 100);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px Arial";
        ctx.fillText(`⭐ Score: ${score}`, 30, 40);
        ctx.fillText(`💖 Lives: ${lives}`, 200, 40);

        // Fuel bar
        ctx.fillStyle = "#666";
        ctx.fillRect(400, 20, 200, 20);
        ctx.fillStyle = fuel > 30 ? "#00ff00" : "#ff4444";
        ctx.fillRect(402, 22, (fuel / 100) * 196, 16);
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`⛽ Fuel: ${Math.round(fuel)}%`, 400, 60);

        ctx.fillStyle = "#ffdd00";
        ctx.font = "bold 18px Arial";
        ctx.fillText("Use WASD or Arrow Keys to fly!", 30, 80);
        ctx.restore();

        setScore((s) => s + 1);

        if (gameState === "playing") {
          animationRef.current =
            requestAnimationFrame(gameLoop);
        }
      };

      gameLoop();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [gameState, playerPos, velocity, fuel, lives, score]);

    if (gameState === "gameOver") {
      return (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold text-white mb-6">
              🚀 STELLAR JOURNEY! 🚀
            </h2>
            <div className="text-8xl font-bold text-cyan-400 mb-6">
              {score}
            </div>
            <p className="text-white text-3xl mb-8">
              Amazing Space Navigation!
            </p>

            <div className="flex justify-center gap-6">
              <Button
                onClick={() => {
                  setGameState("playing");
                  setScore(0);
                  setLives(3);
                  setFuel(100);
                  setPlayerPos({ x: 400, y: 500 });
                  setVelocity({ x: 0, y: 0 });
                  obstaclesRef.current = [];
                  collectiblesRef.current = [];
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 text-3xl rounded-2xl font-bold shadow-xl"
              >
                🚀 Fly Again!
              </Button>

              <Button
                onClick={() => setSelectedGame(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-3xl rounded-2xl font-bold shadow-xl"
              >
                🎮 More Games
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            🚀 SPACE SHIP ADVENTURE! 🚀
          </h2>
          <p className="text-white text-2xl">
            Navigate through space! Use WASD or Arrow Keys to
            fly!
          </p>
        </div>

        <Card className="bg-black border-4 border-white/40 overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full"
              tabIndex={0}
            />
          </CardContent>
        </Card>

        <div className="flex justify-center gap-6">
          <Button
            onClick={() =>
              setGameState(
                gameState === "paused" ? "playing" : "paused",
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-2xl rounded-2xl font-bold shadow-xl"
          >
            {gameState === "paused" ? (
              <Play className="w-6 h-6 mr-3" />
            ) : (
              <Pause className="w-6 h-6 mr-3" />
            )}
            {gameState === "paused" ? "Resume" : "Pause"}
          </Button>

          <Button
            onClick={() => setSelectedGame(null)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-2xl rounded-2xl font-bold shadow-xl"
          >
            <Home className="w-6 h-6 mr-3" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  };

  // Satellite Defense Game
  const SatelliteDefense = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const [gameState, setGameState] = useState<
      "playing" | "paused" | "gameOver"
    >("playing");
    const [score, setScore] = useState(0);
    const [shieldEnergy, setShieldEnergy] = useState(100);
    const [satellitesLeft, setSatellitesLeft] = useState(5);
    const [mousePos, setMousePos] = useState({
      x: 400,
      y: 300,
    });
    const threatsRef = useRef<any[]>([]);
    const satellitesRef = useRef<any[]>([
      { id: 1, x: 150, y: 150, health: 100, protected: false },
      { id: 2, x: 650, y: 150, health: 100, protected: false },
      { id: 3, x: 400, y: 100, health: 100, protected: false },
      { id: 4, x: 200, y: 400, health: 100, protected: false },
      { id: 5, x: 600, y: 400, health: 100, protected: false },
    ]);

    useEffect(() => {
      if (gameState !== "playing") return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const gameLoop = () => {
        // Space background
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width,
        );
        gradient.addColorStop(0, "#001122");
        gradient.addColorStop(1, "#000008");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Earth in center
        ctx.save();
        ctx.fillStyle = "#4488cc";
        ctx.shadowColor = "#4488cc";
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          80,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.fillStyle = "#22aa44";
        ctx.shadowBlur = 15;
        // Draw continents
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2 - 20,
          canvas.height / 2 - 20,
          25,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          canvas.width / 2 + 30,
          canvas.height / 2 + 10,
          20,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.restore();

        // Spawn space weather threats
        if (Math.random() < 0.02) {
          const angle = Math.random() * Math.PI * 2;
          const startDistance = 400;
          threatsRef.current.push({
            id: Math.random(),
            x:
              canvas.width / 2 +
              Math.cos(angle) * startDistance,
            y:
              canvas.height / 2 +
              Math.sin(angle) * startDistance,
            targetX: canvas.width / 2,
            targetY: canvas.height / 2,
            speed: 1 + Math.random(),
            size: 15 + Math.random() * 10,
            type: Math.random() < 0.6 ? "flare" : "particle",
            energy: 20,
          });
        }

        // Update threats
        threatsRef.current = threatsRef.current
          .map((threat) => {
            const dx = threat.targetX - threat.x;
            const dy = threat.targetY - threat.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 5) {
              return {
                ...threat,
                x: threat.x + (dx / distance) * threat.speed,
                y: threat.y + (dy / distance) * threat.speed,
              };
            }
            return threat;
          })
          .filter((threat) => {
            // Check if threat hits satellites
            let blocked = false;
            satellitesRef.current = satellitesRef.current.map(
              (sat) => {
                const satDistance = Math.sqrt(
                  (threat.x - sat.x) ** 2 +
                    (threat.y - sat.y) ** 2,
                );
                if (satDistance < 60 && !sat.protected) {
                  return {
                    ...sat,
                    health: Math.max(
                      0,
                      sat.health - threat.energy,
                    ),
                  };
                }
                return sat;
              },
            );

            // Check if threat is blocked by shield
            const shieldDistance = Math.sqrt(
              (threat.x - mousePos.x) ** 2 +
                (threat.y - mousePos.y) ** 2,
            );
            if (shieldDistance < 80) {
              setShieldEnergy((e) => Math.max(0, e - 5));
              setScore((s) => s + 50);
              playSound("shield");
              blocked = true;
            }

            // Check if threat reaches Earth
            const earthDistance = Math.sqrt(
              (threat.x - canvas.width / 2) ** 2 +
                (threat.y - canvas.height / 2) ** 2,
            );
            if (earthDistance < 100) {
              blocked = true;
            }

            return !blocked;
          });

        // Update satellite count
        const activeSatellites = satellitesRef.current.filter(
          (sat) => sat.health > 0,
        ).length;
        setSatellitesLeft(activeSatellites);

        if (activeSatellites === 0) {
          setGameState("gameOver");
        }

        // Draw threats
        threatsRef.current.forEach((threat) => {
          ctx.save();
          if (threat.type === "flare") {
            ctx.fillStyle = "#ffaa00";
            ctx.shadowColor = "#ffaa00";
            ctx.shadowBlur = 20;
          } else {
            ctx.fillStyle = "#ff4444";
            ctx.shadowColor = "#ff4444";
            ctx.shadowBlur = 15;
          }
          ctx.beginPath();
          ctx.arc(
            threat.x,
            threat.y,
            threat.size,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          // Trail effect
          ctx.strokeStyle =
            threat.type === "flare" ? "#ffaa00" : "#ff4444";
          ctx.lineWidth = 3;
          ctx.globalAlpha = 0.5;
          ctx.beginPath();
          ctx.moveTo(threat.x, threat.y);
          ctx.lineTo(
            threat.x - (threat.targetX - threat.x) * 0.1,
            threat.y - (threat.targetY - threat.y) * 0.1,
          );
          ctx.stroke();
          ctx.restore();
        });

        // Draw satellites
        satellitesRef.current.forEach((sat) => {
          ctx.save();
          ctx.translate(sat.x, sat.y);

          if (sat.health > 0) {
            // Satellite body
            ctx.fillStyle =
              sat.health > 50 ? "#00aaff" : "#ff8800";
            ctx.shadowColor =
              sat.health > 50 ? "#00aaff" : "#ff8800";
            ctx.shadowBlur = 20;
            ctx.fillRect(-15, -8, 30, 16);

            // Solar panels
            ctx.fillStyle = "#444";
            ctx.fillRect(-25, -12, 15, 24);
            ctx.fillRect(10, -12, 15, 24);

            // Health bar
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(-20, -30, 40, 8);
            ctx.fillStyle =
              sat.health > 50
                ? "#00ff00"
                : sat.health > 25
                  ? "#ffaa00"
                  : "#ff0000";
            ctx.fillRect(-18, -28, (sat.health / 100) * 36, 4);
          } else {
            // Destroyed satellite
            ctx.fillStyle = "#666";
            ctx.fillRect(-10, -5, 20, 10);
          }

          ctx.restore();
        });

        // Draw shield at mouse position
        if (shieldEnergy > 0) {
          ctx.save();
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = "#00ffaa";
          ctx.shadowColor = "#00ffaa";
          ctx.shadowBlur = 30;
          ctx.beginPath();
          ctx.arc(mousePos.x, mousePos.y, 80, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalAlpha = 0.3;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(mousePos.x, mousePos.y, 60, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // UI
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, 80);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Arial";
        ctx.fillText(
          `🛰️ Satellites: ${satellitesLeft}`,
          30,
          35,
        );
        ctx.fillText(`⭐ Score: ${score}`, 200, 35);

        // Shield energy bar
        ctx.fillText(
          `🛡️ Shield: ${Math.round(shieldEnergy)}%`,
          350,
          35,
        );
        ctx.fillStyle = "#666";
        ctx.fillRect(350, 45, 150, 15);
        ctx.fillStyle =
          shieldEnergy > 30 ? "#00ff00" : "#ff4444";
        ctx.fillRect(352, 47, (shieldEnergy / 100) * 146, 11);

        ctx.fillStyle = "#ffdd00";
        ctx.font = "bold 16px Arial";
        ctx.fillText(
          "Move mouse to position shield and protect satellites!",
          30,
          70,
        );
        ctx.restore();

        setScore((s) => s + 5);
        if (shieldEnergy < 100)
          setShieldEnergy((e) => Math.min(100, e + 0.1));

        if (gameState === "playing") {
          animationRef.current =
            requestAnimationFrame(gameLoop);
        }
      };

      gameLoop();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [
      gameState,
      mousePos,
      shieldEnergy,
      satellitesLeft,
      score,
    ]);

    // Mouse controls
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || gameState !== "playing") return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const mouseX = (e.clientX - rect.left) * scaleX;
        const mouseY = (e.clientY - rect.top) * scaleY;

        setMousePos({ x: mouseX, y: mouseY });
      };

      canvas.addEventListener("mousemove", handleMouseMove);

      return () => {
        canvas.removeEventListener(
          "mousemove",
          handleMouseMove,
        );
      };
    }, [gameState]);

    if (gameState === "gameOver") {
      return (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-bold text-white mb-6">
              🛰️ MISSION COMPLETE! 🛰️
            </h2>
            <div className="text-8xl font-bold text-green-400 mb-6">
              {score}
            </div>
            <p className="text-white text-3xl mb-8">
              Excellent Defense Strategy!
            </p>

            <div className="flex justify-center gap-6">
              <Button
                onClick={() => {
                  setGameState("playing");
                  setScore(0);
                  setShieldEnergy(100);
                  setSatellitesLeft(5);
                  threatsRef.current = [];
                  satellitesRef.current = [
                    {
                      id: 1,
                      x: 150,
                      y: 150,
                      health: 100,
                      protected: false,
                    },
                    {
                      id: 2,
                      x: 650,
                      y: 150,
                      health: 100,
                      protected: false,
                    },
                    {
                      id: 3,
                      x: 400,
                      y: 100,
                      health: 100,
                      protected: false,
                    },
                    {
                      id: 4,
                      x: 200,
                      y: 400,
                      health: 100,
                      protected: false,
                    },
                    {
                      id: 5,
                      x: 600,
                      y: 400,
                      health: 100,
                      protected: false,
                    },
                  ];
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 text-3xl rounded-2xl font-bold shadow-xl"
              >
                🚀 Defend Again!
              </Button>

              <Button
                onClick={() => setSelectedGame(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-3xl rounded-2xl font-bold shadow-xl"
              >
                🎮 More Games
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            🛰️ SATELLITE PROTECTOR! 🛰️
          </h2>
          <p className="text-white text-2xl">
            Move your mouse to position the shield and protect
            Earth's satellites!
          </p>
        </div>

        <Card className="bg-black border-4 border-white/40 overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="w-full cursor-none"
            />
          </CardContent>
        </Card>

        <div className="flex justify-center gap-6">
          <Button
            onClick={() =>
              setGameState(
                gameState === "paused" ? "playing" : "paused",
              )
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-2xl rounded-2xl font-bold shadow-xl"
          >
            {gameState === "paused" ? (
              <Play className="w-6 h-6 mr-3" />
            ) : (
              <Pause className="w-6 h-6 mr-3" />
            )}
            {gameState === "paused" ? "Resume" : "Pause"}
          </Button>

          <Button
            onClick={() => setSelectedGame(null)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-2xl rounded-2xl font-bold shadow-xl"
          >
            <Home className="w-6 h-6 mr-3" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  };

  // Render selected game
  const renderSelectedGame = () => {
    switch (selectedGame) {
      case "solar-flare-catcher":
        return <SolarFlareCatcher />;
      case "aurora-creator":
        return <AuroraCreator />;
      case "cosmic-dodger":
        return <SpaceNavigator />;
      case "satellite-defense":
        return <SatelliteDefense />;
      default:
        return null;
    }
  };

  // Main component render
  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0.2, 0.8, 0.2],
                rotate: [0, 360],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              {i % 4 === 0 ? (
                <Stars className="w-8 h-8 text-yellow-300" />
              ) : i % 4 === 1 ? (
                <Sparkles className="w-6 h-6 text-pink-300" />
              ) : i % 4 === 2 ? (
                <Rocket className="w-7 h-7 text-cyan-300" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-300 to-blue-300" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={() => {
                playSound("click");
                onBack();
              }}
              className="flex items-center gap-3 bg-white/25 backdrop-blur-lg hover:bg-white/35 text-white border-4 border-white/40 text-2xl px-8 py-4 rounded-2xl font-bold shadow-xl"
            >
              <ChevronLeft className="w-6 h-6" />
              Back to Home
            </Button>
          </div>

          {renderGameSelection()}
        </div>
      </div>
    );
  }

  // Render selected game
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0.1, 0.6, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Stars className="w-6 h-6 text-white/30" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => {
              playSound("click");
              setSelectedGame(null);
            }}
            className="flex items-center gap-3 bg-white/25 backdrop-blur-lg hover:bg-white/35 text-white border-4 border-white/40 text-2xl px-8 py-4 rounded-2xl font-bold shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
            Back to Games
          </Button>
        </div>

        {renderSelectedGame()}
      </div>
    </div>
  );
}