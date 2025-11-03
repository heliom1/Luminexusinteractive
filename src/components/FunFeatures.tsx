import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Sparkles, 
  Star, 
  Sun, 
  Moon, 
  Zap, 
  Heart, 
  Crown, 
  Gift, 
  Trophy, 
  Rocket, 
  Globe, 
  Smile,
  PartyPopper,
  Wand2,
  Music,
  Volume2,
  VolumeX,
  RefreshCw,
  X,
  Play,
  Pause,
  Camera,
  Download,
  Share2,
  Settings,
  Palette,
  Eye,
  MousePointer,
  Timer,
  Activity,
  Brain,
  Target,
  Award,
  Lightbulb,
  BookOpen,
  Gamepad2,
  Users,
  Mic,
  Radio,
  Headphones
} from 'lucide-react';

interface FunFeaturesProps {
  playerName: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function FunFeatures({ playerName, isVisible, onClose }: FunFeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState<string>('particle-playground');
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    emoji: string;
    size: number;
    life: number;
  }>>([]);
  const [nextParticleId, setNextParticleId] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cosmic');
  const [playerMood, setPlayerMood] = useState('happy');
  const [achievements, setAchievements] = useState<string[]>([]);
  const [funStats, setFunStats] = useState({
    particlesCreated: 0,
    timeSpent: 0,
    featuresUnlocked: 0,
    smilesGenerated: 156
  });

  const themes = {
    cosmic: {
      name: 'Cosmic Space',
      gradient: 'from-purple-900 via-blue-900 to-indigo-900',
      particles: ['🌟', '✨', '⭐', '🌙', '🪐'],
      colors: ['#60a5fa', '#a855f7', '#06b6d4', '#f59e0b']
    },
    aurora: {
      name: 'Aurora Lights',
      gradient: 'from-green-800 via-emerald-600 to-cyan-800',
      particles: ['💚', '💜', '🌈', '✨', '🔮'],
      colors: ['#10b981', '#8b5cf6', '#06b6d4', '#f59e0b']
    },
    solar: {
      name: 'Solar Storm',
      gradient: 'from-orange-800 via-red-700 to-yellow-800',
      particles: ['☀️', '⚡', '🔥', '💥', '🌟'],
      colors: ['#f97316', '#ef4444', '#eab308', '#f59e0b']
    },
    galaxy: {
      name: 'Galaxy Explorer',
      gradient: 'from-pink-900 via-purple-800 to-violet-900',
      particles: ['🌌', '🚀', '👽', '🛸', '💫'],
      colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#10b981']
    }
  };

  const features = [
    {
      id: 'particle-playground',
      name: '✨ Particle Playground',
      description: 'Create magical space particles that dance around the screen!',
      icon: '🎭'
    },
    {
      id: 'mood-detector',
      name: '😊 Mood Detector',
      description: 'Let the AI detect your mood and create custom experiences!',
      icon: '🧠'
    },
    {
      id: 'space-sounds',
      name: '🎵 Space Sounds',
      description: 'Listen to relaxing space ambient sounds while you learn!',
      icon: '🎧'
    },
    {
      id: 'achievement-hunter',
      name: '🏆 Achievement Hunter',
      description: 'Unlock cool achievements and show off your space knowledge!',
      icon: '👑'
    },
    {
      id: 'theme-changer',
      name: '🎨 Theme Changer',
      description: 'Change the look and feel of your space adventure!',
      icon: '🌈'
    },
    {
      id: 'fun-facts',
      name: '🤯 Random Fun Facts',
      description: 'Get mind-blowing space facts that will amaze your friends!',
      icon: '💡'
    }
  ];

  const funFacts = [
    "One day on Venus is longer than its entire year! 🪐",
    "Jupiter's Great Red Spot is a storm that's been raging for over 400 years! 🌪️",
    "Neutron stars are so dense that a teaspoon would weigh 6 billion tons! ⭐",
    "There are more stars in the universe than grains of sand on all Earth's beaches! 🏖️",
    "Saturn would float in water because it's less dense! 🪐",
    "Space is completely silent because there's no air to carry sound! 🤫",
    "One million Earths could fit inside the Sun! ☀️",
    "Astronauts can grow up to 2 inches taller in space! 👨‍🚀",
    "A year on Mars is almost twice as long as an Earth year! 🔴",
    "The Milky Way galaxy is moving through space at 1.3 million mph! 🌌"
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
        magic: 1100,
        achievement: 1320,
        particle: 660,
        mood: 550,
        theme: 770
      };
      
      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      // Silent fail
    }
  };

  // Particle system
  useEffect(() => {
    if (currentFeature !== 'particle-playground') return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        life: particle.life - 1,
        vy: particle.vy + 0.1 // gravity
      })).filter(particle => particle.life > 0 && particle.y < window.innerHeight + 100));
    }, 50);

    return () => clearInterval(interval);
  }, [currentFeature]);

  const createParticle = (x: number, y: number) => {
    const theme = themes[currentTheme as keyof typeof themes];
    const newParticle = {
      id: nextParticleId,
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * -15 - 5,
      color: theme.colors[Math.floor(Math.random() * theme.colors.length)],
      emoji: theme.particles[Math.floor(Math.random() * theme.particles.length)],
      size: Math.random() * 30 + 20,
      life: 100
    };
    
    setParticles(prev => [...prev, newParticle]);
    setNextParticleId(prev => prev + 1);
    setFunStats(prev => ({ ...prev, particlesCreated: prev.particlesCreated + 1 }));
    playSound('particle');
  };

  const generateRandomFact = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    return randomFact;
  };

  const detectMood = () => {
    const moods = ['happy', 'excited', 'curious', 'amazed', 'creative', 'adventurous'];
    const newMood = moods[Math.floor(Math.random() * moods.length)];
    setPlayerMood(newMood);
    playSound('mood');
    
    // Add achievement
    if (!achievements.includes('mood-explorer')) {
      setAchievements(prev => [...prev, 'mood-explorer']);
      playSound('achievement');
    }
  };

  const unlockAchievement = (achievementId: string) => {
    if (!achievements.includes(achievementId)) {
      setAchievements(prev => [...prev, achievementId]);
      playSound('achievement');
    }
  };

  const renderParticlePlayground = () => (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${themes[currentTheme as keyof typeof themes].gradient} p-6 cursor-pointer relative overflow-hidden`}
      onClick={(e) => createParticle(e.clientX, e.clientY)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-white mb-4">✨ Particle Playground</h2>
        <p className="text-2xl text-white/80">Click anywhere to create magical space particles!</p>
        <Badge className="bg-white/20 text-white text-xl px-6 py-3 mt-4">
          Particles Created: {funStats.particlesCreated}
        </Badge>
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: particle.size,
            color: particle.color
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 360,
            opacity: particle.life / 100
          }}
          transition={{ duration: 0.5 }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
          <CardContent className="p-6 text-center">
            <p className="text-white text-xl mb-4">
              🖱️ Click anywhere to create particles!
            </p>
            <p className="text-white/80 text-lg">
              Watch them dance with physics and gravity!
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderMoodDetector = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-800 via-purple-800 to-indigo-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-8">🧠 Mood Detector</h2>
        
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border-2 border-white/30"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {playerMood === 'happy' ? '😊' :
             playerMood === 'excited' ? '🤩' :
             playerMood === 'curious' ? '🤔' :
             playerMood === 'amazed' ? '🤯' :
             playerMood === 'creative' ? '🎨' : '🚀'}
          </motion.div>
          
          <h3 className="text-4xl font-bold text-white mb-4">
            You're feeling {playerMood}!
          </h3>
          
          <p className="text-2xl text-white/80 mb-8">
            {playerMood === 'happy' ? `${playerName}, your positive energy is lighting up the cosmos!` :
             playerMood === 'excited' ? `${playerName}, your excitement could power a space station!` :
             playerMood === 'curious' ? `${playerName}, your curiosity will take you to the stars!` :
             playerMood === 'amazed' ? `${playerName}, your wonder makes the universe more beautiful!` :
             playerMood === 'creative' ? `${playerName}, your creativity could design new worlds!` :
             `${playerName}, your adventurous spirit is ready for space exploration!`}
          </p>
          
          <Button
            onClick={detectMood}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-2xl px-8 py-4 rounded-2xl"
          >
            <Brain className="w-8 h-8 mr-3" />
            Detect My Mood Again!
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Mood History</h4>
              <p className="text-white/80">You've been detected as {playerMood} most often!</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Mood Score</h4>
              <p className="text-white/80">Your positivity level: 95%!</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
            <CardContent className="p-6 text-center">
              <Smile className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Smiles Generated</h4>
              <p className="text-white/80">{funStats.smilesGenerated} smiles created!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );

  const renderSpaceSounds = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-8">🎧 Space Sounds</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {[
            { name: 'Cosmic Ambience', icon: '🌌', description: 'Relaxing sounds of deep space' },
            { name: 'Solar Wind', icon: '☀️', description: 'Gentle whooshing of solar particles' },
            { name: 'Aurora Melody', icon: '🌈', description: 'Musical interpretation of aurora data' },
            { name: 'Pulsar Beats', icon: '⭐', description: 'Rhythmic pulses from neutron stars' },
            { name: 'Jupiter Storms', icon: '🪐', description: 'Sounds from Jupiter\'s atmosphere' },
            { name: 'Galaxy Whispers', icon: '🌠', description: 'Mysterious sounds from distant galaxies' }
          ].map((sound, index) => (
            <motion.div
              key={sound.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30 cursor-pointer hover:bg-white/20 transition-all">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      scale: musicPlaying ? [1, 1.1, 1] : 1,
                      rotate: musicPlaying ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 2, repeat: musicPlaying ? Infinity : 0 }}
                  >
                    {sound.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">{sound.name}</h3>
                  <p className="text-white/80 mb-4">{sound.description}</p>
                  <Button
                    onClick={() => {
                      setMusicPlaying(!musicPlaying);
                      playSound('click');
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl"
                  >
                    {musicPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {musicPlaying ? 'Pause' : 'Play'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-white mb-6">🎵 Now Playing</h3>
            <div className="flex items-center justify-center gap-6 mb-6">
              <Volume2 className="w-8 h-8 text-white" />
              <div className="flex-1 bg-white/20 rounded-full h-4">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full"
                  animate={{ width: musicPlaying ? ['0%', '100%'] : '0%' }}
                  transition={{ duration: 30, repeat: musicPlaying ? Infinity : 0 }}
                />
              </div>
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <p className="text-white text-xl">
              {musicPlaying ? 'Enjoying cosmic ambience...' : 'Select a sound to begin your space journey'}
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderAchievementHunter = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-800 via-orange-800 to-red-800 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-white mb-4">🏆 Achievement Hunter</h2>
          <p className="text-2xl text-white/80">Collect achievements and show off your space knowledge!</p>
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl px-6 py-3 mt-4">
            Unlocked: {achievements.length}/12
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 'first-story', name: 'Story Explorer', icon: '📚', description: 'Complete your first interactive story', unlocked: achievements.includes('first-story') },
            { id: 'game-master', name: 'Game Master', icon: '🎮', description: 'Play 5 different games', unlocked: achievements.includes('game-master') },
            { id: 'mood-explorer', name: 'Mood Explorer', icon: '😊', description: 'Use the mood detector', unlocked: achievements.includes('mood-explorer') },
            { id: 'particle-creator', name: 'Particle Creator', icon: '✨', description: 'Create 100 particles', unlocked: funStats.particlesCreated >= 100 },
            { id: 'theme-master', name: 'Theme Master', icon: '🎨', description: 'Try all 4 themes', unlocked: achievements.includes('theme-master') },
            { id: 'space-scholar', name: 'Space Scholar', icon: '🧠', description: 'Learn 20 new vocabulary words', unlocked: achievements.includes('space-scholar') },
            { id: 'quiz-champion', name: 'Quiz Champion', icon: '🏅', description: 'Get perfect score on 3 quizzes', unlocked: achievements.includes('quiz-champion') },
            { id: 'fact-collector', name: 'Fact Collector', icon: '💡', description: 'Read 25 fun facts', unlocked: achievements.includes('fact-collector') },
            { id: 'social-star', name: 'Social Star', icon: '⭐', description: 'Share your achievements', unlocked: achievements.includes('social-star') },
            { id: 'time-traveler', name: 'Time Traveler', icon: '⏰', description: 'Spend 2+ hours learning', unlocked: funStats.timeSpent >= 120 },
            { id: 'perfectionist', name: 'Perfectionist', icon: '💯', description: 'Complete all activities', unlocked: achievements.includes('perfectionist') },
            { id: 'space-hero', name: 'Space Hero', icon: '🚀', description: 'Unlock all other achievements', unlocked: achievements.length >= 11 }
          ].map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/50' 
                  : 'bg-white/5 border-white/20'
              } backdrop-blur-md border-2 cursor-pointer hover:scale-105 transition-all`}>
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    animate={achievement.unlocked ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: achievement.unlocked ? Infinity : 0 }}
                  >
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </motion.div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    achievement.unlocked ? 'text-yellow-300' : 'text-white/50'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`${
                    achievement.unlocked ? 'text-yellow-100' : 'text-white/40'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white mt-3">
                      UNLOCKED!
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderThemeChanger = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-8">🎨 Theme Changer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Object.entries(themes).map(([themeKey, theme]) => (
            <motion.div
              key={themeKey}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className={`bg-gradient-to-br ${theme.gradient} border-4 ${
                  currentTheme === themeKey ? 'border-white' : 'border-white/30'
                } cursor-pointer transition-all`}
                onClick={() => {
                  setCurrentTheme(themeKey);
                  playSound('theme');
                  if (!achievements.includes('theme-master')) {
                    unlockAchievement('theme-master');
                  }
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center gap-2 text-4xl mb-6">
                    {theme.particles.map((particle, index) => (
                      <motion.span
                        key={index}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        {particle}
                      </motion.span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">{theme.name}</h3>
                  <div className="flex justify-center gap-2 mb-4">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white/50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  {currentTheme === themeKey && (
                    <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                      ACTIVE THEME
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-white mb-6">🌈 Current Theme Preview</h3>
            <div className={`bg-gradient-to-r ${themes[currentTheme as keyof typeof themes].gradient} rounded-2xl p-8 mb-6`}>
              <div className="flex justify-center gap-4 text-6xl mb-4">
                {themes[currentTheme as keyof typeof themes].particles.map((particle, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {particle}
                  </motion.span>
                ))}
              </div>
              <p className="text-white text-2xl">
                {themes[currentTheme as keyof typeof themes].name} Theme Active!
              </p>
            </div>
            <p className="text-white/80 text-xl">
              This theme will be applied to particle playground and other interactive features!
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );

  const renderFunFacts = () => (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-cyan-900 via-teal-900 to-green-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-8">🤯 Amazing Space Facts</h2>
        
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border-2 border-white/30"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡
          </motion.div>
          
          <h3 className="text-3xl font-bold text-white mb-6">Random Space Fact</h3>
          
          <motion.p
            key={generateRandomFact()}
            className="text-2xl text-white/90 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {generateRandomFact()}
          </motion.p>
          
          <Button
            onClick={() => {
              // Force re-render with new fact
              playSound('click');
              setFunStats(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
            }}
            className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white text-2xl px-8 py-4 rounded-2xl"
          >
            <RefreshCw className="w-8 h-8 mr-3" />
            Give Me Another Fact!
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Facts Read</h4>
              <p className="text-white/80 text-3xl font-bold">42</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Mind Blown</h4>
              <p className="text-white/80 text-3xl font-bold">🤯</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-2 border-white/30">
            <CardContent className="p-6 text-center">
              <Share2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Facts Shared</h4>
              <p className="text-white/80 text-3xl font-bold">17</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );

  const renderCurrentFeature = () => {
    switch (currentFeature) {
      case 'particle-playground':
        return renderParticlePlayground();
      case 'mood-detector':
        return renderMoodDetector();
      case 'space-sounds':
        return renderSpaceSounds();
      case 'achievement-hunter':
        return renderAchievementHunter();
      case 'theme-changer':
        return renderThemeChanger();
      case 'fun-facts':
        return renderFunFacts();
      default:
        return renderParticlePlayground();
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex items-center justify-between">
            <Button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white text-xl px-6 py-3 rounded-2xl"
            >
              <X className="w-6 h-6 mr-2" />
              Close
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">
                🌟 Fun Features for {playerName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`${soundEnabled 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
                } px-4 py-3 rounded-xl`}
              >
                {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Navigation */}
        <div className="absolute top-20 left-4 right-4 z-10">
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <Button
                key={feature.id}
                onClick={() => {
                  setCurrentFeature(feature.id);
                  playSound('click');
                }}
                className={`${
                  currentFeature === feature.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                } px-4 py-3 rounded-xl text-lg border-2 border-white/30`}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <div className="pt-32">
          {renderCurrentFeature()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}