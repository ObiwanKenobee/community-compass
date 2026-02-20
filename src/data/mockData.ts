import type { Community, ProblemType, Indicator, Intervention } from '@/types';

const makeIndicator = (
  id: string, name: string, unit: string, baseline: number, 
  category: Indicator['category'], source: string, trend: Indicator['trend'] = 'stable'
): Indicator => ({
  id, name, unit, baselineValue: baseline, currentValue: baseline,
  source, category, trend, confidence: 70 + Math.round(Math.random() * 20),
});

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'maputo-kamavota',
    name: 'KaMavota District',
    region: 'Maputo, Mozambique',
    population: 120000,
    area: 'Urban / Peri-Urban',
    coordinates: { lat: -25.97, lng: 32.57 },
    baselineIndicators: [
      makeIndicator('heat_idx', 'Heat Stress Index', 'score', 72, 'heat', 'NOAA / Local Met'),
      makeIndicator('tree_pct', 'Tree Canopy', '%', 12, 'environment', 'Satellite Imagery'),
      makeIndicator('food_access', 'Food Access Score', 'score', 45, 'food', 'WFP Survey 2024'),
      makeIndicator('youth_emp', 'Youth Employment', '%', 34, 'jobs', 'National Census'),
      makeIndicator('attend', 'School Attendance', '%', 71, 'health', 'Ministry of Education'),
    ],
  },
  {
    id: 'nairobi-kibera',
    name: 'Kibera',
    region: 'Nairobi, Kenya',
    population: 250000,
    area: 'Urban Informal Settlement',
    coordinates: { lat: -1.31, lng: 36.78 },
    baselineIndicators: [
      makeIndicator('heat_idx', 'Heat Stress Index', 'score', 68, 'heat', 'NOAA / Local Met'),
      makeIndicator('tree_pct', 'Tree Canopy', '%', 5, 'environment', 'Satellite Imagery'),
      makeIndicator('food_access', 'Food Access Score', 'score', 32, 'food', 'WFP Survey 2024'),
      makeIndicator('youth_emp', 'Youth Employment', '%', 22, 'jobs', 'National Census'),
      makeIndicator('attend', 'School Attendance', '%', 64, 'health', 'Ministry of Education'),
    ],
  },
  {
    id: 'lagos-surulere',
    name: 'Surulere',
    region: 'Lagos, Nigeria',
    population: 500000,
    area: 'Urban Dense',
    coordinates: { lat: 6.50, lng: 3.35 },
    baselineIndicators: [
      makeIndicator('heat_idx', 'Heat Stress Index', 'score', 78, 'heat', 'NOAA / Local Met'),
      makeIndicator('tree_pct', 'Tree Canopy', '%', 8, 'environment', 'Satellite Imagery'),
      makeIndicator('food_access', 'Food Access Score', 'score', 51, 'food', 'WFP Survey 2024'),
      makeIndicator('youth_emp', 'Youth Employment', '%', 41, 'jobs', 'National Census'),
      makeIndicator('attend', 'School Attendance', '%', 76, 'health', 'Ministry of Education'),
    ],
  },
];

export const MOCK_PROBLEMS: ProblemType[] = [
  {
    id: 'heat',
    title: 'Urban Heat',
    description: 'Rising temperatures, heat islands, and lack of cooling infrastructure threaten community health.',
    icon: 'Thermometer',
    category: 'heat',
    color: 'chart-heat',
    templateIndicators: [],
    suggestedInterventions: [
      { type: 'tree_planting', name: 'Urban Tree Planting', description: 'Plant trees in targeted zones', costEstimate: 500000, timelineMonths: 18 },
      { type: 'cooling_center', name: 'Cooling Centers', description: 'Establish community cooling centers', costEstimate: 200000, timelineMonths: 6 },
    ],
  },
  {
    id: 'flooding',
    title: 'Flooding & Water',
    description: 'Flood risk, drainage failures, and water access challenges facing the community.',
    icon: 'Droplets',
    category: 'environment',
    color: 'chart-tree',
    templateIndicators: [],
    suggestedInterventions: [
      { type: 'transit_improvement', name: 'Drainage Upgrade', description: 'Improve drainage systems', costEstimate: 1200000, timelineMonths: 24 },
    ],
  },
  {
    id: 'food',
    title: 'Food Insecurity',
    description: 'Limited access to affordable, nutritious food—especially in food deserts.',
    icon: 'Apple',
    category: 'food',
    color: 'chart-food',
    templateIndicators: [],
    suggestedInterventions: [
      { type: 'community_garden', name: 'Community Gardens', description: 'Establish urban farms and gardens', costEstimate: 150000, timelineMonths: 12 },
      { type: 'food_program', name: 'School Meal Program', description: 'Subsidized meals at schools', costEstimate: 300000, timelineMonths: 3 },
      { type: 'waste_reduction', name: 'Food Waste Reduction', description: 'Reduce food waste by 30%', costEstimate: 80000, timelineMonths: 9 },
    ],
  },
  {
    id: 'jobs',
    title: 'Youth Employment',
    description: 'High youth unemployment and lack of vocational training opportunities.',
    icon: 'Briefcase',
    category: 'jobs',
    color: 'chart-jobs',
    templateIndicators: [],
    suggestedInterventions: [
      { type: 'job_training', name: 'Skills Training Program', description: 'Vocational training for 500+ youth', costEstimate: 400000, timelineMonths: 12 },
    ],
  },
  {
    id: 'mental_health',
    title: 'Mental Health',
    description: 'Limited access to mental health resources and community support systems.',
    icon: 'Heart',
    category: 'health',
    color: 'chart-health',
    templateIndicators: [],
    suggestedInterventions: [
      { type: 'mental_health', name: 'Community Counseling', description: 'Mobile counseling and peer support', costEstimate: 250000, timelineMonths: 6 },
    ],
  },
];

export const INTERVENTION_TEMPLATES: Partial<Intervention>[] = [
  // Heat & Environment
  { type: 'tree_planting', name: 'Plant 10,000 Trees', description: 'Urban reforestation in zones A/B', costEstimate: 500000, timelineMonths: 18 },
  { type: 'cooling_center', name: 'Add 2 Cooling Centers', description: 'Public cooling infrastructure with water stations', costEstimate: 200000, timelineMonths: 6 },
  { type: 'tree_planting', name: 'Green Corridors (3 routes)', description: 'Tree-lined walking paths connecting schools to transit', costEstimate: 350000, timelineMonths: 12 },
  { type: 'cooling_center', name: 'Rooftop Garden Program', description: 'Convert 20 flat rooftops to reflective gardens', costEstimate: 280000, timelineMonths: 14 },
  // Food
  { type: 'waste_reduction', name: 'Reduce Food Waste 30%', description: 'Supply chain optimization + community composting', costEstimate: 80000, timelineMonths: 9 },
  { type: 'community_garden', name: 'Community Gardens (5 sites)', description: 'Urban farming in underutilized lots', costEstimate: 150000, timelineMonths: 12 },
  { type: 'food_program', name: 'School Meal Subsidy', description: 'Nutritious meals for 10,000 students', costEstimate: 300000, timelineMonths: 3 },
  { type: 'food_program', name: 'Mobile Food Market', description: 'Weekly fresh produce truck serving 4 food deserts', costEstimate: 120000, timelineMonths: 6 },
  // Jobs
  { type: 'job_training', name: 'Youth Tech Training', description: 'Digital skills bootcamp for 500 youth', costEstimate: 400000, timelineMonths: 12 },
  { type: 'job_training', name: 'Micro-Enterprise Grants', description: 'Seed funding + mentorship for 100 youth businesses', costEstimate: 250000, timelineMonths: 18 },
  { type: 'job_training', name: 'Green Jobs Pipeline', description: 'Train youth for urban forestry and solar installation', costEstimate: 320000, timelineMonths: 15 },
  // Health
  { type: 'mental_health', name: 'Mobile Counseling Units', description: 'Peer support and professional counseling', costEstimate: 250000, timelineMonths: 6 },
  { type: 'mental_health', name: 'School Wellness Rooms', description: 'Quiet spaces + trained counselors in 10 schools', costEstimate: 180000, timelineMonths: 8 },
  // Transit & Infrastructure
  { type: 'transit_improvement', name: 'Bus Route Expansion', description: 'Add 4 new routes connecting underserved areas', costEstimate: 800000, timelineMonths: 18 },
  { type: 'transit_improvement', name: 'Safe Walking Paths', description: 'Lit, paved walkways in 3 high-risk zones', costEstimate: 450000, timelineMonths: 10 },
  { type: 'transit_improvement', name: 'Solar Street Lighting', description: 'Install 200 solar lights on main routes', costEstimate: 160000, timelineMonths: 6 },
];
