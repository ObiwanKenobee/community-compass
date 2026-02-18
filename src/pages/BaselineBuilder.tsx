import { useProjectStore } from '@/store/useProjectStore';
import { AppLayout } from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KPIStat } from '@/components/KPIStat';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import { useState } from 'react';

const STEPS = ['Population & Demographics', 'Infrastructure', 'Environment', 'Review'];

export default function BaselineBuilder() {
  const { baselineData, updateBaseline, selectedCommunity, setStep } = useProjectStore();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const hints: Record<string, string> = {
    population: `You entered ${baselineData.population.toLocaleString()} — do you want to add age group breakdowns?`,
    schools: `${baselineData.schools} schools serving ${baselineData.population.toLocaleString()} people ≈ ${Math.round(baselineData.population / baselineData.schools).toLocaleString()} per school.`,
    avgTemperature: `${baselineData.avgTemperature}°C average — communities above 35°C typically see 2× heat illness rates.`,
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Build Your Baseline</h1>
          <p className="text-muted-foreground">
            {selectedCommunity?.name || 'Community'} — confirm or adjust the baseline data for your model.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex gap-1 mb-8">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveStep(i)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
                i === activeStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-gradient-card border border-border rounded-xl p-6 mb-6 animate-fade-in">
          {activeStep === 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
              <FieldGroup label="Population" value={baselineData.population} hint={hints.population}
                onChange={(v) => updateBaseline({ population: Number(v) })} />
              <FieldGroup label="Schools" value={baselineData.schools} hint={hints.schools}
                onChange={(v) => updateBaseline({ schools: Number(v) })} />
              <FieldGroup label="Clinics" value={baselineData.clinics}
                onChange={(v) => updateBaseline({ clinics: Number(v) })} />
              <FieldGroup label="Bus Routes" value={baselineData.busRoutes}
                onChange={(v) => updateBaseline({ busRoutes: Number(v) })} />
            </div>
          )}

          {activeStep === 1 && (
            <div className="grid sm:grid-cols-2 gap-6">
              <FieldGroup label="Schools" value={baselineData.schools} hint={hints.schools}
                onChange={(v) => updateBaseline({ schools: Number(v) })} />
              <FieldGroup label="Clinics" value={baselineData.clinics}
                onChange={(v) => updateBaseline({ clinics: Number(v) })} />
              <FieldGroup label="Bus Routes" value={baselineData.busRoutes}
                onChange={(v) => updateBaseline({ busRoutes: Number(v) })} />
              <FieldGroup label="Unemployment Rate (%)" value={baselineData.unemploymentPercent}
                onChange={(v) => updateBaseline({ unemploymentPercent: Number(v) })} />
            </div>
          )}

          {activeStep === 2 && (
            <div className="grid sm:grid-cols-2 gap-6">
              <FieldGroup label="Avg Temperature (°C)" value={baselineData.avgTemperature} hint={hints.avgTemperature}
                onChange={(v) => updateBaseline({ avgTemperature: Number(v) })} />
              <FieldGroup label="Rainfall (mm/yr)" value={baselineData.rainfallMm}
                onChange={(v) => updateBaseline({ rainfallMm: Number(v) })} />
              <FieldGroup label="Tree Canopy (%)" value={baselineData.treeCanopyPercent}
                onChange={(v) => updateBaseline({ treeCanopyPercent: Number(v) })} />
              <FieldGroup label="Food Desert (%)" value={baselineData.foodDesertPercent}
                onChange={(v) => updateBaseline({ foodDesertPercent: Number(v) })} />
            </div>
          )}

          {activeStep === 3 && (
            <div>
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Baseline Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <KPIStat label="Population" value={baselineData.population} size="sm" />
                <KPIStat label="Schools" value={baselineData.schools} size="sm" />
                <KPIStat label="Clinics" value={baselineData.clinics} size="sm" />
                <KPIStat label="Bus Routes" value={baselineData.busRoutes} size="sm" />
                <KPIStat label="Avg Temp" value={baselineData.avgTemperature} unit="°C" size="sm" />
                <KPIStat label="Rainfall" value={baselineData.rainfallMm} unit="mm" size="sm" />
                <KPIStat label="Tree Cover" value={baselineData.treeCanopyPercent} unit="%" size="sm" />
                <KPIStat label="Food Desert" value={baselineData.foodDesertPercent} unit="%" size="sm" />
                <KPIStat label="Unemployment" value={baselineData.unemploymentPercent} unit="%" size="sm" />
                <KPIStat label="MH Access" value={baselineData.mentalHealthAccessPercent} unit="%" size="sm" />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => {
            if (activeStep > 0) setActiveStep(activeStep - 1);
            else { setStep('problem'); navigate('/problem'); }
          }}>
            <ArrowLeft className="w-4 h-4 mr-1" /> {activeStep > 0 ? 'Previous' : 'Back'}
          </Button>
          <Button
            onClick={() => {
              if (activeStep < STEPS.length - 1) setActiveStep(activeStep + 1);
              else { setStep('scenario'); navigate('/scenario'); }
            }}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            {activeStep < STEPS.length - 1 ? 'Next Step' : 'Build Scenarios'} <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

function FieldGroup({ label, value, onChange, hint }: {
  label: string; value: number; onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-secondary border-border font-mono"
      />
      {hint && (
        <p className="text-[11px] text-primary/80 flex items-start gap-1">
          <Lightbulb className="w-3 h-3 mt-0.5 shrink-0" />
          {hint}
        </p>
      )}
    </div>
  );
}
