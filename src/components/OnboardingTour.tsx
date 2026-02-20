import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourStep {
  title: string;
  description: string;
  targetSelector?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to Community Twin AI',
    description: 'This tool helps your students model real community challenges, test interventions, and build evidence-based proposals. Let\'s walk through the setup.',
  },
  {
    title: 'Select a Community',
    description: 'Start by choosing a community area. Each card shows key baseline indicators like population, heat stress, and food access scores.',
  },
  {
    title: 'Privacy & Consent',
    description: 'All data is aggregated—no individual identities are collected. Students must agree before proceeding. You control what gets shared publicly.',
  },
  {
    title: 'Choose a Problem',
    description: 'Next, students pick a civic challenge (Heat, Flooding, Food, Jobs, or Mental Health). Each loads a starter model template.',
  },
  {
    title: 'Build & Simulate',
    description: 'Students add interventions, run simulations, and compare outcomes. Results show KPI deltas, uncertainty, and second-order effects.',
  },
  {
    title: 'Export & Share',
    description: 'The Proposal Builder auto-generates an evidence brief. As a teacher, you approve what gets published to the Community Gallery.',
  },
];

const TOUR_STORAGE_KEY = 'community-twin-tour-completed';

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const completed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!completed) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleComplete} />
      <div className="relative w-full max-w-md mx-4 rounded-2xl border border-border bg-card p-6 shadow-card animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {currentStep + 1} / {TOUR_STEPS.length}
            </span>
          </div>
          <button onClick={handleComplete} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-5">
          {TOUR_STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1 rounded-full flex-1 transition-all',
                i <= currentStep ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">{step.description}</p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleComplete} className="text-muted-foreground">
              Skip tour
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < TOUR_STEPS.length - 1 && <ArrowRight className="w-3.5 h-3.5 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
