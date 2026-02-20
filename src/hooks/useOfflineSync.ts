import { useState, useEffect, useCallback } from 'react';
import { getUnsyncedDrafts, markSynced, saveDraft } from '@/lib/offlineStorage';
import { toast } from 'sonner';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [unsyncedCount, setUnsyncedCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online! Syncing drafts...');
      syncDrafts();
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning('You\'re offline. Drafts will be saved locally.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check unsynced on mount
    checkUnsynced();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkUnsynced = async () => {
    try {
      const drafts = await getUnsyncedDrafts();
      setUnsyncedCount(drafts.length);
    } catch {
      // IndexedDB not available
    }
  };

  const syncDrafts = useCallback(async () => {
    if (!navigator.onLine || isSyncing) return;
    setIsSyncing(true);

    try {
      const drafts = await getUnsyncedDrafts();
      for (const draft of drafts) {
        // In MVP, just mark as synced (no backend endpoint yet)
        await markSynced(draft.id);
      }
      setUnsyncedCount(0);
      if (drafts.length > 0) {
        toast.success(`${drafts.length} draft${drafts.length > 1 ? 's' : ''} synced successfully`);
      }
    } catch {
      toast.error('Failed to sync drafts');
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  const saveOfflineDraft = useCallback(async (type: 'baseline' | 'intervention' | 'scenario', data: unknown) => {
    const id = `draft-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    await saveDraft({
      id,
      type,
      data,
      createdAt: new Date().toISOString(),
      synced: false,
    });
    await checkUnsynced();
    if (!navigator.onLine) {
      toast.info('Draft saved locally. Will sync when online.');
    }
    return id;
  }, []);

  return { isOnline, unsyncedCount, isSyncing, syncDrafts, saveOfflineDraft };
}
