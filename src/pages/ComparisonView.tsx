import { useProjectStore } from '@/store/useProjectStore';
import { AppLayout } from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { KPIStat } from '@/components/KPIStat';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from 'recharts';

export default function ComparisonView() {
  const { simulationRuns, scenarios, setStep } = useProjectStore();
  const navigate = useNavigate();

  const completedRuns = simulationRuns.filter((r) => r.status === 'complete');

  // Build comparison data
  const comparisonData = completedRuns.length > 0
    ? completedRuns[0].outputs.map((o) => {
        const row: Record<string, string | number> = { indicator: o.indicatorName, baseline: o.baselineValue };
        completedRuns.forEach((run, i) => {
          const output = run.outputs.find((ro) => ro.indicatorId === o.indicatorId);
          row[`scenario_${i}`] = output?.projectedValue || 0;
        });
        return row;
      })
    : [];

  const radarData = completedRuns.length > 0
    ? completedRuns[0].outputs.filter((o) => o.indicatorId !== 'cost_index').map((o) => {
        const row: Record<string, string | number> = { subject: o.indicatorName.replace(/ /g, '\n'), baseline: o.baselineValue };
        completedRuns.forEach((run, i) => {
          const output = run.outputs.find((ro) => ro.indicatorId === o.indicatorId);
          row[`scenario_${i}`] = output?.projectedValue || 0;
        });
        return row;
      })
    : [];

  const colors = ['hsl(175, 70%, 42%)', 'hsl(38, 92%, 55%)', 'hsl(200, 80%, 55%)', 'hsl(280, 60%, 60%)'];

  // Tradeoff table
  const tradeoffMetrics = ['Cost', 'Equity Impact', 'Time to Results', 'Overall Impact'];

  return (
    <AppLayout>
      <div className="container max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Compare Scenarios</h1>
          <p className="text-muted-foreground">Side-by-side analysis of baseline vs. your intervention scenarios.</p>
        </div>

        {completedRuns.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Run at least one simulation to see comparisons.</p>
          </div>
        ) : (
          <>
            {/* Bar chart */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">KPI Comparison</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={comparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
                  <XAxis dataKey="indicator" tick={{ fill: 'hsl(215, 12%, 52%)', fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: 'hsl(215, 12%, 52%)', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: 'hsl(220, 18%, 12%)', border: '1px solid hsl(220, 14%, 18%)', borderRadius: 8, fontSize: 12 }} />
                  <Legend />
                  <Bar dataKey="baseline" fill="hsl(215, 12%, 35%)" name="Baseline" radius={[4, 4, 0, 0]} />
                  {completedRuns.map((_, i) => (
                    <Bar key={i} dataKey={`scenario_${i}`} fill={colors[i]} name={scenarios[i]?.name || `Scenario ${i + 1}`} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Multi-Dimension View</h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(220, 14%, 18%)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(215, 12%, 52%)', fontSize: 9 }} />
                  <PolarRadiusAxis tick={{ fill: 'hsl(215, 12%, 40%)', fontSize: 9 }} />
                  <Radar name="Baseline" dataKey="baseline" stroke="hsl(215, 12%, 45%)" fill="hsl(215, 12%, 35%)" fillOpacity={0.2} />
                  {completedRuns.map((_, i) => (
                    <Radar key={i} name={scenarios[i]?.name || `Scenario ${i + 1}`} dataKey={`scenario_${i}`} stroke={colors[i]} fill={colors[i]} fillOpacity={0.15} />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Tradeoff Table */}
            <div className="bg-gradient-card border border-border rounded-xl p-6 mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Tradeoff Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-xs text-muted-foreground font-medium">Metric</th>
                      <th className="text-left py-2 text-xs text-muted-foreground font-medium">Baseline</th>
                      {completedRuns.map((_, i) => (
                        <th key={i} className="text-left py-2 text-xs font-medium" style={{ color: colors[i] }}>
                          {scenarios[i]?.name || `Scenario ${i + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tradeoffMetrics.map((metric) => (
                      <tr key={metric} className="border-b border-border/50">
                        <td className="py-2.5 text-muted-foreground">{metric}</td>
                        <td className="py-2.5 font-mono text-sm">
                          {metric === 'Cost' ? '$0' : metric === 'Time to Results' ? '—' : 'Low'}
                        </td>
                        {completedRuns.map((run, i) => (
                          <td key={i} className="py-2.5 font-mono text-sm">
                            {metric === 'Cost'
                              ? `$${(run.outputs.find(o => o.indicatorId === 'cost_index')?.projectedValue || 0).toFixed(1)}M`
                              : metric === 'Time to Results'
                              ? `${6 + i * 3} months`
                              : metric === 'Equity Impact'
                              ? ['Medium', 'High', 'Medium-High', 'Low'][i] || 'Medium'
                              : run.uncertainty < 25 ? 'High' : run.uncertainty < 35 ? 'Medium' : 'Low'
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side-by-side KPIs */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {completedRuns.map((run, i) => (
                <div key={run.id} className="border border-border rounded-xl p-4 bg-gradient-card">
                  <h4 className="text-sm font-semibold mb-3" style={{ color: colors[i] }}>
                    {scenarios[i]?.name || `Scenario ${i + 1}`}
                  </h4>
                  <div className="space-y-2">
                    {run.outputs.slice(0, 5).map((o) => (
                      <KPIStat key={o.indicatorId} label={o.indicatorName} value={o.projectedValue} delta={o.delta} deltaPercent={o.deltaPercent} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-3 border-t border-border pt-6">
          <Button variant="outline" onClick={() => { setStep('scenario'); navigate('/scenario'); }}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Scenarios
          </Button>
          <Button
            disabled={completedRuns.length === 0}
            onClick={() => { setStep('proposal'); navigate('/proposal'); }}
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
          >
            Build Proposal <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
