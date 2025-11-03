import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  BookOpen, 
  Search, 
  X, 
  Volume2, 
  Star, 
  Lightbulb,
  Rocket,
  Sun,
  Globe,
  Satellite,
  Zap,
  Shield,
  Radio,
  Eye,
  Brain,
  Heart,
  Target,
  HelpCircle,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

interface DictionaryEntry {
  word: string;
  simpleDefinition: string;
  detailedDefinition: string;
  example: string;
  realWorldExample: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  pronunciation?: string;
  funFact?: string;
  relatedWords?: string[];
}

interface SpaceDictionaryProps {
  onBack: () => void;
  searchWord?: string;
  userAge?: string;
}

export default function SpaceDictionary({ onBack, searchWord = '', userAge = '9-12' }: SpaceDictionaryProps) {
  const [searchTerm, setSearchTerm] = useState(searchWord);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);

  // Comprehensive space weather dictionary for kids
  const dictionaryEntries: DictionaryEntry[] = [
    {
      word: 'Solar Flare',
      simpleDefinition: 'A big burst of super bright light and energy from the Sun',
      detailedDefinition: 'A sudden flash of brightness on the Sun that releases lots of energy into space',
      example: 'Like the Sun sneezing really hard and sending sparkly energy toward Earth!',
      realWorldExample: 'In 2003, a huge solar flare made GPS stop working properly for a week',
      category: 'sun',
      difficulty: 'easy',
      icon: '☀️',
      pronunciation: 'SO-lar FLAIR',
      funFact: 'The biggest solar flare ever recorded was so powerful it could have lit up 20 billion light bulbs!',
      relatedWords: ['Sun', 'Energy', 'Space Weather']
    },
    {
      word: 'Aurora',
      simpleDefinition: 'Beautiful colored lights that dance in the sky',
      detailedDefinition: 'Natural light displays in polar regions caused by solar particles hitting Earth\'s atmosphere',
      example: 'Like nature\'s own light show with green, purple, and pink curtains in the sky!',
      realWorldExample: 'People in Alaska and northern Canada see auroras almost every clear night',
      category: 'earth',
      difficulty: 'easy',
      icon: '🌈',
      pronunciation: 'aw-ROAR-ah',
      funFact: 'Auroras can happen on other planets too! Jupiter has auroras that are 100 times brighter than Earth\'s!',
      relatedWords: ['Northern Lights', 'Atmosphere', 'Solar Particles']
    },
    {
      word: 'GPS',
      simpleDefinition: 'A system that tells you exactly where you are',
      detailedDefinition: 'Global Positioning System - uses satellites in space to help find locations on Earth',
      example: 'Like having a magical map that always knows where you are!',
      realWorldExample: 'Your phone uses GPS to show you directions when you\'re going somewhere new',
      category: 'technology',
      difficulty: 'easy',
      icon: '📍',
      pronunciation: 'jee-pee-ESS',
      funFact: 'GPS satellites travel at 14,000 kilometers per hour - that\'s 20 times faster than a jet plane!',
      relatedWords: ['Satellite', 'Navigation', 'Technology']
    },
    {
      word: 'Satellite',
      simpleDefinition: 'A machine that flies around Earth in space',
      detailedDefinition: 'An artificial object that orbits Earth to provide services like communication, weather monitoring, or navigation',
      example: 'Like a robot helper floating way above us in space!',
      realWorldExample: 'TV signals, weather forecasts, and internet all use satellites',
      category: 'technology',
      difficulty: 'easy',
      icon: '🛰️',
      pronunciation: 'SAT-uh-lite',
      funFact: 'There are over 3,000 working satellites orbiting Earth right now!',
      relatedWords: ['Space', 'Orbit', 'Communication']
    },
    {
      word: 'Magnetic Field',
      simpleDefinition: 'Earth\'s invisible shield that protects us',
      detailedDefinition: 'An invisible force field around Earth created by its molten iron core that deflects harmful solar particles',
      example: 'Like Earth wearing an invisible superhero cape that keeps us safe!',
      realWorldExample: 'This shield is why we can live safely on Earth while space is dangerous for astronauts',
      category: 'earth',
      difficulty: 'medium',
      icon: '🛡️',
      pronunciation: 'mag-NET-ik FEELD',
      funFact: 'Earth\'s magnetic field is getting weaker! But don\'t worry - it\'s happened before and the planet is still here!',
      relatedWords: ['Earth', 'Protection', 'Solar Particles']
    },
    {
      word: 'Ionosphere',
      simpleDefinition: 'A layer of air around Earth filled with tiny charged particles',
      detailedDefinition: 'A region of Earth\'s atmosphere where solar radiation creates ions and free electrons',
      example: 'Like a invisible bubble around Earth made of tiny electric pieces!',
      realWorldExample: 'Radio signals bounce off this layer to reach far away places',
      category: 'earth',
      difficulty: 'hard',
      icon: '🌍',
      pronunciation: 'eye-ON-oh-sfeer',
      funFact: 'The ionosphere is where auroras happen - it\'s like a giant TV screen in the sky!',
      relatedWords: ['Atmosphere', 'Radio Waves', 'Aurora']
    },
    {
      word: 'Space Weather',
      simpleDefinition: 'Changes in space that can affect things on Earth',
      detailedDefinition: 'Conditions in space caused by solar activity that can impact technology and communications on Earth',
      example: 'Like regular weather, but happening way up in space instead of in our sky!',
      realWorldExample: 'Space weather can make your GPS less accurate or cause power outages',
      category: 'general',
      difficulty: 'medium',
      icon: '🌌',
      pronunciation: 'SPAYSS WETH-er',
      funFact: 'Space weather can create lightning that\'s 1000 times more powerful than Earth lightning!',
      relatedWords: ['Solar Activity', 'Technology', 'Earth Effects']
    },
    {
      word: 'Solar Wind',
      simpleDefinition: 'Invisible particles that the Sun blows toward Earth',
      detailedDefinition: 'A stream of charged particles released from the upper atmosphere of the Sun',
      example: 'Like the Sun blowing invisible bubbles toward us all the time!',
      realWorldExample: 'Solar wind is what makes comet tails always point away from the Sun',
      category: 'sun',
      difficulty: 'medium',
      icon: '💨',
      pronunciation: 'SO-lar WIND',
      funFact: 'Solar wind travels at about 1.5 million kilometers per hour!',
      relatedWords: ['Sun', 'Particles', 'Space']
    },
    {
      word: 'Astronaut',
      simpleDefinition: 'A person who travels and works in space',
      detailedDefinition: 'A trained professional who travels beyond Earth\'s atmosphere to conduct scientific research and exploration',
      example: 'Like an explorer of the sky who gets to float and see Earth from space!',
      realWorldExample: 'Astronauts on the International Space Station see 16 sunrises and sunsets every day',
      category: 'people',
      difficulty: 'easy',
      icon: '👨‍🚀',
      pronunciation: 'ASS-tro-not',
      funFact: 'Astronauts grow about 2 inches taller in space because there\'s no gravity pulling them down!',
      relatedWords: ['Space Station', 'Zero Gravity', 'Space Travel']
    },
    {
      word: 'Radiation',
      simpleDefinition: 'Invisible energy that can be harmful in large amounts',
      detailedDefinition: 'High-energy particles or electromagnetic waves that can damage living tissue and electronics',
      example: 'Like invisible energy waves that can hurt you if there\'s too much',
      realWorldExample: 'X-rays at the doctor use a tiny bit of radiation to see inside your body',
      category: 'general',
      difficulty: 'hard',
      icon: '⚡',
      pronunciation: 'ray-dee-AY-shun',
      funFact: 'Astronauts in space get as much radiation in one day as you get in a whole year on Earth!',
      relatedWords: ['Energy', 'Safety', 'Space']
    },
    {
      word: 'Geomagnetic Storm',
      simpleDefinition: 'When Earth\'s magnetic shield gets shaken up by space weather',
      detailedDefinition: 'A disturbance in Earth\'s magnetosphere caused by solar wind and magnetic fields from the Sun',
      example: 'Like Earth\'s invisible shield getting ruffled by space wind!',
      realWorldExample: 'Strong geomagnetic storms can make pretty auroras visible much farther south than usual',
      category: 'earth',
      difficulty: 'hard',
      icon: '🌪️',
      pronunciation: 'jee-oh-mag-NET-ik STORM',
      funFact: 'The biggest geomagnetic storm in 1859 made telegraph wires spark and catch fire!',
      relatedWords: ['Magnetic Field', 'Solar Wind', 'Aurora']
    },
    {
      word: 'Coronal Mass Ejection',
      simpleDefinition: 'When the Sun throws a huge bubble of hot gas into space',
      detailedDefinition: 'A big explosion of hot gas from the Sun that shoots toward planets',
      example: 'Like the Sun burping out a giant bubble of energy!',
      realWorldExample: 'If a big CME hits Earth, it can knock out power grids for hours or days',
      category: 'sun',
      difficulty: 'hard',
      icon: '💥',
      pronunciation: 'ko-ROH-nal MASS ee-JEK-shun',
      funFact: 'A single CME can contain the energy of billions of hydrogen bombs!',
      relatedWords: ['Sun', 'Solar Wind', 'Space Weather']
    },
    {
      word: 'Plasma',
      simpleDefinition: 'Super hot gas that glows and can conduct electricity',
      detailedDefinition: 'The fourth state of matter - a gas so hot that electrons separate from atoms',
      example: 'Like really, really hot air that glows and has electricity in it!',
      realWorldExample: 'Lightning bolts are made of plasma, and so is the Sun!',
      category: 'general',
      difficulty: 'medium',
      icon: '⚡',
      pronunciation: 'PLAZ-muh',
      funFact: '99% of all the matter we can see in space is plasma!',
      relatedWords: ['Energy', 'Sun', 'Lightning']
    },
    {
      word: 'CME',
      simpleDefinition: 'Short name for when the Sun shoots out a huge cloud',
      detailedDefinition: 'Stands for Coronal Mass Ejection - a big explosion from the Sun',
      example: 'Scientists use CME as a quick way to say a Sun explosion!',
      realWorldExample: 'NASA tracks CMEs to warn us if one is coming toward Earth',
      category: 'sun',
      difficulty: 'easy',
      icon: '💨',
      pronunciation: 'see-em-EE',
      funFact: 'CMEs can travel from the Sun to Earth in just 15-18 hours!',
      relatedWords: ['Coronal Mass Ejection', 'Sun', 'Space Weather']
    },
    {
      word: 'Power Grid',
      simpleDefinition: 'The system that brings electricity to all our homes',
      detailedDefinition: 'A network of power lines and stations that deliver electricity everywhere',
      example: 'Like a giant spider web that carries electricity to every house!',
      realWorldExample: 'When space weather is strong, it can damage the power grid and cause blackouts',
      category: 'technology',
      difficulty: 'easy',
      icon: '⚡',
      pronunciation: 'POW-er GRID',
      funFact: 'Some power grids can be thousands of miles long!',
      relatedWords: ['Electricity', 'Technology', 'Infrastructure']
    },
    {
      word: 'Northern Lights',
      simpleDefinition: 'Another name for aurora - beautiful lights in the night sky',
      detailedDefinition: 'Colorful lights that appear in the sky near the North Pole',
      example: 'Like a magical light show painted across the night sky!',
      realWorldExample: 'In Alaska and Canada, people can see Northern Lights dancing in green and purple',
      category: 'earth',
      difficulty: 'easy',
      icon: '🌌',
      pronunciation: 'NOR-thurn LITES',
      funFact: 'The Southern Lights near Antarctica are called Aurora Australis!',
      relatedWords: ['Aurora', 'Sky', 'Atmosphere']
    },
    {
      word: 'Solar Storm',
      simpleDefinition: 'A big event on the Sun that can affect Earth',
      detailedDefinition: 'When the Sun releases lots of energy and particles that travel to Earth',
      example: 'Like a big weather storm, but happening on the Sun instead of Earth!',
      realWorldExample: 'Solar storms can make satellites stop working and create beautiful auroras',
      category: 'sun',
      difficulty: 'easy',
      icon: '🌩️',
      pronunciation: 'SO-lar STORM',
      funFact: 'The biggest solar storm in history happened in 1859 and made compass needles go crazy!',
      relatedWords: ['Sun', 'Space Weather', 'Aurora']
    },
    {
      word: 'Magnetosphere',
      simpleDefinition: 'Earth\'s invisible magnetic bubble that protects us',
      detailedDefinition: 'The magnetic field around Earth that acts like a shield against dangerous particles',
      example: 'Like a giant force field around Earth that keeps us safe!',
      realWorldExample: 'Without the magnetosphere, solar wind would blow away our atmosphere',
      category: 'earth',
      difficulty: 'medium',
      icon: '🛡️',
      pronunciation: 'mag-NEE-toh-sfeer',
      funFact: 'Earth\'s magnetosphere can stretch up to 40,000 miles into space!',
      relatedWords: ['Magnetic Field', 'Protection', 'Earth']
    },
    {
      word: 'Particles',
      simpleDefinition: 'Tiny, tiny pieces of matter - so small you can\'t see them',
      detailedDefinition: 'Extremely small bits of matter like atoms, electrons, or protons',
      example: 'Like invisible dust specks that are a million times smaller!',
      realWorldExample: 'Everything around you is made of billions of particles',
      category: 'general',
      difficulty: 'easy',
      icon: '✨',
      pronunciation: 'PAR-tih-kulz',
      funFact: 'There are more particles in a glass of water than glasses of water in all Earth\'s oceans!',
      relatedWords: ['Atoms', 'Matter', 'Science']
    },
    {
      word: 'Orbit',
      simpleDefinition: 'The path something takes as it goes around a planet or star',
      detailedDefinition: 'The curved path an object follows as it moves around another object in space',
      example: 'Like how a ball on a string goes in circles when you spin it!',
      realWorldExample: 'Earth orbits around the Sun once every 365 days - that\'s one year!',
      category: 'general',
      difficulty: 'easy',
      icon: '🔄',
      pronunciation: 'OR-bit',
      funFact: 'The Moon orbits Earth, and Earth orbits the Sun at the same time!',
      relatedWords: ['Space', 'Planet', 'Satellite']
    },
    {
      word: 'Atmosphere',
      simpleDefinition: 'The blanket of air around Earth',
      detailedDefinition: 'The layer of gases surrounding our planet that we breathe',
      example: 'Like a cozy invisible blanket of air wrapped around Earth!',
      realWorldExample: 'Earth\'s atmosphere protects us from meteors and helps keep us warm',
      category: 'earth',
      difficulty: 'easy',
      icon: '🌏',
      pronunciation: 'AT-mos-feer',
      funFact: 'Without atmosphere, the sky would be black even during the day!',
      relatedWords: ['Air', 'Earth', 'Sky']
    },
    {
      word: 'Electromagnetic',
      simpleDefinition: 'Related to electricity and magnetism working together',
      detailedDefinition: 'A type of energy that includes light, radio waves, and X-rays',
      example: 'Like invisible waves of energy that can travel through space!',
      realWorldExample: 'Your phone uses electromagnetic waves to send messages',
      category: 'general',
      difficulty: 'medium',
      icon: '📡',
      pronunciation: 'ee-lek-tro-mag-NET-ik',
      funFact: 'Light is an electromagnetic wave, and it travels faster than anything else!',
      relatedWords: ['Energy', 'Waves', 'Technology']
    },
    {
      word: 'Corona',
      simpleDefinition: 'The Sun\'s super hot outer atmosphere',
      detailedDefinition: 'The outermost layer of the Sun that you can see during a solar eclipse',
      example: 'Like the Sun\'s glowing hair that reaches out into space!',
      realWorldExample: 'During a solar eclipse, the corona looks like a beautiful white crown around the Sun',
      category: 'sun',
      difficulty: 'medium',
      icon: '👑',
      pronunciation: 'ko-ROH-nuh',
      funFact: 'The corona is hotter than the surface of the Sun - that\'s a mystery scientists are still solving!',
      relatedWords: ['Sun', 'Eclipse', 'Atmosphere']
    },
    {
      word: 'Space Station',
      simpleDefinition: 'A home for astronauts that floats in space above Earth',
      detailedDefinition: 'A large spacecraft where astronauts live and work while orbiting Earth',
      example: 'Like a house in space where astronauts float around and do science!',
      realWorldExample: 'The International Space Station is as big as a football field and goes around Earth 16 times a day',
      category: 'technology',
      difficulty: 'easy',
      icon: '🛸',
      pronunciation: 'SPAYSS STAY-shun',
      funFact: 'You can sometimes see the Space Station from Earth - it looks like a bright moving star!',
      relatedWords: ['Astronaut', 'Orbit', 'Space']
    },
    {
      word: 'Solar Panel',
      simpleDefinition: 'A special surface that turns sunlight into electricity',
      detailedDefinition: 'A device that converts the Sun\'s energy into electrical power',
      example: 'Like a magic sheet that catches sunlight and turns it into power!',
      realWorldExample: 'Solar panels on houses can power lights and computers using only sunlight',
      category: 'technology',
      difficulty: 'easy',
      icon: '☀️',
      pronunciation: 'SO-lar PAN-ul',
      funFact: 'The Space Station uses solar panels bigger than a house to get power!',
      relatedWords: ['Sun', 'Energy', 'Technology']
    },
    {
      word: 'Sunspot',
      simpleDefinition: 'A dark spot on the Sun that appears when it cools down a bit',
      detailedDefinition: 'A cooler, darker area on the Sun\'s surface caused by magnetic activity',
      example: 'Like a freckle on the Sun that shows where it\'s a little cooler!',
      realWorldExample: 'Scientists count sunspots to predict when solar storms might happen',
      category: 'sun',
      difficulty: 'medium',
      icon: '⚫',
      pronunciation: 'SUN-spot',
      funFact: 'Some sunspots can be bigger than planet Earth!',
      relatedWords: ['Sun', 'Solar Activity', 'Magnetic Field']
    },
    {
      word: 'Cosmic Rays',
      simpleDefinition: 'Super fast particles that zoom through space',
      detailedDefinition: 'High-energy particles from space that travel at nearly the speed of light',
      example: 'Like tiny space bullets flying through the universe!',
      realWorldExample: 'Cosmic rays can create small sparkles of light when they hit satellites',
      category: 'general',
      difficulty: 'hard',
      icon: '💫',
      pronunciation: 'KOZ-mik RAYZ',
      funFact: 'Cosmic rays come from exploding stars millions of light years away!',
      relatedWords: ['Radiation', 'Space', 'Particles']
    },
    {
      word: 'Blackout',
      simpleDefinition: 'When all the lights and electricity suddenly stop working',
      detailedDefinition: 'A complete loss of electrical power in an area',
      example: 'Like when someone turns off all the power switches at once!',
      realWorldExample: 'Strong space weather can cause blackouts that affect entire cities',
      category: 'technology',
      difficulty: 'easy',
      icon: '🔌',
      pronunciation: 'BLAK-out',
      funFact: 'The biggest space weather blackout in 1989 left 6 million people without power!',
      relatedWords: ['Power Grid', 'Electricity', 'Space Weather']
    },
    {
      word: 'Forecaster',
      simpleDefinition: 'A scientist who predicts what will happen with the weather',
      detailedDefinition: 'A person who studies data to predict future conditions',
      example: 'Like a weather detective who figures out what\'s coming!',
      realWorldExample: 'Space weather forecasters warn astronauts when solar storms are coming',
      category: 'people',
      difficulty: 'easy',
      icon: '🔭',
      pronunciation: 'FOR-kast-er',
      funFact: 'Space weather forecasters watch the Sun 24 hours a day!',
      relatedWords: ['Scientist', 'Prediction', 'Weather']
    },
    {
      word: 'Solar Cycle',
      simpleDefinition: 'The pattern of the Sun being more or less active over time',
      detailedDefinition: 'An approximately 11-year cycle of increasing and decreasing solar activity',
      example: 'Like how the Sun has busy years and quiet years!',
      realWorldExample: 'During active parts of the solar cycle, we see more auroras',
      category: 'sun',
      difficulty: 'medium',
      icon: '🔄',
      pronunciation: 'SO-lar SY-kul',
      funFact: 'We\'re tracking solar cycles that started 400 years ago!',
      relatedWords: ['Sun', 'Solar Activity', 'Sunspots']
    },
    {
      word: 'Radio Wave',
      simpleDefinition: 'Invisible waves that carry signals for phones and radios',
      detailedDefinition: 'Electromagnetic waves used for communication',
      example: 'Like invisible messengers that carry music and voices through the air!',
      realWorldExample: 'Your phone uses radio waves to make calls and browse the internet',
      category: 'technology',
      difficulty: 'medium',
      icon: '📻',
      pronunciation: 'RAY-dee-oh WAYV',
      funFact: 'Radio waves can travel through space for billions of miles!',
      relatedWords: ['Communication', 'Waves', 'Technology']
    },
    {
      word: 'Solar Eclipse',
      simpleDefinition: 'When the Moon blocks the Sun and makes daytime dark',
      detailedDefinition: 'When the Moon passes between Earth and the Sun, blocking sunlight',
      example: 'Like the Moon playing hide-and-seek with the Sun!',
      realWorldExample: 'During a total solar eclipse, you can see stars in the middle of the day',
      category: 'general',
      difficulty: 'easy',
      icon: '🌑',
      pronunciation: 'SO-lar ee-KLIPS',
      funFact: 'The next total solar eclipse visible in the US won\'t happen until 2044!',
      relatedWords: ['Sun', 'Moon', 'Shadow']
    },
    {
      word: 'Telescope',
      simpleDefinition: 'A tool that makes faraway things look bigger and closer',
      detailedDefinition: 'An instrument that uses lenses or mirrors to observe distant objects',
      example: 'Like super-powered binoculars that can see planets and stars!',
      realWorldExample: 'The James Webb Space Telescope can see galaxies billions of light years away',
      category: 'technology',
      difficulty: 'easy',
      icon: '🔭',
      pronunciation: 'TEL-uh-skope',
      funFact: 'Some telescopes are bigger than school buses!',
      relatedWords: ['Observation', 'Space', 'Science']
    },
    {
      word: 'Gravity',
      simpleDefinition: 'The force that pulls everything down toward Earth',
      detailedDefinition: 'The force of attraction between objects with mass',
      example: 'Like an invisible magnet that keeps your feet on the ground!',
      realWorldExample: 'Gravity is what makes apples fall from trees and keeps the Moon orbiting Earth',
      category: 'general',
      difficulty: 'easy',
      icon: '⬇️',
      pronunciation: 'GRAV-ih-tee',
      funFact: 'If Earth had no gravity, everything would float away into space!',
      relatedWords: ['Force', 'Mass', 'Physics']
    },
    {
      word: 'Astronomer',
      simpleDefinition: 'A scientist who studies stars, planets, and space',
      detailedDefinition: 'A person who observes and researches celestial objects and phenomena',
      example: 'Like a space explorer who uses telescopes instead of rockets!',
      realWorldExample: 'Astronomers discovered that the universe is getting bigger every day',
      category: 'people',
      difficulty: 'easy',
      icon: '👨‍🔬',
      pronunciation: 'uh-STRON-uh-mer',
      funFact: 'Ancient astronomers figured out Earth was round by watching ships disappear over the horizon!',
      relatedWords: ['Scientist', 'Space', 'Research']
    },
    {
      word: 'Solar Maximum',
      simpleDefinition: 'When the Sun is most active with lots of spots and flares',
      detailedDefinition: 'The period of greatest solar activity in the solar cycle',
      example: 'Like when the Sun is having its busiest, most energetic time!',
      realWorldExample: 'During solar maximum, astronauts have to be extra careful about radiation',
      category: 'sun',
      difficulty: 'hard',
      icon: '🌞',
      pronunciation: 'SO-lar MAX-ih-mum',
      funFact: 'The last solar maximum happened in 2014!',
      relatedWords: ['Solar Cycle', 'Sun', 'Activity']
    },
    {
      word: 'Aurora Borealis',
      simpleDefinition: 'The fancy science name for Northern Lights',
      detailedDefinition: 'Natural light displays in northern regions caused by solar wind',
      example: 'Like nature\'s own colorful light show in the Arctic!',
      realWorldExample: 'People travel to Alaska and Norway just to see the Aurora Borealis',
      category: 'earth',
      difficulty: 'medium',
      icon: '🌌',
      pronunciation: 'aw-ROAR-uh bor-ee-AL-is',
      funFact: 'Aurora means "goddess of dawn" and Borealis means "northern"!',
      relatedWords: ['Aurora', 'Northern Lights', 'Atmosphere']
    },
    {
      word: 'Communication Satellite',
      simpleDefinition: 'A satellite that helps phones and TVs work',
      detailedDefinition: 'A spacecraft that relays signals for television, internet, and phone services',
      example: 'Like a relay runner in space that passes messages around the world!',
      realWorldExample: 'When you watch live TV from another country, signals bounce off communication satellites',
      category: 'technology',
      difficulty: 'medium',
      icon: '📡',
      pronunciation: 'kuh-myoo-nih-KAY-shun SAT-uh-lite',
      funFact: 'There are over 2,000 communication satellites orbiting Earth right now!',
      relatedWords: ['Satellite', 'Technology', 'Communication']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Words', icon: '📚', color: 'from-blue-400 to-purple-500' },
    { id: 'sun', label: 'About the Sun', icon: '☀️', color: 'from-yellow-400 to-orange-500' },
    { id: 'earth', label: 'About Earth', icon: '🌍', color: 'from-green-400 to-blue-500' },
    { id: 'technology', label: 'Technology', icon: '🛰️', color: 'from-cyan-400 to-blue-600' },
    { id: 'people', label: 'Space People', icon: '👨‍🚀', color: 'from-purple-400 to-pink-500' },
    { id: 'general', label: 'General Space', icon: '🌌', color: 'from-indigo-400 to-purple-600' }
  ];

  const filteredEntries = dictionaryEntries.filter(entry => {
    const matchesSearch = entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const playPronunciation = (word: string) => {
    // Simple text-to-speech if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDefinitionForAge = (entry: DictionaryEntry) => {
    const age = userAge || '9-12';
    if (age === '6-8') return entry.simpleDefinition;
    if (age === '13-15' || age === '16+') return entry.detailedDefinition;
    return entry.simpleDefinition; // Default for 9-12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
            </motion.div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-white">Space Weather Dictionary</h2>
              <p className="text-cyan-200 text-base md:text-lg">Learn space words in simple, fun ways!</p>
            </div>
          </div>
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 md:p-4"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            <span className="ml-2">Back</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search for a space word..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 md:py-4 bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 text-base md:text-lg rounded-xl"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white`
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                } px-3 md:px-4 py-2 text-sm md:text-base rounded-xl transition-all duration-300`}
              >
                <span className="mr-2">{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 min-h-[500px]">
          {/* Word List */}
          <div className="w-full md:w-1/2 overflow-y-auto space-y-3 pr-2 max-h-[500px]">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.word}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                    selectedEntry?.word === entry.word
                      ? 'border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-blue-500/20'
                      : 'border-white/20 bg-white/5 hover:border-cyan-400/50'
                  }`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl md:text-3xl">{entry.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-base md:text-lg truncate">{entry.word}</h3>
                          <p className="text-gray-300 text-xs md:text-sm line-clamp-2">{getDefinitionForAge(entry)}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={`${getDifficultyColor(entry.difficulty)} text-white text-xs`}>
                          {entry.difficulty}
                        </Badge>
                        {entry.pronunciation && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              playPronunciation(entry.word);
                            }}
                            className="bg-white/20 hover:bg-white/30 text-white p-1 rounded"
                            size="sm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No words found</p>
                <p className="text-gray-500">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Word Details */}
          <div className="w-full md:w-1/2 overflow-y-auto max-h-[500px]">
            {selectedEntry ? (
              <motion.div
                key={selectedEntry.word}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-cyan-400/30">
                  <CardHeader className="text-center">
                    <motion.div
                      className="text-4xl md:text-6xl mb-4"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {selectedEntry.icon}
                    </motion.div>
                    <CardTitle className="text-2xl md:text-3xl text-white mb-2">
                      {selectedEntry.word}
                    </CardTitle>
                    {selectedEntry.pronunciation && (
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <Badge className="bg-white/20 text-white px-3 py-1 text-xs md:text-sm">
                          {selectedEntry.pronunciation}
                        </Badge>
                        <Button
                          onClick={() => playPronunciation(selectedEntry.word)}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-full"
                        >
                          <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="bg-cyan-500/20 rounded-xl p-3 md:p-4 border border-cyan-400/30">
                      <h4 className="text-cyan-300 font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                        <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
                        Simple Definition
                      </h4>
                      <p className="text-white text-sm md:text-lg">{selectedEntry.simpleDefinition}</p>
                    </div>

                    <div className="bg-green-500/20 rounded-xl p-3 md:p-4 border border-green-400/30">
                      <h4 className="text-green-300 font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                        <Star className="w-4 h-4 md:w-5 md:h-5" />
                        Example
                      </h4>
                      <p className="text-white text-sm md:text-base">{selectedEntry.example}</p>
                    </div>

                    <div className="bg-purple-500/20 rounded-xl p-3 md:p-4 border border-purple-400/30">
                      <h4 className="text-purple-300 font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                        <Globe className="w-4 h-4 md:w-5 md:h-5" />
                        Real World Example
                      </h4>
                      <p className="text-white text-sm md:text-base">{selectedEntry.realWorldExample}</p>
                    </div>

                    {selectedEntry.funFact && (
                      <div className="bg-yellow-500/20 rounded-xl p-3 md:p-4 border border-yellow-400/30">
                        <h4 className="text-yellow-300 font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                          Fun Fact!
                        </h4>
                        <p className="text-white text-sm md:text-base">{selectedEntry.funFact}</p>
                      </div>
                    )}

                    {selectedEntry.relatedWords && (
                      <div className="bg-pink-500/20 rounded-xl p-3 md:p-4 border border-pink-400/30">
                        <h4 className="text-pink-300 font-bold mb-2 flex items-center gap-2 text-sm md:text-base">
                          <Target className="w-4 h-4 md:w-5 md:h-5" />
                          Related Words
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedEntry.relatedWords.map((word, index) => (
                            <Badge key={index} className="bg-pink-400/20 text-pink-200 border border-pink-400/30 text-xs md:text-sm">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-4xl md:text-6xl mb-4"
                  >
                    📖
                  </motion.div>
                  <p className="text-gray-400 text-lg md:text-xl">Select a word to learn more!</p>
                  <p className="text-gray-500 text-sm md:text-base">Click on any word from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
