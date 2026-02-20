import { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineTipProps {
  tipKey: string;
  children: React.ReactNode;
  className?: string;
}

export function InlineTip({ tipKey, children, className }: InlineTipProps) {
  const storageKey = `tip-dismissed-${tipKey}`;
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(storageKey) === 'true');

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem(storageKey, 'true');
    setDismissed(true);
  };

  return (
    <div className={cn(
      'flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-primary/20 bg-primary/5 text-xs text-muted-foreground',
      className
    )}>
      <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
      <span className="flex-1 leading-relaxed">{children}</span>
      <button onClick={handleDismiss} className="text-muted-foreground/50 hover:text-foreground transition-colors shrink-0">
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
