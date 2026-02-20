import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Wifi, WifiOff, Cloud, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { isOnline, unsyncedCount, isSyncing, syncDrafts } = useOfflineSync();

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Wifi className="w-3 h-3 text-success" />
          <span>Online</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-[10px] text-accent">
          <WifiOff className="w-3 h-3" />
          <span>Offline</span>
        </div>
      )}

      {unsyncedCount > 0 && (
        <button
          onClick={syncDrafts}
          disabled={!isOnline || isSyncing}
          className={cn(
            'flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground hover:text-foreground transition-colors',
            !isOnline && 'opacity-50 cursor-not-allowed'
          )}
        >
          {isSyncing ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Cloud className="w-3 h-3" />
          )}
          {unsyncedCount} unsynced
        </button>
      )}
    </div>
  );
}
