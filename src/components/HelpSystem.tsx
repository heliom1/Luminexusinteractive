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
  Play
} from 'lucide-react';

interface HelpSystemProps {
  onClose: () => void;
}

export default function HelpSystem({ onClose }: HelpSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Star,
      description: 'Learn the basics of using Luminexus',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'lessons',
      title: 'Interactive Lessons',
      icon: BookOpen,
      description: 'How to navigate and learn from stories',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'games',
      title: 'Educational Games',
      icon: Gamepad2,
      description: 'Tips for mastering the games',
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 'lab',
      title: 'Space Lab Activities',
      icon: Palette,
      description: 'Create and experiment guides',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'quizzes',
      title: 'Knowledge Quizzes',
      icon: Brain,
      description: 'Quiz strategies and tips',
      color: 'from-red-400 to-purple-500'
    },
    {
      id: 'space-weather',
      title: 'Space Weather Science',
      icon: Globe,
      description: 'Learn about space weather phenomena',
      color: 'from-indigo-400 to-blue-600'
    }
  ];

  const helpContent = {
    'getting-started': {
      title: 'Welcome to Luminexus! 🌟',
      sections: [
        {
          title: 'What is Luminexus?',
          content: 'Luminexus is an interactive educational platform designed to teach you about space weather through engaging stories, games, and hands-on activities. Space weather affects everything from beautiful auroras to technology we use every day!'
        },
        {
          title: 'How to Navigate',
          content: 'Use the main menu to choose between Interactive Lessons, Educational Games, Space Lab Activities, and Knowledge Quizzes. Your progress is automatically saved, and you can earn points and achievements!'
        },
        {
          title: 'Learning Path',
          content: 'Start with Interactive Lessons to learn the basics, then test your knowledge with games and quizzes. Use the Space Lab to create and experiment. Complete quizzes to unlock advanced content!'
        },
        {
          title: 'Your Profile',
          content: 'Click "My Profile" to track your progress, view achievements, and see detailed statistics about your learning journey. Set learning goals and track your cosmic coin earnings!'
        }
      ]
    },
    'lessons': {
      title: 'Interactive Lessons Guide 📚',
      sections: [
        {
          title: 'Story-Based Learning',
          content: 'Follow characters like Maya the pilot, Sam the farmer, and Alex the astronaut as they experience space weather events. Each story teaches important scientific concepts through real-world scenarios.'
        },
        {
          title: 'Dictionary Integration',
          content: 'Click on highlighted scientific terms to see definitions and explanations. The integrated dictionary helps you understand complex concepts as you read!'
        },
        {
          title: 'Mini-Quizzes',
          content: 'Stories include embedded mini-quizzes to test your understanding. These help reinforce what you\'ve learned and prepare you for the main quizzes.'
        },
        {
          title: 'Progress Tracking',
          content: 'Your reading progress is saved automatically. Complete stories to unlock new chapters and earn cosmic coins for your achievements!'
        }
      ]
    },
    'games': {
      title: 'Educational Games Mastery 🎮',
      sections: [
        {
          title: 'Solar Flare Catcher',
          content: 'Catch solar flares while avoiding harmful radiation. Use power-ups like shields and speed boosts strategically. Higher difficulty levels earn more points!'
        },
        {
          title: 'Aurora Color Mixer',
          content: 'Match aurora colors to their scientific causes. Learn which gases create different colors at various altitudes. Perfect matches earn bonus points!'
        },
        {
          title: 'Satellite Defense',
          content: 'Protect satellites from solar storms using various defense mechanisms. Timing and strategy are key to achieving high scores and protecting Earth\'s technology.'
        },
        {
          title: 'Power-Ups and Strategy',
          content: 'Collect power-ups during games for temporary advantages. Learn when to use shields, speed boosts, and point multipliers for maximum effectiveness!'
        }
      ]
    },
    'lab': {
      title: 'Space Lab Experiments 🎨',
      sections: [
        {
          title: 'Aurora Designer',
          content: 'Create realistic auroras using scientific color principles. Choose brush modes (glow, shimmer, paint), adjust opacity, and use preset patterns. Save your creations!'
        },
        {
          title: 'Solar System Weather Map',
          content: 'Explore how space weather affects different planets. Click on planets to learn about their magnetic fields, atmospheres, and space weather interactions.'
        },
        {
          title: 'CME Trajectory Plotter',
          content: 'Simulate coronal mass ejection paths through space. Adjust launch angles, speeds, and solar wind conditions to predict Earth impacts and space weather effects.'
        },
        {
          title: 'Weather Journal',
          content: 'Document your space weather observations and experiences. Record aurora sightings, technology disruptions, and rate events. Build your personal space weather database!'
        }
      ]
    },
    'quizzes': {
      title: 'Quiz Success Strategies 🧠',
      sections: [
        {
          title: 'Difficulty Levels',
          content: 'Quizzes range from Beginner to Expert levels. Start with basics and work your way up. Advanced quizzes unlock after completing easier ones with good scores.'
        },
        {
          title: 'Time Management',
          content: 'Each question has a time limit. Read carefully but don\'t overthink. The timer shows red when you have 5 seconds left - make your best guess!'
        },
        {
          title: 'Scoring System',
          content: 'Earn more points for harder questions and maintaining answer streaks. Perfect scores unlock special achievements and bonus cosmic coins!'
        },
        {
          title: 'Learning from Mistakes',
          content: 'Wrong answers show the correct response with explanations. Use these to learn and improve on future attempts. Knowledge builds over time!'
        }
      ]
    },
    'space-weather': {
      title: 'Space Weather Science 🌌',
      sections: [
        {
          title: 'Solar Activity',
          content: 'The Sun produces solar flares, coronal mass ejections (CMEs), and solar wind. These events travel through space and can affect Earth\'s magnetic field and atmosphere.'
        },
        {
          title: 'Earth\'s Protection',
          content: 'Earth\'s magnetic field (magnetosphere) deflects most harmful solar radiation. The atmosphere also provides protection, but some effects still reach the surface.'
        },
        {
          title: 'Beautiful Phenomena',
          content: 'Auroras (northern and southern lights) are caused by solar particles interacting with Earth\'s magnetic field and atmosphere. Different gases create different colors!'
        },
        {
          title: 'Technology Impacts',
          content: 'Space weather can affect GPS accuracy, satellite operations, radio communications, and even power grids. Understanding these effects helps us prepare and protect our technology.'
        },
        {
          title: 'Prediction and Monitoring',
          content: 'Scientists use satellites and ground-based instruments to monitor space weather and issue forecasts, just like meteorologists predict Earth weather!'
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
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => {
                playSound();
                setSelectedCategory(null);
              }}
              className="flex items-center gap-3 bg-white/90 hover:bg-white text-gray-800 border-4 border-purple-300 text-xl px-6 py-3 rounded-2xl font-bold shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Help Topics
            </Button>
          </div>

          <Card className="bg-white/90 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-gray-800 text-center">
                {content.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {content.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-purple-50 rounded-2xl p-6 border-4 border-purple-200"
                >
                  <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6" />
                    {section.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-gray-800 text-4xl font-bold">Help & Guide</h1>
          </div>
          
          <Button 
            onClick={() => {
              playSound();
              onClose();
            }}
            className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white text-xl px-8 py-4 rounded-2xl shadow-lg"
          >
            <Home className="w-6 h-6" />
            Back to Home
          </Button>
        </div>

        {/* Welcome Section */}
        <Card className="bg-white/90 backdrop-blur-lg border-4 border-blue-300 rounded-3xl shadow-2xl mb-8">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🌟
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Luminexus Help Center!</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Learn how to make the most of your space weather learning journey. 
              Choose a topic below to get detailed guidance and tips for success!
            </p>
          </CardContent>
        </Card>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-purple-400 h-full"
                onClick={() => {
                  playSound();
                  setSelectedCategory(category.id);
                }}
              >
                <div className={`h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <category.icon className="w-16 h-16 text-white" />
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-800 text-xl mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-lg py-3 rounded-xl font-bold shadow-lg">
                    <Play className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300 rounded-3xl shadow-2xl mt-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-green-600" />
              Quick Tips for Success
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
                <h4 className="text-lg font-bold text-green-600 mb-3">🎯 Learning Strategy</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Start with Interactive Lessons to build foundation knowledge</li>
                  <li>• Practice with games to reinforce concepts</li>
                  <li>• Test yourself with quizzes to measure progress</li>
                  <li>• Experiment in the Space Lab to apply what you've learned</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200">
                <h4 className="text-lg font-bold text-blue-600 mb-3">🌟 Earning Rewards</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Complete stories and activities to earn cosmic coins</li>
                  <li>• Achieve perfect quiz scores for bonus points</li>
                  <li>• Unlock achievements by exploring all features</li>
                  <li>• Track your progress in the profile section</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}