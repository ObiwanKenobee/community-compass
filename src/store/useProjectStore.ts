import { create } from 'zustand';
import type { AppStep, BaselineData, Community, Intervention, ProblemType, Scenario, SimulationRun } from '@/types';
import { MOCK_COMMUNITIES, MOCK_PROBLEMS } from '@/data/mockData';

interface ProjectState {
  // Navigation
  currentStep: AppStep;
  setStep: (step: AppStep) => void;

  // Community
  selectedCommunity: Community | null;
  selectCommunity: (community: Community) => void;

  // Problem
  selectedProblem: ProblemType | null;
  selectProblem: (problem: ProblemType) => void;

  // Baseline
  baselineData: BaselineData;
  updateBaseline: (data: Partial<BaselineData>) => void;

  // Scenarios
  scenarios: Scenario[];
  activeScenarioId: string | null;
  addScenario: (scenario: Scenario) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  setActiveScenario: (id: string) => void;
  addIntervention: (scenarioId: string, intervention: Intervention) => void;
  removeIntervention: (scenarioId: string, interventionId: string) => void;

  // Simulation
  runSimulation: (scenarioId: string) => void;
  simulationRuns: SimulationRun[];

  // Data
  communities: Community[];
  problems: ProblemType[];

  // Consent
  hasConsented: boolean;
  setConsent: (val: boolean) => void;
}

const DEFAULT_BASELINE: BaselineData = {
  population: 120000,
  schools: 15,
  clinics: 4,
  busRoutes: 8,
  avgTemperature: 32,
  rainfallMm: 850,
  treeCanopyPercent: 12,
  foodDesertPercent: 35,
  unemploymentPercent: 28,
  mentalHealthAccessPercent: 18,
};

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentStep: 'onboarding',
  setStep: (step) => set({ currentStep: step }),

  selectedCommunity: null,
  selectCommunity: (community) => set({ selectedCommunity: community }),

  selectedProblem: null,
  selectProblem: (problem) => set({ selectedProblem: problem }),

  baselineData: DEFAULT_BASELINE,
  updateBaseline: (data) => set((s) => ({ baselineData: { ...s.baselineData, ...data } })),

  scenarios: [],
  activeScenarioId: null,
  addScenario: (scenario) => set((s) => ({ scenarios: [...s.scenarios, scenario], activeScenarioId: scenario.id })),
  updateScenario: (id, updates) => set((s) => ({
    scenarios: s.scenarios.map((sc) => sc.id === id ? { ...sc, ...updates } : sc),
  })),
  setActiveScenario: (id) => set({ activeScenarioId: id }),
  addIntervention: (scenarioId, intervention) => set((s) => ({
    scenarios: s.scenarios.map((sc) =>
      sc.id === scenarioId ? { ...sc, interventions: [...sc.interventions, intervention] } : sc
    ),
  })),
  removeIntervention: (scenarioId, interventionId) => set((s) => ({
    scenarios: s.scenarios.map((sc) =>
      sc.id === scenarioId
        ? { ...sc, interventions: sc.interventions.filter((i) => i.id !== interventionId) }
        : sc
    ),
  })),

  runSimulation: (scenarioId) => {
    const scenario = get().scenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    const runId = `run-${Date.now()}`;
    const run: SimulationRun = {
      id: runId,
      name: `${scenario.name} Run`,
      status: 'queued',
      interventions: scenario.interventions,
      inputSnapshot: { ...get().baselineData } as unknown as Record<string, number>,
      outputs: [],
      uncertainty: 0,
      explanation: '',
      createdAt: new Date().toISOString(),
    };

    set((s) => ({ simulationRuns: [...s.simulationRuns, run] }));

    // Simulate progression
    setTimeout(() => {
      set((s) => ({
        simulationRuns: s.simulationRuns.map((r) =>
          r.id === runId ? { ...r, status: 'running' } : r
        ),
      }));
    }, 800);

    setTimeout(() => {
      set((s) => ({
        simulationRuns: s.simulationRuns.map((r) =>
          r.id === runId ? { ...r, status: 'summarizing' } : r
        ),
      }));
    }, 2000);

    setTimeout(() => {
      const problem = get().selectedProblem;
      const outputs = generateMockOutputs(scenario.interventions, problem?.category || 'heat');
      set((s) => ({
        simulationRuns: s.simulationRuns.map((r) =>
          r.id === runId
            ? {
                ...r,
                status: 'complete',
                outputs,
                uncertainty: Math.round(15 + Math.random() * 20),
                explanation: `Simulation complete. ${scenario.interventions.length} interventions analyzed across ${get().selectedCommunity?.name || 'the community'}. Key drivers: infrastructure changes and environmental factors.`,
                completedAt: new Date().toISOString(),
              }
            : r
        ),
        scenarios: s.scenarios.map((sc) =>
          sc.id === scenarioId
            ? { ...sc, simulationRun: s.simulationRuns.find((r) => r.id === runId) }
            : sc
        ),
      }));
    }, 3500);
  },

  simulationRuns: [],
  communities: MOCK_COMMUNITIES,
  problems: MOCK_PROBLEMS,

  hasConsented: false,
  setConsent: (val) => set({ hasConsented: val }),
}));

function generateMockOutputs(interventions: Intervention[], category: string): SimulationRun['outputs'] {
  const indicators = [
    { id: 'heat_risk', name: 'Heat Illness Risk', baseline: 72 },
    { id: 'tree_cover', name: 'Tree Canopy Cover', baseline: 12 },
    { id: 'food_access', name: 'Food Access Score', baseline: 45 },
    { id: 'employment', name: 'Employment Rate', baseline: 72 },
    { id: 'air_quality', name: 'Air Quality Index', baseline: 65 },
    { id: 'mental_health', name: 'Mental Health Access', baseline: 18 },
    { id: 'cost_index', name: 'Implementation Cost ($M)', baseline: 0 },
    { id: 'community_wellbeing', name: 'Community Wellbeing Score', baseline: 52 },
  ];

  const interventionCount = interventions.length;

  return indicators.map((ind) => {
    const isPositive = ind.id !== 'cost_index' && ind.id !== 'heat_risk';
    const magnitude = (5 + Math.random() * 15) * (interventionCount * 0.6);
    const delta = ind.id === 'cost_index'
      ? interventions.reduce((sum, i) => sum + (i.costEstimate || 0), 0) / 1000000
      : isPositive ? magnitude : -magnitude;
    const projected = Math.max(0, Math.min(100, ind.baseline + delta));

    return {
      indicatorId: ind.id,
      indicatorName: ind.name,
      baselineValue: ind.baseline,
      projectedValue: Math.round(projected * 10) / 10,
      delta: Math.round(delta * 10) / 10,
      deltaPercent: Math.round((delta / Math.max(ind.baseline, 1)) * 100 * 10) / 10,
      confidence: 60 + Math.round(Math.random() * 25),
      drivers: interventions.map((i) => i.name).slice(0, 3),
      secondOrderEffects: [
        'Reduced emergency room visits',
        'Increased property values nearby',
        'Improved school attendance',
      ].slice(0, 1 + Math.floor(Math.random() * 2)),
    };
  });
}
