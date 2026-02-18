export interface Community {
  id: string;
  name: string;
  region: string;
  population: number;
  area: string;
  coordinates: { lat: number; lng: number };
  baselineIndicators: Indicator[];
}

export interface Indicator {
  id: string;
  name: string;
  unit: string;
  baselineValue: number;
  currentValue: number;
  source: string;
  category: IndicatorCategory;
  trend: 'up' | 'down' | 'stable';
  confidence: number; // 0-100
}

export type IndicatorCategory = 'heat' | 'environment' | 'food' | 'jobs' | 'health';

export interface Intervention {
  id: string;
  type: InterventionType;
  name: string;
  description: string;
  parameters: Record<string, number | string>;
  targetZones: string[];
  costEstimate: number;
  timelineMonths: number;
}

export type InterventionType = 
  | 'tree_planting' 
  | 'cooling_center' 
  | 'food_program' 
  | 'job_training' 
  | 'mental_health' 
  | 'waste_reduction'
  | 'transit_improvement'
  | 'community_garden';

export interface SimulationRun {
  id: string;
  name: string;
  status: 'queued' | 'running' | 'summarizing' | 'complete' | 'failed';
  interventions: Intervention[];
  inputSnapshot: Record<string, number>;
  outputs: SimulationOutput[];
  uncertainty: number;
  explanation: string;
  createdAt: string;
  completedAt?: string;
}

export interface SimulationOutput {
  indicatorId: string;
  indicatorName: string;
  baselineValue: number;
  projectedValue: number;
  delta: number;
  deltaPercent: number;
  confidence: number;
  drivers: string[];
  secondOrderEffects: string[];
}

export interface ProblemType {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: IndicatorCategory;
  color: string;
  templateIndicators: Indicator[];
  suggestedInterventions: Partial<Intervention>[];
}

export interface Scenario {
  id: string;
  name: string;
  interventions: Intervention[];
  simulationRun?: SimulationRun;
}

export interface BaselineData {
  population: number;
  ageGroups?: { label: string; count: number }[];
  schools: number;
  clinics: number;
  busRoutes: number;
  avgTemperature: number;
  rainfallMm: number;
  treeCanopyPercent: number;
  foodDesertPercent: number;
  unemploymentPercent: number;
  mentalHealthAccessPercent: number;
}

export type AppStep = 
  | 'onboarding' 
  | 'problem' 
  | 'baseline' 
  | 'scenario' 
  | 'comparison' 
  | 'proposal';

export const APP_STEPS: { key: AppStep; label: string; number: number }[] = [
  { key: 'onboarding', label: 'Community', number: 1 },
  { key: 'problem', label: 'Problem', number: 2 },
  { key: 'baseline', label: 'Baseline', number: 3 },
  { key: 'scenario', label: 'Scenarios', number: 4 },
  { key: 'comparison', label: 'Compare', number: 5 },
  { key: 'proposal', label: 'Proposal', number: 6 },
];
