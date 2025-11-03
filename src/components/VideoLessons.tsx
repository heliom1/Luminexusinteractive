import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  BookOpen,
  Star,
  CheckCircle,
  Clock,
  Users,
  Award,
  Sparkles,
  Zap,
  Globe,
  Sun,
  Shield,
  Trophy,
  Rocket,
  Heart,
  Crown,
  PartyPopper,
  Gift,
} from "lucide-react";

interface VideoLessonsProps {
  playerName: string;
  onBack: () => void;
}

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  embedCode: string;
  topics: string[];
  completed: boolean;
  rating: number;
  views: number;
  icon: string;
  color: string;
  points: number;
}

export default function VideoLessons({
  playerName,
  onBack,
}: VideoLessonsProps) {
  const [selectedVideo, setSelectedVideo] =
    useState<VideoLesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<
    string[]
  >(["video1", "video3"]);
  const [showCelebration, setShowCelebration] = useState(false);

  const videoLessons: VideoLesson[] = [
    {
      id: "video1",
      title: "Introduction to Space Weather",
      description:
        "Discover the fascinating world of space weather and how it affects our daily lives on Earth!",
      duration: "12:45",
      difficulty: "Beginner",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6f2nnDKLE"><script src="https://go.screenpal.com/player/appearance/cT6f2nnDKLE"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6f2nnDKLE?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: [
        "Solar Activity",
        "Magnetic Fields",
        "Earth's Atmosphere",
      ],
      completed: true,
      rating: 4.8,
      views: 1250,
      icon: "🌟",
      color: "from-blue-400 to-cyan-400",
      points: 100,
    },
    {
      id: "video2",
      title: "Solar Flares and Their Impact",
      description:
        "Learn about powerful solar flares and how they create spectacular space weather events!",
      duration: "15:30",
      difficulty: "Intermediate",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6e6GnDHRb"><script src="https://go.screenpal.com/player/appearance/cT6e6GnDHRb"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6e6GnDHRb?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: ["Solar Flares", "X-rays", "Radio Blackouts"],
      completed: false,
      rating: 4.9,
      views: 980,
      icon: "☀️",
      color: "from-yellow-400 to-orange-500",
      points: 150,
    },
    {
      id: "video3",
      title: "The Amazing Aurora Phenomenon",
      description:
        "Explore the breathtaking beauty of auroras and understand the science behind these dancing lights!",
      duration: "18:20",
      difficulty: "Beginner",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6e6anDH8g"><script src="https://go.screenpal.com/player/appearance/cT6e6anDH8g"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6e6anDH8g?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: [
        "Northern Lights",
        "Magnetic Field",
        "Charged Particles",
      ],
      completed: true,
      rating: 5.0,
      views: 1850,
      icon: "🌈",
      color: "from-green-400 to-purple-500",
      points: 120,
    },
    {
      id: "video4",
      title: "Protecting Satellites from Space Weather",
      description:
        "Discover how space weather affects satellites and the amazing technology used to protect them!",
      duration: "14:15",
      difficulty: "Advanced",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6eXjnDJn5"><script src="https://go.screenpal.com/player/appearance/cT6eXjnDJn5"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6eXjnDJn5?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: ["Satellites", "Radiation", "Technology"],
      completed: false,
      rating: 4.7,
      views: 750,
      icon: "🛰️",
      color: "from-gray-400 to-blue-500",
      points: 200,
    },
    {
      id: "video5",
      title: "Space Weather and Communication",
      description:
        "Learn how space weather can disrupt radio communications and GPS systems around the world!",
      duration: "16:45",
      difficulty: "Intermediate",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6eXnnDJVU"><script src="https://go.screenpal.com/player/appearance/cT6eXnnDJVU"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6eXnnDJVU?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: ["Radio Waves", "GPS", "Communication"],
      completed: false,
      rating: 4.6,
      views: 690,
      icon: "📡",
      color: "from-purple-400 to-pink-500",
      points: 175,
    },
    {
      id: "video6",
      title: "Power Grids and Geomagnetic Storms",
      description:
        "Understand how powerful geomagnetic storms can affect electrical power systems on Earth!",
      duration: "13:30",
      difficulty: "Intermediate",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6eXlnDJe5"><script src="https://go.screenpal.com/player/appearance/cT6eXlnDJe5"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6eXlnDJe5?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: [
        "Power Grids",
        "Geomagnetic Storms",
        "Infrastructure",
      ],
      completed: false,
      rating: 4.5,
      views: 540,
      icon: "⚡",
      color: "from-yellow-400 to-red-500",
      points: 160,
    },
    {
      id: "video7",
      title: "Space Weather Prediction and Monitoring",
      description:
        "Explore the amazing technology and methods scientists use to predict and monitor space weather!",
      duration: "19:10",
      difficulty: "Advanced",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6eXwnDJjM"><script src="https://go.screenpal.com/player/appearance/cT6eXwnDJjM"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6eXwnDJjM?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: [
        "Prediction",
        "Monitoring",
        "Scientific Methods",
      ],
      completed: false,
      rating: 4.9,
      views: 820,
      icon: "🔬",
      color: "from-teal-400 to-green-500",
      points: 250,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-gradient-to-r from-green-400 to-green-600";
      case "Intermediate":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "Advanced":
        return "bg-gradient-to-r from-red-400 to-red-600";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const handleVideoComplete = (videoId: string) => {
    if (!completedVideos.includes(videoId)) {
      setCompletedVideos((prev) => [...prev, videoId]);
      const video = videoLessons.find((v) => v.id === videoId);
      if (video) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  };

  const playSound = (type: string) => {
    console.log(`🔊 Playing sound: ${type}`);
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        success: 800,
        click: 400,
        celebrate: 1000,
        star: 600,
      };

      oscillator.frequency.value =
        frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(
        0.05,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.3,
      );
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  const VideoPlayer = ({ video }: { video: VideoLesson }) => {
    const [playerProgress, setPlayerProgress] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isVideoPlaying) {
        interval = setInterval(() => {
          setPlayerProgress((prev) => {
            const newProgress = prev + 1;
            if (newProgress >= 100) {
              handleVideoComplete(video.id);
              setIsVideoPlaying(false);
              return 100;
            }
            return newProgress;
          });
        }, 200);
      }
      return () => clearInterval(interval);
    }, [isVideoPlaying, video.id]);

    return (
      <motion.div
        className="bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-blue-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-cyan-400/50 shadow-2xl min-h-screen"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Enhanced Video Header - Mobile Optimized */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-3 md:p-8 border-b-2 md:border-b-4 border-cyan-400/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <Button
              onClick={() => setSelectedVideo(null)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg border-2 border-white/20 self-start"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <div className="text-center flex-1">
              <motion.h2
                className="text-xl md:text-4xl text-white mb-2 md:mb-3 flex items-center justify-center gap-2 md:gap-3 flex-wrap"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 30px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-3xl md:text-5xl">{video.icon}</span>
                <span className="break-words">{video.title}</span>
                <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-yellow-400" />
              </motion.h2>
              <p className="text-cyan-200 text-sm md:text-xl">
                {video.description}
              </p>
            </div>
            <div className="self-start md:self-auto">
              <motion.div
                className={`inline-block px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-white text-sm md:text-lg shadow-lg ${getDifficultyColor(video.difficulty)}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {video.difficulty}
              </motion.div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-0 text-sm md:text-lg text-cyan-100">
            <div className="flex flex-wrap items-center gap-2 md:gap-6 justify-center">
              <motion.span
                className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-xl border border-blue-400/50"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-5 h-5" />
                {video.duration}
              </motion.span>
              <motion.span
                className="flex items-center gap-2 bg-green-500/30 px-4 py-2 rounded-xl border border-green-400/50"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-5 h-5" />
                {video.views.toLocaleString()} views
              </motion.span>
              <motion.span
                className="flex items-center gap-2 bg-yellow-500/30 px-4 py-2 rounded-xl border border-yellow-400/50"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-5 h-5 text-yellow-400" />
                {video.rating} stars
              </motion.span>
            </div>
            {completedVideos.includes(video.id) && (
              <motion.div
                className="flex items-center gap-2 text-green-300 bg-green-500/30 px-4 py-2 rounded-xl border border-green-400/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">
                  Completed! +{video.points} pts
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Updated Video Player Section */}
        <div className="relative bg-black h-full w-full">
          <div
            className="w-full h-full bg-black flex items-center justify-center relative overflow-hidden"
            style={{ position: "relative" }}
            dangerouslySetInnerHTML={{
              __html: `
                <style>
                  .sp-embed-player iframe {
                    width: 100% !important;
                    height: 100% !important;
                    min-height: 0 !important;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                  }
                  .sp-embed-player {
                    width: 100% !important;
                    height: 100% !important;
                    position: relative;
                    overflow: hidden;
                  }
                </style>
                ${video.embedCode
                  .replace(/width="100%"/g, 'width="100%"')
                  .replace(/height="100%"/g, 'height="100%"')
                  .replace(/min-height="\d+px"/g, "")
                  .replace(
                    /style="border:0;"/g,
                    'style="border:0; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"',
                  )}
              `,
            }}
          />
          {/* Enhanced Progress Bar - Outside the embedded video */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <div className="mb-3">
              <Progress
                value={playerProgress}
                className="h-3 bg-gray-800/50 border border-cyan-400/30"
              />
            </div>
            <div className="text-white text-lg font-bold text-center">
              Progress: {playerProgress}% - Keep watching to
              earn {video.points} Learning Points! 🌟
            </div>
          </div>
        </div>

        {/* Enhanced Video Info Section */}
        <div className="p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
          <div className="mb-6">
            <h3 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              What You'll Learn:
            </h3>
            <div className="flex flex-wrap gap-3">
              {video.topics.map((topic, index) => (
                <motion.span
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm text-cyan-200 px-4 py-2 rounded-2xl font-semibold border-2 border-cyan-400/30 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  ✨ {topic}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button
              onClick={() => {
                handleVideoComplete(video.id);
                playSound("success");
              }}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-green-400/50 font-bold text-lg"
            >
              <CheckCircle className="w-6 h-6" />
              Mark as Complete (+{video.points} pts)
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-blue-400/50 font-bold text-lg"
              onClick={() => playSound("click")}
            >
              <Trophy className="w-6 h-6" />
              Take Knowledge Quiz
            </Button>
            <Button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-lg border-2 border-yellow-400/50 font-bold text-lg"
              onClick={() => playSound("star")}
            >
              <Star className="w-6 h-6" />
              Rate This Video
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  const completionPercentage = Math.round(
    (completedVideos.length / videoLessons.length) * 100,
  );
  const totalPoints = completedVideos.reduce(
    (total, videoId) => {
      const video = videoLessons.find((v) => v.id === videoId);
      return total + (video ? video.points : 0);
    },
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center border-4 border-white shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 1, repeat: 2 }}
                className="text-8xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Awesome Job!
              </h2>
              <p className="text-white text-xl">
                You completed another lesson!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedVideo ? (
          <VideoPlayer video={selectedVideo} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8">
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white p-4 rounded-2xl shadow-lg border-2 border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <div className="text-center">
                <motion.h1
                  className="text-5xl font-bold text-white mb-3 flex items-center justify-center gap-4"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.5)",
                      "0 0 40px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(34, 211, 238, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Play className="w-12 h-12 text-cyan-400" />
                  🎬 Video Learning Center 🌟
                  <Sparkles className="w-12 h-12 text-purple-400" />
                </motion.h1>
                <p className="text-cyan-200 text-2xl font-semibold">
                  Learn space weather through amazing videos,{" "}
                  {playerName}! 🚀
                </p>
              </div>
              <div className="text-right">
                <motion.div
                  className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm rounded-2xl px-6 py-4 border-2 border-yellow-400/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 text-white mb-2">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <span className="font-bold text-xl">
                      Your Progress
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Progress
                      value={completionPercentage}
                      className="w-24 h-3"
                    />
                    <span className="text-white font-bold text-lg">
                      {completionPercentage}%
                    </span>
                  </div>
                  <p className="text-yellow-200 font-semibold">
                    {completedVideos.length}/
                    {videoLessons.length} videos • {totalPoints}{" "}
                    points earned! 🏆
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoLessons.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Card
                    className="bg-gradient-to-br from-gray-800/60 via-blue-900/60 to-purple-900/60 backdrop-blur-lg border-4 border-cyan-400/30 hover:border-cyan-400/60 cursor-pointer group h-full shadow-2xl overflow-hidden"
                    onClick={() => {
                      setSelectedVideo(video);
                      playSound("click");
                    }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className={`text-6xl p-4 rounded-3xl bg-gradient-to-r ${video.color} shadow-xl border-4 border-white/20`}
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            rotate: {
                              duration: 4,
                              repeat: Infinity,
                            },
                            scale: {
                              duration: 2,
                              repeat: Infinity,
                            },
                          }}
                        >
                          {video.icon}
                        </motion.div>
                        <div className="text-right">
                          {completedVideos.includes(
                            video.id,
                          ) && (
                            <motion.div
                              initial={{
                                scale: 0,
                                rotate: -180,
                              }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="text-green-400 mb-3"
                            >
                              <CheckCircle className="w-8 h-8" />
                            </motion.div>
                          )}
                          <motion.div
                            className={`inline-block px-4 py-2 rounded-2xl text-white font-bold text-sm ${getDifficultyColor(video.difficulty)} shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {video.difficulty}
                          </motion.div>
                          <div className="text-cyan-300 font-bold text-lg mt-2">
                            +{video.points} pts
                          </div>
                        </div>
                      </div>

                      <CardTitle className="text-white text-xl group-hover:text-cyan-300 transition-colors font-bold">
                        {video.title}
                      </CardTitle>
                      <p className="text-gray-300 leading-relaxed font-medium">
                        {video.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                        <motion.span
                          className="flex items-center gap-2 bg-blue-500/30 px-3 py-2 rounded-xl"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Clock className="w-4 h-4" />
                          {video.duration}
                        </motion.span>
                        <motion.span
                          className="flex items-center gap-2 bg-yellow-500/30 px-3 py-2 rounded-xl"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Star className="w-4 h-4 text-yellow-400" />
                          {video.rating}
                        </motion.span>
                        <motion.span
                          className="flex items-center gap-2 bg-green-500/30 px-3 py-2 rounded-xl"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Users className="w-4 h-4" />
                          {video.views}
                        </motion.span>
                      </div>
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {video.topics
                            .slice(0, 2)
                            .map((topic, i) => (
                              <span
                                key={i}
                                className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 px-3 py-1 rounded-xl text-xs font-semibold border border-purple-400/30"
                              >
                                {topic}
                              </span>
                            ))}
                          {video.topics.length > 2 && (
                            <span className="bg-gradient-to-r from-gray-500/30 to-gray-600/30 text-gray-200 px-3 py-1 rounded-xl text-xs font-semibold border border-gray-400/30">
                              +{video.topics.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        className={`w-full bg-gradient-to-r ${video.color} hover:opacity-90 text-white font-bold py-4 rounded-2xl text-lg shadow-xl transform transition-all duration-300 group-hover:scale-105 border-2 border-white/20`}
                      >
                        <Play className="w-5 h-5 mr-3" />
                        {completedVideos.includes(video.id)
                          ? "🎉 Watch Again"
                          : "🚀 Start Learning"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Achievement Section */}
            <motion.div
              className="mt-12 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-lg rounded-3xl p-10 border-4 border-purple-400/50 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <motion.h3
                  className="text-4xl font-bold text-white mb-6 flex items-center justify-center gap-4"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 30px rgba(168, 85, 247, 0.8)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-10 h-10 text-yellow-400" />
                  🏆 Your Amazing Learning Journey! 🌟
                  <Gift className="w-10 h-10 text-pink-400" />
                </motion.h3>
                <p className="text-cyan-200 text-xl mb-8 font-semibold">
                  Fantastic work, {playerName}! You're becoming
                  a space weather expert! 🚀✨
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <motion.div
                    className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl p-6 border-2 border-yellow-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">🏆</div>
                    <h4 className="text-white font-bold text-xl">
                      Videos Completed
                    </h4>
                    <p className="text-yellow-300 text-3xl font-bold">
                      {completedVideos.length}/
                      {videoLessons.length}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl p-6 border-2 border-green-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">⏱️</div>
                    <h4 className="text-white font-bold text-xl">
                      Watch Time
                    </h4>
                    <p className="text-green-300 text-3xl font-bold">
                      4h 12m
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl p-6 border-2 border-purple-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">⭐</div>
                    <h4 className="text-white font-bold text-xl">
                      Points Earned
                    </h4>
                    <p className="text-purple-300 text-3xl font-bold">
                      {totalPoints}
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl p-6 border-2 border-blue-400/50"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-5xl mb-4">🌟</div>
                    <h4 className="text-white font-bold text-xl">
                      Knowledge Level
                    </h4>
                    <p className="text-blue-300 text-3xl font-bold">
                      {completionPercentage < 30
                        ? "Space Cadet"
                        : completionPercentage < 60
                          ? "Star Explorer"
                          : completionPercentage < 90
                            ? "Cosmic Expert"
                            : "Space Master"}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}