import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Stars, Sparkles, Rocket, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TransitionCutsceneProps {
  playerName: string;
  section?: {
    title: string;
    emoji: string;
  };
  onComplete: () => void;
}

export default function TransitionCutscene({
  playerName,
  section,
  onComplete,
}: TransitionCutsceneProps) {
  const [stage, setStage] = useState<"zooming" | "message">(
    "zooming",
  );

  const playTransitionSound = (
    type: "whoosh" | "message" | "complete",
  ) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (type) {
        case "whoosh":
          oscillator.frequency.setValueAtTime(
            200,
            audioContext.currentTime,
          );
          oscillator.frequency.exponentialRampToValueAtTime(
            800,
            audioContext.currentTime + 1,
          );
          break;
        case "message":
          oscillator.frequency.setValueAtTime(
            523,
            audioContext.currentTime,
          );
          oscillator.frequency.setValueAtTime(
            659,
            audioContext.currentTime + 0.2,
          );
          break;
        case "complete":
          oscillator.frequency.setValueAtTime(
            523,
            audioContext.currentTime,
          );
          oscillator.frequency.setValueAtTime(
            659,
            audioContext.currentTime + 0.2,
          );
          oscillator.frequency.setValueAtTime(
            784,
            audioContext.currentTime + 0.4,
          );
          oscillator.frequency.setValueAtTime(
            1047,
            audioContext.currentTime + 0.6,
          );
          break;
      }

      gainNode.gain.setValueAtTime(
        0.15,
        audioContext.currentTime,
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.8,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  useEffect(() => {
    // Play initial whoosh sound
    playTransitionSound("whoosh");

    // Zooming stage (2 seconds)
    const timer1 = setTimeout(() => {
      setStage("message");
      playTransitionSound("message");
    }, 2000);

    // Message stage (4 seconds after zooming)
    const timer2 = setTimeout(() => {
      playTransitionSound("complete");
      setTimeout(onComplete, 500); // Call onComplete after a brief delay
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Stars className="w-4 h-4 text-white" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-3 h-3 text-yellow-300" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-pink-300" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {stage === "zooming" && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <motion.div
              className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-2xl border-8 border-yellow-400 mx-auto"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(255, 255, 255, 0.8)",
                  "0 0 60px rgba(255, 255, 0, 0.8)",
                  "0 0 30px rgba(255, 255, 255, 0.8)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Rocket className="w-20 h-20 text-blue-500" />
            </motion.div>

            <motion.h1
              className="text-6xl font-bold text-white mt-6"
              animate={{
                scale: [1, 1.1, 1],
                color: ["#ffffff", "#fbbf24", "#ffffff"],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              WHOOSH! 🚀
            </motion.h1>
          </motion.div>
        )}

        {stage === "message" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Mascot */}
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-8 border-white shadow-2xl mx-auto mb-6"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ImageWithFallback
                src="https://i.ibb.co/BVzmty5Z/Chat-GPT-Image-Oct-5-2025-11-18-17-AM.png"
                alt="Veyra"
                className="w-20 h-20 rounded-full object-cover"
              />
            </motion.div>

            {/* Speech Bubble */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-blue-300 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                type: "spring",
              }}
            >
              <motion.p
                className="text-3xl font-bold text-gray-800 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Awesome choice, {playerName}! 🌟
              </motion.p>

              <motion.p
                className="text-2xl text-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                We're going to{" "}
                {section?.title ?? "your next adventure"}!
              </motion.p>

              <motion.div
                className="text-6xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {section?.emoji ?? "🚀"}
              </motion.div>

              {/* Heart animation */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-red-400 fill-current" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}