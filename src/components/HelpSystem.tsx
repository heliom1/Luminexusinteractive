import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  HelpCircle,
  BookOpen,
  Gamepad2,
  Palette,
  Brain,
  Home,
  Star,
  Lightbulb,
  Target,
  Users,
  Globe,
  Rocket,
  ChevronLeft,
  Play,
  Sparkles,
  Zap,
  Trophy,
  Medal,
  Gift
} from 'lucide-react';

interface HelpSystemProps {
  onClose: () => void;
}

export default function HelpSystem({ onClose }: HelpSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: '🚀 Getting Started',
      icon: Rocket,
      description: 'Learn how to begin your space adventure!',
      color: 'from-blue-400 to-cyan-500',
      emoji: '🚀'
    },
    {
      id: 'lessons',
      title: '📚 Interactive Stories',
      icon: BookOpen,
      description: 'How to enjoy the interactive space stories',
      color: 'from-purple-400 to-pink-500',
      emoji: '📚'
    },
    {
      id: 'games',
      title: '🎮 Fun Games',
      icon: Gamepad2,
      description: 'Tips to win at space weather games!',
      color: 'from-green-400 to-blue-500',
      emoji: '🎮'
    },
    {
      id: 'lab',
      title: '🎨 Space Lab',
      icon: Palette,
      description: 'Create cool space art and experiments',
      color: 'from-yellow-400 to-orange-500',
      emoji: '🎨'
    },
    {
      id: 'quizzes',
      title: '🧠 Quizzes',
      icon: Brain,
      description: 'Earn points and test your knowledge!',
      color: 'from-red-400 to-purple-500',
      emoji: '🧠'
    },
    {
      id: 'space-weather',
      title: '🌌 Space Weather',
      icon: Globe,
      description: 'Learn awesome space facts!',
      color: 'from-indigo-400 to-blue-600',
      emoji: '🌌'
    }
  ];

  const helpContent = {
    'getting-started': {
      title: 'Welcome to Luminexus! 🎉',
      emoji: '🌟',
      sections: [
        {
          title: 'What is Luminexus?',
          emoji: '💫',
          content: 'Luminexus is your super cool space weather learning adventure! You\'ll meet Veyra (our space mascot 🦊) and learn about the Sun, auroras, and how space weather affects our planet - all through fun games, stories, and activities!',
          tip: 'Think of it like a video game, but you\'re learning real science! 🎮'
        },
        {
          title: 'How to Navigate',
          emoji: '🗺️',
          content: 'Click the colorful buttons on the main menu to explore! Try Interactive Stories to meet cool characters, play Educational Games to earn points, create art in the Space Lab, or take Quizzes to become a space expert!',
          tip: 'Start with Stories - they\'re the most fun way to learn! 📖'
        },
        {
          title: 'Your Learning Adventure',
          emoji: '🎯',
          content: 'Begin with Interactive Stories to meet farmers, pilots, and astronauts affected by space weather. Then play games to practice what you learned. Create cool space art in the Lab, and finally take quizzes to prove you\'re a space expert!',
          tip: 'Don\'t rush - enjoy each part! There\'s no time limit! ⏰'
        },
        {
          title: 'Cosmic Coins & Rewards',
          emoji: '🪙',
          content: 'Earn Cosmic Coins by completing stories, winning games, and acing quizzes! Use your coins in the Cosmic Shop to unlock special rewards, avatars, and cool space items. The more you learn, the more you earn!',
          tip: 'Complete all activities to maximize your coins! 💰'
        }
      ]
    },
    'lessons': {
      title: 'Interactive Stories Guide! 📚',
      emoji: '📖',
      sections: [
        {
          title: 'Meet Amazing Characters',
          emoji: '👥',
          content: 'Follow Sarah the Farmer 👩‍🌾, Captain Alex the Pilot ✈️, and more as they experience real space weather events! Each character teaches you different science concepts through their adventures. It\'s like reading a comic book, but interactive!',
          tip: 'Click on choices that sound interesting to you! 🎬'
        },
        {
          title: 'The Magic Dictionary',
          emoji: '📕',
          content: 'See words highlighted in bright yellow buttons? Click them to learn what they mean! The dictionary pops up with simple explanations, examples, and fun facts. No need to memorize - just click and learn!',
          tip: 'Every word you click makes you smarter! 🧠✨'
        },
        {
          title: 'Make Your Choices',
          emoji: '🎯',
          content: 'At each part of the story, YOU decide what happens next! Pick the choice that interests you most. Different choices give different points and teach different things. You can replay stories to try all the choices!',
          tip: 'There are no wrong answers - explore and have fun! 🌈'
        },
        {
          title: 'Look at Cool Pictures',
          emoji: '🖼️',
          content: 'Every scene has awesome images showing what\'s happening in the story. Watch for auroras, solar storms, satellites, and more! The pictures help you understand the science better than just reading text.',
          tip: 'Images make science easier and more fun to learn! 🎨'
        }
      ]
    },
    'games': {
      title: 'Game Master Guide! 🎮',
      emoji: '🕹️',
      sections: [
        {
          title: 'Solar Flare Catcher',
          emoji: '☀️',
          content: 'Move your shield to catch solar flares (the good energy) while dodging the harmful radiation! Use arrow keys or tap on mobile. Collect power-ups like speed boosts and bigger shields. The faster you catch, the more points you get!',
          tip: 'Focus on the golden flares - they give bonus points! ⭐'
        },
        {
          title: 'Aurora Color Mixer',
          emoji: '🌈',
          content: 'Match the aurora colors to the right gases! Green = Oxygen, Purple = Nitrogen, Red = High Oxygen. Click on the correct gas when you see each color. Perfect matches give you combo bonuses! Learn while you play!',
          tip: 'Remember: Oxygen is green like grass! 🌱'
        },
        {
          title: 'Satellite Defender',
          emoji: '🛰️',
          content: 'Protect Earth\'s satellites from incoming solar storms! Click on threats to activate shields. Manage your energy - shields cost power! Let harmless space dust pass through to save energy for the big storms.',
          tip: 'Watch the radar - it shows what\'s coming next! 📡'
        },
        {
          title: 'Power-Ups & Combos',
          emoji: '⚡',
          content: 'Grab power-ups during games! Shield = temporary invincibility, Speed = move faster, Star = double points, Rainbow = all powers! String together successful moves for combo multipliers. The longer your combo, the higher your score!',
          tip: 'Save strong power-ups for hard levels! 🎯'
        }
      ]
    },
    'lab': {
      title: 'Space Lab Fun! 🎨',
      emoji: '🔬',
      sections: [
        {
          title: 'Aurora Art Studio',
          emoji: '🎨',
          content: 'Create your own Northern Lights! Choose colors (green for oxygen, purple for nitrogen), brush sizes, and effects like glow and shimmer. Paint beautiful auroras and save your artwork! It\'s like a magic painting app but based on real science!',
          tip: 'Layer different colors for realistic auroras! 🌌'
        },
        {
          title: 'Planet Explorer',
          emoji: '🪐',
          content: 'Click on different planets to see how space weather affects them! Learn about each planet\'s magnetic field, atmosphere, and whether they have auroras. Compare Earth to Jupiter, Mars, and more!',
          tip: 'Jupiter has auroras 100x brighter than Earth! 😮'
        },
        {
          title: 'Solar Storm Simulator',
          emoji: '💥',
          content: 'Launch your own solar storms! Adjust the power, speed, and direction. Watch them travel through space and see if they hit Earth. Learn how scientists predict real solar storms!',
          tip: 'Bigger storms reach Earth faster! ⚡'
        },
        {
          title: 'Space Weather Journal',
          emoji: '📔',
          content: 'Keep your own space weather diary! Record when you see auroras in real life, note technology problems that might be space weather, and rate the coolness of space events. Become a junior space scientist!',
          tip: 'Check NOAA.gov for real space weather updates! 🌐'
        }
      ]
    },
    'quizzes': {
      title: 'Quiz Champion Tips! 🏆',
      emoji: '🧠',
      sections: [
        {
          title: 'Start Easy, Level Up!',
          emoji: '📊',
          content: 'Quizzes go from Beginner (super easy) to Expert (challenging)! Start with Beginner quizzes to build confidence. As you learn more from stories and games, move up to harder levels. Expert quizzes give the most Cosmic Coins!',
          tip: 'Master Beginner before trying Expert! 📈'
        },
        {
          title: 'Beat the Clock',
          emoji: '⏱️',
          content: 'Each question has a countdown timer. Read the question carefully but don\'t panic! When the timer turns red, you have 5 seconds left - make your best guess! Speed matters, but accuracy matters more.',
          tip: 'Trust your first instinct - it\'s usually right! 💭'
        },
        {
          title: 'Score Big Points',
          emoji: '🎯',
          content: 'Harder questions = more points! Get answers right in a row for streak bonuses! Perfect quizzes (100% correct) unlock special achievements and bonus Cosmic Coins. The timer bonus gives extra points for quick answers!',
          tip: 'Answer fast AND correct for maximum points! ⚡'
        },
        {
          title: 'Learn from Mistakes',
          emoji: '💡',
          content: 'Wrong answers aren\'t bad - they help you learn! When you miss a question, the quiz shows you the right answer with an explanation. Read it carefully! You can retake quizzes to improve your score.',
          tip: 'Every mistake teaches you something new! 🌟'
        }
      ]
    },
    'space-weather': {
      title: 'Space Weather Science! 🌌',
      emoji: '🔭',
      sections: [
        {
          title: 'The Super Sun',
          emoji: '☀️',
          content: 'The Sun is like a giant ball of super hot gas (plasma) that\'s always active! It shoots out solar flares (sudden bursts of light and energy), coronal mass ejections or CMEs (huge clouds of solar material), and constant solar wind (streams of particles). All of this travels through space!',
          tip: 'The Sun is 93 million miles away but still affects Earth! 🤯'
        },
        {
          title: 'Earth\'s Super Shield',
          emoji: '🛡️',
          content: 'Earth has an invisible force field called the magnetosphere (magnetic field) that protects us from harmful space radiation! It\'s created by liquid iron spinning in Earth\'s core. Our atmosphere (the air around Earth) also helps block dangerous particles. We\'re super protected!',
          tip: 'Without our shield, we\'d be like Mars - no protection! 😱'
        },
        {
          title: 'Amazing Auroras',
          emoji: '🌈',
          content: 'Auroras (Northern and Southern Lights) are nature\'s light show! When solar particles hit Earth\'s magnetic field, they get directed to the poles. These particles crash into oxygen and nitrogen gases in our atmosphere, making them glow! Green = oxygen, Purple/Red = nitrogen. It\'s like a giant neon sign in the sky!',
          tip: 'You can see auroras from Alaska, Canada, and Scandinavia! 🌍'
        },
        {
          title: 'Tech in Trouble',
          emoji: '📱',
          content: 'Space weather can affect our technology! GPS might get confused (like Sarah\'s farm GPS!), satellites can get damaged, radio communications go fuzzy, and power grids might flicker. That\'s why scientists monitor space weather 24/7 - to protect our tech and warn people!',
          tip: 'The biggest solar storm was in 1859 - telegraphs sparked! ⚡'
        },
        {
          title: 'Space Weather Forecasters',
          emoji: '🔮',
          content: 'Just like meteorologists predict rain, space weather scientists predict solar storms! They use special satellites (like SOHO and SDO) to watch the Sun constantly. When they see a big storm coming, they warn airlines, power companies, and satellite operators so they can prepare!',
          tip: 'Check spaceweather.gov to see today\'s forecast! 🌐'
        }
      ]
    }
  };

  const playSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Silently handle audio errors
    }
  };

  if (selectedCategory) {
    const content = helpContent[selectedCategory as keyof typeof helpContent];
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-3 sm:p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <Button
              onClick={() => {
                playSound();
                setSelectedCategory(null);
              }}
              className="flex items-center gap-2 md:gap-3 bg-white hover:bg-gray-100 text-gray-800 border-4 border-purple-400 text-base md:text-xl px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              Back
            </Button>
          </div>

          <Card className="bg-white border-4 border-purple-400 rounded-2xl md:rounded-3xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-t-xl md:rounded-t-2xl">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center flex items-center justify-center gap-3">
                <span className="text-4xl md:text-5xl">{content.emoji}</span>
                {content.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6">
              {content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border-4 border-purple-200 shadow-lg"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-700 mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                    <span className="text-2xl md:text-3xl">{section.emoji}</span>
                    {section.title}
                  </h3>
                  <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed mb-3 md:mb-4 font-medium">
                    {section.content}
                  </p>
                  <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg md:rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3">
                    <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 flex-shrink-0" />
                    <p className="text-gray-800 font-bold text-xs sm:text-sm md:text-base">
                      💡 Tip: {section.tip}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Friendly */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div 
              className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </motion.div>
            <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Help & Guide</h1>
          </div>
          
          <Button 
            onClick={() => {
              playSound();
              onClose();
            }}
            className="flex items-center gap-2 md:gap-3 bg-purple-600 hover:bg-purple-700 text-white text-base md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg font-bold"
          >
            <Home className="w-5 h-5 md:w-6 md:h-6" />
            Back to Home
          </Button>
        </div>

        {/* Welcome Section - More Fun! */}
        <Card className="bg-white border-4 border-blue-400 rounded-2xl md:rounded-3xl shadow-2xl mb-6 md:mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 p-6 md:p-8">
            <CardContent className="p-0 text-center">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl md:text-8xl mb-4"
              >
                🌟
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Luminexus Help Center! 🎉
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed font-medium">
                Need help on your space adventure? Click any topic below to learn how to use Luminexus like a pro! 
                Each guide has simple instructions, helpful tips, and fun facts! 🚀
              </p>
            </CardContent>
          </div>
        </Card>

        {/* Help Categories - More Colorful! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card 
                className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border-4 border-purple-300 overflow-hidden cursor-pointer transform transition-all duration-300 hover:border-purple-500 hover:shadow-3xl h-full"
                onClick={() => {
                  playSound();
                  setSelectedCategory(category.id);
                }}
              >
                <div className={`h-32 md:h-40 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl md:text-7xl"
                    >
                      {category.emoji}
                    </motion.div>
                  </div>
                  
                  {/* Floating sparkles */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          left: `${15 + i * 18}%`,
                          top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 1, 0.3],
                          scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>

                <CardContent className="p-4 sm:p-5 md:p-6">
                  <h3 className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl mb-3 flex items-center gap-2">
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 md:mb-6 leading-relaxed font-medium">
                    {category.description}
                  </p>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-base md:text-lg py-3 md:py-4 rounded-xl font-bold shadow-lg">
                    <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Learn More!
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips - More Visual */}
        <Card className="bg-gradient-to-r from-green-200 to-blue-200 border-4 border-green-400 rounded-2xl md:rounded-3xl shadow-2xl mt-6 md:mt-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 md:mb-6 flex items-center justify-center gap-3">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
              Quick Success Tips! 🌟
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border-4 border-green-300 shadow-lg">
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-green-600 mb-3 md:mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                  🎯 How to Learn Best
                </h4>
                <ul className="text-gray-800 space-y-2 text-sm sm:text-base font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">1.</span>
                    Start with Interactive Stories to learn the basics
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">2.</span>
                    Play games to practice what you learned
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">3.</span>
                    Take quizzes to test your knowledge
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">4.</span>
                    Create art in the Space Lab for fun!
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border-4 border-blue-300 shadow-lg">
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-blue-600 mb-3 md:mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 md:w-6 md:h-6" />
                  🌟 Earning Cosmic Coins
                </h4>
                <ul className="text-gray-800 space-y-2 text-sm sm:text-base font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    Complete stories = earn coins! 📚
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    Win games = get bonus coins! 🎮
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    Perfect quiz scores = jackpot! 🧠
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    Check profile to track progress! 📊
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
