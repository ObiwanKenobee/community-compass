import { useProjectStore } from '@/store/useProjectStore';
import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const { communities, selectCommunity, selectedCommunity, setStep, hasConsented, setConsent } = useProjectStore();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(hasConsented);

  const handleContinue = () => {
    if (!selectedCommunity || !agreed) return;
    setConsent(true);
    setStep('problem');
    navigate('/problem');
  };

  return (
    <AppLayout hideSteps>
      <div className="bg-gradient-hero min-h-[calc(100vh-3.5rem)]">
        <div className="container max-w-5xl mx-auto px-4 py-12">
          {/* Hero */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <span className="text-gradient-primary">Community Twin</span>
              <span className="text-foreground"> AI</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Model your community. Test interventions. Build evidence-based proposals 
              for real change—powered by data, guided by you.
            </p>
          </div>

          {/* Community Selection */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Select Your Community
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {communities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectCommunity(c)}
                  className={cn(
                    'text-left p-5 rounded-xl border transition-all',
                    'bg-gradient-card hover:border-primary/50',
                    selectedCommunity?.id === c.id
                      ? 'border-primary shadow-glow'
                      : 'border-border'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{c.name}</h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{c.area}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{c.region}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span className="data-value text-sm">{c.population.toLocaleString()}</span>
                    <span className="text-muted-foreground">residents</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.baselineIndicators.slice(0, 3).map((ind) => (
                      <span key={ind.id} className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-mono">
                        {ind.name}: {ind.baselineValue}{ind.unit === '%' ? '%' : ''}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Consent */}
          <div className="animate-slide-up max-w-xl mx-auto" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Privacy & Data Consent</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All data used is aggregated community-level data. No individual identities are collected 
                    or exposed. Student names are hidden by default. Sharing requires teacher approval.
                  </p>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(v === true)}
                />
                <span className="text-xs text-muted-foreground">
                  I understand and agree to the data usage terms
                </span>
              </label>
            </div>

            <Button
              onClick={handleContinue}
              disabled={!selectedCommunity || !agreed}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold h-12 text-base hover:opacity-90 transition-opacity"
            >
              Continue to Problem Selection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
