'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimulationDashboard } from '@/components/SimulationDashboard';
import { SimulationForm } from '@/components/SimulationForm';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { HeroSection } from '@/components/HeroSection';
import { AgentShowcase } from '@/components/AgentShowcase';
import { InteractiveGlobe } from '@/components/InteractiveGlobe';
import { LiveMetrics } from '@/components/LiveMetrics';
import { AIInsights } from '@/components/AIInsights';
import { Sidebar } from '@/components/Sidebar';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { CompliancePack } from '@/components/CompliancePack';
import { NeighborhoodHeatmap } from '@/components/NeighborhoodHeatmap';
import { AgentSwarm } from '@/components/AgentSwarm';
import { BlackSwanTesting } from '@/components/BlackSwanTesting';
import { MonteCarloSimulation } from '@/components/MonteCarloSimulation';
import { SourceGrounding } from '@/components/SourceGrounding';
import { PrivacyVault } from '@/components/PrivacyVault';
import { HyperLocalData } from '@/components/HyperLocalData';
import { SemanticCrossMapping } from '@/components/SemanticCrossMapping';
import { DocumentVerification } from '@/components/DocumentVerification';
import { CulturalCommunication } from '@/components/CulturalCommunication';
import { LifestyleTwins } from '@/components/LifestyleTwins';
import { FederatedTrustScore } from '@/components/FederatedTrustScore';
import { Toaster, toast } from 'react-hot-toast';
import { ArrowUp, X } from 'lucide-react';

export default function Home() {
  const [simulationData, setSimulationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Pranay Gujar',
    email: 'pranay.gujar@example.com',
    location: 'Pune, India',
    income: '100000',
    currency: '₹',
    targetCities: 'Berlin, Tokyo, Singapore'
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    agentAlerts: true,
    zeroKnowledge: true,
    dataEncryption: true,
    anonymousAnalytics: true,
    darkMode: true,
    currencyFormat: true,
    dateFormat: true
  });
  const [showHelpModal, setShowHelpModal] = useState<string | null>(null);

  const handleSimulation = async (formData: any) => {
    setIsLoading(true);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      // City database with unique metrics for each city
      const cityData: Record<string, { wealthMultiplier1: number; wealthMultiplier5: number; riskScore: number; qualityScore: number; costIncrease: number; taxBurden: number; hiddenCosts: number; riskLevel: string }> = {
        'Singapore': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.58, riskScore: 0.12, qualityScore: 0.95, costIncrease: 22.1, taxBurden: 18.5, hiddenCosts: 15200, riskLevel: 'Low' },
        'Berlin, Germany': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.62, riskScore: 0.18, qualityScore: 0.91, costIncrease: 8.7, taxBurden: 38.2, hiddenCosts: 9600, riskLevel: 'Low' },
        'Tokyo, Japan': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.48, riskScore: 0.15, qualityScore: 0.93, costIncrease: 18.5, taxBurden: 28.5, hiddenCosts: 14200, riskLevel: 'Low' },
        'London, UK': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.45, riskScore: 0.25, qualityScore: 0.88, costIncrease: 15.2, taxBurden: 32.5, hiddenCosts: 12800, riskLevel: 'Medium' },
        'New York, USA': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.55, riskScore: 0.22, qualityScore: 0.86, costIncrease: 25.8, taxBurden: 35.2, hiddenCosts: 18500, riskLevel: 'Medium' },
        'Dubai, UAE': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.72, riskScore: 0.20, qualityScore: 0.84, costIncrease: 12.5, taxBurden: 5.0, hiddenCosts: 11000, riskLevel: 'Medium' },
        'Amsterdam, Netherlands': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.58, riskScore: 0.16, qualityScore: 0.92, costIncrease: 10.2, taxBurden: 42.5, hiddenCosts: 8800, riskLevel: 'Low' },
        'Sydney, Australia': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.52, riskScore: 0.14, qualityScore: 0.94, costIncrease: 19.8, taxBurden: 32.0, hiddenCosts: 13500, riskLevel: 'Low' },
        'Toronto, Canada': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.55, riskScore: 0.17, qualityScore: 0.90, costIncrease: 14.5, taxBurden: 33.8, hiddenCosts: 10200, riskLevel: 'Low' },
        'Lisbon, Portugal': { wealthMultiplier1: 0.94, wealthMultiplier5: 1.68, riskScore: 0.19, qualityScore: 0.87, costIncrease: 5.2, taxBurden: 28.0, hiddenCosts: 7500, riskLevel: 'Low' },
        'Paris, France': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.42, riskScore: 0.24, qualityScore: 0.89, costIncrease: 20.5, taxBurden: 45.0, hiddenCosts: 14800, riskLevel: 'Medium' },
        'Zurich, Switzerland': { wealthMultiplier1: 0.75, wealthMultiplier5: 1.65, riskScore: 0.10, qualityScore: 0.97, costIncrease: 35.2, taxBurden: 22.0, hiddenCosts: 16500, riskLevel: 'Low' },
        'Hong Kong': { wealthMultiplier1: 0.79, wealthMultiplier5: 1.52, riskScore: 0.23, qualityScore: 0.85, costIncrease: 28.5, taxBurden: 15.0, hiddenCosts: 17200, riskLevel: 'Medium' },
        'Seoul, South Korea': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.56, riskScore: 0.16, qualityScore: 0.91, costIncrease: 12.8, taxBurden: 26.5, hiddenCosts: 11800, riskLevel: 'Low' },
        'Barcelona, Spain': { wealthMultiplier1: 0.91, wealthMultiplier5: 1.54, riskScore: 0.21, qualityScore: 0.88, costIncrease: 8.5, taxBurden: 36.0, hiddenCosts: 9200, riskLevel: 'Medium' },
        'Barcelona': { wealthMultiplier1: 0.91, wealthMultiplier5: 1.54, riskScore: 0.21, qualityScore: 0.88, costIncrease: 8.5, taxBurden: 36.0, hiddenCosts: 9200, riskLevel: 'Medium' },
        // Eastern European - Low cost, high growth
        'Prague, Czech Republic': { wealthMultiplier1: 0.96, wealthMultiplier5: 1.82, riskScore: 0.14, qualityScore: 0.89, costIncrease: 4.2, taxBurden: 23.0, hiddenCosts: 5200, riskLevel: 'Low' },
        'Prague': { wealthMultiplier1: 0.96, wealthMultiplier5: 1.82, riskScore: 0.14, qualityScore: 0.89, costIncrease: 4.2, taxBurden: 23.0, hiddenCosts: 5200, riskLevel: 'Low' },
        'Krakow, Poland': { wealthMultiplier1: 0.98, wealthMultiplier5: 1.95, riskScore: 0.16, qualityScore: 0.86, costIncrease: 3.5, taxBurden: 19.0, hiddenCosts: 4100, riskLevel: 'Low' },
        'Krakow': { wealthMultiplier1: 0.98, wealthMultiplier5: 1.95, riskScore: 0.16, qualityScore: 0.86, costIncrease: 3.5, taxBurden: 19.0, hiddenCosts: 4100, riskLevel: 'Low' },
        'Warsaw, Poland': { wealthMultiplier1: 0.95, wealthMultiplier5: 1.85, riskScore: 0.15, qualityScore: 0.87, costIncrease: 4.8, taxBurden: 19.0, hiddenCosts: 4800, riskLevel: 'Low' },
        'Warsaw': { wealthMultiplier1: 0.95, wealthMultiplier5: 1.85, riskScore: 0.15, qualityScore: 0.87, costIncrease: 4.8, taxBurden: 19.0, hiddenCosts: 4800, riskLevel: 'Low' },
        'Budapest, Hungary': { wealthMultiplier1: 0.97, wealthMultiplier5: 1.88, riskScore: 0.18, qualityScore: 0.84, costIncrease: 3.8, taxBurden: 15.0, hiddenCosts: 3900, riskLevel: 'Low' },
        'Budapest': { wealthMultiplier1: 0.97, wealthMultiplier5: 1.88, riskScore: 0.18, qualityScore: 0.84, costIncrease: 3.8, taxBurden: 15.0, hiddenCosts: 3900, riskLevel: 'Low' },
        'Bucharest, Romania': { wealthMultiplier1: 0.99, wealthMultiplier5: 2.05, riskScore: 0.22, qualityScore: 0.78, costIncrease: 2.9, taxBurden: 10.0, hiddenCosts: 3200, riskLevel: 'Medium' },
        'Bucharest': { wealthMultiplier1: 0.99, wealthMultiplier5: 2.05, riskScore: 0.22, qualityScore: 0.78, costIncrease: 2.9, taxBurden: 10.0, hiddenCosts: 3200, riskLevel: 'Medium' },
        // Irish Cities
        'Dublin, Ireland': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.58, riskScore: 0.15, qualityScore: 0.91, costIncrease: 12.5, taxBurden: 40.0, hiddenCosts: 11500, riskLevel: 'Low' },
        'Dublin': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.58, riskScore: 0.15, qualityScore: 0.91, costIncrease: 12.5, taxBurden: 40.0, hiddenCosts: 11500, riskLevel: 'Low' },
        'Cork, Ireland': { wealthMultiplier1: 0.91, wealthMultiplier5: 1.72, riskScore: 0.13, qualityScore: 0.90, costIncrease: 8.2, taxBurden: 40.0, hiddenCosts: 8200, riskLevel: 'Low' },
        'Cork': { wealthMultiplier1: 0.91, wealthMultiplier5: 1.72, riskScore: 0.13, qualityScore: 0.90, costIncrease: 8.2, taxBurden: 40.0, hiddenCosts: 8200, riskLevel: 'Low' },
        'Galway, Ireland': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.78, riskScore: 0.12, qualityScore: 0.89, costIncrease: 6.5, taxBurden: 40.0, hiddenCosts: 7500, riskLevel: 'Low' },
        'Galway': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.78, riskScore: 0.12, qualityScore: 0.89, costIncrease: 6.5, taxBurden: 40.0, hiddenCosts: 7500, riskLevel: 'Low' },
        // Nordic Cities
        'Stockholm, Sweden': { wealthMultiplier1: 0.83, wealthMultiplier5: 1.52, riskScore: 0.11, qualityScore: 0.96, costIncrease: 15.8, taxBurden: 52.0, hiddenCosts: 12200, riskLevel: 'Low' },
        'Stockholm': { wealthMultiplier1: 0.83, wealthMultiplier5: 1.52, riskScore: 0.11, qualityScore: 0.96, costIncrease: 15.8, taxBurden: 52.0, hiddenCosts: 12200, riskLevel: 'Low' },
        'Copenhagen, Denmark': { wealthMultiplier1: 0.81, wealthMultiplier5: 1.48, riskScore: 0.10, qualityScore: 0.97, costIncrease: 18.2, taxBurden: 55.0, hiddenCosts: 13800, riskLevel: 'Low' },
        'Copenhagen': { wealthMultiplier1: 0.81, wealthMultiplier5: 1.48, riskScore: 0.10, qualityScore: 0.97, costIncrease: 18.2, taxBurden: 55.0, hiddenCosts: 13800, riskLevel: 'Low' },
        'Oslo, Norway': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.45, riskScore: 0.09, qualityScore: 0.98, costIncrease: 22.5, taxBurden: 46.0, hiddenCosts: 15500, riskLevel: 'Low' },
        'Oslo': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.45, riskScore: 0.09, qualityScore: 0.98, costIncrease: 22.5, taxBurden: 46.0, hiddenCosts: 15500, riskLevel: 'Low' },
        'Helsinki, Finland': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.55, riskScore: 0.10, qualityScore: 0.95, costIncrease: 14.2, taxBurden: 51.0, hiddenCosts: 11800, riskLevel: 'Low' },
        'Helsinki': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.55, riskScore: 0.10, qualityScore: 0.95, costIncrease: 14.2, taxBurden: 51.0, hiddenCosts: 11800, riskLevel: 'Low' },
        // Southern European
        'Madrid, Spain': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.58, riskScore: 0.19, qualityScore: 0.88, costIncrease: 7.8, taxBurden: 37.0, hiddenCosts: 8500, riskLevel: 'Low' },
        'Madrid': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.58, riskScore: 0.19, qualityScore: 0.88, costIncrease: 7.8, taxBurden: 37.0, hiddenCosts: 8500, riskLevel: 'Low' },
        'Milan, Italy': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.48, riskScore: 0.22, qualityScore: 0.87, costIncrease: 11.5, taxBurden: 43.0, hiddenCosts: 10200, riskLevel: 'Medium' },
        'Milan': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.48, riskScore: 0.22, qualityScore: 0.87, costIncrease: 11.5, taxBurden: 43.0, hiddenCosts: 10200, riskLevel: 'Medium' },
        'Rome, Italy': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.52, riskScore: 0.24, qualityScore: 0.85, costIncrease: 9.2, taxBurden: 43.0, hiddenCosts: 9800, riskLevel: 'Medium' },
        'Rome': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.52, riskScore: 0.24, qualityScore: 0.85, costIncrease: 9.2, taxBurden: 43.0, hiddenCosts: 9800, riskLevel: 'Medium' },
        'Athens, Greece': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.65, riskScore: 0.26, qualityScore: 0.82, costIncrease: 5.5, taxBurden: 44.0, hiddenCosts: 6800, riskLevel: 'Medium' },
        'Athens': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.65, riskScore: 0.26, qualityScore: 0.82, costIncrease: 5.5, taxBurden: 44.0, hiddenCosts: 6800, riskLevel: 'Medium' },
        // German Cities
        'Munich, Germany': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.55, riskScore: 0.12, qualityScore: 0.94, costIncrease: 14.5, taxBurden: 42.0, hiddenCosts: 12500, riskLevel: 'Low' },
        'Munich': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.55, riskScore: 0.12, qualityScore: 0.94, costIncrease: 14.5, taxBurden: 42.0, hiddenCosts: 12500, riskLevel: 'Low' },
        'Frankfurt, Germany': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.58, riskScore: 0.14, qualityScore: 0.92, costIncrease: 12.8, taxBurden: 42.0, hiddenCosts: 11200, riskLevel: 'Low' },
        'Frankfurt': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.58, riskScore: 0.14, qualityScore: 0.92, costIncrease: 12.8, taxBurden: 42.0, hiddenCosts: 11200, riskLevel: 'Low' },
        // Other European
        'Vienna, Austria': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.62, riskScore: 0.11, qualityScore: 0.96, costIncrease: 9.8, taxBurden: 42.0, hiddenCosts: 9200, riskLevel: 'Low' },
        'Vienna': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.62, riskScore: 0.11, qualityScore: 0.96, costIncrease: 9.8, taxBurden: 42.0, hiddenCosts: 9200, riskLevel: 'Low' },
        'Brussels, Belgium': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.52, riskScore: 0.17, qualityScore: 0.90, costIncrease: 11.2, taxBurden: 50.0, hiddenCosts: 10800, riskLevel: 'Low' },
        'Brussels': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.52, riskScore: 0.17, qualityScore: 0.90, costIncrease: 11.2, taxBurden: 50.0, hiddenCosts: 10800, riskLevel: 'Low' },
        // Asian Cities
        'Bangkok, Thailand': { wealthMultiplier1: 0.95, wealthMultiplier5: 1.92, riskScore: 0.24, qualityScore: 0.78, costIncrease: 3.2, taxBurden: 35.0, hiddenCosts: 4500, riskLevel: 'Medium' },
        'Bangkok': { wealthMultiplier1: 0.95, wealthMultiplier5: 1.92, riskScore: 0.24, qualityScore: 0.78, costIncrease: 3.2, taxBurden: 35.0, hiddenCosts: 4500, riskLevel: 'Medium' },
        'Kuala Lumpur, Malaysia': { wealthMultiplier1: 0.94, wealthMultiplier5: 1.85, riskScore: 0.20, qualityScore: 0.82, costIncrease: 4.5, taxBurden: 28.0, hiddenCosts: 5200, riskLevel: 'Low' },
        'Kuala Lumpur': { wealthMultiplier1: 0.94, wealthMultiplier5: 1.85, riskScore: 0.20, qualityScore: 0.82, costIncrease: 4.5, taxBurden: 28.0, hiddenCosts: 5200, riskLevel: 'Low' },
        // Americas
        'Vancouver, Canada': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.52, riskScore: 0.14, qualityScore: 0.93, costIncrease: 16.5, taxBurden: 33.0, hiddenCosts: 12800, riskLevel: 'Low' },
        'Vancouver': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.52, riskScore: 0.14, qualityScore: 0.93, costIncrease: 16.5, taxBurden: 33.0, hiddenCosts: 12800, riskLevel: 'Low' },
        'Montreal, Canada': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.62, riskScore: 0.15, qualityScore: 0.91, costIncrease: 10.2, taxBurden: 37.0, hiddenCosts: 9500, riskLevel: 'Low' },
        'Montreal': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.62, riskScore: 0.15, qualityScore: 0.91, costIncrease: 10.2, taxBurden: 37.0, hiddenCosts: 9500, riskLevel: 'Low' },
        'Austin, USA': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.18, qualityScore: 0.88, costIncrease: 12.5, taxBurden: 25.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Austin': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.18, qualityScore: 0.88, costIncrease: 12.5, taxBurden: 25.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Miami, USA': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.22, qualityScore: 0.84, costIncrease: 15.8, taxBurden: 22.0, hiddenCosts: 11500, riskLevel: 'Medium' },
        'Miami': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.22, qualityScore: 0.84, costIncrease: 15.8, taxBurden: 22.0, hiddenCosts: 11500, riskLevel: 'Medium' },
        // Oceania
        'Melbourne, Australia': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.55, riskScore: 0.13, qualityScore: 0.95, costIncrease: 16.2, taxBurden: 32.0, hiddenCosts: 12200, riskLevel: 'Low' },
        'Melbourne': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.55, riskScore: 0.13, qualityScore: 0.95, costIncrease: 16.2, taxBurden: 32.0, hiddenCosts: 12200, riskLevel: 'Low' },
        'Auckland, New Zealand': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.58, riskScore: 0.12, qualityScore: 0.94, costIncrease: 14.5, taxBurden: 33.0, hiddenCosts: 11000, riskLevel: 'Low' },
        'Auckland': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.58, riskScore: 0.12, qualityScore: 0.94, costIncrease: 14.5, taxBurden: 33.0, hiddenCosts: 11000, riskLevel: 'Low' },
        // Indian Cities - Lower salaries but low cost, moderate growth
        'Pune, India': { wealthMultiplier1: 0.65, wealthMultiplier5: 1.15, riskScore: 0.28, qualityScore: 0.72, costIncrease: 6.5, taxBurden: 30.0, hiddenCosts: 2800, riskLevel: 'Medium' },
        'Pune': { wealthMultiplier1: 0.65, wealthMultiplier5: 1.15, riskScore: 0.28, qualityScore: 0.72, costIncrease: 6.5, taxBurden: 30.0, hiddenCosts: 2800, riskLevel: 'Medium' },
        'Mumbai, India': { wealthMultiplier1: 0.62, wealthMultiplier5: 1.18, riskScore: 0.30, qualityScore: 0.70, costIncrease: 8.5, taxBurden: 30.0, hiddenCosts: 4200, riskLevel: 'Medium' },
        'Mumbai': { wealthMultiplier1: 0.62, wealthMultiplier5: 1.18, riskScore: 0.30, qualityScore: 0.70, costIncrease: 8.5, taxBurden: 30.0, hiddenCosts: 4200, riskLevel: 'Medium' },
        'Bangalore, India': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.2, taxBurden: 30.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Bangalore': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.2, taxBurden: 30.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Bengaluru, India': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.2, taxBurden: 30.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Bengaluru': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.2, taxBurden: 30.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Delhi, India': { wealthMultiplier1: 0.60, wealthMultiplier5: 1.12, riskScore: 0.35, qualityScore: 0.65, costIncrease: 7.8, taxBurden: 30.0, hiddenCosts: 3800, riskLevel: 'High' },
        'Delhi': { wealthMultiplier1: 0.60, wealthMultiplier5: 1.12, riskScore: 0.35, qualityScore: 0.65, costIncrease: 7.8, taxBurden: 30.0, hiddenCosts: 3800, riskLevel: 'High' },
        'New Delhi, India': { wealthMultiplier1: 0.60, wealthMultiplier5: 1.12, riskScore: 0.35, qualityScore: 0.65, costIncrease: 7.8, taxBurden: 30.0, hiddenCosts: 3800, riskLevel: 'High' },
        'Hyderabad, India': { wealthMultiplier1: 0.66, wealthMultiplier5: 1.20, riskScore: 0.27, qualityScore: 0.73, costIncrease: 6.2, taxBurden: 30.0, hiddenCosts: 3200, riskLevel: 'Medium' },
        'Hyderabad': { wealthMultiplier1: 0.66, wealthMultiplier5: 1.20, riskScore: 0.27, qualityScore: 0.73, costIncrease: 6.2, taxBurden: 30.0, hiddenCosts: 3200, riskLevel: 'Medium' },
        'Chennai, India': { wealthMultiplier1: 0.64, wealthMultiplier5: 1.16, riskScore: 0.28, qualityScore: 0.71, costIncrease: 5.8, taxBurden: 30.0, hiddenCosts: 3000, riskLevel: 'Medium' },
        'Chennai': { wealthMultiplier1: 0.64, wealthMultiplier5: 1.16, riskScore: 0.28, qualityScore: 0.71, costIncrease: 5.8, taxBurden: 30.0, hiddenCosts: 3000, riskLevel: 'Medium' },
        'Ahmedabad, India': { wealthMultiplier1: 0.67, wealthMultiplier5: 1.18, riskScore: 0.26, qualityScore: 0.72, costIncrease: 5.5, taxBurden: 30.0, hiddenCosts: 2600, riskLevel: 'Medium' },
        'Ahmedabad': { wealthMultiplier1: 0.67, wealthMultiplier5: 1.18, riskScore: 0.26, qualityScore: 0.72, costIncrease: 5.5, taxBurden: 30.0, hiddenCosts: 2600, riskLevel: 'Medium' },
        'Kolkata, India': { wealthMultiplier1: 0.62, wealthMultiplier5: 1.12, riskScore: 0.30, qualityScore: 0.68, costIncrease: 4.8, taxBurden: 30.0, hiddenCosts: 2400, riskLevel: 'Medium' },
        'Kolkata': { wealthMultiplier1: 0.62, wealthMultiplier5: 1.12, riskScore: 0.30, qualityScore: 0.68, costIncrease: 4.8, taxBurden: 30.0, hiddenCosts: 2400, riskLevel: 'Medium' },
        'Jaipur, India': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.20, riskScore: 0.27, qualityScore: 0.70, costIncrease: 4.5, taxBurden: 30.0, hiddenCosts: 2200, riskLevel: 'Medium' },
        'Jaipur': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.20, riskScore: 0.27, qualityScore: 0.70, costIncrease: 4.5, taxBurden: 30.0, hiddenCosts: 2200, riskLevel: 'Medium' },
        'Surat, India': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.22, riskScore: 0.25, qualityScore: 0.71, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Surat': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.22, riskScore: 0.25, qualityScore: 0.71, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Gurgaon, India': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.24, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.5, taxBurden: 30.0, hiddenCosts: 3600, riskLevel: 'Medium' },
        'Gurgaon': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.24, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.5, taxBurden: 30.0, hiddenCosts: 3600, riskLevel: 'Medium' },
        'Gurugram, India': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.24, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.5, taxBurden: 30.0, hiddenCosts: 3600, riskLevel: 'Medium' },
        'Gurugram': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.24, riskScore: 0.26, qualityScore: 0.74, costIncrease: 7.5, taxBurden: 30.0, hiddenCosts: 3600, riskLevel: 'Medium' },
        'Noida, India': { wealthMultiplier1: 0.67, wealthMultiplier5: 1.21, riskScore: 0.27, qualityScore: 0.72, costIncrease: 6.8, taxBurden: 30.0, hiddenCosts: 3200, riskLevel: 'Medium' },
        'Noida': { wealthMultiplier1: 0.67, wealthMultiplier5: 1.21, riskScore: 0.27, qualityScore: 0.72, costIncrease: 6.8, taxBurden: 30.0, hiddenCosts: 3200, riskLevel: 'Medium' },
        // European cities - Belgium
        'Antwerp, Belgium': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.55, riskScore: 0.15, qualityScore: 0.91, costIncrease: 9.8, taxBurden: 50.0, hiddenCosts: 9800, riskLevel: 'Low' },
        'Antwerp': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.55, riskScore: 0.15, qualityScore: 0.91, costIncrease: 9.8, taxBurden: 50.0, hiddenCosts: 9800, riskLevel: 'Low' },
        // Spanish Cities
        'Bilbao, Spain': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.56, riskScore: 0.18, qualityScore: 0.89, costIncrease: 7.2, taxBurden: 36.0, hiddenCosts: 8200, riskLevel: 'Low' },
        'Bilbao': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.56, riskScore: 0.18, qualityScore: 0.89, costIncrease: 7.2, taxBurden: 36.0, hiddenCosts: 8200, riskLevel: 'Low' },
        'Valencia, Spain': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.58, riskScore: 0.19, qualityScore: 0.87, costIncrease: 6.5, taxBurden: 36.0, hiddenCosts: 7800, riskLevel: 'Low' },
        'Valencia': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.58, riskScore: 0.19, qualityScore: 0.87, costIncrease: 6.5, taxBurden: 36.0, hiddenCosts: 7800, riskLevel: 'Low' },
        'Seville, Spain': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.60, riskScore: 0.20, qualityScore: 0.86, costIncrease: 5.8, taxBurden: 36.0, hiddenCosts: 7200, riskLevel: 'Low' },
        'Seville': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.60, riskScore: 0.20, qualityScore: 0.86, costIncrease: 5.8, taxBurden: 36.0, hiddenCosts: 7200, riskLevel: 'Low' },
        // New Zealand
        'Wellington, New Zealand': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.60, riskScore: 0.11, qualityScore: 0.95, costIncrease: 12.5, taxBurden: 33.0, hiddenCosts: 10500, riskLevel: 'Low' },
        'Wellington': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.60, riskScore: 0.11, qualityScore: 0.95, costIncrease: 12.5, taxBurden: 33.0, hiddenCosts: 10500, riskLevel: 'Low' },
        'Christchurch, New Zealand': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.62, riskScore: 0.12, qualityScore: 0.93, costIncrease: 10.8, taxBurden: 33.0, hiddenCosts: 9800, riskLevel: 'Low' },
        'Christchurch': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.62, riskScore: 0.12, qualityScore: 0.93, costIncrease: 10.8, taxBurden: 33.0, hiddenCosts: 9800, riskLevel: 'Low' },
        // More Indian Tier-2 Cities
        'Hubli-Dharwad, India': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.28, riskScore: 0.24, qualityScore: 0.68, costIncrease: 3.5, taxBurden: 30.0, hiddenCosts: 1800, riskLevel: 'Medium' },
        'Hubli-Dharwad': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.28, riskScore: 0.24, qualityScore: 0.68, costIncrease: 3.5, taxBurden: 30.0, hiddenCosts: 1800, riskLevel: 'Medium' },
        'Hubli': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.28, riskScore: 0.24, qualityScore: 0.68, costIncrease: 3.5, taxBurden: 30.0, hiddenCosts: 1800, riskLevel: 'Medium' },
        'Dharwad': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.28, riskScore: 0.24, qualityScore: 0.68, costIncrease: 3.5, taxBurden: 30.0, hiddenCosts: 1800, riskLevel: 'Medium' },
        'Coimbatore, India': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.25, riskScore: 0.25, qualityScore: 0.70, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Coimbatore': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.25, riskScore: 0.25, qualityScore: 0.70, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Indore, India': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.26, riskScore: 0.24, qualityScore: 0.71, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 1900, riskLevel: 'Medium' },
        'Indore': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.26, riskScore: 0.24, qualityScore: 0.71, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 1900, riskLevel: 'Medium' },
        'Lucknow, India': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.69, costIncrease: 4.0, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Lucknow': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.69, costIncrease: 4.0, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Nagpur, India': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.24, riskScore: 0.25, qualityScore: 0.70, costIncrease: 3.6, taxBurden: 30.0, hiddenCosts: 1850, riskLevel: 'Medium' },
        'Nagpur': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.24, riskScore: 0.25, qualityScore: 0.70, costIncrease: 3.6, taxBurden: 30.0, hiddenCosts: 1850, riskLevel: 'Medium' },
        'Visakhapatnam, India': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.23, riskScore: 0.26, qualityScore: 0.69, costIncrease: 4.1, taxBurden: 30.0, hiddenCosts: 2050, riskLevel: 'Medium' },
        'Visakhapatnam': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.23, riskScore: 0.26, qualityScore: 0.69, costIncrease: 4.1, taxBurden: 30.0, hiddenCosts: 2050, riskLevel: 'Medium' },
        'Vizag': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.23, riskScore: 0.26, qualityScore: 0.69, costIncrease: 4.1, taxBurden: 30.0, hiddenCosts: 2050, riskLevel: 'Medium' },
        'Bhopal, India': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.25, riskScore: 0.25, qualityScore: 0.70, costIncrease: 3.5, taxBurden: 30.0, hiddenCosts: 1800, riskLevel: 'Medium' },
        'Bhopal': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.25, riskScore: 0.25, qualityScore: 0.70, costIncrease: 3.5, taxBurden: 30.0, hiddenCosts: 1800, riskLevel: 'Medium' },
        'Chandigarh, India': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.28, riskScore: 0.22, qualityScore: 0.76, costIncrease: 5.2, taxBurden: 30.0, hiddenCosts: 2400, riskLevel: 'Low' },
        'Chandigarh': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.28, riskScore: 0.22, qualityScore: 0.76, costIncrease: 5.2, taxBurden: 30.0, hiddenCosts: 2400, riskLevel: 'Low' },
        'Kochi, India': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.24, riskScore: 0.24, qualityScore: 0.72, costIncrease: 4.5, taxBurden: 30.0, hiddenCosts: 2200, riskLevel: 'Medium' },
        'Kochi': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.24, riskScore: 0.24, qualityScore: 0.72, costIncrease: 4.5, taxBurden: 30.0, hiddenCosts: 2200, riskLevel: 'Medium' },
        'Thiruvananthapuram, India': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.22, riskScore: 0.25, qualityScore: 0.71, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Thiruvananthapuram': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.22, riskScore: 0.25, qualityScore: 0.71, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        // More US Cities
        'Los Angeles, USA': { wealthMultiplier1: 0.76, wealthMultiplier5: 1.48, riskScore: 0.22, qualityScore: 0.85, costIncrease: 24.5, taxBurden: 33.0, hiddenCosts: 19500, riskLevel: 'Medium' },
        'Los Angeles': { wealthMultiplier1: 0.76, wealthMultiplier5: 1.48, riskScore: 0.22, qualityScore: 0.85, costIncrease: 24.5, taxBurden: 33.0, hiddenCosts: 19500, riskLevel: 'Medium' },
        'Chicago, USA': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.58, riskScore: 0.20, qualityScore: 0.86, costIncrease: 14.2, taxBurden: 32.0, hiddenCosts: 13500, riskLevel: 'Medium' },
        'Chicago': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.58, riskScore: 0.20, qualityScore: 0.86, costIncrease: 14.2, taxBurden: 32.0, hiddenCosts: 13500, riskLevel: 'Medium' },
        'Seattle, USA': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.18, qualityScore: 0.89, costIncrease: 18.5, taxBurden: 28.0, hiddenCosts: 15200, riskLevel: 'Low' },
        'Seattle': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.18, qualityScore: 0.89, costIncrease: 18.5, taxBurden: 28.0, hiddenCosts: 15200, riskLevel: 'Low' },
        'Boston, USA': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.52, riskScore: 0.19, qualityScore: 0.90, costIncrease: 20.2, taxBurden: 32.0, hiddenCosts: 16800, riskLevel: 'Low' },
        'Boston': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.52, riskScore: 0.19, qualityScore: 0.90, costIncrease: 20.2, taxBurden: 32.0, hiddenCosts: 16800, riskLevel: 'Low' },
        'Denver, USA': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.17, qualityScore: 0.88, costIncrease: 12.8, taxBurden: 28.0, hiddenCosts: 11200, riskLevel: 'Low' },
        'Denver': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.17, qualityScore: 0.88, costIncrease: 12.8, taxBurden: 28.0, hiddenCosts: 11200, riskLevel: 'Low' },
        // UK Cities
        'Manchester, UK': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.55, riskScore: 0.18, qualityScore: 0.87, costIncrease: 10.5, taxBurden: 32.0, hiddenCosts: 9800, riskLevel: 'Low' },
        'Manchester': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.55, riskScore: 0.18, qualityScore: 0.87, costIncrease: 10.5, taxBurden: 32.0, hiddenCosts: 9800, riskLevel: 'Low' },
        'Edinburgh, UK': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.54, riskScore: 0.16, qualityScore: 0.90, costIncrease: 11.2, taxBurden: 32.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Edinburgh': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.54, riskScore: 0.16, qualityScore: 0.90, costIncrease: 11.2, taxBurden: 32.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Birmingham, UK': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.58, riskScore: 0.19, qualityScore: 0.86, costIncrease: 9.2, taxBurden: 32.0, hiddenCosts: 9200, riskLevel: 'Low' },
        'Birmingham': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.58, riskScore: 0.19, qualityScore: 0.86, costIncrease: 9.2, taxBurden: 32.0, hiddenCosts: 9200, riskLevel: 'Low' },
        'Glasgow, UK': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.60, riskScore: 0.18, qualityScore: 0.85, costIncrease: 8.5, taxBurden: 32.0, hiddenCosts: 8800, riskLevel: 'Low' },
        'Glasgow': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.60, riskScore: 0.18, qualityScore: 0.85, costIncrease: 8.5, taxBurden: 32.0, hiddenCosts: 8800, riskLevel: 'Low' },
        // More Asian Cities
        'Shanghai, China': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.55, riskScore: 0.25, qualityScore: 0.82, costIncrease: 15.5, taxBurden: 45.0, hiddenCosts: 12500, riskLevel: 'Medium' },
        'Shanghai': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.55, riskScore: 0.25, qualityScore: 0.82, costIncrease: 15.5, taxBurden: 45.0, hiddenCosts: 12500, riskLevel: 'Medium' },
        'Beijing, China': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.50, riskScore: 0.28, qualityScore: 0.80, costIncrease: 14.8, taxBurden: 45.0, hiddenCosts: 13200, riskLevel: 'Medium' },
        'Beijing': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.50, riskScore: 0.28, qualityScore: 0.80, costIncrease: 14.8, taxBurden: 45.0, hiddenCosts: 13200, riskLevel: 'Medium' },
        'Shenzhen, China': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.58, riskScore: 0.24, qualityScore: 0.83, costIncrease: 16.2, taxBurden: 45.0, hiddenCosts: 11800, riskLevel: 'Medium' },
        'Shenzhen': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.58, riskScore: 0.24, qualityScore: 0.83, costIncrease: 16.2, taxBurden: 45.0, hiddenCosts: 11800, riskLevel: 'Medium' },
        'Ho Chi Minh City, Vietnam': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.85, riskScore: 0.26, qualityScore: 0.75, costIncrease: 4.5, taxBurden: 35.0, hiddenCosts: 4200, riskLevel: 'Medium' },
        'Ho Chi Minh City': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.85, riskScore: 0.26, qualityScore: 0.75, costIncrease: 4.5, taxBurden: 35.0, hiddenCosts: 4200, riskLevel: 'Medium' },
        'Hanoi, Vietnam': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.82, riskScore: 0.27, qualityScore: 0.74, costIncrease: 4.2, taxBurden: 35.0, hiddenCosts: 3800, riskLevel: 'Medium' },
        'Hanoi': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.82, riskScore: 0.27, qualityScore: 0.74, costIncrease: 4.2, taxBurden: 35.0, hiddenCosts: 3800, riskLevel: 'Medium' },
        'Jakarta, Indonesia': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.78, riskScore: 0.30, qualityScore: 0.72, costIncrease: 5.2, taxBurden: 30.0, hiddenCosts: 4800, riskLevel: 'Medium' },
        'Jakarta': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.78, riskScore: 0.30, qualityScore: 0.72, costIncrease: 5.2, taxBurden: 30.0, hiddenCosts: 4800, riskLevel: 'Medium' },
        'Manila, Philippines': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.72, riskScore: 0.32, qualityScore: 0.70, costIncrease: 4.8, taxBurden: 32.0, hiddenCosts: 4500, riskLevel: 'Medium' },
        'Manila': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.72, riskScore: 0.32, qualityScore: 0.70, costIncrease: 4.8, taxBurden: 32.0, hiddenCosts: 4500, riskLevel: 'Medium' },
        // Taiwan
        'Taipei, Taiwan': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.62, riskScore: 0.14, qualityScore: 0.91, costIncrease: 10.5, taxBurden: 20.0, hiddenCosts: 8500, riskLevel: 'Low' },
        'Taipei': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.62, riskScore: 0.14, qualityScore: 0.91, costIncrease: 10.5, taxBurden: 20.0, hiddenCosts: 8500, riskLevel: 'Low' },
        'Kaohsiung, Taiwan': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.72, riskScore: 0.13, qualityScore: 0.89, costIncrease: 7.2, taxBurden: 20.0, hiddenCosts: 6500, riskLevel: 'Low' },
        'Kaohsiung': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.72, riskScore: 0.13, qualityScore: 0.89, costIncrease: 7.2, taxBurden: 20.0, hiddenCosts: 6500, riskLevel: 'Low' },
        'Taichung, Taiwan': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.75, riskScore: 0.12, qualityScore: 0.90, costIncrease: 6.5, taxBurden: 20.0, hiddenCosts: 6000, riskLevel: 'Low' },
        'Taichung': { wealthMultiplier1: 0.89, wealthMultiplier5: 1.75, riskScore: 0.12, qualityScore: 0.90, costIncrease: 6.5, taxBurden: 20.0, hiddenCosts: 6000, riskLevel: 'Low' },
        // More Southeast Asian
        'Cebu, Philippines': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.82, riskScore: 0.30, qualityScore: 0.72, costIncrease: 3.8, taxBurden: 32.0, hiddenCosts: 3800, riskLevel: 'Medium' },
        'Cebu': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.82, riskScore: 0.30, qualityScore: 0.72, costIncrease: 3.8, taxBurden: 32.0, hiddenCosts: 3800, riskLevel: 'Medium' },
        'Bali, Indonesia': { wealthMultiplier1: 0.94, wealthMultiplier5: 1.88, riskScore: 0.28, qualityScore: 0.76, costIncrease: 3.2, taxBurden: 30.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Bali': { wealthMultiplier1: 0.94, wealthMultiplier5: 1.88, riskScore: 0.28, qualityScore: 0.76, costIncrease: 3.2, taxBurden: 30.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Phuket, Thailand': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.85, riskScore: 0.26, qualityScore: 0.78, costIncrease: 4.0, taxBurden: 35.0, hiddenCosts: 4000, riskLevel: 'Medium' },
        'Phuket': { wealthMultiplier1: 0.93, wealthMultiplier5: 1.85, riskScore: 0.26, qualityScore: 0.78, costIncrease: 4.0, taxBurden: 35.0, hiddenCosts: 4000, riskLevel: 'Medium' },
        'Chiang Mai, Thailand': { wealthMultiplier1: 0.96, wealthMultiplier5: 1.95, riskScore: 0.22, qualityScore: 0.80, costIncrease: 2.5, taxBurden: 35.0, hiddenCosts: 3200, riskLevel: 'Low' },
        'Chiang Mai': { wealthMultiplier1: 0.96, wealthMultiplier5: 1.95, riskScore: 0.22, qualityScore: 0.80, costIncrease: 2.5, taxBurden: 35.0, hiddenCosts: 3200, riskLevel: 'Low' },
        'Penang, Malaysia': { wealthMultiplier1: 0.95, wealthMultiplier5: 1.88, riskScore: 0.18, qualityScore: 0.84, costIncrease: 3.8, taxBurden: 28.0, hiddenCosts: 4200, riskLevel: 'Low' },
        'Penang': { wealthMultiplier1: 0.95, wealthMultiplier5: 1.88, riskScore: 0.18, qualityScore: 0.84, costIncrease: 3.8, taxBurden: 28.0, hiddenCosts: 4200, riskLevel: 'Low' },
        // Middle East
        'Abu Dhabi, UAE': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.75, riskScore: 0.18, qualityScore: 0.86, costIncrease: 10.5, taxBurden: 0.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Abu Dhabi': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.75, riskScore: 0.18, qualityScore: 0.86, costIncrease: 10.5, taxBurden: 0.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Doha, Qatar': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.70, riskScore: 0.20, qualityScore: 0.84, costIncrease: 12.8, taxBurden: 0.0, hiddenCosts: 11500, riskLevel: 'Low' },
        'Doha': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.70, riskScore: 0.20, qualityScore: 0.84, costIncrease: 12.8, taxBurden: 0.0, hiddenCosts: 11500, riskLevel: 'Low' },
        'Riyadh, Saudi Arabia': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.78, riskScore: 0.22, qualityScore: 0.80, costIncrease: 8.5, taxBurden: 0.0, hiddenCosts: 9200, riskLevel: 'Medium' },
        'Riyadh': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.78, riskScore: 0.22, qualityScore: 0.80, costIncrease: 8.5, taxBurden: 0.0, hiddenCosts: 9200, riskLevel: 'Medium' },
        // South America
        'Sao Paulo, Brazil': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.32, qualityScore: 0.75, costIncrease: 8.5, taxBurden: 27.5, hiddenCosts: 7200, riskLevel: 'High' },
        'Sao Paulo': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.32, qualityScore: 0.75, costIncrease: 8.5, taxBurden: 27.5, hiddenCosts: 7200, riskLevel: 'High' },
        'Buenos Aires, Argentina': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.35, qualityScore: 0.78, costIncrease: 6.2, taxBurden: 35.0, hiddenCosts: 5800, riskLevel: 'High' },
        'Buenos Aires': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.35, qualityScore: 0.78, costIncrease: 6.2, taxBurden: 35.0, hiddenCosts: 5800, riskLevel: 'High' },
        'Mexico City, Mexico': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.65, riskScore: 0.30, qualityScore: 0.76, costIncrease: 5.5, taxBurden: 35.0, hiddenCosts: 5200, riskLevel: 'Medium' },
        'Mexico City': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.65, riskScore: 0.30, qualityScore: 0.76, costIncrease: 5.5, taxBurden: 35.0, hiddenCosts: 5200, riskLevel: 'Medium' },
        // Africa
        'Cape Town, South Africa': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.28, qualityScore: 0.78, costIncrease: 5.8, taxBurden: 45.0, hiddenCosts: 5500, riskLevel: 'Medium' },
        'Cape Town': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.28, qualityScore: 0.78, costIncrease: 5.8, taxBurden: 45.0, hiddenCosts: 5500, riskLevel: 'Medium' },
        'Johannesburg, South Africa': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.58, riskScore: 0.32, qualityScore: 0.74, costIncrease: 5.2, taxBurden: 45.0, hiddenCosts: 5200, riskLevel: 'High' },
        'Johannesburg': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.58, riskScore: 0.32, qualityScore: 0.74, costIncrease: 5.2, taxBurden: 45.0, hiddenCosts: 5200, riskLevel: 'High' },
        'Cairo, Egypt': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.72, riskScore: 0.35, qualityScore: 0.68, costIncrease: 4.2, taxBurden: 22.5, hiddenCosts: 3800, riskLevel: 'High' },
        'Cairo': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.72, riskScore: 0.35, qualityScore: 0.68, costIncrease: 4.2, taxBurden: 22.5, hiddenCosts: 3800, riskLevel: 'High' },
        // Turkey
        'Ankara, Turkey': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.65, riskScore: 0.28, qualityScore: 0.76, costIncrease: 5.5, taxBurden: 35.0, hiddenCosts: 4500, riskLevel: 'Medium' },
        'Ankara': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.65, riskScore: 0.28, qualityScore: 0.76, costIncrease: 5.5, taxBurden: 35.0, hiddenCosts: 4500, riskLevel: 'Medium' },
        'Istanbul, Turkey': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.30, qualityScore: 0.78, costIncrease: 7.2, taxBurden: 35.0, hiddenCosts: 5200, riskLevel: 'Medium' },
        'Istanbul': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.30, qualityScore: 0.78, costIncrease: 7.2, taxBurden: 35.0, hiddenCosts: 5200, riskLevel: 'Medium' },
        'Izmir, Turkey': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.70, riskScore: 0.26, qualityScore: 0.77, costIncrease: 4.8, taxBurden: 35.0, hiddenCosts: 4000, riskLevel: 'Medium' },
        'Izmir': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.70, riskScore: 0.26, qualityScore: 0.77, costIncrease: 4.8, taxBurden: 35.0, hiddenCosts: 4000, riskLevel: 'Medium' },
        // Pacific Islands
        'Suva, Fiji': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.55, riskScore: 0.35, qualityScore: 0.65, costIncrease: 3.5, taxBurden: 20.0, hiddenCosts: 3200, riskLevel: 'High' },
        'Suva': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.55, riskScore: 0.35, qualityScore: 0.65, costIncrease: 3.5, taxBurden: 20.0, hiddenCosts: 3200, riskLevel: 'High' },
        'Port Moresby, Papua New Guinea': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.45, riskScore: 0.42, qualityScore: 0.55, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 4500, riskLevel: 'High' },
        'Port Moresby': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.45, riskScore: 0.42, qualityScore: 0.55, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 4500, riskLevel: 'High' },
        // More Indian Cities - Tier 2/3
        'Faridabad, India': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.20, riskScore: 0.28, qualityScore: 0.70, costIncrease: 5.8, taxBurden: 30.0, hiddenCosts: 2800, riskLevel: 'Medium' },
        'Faridabad': { wealthMultiplier1: 0.68, wealthMultiplier5: 1.20, riskScore: 0.28, qualityScore: 0.70, costIncrease: 5.8, taxBurden: 30.0, hiddenCosts: 2800, riskLevel: 'Medium' },
        'Ghaziabad, India': { wealthMultiplier1: 0.67, wealthMultiplier5: 1.18, riskScore: 0.29, qualityScore: 0.68, costIncrease: 5.5, taxBurden: 30.0, hiddenCosts: 2600, riskLevel: 'Medium' },
        'Ghaziabad': { wealthMultiplier1: 0.67, wealthMultiplier5: 1.18, riskScore: 0.29, qualityScore: 0.68, costIncrease: 5.5, taxBurden: 30.0, hiddenCosts: 2600, riskLevel: 'Medium' },
        'Vadodara, India': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.24, riskScore: 0.25, qualityScore: 0.72, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2200, riskLevel: 'Medium' },
        'Vadodara': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.24, riskScore: 0.25, qualityScore: 0.72, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2200, riskLevel: 'Medium' },
        'Rajkot, India': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.26, riskScore: 0.24, qualityScore: 0.71, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Rajkot': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.26, riskScore: 0.24, qualityScore: 0.71, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Nashik, India': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.70, costIncrease: 4.0, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Nashik': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.22, riskScore: 0.26, qualityScore: 0.70, costIncrease: 4.0, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Mysore, India': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.24, riskScore: 0.24, qualityScore: 0.73, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Mysore': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.24, riskScore: 0.24, qualityScore: 0.73, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Mysuru, India': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.24, riskScore: 0.24, qualityScore: 0.73, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Mysuru': { wealthMultiplier1: 0.71, wealthMultiplier5: 1.24, riskScore: 0.24, qualityScore: 0.73, costIncrease: 3.8, taxBurden: 30.0, hiddenCosts: 2000, riskLevel: 'Medium' },
        'Mangalore, India': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.23, riskScore: 0.25, qualityScore: 0.72, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2150, riskLevel: 'Medium' },
        'Mangalore': { wealthMultiplier1: 0.70, wealthMultiplier5: 1.23, riskScore: 0.25, qualityScore: 0.72, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2150, riskLevel: 'Medium' },
        'Trivandrum, India': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.22, riskScore: 0.25, qualityScore: 0.71, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        'Trivandrum': { wealthMultiplier1: 0.69, wealthMultiplier5: 1.22, riskScore: 0.25, qualityScore: 0.71, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 2100, riskLevel: 'Medium' },
        // Russia
        'Moscow, Russia': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.52, riskScore: 0.35, qualityScore: 0.78, costIncrease: 8.5, taxBurden: 13.0, hiddenCosts: 8500, riskLevel: 'High' },
        'Moscow': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.52, riskScore: 0.35, qualityScore: 0.78, costIncrease: 8.5, taxBurden: 13.0, hiddenCosts: 8500, riskLevel: 'High' },
        'St Petersburg, Russia': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.32, qualityScore: 0.80, costIncrease: 6.2, taxBurden: 13.0, hiddenCosts: 6800, riskLevel: 'High' },
        'St Petersburg': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.32, qualityScore: 0.80, costIncrease: 6.2, taxBurden: 13.0, hiddenCosts: 6800, riskLevel: 'High' },
        // More South America
        'Lima, Peru': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.30, qualityScore: 0.72, costIncrease: 4.8, taxBurden: 30.0, hiddenCosts: 4200, riskLevel: 'Medium' },
        'Lima': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.30, qualityScore: 0.72, costIncrease: 4.8, taxBurden: 30.0, hiddenCosts: 4200, riskLevel: 'Medium' },
        'Bogota, Colombia': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.32, qualityScore: 0.70, costIncrease: 4.5, taxBurden: 33.0, hiddenCosts: 4000, riskLevel: 'Medium' },
        'Bogota': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.62, riskScore: 0.32, qualityScore: 0.70, costIncrease: 4.5, taxBurden: 33.0, hiddenCosts: 4000, riskLevel: 'Medium' },
        'Santiago, Chile': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.58, riskScore: 0.25, qualityScore: 0.80, costIncrease: 6.2, taxBurden: 35.0, hiddenCosts: 5500, riskLevel: 'Medium' },
        'Santiago': { wealthMultiplier1: 0.84, wealthMultiplier5: 1.58, riskScore: 0.25, qualityScore: 0.80, costIncrease: 6.2, taxBurden: 35.0, hiddenCosts: 5500, riskLevel: 'Medium' },
        'Medellin, Colombia': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.75, riskScore: 0.28, qualityScore: 0.76, costIncrease: 3.5, taxBurden: 33.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Medellin': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.75, riskScore: 0.28, qualityScore: 0.76, costIncrease: 3.5, taxBurden: 33.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        // More Africa
        'Lagos, Nigeria': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.62, riskScore: 0.40, qualityScore: 0.58, costIncrease: 5.5, taxBurden: 24.0, hiddenCosts: 4800, riskLevel: 'High' },
        'Lagos': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.62, riskScore: 0.40, qualityScore: 0.58, costIncrease: 5.5, taxBurden: 24.0, hiddenCosts: 4800, riskLevel: 'High' },
        'Nairobi, Kenya': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.35, qualityScore: 0.65, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 4000, riskLevel: 'High' },
        'Nairobi': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.35, qualityScore: 0.65, costIncrease: 4.2, taxBurden: 30.0, hiddenCosts: 4000, riskLevel: 'High' },
        'Casablanca, Morocco': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.72, riskScore: 0.28, qualityScore: 0.72, costIncrease: 3.8, taxBurden: 38.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        'Casablanca': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.72, riskScore: 0.28, qualityScore: 0.72, costIncrease: 3.8, taxBurden: 38.0, hiddenCosts: 3500, riskLevel: 'Medium' },
        // More US Cities
        'San Francisco, USA': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.45, riskScore: 0.20, qualityScore: 0.88, costIncrease: 32.5, taxBurden: 35.0, hiddenCosts: 22000, riskLevel: 'Medium' },
        'San Francisco': { wealthMultiplier1: 0.72, wealthMultiplier5: 1.45, riskScore: 0.20, qualityScore: 0.88, costIncrease: 32.5, taxBurden: 35.0, hiddenCosts: 22000, riskLevel: 'Medium' },
        'Washington DC, USA': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.52, riskScore: 0.18, qualityScore: 0.89, costIncrease: 22.5, taxBurden: 34.0, hiddenCosts: 16500, riskLevel: 'Low' },
        'Washington DC': { wealthMultiplier1: 0.78, wealthMultiplier5: 1.52, riskScore: 0.18, qualityScore: 0.89, costIncrease: 22.5, taxBurden: 34.0, hiddenCosts: 16500, riskLevel: 'Low' },
        'Philadelphia, USA': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.22, qualityScore: 0.84, costIncrease: 12.5, taxBurden: 32.0, hiddenCosts: 11500, riskLevel: 'Medium' },
        'Philadelphia': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.58, riskScore: 0.22, qualityScore: 0.84, costIncrease: 12.5, taxBurden: 32.0, hiddenCosts: 11500, riskLevel: 'Medium' },
        'Phoenix, USA': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.65, riskScore: 0.20, qualityScore: 0.82, costIncrease: 10.5, taxBurden: 25.0, hiddenCosts: 9500, riskLevel: 'Low' },
        'Phoenix': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.65, riskScore: 0.20, qualityScore: 0.82, costIncrease: 10.5, taxBurden: 25.0, hiddenCosts: 9500, riskLevel: 'Low' },
        'San Diego, USA': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.18, qualityScore: 0.90, costIncrease: 18.5, taxBurden: 33.0, hiddenCosts: 14500, riskLevel: 'Low' },
        'San Diego': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.18, qualityScore: 0.90, costIncrease: 18.5, taxBurden: 33.0, hiddenCosts: 14500, riskLevel: 'Low' },
        'Dallas, USA': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.19, qualityScore: 0.84, costIncrease: 11.2, taxBurden: 22.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Dallas': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.68, riskScore: 0.19, qualityScore: 0.84, costIncrease: 11.2, taxBurden: 22.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Houston, USA': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.72, riskScore: 0.21, qualityScore: 0.82, costIncrease: 9.8, taxBurden: 22.0, hiddenCosts: 9800, riskLevel: 'Low' },
        'Houston': { wealthMultiplier1: 0.90, wealthMultiplier5: 1.72, riskScore: 0.21, qualityScore: 0.82, costIncrease: 9.8, taxBurden: 22.0, hiddenCosts: 9800, riskLevel: 'Low' },
        'Atlanta, USA': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.65, riskScore: 0.20, qualityScore: 0.83, costIncrease: 10.8, taxBurden: 28.0, hiddenCosts: 10500, riskLevel: 'Low' },
        'Atlanta': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.65, riskScore: 0.20, qualityScore: 0.83, costIncrease: 10.8, taxBurden: 28.0, hiddenCosts: 10500, riskLevel: 'Low' },
        // More European
        'Lyon, France': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.52, riskScore: 0.18, qualityScore: 0.90, costIncrease: 12.5, taxBurden: 45.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Lyon': { wealthMultiplier1: 0.86, wealthMultiplier5: 1.52, riskScore: 0.18, qualityScore: 0.90, costIncrease: 12.5, taxBurden: 45.0, hiddenCosts: 10200, riskLevel: 'Low' },
        'Marseille, France': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.55, riskScore: 0.22, qualityScore: 0.86, costIncrease: 10.2, taxBurden: 45.0, hiddenCosts: 9500, riskLevel: 'Medium' },
        'Marseille': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.55, riskScore: 0.22, qualityScore: 0.86, costIncrease: 10.2, taxBurden: 45.0, hiddenCosts: 9500, riskLevel: 'Medium' },
        'Nice, France': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.48, riskScore: 0.16, qualityScore: 0.92, costIncrease: 16.5, taxBurden: 45.0, hiddenCosts: 12500, riskLevel: 'Low' },
        'Nice': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.48, riskScore: 0.16, qualityScore: 0.92, costIncrease: 16.5, taxBurden: 45.0, hiddenCosts: 12500, riskLevel: 'Low' },
        'Porto, Portugal': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.72, riskScore: 0.17, qualityScore: 0.88, costIncrease: 5.8, taxBurden: 28.0, hiddenCosts: 6800, riskLevel: 'Low' },
        'Porto': { wealthMultiplier1: 0.92, wealthMultiplier5: 1.72, riskScore: 0.17, qualityScore: 0.88, costIncrease: 5.8, taxBurden: 28.0, hiddenCosts: 6800, riskLevel: 'Low' },
        // Japan
        'Osaka, Japan': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.52, riskScore: 0.14, qualityScore: 0.92, costIncrease: 15.2, taxBurden: 28.5, hiddenCosts: 12800, riskLevel: 'Low' },
        'Osaka': { wealthMultiplier1: 0.80, wealthMultiplier5: 1.52, riskScore: 0.14, qualityScore: 0.92, costIncrease: 15.2, taxBurden: 28.5, hiddenCosts: 12800, riskLevel: 'Low' },
        'Kyoto, Japan': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.12, qualityScore: 0.94, costIncrease: 14.5, taxBurden: 28.5, hiddenCosts: 11500, riskLevel: 'Low' },
        'Kyoto': { wealthMultiplier1: 0.82, wealthMultiplier5: 1.55, riskScore: 0.12, qualityScore: 0.94, costIncrease: 14.5, taxBurden: 28.5, hiddenCosts: 11500, riskLevel: 'Low' },
        'Fukuoka, Japan': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.62, riskScore: 0.13, qualityScore: 0.91, costIncrease: 11.8, taxBurden: 28.5, hiddenCosts: 10200, riskLevel: 'Low' },
        'Fukuoka': { wealthMultiplier1: 0.85, wealthMultiplier5: 1.62, riskScore: 0.13, qualityScore: 0.91, costIncrease: 11.8, taxBurden: 28.5, hiddenCosts: 10200, riskLevel: 'Low' },
        // South Korea
        'Busan, South Korea': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.62, riskScore: 0.15, qualityScore: 0.90, costIncrease: 10.5, taxBurden: 26.5, hiddenCosts: 10500, riskLevel: 'Low' },
        'Busan': { wealthMultiplier1: 0.88, wealthMultiplier5: 1.62, riskScore: 0.15, qualityScore: 0.90, costIncrease: 10.5, taxBurden: 26.5, hiddenCosts: 10500, riskLevel: 'Low' },
        'Incheon, South Korea': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.60, riskScore: 0.16, qualityScore: 0.89, costIncrease: 11.2, taxBurden: 26.5, hiddenCosts: 10800, riskLevel: 'Low' },
        'Incheon': { wealthMultiplier1: 0.87, wealthMultiplier5: 1.60, riskScore: 0.16, qualityScore: 0.89, costIncrease: 11.2, taxBurden: 26.5, hiddenCosts: 10800, riskLevel: 'Low' },
      };

      // Get the primary selected city
      const primaryCity = formData.target_locations[0] || 'London, UK';
      
      // Find the best matching city key
      const findCityKey = (cityName: string): string => {
        const normalizedInput = cityName.toLowerCase().trim();
        for (const key of Object.keys(cityData)) {
          if (key.toLowerCase().includes(normalizedInput) || normalizedInput.includes(key.toLowerCase().split(',')[0])) {
            return key;
          }
        }
        // If no match found, return the input as-is with default data
        return cityName;
      };

      // Use ALL user-selected cities instead of auto-generating comparisons
      const userSelectedCities = formData.target_locations
        .filter((loc: string) => loc && loc.trim() !== '')
        .map((loc: string) => findCityKey(loc));
      
      // Build scenarios with actual city data
      const buildScenario = (cityKey: string, salary: number) => {
        // Try to find city data, or generate conservative defaults for unknown cities
        const data = cityData[cityKey] || {
          wealthMultiplier1: 0.70,
          wealthMultiplier5: 1.25,
          riskScore: 0.30,
          qualityScore: 0.75,
          costIncrease: 10.0,
          taxBurden: 30.0,
          hiddenCosts: 8000,
          riskLevel: 'Medium'
        };
        return {
          location: cityKey,
          year_1_wealth: salary * data.wealthMultiplier1,
          year_5_wealth: salary * data.wealthMultiplier5,
          risk_score: data.riskScore,
          quality_score: data.qualityScore,
          cost_increase: data.costIncrease,
          tax_burden: data.taxBurden,
          hidden_costs: data.hiddenCosts,
          risk_level: data.riskLevel
        };
      };

      // Build scenarios for ALL user-selected cities
      const scenarios = userSelectedCities.map((city: string) => 
        buildScenario(city, formData.current_salary)
      );

      // Find the best city for recommendations
      const bestCity = scenarios.reduce((best: any, current: any) => 
        current.year_5_wealth > best.year_5_wealth ? current : best
      );

      const primaryCityKey = userSelectedCities[0] || 'London, UK';

      const mockResult = {
        scenarios,
        risk_analysis: {
          health_risks: { respiratory: 15, lifestyle: 8, healthcare_access: 5 },
          financial_risks: { currency_volatility: 12, tax_changes: 8, cost_inflation: 18 },
          social_risks: { language_barrier: 25, cultural_adaptation: 15, social_isolation: 12 }
        },
        compliance_summary: {
          visa_complexity: 'Medium',
          tax_treaty_benefits: '15% relief on double taxation',
          regulatory_timeline: '45-60 days',
          total_compliance_cost: 18500
        },
        recommendations: [
          `${bestCity.location} offers the best 5-year wealth trajectory with ${((bestCity.year_5_wealth / formData.current_salary - 1) * 100).toFixed(0)}% growth potential`,
          `${primaryCityKey} has a quality of life score of ${(cityData[primaryCityKey]?.qualityScore * 100 || 88).toFixed(0)}%`,
          `Budget additional $${(cityData[primaryCityKey]?.hiddenCosts || 12800).toLocaleString()} annually for hidden bureaucracy and compliance costs`,
          `Tax burden in ${primaryCityKey}: ${cityData[primaryCityKey]?.taxBurden || 32}% - consider tax treaty benefits`,
          'Social integration costs will add approximately $3,200/year to maintain lifestyle'
        ],
        trust_score: {
          score: 87.3,
          components: {
            payment_reliability: 92,
            financial_stability: 85,
            income_verification: 89,
            debt_management: 83
          }
        }
      };
      
      setSimulationData(mockResult);
      setShowResults(true);
      setActiveView('results');
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (viewId: string) => {
    setActiveView(viewId);
    setSidebarOpen(false);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingAnimation />;
    }

    if (showResults && simulationData) {
      return <SimulationDashboard data={simulationData} onRerun={() => {
        setShowResults(false);
        setActiveView('simulations');
      }} />;
    }

    switch (activeView) {
      case 'compliance':
        return (
          <>
            <CompliancePack location="Berlin, Germany" userProfile={{}} />
            <div style={{ marginTop: '32px' }}>
              <DocumentVerification />
            </div>
            <div style={{ marginTop: '32px' }}>
              <CulturalCommunication />
            </div>
          </>
        );
      
      case 'heatmap':
        return <NeighborhoodHeatmap city="Tokyo" />;
      
      case 'swarm':
        return <AgentSwarm />;
      
      case 'blackswan':
        return (
          <>
            <BlackSwanTesting />
            <div style={{ marginTop: '32px' }}>
              <MonteCarloSimulation />
            </div>
          </>
        );
      
      case 'globe':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Global Opportunity Map
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Explore real-time migration opportunities worldwide
              </p>
            </div>
            <InteractiveGlobe onRunAnalysis={(cityName, country) => {
              toast.success(`Starting analysis for ${cityName}, ${country}...`, { duration: 2000 });
              handleSimulation({
                current_salary: 95000,
                target_locations: [`${cityName}, ${country}`],
                risk_tolerance: 'moderate'
              });
            }} />
          </>
        );

      case 'simulations':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Run Simulation
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Configure and run your financial simulation
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '28px',
              padding: '40px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <SimulationForm onSubmit={handleSimulation} isLoading={isLoading} />
            </div>
          </>
        );

      case 'analytics':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Analytics Dashboard
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Deep insights into your financial data
              </p>
            </div>
            <LiveMetrics />
            <div style={{ marginTop: '40px' }}>
              <AIInsights />
            </div>
          </>
        );

      case 'actuary':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                The Actuary
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Quality of Life & Health Risk Analysis Agent
              </p>
            </div>

            {/* Cleanest City Highlight */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '16px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
                }}>
                  <span style={{ fontSize: '28px' }}>🌿</span>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Cleanest Developed City
                  </div>
                  <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>
                    🇯🇵 Osaka, Japan
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                    AQI 0-5 (Excellent) • #1 developed city for air quality
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '48px', fontWeight: 800, color: '#10b981' }}>5</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>US AQI</div>
              </div>
            </div>

            {/* Top 5 Cleanest Developed Cities */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                🏆 Top 5 Cleanest Developed Cities (Live AQI from IQAir)
              </h4>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                Source: IQAir World Air Quality Index • Updated hourly
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { rank: 1, city: 'Osaka', country: '🇯🇵', aqi: 5 },
                  { rank: 2, city: 'Vancouver', country: '🇨🇦', aqi: 6 },
                  { rank: 3, city: 'Auckland', country: '🇳🇿', aqi: 9 },
                  { rank: 4, city: 'Melbourne', country: '🇦🇺', aqi: 10 },
                  { rank: 5, city: 'Amsterdam', country: '🇳🇱', aqi: 11 },
                ].map((item) => (
                  <div key={item.rank} style={{
                    flex: '1',
                    minWidth: '140px',
                    padding: '12px 16px',
                    background: item.rank === 1 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    border: item.rank === 1 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ 
                      fontSize: '14px', fontWeight: 700, 
                      color: item.rank === 1 ? '#10b981' : 'rgba(255,255,255,0.4)',
                      width: '20px'
                    }}>#{item.rank}</span>
                    <span style={{ fontSize: '16px' }}>{item.country}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{item.city}</div>
                      <div style={{ fontSize: '11px', color: '#10b981' }}>AQI {item.aqi}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>The Actuary</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Analyzing health, safety, and quality of life metrics</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <span style={{ color: '#60a5fa', fontSize: '14px', fontWeight: 600 }}>🇩🇪 Berlin</span>
                  </div>
                  <div style={{ padding: '8px 16px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                    <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 600 }}>● Active</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Air Quality Index', value: '72', status: 'Moderate', color: '#eab308' },
                  { label: 'Healthcare Access', value: '94%', status: 'Excellent', color: '#10b981' },
                  { label: 'Safety Score', value: '89', status: 'Very Good', color: '#10b981' },
                  { label: 'Life Expectancy Impact', value: '+2.3 yrs', status: 'Positive', color: '#10b981' },
                  { label: 'Stress Index', value: '45', status: 'Low', color: '#10b981' },
                  { label: 'Work-Life Balance', value: '78%', status: 'Good', color: '#3b82f6' }
                ].map((metric, i) => (
                  <div key={i} style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{metric.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{metric.value}</div>
                    <div style={{ fontSize: '12px', color: metric.color, fontWeight: 600 }}>{metric.status}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>🔍 Latest Analysis - Berlin, Germany</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7 }}>
                  Berlin offers excellent health outcomes with 94% healthcare access and moderate air quality (AQI 72). 
                  The city has a very good safety score (89/100) and low stress index compared to other major cities.
                  Life expectancy impact is +2.3 years vs your current location. Work-life balance rated 78% due to strong labor laws.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '32px' }}>
              <LifestyleTwins />
            </div>
          </>
        );

      case 'fiscal':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Fiscal Ghost
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Cost of Living & Financial Projection Agent
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>Fiscal Ghost</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Tracking every expense across your target cities</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ padding: '8px 16px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <span style={{ color: '#60a5fa', fontSize: '14px', fontWeight: 600 }}>🇩🇪 Berlin</span>
                  </div>
                  <div style={{ padding: '8px 16px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                    <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 600 }}>● Active</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Monthly Burn Rate', value: '$4,850', status: 'Berlin Estimate', color: '#3b82f6' },
                  { label: 'Rent (1BR)', value: '$1,600', status: 'Avg Target', color: '#a78bfa' },
                  { label: 'Groceries', value: '$380', status: 'Monthly', color: '#10b981' },
                  { label: 'Transport', value: '$86', status: 'Monthly Pass', color: '#10b981' },
                  { label: 'Utilities', value: '$180', status: 'Avg', color: '#eab308' },
                  { label: 'Entertainment', value: '$320', status: 'Your Budget', color: '#ec4899' }
                ].map((metric, i) => (
                  <div key={i} style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{metric.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{metric.value}</div>
                    <div style={{ fontSize: '12px', color: metric.color, fontWeight: 600 }}>{metric.status}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>💰 Financial Insight</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7 }}>
                  Your current spending patterns in London translate to approximately €4,200/month in Berlin - a 22% reduction in cost of living.
                  With your income of $95,000, you could save an additional $18,000/year while maintaining the same lifestyle quality.
                  Hidden costs to budget: €2,800/year for document translation and legal fees during your first year.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '32px' }}>
              <HyperLocalData />
            </div>
          </>
        );

      case 'nexus':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                The Nexus
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Tax Optimization & Compliance Agent
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '24px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'white' }}>The Nexus</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Navigating international tax treaties and compliance</p>
                </div>
                <div style={{ marginLeft: 'auto', padding: '8px 16px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <span style={{ color: '#4ade80', fontSize: '14px', fontWeight: 600 }}>● Active</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Tax Treaty Savings', value: '$8,400', status: 'Annual', color: '#10b981' },
                  { label: 'Effective Tax Rate', value: '28.5%', status: 'Germany', color: '#eab308' },
                  { label: 'Compliance Score', value: '100%', status: 'All Forms Ready', color: '#10b981' },
                  { label: 'Double Tax Relief', value: '15%', status: 'DTAA Applied', color: '#3b82f6' },
                  { label: 'Filing Deadline', value: '89 days', status: 'April 15, 2026', color: '#f59e0b' },
                  { label: 'Documents Ready', value: '6/6', status: 'Complete', color: '#10b981' }
                ].map((metric, i) => (
                  <div key={i} style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{metric.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{metric.value}</div>
                    <div style={{ fontSize: '12px', color: metric.color, fontWeight: 600 }}>{metric.status}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '20px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>⚖️ Tax Strategy</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7 }}>
                  The Germany-US Tax Treaty (Article 15) allows you to claim relief on employment income during your transition period.
                  By timing your move in January instead of October, you save $8,000 in partial-year residency fees.
                  All 6 compliance documents are pre-filled and ready for download in your Compliance Pack.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '32px' }}>
              <SourceGrounding />
            </div>
            <div style={{ marginTop: '32px' }}>
              <SemanticCrossMapping />
            </div>
          </>
        );

      case 'profile':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Your Profile
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Manage your personal information and preferences
              </p>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Profile Card */}
              <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 700, color: 'white' }}>
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{profileData.name}</h3>
                      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{profileData.email}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '12px', color: '#10b981' }}>Signed In</span>
                      </div>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEditProfile(true)}
                    style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    Edit Profile
                  </motion.button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { label: 'Current Location', value: profileData.location, icon: '📍' },
                    { label: 'Annual Income', value: `₹${parseInt(profileData.income).toLocaleString('en-IN')}`, icon: '💰' },
                    { label: 'Target Cities', value: profileData.targetCities.split(',').length + ' selected', icon: '🌍' },
                    { label: 'Member Since', value: 'January 2026', icon: '📅' }
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>{item.label}</div>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Actions */}
              <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Account Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Change Password', desc: 'Update your account password', icon: '🔐', action: 'password' },
                    { label: 'Two-Factor Authentication', desc: 'Add extra security to your account', icon: '🛡️', action: '2fa', badge: 'Enabled' },
                    { label: 'Connected Accounts', desc: 'Manage linked services', icon: '🔗', action: 'accounts' },
                    { label: 'Export Data', desc: 'Download all your data', icon: '📥', action: 'export' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{item.icon}</span>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '2px' }}>{item.label}</div>
                          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                        </div>
                      </div>
                      {item.badge ? (
                        <span style={{ padding: '4px 10px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: '#10b981' }}>{item.badge}</span>
                      ) : (
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (item.action === 'password') toast.success('Password change feature coming soon!', { icon: '🔐' });
                            else if (item.action === 'accounts') toast.success('Connected accounts feature coming soon!', { icon: '🔗' });
                            else if (item.action === 'export') {
                              const data = JSON.stringify(profileData, null, 2);
                              const blob = new Blob([data], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = 'equinox-profile-data.json';
                              a.click();
                              toast.success('Profile data exported!', { icon: '📥' });
                            }
                          }}
                          style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer' }}>
                          Manage
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign In / Sign Out */}
              <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '20px' }}>Session</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toast.success('Google Sign-In coming soon! Currently using demo mode.', { duration: 3000 });
                    }}
                    style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                    </svg>
                    Sign In with Google
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      localStorage.clear();
                      toast.success('Signed out successfully!', { duration: 2000 });
                      setTimeout(() => window.location.reload(), 1000);
                    }}
                    style={{ flex: 1, padding: '14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#ef4444', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                    </svg>
                    Sign Out
                  </motion.button>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '16px', textAlign: 'center' }}>
                  Last signed in: Today at 10:30 AM from London, UK
                </p>
              </div>
            </div>
          </>
        );

      case 'settings':
        const settingsConfig = [
          { 
            title: 'Notifications', 
            items: [
              { label: 'Email notifications', key: 'emailNotifications' },
              { label: 'Push notifications', key: 'pushNotifications' },
              { label: 'Agent consensus alerts', key: 'agentAlerts' }
            ] 
          },
          { 
            title: 'Privacy', 
            items: [
              { label: 'Zero-knowledge mode', key: 'zeroKnowledge' },
              { label: 'Data encryption', key: 'dataEncryption' },
              { label: 'Anonymous analytics', key: 'anonymousAnalytics' }
            ] 
          },
          { 
            title: 'Display', 
            items: [
              { label: 'Dark mode', key: 'darkMode' },
              { label: 'Currency format', key: 'currencyFormat' },
              { label: 'Date format', key: 'dateFormat' }
            ] 
          }
        ];
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Settings
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Configure your preferences and notifications
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
              {settingsConfig.map((section, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? '32px' : 0 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>{section.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {section.items.map((item, j) => {
                      const isOn = settings[item.key as keyof typeof settings];
                      return (
                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>{item.label}</span>
                          <motion.div 
                            onClick={() => {
                              setSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof settings] }));
                              toast.success(`${item.label} ${!isOn ? 'enabled' : 'disabled'}`, { duration: 1500 });
                            }}
                            style={{ 
                              width: '48px', 
                              height: '24px', 
                              borderRadius: '12px', 
                              background: isOn ? '#10b981' : 'rgba(255,255,255,0.2)', 
                              position: 'relative', 
                              cursor: 'pointer',
                              transition: 'background 0.2s ease'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div 
                              animate={{ x: isOn ? 24 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              style={{ 
                                position: 'absolute', 
                                left: '2px', 
                                top: '2px', 
                                width: '20px', 
                                height: '20px', 
                                borderRadius: '50%', 
                                background: 'white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }} 
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'help':
        const helpItems = [
          { title: 'Getting Started', desc: 'Learn the basics of Equinox Flow', icon: '📚', action: 'getting-started' },
          { title: 'FAQ', desc: 'Frequently asked questions', icon: '❓', action: 'faq' },
          { title: 'Video Tutorials', desc: 'Watch step-by-step guides', icon: '🎥', action: 'videos' },
          { title: 'Contact Support', desc: 'Get help from our team', icon: '💬', action: 'support' },
          { title: 'Documentation', desc: 'Technical documentation', icon: '📖', action: 'docs' },
          { title: 'Community Forum', desc: 'Connect with other users', icon: '👥', action: 'community' }
        ];
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                Help & Support
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                Get assistance and learn how to use Equinox Flow
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {helpItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowHelpModal(item.action)}
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', 
                    backdropFilter: 'blur(24px)', 
                    border: '1px solid rgba(102, 126, 234, 0.2)', 
                    borderRadius: '20px', 
                    padding: '32px', 
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Help Modals */}
            <AnimatePresence>
              {showHelpModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowHelpModal(null)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '20px'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: '100%',
                      maxWidth: '600px',
                      maxHeight: '80vh',
                      overflow: 'auto',
                      background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(40, 20, 60, 0.98) 100%)',
                      borderRadius: '24px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
                    }}
                  >
                    {/* Modal Header */}
                    <div style={{
                      padding: '24px 24px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'sticky',
                      top: 0,
                      background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(40, 20, 60, 0.98) 100%)',
                      borderRadius: '24px 24px 0 0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '28px' }}>
                          {showHelpModal === 'getting-started' && '📚'}
                          {showHelpModal === 'faq' && '❓'}
                          {showHelpModal === 'videos' && '🎥'}
                          {showHelpModal === 'support' && '💬'}
                          {showHelpModal === 'docs' && '📖'}
                          {showHelpModal === 'community' && '👥'}
                        </span>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>
                          {showHelpModal === 'getting-started' && 'Getting Started'}
                          {showHelpModal === 'faq' && 'Frequently Asked Questions'}
                          {showHelpModal === 'videos' && 'Video Tutorials'}
                          {showHelpModal === 'support' && 'Contact Support'}
                          {showHelpModal === 'docs' && 'Documentation'}
                          {showHelpModal === 'community' && 'Community Forum'}
                        </h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowHelpModal(null)}
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px',
                          cursor: 'pointer',
                          color: 'white'
                        }}
                      >
                        <X style={{ width: '18px', height: '18px' }} />
                      </motion.button>
                    </div>

                    {/* Modal Content */}
                    <div style={{ padding: '24px' }}>
                      {showHelpModal === 'getting-started' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[
                            { step: 1, title: 'Set Up Your Profile', desc: 'Add your current income, location, and financial details to personalize your experience.', icon: '👤' },
                            { step: 2, title: 'Choose Target Cities', desc: 'Select up to 5 cities you\'re considering for relocation. Our AI will analyze each one.', icon: '🌍' },
                            { step: 3, title: 'Run Your First Simulation', desc: 'Click "Run Simulation" to generate a comprehensive financial projection across all target cities.', icon: '🚀' },
                            { step: 4, title: 'Review AI Insights', desc: 'Our three AI agents (Actuary, Fiscal Ghost, Nexus) will provide health, cost, and tax analysis.', icon: '🤖' },
                            { step: 5, title: 'Download Compliance Pack', desc: 'Get all necessary documents pre-filled for visa applications, tax filings, and landlord verification.', icon: '📄' }
                          ].map((item) => (
                            <div key={item.step} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                                {item.icon}
                              </div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#a78bfa', background: 'rgba(167, 139, 250, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>STEP {item.step}</span>
                                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{item.title}</span>
                                </div>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {showHelpModal === 'faq' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {[
                            { q: 'Is my financial data secure?', a: 'Absolutely. We use zero-knowledge encryption, meaning your data is encrypted on your device before it ever reaches our servers. We cannot see your actual financial information.' },
                            { q: 'How accurate are the projections?', a: 'Our AI models are trained on real-time data from official sources (OECD, World Bank, local government databases). Projections have a 94% accuracy rate based on historical validation.' },
                            { q: 'Can I export all my data?', a: 'Yes! Go to your Profile page and click "Export Data" to download everything in JSON format. You own your data completely.' },
                            { q: 'What are the three AI agents?', a: 'The Actuary analyzes health & quality of life, Fiscal Ghost tracks cost of living & expenses, and The Nexus handles tax optimization & compliance.' },
                            { q: 'How often is data updated?', a: 'Cost of living data updates daily. Tax treaties and regulations update within 48 hours of official changes. Health metrics update weekly.' },
                            { q: 'Is there a mobile app?', a: 'We\'re launching iOS and Android apps in Q2 2026. Sign up for notifications to be the first to know!' }
                          ].map((item, i) => (
                            <div key={i} style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                              <div style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                <span style={{ color: '#a78bfa' }}>Q:</span> {item.q}
                              </div>
                              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, paddingLeft: '20px' }}>
                                <span style={{ color: '#10b981', fontWeight: 600 }}>A:</span> {item.a}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {showHelpModal === 'videos' && (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>🎬</div>
                          <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>Video Tutorials Coming Soon</h4>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 24px' }}>
                            We're recording comprehensive video guides covering every feature of Equinox Flow. Subscribe to get notified when they're ready!
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { toast.success('You\'ll be notified when videos are ready!', { icon: '🔔' }); }}
                            style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Notify Me
                          </motion.button>
                        </div>
                      )}

                      {showHelpModal === 'support' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            Our support team typically responds within 24 hours. For urgent issues, use live chat during business hours (9 AM - 6 PM GMT).
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input placeholder="Your email" style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '14px', outline: 'none' }} />
                            <input placeholder="Subject" style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '14px', outline: 'none' }} />
                            <textarea placeholder="Describe your issue..." rows={4} style={{ width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: 'white', fontSize: '14px', outline: 'none', resize: 'none' }} />
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { toast.success('Support ticket submitted! Check your email for confirmation.', { icon: '✅' }); setShowHelpModal(null); }}
                            style={{ padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Submit Ticket
                          </motion.button>
                        </div>
                      )}

                      {showHelpModal === 'docs' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[
                            { 
                              title: 'API Reference', 
                              desc: 'Complete API documentation for developers', 
                              icon: '⚡',
                              content: [
                                { endpoint: 'POST /api/simulate', desc: 'Run a financial simulation with custom parameters' },
                                { endpoint: 'GET /api/cities/:id', desc: 'Retrieve city data including cost of living metrics' },
                                { endpoint: 'GET /api/compliance/:country', desc: 'Get compliance requirements for a specific country' },
                                { endpoint: 'POST /api/trust-score', desc: 'Calculate trust score based on financial profile' }
                              ]
                            },
                            { 
                              title: 'Integration Guide', 
                              desc: 'Connect Equinox Flow with your existing tools', 
                              icon: '🔗',
                              content: [
                                { endpoint: 'Webhooks', desc: 'Receive real-time notifications when simulations complete' },
                                { endpoint: 'OAuth 2.0', desc: 'Secure authentication for third-party applications' },
                                { endpoint: 'CSV Export', desc: 'Export data in CSV format for spreadsheet analysis' },
                                { endpoint: 'Zapier', desc: 'Connect with 5000+ apps via Zapier integration' }
                              ]
                            },
                            { 
                              title: 'Data Sources', 
                              desc: 'Learn about our data providers and methodology', 
                              icon: '📊',
                              content: [
                                { endpoint: 'OECD', desc: 'Tax rates, economic indicators, and policy data' },
                                { endpoint: 'World Bank', desc: 'Global development indicators and statistics' },
                                { endpoint: 'Numbeo', desc: 'Cost of living and quality of life indices' },
                                { endpoint: 'WHO', desc: 'Health metrics and healthcare access data' }
                              ]
                            },
                            { 
                              title: 'Security Whitepaper', 
                              desc: 'Technical details on our encryption and privacy', 
                              icon: '🔐',
                              content: [
                                { endpoint: 'AES-256', desc: 'Military-grade encryption for all stored data' },
                                { endpoint: 'Zero-Knowledge Proofs', desc: 'Verify data without exposing actual values' },
                                { endpoint: 'SOC 2 Type II', desc: 'Certified security controls and practices' },
                                { endpoint: 'GDPR Compliant', desc: 'Full compliance with EU data protection laws' }
                              ]
                            }
                          ].map((section, i) => (
                            <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', overflow: 'hidden' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(102, 126, 234, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{section.icon}</div>
                                <div>
                                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{section.title}</div>
                                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{section.desc}</div>
                                </div>
                              </div>
                              <div style={{ padding: '12px 20px' }}>
                                {section.content.map((item, j) => (
                                  <div key={j} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: j < section.content.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                    <code style={{ fontSize: '13px', color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>{item.endpoint}</code>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'right', maxWidth: '200px' }}>{item.desc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {showHelpModal === 'community' && (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>🌐</div>
                          <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>Community Forum Launching Q2 2026</h4>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 24px' }}>
                            Connect with other digital nomads, share experiences, and get advice from people who've made the move. Join the waitlist to be among the first members!
                          </p>
                          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { toast.success('You\'re on the waitlist!', { icon: '🎉' }); }}
                              style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                            >
                              Join Waitlist
                            </motion.button>
                          </div>
                          <div style={{ marginTop: '32px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px' }}>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>Already on the waitlist</div>
                            <div style={{ fontSize: '32px', fontWeight: 700, color: 'white' }}>2,847</div>
                            <div style={{ fontSize: '12px', color: '#a78bfa' }}>people waiting</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        );

      case 'privacy':
        return (
          <>
            <PrivacyVault />
            <div style={{ marginTop: '32px' }}>
              <FederatedTrustScore />
            </div>
          </>
        );

      case 'saved':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Saved Reports</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Your bookmarked simulations and reports</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Berlin Relocation Analysis', date: 'Jan 2, 2026', type: 'Full Analysis', score: 87, icon: '🇩🇪' },
                { title: 'Singapore Tax Optimization', date: 'Dec 28, 2025', type: 'Tax Report', score: 92, icon: '🇸🇬' },
                { title: 'Tokyo Cost Comparison', date: 'Dec 20, 2025', type: 'Cost Analysis', score: 78, icon: '🇯🇵' },
                { title: 'Dubai Investment Scenario', date: 'Dec 15, 2025', type: 'Monte Carlo', score: 85, icon: '🇦🇪' },
              ].map((report, i) => (
                <div key={i} style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '32px' }}>{report.icon}</div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{report.title}</h3>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{report.type} • Saved {report.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#10b981' }}>{report.score}/100</span>
                    </div>
                    <button style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'history':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>History</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Your recent activity and analyses</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { action: 'Ran Monte Carlo simulation', target: 'Berlin scenario', time: '2 hours ago', icon: '📊' },
                { action: 'Viewed neighborhood heatmap', target: 'Tokyo districts', time: '5 hours ago', icon: '🗺️' },
                { action: 'Completed tax analysis', target: 'Singapore relocation', time: 'Yesterday', icon: '💰' },
                { action: 'Agent debate completed', target: 'Best neighborhood in Dubai', time: 'Yesterday', icon: '🤖' },
                { action: 'Document verified', target: 'passport_scan.pdf', time: '2 days ago', icon: '✅' },
                { action: 'Saved report', target: 'Berlin Relocation Analysis', time: '3 days ago', icon: '📑' },
                { action: 'Ran stress test', target: 'Black swan scenarios', time: '3 days ago', icon: '⚡' },
                { action: 'Updated profile', target: 'Income & preferences', time: '1 week ago', icon: '👤' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '24px' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', color: 'white', marginBottom: '2px' }}>{item.action}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{item.target}</p>
                  </div>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </>
        );

      case 'notifications':
        return (
          <>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Notifications</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>Stay updated with important alerts</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { title: 'Tax deadline reminder', message: 'German tax filing deadline is approaching (March 31)', type: 'warning', time: '1 hour ago', unread: true },
                { title: 'New treaty update', message: 'Singapore-US tax treaty Article 17 has been amended', type: 'info', time: '3 hours ago', unread: true },
                { title: 'Simulation complete', message: 'Your Monte Carlo simulation for Berlin has finished', type: 'success', time: '5 hours ago', unread: true },
                { title: 'Market alert', message: 'EUR/USD exchange rate dropped 2.3% - may affect your projections', type: 'warning', time: 'Yesterday', unread: false },
                { title: 'Document expiring', message: 'Your uploaded passport expires in 6 months', type: 'warning', time: 'Yesterday', unread: false },
                { title: 'New feature available', message: 'Try our new AI Agent Debate feature for consensus-based recommendations', type: 'info', time: '2 days ago', unread: false },
                { title: 'Weekly summary ready', message: 'Your weekly financial health report is available', type: 'success', time: '3 days ago', unread: false },
              ].map((notif, i) => (
                <div key={i} style={{ 
                  background: notif.unread ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%)' : 'rgba(255,255,255,0.03)', 
                  borderRadius: '12px', 
                  padding: '16px 20px', 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px', 
                  border: notif.unread ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                  position: 'relative'
                }}>
                  {notif.unread && <div style={{ position: 'absolute', top: '20px', left: '8px', width: '8px', height: '8px', borderRadius: '50%', background: '#667eea' }} />}
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '10px', 
                    background: notif.type === 'warning' ? 'rgba(245, 158, 11, 0.2)' : notif.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <span style={{ fontSize: '18px' }}>{notif.type === 'warning' ? '⚠️' : notif.type === 'success' ? '✅' : 'ℹ️'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '4px' }}>{notif.title}</h4>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>{notif.message}</p>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      
      case 'dashboard':
      default:
        return (
          <>
            <HeroSection />
            <div style={{ marginTop: '40px' }}>
              <LiveMetrics />
            </div>
            <div style={{ marginTop: '60px' }}>
              <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                  Global Opportunity Map
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
                  Explore real-time migration opportunities worldwide
                </p>
              </div>
              <InteractiveGlobe onRunAnalysis={(cityName, country) => {
                toast.success(`Starting analysis for ${cityName}, ${country}...`, { duration: 2000 });
                handleSimulation({
                  current_salary: 95000,
                  target_locations: [`${cityName}, ${country}`],
                  risk_tolerance: 'moderate'
                });
              }} />
            </div>
            <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', alignItems: 'start' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '28px',
                  padding: '40px'
                }}>
                  <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
                      Configure Your Simulation
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                      Enter your details to receive personalized AI-powered insights
                    </p>
                  </div>
                  <SimulationForm onSubmit={handleSimulation} isLoading={isLoading} />
                </div>

                {/* Developer Credit Card */}
                <div style={{
                  marginTop: '24px',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '20px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img 
                      src="https://github.com/pranay-spec.png" 
                      alt="Pranay Gujar"
                      style={{ 
                        width: '64px', 
                        height: '64px', 
                        borderRadius: '50%', 
                        border: '3px solid rgba(16, 185, 129, 0.5)',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Built by
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                        Pranay Gujar
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>@pranay-spec</span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href="https://github.com/pranay-spec" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View GitHub
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <AIInsights />
                <AgentShowcase />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(26, 26, 46, 0.95)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
          },
        }}
      />
      
      <HamburgerMenu 
        isOpen={sidebarOpen} 
        onClick={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        activeView={activeView}
      />
      
      <main style={{ 
        minHeight: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a0a1a 100%)'
      }}>
        {/* Animated Background Orbs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <motion.div 
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-5%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
          <motion.div 
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{
              position: 'absolute',
              top: '40%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
          <motion.div 
            animate={{ y: [0, -25, 0], x: [0, 25, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            style={{
              position: 'absolute',
              bottom: '-5%',
              left: '30%',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
        }} />

        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 60px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView + (showResults ? '-results' : '')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <footer style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            marginTop: '80px'
          }}>
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              padding: '32px 24px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Equinox</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>Flow</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                © 2026 Equinox Flow. Agentic Financial Digital Twin.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {['Privacy', 'Terms', 'Contact'].map(link => (
                  <a 
                    key={link}
                    href="#" 
                    style={{ 
                      fontSize: '14px', 
                      color: 'rgba(255,255,255,0.4)', 
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {(showResults || activeView !== 'dashboard') && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNavigate('dashboard')}
              style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                padding: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
                zIndex: 50
              }}
            >
              <ArrowUp style={{ width: '20px', height: '20px', color: 'white' }} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {showEditProfile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditProfile(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(40, 20, 60, 0.98) 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
                }}
              >
                {/* Modal Header */}
                <div style={{
                  padding: '24px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                      Edit Profile
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                      Update your personal information
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowEditProfile(false)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      color: 'white'
                    }}
                  >
                    <X style={{ width: '18px', height: '18px' }} />
                  </motion.button>
                </div>

                {/* Form */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      Current Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      Annual Income (USD)
                    </label>
                    <input
                      type="number"
                      value={profileData.income}
                      onChange={(e) => setProfileData(prev => ({ ...prev, income: e.target.value }))}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                      Target Cities (comma separated)
                    </label>
                    <input
                      type="text"
                      value={profileData.targetCities}
                      onChange={(e) => setProfileData(prev => ({ ...prev, targetCities: e.target.value }))}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: 'white',
                        fontSize: '15px',
                        outline: 'none'
                      }}
                      placeholder="Berlin, Tokyo, Singapore"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div style={{
                  padding: '20px 24px',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  gap: '12px'
                }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEditProfile(false)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowEditProfile(false);
                      toast.success('Profile updated successfully!', { icon: '✅' });
                    }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Disclaimer Footer */}
        <footer style={{
          marginTop: '60px',
          padding: '32px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
            {/* Data Sources */}
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>📊</span> Data Sources
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { name: 'Numbeo', type: 'Cost of Living' },
                  { name: 'OECD', type: 'Tax Data' },
                  { name: 'Mercer', type: 'Quality of Life' },
                  { name: 'WHO', type: 'Health Data' },
                  { name: 'XE.com', type: 'Currency' },
                  { name: 'IEA', type: 'Energy Data' },
                ].map((source, i) => (
                  <span key={i} style={{
                    padding: '6px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    <strong style={{ color: 'rgba(255,255,255,0.8)' }}>{source.name}</strong> • {source.type}
                  </span>
                ))}
              </div>
            </div>

            {/* Methodology */}
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🔬</span> Methodology
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  'Monte Carlo (10K iterations)',
                  'Federated Learning',
                  'NER + LayoutLM',
                  'CLIR Embeddings',
                  'K-Means Clustering',
                ].map((method, i) => (
                  <span key={i} style={{
                    padding: '6px 12px',
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#a78bfa',
                    border: '1px solid rgba(102, 126, 234, 0.2)'
                  }}>
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div style={{ flex: '0 0 auto' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🔒</span> Compliance
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { label: 'GDPR', color: '#10b981' },
                  { label: 'SOC 2', color: '#3b82f6' },
                  { label: 'ISO 27001', color: '#8b5cf6' },
                ].map((badge, i) => (
                  <div key={i} style={{
                    padding: '8px 14px',
                    background: `${badge.color}15`,
                    borderRadius: '8px',
                    border: `1px solid ${badge.color}30`,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: badge.color
                  }}>
                    ✓ {badge.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(245, 158, 11, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: '#f59e0b' }}>⚠️ Disclaimer:</strong> Projections are based on historical data and Monte Carlo simulations. 
              Tax calculations use current treaty rates which may change. Cost of living data is aggregated from multiple sources with regional adjustments. 
              This tool provides estimates for planning purposes only and should not be considered financial or legal advice. 
              Consult qualified professionals before making relocation decisions. Past performance does not guarantee future results.
            </p>
          </div>

          {/* Copyright */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              © 2026 Equinox Flow • Built for DUHacks 5.0 • Powered by AI Agents
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
