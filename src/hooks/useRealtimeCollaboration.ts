import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface Collaborator {
  id: string;
  name: string;
  color: string;
  cursor?: { section: string; elementId?: string };
  lastSeen: string;
}

interface CollabEvent {
  type: 'intervention_added' | 'intervention_removed' | 'scenario_created' | 'simulation_started';
  payload: Record<string, unknown>;
  userId: string;
  userName: string;
  timestamp: string;
}

const AVATAR_COLORS = [
  'hsl(175, 70%, 42%)',  // primary
  'hsl(38, 92%, 55%)',   // accent
  'hsl(200, 80%, 55%)',  // info
  'hsl(280, 60%, 60%)',  // health
  'hsl(152, 60%, 42%)',  // success
  'hsl(0, 80%, 58%)',    // heat
];

function getRandomName(): string {
  const adjectives = ['Creative', 'Curious', 'Brave', 'Thoughtful', 'Insightful', 'Resourceful'];
  const nouns = ['Teacher', 'Educator', 'Mentor', 'Guide', 'Coach', 'Facilitator'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

export function useRealtimeCollaboration(projectId: string) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [events, setEvents] = useState<CollabEvent[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const myIdRef = useRef(`user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`);
  const myNameRef = useRef(getRandomName());
  const myColorRef = useRef(AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]);

  useEffect(() => {
    const channel = supabase.channel(`scenario-collab:${projectId}`, {
      config: {
        presence: { key: myIdRef.current },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<{
          id: string;
          name: string;
          color: string;
          cursor?: { section: string; elementId?: string };
          lastSeen: string;
        }>();

        const users: Collaborator[] = [];
        for (const [, presences] of Object.entries(state)) {
          for (const p of presences) {
            if (p.id !== myIdRef.current) {
              users.push({
                id: p.id,
                name: p.name,
                color: p.color,
                cursor: p.cursor,
                lastSeen: p.lastSeen,
              });
            }
          }
        }
        setCollaborators(users);
      })
      .on('broadcast', { event: 'collab_event' }, ({ payload }) => {
        const evt = payload as CollabEvent;
        if (evt.userId !== myIdRef.current) {
          setEvents((prev) => [...prev.slice(-19), evt]);
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            id: myIdRef.current,
            name: myNameRef.current,
            color: myColorRef.current,
            lastSeen: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [projectId]);

  const updateCursor = useCallback(async (section: string, elementId?: string) => {
    if (!channelRef.current) return;
    await channelRef.current.track({
      id: myIdRef.current,
      name: myNameRef.current,
      color: myColorRef.current,
      cursor: { section, elementId },
      lastSeen: new Date().toISOString(),
    });
  }, []);

  const broadcastEvent = useCallback(async (type: CollabEvent['type'], payload: Record<string, unknown>) => {
    if (!channelRef.current) return;
    await channelRef.current.send({
      type: 'broadcast',
      event: 'collab_event',
      payload: {
        type,
        payload,
        userId: myIdRef.current,
        userName: myNameRef.current,
        timestamp: new Date().toISOString(),
      },
    });
  }, []);

  return {
    collaborators,
    events,
    myId: myIdRef.current,
    myName: myNameRef.current,
    myColor: myColorRef.current,
    updateCursor,
    broadcastEvent,
  };
}
