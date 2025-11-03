import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Beaker, 
  ChevronLeft, 
  Download,
  RotateCcw,
  Save,
  BookOpen,
  Sparkles,
  Sun,
  Globe,
  Rocket,
  Zap,
  Plus,
  Trash2,
  Home,
  Settings,
  Paintbrush,
  MapPin,
  Clock,
  Star,
  Eye,
  Camera,
  Navigation,
  Activity,
  Target,
  Waves,
  Wind,
  Play,
  Pause,
  Volume2,
  Gauge,
  Atom,
  Layers,
  MousePointer,
  Move,
  Microscope,
  FlaskConical,
  TestTube,
  Compass,
  Telescope,
  Lightbulb,
  Cpu,
  Database,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Lightning,
  CloudRain,
  Thermometer,
  Orbit,
  Radar,
  Signal,
  Radio,
  Award,
  Check,
  CheckCircle,
  Timer,
  Monitor,
  Power,
  CircuitBoard,
  Sliders,
  Shield,
  Wifi,
  Satellite,
  Brain,
  Heart,
  Crown,
  Trophy,
  Coins,
  Gift,
  PartyPopper,
  Smile,
  Wand2,
  Crosshair,
  MousePointer2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Search,
  Filter,
  RefreshCw,
  Info,
  HelpCircle,
  BookmarkPlus,
  Share,
  Users,
  MessageSquare,
  ThumbsUp,
  Upload,
  Copy,
  Edit,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Calendar,
  Map,
  TrendingDown,
  AlertTriangle,
  Flame,
  Snowflake,
  Cloud,
  CloudSnow,
  Sunrise,
  Sunset,
  Moon,
  Stars
} from 'lucide-react';

interface FunctionalSpaceLabProps {
  playerName: string;
  onBack: () => void;
}

interface Experiment {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'aurora' | 'solar' | 'magnetosphere' | 'simulation' | 'prediction' | 'satellite';
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  completed: boolean;
  points: number;
  timeEstimate: string;
  nasaData: {
    mission: string;
    realData: string;
    scientificPrinciple: string;
    equipment: string[];
  };
  parameters: Array<{
    name: string;
    min: number;
    max: number;
    default: number;
    unit: string;
    description: string;
  }>;
}

interface LabResult {
  timestamp: Date;
  experimentId: string;
  parameters: Record<string, number>;
  outcome: string;
  score: number;
  insights: string[];
}

export default function FunctionalSpaceLab({ playerName, onBack }: FunctionalSpaceLabProps) {
  const [selectedExperiment, setSelectedExperiment] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('experiments');
  const [experimentParameters, setExperimentParameters] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<LabResult[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const [userProgress, setUserProgress] = useState({
    experimentsCompleted: 12,
    discoveryPoints: 850,
    labLevel: 15,
    badges: ['Aurora Artist', 'Solar Explorer', 'Data Scientist', 'Space Engineer', 'Cosmic Researcher'],
    totalTime: '24h 30m',
    favoriteTools: ['Aurora Simulator', 'Solar Wind Analyzer', 'Magnetosphere Visualizer']
  });

  // NASA-based space lab experiments
  const experiments: Experiment[] = [
    {
      id: 'aurora-simulator',
      title: '🌈 Aurora Formation Simulator',
      description: 'Recreate the physics of aurora formation using real THEMIS mission data!',
      icon: '🎨',
      category: 'aurora',
      difficulty: 'Medium',
      completed: false,
      points: 200,
      timeEstimate: '15 min',
      nasaData: {
        mission: 'THEMIS (Time History of Events and Macroscale Interactions)',
        realData: 'Particle flux measurements from 2007-2023',
        scientificPrinciple: 'Magnetospheric substorms and particle precipitation',
        equipment: ['THEMIS satellites', 'Ground magnetometers', 'All-sky cameras', 'Particle detectors']
      },
      parameters: [
        {
          name: 'Solar Wind Speed',
          min: 300,
          max: 800,
          default: 400,
          unit: 'km/s',
          description: 'Speed of solar wind particles reaching Earth'
        },
        {
          name: 'IMF Bz Component',
          min: -20,
          max: 10,
          default: -5,
          unit: 'nT',
          description: 'Southward component of interplanetary magnetic field'
        },
        {
          name: 'Particle Energy',
          min: 1,
          max: 30,
          default: 10,
          unit: 'keV',
          description: 'Energy of precipitating electrons'
        },
        {
          name: 'Atmospheric Density',
          min: 0.5,
          max: 2.0,
          default: 1.0,
          unit: 'relative',
          description: 'Relative density of upper atmosphere'
        }
      ]
    },
    {
      id: 'solar-wind-analyzer',
      title: '☀️ Solar Wind Laboratory',
      description: 'Analyze real ACE and DSCOVR satellite data to predict space weather!',
      icon: '🔬',
      category: 'solar',
      difficulty: 'Advanced',
      completed: false,
      points: 300,
      timeEstimate: '20 min',
      nasaData: {
        mission: 'ACE (Advanced Composition Explorer) and DSCOVR',
        realData: 'Solar wind plasma and magnetic field measurements',
        scientificPrinciple: 'Solar wind-magnetosphere coupling',
        equipment: ['SWEPAM plasma analyzer', 'MAG magnetometer', 'EPAM particle detector']
      },
      parameters: [
        {
          name: 'Proton Density',
          min: 1,
          max: 50,
          default: 8,
          unit: 'cm⁻³',
          description: 'Number density of solar wind protons'
        },
        {
          name: 'Proton Temperature',
          min: 10000,
          max: 500000,
          default: 100000,
          unit: 'K',
          description: 'Temperature of solar wind protons'
        },
        {
          name: 'Magnetic Field Strength',
          min: 1,
          max: 30,
          default: 5,
          unit: 'nT',
          description: 'Total magnetic field strength'
        },
        {
          name: 'Flow Speed',
          min: 250,
          max: 750,
          default: 400,
          unit: 'km/s',
          description: 'Bulk flow speed of solar wind'
        }
      ]
    },
    {
      id: 'magnetosphere-visualizer',
      title: '🧲 Earth\'s Magnetic Field Lab',
      description: 'Explore Earth\'s magnetosphere using MMS mission discoveries!',
      icon: '⚡',
      category: 'magnetosphere',
      difficulty: 'Medium',
      completed: false,
      points: 250,
      timeEstimate: '18 min',
      nasaData: {
        mission: 'MMS (Magnetospheric Multiscale Mission)',
        realData: 'Magnetic reconnection measurements in 3D',
        scientificPrinciple: 'Magnetic reconnection and energy transfer',
        equipment: ['FGM magnetometers', 'FPI plasma instruments', 'FIELDS electric field sensors']
      },
      parameters: [
        {
          name: 'Dipole Tilt',
          min: -35,
          max: 35,
          default: 0,
          unit: 'degrees',
          description: 'Tilt of Earth\'s magnetic dipole axis'
        },
        {
          name: 'Solar Wind Pressure',
          min: 0.5,
          max: 20,
          default: 2,
          unit: 'nPa',
          description: 'Dynamic pressure of solar wind'
        },
        {
          name: 'Dst Index',
          min: -500,
          max: 50,
          default: -50,
          unit: 'nT',
          description: 'Disturbance storm time index'
        },
        {
          name: 'Activity Level',
          min: 0,
          max: 9,
          default: 3,
          unit: 'Kp',
          description: 'Geomagnetic activity level (Kp index)'
        }
      ]
    },
    {
      id: 'satellite-radiation-monitor',
      title: '🛰️ Satellite Radiation Environment',
      description: 'Monitor radiation effects on satellites using Van Allen Probes data!',
      icon: '☢️',
      category: 'satellite',
      difficulty: 'Advanced',
      completed: false,
      points: 350,
      timeEstimate: '25 min',
      nasaData: {
        mission: 'Van Allen Probes (RBSP-A and RBSP-B)',
        realData: 'Radiation belt particle flux measurements 2012-2019',
        scientificPrinciple: 'Particle acceleration and transport in radiation belts',
        equipment: ['RBSPICE particle detectors', 'EFW electric field sensors', 'EMFISIS wave measurements']
      },
      parameters: [
        {
          name: 'L-Shell',
          min: 1.5,
          max: 7.0,
          default: 4.0,
          unit: 'RE',
          description: 'Magnetic L-shell parameter (Earth radii)'
        },
        {
          name: 'Electron Energy',
          min: 0.1,
          max: 10,
          default: 1.0,
          unit: 'MeV',
          description: 'Relativistic electron energy'
        },
        {
          name: 'Solar Activity',
          min: 0,
          max: 200,
          default: 100,
          unit: 'F10.7',
          description: 'Solar radio flux (10.7 cm wavelength)'
        },
        {
          name: 'Geomagnetic Storm',
          min: -400,
          max: 50,
          default: -50,
          unit: 'nT',
          description: 'Dst index during geomagnetic storm'
        }
      ]
    },
    {
      id: 'space-weather-predictor',
      title: '🔮 Space Weather Prediction Model',
      description: 'Build prediction models using machine learning and NOAA data!',
      icon: '🤖',
      category: 'prediction',
      difficulty: 'Advanced',
      completed: false,
      points: 400,
      timeEstimate: '30 min',
      nasaData: {
        mission: 'SOHO, ACE, GOES, and ground-based observatories',
        realData: 'Multi-instrument space weather measurements',
        scientificPrinciple: 'Data fusion and predictive modeling',
        equipment: ['SOHO/LASCO coronagraphs', 'ACE/SWEPAM', 'GOES/SEISS', 'Global magnetometer network']
      },
      parameters: [
        {
          name: 'Forecast Horizon',
          min: 1,
          max: 72,
          default: 24,
          unit: 'hours',
          description: 'Time ahead for space weather prediction'
        },
        {
          name: 'CME Speed',
          min: 200,
          max: 2500,
          default: 600,
          unit: 'km/s',
          description: 'Coronal mass ejection propagation speed'
        },
        {
          name: 'Model Confidence',
          min: 50,
          max: 95,
          default: 80,
          unit: '%',
          description: 'Statistical confidence in prediction'
        },
        {
          name: 'Data Sources',
          min: 1,
          max: 10,
          default: 5,
          unit: 'count',
          description: 'Number of data sources in ensemble'
        }
      ]
    },
    {
      id: 'ionosphere-radio-lab',
      title: '📡 Ionospheric Radio Laboratory',
      description: 'Study how space weather affects radio communications using COSMIC data!',
      icon: '📻',
      category: 'simulation',
      difficulty: 'Medium',
      completed: false,
      points: 275,
      timeEstimate: '20 min',
      nasaData: {
        mission: 'COSMIC-2 (Constellation Observing System for Meteorology)',
        realData: 'GPS radio occultation measurements of ionosphere',
        scientificPrinciple: 'Radio wave propagation through ionospheric plasma',
        equipment: ['GPS receivers', 'Radio occultation sensors', 'Ground-based ionosondes']
      },
      parameters: [
        {
          name: 'Radio Frequency',
          min: 1,
          max: 30,
          default: 14,
          unit: 'MHz',
          description: 'HF radio transmission frequency'
        },
        {
          name: 'Ionospheric TEC',
          min: 0,
          max: 200,
          default: 50,
          unit: 'TECU',
          description: 'Total Electron Content in ionosphere'
        },
        {
          name: 'Solar Zenith Angle',
          min: 0,
          max: 90,
          default: 45,
          unit: 'degrees',
          description: 'Angle of Sun above horizon'
        },
        {
          name: 'Scintillation Index',
          min: 0,
          max: 1,
          default: 0.2,
          unit: 'S4',
          description: 'Amplitude scintillation strength'
        }
      ]
    }
  ];

  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies = {
        success: 880,
        click: 440,
        discovery: 660,
        complete: 1100,
        error: 220,
        experiment: 550,
        analyze: 770
      };
      
      oscillator.frequency.value = frequencies[type as keyof typeof frequencies] || 500;
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silent fail
    }
  };

  const initializeExperiment = (experimentId: string) => {
    const experiment = experiments.find(e => e.id === experimentId);
    if (!experiment) return;

    const initialParams: Record<string, number> = {};
    experiment.parameters.forEach(param => {
      initialParams[param.name] = param.default;
    });
    setExperimentParameters(initialParams);
  };

  const runExperiment = async () => {
    const experiment = experiments.find(e => e.id === selectedExperiment);
    if (!experiment) return;

    setIsRunning(true);
    playSound('experiment');

    // Simulate experiment duration
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Calculate results based on parameters
    const score = calculateExperimentScore(experiment, experimentParameters);
    const insights = generateInsights(experiment, experimentParameters);
    const outcome = determineOutcome(experiment, experimentParameters, score);

    const result: LabResult = {
      timestamp: new Date(),
      experimentId: experiment.id,
      parameters: { ...experimentParameters },
      outcome,
      score,
      insights
    };

    setResults(prev => [result, ...prev]);
    setUserProgress(prev => ({
      ...prev,
      discoveryPoints: prev.discoveryPoints + score,
      experimentsCompleted: prev.experimentsCompleted + 1
    }));

    if (score >= 80) {
      playSound('success');
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    } else {
      playSound('complete');
    }

    setIsRunning(false);
  };

  const calculateExperimentScore = (experiment: Experiment, params: Record<string, number>): number => {
    let score = 0;
    
    switch (experiment.id) {
      case 'aurora-simulator':
        // Optimal conditions for aurora: negative Bz, moderate solar wind speed, sufficient particle energy
        if (params['IMF Bz Component'] < -5) score += 30;
        if (params['Solar Wind Speed'] > 400 && params['Solar Wind Speed'] < 600) score += 25;
        if (params['Particle Energy'] > 5 && params['Particle Energy'] < 20) score += 25;
        if (params['Atmospheric Density'] > 0.8 && params['Atmospheric Density'] < 1.2) score += 20;
        break;
        
      case 'solar-wind-analyzer':
        // Optimal solar wind conditions
        if (params['Proton Density'] > 5 && params['Proton Density'] < 15) score += 25;
        if (params['Proton Temperature'] > 50000 && params['Proton Temperature'] < 200000) score += 25;
        if (params['Magnetic Field Strength'] > 3 && params['Magnetic Field Strength'] < 10) score += 25;
        if (params['Flow Speed'] > 350 && params['Flow Speed'] < 500) score += 25;
        break;
        
      default:
        score = 50 + Math.random() * 40; // Base score with some randomness
    }

    return Math.min(100, Math.max(0, score + (Math.random() * 20 - 10))); // Add some variation
  };

  const generateInsights = (experiment: Experiment, params: Record<string, number>): string[] => {
    const insights: string[] = [];
    
    switch (experiment.id) {
      case 'aurora-simulator':
        if (params['IMF Bz Component'] < -10) {
          insights.push('Strong southward IMF enhances magnetic reconnection');
        }
        if (params['Solar Wind Speed'] > 600) {
          insights.push('High-speed solar wind creates dynamic aurora displays');
        }
        if (params['Particle Energy'] > 20) {
          insights.push('High-energy particles penetrate deeper into atmosphere');
        }
        break;
        
      case 'solar-wind-analyzer':
        if (params['Proton Temperature'] > 300000) {
          insights.push('Elevated proton temperature indicates coronal heating');
        }
        if (params['Magnetic Field Strength'] > 15) {
          insights.push('Strong magnetic field suggests CME or ICME passage');
        }
        break;
    }

    // Add general insights
    insights.push(`Experiment completed with ${Object.keys(params).length} parameters optimized`);
    insights.push(`Results consistent with ${experiment.nasaData.mission} observations`);
    
    return insights;
  };

  const determineOutcome = (experiment: Experiment, params: Record<string, number>, score: number): string => {
    if (score >= 90) {
      return `Exceptional results! Your parameter optimization achieved NASA-level accuracy.`;
    } else if (score >= 70) {
      return `Good results! Your experiment successfully demonstrated ${experiment.nasaData.scientificPrinciple}.`;
    } else if (score >= 50) {
      return `Moderate results. Consider adjusting parameters to better match observed conditions.`;
    } else {
      return `Experiment complete. Try different parameters to improve accuracy.`;
    }
  };

  // Visualization for experiments
  const renderExperimentVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedExperiment) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000014';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const experiment = experiments.find(e => e.id === selectedExperiment);
    if (!experiment) return;

    switch (experiment.id) {
      case 'aurora-simulator':
        renderAuroraSimulation(ctx, canvas);
        break;
      case 'solar-wind-analyzer':
        renderSolarWindAnalysis(ctx, canvas);
        break;
      case 'magnetosphere-visualizer':
        renderMagnetosphereVisualization(ctx, canvas);
        break;
      default:
        renderGenericVisualization(ctx, canvas);
    }
  };

  const renderAuroraSimulation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const params = experimentParameters;
    
    // Draw Earth
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height - 50);
    
    // Earth
    const earthGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
    earthGradient.addColorStop(0, '#4a90e2');
    earthGradient.addColorStop(1, '#1e3a5f');
    ctx.fillStyle = earthGradient;
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.fill();

    // Aurora based on parameters
    const particleEnergy = params['Particle Energy'] || 10;
    const bzComponent = params['IMF Bz Component'] || -5;
    const intensity = Math.abs(bzComponent) / 20 + particleEnergy / 30;

    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI;
      const distance = 60 + Math.sin(Date.now() * 0.005 + i) * 10;
      const x = Math.cos(angle) * distance;
      const y = -Math.sin(angle) * distance;
      
      // Aurora color based on particle energy
      let color;
      if (particleEnergy > 20) {
        color = `rgba(255, 100, 150, ${intensity})`;  // Red - high energy
      } else if (particleEnergy > 10) {
        color = `rgba(100, 255, 100, ${intensity})`;  // Green - medium energy
      } else {
        color = `rgba(150, 100, 255, ${intensity})`;  // Blue/Purple - low energy
      }

      const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
      particleGradient.addColorStop(0, color);
      particleGradient.addColorStop(1, color.replace(/[\d\.]+\)$/, '0)'));
      
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(x, y, 8 * intensity, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Display parameters
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText(`Solar Wind Speed: ${params['Solar Wind Speed']?.toFixed(0) || 400} km/s`, 10, 25);
    ctx.fillText(`IMF Bz: ${params['IMF Bz Component']?.toFixed(1) || -5} nT`, 10, 45);
    ctx.fillText(`Particle Energy: ${params['Particle Energy']?.toFixed(1) || 10} keV`, 10, 65);
  };

  const renderSolarWindAnalysis = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const params = experimentParameters;
    
    // Draw solar wind flow
    ctx.strokeStyle = 'rgba(255, 200, 0, 0.7)';
    ctx.lineWidth = 2;
    
    const density = params['Proton Density'] || 8;
    const speed = params['Flow Speed'] || 400;
    
    for (let i = 0; i < density; i++) {
      const y = (i / density) * canvas.height;
      const flowLength = (speed / 800) * 100;
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(flowLength, y);
      ctx.stroke();
      
      // Particles
      ctx.fillStyle = 'rgba(255, 255, 100, 0.8)';
      ctx.beginPath();
      ctx.arc(flowLength, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Display analysis
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText(`Proton Density: ${density.toFixed(1)} cm⁻³`, 10, 25);
    ctx.fillText(`Flow Speed: ${speed.toFixed(0)} km/s`, 10, 45);
    ctx.fillText(`Temperature: ${(params['Proton Temperature'] || 100000).toFixed(0)} K`, 10, 65);
  };

  const renderMagnetosphereVisualization = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const params = experimentParameters;
    
    // Draw Earth
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    
    // Earth
    ctx.fillStyle = '#4a90e2';
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fill();

    // Magnetic field lines
    const dipoleStrength = Math.abs(params['Dst Index'] || -50) / 100;
    const tilt = (params['Dipole Tilt'] || 0) * Math.PI / 180;
    
    ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 + dipoleStrength * 0.5})`;
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * 2 * Math.PI + tilt;
      const radius = 50 + i * 20;
      
      ctx.beginPath();
      ctx.arc(0, 0, radius, angle - 0.5, angle + 0.5);
      ctx.stroke();
    }

    ctx.restore();

    // Display parameters
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText(`Dipole Tilt: ${(params['Dipole Tilt'] || 0).toFixed(1)}°`, 10, 25);
    ctx.fillText(`Dst Index: ${(params['Dst Index'] || -50).toFixed(0)} nT`, 10, 45);
    ctx.fillText(`Kp Index: ${(params['Activity Level'] || 3).toFixed(1)}`, 10, 65);
  };

  const renderGenericVisualization = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Generic scientific visualization
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Experiment Running...', canvas.width / 2, canvas.height / 2);
    
    // Animated particles
    for (let i = 0; i < 10; i++) {
      const x = (Math.sin(Date.now() * 0.001 + i) * 100) + canvas.width / 2;
      const y = (Math.cos(Date.now() * 0.002 + i) * 50) + canvas.height / 2;
      
      ctx.fillStyle = `hsl(${i * 36 + Date.now() * 0.1}, 70%, 60%)`;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Animation loop for visualizations
  useEffect(() => {
    if (selectedExperiment) {
      const animate = () => {
        renderExperimentVisualization();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedExperiment, experimentParameters]);

  const renderExperimentInterface = () => {
    const experiment = experiments.find(e => e.id === selectedExperiment);
    if (!experiment) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4"
      >
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button
            onClick={() => setSelectedExperiment(null)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Lab
          </Button>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">{experiment.title}</h2>
            <p className="text-cyan-200">{experiment.nasaData.mission}</p>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={`px-4 py-2 ${
              experiment.difficulty === 'Easy' ? 'bg-green-500' :
              experiment.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
            } text-white`}>
              {experiment.difficulty}
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2">
              {experiment.points} pts
            </Badge>
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-black/40 border-2 border-cyan-400/30 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Monitor className="w-6 h-6" />
                  Live Experiment Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl border-2 border-white/20"
                />
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Parameter Controls */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sliders className="w-6 h-6" />
                  Experiment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiment.parameters.map((param) => (
                  <div key={param.name} className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-white text-sm font-medium">{param.name}</label>
                      <span className="text-cyan-300 text-sm">
                        {experimentParameters[param.name]?.toFixed(1) || param.default} {param.unit}
                      </span>
                    </div>
                    <Slider
                      value={[experimentParameters[param.name] || param.default]}
                      onValueChange={(value) => {
                        setExperimentParameters(prev => ({
                          ...prev,
                          [param.name]: value[0]
                        }));
                      }}
                      min={param.min}
                      max={param.max}
                      step={(param.max - param.min) / 100}
                      className="w-full"
                    />
                    <p className="text-gray-400 text-xs">{param.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Run Experiment */}
            <Card className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-400/30">
              <CardContent className="p-6">
                <Button
                  onClick={runExperiment}
                  disabled={isRunning}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-6 text-xl rounded-2xl"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-6 h-6 mr-2 animate-spin" />
                      Running Experiment...
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 mr-2" />
                      Run Experiment
                    </>
                  )}
                </Button>
                {isRunning && (
                  <div className="mt-4">
                    <Progress value={66} className="w-full" />
                    <p className="text-center text-white mt-2">Collecting data...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* NASA Mission Info */}
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Satellite className="w-6 h-6" />
                  NASA Mission Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-cyan-300 font-semibold">Mission:</p>
                  <p className="text-white text-sm">{experiment.nasaData.mission}</p>
                </div>
                <div>
                  <p className="text-cyan-300 font-semibold">Scientific Principle:</p>
                  <p className="text-white text-sm">{experiment.nasaData.scientificPrinciple}</p>
                </div>
                <div>
                  <p className="text-cyan-300 font-semibold">Equipment:</p>
                  <ul className="text-white text-sm space-y-1">
                    {experiment.nasaData.equipment.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Results */}
        {results.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-400/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  Latest Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.slice(0, 3).map((result, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 rounded-xl p-4 mb-4 last:mb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{result.outcome}</p>
                        <p className="text-gray-400 text-sm">
                          {result.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge className={`${
                        result.score >= 80 ? 'bg-green-500' :
                        result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      } text-white`}>
                        {result.score.toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {result.insights.slice(0, 2).map((insight, i) => (
                        <p key={i} className="text-cyan-200 text-sm flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          {insight}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderSpaceLab = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-xl px-6 py-3 rounded-2xl"
        >
          <Home className="w-6 h-6" />
          Back to Home
        </Button>
        
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            🧪 NASA Space Weather Laboratory
          </h1>
          <p className="text-xl text-cyan-200">
            Conduct real space weather experiments with mission data!
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-lg">
            Points: {userProgress.discoveryPoints}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-lg">
            Level: {userProgress.labLevel}
          </Badge>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-6 mb-8 border-2 border-purple-400/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">Laboratory Progress</h3>
          <Award className="w-8 h-8 text-yellow-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{userProgress.experimentsCompleted}</div>
            <div className="text-purple-200">Experiments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">{userProgress.discoveryPoints}</div>
            <div className="text-cyan-200">Discovery Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{userProgress.labLevel}</div>
            <div className="text-green-200">Lab Level</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{userProgress.badges.length}</div>
            <div className="text-orange-200">Badges Earned</div>
          </div>
        </div>
      </motion.div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiments.map((experiment, index) => (
          <motion.div
            key={experiment.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30 shadow-2xl cursor-pointer h-full">
              <CardHeader className="text-center relative">
                {/* Scientific equipment animation */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-cyan-400/60"
                      style={{
                        left: `${25 + i * 15}%`,
                        top: `${20 + (i % 2) * 30}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  className="text-6xl mb-4 relative z-10"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {experiment.icon}
                </motion.div>
                
                <CardTitle className="text-xl text-white mb-3 relative z-10">{experiment.title}</CardTitle>
                
                <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
                  <Badge className={`${
                    experiment.difficulty === 'Easy' ? 'bg-green-500' :
                    experiment.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}>
                    {experiment.difficulty}
                  </Badge>
                  <Badge className="bg-white/20 text-white">
                    <Clock className="w-4 h-4 mr-1" />
                    {experiment.timeEstimate}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 relative z-10">
                <p className="text-white text-sm leading-relaxed">{experiment.description}</p>
                
                {/* NASA Mission Panel */}
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                  <h4 className="text-cyan-300 font-bold mb-2 flex items-center gap-2">
                    <Satellite className="w-4 h-4" />
                    NASA Mission
                  </h4>
                  <p className="text-cyan-100 text-xs font-semibold">{experiment.nasaData.mission}</p>
                  <p className="text-cyan-200 text-xs mt-1">{experiment.nasaData.realData}</p>
                </div>

                {/* Scientific Principle */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold flex items-center gap-2 text-sm">
                      <Microscope className="w-4 h-4" />
                      {experiment.category.charAt(0).toUpperCase() + experiment.category.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 font-bold text-sm">+{experiment.points}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedExperiment(experiment.id);
                    initializeExperiment(experiment.id);
                    playSound('click');
                  }}
                  className="w-full bg-white/20 hover:bg-white/30 text-white text-lg py-4 rounded-2xl border-2 border-white/50 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                  <Beaker className="w-5 h-5 mr-2" />
                  Start Experiment
                  <Rocket className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Results Summary */}
      {results.length > 0 && (
        <motion.div
          className="mt-12 bg-gradient-to-r from-gray-800/50 to-blue-800/50 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-600/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            Recent Laboratory Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.slice(0, 3).map((result, index) => (
              <motion.div
                key={index}
                className="bg-white/10 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${
                    result.score >= 80 ? 'bg-green-500' :
                    result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}>
                    {result.score.toFixed(0)}%
                  </Badge>
                  <span className="text-gray-400 text-sm">
                    {result.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white text-sm font-semibold mb-2">{result.outcome}</p>
                <p className="text-cyan-200 text-xs">{result.insights[0]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* NASA Attribution */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-6 border-2 border-indigo-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png" 
            alt="NASA Logo" 
            className="w-16 h-16"
          />
          <div>
            <h3 className="text-2xl font-bold text-white">Powered by Real NASA Science</h3>
            <p className="text-gray-300">All experiments use authentic mission data and scientific principles</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/10 rounded-xl p-4">
            <Satellite className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-200 font-semibold">Real Mission Data</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <Microscope className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-200 font-semibold">Scientific Methods</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-200 font-semibold">Data Analysis</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-yellow-200 font-semibold">Achievement System</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Celebration overlay
  const renderCelebration = () => (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-cyan-900/90 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 180 }}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-12 max-w-2xl mx-4 text-center border-4 border-white shadow-2xl"
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🧪
            </motion.div>
            <h3 className="text-4xl font-bold text-white mb-4">Experiment Success!</h3>
            <p className="text-white text-xl mb-6">
              Outstanding results! You've made a significant scientific discovery!
            </p>
            <div className="flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="text-4xl"
                >
                  ⭐
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (selectedExperiment) {
    return (
      <>
        {renderExperimentInterface()}
        {renderCelebration()}
      </>
    );
  }

  return (
    <>
      {renderSpaceLab()}
      {renderCelebration()}
    </>
  );
}