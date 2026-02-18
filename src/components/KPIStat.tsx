import { cn } from '@/lib/utils';

interface KPIStatProps {
  label: string;
  value: number | string;
  unit?: string;
  delta?: number;
  deltaPercent?: number;
  confidence?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function KPIStat({ label, value, unit, delta, deltaPercent, confidence, className, size = 'md' }: KPIStatProps) {
  const isPositive = delta !== undefined && delta > 0;
  const isNegative = delta !== undefined && delta < 0;
  // For some metrics, negative delta is good (heat risk, food desert %)
  const invertedMetrics = ['Heat Illness Risk', 'Heat Stress Index', 'Food Desert', 'Cost'];
  const isInverted = invertedMetrics.some(m => label.includes(m));
  const goodChange = isInverted ? isNegative : isPositive;

  return (
    <div className={cn(
      'rounded-lg border border-border bg-card p-3 flex flex-col gap-1',
      size === 'lg' && 'p-5',
      size === 'sm' && 'p-2',
      className
    )}>
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={cn('data-value', size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl')}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {delta !== undefined && (
        <div className="flex items-center gap-2 mt-1">
          <span className={cn(
            'text-xs font-mono font-medium',
            goodChange ? 'text-success' : 'text-destructive'
          )}>
            {delta > 0 ? '+' : ''}{delta}{unit || ''}
          </span>
          {deltaPercent !== undefined && (
            <span className="text-xs text-muted-foreground">
              ({deltaPercent > 0 ? '+' : ''}{deltaPercent}%)
            </span>
          )}
        </div>
      )}
      {confidence !== undefined && (
        <div className="flex items-center gap-1 mt-1">
          <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">{confidence}%</span>
        </div>
      )}
    </div>
  );
}
