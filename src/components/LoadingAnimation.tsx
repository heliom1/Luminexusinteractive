import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({
  onComplete,
}: LoadingAnimationProps) {
  const [stage, setStage] = useState<
    "idle" | "particles" | "absorbing" | "flash" | "complete"
  >("idle");
  const [isClicked, setIsClicked] = useState(false);

  // Generate scattered light particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: i * 30 + Math.random() * 20,
    distance: 150 + Math.random() * 100,
  }));

  const playLoadingSound = (
    type: "rise" | "click" | "particles" | "absorb" | "flash",
  ) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case "rise":
          oscillator.frequency.setValueAtTime(
            200,
            audioContext.currentTime,
          );
          oscillator.frequency.exponentialRampToValueAtTime(
            400,
            audioContext.currentTime + 2,
          );
          break;
        case "click":
          oscillator.frequency.setValueAtTime(
            600,
            audioContext.currentTime,
          );
          oscillator.frequency.exponentialRampToValueAtTime(
            800,
            audioContext.currentTime + 0.2,
          );
          break;
        case "particles":
          oscillator.frequency.setValueAtTime(
            400,
            audioContext.currentTime,
          );
          oscillator.frequency.setValueAtTime(
            600,
            audioContext.currentTime + 0.5,
          );
          oscillator.frequency.setValueAtTime(
            800,
            audioContext.currentTime + 1,
          );
          break;
        case "absorb":
          oscillator.frequency.setValueAtTime(
            800,
            audioContext.currentTime,
          );
          oscillator.frequency.exponentialRampToValueAtTime(
            400,
            audioContext.currentTime + 1,
          );
          break;
        case "flash":
          oscillator.frequency.setValueAtTime(
            1000,
            audioContext.currentTime,
          );
          oscillator.frequency.exponentialRampToValueAtTime(
            1500,
            audioContext.currentTime + 0.5,
          );
          break;
      }

      const duration =
        type === "rise"
          ? 2
          : type === "particles" || type === "absorb"
            ? 1.5
            : 0.5;
      gainNode.gain.setValueAtTime(
        0.2,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  const handleSilhouetteClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      playLoadingSound("click");
      setStage("particles");
    }
  };

  useEffect(() => {
    // Play rising sound on mount with a small delay to avoid audio context issues
    const timer = setTimeout(() => {
      playLoadingSound("rise");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage === "particles") {
      playLoadingSound("particles");
      const timer = setTimeout(
        () => setStage("absorbing"),
        2000,
      );
      return () => clearTimeout(timer);
    } else if (stage === "absorbing") {
      playLoadingSound("absorb");
      const timer = setTimeout(() => setStage("flash"), 1500);
      return () => clearTimeout(timer);
    } else if (stage === "flash") {
      playLoadingSound("flash");
      const timer = setTimeout(
        () => setStage("complete"),
        1000,
      );
      return () => clearTimeout(timer);
    } else if (stage === "complete") {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
      {/* Flash effect */}
      <AnimatePresence>
        {stage === "flash" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Magical background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <div className="w-4 h-4 rounded-full bg-yellow-300" />
          </motion.div>
        ))}
      </div>

      {/* Main character container */}
      <div className="relative flex flex-col items-center">
        {/* Magical light particles */}
        <AnimatePresence>
          {(stage === "particles" || stage === "absorbing") && (
            <>
              {particles.map((particle) => {
                const x =
                  Math.cos((particle.angle * Math.PI) / 180) *
                  particle.distance;
                const y =
                  Math.sin((particle.angle * Math.PI) / 180) *
                  particle.distance;

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute w-6 h-6 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${
                        particle.id % 3 === 0
                          ? "#fbbf24"
                          : particle.id % 3 === 1
                            ? "#ec4899"
                            : "#06b6d4"
                      }, transparent)`,
                      boxShadow: `0 0 15px ${
                        particle.id % 3 === 0
                          ? "#fbbf24"
                          : particle.id % 3 === 1
                            ? "#ec4899"
                            : "#06b6d4"
                      }`,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={
                      stage === "particles"
                        ? {
                            x: x,
                            y: y,
                            scale: [0, 2, 1.5],
                            opacity: 1,
                            rotate: [0, 360],
                          }
                        : {
                            x: 0,
                            y: 0,
                            scale: [1.5, 0.8, 0],
                            opacity: [1, 1, 0],
                          }
                    }
                    transition={
                      stage === "particles"
                        ? {
                            duration: 1.8,
                            ease: "easeOut",
                            scale: { duration: 1 },
                            rotate: {
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }
                        : {
                            duration: 1.5,
                            ease: "easeIn",
                          }
                    }
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Cute space character */}
        <motion.div
          className="relative cursor-pointer"
          onClick={handleSilhouetteClick}
          whileHover={
            !isClicked ? { scale: 1.1, rotate: 5 } : {}
          }
          animate={
            stage === "absorbing" || stage === "flash"
              ? {
                  filter: [
                    "brightness(1) drop-shadow(0 0 0px #ffffff)",
                    "brightness(2.5) drop-shadow(0 0 30px #ffffff)",
                    "brightness(3) drop-shadow(0 0 50px #ffffff)",
                  ],
                  scale: [1, 1.2, 1.1],
                }
              : {}
          }
        >
          {/* Character body */}
          <motion.div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-8 border-white shadow-2xl"
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                "0 20px 40px rgba(0,0,0,0.3)",
                "0 30px 60px rgba(0,0,0,0.4)",
                "0 20px 40px rgba(0,0,0,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <ImageWithFallback
                src="https://i.ibb.co/BVzmty5Z/Chat-GPT-Image-Oct-5-2025-11-18-17-AM.png"
                alt="Space Character"
                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-300"
              />
            </motion.div>
          </motion.div>

          {/* Glowing heart */}
          <motion.div
            className="absolute top-0 -right-0 justify -translate-y-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-red-400 flex items-center justify-center border-2 border-white"
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.8, 1.3, 0.8],
              boxShadow: [
                "0 0 20px rgba(236, 72, 153, 0.8)",
                "0 0 40px rgba(239, 68, 68, 0.8)",
                "0 0 20px rgba(236, 72, 153, 0.8)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Fun instruction BELOW Cosmos */}
        <AnimatePresence>
          {!isClicked && (
            <motion.div
              className="absolute top-full left-1/2 mt-6 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pink-300"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-gray-800 font-bold text-xl mb-2">
                  Click the heart to start! 💖
                </p>
                <motion.div
                  className="text-4xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ☝
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading messages */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClicked ? 1 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-4 shadow-lg border-4 border-blue-300"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-gray-800 font-bold text-lg">
            {stage === "particles" &&
              "✨ Collecting magical star dust..."}
            {stage === "absorbing" &&
              "🌟 Getting super space powers..."}
            {stage === "flash" &&
              "🎉 Welcome to your space adventure!"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}