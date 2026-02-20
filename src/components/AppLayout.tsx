import { ReactNode } from 'react';
import { StepIndicator } from '@/components/StepIndicator';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { useProjectStore } from '@/store/useProjectStore';
import { Activity } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  hideSteps?: boolean;
}

export function AppLayout({ children, hideSteps }: AppLayoutProps) {
  const currentStep = useProjectStore((s) => s.currentStep);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sm">Community Twin</span>
          </div>
          {!hideSteps && currentStep !== 'onboarding' && (
            <div className="flex-1 max-w-2xl mx-auto">
              <StepIndicator />
            </div>
          )}
          <div className="ml-auto">
            <OfflineIndicator />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
