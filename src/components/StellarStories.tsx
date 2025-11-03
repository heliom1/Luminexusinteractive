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
import {
  BookOpen,
  Sun,
  Zap,
  Globe,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Plane,
  Radio,
  Shield,
  Heart,
  Star,
  Smile,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StellarStoriesProps {
  playerName: string;
  onBack: () => void;
}

interface StoryPage {
  id: number;
  title: string;
  content: string;
  image: React.ReactNode;
  choices?: { text: string; nextPage: number }[];
  facts?: string[];
  animation?: "pulse" | "bounce" | "spin" | "glow";
}

export default function StellarStories({
  playerName,
  onBack,
}: StellarStoriesProps) {
  const [selectedStory, setSelectedStory] = useState<
    string | null
  >(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);

  const stories = [
    {
      id: "stella",
      title: "Solar Flare Journey: Sun to Earth",
      description:
        "Learn how solar flares travel through space and affect our planet!",
      icon: Sun,
      color: "from-yellow-400 to-orange-500",
      pages: [
        {
          id: 0,
          title: "Introduction: What is a Solar Flare? ☀️",
          content: `Hello ${playerName}! 👋 I'm Stella, representing a solar flare! Solar flares are sudden releases of electromagnetic energy from the Sun's surface. We're created when magnetic field lines become twisted and suddenly reconnect, releasing enormous amounts of energy. Today, let's explore my journey from the Sun to Earth and learn about space weather! Ready to discover the science? 🚀✨`,
          image: (
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mx-auto border-8 border-white shadow-2xl"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 30px rgba(251, 191, 36, 0.8)",
                  "0 0 60px rgba(245, 158, 11, 0.8)",
                  "0 0 30px rgba(251, 191, 36, 0.8)",
                ],
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: { duration: 2, repeat: Infinity },
                boxShadow: { duration: 3, repeat: Infinity },
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sun className="w-20 h-20 text-white" />
              </motion.div>
            </motion.div>
          ),
          choices: [
            {
              text: "🚀 Yes! Let's learn about your space journey!",
              nextPage: 1,
            },
            {
              text: "🤔 Tell me more about solar flares first!",
              nextPage: 5,
            },
          ],
          animation: "glow",
        },
        {
          id: 1,
          title: "Solar Flare Propagation 🚀",
          content:
            "Now I'm traveling through space at incredible speeds! Solar flares can reach velocities of 300-2000 km/s. The electromagnetic radiation I carry travels at the speed of light, reaching Earth in about 8 minutes - the same time it takes sunlight to reach our planet! I'm also carrying charged particles that will take longer to arrive. Let's see what happens next! ✨",
          image: (
            <div className="relative w-full h-32">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto border-4 border-white shadow-xl flex items-center justify-center"
                animate={{ x: [-60, 60, -60] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  😊
                </motion.div>
              </motion.div>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    background:
                      i % 3 === 0
                        ? "#fbbf24"
                        : i % 3 === 1
                          ? "#ec4899"
                          : "#06b6d4",
                  }}
                  animate={{
                    x: [
                      0,
                      (i % 2 === 0 ? 1 : -1) * (30 + i * 8),
                    ],
                    y: [
                      0,
                      (i % 3 === 0 ? 1 : -1) * (20 + i * 5),
                    ],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          ),
          choices: [
            {
              text: "🌍 What happens when you get to Earth?",
              nextPage: 2,
            },
          ],
          facts: [
            "Solar flares travel at speeds up to 2000 km/s - that's incredibly fast! 🚀",
            "Electromagnetic radiation from solar flares reaches Earth in 8 minutes! ⚡",
          ],
          animation: "pulse",
        },
        {
          id: 2,
          title: "Meeting Earth's Magnetic Shield",
          content:
            "Whoa! I've just encountered Earth's magnetic field - it's like a giant invisible shield protecting the planet! Most of my energy gets deflected, but some of it interacts with the magnetic field lines. This creates beautiful auroras at the North and South poles!",
          image: (
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full bg-blue-500 mx-auto"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.7)",
                    "0 0 0 20px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Globe className="w-12 h-12 text-white mx-auto mt-6" />
              </motion.div>
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full"
                animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          ),
          choices: [
            {
              text: "How do I affect people on Earth?",
              nextPage: 3,
            },
            { text: "Tell me about the auroras!", nextPage: 4 },
          ],
          facts: [
            "Earth's magnetic field extends about 65,000 km into space",
            "Auroras occur 100-300 km above Earth's surface",
          ],
          animation: "bounce",
        },
        {
          id: 3,
          title: "Effects on Technology and People",
          content:
            "My arrival can affect many things on Earth! I might disrupt GPS signals, making navigation tricky for pilots and drivers. Radio communications could get fuzzy, and sometimes I even affect power grids. But don't worry - scientists monitor space weather to keep everyone safe!",
          image: (
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-blue-500/20 rounded-lg p-3 flex flex-col items-center"
              >
                <Plane className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-white text-xs text-center">
                  Pilots
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-green-500/20 rounded-lg p-3 flex flex-col items-center"
              >
                <Radio className="w-8 h-8 text-green-400 mb-2" />
                <span className="text-white text-xs text-center">
                  Radio
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-purple-500/20 rounded-lg p-3 flex flex-col items-center"
              >
                <Rocket className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-white text-xs text-center">
                  Astronauts
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-yellow-500/20 rounded-lg p-3 flex flex-col items-center"
              >
                <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                <span className="text-white text-xs text-center">
                  Power Grid
                </span>
              </motion.div>
            </div>
          ),
          choices: [
            {
              text: "How do scientists protect us?",
              nextPage: 6,
            },
            { text: "Start the story again", nextPage: 0 },
          ],
          facts: [
            "Strong solar storms can disrupt GPS for hours",
            "The largest recorded solar storm was the Carrington Event in 1859",
          ],
          animation: "pulse",
        },
        {
          id: 4,
          title: "Creating Beautiful Auroras",
          content:
            "When I interact with Earth's atmosphere, I create the most beautiful light show! My charged particles collide with oxygen and nitrogen atoms, making them glow in amazing colors. Green and red from oxygen, blue and purple from nitrogen. It's like painting the sky!",
          image: (
            <div className="relative h-32">
              <motion.div
                className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-400 via-blue-400 to-purple-400 rounded-lg opacity-70"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-green-300 rounded-full"
                  style={{ left: `${20 + i * 15}%`, bottom: 0 }}
                  animate={{
                    height: [20, 40, 20],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          ),
          choices: [
            {
              text: "Amazing! What else should I know?",
              nextPage: 3,
            },
            { text: "Start the story again", nextPage: 0 },
          ],
          facts: [
            "Auroras can be seen from space!",
            "Jupiter and Saturn also have auroras",
          ],
          animation: "glow",
        },
        {
          id: 5,
          title: "What Are Solar Flares?",
          content:
            "Solar flares are sudden releases of electromagnetic energy from the Sun's surface. We happen when magnetic field lines on the Sun get twisted and suddenly snap back into place, like a rubber band! This releases enormous amounts of energy - equivalent to billions of atomic bombs!",
          image: (
            <motion.div
              className="w-32 h-32 mx-auto relative"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <Sun className="w-16 h-16 text-white" />
              </div>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-1 bg-yellow-300"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                    transform: `rotate(${i * 60}deg)`,
                  }}
                  animate={{
                    scaleX: [1, 2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          ),
          choices: [
            {
              text: "Now I'm ready for the journey!",
              nextPage: 1,
            },
          ],
          facts: [
            "Solar flares are classified from A (weakest) to X (strongest)",
            "The largest flare recorded was an X28 in 2003",
          ],
          animation: "spin",
        },
        {
          id: 6,
          title: "Space Weather Scientists",
          content:
            "Scientists around the world work together to monitor space weather! They use special satellites and ground-based instruments to track solar activity. When they detect strong solar storms like me, they send warnings to airlines, power companies, and satellite operators to protect their equipment!",
          image: (
            <div className="flex justify-center items-center space-x-4">
              <motion.div
                className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          ),
          choices: [
            {
              text: "That's amazing! Thanks Stella!",
              nextPage: 7,
            },
            {
              text: "Tell me more about space weather",
              nextPage: 3,
            },
          ],
          facts: [
            "NOAA's Space Weather Prediction Center monitors solar activity 24/7",
            "Space weather can affect satellites 36,000 km above Earth",
          ],
          animation: "bounce",
        },
        {
          id: 7,
          title: "The End - You're Now a Space Weather Expert!",
          content: `Congratulations, ${playerName}! You\'ve learned so much about space weather and how solar flares like me affect Earth. Remember, space weather is a fascinating science that helps keep everyone safe. Maybe one day you\'ll become a space weather scientist too!`,
          image: (
            <motion.div
              className="w-32 h-32 mx-auto flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          ),
          choices: [
            { text: "Read another story", nextPage: -1 },
            { text: "Start this story again", nextPage: 0 },
          ],
          animation: "glow",
        },
      ] as StoryPage[],
    },
  ];

  const currentStory = stories.find(
    (s) => s.id === selectedStory,
  );
  const currentStoryPage = currentStory?.pages.find(
    (p) => p.id === currentPage,
  );

  const handleChoice = (nextPage: number) => {
    if (nextPage === -1) {
      setSelectedStory(null);
      setCurrentPage(0);
    } else {
      setCurrentPage(nextPage);
      setStoryProgress(
        ((nextPage + 1) / currentStory!.pages.length) * 100,
      );
    }
  };

  if (!selectedStory) {
    return (
      <div className="space-y-8">
        {/* Fun Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center border-4 border-white shadow-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              },
              scale: { duration: 2, repeat: Infinity },
            }}
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            📚 Interactive Lessons 📚
          </h2>
          <motion.p
            className="text-2xl text-gray-600 font-semibold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Choose an interactive space weather lesson! 🌟
          </motion.p>
        </motion.div>

        {/* Cosmo's encouragement */}
        <motion.div
          className="max-w-md mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-6 border-4 border-blue-300 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ImageWithFallback
                src="https://sdmntpraustraliaeast.oaiusercontent.com/files/00000000-8db0-61fa-9454-261fd8acf00b/raw?se=2025-10-05T04%3A18%3A03Z&sp=r&sv=2024-08-04&sr=b&scid=b257df20-5805-5402-b593-d3ebf20c64c7&skoid=03727f49-62d3-42ac-8350-1c0e6559d238&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-10-04T23%3A51%3A48Z&ske=2025-10-05T23%3A51%3A48Z&sks=b&skv=2024-08-04&sig=S8Xfvtu5QK/JJhPXpuoRi8T9mbOdkznpc7B1cpHLqRI%3D"
                alt="Veyra"
                className="w-10 h-10 rounded-full object-cover"
              />
            </motion.div>
            <div className="flex-1">
              <p className="text-gray-700 font-bold text-lg">
                Hi {playerName}! Ready to learn? 🎉
              </p>
              <p className="text-gray-600">
                Let's explore space weather science together!
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-6 h-6 text-red-400 fill-current" />
            </motion.div>
          </div>
        </motion.div>

        {/* Story Selection */}
        <div className="grid grid-cols-1 max-w-2xl mx-auto gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="bg-white border-8 border-yellow-300 shadow-2xl cursor-pointer overflow-hidden relative"
                onClick={() => setSelectedStory(story.id)}
              >
                {/* Floating stars */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 text-yellow-400"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 2) * 60}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 360],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    >
                      <Star className="w-full h-full fill-current" />
                    </motion.div>
                  ))}
                </div>

                <CardHeader className="text-center pb-4 relative z-10">
                  <motion.div
                    className={`p-6 rounded-full bg-gradient-to-r ${story.color} w-fit mx-auto mb-4 border-4 border-white shadow-xl`}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: { duration: 3, repeat: Infinity },
                    }}
                  >
                    <story.icon className="w-12 h-12 text-white" />
                  </motion.div>

                  <CardTitle className="text-2xl font-bold text-gray-800 mb-3">
                    {story.title}
                  </CardTitle>
                  <p className="text-gray-600 text-lg font-medium">
                    {story.description}
                  </p>
                </CardHeader>

                <CardContent className="text-center relative z-10 pb-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      className={`bg-gradient-to-r ${story.color} hover:opacity-90 text-white text-xl font-bold py-4 px-8 rounded-2xl border-4 border-white shadow-lg`}
                      size="lg"
                    >
                      <Smile className="w-6 h-6 mr-3" />
                      Let's Read! 📖
                      <ChevronRight className="w-6 h-6 ml-3" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 rounded-lg p-4 backdrop-blur-lg"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold">
            {currentStory?.title}
          </h3>
          <span className="text-cyan-300 text-sm">
            Page {currentPage + 1} of{" "}
            {currentStory?.pages.length}
          </span>
        </div>
        <Progress value={storyProgress} className="h-2" />
      </motion.div>

      {/* Story Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <Card className="bg-white border-8 border-purple-300 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 pb-6">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-gray-800 text-center text-2xl font-bold mb-4">
                  {currentStoryPage?.title}
                </CardTitle>
              </motion.div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                {currentStoryPage?.image}
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border-4 border-blue-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-800 text-center leading-relaxed text-lg font-medium">
                  {currentStoryPage?.content}
                </p>
              </motion.div>

              {/* Fun Facts */}
              {currentStoryPage?.facts && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 border-4 border-yellow-300"
                >
                  <h4 className="text-gray-800 font-bold text-xl mb-4 flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                    Cool Facts!
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                  </h4>
                  <div className="space-y-3">
                    {currentStoryPage.facts.map(
                      (fact, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 bg-white rounded-2xl p-3 border-2 border-yellow-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.8 + index * 0.1,
                          }}
                        >
                          <motion.span
                            className="text-2xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                          >
                            🌟
                          </motion.span>
                          <p className="text-gray-700 font-medium">
                            {fact}
                          </p>
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {/* Choices */}
              <div className="space-y-4">
                {currentStoryPage?.choices?.map(
                  (choice, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() =>
                          handleChoice(choice.nextPage)
                        }
                        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white text-lg font-bold py-4 rounded-2xl border-4 border-white shadow-lg flex items-center justify-between"
                        size="lg"
                      >
                        <span>{choice.text}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          <ChevronRight className="w-6 h-6" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={() => setSelectedStory(null)}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Button>
      </div>
    </div>
  );
}