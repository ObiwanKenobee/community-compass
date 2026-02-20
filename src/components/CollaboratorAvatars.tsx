import { cn } from '@/lib/utils';
import type { Collaborator } from '@/hooks/useRealtimeCollaboration';
import { Users } from 'lucide-react';

interface CollaboratorAvatarsProps {
  collaborators: Collaborator[];
  myName: string;
  myColor: string;
}

export function CollaboratorAvatars({ collaborators, myName, myColor }: CollaboratorAvatarsProps) {
  const total = collaborators.length + 1; // +1 for self

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center -space-x-2">
        {/* Self */}
        <div
          className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold z-10"
          style={{ backgroundColor: myColor, color: 'hsl(220, 20%, 7%)' }}
          title={`${myName} (you)`}
        >
          {myName.split(' ').map((w) => w[0]).join('')}
        </div>

        {/* Others */}
        {collaborators.slice(0, 4).map((c) => (
          <div
            key={c.id}
            className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold relative"
            style={{ backgroundColor: c.color, color: 'hsl(220, 20%, 7%)' }}
            title={c.name}
          >
            {c.name.split(' ').map((w) => w[0]).join('')}
            {/* Live cursor indicator */}
            {c.cursor && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-success border border-background" />
            )}
          </div>
        ))}

        {collaborators.length > 4 && (
          <div className="w-7 h-7 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-mono text-muted-foreground">
            +{collaborators.length - 4}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <Users className="w-3 h-3" />
        <span>{total} online</span>
      </div>
    </div>
  );
}
