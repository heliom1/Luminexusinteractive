import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import LoadingAnimation from './components/LoadingAnimation';
import OnboardingScreen from './components/OnboardingScreen';
import MainPage from './components/MainPage';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'loading' | 'onboarding' | 'main'>('login');
  const [playerName, setPlayerName] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = (name: string) => {
    setPlayerName(name);
    setCurrentScreen('loading');
  };

  const handleAnimationComplete = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentScreen('main');
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {currentScreen === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentScreen === 'loading' && <LoadingAnimation onComplete={handleAnimationComplete} />}
      {currentScreen === 'onboarding' && <OnboardingScreen playerName={playerName} onComplete={handleOnboardingComplete} />}
      {currentScreen === 'main' && <MainPage playerName={playerName} userProfile={userProfile} />}
    </div>
  );
}