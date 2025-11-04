import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  BookOpen,
  Gamepad2,
  Palette,
  Sun,
  Zap,
  Globe,
  Rocket,
  Stars,
  PlayCircle,
  Award,
  Sparkles,
  ArrowLeft,
  Home,
  Heart,
  Smile,
  HelpCircle,
  Video,
  MapPin,
  Coins,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import InteractiveStories from "./InteractiveStories";
import MobileFriendlyGames from "./MobileFriendlyGames";
import ProfilePage from "./ProfilePage";
import MobileFriendlyQuizzes from "./MobileFriendlyQuizzes";
import TransitionCutscene from "./TransitionCutscene";
import HelpSystem from "./HelpSystem";
import VideoLessons from "./VideoLessonsNew";
import CosmicCoinShop from "./CosmicCoinShop";

interface MainPageProps {
  playerName: string;
  userProfile?: any;
}

export default function MainPage({
  playerName,
  userProfile,
}: MainPageProps) {
  const [selectedSection, setSelectedSection] = useState<
    | "stories"
    | "games"
    | "quizzes"
    | "videos"
    | "profile"
    | "help"
    | "home"
  >("home");
  const [showTransition, setShowTransition] = useState(false);
  const [nextSection, setNextSection] = useState<string | null>(
    null,
  );
  const [mascotSpeaking, setMascotSpeaking] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(
    `Welcome, ${playerName}! 🌟 I'm Veyra, your space weather guide! Ready to explore the cosmos together?`,
  );
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [cosmicCoins, setCosmicCoins] = useState(187);

  // Welcome message timeout
  useEffect(() => {
    const timer = setTimeout(
      () => setMascotSpeaking(false),
      6000,
    );
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      id: "stories",
      title: "📚 Interactive Lessons",
      icon: BookOpen,
      color: "from-purple-500 to-blue-600",
      bgColor:
        "bg-gradient-to-br from-purple-900/30 to-blue-900/30",
      description:
        "Explore space weather through amazing stories!",
      mascotMessage:
        "Let's discover space weather through exciting interactive adventures! 📖✨",
      emoji: "🌟",
    },
    {
      id: "games",
      title: "🎮 Cosmic Games",
      icon: Gamepad2,
      color: "from-cyan-500 to-purple-600",
      bgColor:
        "bg-gradient-to-br from-cyan-900/30 to-purple-900/30",
      description: "Play super fun space weather games!",
      mascotMessage:
        "Time for awesome space adventures! Ready to play? 🚀",
      emoji: "🎯",
    },
    {
      id: "quizzes",
      title: "🧠 Space Challenges",
      icon: Sparkles,
      color: "from-green-500 to-teal-600",
      bgColor:
        "bg-gradient-to-br from-green-900/30 to-teal-900/30",
      description: "Test your cosmic knowledge!",
      mascotMessage:
        "Ready to test what you've learned? Let's go champion! 🏆",
      emoji: "🎯",
    },
    {
      id: "videos",
      title: "📹 Video Lessons",
      icon: Video,
      color: "from-pink-500 to-purple-600",
      bgColor:
        "bg-gradient-to-br from-pink-900/30 to-purple-900/30",
      description: "Learn through engaging video content!",
      mascotMessage:
        "Let's watch some amazing space weather videos together! 🎬✨",
      emoji: "🎞️",
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      setWelcomeMessage(section.mascotMessage);
      setMascotSpeaking(true);
      setNextSection(sectionId);
      setShowTransition(true);
    }
  };

  const onTransitionComplete = () => {
    setShowTransition(false);
    if (nextSection) {
      setSelectedSection(nextSection as any);
      setNextSection(null);
    }
  };

  const goHome = () => {
    setWelcomeMessage(
      `Great work, ${playerName}! Which cosmic adventure would you like to explore next? 🌟`,
    );
    setMascotSpeaking(true);
    setSelectedSection("home");
    setTimeout(() => setMascotSpeaking(false), 4000);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "stories":
        return (
          <InteractiveStories
            playerName={playerName}
            onBack={goHome}
            userProfile={userProfile}
          />
        );
      case "games":
        return (
          <MobileFriendlyGames
            playerName={playerName}
            onBack={goHome}
          />
        );
      case "quizzes":
        return (
          <MobileFriendlyQuizzes
            playerName={playerName}
            onBack={goHome}
          />
        );
      case "videos":
        return (
          <VideoLessons
            playerName={playerName}
            onBack={goHome}
          />
        );
      case "profile":
        return (
          <ProfilePage
            playerName={playerName}
            onBack={goHome}
          />
        );
      case "help":
        return <HelpSystem onClose={goHome} />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <>
      {/* Floating Mascot Veyra - Mobile Optimized */}
      <motion.div
        className="fixed top-16 md:top-20 right-2 md:right-4 z-50"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <motion.div
            className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center border-4 md:border-6 border-white shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 30px rgba(34, 211, 238, 0.8)",
                "0 0 50px rgba(147, 51, 234, 0.8)",
                "0 0 30px rgba(34, 211, 238, 0.8)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img
              src="https://i.ibb.co/BVzmty5Z/Chat-GPT-Image-Oct-5-2025-11-18-17-AM.png"
              alt="Veyra - Your Space Guide"
              className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover border-2 md:border-4 border-white/50"
            />
          </motion.div>
          {/* Speech Bubble - Responsive */}
          <AnimatePresence>
            {mascotSpeaking && (
              <motion.div
                className="absolute -left-48 md:-left-96 top-0 md:top-2 w-44 md:w-80 bg-gradient-to-r from-gray-800 to-blue-900 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-xl border-2 md:border-4 border-cyan-400"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-cyan-100 text-xs md:text-xl leading-snug md:leading-relaxed">
                  {welcomeMessage}
                </p>
                <div className="absolute right-[-12px] md:right-[-16px] top-6 md:top-8 w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-gray-800 border-t-[8px] md:border-t-[10px] border-t-transparent border-b-[8px] md:border-b-[10px] border-b-transparent"></div>
                <motion.div
                  className="absolute right-2 md:right-3 bottom-2 md:bottom-3"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-3 h-3 md:w-5 md:h-5 text-cyan-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* Exciting Sections - Mobile Optimized Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30, rotateY: 45 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
              scale: 1.08,
              rotate: [0, 2, -2, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`${section.bgColor} border-2 border-cyan-400/30 backdrop-blur-sm shadow-2xl cursor-pointer h-full overflow-hidden group relative transform hover:shadow-3xl hover:border-cyan-400/60 transition-all duration-300`}
              onClick={() => handleSectionClick(section.id)}
            >
              {/* Magic particles */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${25 + (i % 3) * 25}%`,
                      background:
                        "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)",
                    }}
                    animate={{
                      y: [0, -25, 0],
                      opacity: [0.4, 1, 0.4],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i * 0.4,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
              <CardHeader className="text-center relative z-10 p-4 md:p-6">
                <motion.div
                  className={`p-4 md:p-8 rounded-full bg-gradient-to-r ${section.color} w-fit mx-auto mb-4 md:mb-6 shadow-xl border-2 md:border-4 border-white`}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: { duration: 2.5, repeat: Infinity },
                  }}
                >
                  <section.icon className="w-10 h-10 md:w-16 md:h-16 text-white drop-shadow-lg" />
                </motion.div>
                <CardTitle className="text-xl md:text-3xl text-white mb-2 md:mb-4 group-hover:text-cyan-300 transition-colors">
                  {section.title}
                </CardTitle>
                <p className="text-gray-300 text-sm md:text-xl">
                  {section.description}
                </p>
                <motion.div
                  className="text-5xl md:text-8xl mt-4 md:mt-6"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.7,
                  }}
                >
                  {section.emoji}
                </motion.div>
              </CardHeader>
              <CardContent className="text-center relative z-10 pb-6 md:pb-8 px-4 md:px-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 text-white text-lg md:text-2xl py-4 md:py-8 rounded-xl md:rounded-2xl shadow-xl border-2 md:border-4 border-white transform transition-all duration-300 hover:shadow-2xl`}
                    size="lg"
                  >
                    Let's Explore! 🚀✨
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {/* Fun Space Facts with new design - Mobile Optimized */}
      <motion.div
        className="bg-gradient-to-r from-gray-800/50 via-blue-800/50 to-purple-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl border-2 border-cyan-400/30 mb-6 md:mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3
          className="text-2xl md:text-4xl text-white text-center mb-4 md:mb-6 flex items-center justify-center gap-2 md:gap-4 flex-wrap"
          animate={{
            color: [
              "#ffffff",
              "#22d3ee",
              "#a855f7",
              "#10b981",
              "#ffffff",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 md:w-10 md:h-10" />
          <span>Amazing Space Weather Facts!</span>
          <Sparkles className="w-6 h-6 md:w-10 md:h-10" />
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              emoji: "☀️",
              text: "Solar flares are like cosmic fireworks that can reach 20 million degrees!",
              color: "from-yellow-400 to-orange-500",
            },
            {
              emoji: "🌈",
              text: "Auroras dance in the sky when solar particles meet Earth's magnetic shield!",
              color: "from-green-400 to-blue-500",
            },
            {
              emoji: "🛡️",
              text: "Our magnetosphere is like a giant invisible shield protecting us from space weather!",
              color: "from-purple-400 to-pink-500",
            },
            {
              emoji: "⚡",
              text: "Space storms can make the lights flicker and even affect GPS satellites!",
              color: "from-cyan-400 to-blue-600",
            },
          ].map((fact, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-r ${fact.color} rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border-2 border-white/30 text-white`}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -80 : 80,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <motion.div
                  className="text-3xl md:text-5xl flex-shrink-0"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {fact.emoji}
                </motion.div>
                <p className="text-white text-sm md:text-xl leading-snug md:leading-relaxed">
                  {fact.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200, 0],
                x: [0, Math.sin(i) * 80, 0],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
                scale: [0.3, 1.8, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut",
              }}
            >
              {i % 6 === 0 ? (
                <Stars className="w-10 h-10 text-yellow-300" />
              ) : i % 6 === 1 ? (
                <Sparkles className="w-8 h-8 text-pink-300" />
              ) : i % 6 === 2 ? (
                <Sun className="w-7 h-7 text-orange-300" />
              ) : i % 6 === 3 ? (
                <Rocket className="w-8 h-8 text-cyan-300" />
              ) : i % 6 === 4 ? (
                <Globe className="w-6 h-6 text-green-300" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-300 to-blue-300" />
              )}
            </motion.div>
          ))}
          {/* Enhanced rainbow trails */}
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute w-3 h-60 opacity-40"
              style={{
                left: `${15 + i * 15}%`,
                background: `linear-gradient(to bottom,
                  hsl(${i * 50}, 80%, 70%),
                  hsl(${i * 50 + 40}, 80%, 70%),
                  transparent)`,
              }}
              animate={{
                y: ["-120vh", "120vh"],
                rotate: [0, 270],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
        {/* Header with new logo - Mobile Optimized */}
        <motion.div
          className="mb-6 md:mb-8 relative z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Top Row - Logo and Home Button */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2 md:gap-4">
              {selectedSection !== "home" && (
                <motion.button
                  onClick={goHome}
                  className="p-2 md:p-4 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all border-2 md:border-4 border-cyan-400 flex-shrink-0"
                  whileHover={{ scale: 1.15, rotate: -15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Home className="w-5 h-5 md:w-8 md:h-8 text-cyan-600" />
                </motion.button>
              )}
              <motion.div
                className="flex items-center gap-2 md:gap-4 bg-white rounded-xl md:rounded-3xl px-3 py-2 md:px-8 md:py-4 shadow-xl border-2 md:border-4 border-cyan-400"
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src="https://i.ibb.co/8DyJFHvD/85744d5dfc908d93964640cd9447becec9784d95.png"
                  alt="Luminexus Logo"
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full flex-shrink-0"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent truncate">
                    Luminexus
                  </h1>
                  <p className="text-gray-700 text-xs sm:text-sm md:text-xl truncate">
                    Welcome, {playerName}! 👋
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Badge - Hide on small screens */}
            <motion.div
              className="hidden lg:flex bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl md:rounded-3xl px-4 py-2 md:px-8 md:py-4 shadow-xl border-2 md:border-4 border-yellow-400 flex-shrink-0"
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 3, -3, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <Award className="w-5 h-5 md:w-8 md:h-8 text-yellow-600" />
                <span className="text-yellow-800 text-sm md:text-xl whitespace-nowrap">
                  Space Explorer! ⭐
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row - Action Buttons - Horizontal Scroll on Mobile */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Button
                onClick={() => setSelectedSection("profile")}
                className="relative overflow-hidden flex items-center gap-2 md:gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-sm md:text-xl px-4 py-3 md:px-10 md:py-5 rounded-xl md:rounded-2xl shadow-xl border-2 md:border-4 border-white transform transition-all duration-300 whitespace-nowrap"
              >
                <span className="text-xl md:text-3xl">👤</span>
                <span className="hidden sm:inline">My Profile</span>
                <span className="sm:hidden">Profile</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Button
                onClick={() => setSelectedSection("help")}
                className="relative overflow-hidden flex items-center gap-2 md:gap-3 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 hover:from-green-600 hover:via-teal-600 hover:to-cyan-600 text-white text-sm md:text-xl px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl border-2 md:border-4 border-white transform transition-all duration-300 whitespace-nowrap"
              >
                <HelpCircle className="w-5 h-5 md:w-7 md:h-7" />
                <span className="hidden sm:inline">Help & Guide</span>
                <span className="sm:hidden">Help</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Button
                onClick={() => setShowCoinShop(true)}
                className="relative overflow-hidden flex items-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 hover:from-yellow-600 hover:via-orange-600 hover:to-amber-600 text-white text-sm md:text-xl px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-xl border-2 md:border-4 border-white transform transition-all duration-300 whitespace-nowrap"
              >
                <Sparkles className="w-5 h-5 md:w-7 md:h-7" />
                <span className="hidden sm:inline">Coin Shop</span>
                <span className="sm:hidden">Shop</span>
                <span className="ml-1">🪙</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        <div className="relative z-10">{renderContent()}</div>
      </div>
      {/* Transition Cutscene */}
      <AnimatePresence>
        {showTransition && (
          <TransitionCutscene
            playerName={playerName}
            section={sections.find((s) => s.id === nextSection)}
            onComplete={onTransitionComplete}
          />
        )}
      </AnimatePresence>

      {/* Cosmic Coin Shop */}
      <CosmicCoinShop
        playerName={playerName}
        isVisible={showCoinShop}
        onClose={() => setShowCoinShop(false)}
        cosmicCoins={cosmicCoins}
      />
    </>
  );
}