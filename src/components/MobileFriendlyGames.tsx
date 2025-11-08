import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Gamepad2,
  Sun,
  Zap,
  Home,
  Trophy,
  Star,
  Coins,
  RotateCcw,
  Play,
  Pause,
  Target,
  Heart,
  Rocket,
  ChevronLeft,
  Crown,
  Award,
  Timer,
  MousePointer,
  TrendingUp
} from 'lucide-react';

interface MobileFriendlyGamesProps {
  playerName: string;
  onBack: () => void;
}

export default function MobileFriendlyGames({
  playerName,
  onBack
}: MobileFriendlyGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [cosmicCoins, setCosmicCoins] = useState(187);

  const games = [
    {
      id: 'solar-flare',
      title: 'Solar Flare Catcher',
      description: 'Catch magical solar flares!',
      icon: '☀️',
      gradient: 'from-yellow-400 to-orange-500',
      difficulty: 'Easy',
      coins: 50
    },
    {
      id: 'aurora-defender',
      title: 'Aurora Defender',
      description: 'Protect Earth from space storms!',
      icon: '🌈',
      gradient: 'from-green-400 to-blue-500',
      difficulty: 'Medium',
      coins: 75
    },
    {
      id: 'satellite-rescue',
      title: 'Satellite Rescue',
      description: 'Save satellites from radiation!',
      icon: '🛰️',
      gradient: 'from-purple-400 to-pink-500',
      difficulty: 'Hard',
      coins: 100
    }
  ];

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
        collect: 600,
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

  // Solar Flare Game Component
  const SolarFlareGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [flares, setFlares] = useState<Array<{ x: number; y: number; speed: number }>>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
      if (!isPlaying || gameOver) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const createFlare = () => {
        return {
          x: Math.random() * canvas.width,
          y: -20,
          speed: 2 + Math.random() * 3
        };
      };

      const gameLoop = () => {
        // Clear canvas
        ctx.fillStyle = '#1a1a3e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add stars
        ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
          const x = (i * 37) % canvas.width;
          const y = (i * 51) % canvas.height;
          ctx.fillRect(x, y, 2, 2);
        }

        // Update and draw flares
        setFlares(prevFlares => {
          const newFlares = prevFlares
            .map(flare => ({ ...flare, y: flare.y + flare.speed }))
            .filter(flare => flare.y < canvas.height + 20);

          // Draw flares
          newFlares.forEach(flare => {
            const gradient = ctx.createRadialGradient(flare.x, flare.y, 0, flare.x, flare.y, 15);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.5, '#ff0');
            gradient.addColorStop(1, '#f80');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(flare.x, flare.y, 15, 0, Math.PI * 2);
            ctx.fill();
          });

          // Add new flares randomly
          if (Math.random() < 0.03 && newFlares.length < 8) {
            newFlares.push(createFlare());
          }

          // Check for flares that went off screen
          const lostFlares = prevFlares.length - newFlares.filter(f => f.y < canvas.height).length;
          if (lostFlares > 0) {
            setLives(prev => {
              const newLives = Math.max(0, prev - lostFlares);
              if (newLives === 0) {
                setGameOver(true);
                setIsPlaying(false);
              }
              return newLives;
            });
          }

          return newFlares;
        });

        animationRef.current = requestAnimationFrame(gameLoop);
      };

      animationRef.current = requestAnimationFrame(gameLoop);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [isPlaying, gameOver]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isPlaying || gameOver) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      // Check if clicked on any flare
      setFlares(prevFlares => {
        const hitIndex = prevFlares.findIndex(flare => {
          const dx = x - flare.x;
          const dy = y - flare.y;
          return Math.sqrt(dx * dx + dy * dy) < 15;
        });

        if (hitIndex !== -1) {
          setScore(prev => prev + 10);
          playSound('collect');
          return prevFlares.filter((_, i) => i !== hitIndex);
        }

        return prevFlares;
      });
    };

    const startGame = () => {
      setScore(0);
      setLives(3);
      setGameOver(false);
      setFlares([]);
      setIsPlaying(true);
    };

    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'Easy': return 'bg-green-500';
        case 'Medium': return 'bg-yellow-500';
        case 'Hard': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };

    if (gameOver) {
      const earnedCoins = Math.floor(score / 2);
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl md:text-8xl mb-4">
              {score >= 100 ? '🏆' : '⭐'}
            </div>
            <h3 className="text-3xl md:text-5xl text-white mb-4">
              {score >= 100 ? 'Amazing!' : 'Good Try!'}
            </h3>
            <Card className="bg-white/10 border-4 border-cyan-400 mb-6">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
                  <div className="text-center">
                    <Star className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                    <p className="text-4xl md:text-6xl text-white mb-2">{score}</p>
                    <p className="text-lg md:text-xl text-cyan-200">Points</p>
                  </div>
                  <div className="text-center">
                    <Coins className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                    <p className="text-4xl md:text-6xl text-white mb-2">+{earnedCoins}</p>
                    <p className="text-lg md:text-xl text-cyan-200">Coins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg md:text-xl px-8 py-6 rounded-2xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button
                onClick={() => setSelectedGame(null)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg md:text-xl px-8 py-6 rounded-2xl"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Choose Game
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        {/* Game Header - Mobile Optimized */}
        <div className="flex items-center justify-between mb-3 md:mb-4 px-2 md:px-4">
          <div className="flex items-center gap-3 md:gap-4 bg-white/10 px-3 py-2 md:px-4 md:py-3 rounded-xl">
            <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
            <span className="text-white text-lg md:text-2xl">{score}</span>
          </div>

          <div className="flex gap-2">
            {[...Array(lives)].map((_, i) => (
              <Heart key={i} className="w-6 h-6 md:w-8 md:h-8 text-red-500 fill-current" />
            ))}
          </div>

          {!isPlaying && !gameOver && (
            <Button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Start
            </Button>
          )}
        </div>

        {/* Game Canvas - MUCH LARGER on Mobile */}
        <div className="flex-1 flex items-center justify-center px-2 md:px-4">
          <div className="relative w-full max-w-4xl">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onClick={handleCanvasClick}
              className="w-full h-auto border-4 border-cyan-400 rounded-2xl cursor-crosshair bg-gradient-to-b from-indigo-900 to-purple-900 shadow-2xl"
              style={{ 
                aspectRatio: '4/3',
                minHeight: '400px',
                maxHeight: '600px'
              }}
            />
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
                <div className="text-center">
                  <MousePointer className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-4" />
                  <p className="text-white text-xl md:text-2xl">
                    Click solar flares to catch them!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions - Mobile Optimized */}
        <div className="mt-3 md:mt-4 px-2 md:px-4">
          <Card className="bg-white/10 border-2 border-cyan-400/50">
            <CardContent className="p-3 md:p-4">
              <p className="text-white text-center text-sm md:text-lg">
                💡 <strong>Tip:</strong> Click the falling solar flares before they reach the bottom!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Game Player Screen
  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);
    if (!game) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-2 md:p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header - Mobile Optimized */}
          <div className="flex items-center justify-between mb-3 md:mb-6 gap-2">
            <Button
              onClick={() => setSelectedGame(null)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-xl flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>

            <div className="text-center flex-1 min-w-0">
              <h2 className="text-xl md:text-3xl text-white truncate">{game.title}</h2>
              <p className="text-xs md:text-base text-cyan-200 truncate">{game.description}</p>
            </div>

            <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 rounded-xl flex-shrink-0">
              <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-white text-sm md:text-base">{game.coins}</span>
            </div>
          </div>

          {/* Game Content - Takes up most of screen */}
          <div className="flex-1 min-h-0">
            <SolarFlareGame />
          </div>
        </div>
      </div>
    );
  }

  // Game Selection Screen - Mobile Optimized
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
              Cosmic Games
            </h1>
            <p className="text-sm md:text-xl text-cyan-200">
              Play fun space weather games!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-2 md:px-4 md:py-3 rounded-xl flex-shrink-0">
            <Coins className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
            <span className="text-white text-base md:text-xl">{cosmicCoins}</span>
          </div>
        </div>

        {/* Game Cards - Mobile Optimized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`bg-gradient-to-br ${game.gradient} border-2 md:border-4 border-white/30 shadow-2xl cursor-pointer h-full`}
                onClick={() => {
                  setSelectedGame(game.id);
                  playSound('click');
                }}
              >
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-5xl md:text-7xl">{game.icon}</span>
                    <Badge className={`${
                      game.difficulty === 'Easy' ? 'bg-green-500' :
                      game.difficulty === 'Medium' ? 'bg-yellow-500' :
                      'bg-red-500'
                    } text-white text-xs md:text-sm`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl md:text-2xl mb-2">
                    {game.title}
                  </CardTitle>
                  <p className="text-white/90 text-sm md:text-base">
                    {game.description}
                  </p>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="flex items-center justify-between mb-4 text-white/90 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
                      <span>Earn {game.coins} Coins</span>
                    </div>
                  </div>

                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white text-base md:text-lg py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-white/50 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 md:w-5 md:h-5" />
                    Play Now
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
