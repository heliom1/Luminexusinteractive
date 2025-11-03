import React, { useState } from "react";
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
  User,
  Trophy,
  Star,
  Crown,
  Coins,
  Brain,
  Gamepad2,
  Award,
  Calendar,
  Target,
  Sparkles,
  Home,
  Edit,
  Save,
  X,
  BookOpen,
  Palette,
  Map,
  Rocket,
  Shield,
  Zap,
  Globe,
  Heart,
} from "lucide-react";

interface ProfilePageProps {
  playerName: string;
  onBack: () => void;
}

export default function ProfilePage({
  playerName,
  onBack,
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "achievements" | "stats" | "settings"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(playerName);

  // Mock player data - in a real app this would come from a database
  const playerData = {
    name: playerName,
    level: 9,
    title: "Space Weather Explorer",
    cosmicCoins: 1247,
    totalPoints: 3850,
    gamesPlayed: 23,
    gamesWon: 17,
    quizzesTaken: 12,
    quizzesCompleted: 8,
    storiesRead: 5,
    activitiesCompleted: 7,
    joinDate: "2024-01-15",
    lastActive: "Today",
    winRate: Math.round((17 / 23) * 100),
  };

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: true,
      rarity: "Common",
      unlockedDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Get 100% on any quiz",
      icon: "🧠",
      unlocked: true,
      rarity: "Rare",
      unlockedDate: "2024-01-18",
    },
    {
      id: 3,
      title: "Aurora Artist",
      description: "Create 5 aurora designs",
      icon: "🎨",
      unlocked: true,
      rarity: "Uncommon",
      unlockedDate: "2024-01-20",
    },
    {
      id: 4,
      title: "Game Champion",
      description: "Win 10 games in a row",
      icon: "🏆",
      unlocked: true,
      rarity: "Epic",
      unlockedDate: "2024-01-22",
    },
    {
      id: 5,
      title: "Space Defender",
      description: "Complete satellite defense mission",
      icon: "🛡️",
      unlocked: true,
      rarity: "Rare",
      unlockedDate: "2024-01-23",
    },
    {
      id: 6,
      title: "Perfect Storm",
      description: "Predict 5 space weather events correctly",
      icon: "⚡",
      unlocked: false,
      rarity: "Legendary",
      unlockedDate: null,
    },
    {
      id: 7,
      title: "Explorer",
      description: "Visit all planets in the weather map",
      icon: "🚀",
      unlocked: false,
      rarity: "Epic",
      unlockedDate: null,
    },
    {
      id: 8,
      title: "Master Scholar",
      description: "Complete all quizzes with 90%+ score",
      icon: "👨‍🎓",
      unlocked: false,
      rarity: "Legendary",
      unlockedDate: null,
    },
  ];

  const recentActivity = [
    {
      activity: "Completed Solar Storm Defense",
      points: 100,
      time: "2 hours ago",
      icon: "🛡️",
    },
    {
      activity: "Perfect score on Aurora Quiz",
      points: 75,
      time: "1 day ago",
      icon: "🧠",
    },
    {
      activity: "Created new aurora design",
      points: 25,
      time: "2 days ago",
      icon: "🎨",
    },
    {
      activity: "Won Solar Flare Catcher",
      points: 50,
      time: "3 days ago",
      icon: "🌟",
    },
    {
      activity: "Read Solar Wind Story",
      points: 30,
      time: "4 days ago",
      icon: "📚",
    },
  ];

  const levelProgress =
    ((playerData.totalPoints % 500) / 500) * 100;
  const nextLevelPoints = 500 - (playerData.totalPoints % 500);

  const tabs = [
    { id: "overview", name: "Overview", icon: User },
    { id: "achievements", name: "Achievements", icon: Trophy },
    { id: "stats", name: "Statistics", icon: Target },
    { id: "settings", name: "Settings", icon: Edit },
  ];

  const handleSaveName = () => {
    // In a real app, this would update the backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="flex items-center justify-between mb-4 md:mb-8 gap-2">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <User className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-gray-800 text-2xl md:text-4xl">
              My Profile
            </h1>
          </div>

          <Button
            onClick={onBack}
            className="flex items-center gap-2 md:gap-3 bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-xl px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-lg flex-shrink-0"
          >
            <Home className="w-4 h-4 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </div>

        {/* Profile Header Card - Mobile Optimized */}
        <Card className="bg-white/90 backdrop-blur-lg border-2 md:border-4 border-purple-300 rounded-2xl md:rounded-3xl shadow-2xl mb-4 md:mb-8">
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* Avatar */}
              <motion.div
                className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-2 md:border-4 border-white shadow-xl flex-shrink-0"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(147, 51, 234, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <User className="w-10 h-10 md:w-16 md:h-16 text-white" />
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mb-2 md:mb-3">
                  {isEditing ? (
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                        className="text-2xl md:text-4xl text-gray-800 bg-white border-2 border-purple-300 rounded-xl px-3 py-1 md:px-4 md:py-2 text-center"
                      />
                      <Button
                        onClick={handleSaveName}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
                      >
                        <Save className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-xl"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl md:text-4xl text-gray-800">
                        {playerData.name}
                      </h2>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl"
                      >
                        <Edit className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-6 mb-3 md:mb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                    <span className="text-purple-600 text-base md:text-xl">
                      Level {playerData.level}
                    </span>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm md:text-lg px-3 py-1 md:px-4 md:py-2">
                    {playerData.title}
                  </Badge>
                </div>

                {/* Level Progress */}
                <div className="mb-3 md:mb-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0 mb-2">
                    <span className="text-gray-700 text-sm md:text-lg">
                      Progress to Level {playerData.level + 1}
                    </span>
                    <span className="text-gray-600 text-xs md:text-lg">
                      {nextLevelPoints} pts to go
                    </span>
                  </div>
                  <Progress
                    value={levelProgress}
                    className="h-4"
                  />
                </div>

                {/* Quick Stats - Mobile Optimized */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                  <div className="text-center">
                    <Coins className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mx-auto mb-1 md:mb-2" />
                    <p className="text-lg md:text-2xl text-yellow-600">
                      {playerData.cosmicCoins}
                    </p>
                    <p className="text-gray-600 text-xs md:text-base">
                      Cosmic Coins
                    </p>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-6 h-6 md:w-8 md:h-8 text-green-500 mx-auto mb-1 md:mb-2" />
                    <p className="text-lg md:text-2xl text-green-600">
                      {playerData.gamesWon}
                    </p>
                    <p className="text-gray-600 text-xs md:text-base">
                      Games Won
                    </p>
                  </div>
                  <div className="text-center">
                    <Brain className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mx-auto mb-1 md:mb-2" />
                    <p className="text-lg md:text-2xl text-blue-600">
                      {playerData.quizzesCompleted}
                    </p>
                    <p className="text-gray-600 text-xs md:text-base">
                      Quizzes
                    </p>
                  </div>
                  <div className="text-center">
                    <Star className="w-6 h-6 md:w-8 md:h-8 text-purple-500 mx-auto mb-1 md:mb-2" />
                    <p className="text-lg md:text-2xl text-purple-600">
                      {playerData.totalPoints}
                    </p>
                    <p className="text-gray-600 text-xs md:text-base">
                      Points
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs - Mobile Optimized with Scroll */}
        <div className="flex space-x-2 mb-4 md:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-lg transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/80 text-gray-800 hover:bg-white border-2 border-purple-200"
              }`}
            >
              <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">{tab.name}</span>
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                {/* Recent Activity - Mobile Optimized */}
                <Card className="bg-white/90 backdrop-blur-lg border-2 md:border-4 border-purple-300 rounded-2xl md:rounded-3xl shadow-2xl">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-gray-800 text-lg md:text-2xl flex items-center gap-2 md:gap-3">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
                    {recentActivity.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-2 border-purple-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-gray-800 font-bold text-lg">
                              {item.activity}
                            </p>
                            <p className="text-gray-600">
                              {item.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-green-600 font-bold text-lg">
                          +{item.points}
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Learning Progress */}
                <Card className="bg-white/90 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 text-2xl font-bold flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-800 font-bold text-lg">
                          📚 Stories Read
                        </span>
                        <span className="text-blue-600 font-bold">
                          {playerData.storiesRead}/8
                        </span>
                      </div>
                      <Progress
                        value={
                          (playerData.storiesRead / 8) * 100
                        }
                        className="h-3"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-800 font-bold text-lg">
                          🎮 Games Played
                        </span>
                        <span className="text-green-600 font-bold">
                          {playerData.gamesPlayed}
                        </span>
                      </div>
                      <Progress
                        value={Math.min(
                          (playerData.gamesPlayed / 20) * 100,
                          100,
                        )}
                        className="h-3"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-800 font-bold text-lg">
                          🎨 Activities Done
                        </span>
                        <span className="text-purple-600 font-bold">
                          {playerData.activitiesCompleted}/10
                        </span>
                      </div>
                      <Progress
                        value={
                          (playerData.activitiesCompleted /
                            10) *
                          100
                        }
                        className="h-3"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-800 font-bold text-lg">
                          🧠 Quiz Success Rate
                        </span>
                        <span className="text-orange-600 font-bold">
                          {Math.round(
                            (playerData.quizzesCompleted /
                              playerData.quizzesTaken) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (playerData.quizzesCompleted /
                            playerData.quizzesTaken) *
                          100
                        }
                        className="h-3"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`rounded-3xl shadow-2xl border-4 transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-white/90 border-yellow-300 hover:border-yellow-400"
                          : "bg-gray-100/50 border-gray-300"
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <div
                          className={`text-6xl mb-4 ${achievement.unlocked ? "" : "grayscale opacity-50"}`}
                        >
                          {achievement.icon}
                        </div>

                        <h3
                          className={`text-xl font-bold mb-2 ${
                            achievement.unlocked
                              ? "text-gray-800"
                              : "text-gray-500"
                          }`}
                        >
                          {achievement.title}
                        </h3>

                        <p
                          className={`text-lg mb-4 ${
                            achievement.unlocked
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {achievement.description}
                        </p>

                        <Badge
                          className={`text-sm font-bold ${
                            achievement.rarity === "Common"
                              ? "bg-gray-500"
                              : achievement.rarity ===
                                  "Uncommon"
                                ? "bg-green-500"
                                : achievement.rarity === "Rare"
                                  ? "bg-blue-500"
                                  : achievement.rarity ===
                                      "Epic"
                                    ? "bg-purple-500"
                                    : "bg-gradient-to-r from-yellow-400 to-orange-500"
                          } text-white px-3 py-1`}
                        >
                          {achievement.rarity}
                        </Badge>

                        {achievement.unlocked &&
                          achievement.unlockedDate && (
                            <p className="text-sm text-gray-500 mt-2">
                              Unlocked on{" "}
                              {achievement.unlockedDate}
                            </p>
                          )}

                        {!achievement.unlocked && (
                          <div className="mt-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                              <span className="text-gray-500 text-lg">
                                🔒
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "stats" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Game Statistics */}
                <Card className="bg-white/90 backdrop-blur-lg border-4 border-green-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 text-2xl font-bold flex items-center gap-3">
                      <Gamepad2 className="w-6 h-6 text-green-500" />
                      Game Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Games Played
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {playerData.gamesPlayed}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Games Won
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {playerData.gamesWon}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Win Rate
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {playerData.winRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Favorite Game
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        Solar Flare Catcher
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Statistics */}
                <Card className="bg-white/90 backdrop-blur-lg border-4 border-blue-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 text-2xl font-bold flex items-center gap-3">
                      <Brain className="w-6 h-6 text-blue-500" />
                      Learning Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Quizzes Taken
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {playerData.quizzesTaken}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Perfect Scores
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        3
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Stories Read
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {playerData.storiesRead}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Study Streak
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        7 days
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Statistics */}
                <Card className="bg-white/90 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-gray-800 text-2xl font-bold flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-purple-500" />
                      Activity Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Total Time
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        24h 30m
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Auroras Created
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        12
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Journal Entries
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        8
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-bold text-lg">
                        Login Streak
                      </span>
                      <span className="text-2xl font-bold text-purple-600">
                        12 days
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <Card className="bg-white/90 backdrop-blur-lg border-4 border-purple-300 rounded-3xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-3xl font-bold flex items-center gap-3">
                    <Edit className="w-8 h-8 text-purple-500" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-gray-800 font-bold text-2xl mb-4">
                        Profile Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-gray-700 font-bold text-lg mb-2 block">
                            Display Name
                          </label>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-800 text-lg bg-gray-100 px-4 py-2 rounded-xl flex-1">
                              {playerData.name}
                            </span>
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-700 font-bold text-lg mb-2 block">
                            Title
                          </label>
                          <span className="text-gray-800 text-lg bg-gray-100 px-4 py-2 rounded-xl block">
                            {playerData.title}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-700 font-bold text-lg mb-2 block">
                            Member Since
                          </label>
                          <span className="text-gray-800 text-lg bg-gray-100 px-4 py-2 rounded-xl block">
                            {playerData.joinDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-gray-800 font-bold text-2xl mb-4">
                        Learning Preferences
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                          <span className="text-gray-800 font-bold text-lg">
                            Daily Reminders
                          </span>
                          <Button className="bg-green-500 text-white">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                          <span className="text-gray-800 font-bold text-lg">
                            Sound Effects
                          </span>
                          <Button className="bg-green-500 text-white">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                          <span className="text-gray-800 font-bold text-lg">
                            Animations
                          </span>
                          <Button className="bg-green-500 text-white">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                          <span className="text-gray-800 font-bold text-lg">
                            Difficulty Level
                          </span>
                          <span className="text-purple-600 font-bold text-lg">
                            Intermediate
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-4 border-purple-300 pt-8">
                    <h3 className="text-gray-800 font-bold text-2xl mb-6">
                      Account Actions
                    </h3>
                    <div className="flex gap-4">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-xl font-bold">
                        Export Data
                      </Button>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-8 py-3 rounded-xl font-bold">
                        Reset Progress
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-3 rounded-xl font-bold">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}