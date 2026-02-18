import { useProjectStore } from '@/store/useProjectStore';
import { AppLayout } from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { KPIStat } from '@/components/KPIStat';
import { INTERVENTION_TEMPLATES } from '@/data/mockData';
import { ArrowLeft, ArrowRight, Play, Plus, X, Loader2, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { Intervention, Scenario } from '@/types';

export default function ScenarioLab() {
  const {
    scenarios, addScenario, addIntervention, removeIntervention,
    activeScenarioId, setActiveScenario, runSimulation, simulationRuns, setStep,
  } = useProjectStore();
  const navigate = useNavigate();

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId);
  const activeRun = simulationRuns.find(
    (r) => activeScenario && r.interventions.some((i) =>
      activeScenario.interventions.some((ai) => ai.id === i.id)
    )
  );

  const createScenario = () => {
    const id = `scenario-${Date.now()}`;
    const name = `Scenario ${String.fromCharCode(65 + scenarios.length)}`;
    addScenario({ id, name, interventions: [] });
  };

  const addFromTemplate = (template: typeof INTERVENTION_TEMPLATES[0]) => {
    if (!activeScenarioId) return;
    const intervention: Intervention = {
      id: `int-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: template.type!,
      name: template.name!,
      description: template.description!,
      parameters: {},
      targetZones: ['Zone A', 'Zone B'],
      costEstimate: template.costEstimate!,
      timelineMonths: template.timelineMonths!,
    };
    addIntervention(activeScenarioId, intervention);
  };

  const handleRun = () => {
    if (!activeScenarioId) return;
    runSimulation(activeScenarioId);
  };

  const latestRun = activeScenarioId
    ? simulationRuns.filter((r) => r.interventions.length > 0).slice(-1)[0]
    : null;

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Scenario Lab</h1>
          <p className="text-muted-foreground">Compose interventions, run simulations, and see projected outcomes.</p>
        </div>

        {/* Scenario tabs */}
        <div className="flex gap-2 mb-6">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScenario(s.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                s.id === activeScenarioId
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {s.name}
            </button>
          ))}
          <button
            onClick={createScenario}
            className="px-4 py-2 rounded-lg text-sm border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> New Scenario
          </button>
        </div>

        {!activeScenario ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-4">Create a scenario to start building interventions.</p>
            <Button onClick={createScenario} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              <Plus className="w-4 h-4 mr-1" /> Create Scenario A
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Intervention templates */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Intervention Templates</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {INTERVENTION_TEMPLATES.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => addFromTemplate(t)}
                    className="w-full text-left p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-foreground">{t.name}</h4>
                      <Plus className="w-4 h-4 text-muted-foreground shrink-0" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
                    <div className="flex gap-3 mt-2 text-[10px] font-mono text-muted-foreground">
                      <span>${(t.costEstimate! / 1000).toFixed(0)}K</span>
                      <span>{t.timelineMonths} mo</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active scenario */}
            <div className="lg:col-span-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {activeScenario.name} — {activeScenario.interventions.length} intervention{activeScenario.interventions.length !== 1 ? 's' : ''}
              </h3>

              {activeScenario.interventions.length === 0 ? (
                <div className="border border-dashed border-border rounded-xl p-8 text-center text-muted-foreground text-sm">
                  Click templates on the left to add interventions
                </div>
              ) : (
                <div className="space-y-2 mb-4">
                  {activeScenario.interventions.map((int) => (
                    <div key={int.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                      <div className="flex-1">
                        <span className="text-sm font-medium">{int.name}</span>
                        <div className="flex gap-3 mt-1 text-[10px] font-mono text-muted-foreground">
                          <span>${(int.costEstimate / 1000).toFixed(0)}K</span>
                          <span>{int.timelineMonths} months</span>
                          <span>{int.targetZones.join(', ')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeIntervention(activeScenario.id, int.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeScenario.interventions.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    Total Cost: <span className="data-value text-sm">
                      ${(activeScenario.interventions.reduce((s, i) => s + i.costEstimate, 0) / 1000000).toFixed(2)}M
                    </span>
                  </div>
                </div>
              )}

              {/* Run button */}
              <Button
                onClick={handleRun}
                disabled={activeScenario.interventions.length === 0 || (latestRun?.status !== undefined && latestRun.status !== 'complete' && latestRun.status !== 'failed')}
                className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 h-11 text-sm font-semibold mb-6"
              >
                {latestRun?.status === 'running' || latestRun?.status === 'queued' || latestRun?.status === 'summarizing' ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Running Simulation...</>
                ) : (
                  <><Play className="w-4 h-4 mr-2" /> Run Simulation</>
                )}
              </Button>

              {/* Status */}
              {latestRun && latestRun.status !== 'complete' && (
                <SimulationProgress status={latestRun.status} />
              )}

              {/* Results */}
              {latestRun?.status === 'complete' && (
                <div className="animate-slide-up">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-success" /> Results
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {latestRun.outputs.map((o) => (
                      <KPIStat
                        key={o.indicatorId}
                        label={o.indicatorName}
                        value={o.projectedValue}
                        delta={o.delta}
                        deltaPercent={o.deltaPercent}
                        confidence={o.confidence}
                        size="sm"
                      />
                    ))}
                  </div>
                  <div className="rounded-lg bg-secondary/50 border border-border p-3 text-xs text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">Uncertainty: </span>
                    <span className="font-mono">{latestRun.uncertainty}%</span> — {latestRun.explanation}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-8 border-t border-border pt-6">
          <Button variant="outline" onClick={() => { setStep('baseline'); navigate('/baseline'); }}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Baseline
          </Button>
          <Button
            disabled={simulationRuns.filter((r) => r.status === 'complete').length < 1}
            onClick={() => { setStep('comparison'); navigate('/comparison'); }}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            Compare Scenarios <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

function SimulationProgress({ status }: { status: string }) {
  const steps = ['queued', 'running', 'summarizing', 'complete'];
  const currentIdx = steps.indexOf(status);

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border mb-4">
      {steps.slice(0, -1).map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            i < currentIdx ? 'bg-success' : i === currentIdx ? 'bg-primary animate-pulse-glow' : 'bg-muted'
          )} />
          <span className={cn(
            'text-xs capitalize',
            i <= currentIdx ? 'text-foreground' : 'text-muted-foreground'
          )}>{s}</span>
          {i < steps.length - 2 && <Clock className="w-3 h-3 text-muted-foreground" />}
        </div>
      ))}
    </div>
  );
}
