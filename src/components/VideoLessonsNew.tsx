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
  Home,
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
      title: "Space Weather Forecasting",
      description:
        "Learn how scientists predict space weather and why it matters for astronauts and technology!",
      duration: "16:00",
      difficulty: "Intermediate",
      embedCode:
        '<div class="sp-embed-player" data-id="cT6eXjnDJn5"><script src="https://go.screenpal.com/player/appearance/cT6eXjnDJn5"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT6eXjnDJn5?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>',
      topics: [
        "Forecasting",
        "Sun Observation",
        "Space Missions",
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
        className="bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-blue-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-cyan-400/50 shadow-2xl min-h-screen p-3 md:p-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Enhanced Video Header - Mobile Optimized */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-3 md:p-6 border-b-2 md:border-b-4 border-cyan-400/30">
          <div className="flex items-center justify-between gap-2 md:gap-4 mb-3 md:mb-4">
            <Button
              onClick={() => setSelectedVideo(null)}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-lg border-2 border-white/20 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </Button>
            <div className="text-center flex-1 min-w-0">
              <motion.h2
                className="text-lg md:text-3xl text-white mb-1 md:mb-2 flex items-center justify-center gap-2 flex-wrap"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 30px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-2xl md:text-4xl">{video.icon}</span>
                <span className="break-words">{video.title}</span>
              </motion.h2>
              <p className="text-cyan-200 text-xs md:text-lg line-clamp-2">
                {video.description}
              </p>
            </div>
            <div className="flex-shrink-0">
              <motion.div
                className={`inline-block px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-base shadow-lg ${getDifficultyColor(video.difficulty)}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {video.difficulty}
              </motion.div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-base text-cyan-100">
            <motion.span
              className="flex items-center gap-1 md:gap-2 bg-blue-500/30 px-2 py-1 md:px-3 md:py-2 rounded-lg border border-blue-400/50"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="w-3 h-3 md:w-4 md:h-4" />
              {video.duration}
            </motion.span>
            <motion.span
              className="flex items-center gap-1 md:gap-2 bg-green-500/30 px-2 py-1 md:px-3 md:py-2 rounded-lg border border-green-400/50"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              {video.views.toLocaleString()}
            </motion.span>
            <motion.span
              className="flex items-center gap-1 md:gap-2 bg-yellow-500/30 px-2 py-1 md:px-3 md:py-2 rounded-lg border border-yellow-400/50"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
              {video.rating}
            </motion.span>
            {completedVideos.includes(video.id) && (
              <motion.div
                className="flex items-center gap-1 md:gap-2 text-green-300 bg-green-500/30 px-2 py-1 md:px-3 md:py-2 rounded-lg border border-green-400/50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">
                  +{video.points} pts
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Video Player - Mobile Optimized with Aspect Ratio */}
        <div className="relative bg-black w-full aspect-video">
          <div
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden"
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
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
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
          {/* Enhanced Progress Bar - Mobile Optimized */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 md:p-4">
            <div className="mb-2">
              <Progress
                value={playerProgress}
                className="h-2 md:h-3 bg-gray-800/50 border border-cyan-400/30"
              />
            </div>
            <div className="text-white text-xs md:text-base text-center">
              Progress: {playerProgress}% - Earn {video.points} Points! 🌟
            </div>
          </div>
        </div>

        {/* Enhanced Video Info Section - Mobile Optimized */}
        <div className="p-3 md:p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
          <div className="mb-4 md:mb-6">
            <h3 className="text-white text-base md:text-2xl mb-2 md:mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
              What You'll Learn:
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {video.topics.map((topic, index) => (
                <motion.span
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm text-cyan-200 px-3 py-1 md:px-4 md:py-2 rounded-xl text-xs md:text-base border-2 border-cyan-400/30 shadow-lg"
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
        </div>
      </motion.div>
    );
  };

  if (selectedVideo) {
    return <VideoPlayer video={selectedVideo} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="flex items-center justify-between mb-4 md:mb-8 gap-2">
          <Button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm md:text-xl px-4 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl flex-shrink-0"
          >
            <Home className="w-4 h-4 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>

          <div className="text-center flex-1">
            <h1 className="text-2xl md:text-5xl text-white mb-1 md:mb-4">
              📹 Video Lessons
            </h1>
            <p className="text-sm md:text-2xl text-cyan-200">
              Learn through engaging videos!
            </p>
          </div>

          <div className="flex gap-2 md:gap-4 flex-shrink-0">
            <motion.div
              className="bg-purple-500/30 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 py-2 md:px-6 md:py-4 border-2 border-purple-400/50"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 mx-auto mb-1" />
              <p className="text-white text-xs md:text-lg">{completedVideos.length}/{videoLessons.length}</p>
            </motion.div>
          </div>
        </div>

        {/* Video Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {videoLessons.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`bg-gradient-to-br ${video.color} border-2 md:border-4 border-white/30 shadow-2xl cursor-pointer h-full overflow-hidden`}
                onClick={() => {
                  setSelectedVideo(video);
                  playSound("click");
                }}
              >
                <CardHeader className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <span className="text-4xl md:text-6xl">{video.icon}</span>
                    <div className={`px-2 py-1 md:px-3 md:py-2 rounded-lg md:rounded-xl text-white text-xs md:text-sm ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </div>
                  </div>
                  <CardTitle className="text-white text-lg md:text-2xl mb-2">
                    {video.title}
                  </CardTitle>
                  <p className="text-white/90 text-xs md:text-base line-clamp-2">
                    {video.description}
                  </p>
                </CardHeader>

                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-base text-white/90">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      {video.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-300" />
                      {video.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 md:w-4 md:h-4" />
                      {video.views}
                    </span>
                  </div>

                  {completedVideos.includes(video.id) ? (
                    <div className="bg-green-500/30 border-2 border-green-400 rounded-xl md:rounded-2xl p-2 md:p-3 text-center">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mx-auto mb-1 md:mb-2" />
                      <p className="text-green-200 text-xs md:text-sm">
                        Completed! +{video.points} pts
                      </p>
                    </div>
                  ) : (
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm md:text-lg py-4 md:py-6 rounded-xl md:rounded-2xl border-2 border-white/50">
                      <Play className="w-4 h-4 md:w-6 md:h-6 mr-2" />
                      Watch Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-9xl"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.5, 1], rotate: [0, 360, 720] }}
                transition={{ duration: 1 }}
              >
                🎉
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
