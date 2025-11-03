import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Trophy,
  Star,
  Crown,
  Zap,
  Target,
  Sparkles,
  Award,
  Medal,
  X,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode; // changed from string to ReactNode to allow JSX icons or emoji
  category:
    | "learning"
    | "gaming"
    | "creativity"
    | "exploration"
    | "mastery";
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  dateUnlocked?: string;
  points: number;
}

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

function AchievementPopup({
  achievement,
  onClose,
}: AchievementPopupProps) {
  const rarityColors = {
    common: "from-gray-400 to-gray-600",
    uncommon: "from-green-400 to-green-600",
    rare: "from-blue-400 to-blue-600",
    epic: "from-purple-400 to-purple-600",
    legendary: "from-yellow-400 to-orange-600",
  };

  const playUnlockSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Play a triumphant chord
      oscillator.frequency.setValueAtTime(
        523,
        audioContext.currentTime,
      ); // C5
      oscillator.frequency.setValueAtTime(
        659,
        audioContext.currentTime + 0.15,
      ); // E5
      oscillator.frequency.setValueAtTime(
        784,
        audioContext.currentTime + 0.3,
      ); // G5
      oscillator.frequency.setValueAtTime(
        1047,
        audioContext.currentTime + 0.45,
      ); // C6

      gainNode.gain.setValueAtTime(
        0.2,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.8,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      // Silently handle audio errors
    }
  };

  useEffect(() => {
    playUnlockSound();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl border-4 border-yellow-300 shadow-2xl max-w-md mx-4 overflow-hidden"
        initial={{ scale: 0.5, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 100 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Header */}
        <div
          className={`h-32 bg-gradient-to-br ${rarityColors[achievement.rarity]} relative overflow-hidden`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-6xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {typeof achievement.icon === "string" ? (
                <span>{achievement.icon}</span>
              ) : (
                achievement.icon
              )}
            </motion.div>
          </div>

          {/* Sparkle effects */}
          {[...Array(8)].map((_, i: number) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <CardContent className="p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Achievement Unlocked!
            </h2>

            <Badge
              className={`text-sm font-bold mb-4 ${
                achievement.rarity === "common"
                  ? "bg-gray-500"
                  : achievement.rarity === "uncommon"
                    ? "bg-green-500"
                    : achievement.rarity === "rare"
                      ? "bg-blue-500"
                      : achievement.rarity === "epic"
                        ? "bg-purple-500"
                        : "bg-gradient-to-r from-yellow-400 to-orange-500"
              } text-white px-3 py-1`}
            >
              {achievement.rarity.charAt(0).toUpperCase() +
                achievement.rarity.slice(1)}
            </Badge>

            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {achievement.title}
            </h3>
            <p className="text-gray-600 text-lg mb-4">
              {achievement.description}
            </p>

            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-600">
                  +{achievement.points} points
                </span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </motion.div>
    </motion.div>
  );
}

interface AchievementSystemProps {
  playerName: string;
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

export default function AchievementSystem({
  playerName,
  onAchievementUnlocked,
}: AchievementSystemProps) {
  const [achievements, setAchievements] = useState<
    Achievement[]
  >([
    {
      id: "first-steps",
      title: "First Steps",
      description: "Complete your first interactive lesson",
      icon: "🎯",
      category: "learning",
      rarity: "common",
      unlocked: true,
      points: 10,
      dateUnlocked: "2025-01-15",
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Get a perfect score on any quiz",
      icon: "🧠",
      category: "learning",
      rarity: "rare",
      unlocked: true,
      points: 50,
      dateUnlocked: "2025-01-18",
    },
    {
      id: "aurora-artist",
      title: "Aurora Artist",
      description: "Create 5 aurora designs in the Space Lab",
      icon: "🎨",
      category: "creativity",
      rarity: "uncommon",
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      points: 25,
      dateUnlocked: "2025-01-20",
    },
    {
      id: "game-champion",
      title: "Game Champion",
      description: "Win 10 games in a row",
      icon: "🏆",
      category: "gaming",
      rarity: "epic",
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      points: 100,
      dateUnlocked: "2025-01-22",
    },
    {
      id: "space-defender",
      title: "Space Defender",
      description: "Complete the satellite defense mission",
      icon: "🛡️",
      category: "gaming",
      rarity: "rare",
      unlocked: true,
      points: 75,
      dateUnlocked: "2025-01-23",
    },
    {
      id: "perfect-storm",
      title: "Perfect Storm",
      description: "Predict 5 space weather events correctly",
      icon: "⚡",
      category: "mastery",
      rarity: "legendary",
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      points: 200,
    },
    {
      id: "explorer",
      title: "Solar System Explorer",
      description: "Visit all planets in the weather map",
      icon: "🚀",
      category: "exploration",
      rarity: "epic",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      points: 150,
    },
    {
      id: "master-scholar",
      title: "Master Scholar",
      description: "Complete all quizzes with 90%+ score",
      icon: "👨‍🎓",
      category: "mastery",
      rarity: "legendary",
      unlocked: false,
      progress: 3,
      maxProgress: 6,
      points: 250,
    },
    {
      id: "cosmic-collector",
      title: "Cosmic Collector",
      description: "Earn 1000 cosmic coins",
      icon: "💰",
      category: "exploration",
      rarity: "epic",
      unlocked: false,
      progress: 750,
      maxProgress: 1000,
      points: 100,
    },
    {
      id: "story-seeker",
      title: "Story Seeker",
      description: "Read all interactive lessons",
      icon: "📚",
      category: "learning",
      rarity: "rare",
      unlocked: false,
      progress: 5,
      maxProgress: 8,
      points: 75,
    },
    {
      id: "creative-genius",
      title: "Creative Genius",
      description: "Use all Space Lab activities",
      icon: "💡",
      category: "creativity",
      rarity: "epic",
      unlocked: false,
      progress: 2,
      maxProgress: 4,
      points: 125,
    },
    {
      id: "speed-demon",
      title: "Speed Demon",
      description:
        "Answer 10 quiz questions in under 5 seconds each",
      icon: "⚡",
      category: "gaming",
      rarity: "rare",
      unlocked: false,
      progress: 6,
      maxProgress: 10,
      points: 80,
    },
    {
      id: "helper",
      title: "Helpful Student",
      description: "Use the help system",
      icon: "❓",
      category: "exploration",
      rarity: "common",
      unlocked: false,
      points: 15,
    },
    {
      id: "night-owl",
      title: "Night Owl",
      description: "Study space weather for 7 consecutive days",
      icon: "🦉",
      category: "mastery",
      rarity: "epic",
      unlocked: false,
      progress: 3,
      maxProgress: 7,
      points: 150,
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Get 100% on 5 different quizzes",
      icon: "💯",
      category: "mastery",
      rarity: "legendary",
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      points: 300,
    },
  ]);

  const [showPopup, setShowPopup] =
    useState<Achievement | null>(null);

  // Mock function to unlock achievements (in a real app, this would be triggered by user actions)
  const checkForNewAchievements = () => {
    const unlockedAchievements = achievements.filter(
      (a: Achievement) => a.unlocked,
    );
    const lockedAchievements = achievements.filter(
      (a: Achievement) => !a.unlocked,
    );

    // Simulate unlocking achievements based on some conditions
    // In a real app, these would be triggered by actual user actions
  };

  useEffect(() => {
    checkForNewAchievements();
  }, []);

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev: Achievement[]) =>
      prev.map((achievement: Achievement) => {
        if (
          achievement.id === achievementId &&
          !achievement.unlocked
        ) {
          const unlockedAchievement: Achievement = {
            ...achievement,
            unlocked: true,
            dateUnlocked: new Date()
              .toISOString()
              .split("T")[0],
          };
          setShowPopup(unlockedAchievement);
          if (onAchievementUnlocked) {
            onAchievementUnlocked(unlockedAchievement);
          }
          return unlockedAchievement;
        }
        return achievement;
      }),
    );
  };

  const updateProgress = (
    achievementId: string,
    progress: number,
  ) => {
    setAchievements((prev: Achievement[]) =>
      prev.map((achievement: Achievement) => {
        if (
          achievement.id === achievementId &&
          !achievement.unlocked
        ) {
          if (
            achievement.maxProgress &&
            progress >= achievement.maxProgress
          ) {
            const unlockedAchievement: Achievement = {
              ...achievement,
              progress,
              unlocked: true,
              dateUnlocked: new Date()
                .toISOString()
                .split("T")[0],
            };
            setShowPopup(unlockedAchievement);
            if (onAchievementUnlocked) {
              onAchievementUnlocked(unlockedAchievement);
            }
            return unlockedAchievement;
          } else {
            return { ...achievement, progress };
          }
        }
        return achievement;
      }),
    );
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <AchievementPopup
            achievement={showPopup}
            onClose={() => setShowPopup(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Export hook for other components to trigger achievements
export const useAchievements = () => {
  const triggerAchievement = (achievementId: string) => {
    // This would connect to the achievement system context
    console.log(`Achievement triggered: ${achievementId}`);
  };

  const updateAchievementProgress = (
    achievementId: string,
    progress: number,
  ) => {
    // This would connect to the achievement system context
    console.log(
      `Achievement progress updated: ${achievementId} - ${progress}`,
    );
  };

  return { triggerAchievement, updateAchievementProgress };
};