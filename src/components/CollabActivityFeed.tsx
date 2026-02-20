import { Plus, Trash2, Play, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollabActivityFeedProps {
  events: Array<{
    type: 'intervention_added' | 'intervention_removed' | 'scenario_created' | 'simulation_started';
    payload: Record<string, unknown>;
    userId: string;
    userName: string;
    timestamp: string;
  }>;
}

const EVENT_CONFIG = {
  intervention_added: { icon: Plus, label: 'added an intervention', color: 'text-success' },
  intervention_removed: { icon: Trash2, label: 'removed an intervention', color: 'text-destructive' },
  scenario_created: { icon: Layers, label: 'created a scenario', color: 'text-primary' },
  simulation_started: { icon: Play, label: 'started a simulation', color: 'text-accent' },
};

export function CollabActivityFeed({ events }: CollabActivityFeedProps) {
  if (events.length === 0) return null;

  const recentEvents = events.slice(-5).reverse();

  return (
    <div className="rounded-lg border border-border bg-card/50 p-3 mb-4">
      <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Live Activity
      </h4>
      <div className="space-y-1.5">
        {recentEvents.map((evt, i) => {
          const config = EVENT_CONFIG[evt.type];
          const Icon = config.icon;
          const timeAgo = getTimeAgo(evt.timestamp);

          return (
            <div key={`${evt.timestamp}-${i}`} className="flex items-center gap-2 text-[11px]">
              <Icon className={cn('w-3 h-3 shrink-0', config.color)} />
              <span className="text-muted-foreground">
                <span className="text-foreground font-medium">{evt.userName}</span>
                {' '}{config.label}
                {evt.payload?.name && (
                  <span className="text-primary font-mono"> "{evt.payload.name as string}"</span>
                )}
              </span>
              <span className="text-muted-foreground/50 ml-auto shrink-0">{timeAgo}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff < 5000) return 'just now';
  if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return `${Math.floor(diff / 3600000)}h ago`;
}
