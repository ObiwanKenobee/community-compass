import { cn } from '@/lib/utils';
import { APP_STEPS, type AppStep } from '@/types';
import { useProjectStore } from '@/store/useProjectStore';
import { Check } from 'lucide-react';

const stepOrder: AppStep[] = APP_STEPS.map(s => s.key);

export function StepIndicator() {
  const currentStep = useProjectStore((s) => s.currentStep);
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="flex items-center gap-1 w-full">
      {APP_STEPS.map((step, idx) => {
        const isComplete = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className={cn(
              'flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-semibold shrink-0 transition-all',
              isComplete && 'bg-primary text-primary-foreground',
              isCurrent && 'bg-primary text-primary-foreground shadow-glow',
              !isComplete && !isCurrent && 'bg-secondary text-muted-foreground',
            )}>
              {isComplete ? <Check className="w-3.5 h-3.5" /> : step.number}
            </div>
            <span className={cn(
              'ml-1.5 text-xs hidden sm:inline',
              isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
            )}>
              {step.label}
            </span>
            {idx < APP_STEPS.length - 1 && (
              <div className={cn(
                'flex-1 h-px mx-2',
                isComplete ? 'bg-primary' : 'bg-border'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
