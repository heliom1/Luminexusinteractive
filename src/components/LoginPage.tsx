import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Sparkles,
  Rocket,
  Stars,
  Sun,
  Heart,
  Smile,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onLogin: (name: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            {i % 4 === 0 ? (
              <Stars className="w-6 h-6 text-yellow-400" />
            ) : i % 4 === 1 ? (
              <Sparkles className="w-5 h-5 text-pink-400" />
            ) : i % 4 === 2 ? (
              <Sun className="w-4 h-4 text-orange-400" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-400" />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          bounce: 0.4,
        }}
        className="relative z-10 w-full max-w-lg"
      >
        <Card className="bg-white shadow-2xl border-8 border-purple-300 rounded-3xl overflow-hidden">
          <CardHeader className="text-center space-y-6 bg-gradient-to-r from-purple-100 to-pink-100 pb-8">
            {/* Logo with fun animation */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <motion.div
                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(86, 36, 251, 0.8)",
                    "0 0 60px rgba(11, 245, 105, 0.8)",
                    "0 0 30px rgba(251, 191, 36, 0.8)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="https://i.ibb.co/8DyJFHvD/85744d5dfc908d93964640cd9447becec9784d95.png"
                    alt="Luminexus Logo"
                    className="max-w-[100%] max-h-[100%] object-contain"
                  />
                </div>
              </motion.div>
              {/* Orbiting particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-pink-400"
                  style={{ top: "50%", left: "50%" }}
                  animate={{
                    x: [
                      0,
                      Math.cos((i * 60 * Math.PI) / 180) * 80,
                    ],
                    y: [
                      0,
                      Math.sin((i * 60 * Math.PI) / 180) * 80,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
            <motion.h1
              className="text-5xl font-bold text-purple-600"
              animate={{
                scale: [1, 1.05, 1],
                color: [
                  "#9333ea",
                  "#ec4899",
                  "#3b82f6",
                  "#9333ea",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✨ Luminexus ✨
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-700 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              🚀 Let's Explore Space Together! 🌟
            </motion.p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            {/* Friendly mascot greeting */}
            <motion.div
              className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 border-4 border-blue-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center border-4 border-white"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ImageWithFallback
                    src="https://i.ibb.co/BVzmty5Z/Chat-GPT-Image-Oct-5-2025-11-18-17-AM.png"
                    alt="Veyra the Space Guide"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </motion.div>
                <div>
                  <p className="text-gray-700 font-bold text-lg">
                    Hi! I'm Veyra! 👋
                  </p>
                  <p className="text-gray-600">
                    What's your name, student?
                  </p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <Heart className="w-6 h-6 text-red-400 fill-current" />
                </motion.div>
              </div>
            </motion.div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-gray-700 font-bold text-xl flex items-center gap-3">
                  <Smile className="w-6 h-6 text-yellow-500" />
                  Enter Your Name:
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Type your name here!"
                  className="text-xl py-4 px-6 border-4 border-purple-300 rounded-2xl bg-purple-50 focus:border-purple-500 focus:bg-white transition-all text-gray-700 placeholder:text-gray-400"
                  maxLength={20}
                  required
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 hover:from-yellow-500 hover:via-pink-500 hover:to-cyan-500 text-white text-2xl font-bold py-6 rounded-2xl shadow-xl border-4 border-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                  onClick={() => {
                    if (name.trim()) {
                      onLogin(name.trim());
                    }
                  }}
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  Start Learning! 🚀
                  <Sparkles className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </form>
            <motion.div
              className="text-center bg-yellow-100 rounded-2xl p-4 border-4 border-yellow-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-gray-700 font-semibold text-lg">
                🌈 Discover space weather phenomena through
                interactive lessons! 🌟
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}