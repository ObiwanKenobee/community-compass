import { useProjectStore } from '@/store/useProjectStore';
import { AppLayout } from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Thermometer, Droplets, Apple, Briefcase, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ICONS: Record<string, React.ReactNode> = {
  Thermometer: <Thermometer className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Apple: <Apple className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
};

const COLOR_MAP: Record<string, string> = {
  'chart-heat': 'border-chart-heat/50 hover:border-chart-heat',
  'chart-tree': 'border-chart-tree/50 hover:border-chart-tree',
  'chart-food': 'border-chart-food/50 hover:border-chart-food',
  'chart-jobs': 'border-chart-jobs/50 hover:border-chart-jobs',
  'chart-health': 'border-chart-health/50 hover:border-chart-health',
};

const SELECTED_MAP: Record<string, string> = {
  'chart-heat': 'border-chart-heat shadow-[0_0_20px_-5px_hsl(var(--chart-heat)/0.3)]',
  'chart-tree': 'border-chart-tree shadow-[0_0_20px_-5px_hsl(var(--chart-tree)/0.3)]',
  'chart-food': 'border-chart-food shadow-[0_0_20px_-5px_hsl(var(--chart-food)/0.3)]',
  'chart-jobs': 'border-chart-jobs shadow-[0_0_20px_-5px_hsl(var(--chart-jobs)/0.3)]',
  'chart-health': 'border-chart-health shadow-[0_0_20px_-5px_hsl(var(--chart-health)/0.3)]',
};

const ICON_BG: Record<string, string> = {
  'chart-heat': 'bg-chart-heat/15 text-chart-heat',
  'chart-tree': 'bg-chart-tree/15 text-chart-tree',
  'chart-food': 'bg-chart-food/15 text-chart-food',
  'chart-jobs': 'bg-chart-jobs/15 text-chart-jobs',
  'chart-health': 'bg-chart-health/15 text-chart-health',
};

export default function ProblemSelection() {
  const { problems, selectedProblem, selectProblem, setStep } = useProjectStore();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">What challenge will you tackle?</h1>
          <p className="text-muted-foreground">Choose a focus area. Each loads a starter model with relevant indicators and intervention templates.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {problems.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProblem(p)}
              className={cn(
                'text-left p-5 rounded-xl border-2 transition-all bg-gradient-card',
                selectedProblem?.id === p.id
                  ? SELECTED_MAP[p.color]
                  : COLOR_MAP[p.color] || 'border-border'
              )}
            >
              <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', ICON_BG[p.color])}>
                {ICONS[p.icon]}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
              {p.suggestedInterventions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.suggestedInterventions.map((si, i) => (
                    <span key={i} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded">
                      {si.name}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setStep('onboarding'); navigate('/'); }}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button
            disabled={!selectedProblem}
            onClick={() => { setStep('baseline'); navigate('/baseline'); }}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            Build Baseline <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
