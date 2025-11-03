import React, { useState, useEffect } from "react";
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
  Home,
  BookOpen,
  Gamepad2,
  Brain,
  Trophy,
  Star,
  Coins,
  Calendar,
  Target,
  Award,
  Sparkles,
  Rocket,
  Crown,
  Edit,
  Lock,
} from "lucide-react";

interface MissionControlProps {
  playerName: string;
  onNavigate: (section: string) => void;
}

export default function MissionControl({
  playerName,
  onNavigate,
}: MissionControlProps) {
  const [playerData, setPlayerData] = useState({
    level: 9,
    title: "Cosmic Cadet",
    cosmicCoins: 127,
    dayStreak: 4,
    totalScore: 2450,
    memberSince: "September 2025",
  });

  const progressData = [
    {
      title: "Stories",
      icon: BookOpen,
      completed: 3,
      total: 12,
      progress: (3 / 12) * 100,
      color: "from-blue-400 to-purple-500",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      title: "Games",
      icon: Gamepad2,
      completed: 5,
      total: 20,
      progress: (5 / 20) * 100,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      title: "Quizzes",
      icon: Brain,
      completed: 3,
      total: 15,
      progress: (3 / 15) * 100,
      color: "from-pink-400 to-red-500",
      bgColor: "bg-pink-100",
      textColor: "text-pink-700",
    },
  ];

  const recentActivities = [
    {
      title: "Aurora's Magical Dance",
      type: "story",
      icon: "📚",
      points: 15,
      time: "2 hours ago",
      color: "text-blue-600",
    },
    {
      title: "Space Weather Basics",
      type: "quiz",
      icon: "🧠",
      points: 20,
      time: "1 day ago",
      color: "text-green-600",
    },
    {
      title: "Aurora Builder",
      type: "game",
      icon: "🎮",
      points: 15,
      time: "2 days ago",
      color: "text-purple-600",
    },
    {
      title: "Solar Storm Alert!",
      type: "story",
      icon: "📚",
      points: 20,
      time: "3 days ago",
      color: "text-orange-600",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first story",
      icon: "🎯",
      unlocked: true,
      rarity: "Common",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Score 100% on any quiz",
      icon: "🧠",
      unlocked: true,
      rarity: "Rare",
    },
    {
      id: 3,
      title: "Game Champion",
      description: "Win 5 games",
      icon: "🏆",
      unlocked: true,
      rarity: "Epic",
    },
    {
      id: 4,
      title: "Speed Reader",
      description: "Complete 5 chapters quickly",
      icon: "⚡",
      unlocked: false,
      rarity: "Legendary",
    },
    {
      id: 5,
      title: "Perfect Week",
      description: "Study every day for a week",
      icon: "📅",
      unlocked: false,
      rarity: "Legendary",
    },
    {
      id: 6,
      title: "Space Expert",
      description: "Complete 15 lessons",
      icon: "🚀",
      unlocked: false,
      rarity: "Legendary",
    },
  ];

  const playSound = (type: "click" | "success" | "hover") => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === "click") {
      oscillator.frequency.setValueAtTime(
        800,
        audioContext.currentTime,
      );
    } else if (type === "success") {
      oscillator.frequency.setValueAtTime(
        523,
        audioContext.currentTime,
      );
    } else if (type === "hover") {
      oscillator.frequency.setValueAtTime(
        400,
        audioContext.currentTime,
      );
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <motion.nav
          className="flex items-center justify-between mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Rocket className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">
              Stellar Stories
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => onNavigate("home")}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
            >
              🏠 Home
            </Button>
            <Button
              onClick={() => onNavigate("stories")}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              📚 Stories
            </Button>
            <Button
              onClick={() => onNavigate("games")}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl"
            >
              🎮 Games
            </Button>
            <Button
              onClick={() => onNavigate("profile")}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl"
            >
              📊 Dashboard
            </Button>
          </div>
        </motion.nav>

        {/* Mission Control Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
            animate={{
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.5)",
                "0 0 40px rgba(245, 158, 11, 0.8)",
                "0 0 20px rgba(251, 191, 36, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Target className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl font-bold text-white mb-2">
            Mission Control
          </h1>
          <p className="text-xl text-blue-100">
            Track your space weather journey and see how far
            you've traveled!
          </p>
        </motion.div>

        {/* Player Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-3xl mb-8 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Crown className="w-10 h-10 text-white" />
                </motion.div>

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome back, Space Explorer!
                  </h2>
                  <div className="flex items-center gap-4 text-blue-200 text-lg">
                    <span>
                      Level:{" "}
                      <strong className="text-yellow-300">
                        {playerData.title}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Member since{" "}
                      <strong>{playerData.memberSince}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Coins className="w-6 h-6 text-yellow-400" />
                      <span className="text-3xl font-bold text-yellow-400">
                        {playerData.cosmicCoins}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Cosmic Coins
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-6 h-6 text-orange-400" />
                      <span className="text-3xl font-bold text-orange-400">
                        {playerData.dayStreak}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Day Streak
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-6 h-6 text-purple-400" />
                      <span className="text-3xl font-bold text-purple-400">
                        {playerData.totalScore}
                      </span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      Total Score
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {progressData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card
                className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/20 transition-all"
                onClick={() => {
                  playSound("click");
                  onNavigate(item.title.toLowerCase());
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-r ${item.color}`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-blue-200">
                        Completed:{" "}
                        <span className="font-bold">
                          {item.completed}/{item.total}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-blue-200 text-sm mb-2">
                      <span>Progress</span>
                      <span>{Math.round(item.progress)}%</span>
                    </div>
                    <Progress
                      value={item.progress}
                      className="h-3"
                    />
                  </div>

                  <div className="text-right">
                    <span className="text-white font-bold">
                      Won:{" "}
                      <span className={item.textColor}>
                        {item.completed * 4}/{item.total * 4}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {activity.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">
                          {activity.title}
                        </h4>
                        <p className="text-blue-200 text-sm">
                          {activity.type} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-yellow-400 font-bold text-lg">
                        +{activity.points}
                      </span>
                      <div className="w-3 h-3 rounded-full bg-yellow-400 ml-auto mt-1"></div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/15 backdrop-blur-lg border border-white/20 rounded-2xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      className={`p-4 rounded-2xl border text-center ${
                        achievement.unlocked
                          ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/30"
                          : "bg-white/5 border-white/10"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <div
                        className={`text-3xl mb-2 ${achievement.unlocked ? "" : "grayscale opacity-50"}`}
                      >
                        {achievement.unlocked
                          ? achievement.icon
                          : "🔒"}
                      </div>
                      <h5
                        className={`font-bold text-sm mb-1 ${
                          achievement.unlocked
                            ? "text-yellow-300"
                            : "text-gray-400"
                        }`}
                      >
                        {achievement.title}
                      </h5>
                      <p
                        className={`text-xs ${
                          achievement.unlocked
                            ? "text-yellow-200"
                            : "text-gray-500"
                        }`}
                      >
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Continue Journey Buttons */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Continue Your Journey
          </h3>
          <div className="flex justify-center gap-6">
            <Button
              onClick={() => {
                playSound("success");
                onNavigate("stories");
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-2xl font-bold shadow-lg"
            >
              📚 Read Next Story
            </Button>
            <Button
              onClick={() => {
                playSound("success");
                onNavigate("games");
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg px-8 py-4 rounded-2xl font-bold shadow-lg"
            >
              🎮 Play Games
            </Button>
            <Button
              onClick={() => {
                playSound("click");
                onNavigate("home");
              }}
              className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 text-lg px-8 py-4 rounded-2xl font-bold backdrop-blur-sm"
            >
              🏠 Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}