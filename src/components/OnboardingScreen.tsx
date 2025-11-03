import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Rocket,
  Star,
  Globe,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Heart,
  Smile,
  Brain,
  Target,
  Award,
  Camera,
  Palette,
  Music,
  Gamepad2,
  Book,
  Atom,
  Telescope,
  Sun,
  Moon,
  Zap,
  Shield,
} from "lucide-react";

interface OnboardingScreenProps {
  playerName: string;
  onComplete: (profile: UserProfile) => void;
}

interface UserProfile {
  name: string;
  age: string;
  favoriteColor: string;
  interests: string[];
  spaceGoal: string;
  avatar: string;
  learningStyle: string;
  difficulty: string;
}

export default function OnboardingScreen({
  playerName,
  onComplete,
}: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    name: playerName,
    age: "",
    favoriteColor: "#3b82f6",
    interests: [],
    spaceGoal: "",
    avatar: "🚀",
    learningStyle: "",
    difficulty: "",
  });

  const playSound = (
    type: "click" | "success" | "magic" | "whoosh",
  ) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case "click":
          oscillator.frequency.setValueAtTime(
            800,
            audioContext.currentTime,
          );
          break;
        case "success":
          oscillator.frequency.setValueAtTime(
            523,
            audioContext.currentTime,
          );
          oscillator.frequency.setValueAtTime(
            659,
            audioContext.currentTime + 0.1,
          );
          break;
        case "magic":
          oscillator.frequency.setValueAtTime(
            800,
            audioContext.currentTime,
          );
          oscillator.frequency.setValueAtTime(
            1000,
            audioContext.currentTime + 0.1,
          );
          oscillator.frequency.setValueAtTime(
            1200,
            audioContext.currentTime + 0.2,
          );
          break;
        case "whoosh":
          oscillator.frequency.setValueAtTime(
            400,
            audioContext.currentTime,
          );
          oscillator.frequency.exponentialRampToValueAtTime(
            200,
            audioContext.currentTime + 0.3,
          );
          break;
      }

      gainNode.gain.setValueAtTime(
        0.05,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  const skipOnboarding = () => {
    const defaultProfile: UserProfile = {
      name: playerName,
      age: "12",
      favoriteColor: "#3b82f6",
      interests: ["Space Weather", "Astronomy", "Science"],
      spaceGoal: "Learn about space weather",
      avatar: "🚀",
      learningStyle: "Visual",
      difficulty: "Medium",
    };
    playSound("success");
    onComplete(defaultProfile);
  };

  const steps = [
    {
      title: "Welcome to Space Academy!",
      subtitle: `Great to meet you, ${playerName}! 🚀`,
      component: "welcome",
    },
    {
      title: "Tell us about yourself!",
      subtitle: "Help us personalize your space adventure!",
      component: "age",
    },
    {
      title: "Pick your space avatar!",
      subtitle: "Choose your cosmic identity!",
      component: "avatar",
    },
    {
      title: "What's your favorite color?",
      subtitle: "We'll use this to customize your experience!",
      component: "color",
    },
    {
      title: "What interests you most?",
      subtitle: "Pick as many as you like!",
      component: "interests",
    },
    {
      title: "How do you like to learn?",
      subtitle: "Help us tailor the experience for you!",
      component: "learning",
    },
    {
      title: "Choose your difficulty level!",
      subtitle: "You can always change this later!",
      component: "difficulty",
    },
    {
      title: "What's your space goal?",
      subtitle: "What do you hope to discover?",
      component: "goal",
    },
    {
      title: "Ready for launch!",
      subtitle: "Your space adventure is about to begin!",
      component: "summary",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      playSound("whoosh");
    } else {
      playSound("success");
      onComplete(profile);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      playSound("click");
    }
  };

  const updateProfile = (
    key: keyof UserProfile,
    value: any,
  ) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    playSound("click");
  };

  const toggleInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
    playSound("magic");
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.component) {
      case "welcome":
        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-9xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🚀
            </motion.div>

            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-white">
                Welcome to the most exciting space weather
                adventure!
              </h3>
              <p className="text-2xl text-white/90">
                You're about to become a space weather
                scientist! Let's set up your profile so we can
                create the perfect learning experience just for
                you! ✨
              </p>
            </div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {["🌟", "⚡", "🌈", "🛡️"].map((emoji, index) => (
                <motion.div
                  key={index}
                  className="bg-white/20 rounded-2xl p-6 text-center"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <div className="text-4xl mb-2">{emoji}</div>
                  <div className="text-white font-bold">
                    {
                      [
                        "Solar Flares",
                        "Auroras",
                        "Magnetosphere",
                        "Space Weather",
                      ][index]
                    }
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case "age":
        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎂
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                How old are you?
              </h3>
              <p className="text-xl text-white/80">
                This helps us adjust the content difficulty!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  {
                    range: "6-8",
                    label: "Young Explorer",
                    emoji: "🌱",
                  },
                  {
                    range: "9-12",
                    label: "Space Cadet",
                    emoji: "🚀",
                  },
                  {
                    range: "13-16",
                    label: "Cosmic Scholar",
                    emoji: "🔬",
                  },
                  {
                    range: "17+",
                    label: "Space Expert",
                    emoji: "🎓",
                  },
                ].map((ageGroup) => (
                  <motion.button
                    key={ageGroup.range}
                    onClick={() =>
                      updateProfile("age", ageGroup.range)
                    }
                    className={`p-6 rounded-2xl font-bold text-center transition-all ${
                      profile.age === ageGroup.range
                        ? "bg-white text-purple-600 scale-105 ring-4 ring-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">
                      {ageGroup.emoji}
                    </div>
                    <div className="font-bold text-lg">
                      {ageGroup.range}
                    </div>
                    <div className="text-sm opacity-80">
                      {ageGroup.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "avatar":
        const avatars = [
          "🚀",
          "👨‍🚀",
          "👩‍🚀",
          "🛸",
          "🌟",
          "⚡",
          "🌈",
          "🔬",
          "🛰️",
          "🌍",
          "☀️",
          "🌙",
        ];
        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {profile.avatar}
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Choose your space avatar!
              </h3>
              <p className="text-xl text-white/80">
                This will represent you throughout your journey!
              </p>

              <div className="grid grid-cols-4 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
                {avatars.map((avatar) => (
                  <motion.button
                    key={avatar}
                    onClick={() =>
                      updateProfile("avatar", avatar)
                    }
                    className={`p-4 rounded-2xl text-4xl transition-all ${
                      profile.avatar === avatar
                        ? "bg-white scale-110 ring-4 ring-white"
                        : "bg-white/20 hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "color":
        const colors = [
          {
            name: "Cosmic Blue",
            color: "#3b82f6",
            emoji: "💙",
          },
          {
            name: "Aurora Green",
            color: "#10b981",
            emoji: "💚",
          },
          {
            name: "Solar Orange",
            color: "#f97316",
            emoji: "🧡",
          },
          {
            name: "Nebula Purple",
            color: "#8b5cf6",
            emoji: "💜",
          },
          {
            name: "Star Yellow",
            color: "#eab308",
            emoji: "💛",
          },
          { name: "Mars Red", color: "#ef4444", emoji: "❤️" },
          { name: "Space Pink", color: "#ec4899", emoji: "💗" },
          {
            name: "Galaxy Cyan",
            color: "#06b6d4",
            emoji: "🩵",
          },
        ];

        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                color: [
                  profile.favoriteColor,
                  "#ffffff",
                  profile.favoriteColor,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎨
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                What's your favorite color?
              </h3>
              <p className="text-xl text-white/80">
                We'll use this to personalize your space
                experience!
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {colors.map((colorObj) => (
                  <motion.button
                    key={colorObj.color}
                    onClick={() =>
                      updateProfile(
                        "favoriteColor",
                        colorObj.color,
                      )
                    }
                    className={`p-6 rounded-2xl font-bold text-center transition-all ${
                      profile.favoriteColor === colorObj.color
                        ? "scale-105 ring-4 ring-white"
                        : "hover:scale-102"
                    }`}
                    style={{ backgroundColor: colorObj.color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">
                      {colorObj.emoji}
                    </div>
                    <div className="text-white font-bold">
                      {colorObj.name}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "interests":
        const interests = [
          {
            name: "Space Exploration",
            emoji: "🚀",
            color: "bg-blue-500",
          },
          {
            name: "Solar System",
            emoji: "🌍",
            color: "bg-green-500",
          },
          {
            name: "Astronomy",
            emoji: "🔭",
            color: "bg-purple-500",
          },
          {
            name: "Physics",
            emoji: "⚛️",
            color: "bg-cyan-500",
          },
          {
            name: "Technology",
            emoji: "🛰️",
            color: "bg-orange-500",
          },
          {
            name: "Science Fiction",
            emoji: "👽",
            color: "bg-pink-500",
          },
          {
            name: "Weather",
            emoji: "⛈️",
            color: "bg-indigo-500",
          },
          {
            name: "Mathematics",
            emoji: "🧮",
            color: "bg-red-500",
          },
          {
            name: "Art & Creativity",
            emoji: "🎨",
            color: "bg-yellow-500",
          },
          { name: "Games", emoji: "🎮", color: "bg-teal-500" },
        ];

        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ❤️
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                What interests you most?
              </h3>
              <p className="text-xl text-white/80">
                Pick as many as you like! We'll customize your
                experience based on your interests.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {interests.map((interest) => (
                  <motion.button
                    key={interest.name}
                    onClick={() =>
                      toggleInterest(interest.name)
                    }
                    className={`p-4 rounded-2xl font-bold text-center transition-all ${
                      profile.interests.includes(interest.name)
                        ? `${interest.color} text-white scale-105 ring-4 ring-white`
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-3xl mb-2">
                      {interest.emoji}
                    </div>
                    <div className="font-bold">
                      {interest.name}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="text-white/80">
                Selected: {profile.interests.length} interest
                {profile.interests.length !== 1 ? "s" : ""}
              </div>
            </div>
          </motion.div>
        );

      case "learning":
        const learningStyles = [
          {
            name: "Visual Learner",
            description:
              "I learn best with pictures and diagrams",
            emoji: "👁️",
            color: "bg-blue-500",
          },
          {
            name: "Hands-On Learner",
            description: "I like to try things myself",
            emoji: "✋",
            color: "bg-green-500",
          },
          {
            name: "Step-by-Step",
            description: "I prefer clear instructions",
            emoji: "📋",
            color: "bg-purple-500",
          },
          {
            name: "Explorer",
            description: "I like to discover things on my own",
            emoji: "🗺️",
            color: "bg-orange-500",
          },
        ];

        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧠
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                How do you like to learn?
              </h3>
              <p className="text-xl text-white/80">
                This helps us choose the best teaching methods
                for you!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {learningStyles.map((style) => (
                  <motion.button
                    key={style.name}
                    onClick={() =>
                      updateProfile("learningStyle", style.name)
                    }
                    className={`p-6 rounded-2xl font-bold text-left transition-all ${
                      profile.learningStyle === style.name
                        ? `${style.color} text-white scale-105 ring-4 ring-white`
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">
                        {style.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-xl mb-2">
                          {style.name}
                        </div>
                        <div className="text-sm opacity-90">
                          {style.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "difficulty":
        const difficulties = [
          {
            name: "Beginner",
            description:
              "New to space science - let's start simple!",
            emoji: "🌱",
            color: "bg-green-500",
          },
          {
            name: "Intermediate",
            description:
              "I know some basics and want to learn more!",
            emoji: "🚀",
            color: "bg-blue-500",
          },
          {
            name: "Advanced",
            description: "I love science and want a challenge!",
            emoji: "🔬",
            color: "bg-purple-500",
          },
          {
            name: "Expert",
            description: "Bring on the complex concepts!",
            emoji: "🎓",
            color: "bg-red-500",
          },
        ];

        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎯
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Choose your difficulty level!
              </h3>
              <p className="text-xl text-white/80">
                Don't worry - you can always change this later!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {difficulties.map((difficulty) => (
                  <motion.button
                    key={difficulty.name}
                    onClick={() =>
                      updateProfile(
                        "difficulty",
                        difficulty.name,
                      )
                    }
                    className={`p-6 rounded-2xl font-bold text-left transition-all ${
                      profile.difficulty === difficulty.name
                        ? `${difficulty.color} text-white scale-105 ring-4 ring-white`
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">
                        {difficulty.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-xl mb-2">
                          {difficulty.name}
                        </div>
                        <div className="text-sm opacity-90">
                          {difficulty.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "goal":
        const goals = [
          "Understand how space weather affects Earth",
          "Learn about the Sun and solar storms",
          "Discover how auroras are formed",
          "Explore the solar system",
          "Become a space weather scientist",
          "Just have fun learning!",
        ];

        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎯
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                What's your space goal?
              </h3>
              <p className="text-xl text-white/80">
                What do you hope to discover on this journey?
              </p>

              <div className="space-y-4 max-w-2xl mx-auto">
                {goals.map((goal) => (
                  <motion.button
                    key={goal}
                    onClick={() =>
                      updateProfile("spaceGoal", goal)
                    }
                    className={`w-full p-4 rounded-2xl font-bold text-left transition-all ${
                      profile.spaceGoal === goal
                        ? "bg-white text-purple-600 scale-105 ring-4 ring-white"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">🌟</div>
                      <div>{goal}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "summary":
        return (
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-8xl"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {profile.avatar}
            </motion.div>

            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-white">
                Ready for launch, {profile.name}!
              </h3>
              <p className="text-xl text-white/80">
                Here's your space explorer profile:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/20 rounded-2xl p-6">
                  <h4 className="font-bold text-lg text-white mb-4">
                    About You
                  </h4>
                  <div className="space-y-2 text-white/80">
                    <div>👤 Name: {profile.name}</div>
                    <div>🎂 Age: {profile.age}</div>
                    <div>
                      🎨 Favorite Color:{" "}
                      <span
                        style={{ color: profile.favoriteColor }}
                      >
                        ●
                      </span>
                    </div>
                    <div>
                      📚 Learning Style: {profile.learningStyle}
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 rounded-2xl p-6">
                  <h4 className="font-bold text-lg text-white mb-4">
                    Your Journey
                  </h4>
                  <div className="space-y-2 text-white/80">
                    <div>
                      🎯 Difficulty: {profile.difficulty}
                    </div>
                    <div>
                      ❤️ Interests: {profile.interests.length}{" "}
                      selected
                    </div>
                    <div>
                      🌟 Goal:{" "}
                      {profile.spaceGoal.substring(0, 30)}...
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 max-w-2xl mx-auto"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 40px rgba(34, 197, 94, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h4 className="font-bold text-2xl text-white mb-4">
                  🚀 Mission Ready!
                </h4>
                <p className="text-white text-lg">
                  Your personalized space weather adventure
                  awaits! We've customized everything based on
                  your preferences. Time to explore solar
                  storms, create auroras, and become a space
                  weather expert!
                </p>
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (steps[currentStep].component) {
      case "welcome":
        return true;
      case "age":
        return profile.age !== "";
      case "avatar":
        return profile.avatar !== "";
      case "color":
        return profile.favoriteColor !== "";
      case "interests":
        return profile.interests.length > 0;
      case "learning":
        return profile.learningStyle !== "";
      case "difficulty":
        return profile.difficulty !== "";
      case "goal":
        return profile.spaceGoal !== "";
      case "summary":
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 relative overflow-hidden">
      {/* Skip Button */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={skipOnboarding}
          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-lg rounded-xl px-4 py-2 border-2 border-white/40 font-bold transition-all"
        >
          Skip Setup ⚡
        </Button>
      </motion.div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white/20 rounded-full h-4 mb-4">
            <motion.div
              className="h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex justify-between text-white/80 text-sm">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>
              {Math.round(
                ((currentStep + 1) / steps.length) * 100,
              )}
              % Complete
            </span>
          </div>
        </motion.div>

        {/* Step Content */}
        <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-4 border-white/20 min-h-[600px]">
          <CardHeader className="text-center pb-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-4xl font-bold text-white mb-4">
                {steps[currentStep].title}
              </CardTitle>
              <p className="text-xl text-white/80">
                {steps[currentStep].subtitle}
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <motion.div
          className="flex justify-between items-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 px-6 py-3 rounded-2xl font-bold disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-white scale-125"
                    : index < currentStep
                      ? "bg-green-400"
                      : "bg-white/30"
                }`}
                animate={{
                  scale: index === currentStep ? 1.25 : 1,
                }}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-bold text-xl transition-all disabled:opacity-50 ${
              currentStep === steps.length - 1
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            } text-white border-2 border-white/30`}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Rocket className="w-5 h-5" />
                Launch Adventure!
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}