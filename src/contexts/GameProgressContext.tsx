import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface GameProgress {
  // Currency and Level
  coins: number;
  xp: number;
  level: number;
  
  // Activity Tracking
  storiesCompleted: string[];
  gamesPlayed: number;
  gamesWon: number;
  quizzesCompleted: string[];
  quizScores: { [key: string]: number };
  activitiesCompleted: string[];
  
  // Shop Items
  ownedItems: string[];
  activeTheme: string;
  activeAvatar: string;
  activeBoosts: string[];
  
  // Achievements
  unlockedAchievements: string[];
  
  // Stats
  totalPoints: number;
  joinDate: string;
  lastActive: string;
}

interface GameProgressContextType {
  progress: GameProgress;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addXP: (amount: number) => void;
  completeStory: (storyId: string) => void;
  recordGamePlayed: (won: boolean) => void;
  completeQuiz: (quizId: string, score: number) => void;
  purchaseItem: (itemId: string, cost: number) => boolean;
  setActiveTheme: (themeId: string) => void;
  setActiveAvatar: (avatarId: string) => void;
  activateBoost: (boostId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  completeActivity: (activityId: string) => void;
  resetProgress: () => void;
}

const GameProgressContext = createContext<GameProgressContextType | undefined>(undefined);

const INITIAL_PROGRESS: GameProgress = {
  coins: 0,
  xp: 0,
  level: 1,
  storiesCompleted: [],
  gamesPlayed: 0,
  gamesWon: 0,
  quizzesCompleted: [],
  quizScores: {},
  activitiesCompleted: [],
  ownedItems: [],
  activeTheme: 'default',
  activeAvatar: 'default',
  activeBoosts: [],
  unlockedAchievements: [],
  totalPoints: 0,
  joinDate: new Date().toISOString().split('T')[0],
  lastActive: 'Today'
};

// XP thresholds for each level
const getXPForLevel = (level: number): number => {
  return level * 500; // Each level requires 500 more XP
};

const getLevelFromXP = (xp: number): number => {
  let level = 1;
  let totalXPNeeded = 0;
  
  while (totalXPNeeded + getXPForLevel(level) <= xp) {
    totalXPNeeded += getXPForLevel(level);
    level++;
  }
  
  return level;
};

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('luminexus_progress');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved progress:', e);
        }
      }
    }
    return INITIAL_PROGRESS;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('luminexus_progress', JSON.stringify(progress));
    }
  }, [progress]);

  const addCoins = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      coins: prev.coins + amount,
      totalPoints: prev.totalPoints + amount
    }));
  };

  const spendCoins = (amount: number): boolean => {
    if (progress.coins >= amount) {
      setProgress(prev => ({
        ...prev,
        coins: prev.coins - amount
      }));
      return true;
    }
    return false;
  };

  const addXP = (amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = getLevelFromXP(newXP);
      const leveledUp = newLevel > prev.level;
      
      // Award bonus coins for leveling up
      const bonusCoins = leveledUp ? (newLevel - prev.level) * 100 : 0;
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        coins: prev.coins + bonusCoins,
        totalPoints: prev.totalPoints + amount
      };
    });
  };

  const completeStory = (storyId: string) => {
    setProgress(prev => {
      if (prev.storiesCompleted.includes(storyId)) {
        return prev; // Already completed
      }
      
      const coins = 50;
      const xp = 100;
      
      return {
        ...prev,
        storiesCompleted: [...prev.storiesCompleted, storyId],
        coins: prev.coins + coins,
        xp: prev.xp + xp,
        level: getLevelFromXP(prev.xp + xp),
        totalPoints: prev.totalPoints + coins + xp
      };
    });
  };

  const recordGamePlayed = (won: boolean) => {
    const coins = won ? 30 : 10;
    const xp = won ? 75 : 25;
    
    setProgress(prev => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
      gamesWon: won ? prev.gamesWon + 1 : prev.gamesWon,
      coins: prev.coins + coins,
      xp: prev.xp + xp,
      level: getLevelFromXP(prev.xp + xp),
      totalPoints: prev.totalPoints + coins + xp
    }));
  };

  const completeQuiz = (quizId: string, score: number) => {
    setProgress(prev => {
      if (prev.quizzesCompleted.includes(quizId)) {
        return prev; // Already completed
      }
      
      const isPerfect = score === 100;
      const coins = isPerfect ? 75 : Math.round(score * 0.5);
      const xp = isPerfect ? 150 : Math.round(score * 1.0);
      
      return {
        ...prev,
        quizzesCompleted: [...prev.quizzesCompleted, quizId],
        quizScores: { ...prev.quizScores, [quizId]: score },
        coins: prev.coins + coins,
        xp: prev.xp + xp,
        level: getLevelFromXP(prev.xp + xp),
        totalPoints: prev.totalPoints + coins + xp
      };
    });
  };

  const purchaseItem = (itemId: string, cost: number): boolean => {
    if (progress.coins >= cost && !progress.ownedItems.includes(itemId)) {
      setProgress(prev => ({
        ...prev,
        coins: prev.coins - cost,
        ownedItems: [...prev.ownedItems, itemId]
      }));
      return true;
    }
    return false;
  };

  const unlockAchievement = (achievementId: string) => {
    setProgress(prev => {
      if (prev.unlockedAchievements.includes(achievementId)) {
        return prev;
      }
      
      const coins = 25;
      const xp = 50;
      
      return {
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, achievementId],
        coins: prev.coins + coins,
        xp: prev.xp + xp,
        level: getLevelFromXP(prev.xp + xp),
        totalPoints: prev.totalPoints + coins + xp
      };
    });
  };

  const completeActivity = (activityId: string) => {
    setProgress(prev => {
      if (prev.activitiesCompleted.includes(activityId)) {
        return prev;
      }
      
      const coins = 20;
      const xp = 40;
      
      return {
        ...prev,
        activitiesCompleted: [...prev.activitiesCompleted, activityId],
        coins: prev.coins + coins,
        xp: prev.xp + xp,
        level: getLevelFromXP(prev.xp + xp),
        totalPoints: prev.totalPoints + coins + xp
      };
    });
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('luminexus_progress');
    }
  };

  return (
    <GameProgressContext.Provider
      value={{
        progress,
        addCoins,
        spendCoins,
        addXP,
        completeStory,
        recordGamePlayed,
        completeQuiz,
        purchaseItem,
        unlockAchievement,
        completeActivity,
        resetProgress
      }}
    >
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useGameProgress must be used within GameProgressProvider');
  }
  return context;
}

// Helper function to get XP needed for next level
export function getXPForNextLevel(currentXP: number, currentLevel: number): number {
  let totalXPNeeded = 0;
  for (let i = 1; i < currentLevel; i++) {
    totalXPNeeded += getXPForLevel(i);
  }
  const xpForCurrentLevel = getXPForLevel(currentLevel);
  return xpForCurrentLevel - (currentXP - totalXPNeeded);
}

// Helper function to get progress percentage to next level
export function getLevelProgress(currentXP: number, currentLevel: number): number {
  let totalXPNeeded = 0;
  for (let i = 1; i < currentLevel; i++) {
    totalXPNeeded += getXPForLevel(i);
  }
  const xpInCurrentLevel = currentXP - totalXPNeeded;
  const xpForCurrentLevel = getXPForLevel(currentLevel);
  return (xpInCurrentLevel / xpForCurrentLevel) * 100;
}
