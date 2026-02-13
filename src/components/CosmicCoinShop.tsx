import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  ShoppingCart,
  Coins,
  Crown,
  Star,
  Sparkles,
  Rocket,
  Trophy,
  Heart,
  Zap,
  Gift,
  Lock,
  Unlock,
  Check,
  X,
  Info,
  Award,
  Target,
  Shield,
  Flame
} from 'lucide-react';
import { useGameProgress } from '../contexts/GameProgressContext';

interface CosmicCoinShopProps {
  playerName: string;
  isVisible: boolean;
  onClose: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: 'avatar' | 'theme' | 'boost' | 'badge';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  owned: boolean;
}

export default function CosmicCoinShop({
  playerName,
  isVisible,
  onClose
}: CosmicCoinShopProps) {
  const { progress, purchaseItem } = useGameProgress();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState(false);

  const shopItems: ShopItem[] = [
    {
      id: 'item1',
      name: 'Cosmic Explorer Badge',
      description: 'Show off your space exploration skills!',
      cost: 50,
      icon: '🚀',
      type: 'badge',
      rarity: 'common',
      owned: true
    },
    {
      id: 'item2',
      name: 'Double Points Boost',
      description: 'Get 2x points for 1 hour!',
      cost: 100,
      icon: '⚡',
      type: 'boost',
      rarity: 'rare',
      owned: false
    },
    {
      id: 'item3',
      name: 'Aurora Theme',
      description: 'Beautiful northern lights theme',
      cost: 150,
      icon: '🌌',
      type: 'theme',
      rarity: 'epic',
      owned: false
    },
    {
      id: 'item4',
      name: 'Astronaut Avatar',
      description: 'Look like a real astronaut!',
      cost: 200,
      icon: '👨‍🚀',
      type: 'avatar',
      rarity: 'rare',
      owned: false
    },
    {
      id: 'item5',
      name: 'Star Collector Badge',
      description: 'For completing 10 quizzes',
      cost: 75,
      icon: '⭐',
      type: 'badge',
      rarity: 'common',
      owned: true
    },
    {
      id: 'item6',
      name: 'Solar Flare Theme',
      description: 'Fiery red and orange colors',
      cost: 180,
      icon: '☀️',
      type: 'theme',
      rarity: 'epic',
      owned: false
    },
    {
      id: 'item7',
      name: 'Triple XP Boost',
      description: 'Get 3x experience for 30 minutes!',
      cost: 250,
      icon: '🔥',
      type: 'boost',
      rarity: 'legendary',
      owned: false
    },
    {
      id: 'item8',
      name: 'Galaxy Guardian Badge',
      description: 'Ultimate achievement badge',
      cost: 300,
      icon: '👑',
      type: 'badge',
      rarity: 'legendary',
      owned: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '🛍️' },
    { id: 'badge', name: 'Badges', icon: '🏆' },
    { id: 'theme', name: 'Themes', icon: '🎨' },
    { id: 'boost', name: 'Boosts', icon: '⚡' },
    { id: 'avatar', name: 'Avatars', icon: '👤' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const handlePurchase = (item: ShopItem) => {
    const isOwned = progress.ownedItems.includes(item.id);
    if (progress.coins >= item.cost && !isOwned) {
      const success = purchaseItem(item.id, item.cost);
      if (success) {
        setShowPurchaseAnimation(true);
        setTimeout(() => setShowPurchaseAnimation(false), 2000);
        playSound('success');
      } else {
        playSound('error');
      }
    } else if (isOwned) {
      playSound('error');
    } else {
      playSound('error');
    }
  };

  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        success: 800,
        error: 200,
        click: 400
      };

      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.type === selectedCategory);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 rounded-2xl md:rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border-2 md:border-4 border-cyan-400"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Mobile Optimized */}
          <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-3 md:p-6 border-b-2 md:border-b-4 border-cyan-400/30">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="text-3xl md:text-5xl">🛍️</div>
                <div>
                  <h2 className="text-2xl md:text-4xl text-white">
                    Cosmic Coin Shop
                  </h2>
                  <p className="text-cyan-200 text-xs md:text-lg">
                    Use your coins to unlock awesome rewards!
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white p-2 md:p-3 rounded-xl md:rounded-2xl flex-shrink-0"
              >
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </Button>
            </div>

            {/* Coin Balance - Mobile Optimized */}
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl p-3 md:p-4 flex items-center justify-center gap-2 md:gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coins className="w-6 h-6 md:w-10 md:h-10 text-white" />
              <span className="text-white text-2xl md:text-4xl">
                {progress.coins} Cosmic Coins
              </span>
            </motion.div>
          </div>

          {/* Categories - Mobile Optimized with Scroll */}
          <div className="p-3 md:p-6 border-b-2 border-cyan-400/30">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playSound('click');
                  }}
                  className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl text-sm md:text-base whitespace-nowrap flex-shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-lg md:text-xl">{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Shop Items - Mobile Optimized Grid */}
          <div className="p-3 md:p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredItems.map((item, index) => {
                const isOwned = progress.ownedItems.includes(item.id);
                const canAfford = progress.coins >= item.cost;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`bg-gradient-to-br ${getRarityColor(item.rarity)} border-2 md:border-4 border-white/30 h-full ${
                      isOwned ? 'opacity-75' : ''
                    }`}>
                      <CardHeader className="p-3 md:p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-4xl md:text-6xl">{item.icon}</span>
                          {isOwned && (
                            <Badge className="bg-green-500 text-white text-xs md:text-sm">
                              <Check className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                              Owned
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-white text-base md:text-xl mb-1 md:mb-2">
                          {item.name}
                        </CardTitle>
                        <p className="text-white/80 text-xs md:text-sm">
                          {item.description}
                        </p>
                      </CardHeader>
                      <CardContent className="p-3 md:p-4 pt-0">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <div className="flex items-center gap-1 md:gap-2 bg-yellow-500/30 px-2 py-1 md:px-3 md:py-2 rounded-lg">
                            <Coins className="w-3 h-3 md:w-5 md:h-5 text-yellow-300" />
                            <span className="text-white text-sm md:text-lg">
                              {item.cost}
                            </span>
                          </div>
                          <Badge className={`text-xs md:text-sm capitalize ${
                            item.rarity === 'legendary' ? 'bg-yellow-500' :
                            item.rarity === 'epic' ? 'bg-purple-500' :
                            item.rarity === 'rare' ? 'bg-blue-500' :
                            'bg-gray-500'
                          } text-white`}>
                            {item.rarity}
                          </Badge>
                        </div>

                        <Button
                          onClick={() => handlePurchase(item)}
                          disabled={isOwned || !canAfford}
                          className={`w-full text-sm md:text-base py-2 md:py-3 rounded-xl ${
                            isOwned
                              ? 'bg-green-600 cursor-not-allowed'
                              : !canAfford
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-cyan-600 hover:bg-cyan-700'
                          } text-white`}
                        >
                          {isOwned ? (
                            <>
                              <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              Owned
                            </>
                          ) : !canAfford ? (
                            <>
                              <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              Not Enough Coins
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                              Purchase
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Purchase Success Animation */}
          <AnimatePresence>
            {showPurchaseAnimation && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-green-500 rounded-full p-6 md:p-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="w-12 h-12 md:w-20 md:h-20 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}