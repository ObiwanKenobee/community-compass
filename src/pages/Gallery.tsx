import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Search, Filter, Globe, Users, ArrowRight, Loader2, Heart, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_COMMUNITIES } from '@/data/mockData';

interface PublishedProject {
  id: string;
  title: string;
  community_name: string;
  community_region: string;
  problem_category: string;
  problem_title: string;
  summary: string | null;
  interventions: unknown[];
  outcomes: unknown[];
  student_count: number | null;
  school_name: string | null;
  created_at: string;
}

const PROBLEM_FILTERS = [
  { key: 'all', label: 'All Problems' },
  { key: 'heat', label: 'Urban Heat' },
  { key: 'environment', label: 'Flooding & Water' },
  { key: 'food', label: 'Food Insecurity' },
  { key: 'jobs', label: 'Youth Employment' },
  { key: 'health', label: 'Mental Health' },
];

const CITY_FILTERS = [
  { key: 'all', label: 'All Cities' },
  ...MOCK_COMMUNITIES.map((c) => ({ key: c.region, label: c.region })),
];

// Sample projects for the gallery demo
const SAMPLE_PROJECTS: PublishedProject[] = [
  {
    id: 'sample-1',
    title: 'Cooling KaMavota: 10,000 Trees Initiative',
    community_name: 'KaMavota District',
    community_region: 'Maputo, Mozambique',
    problem_category: 'heat',
    problem_title: 'Urban Heat',
    summary: 'Students modeled the impact of planting 10,000 trees across 5 zones, projecting a 12% reduction in heat illness risk and 8% increase in tree canopy coverage.',
    interventions: [{ name: 'Plant 10,000 Trees' }, { name: 'Add 2 Cooling Centers' }],
    outcomes: [{ name: 'Heat Risk', delta: -12 }, { name: 'Tree Cover', delta: +8 }],
    student_count: 24,
    school_name: 'Maputo Secondary School',
    created_at: '2026-01-15T10:00:00Z',
  },
  {
    id: 'sample-2',
    title: 'Kibera Food Access Network',
    community_name: 'Kibera',
    community_region: 'Nairobi, Kenya',
    problem_category: 'food',
    problem_title: 'Food Insecurity',
    summary: 'A student-led model of community gardens and school meal programs, showing projected 22% improvement in food access scores across 3 zones.',
    interventions: [{ name: 'Community Gardens (5 sites)' }, { name: 'School Meal Subsidy' }, { name: 'Food Waste Reduction' }],
    outcomes: [{ name: 'Food Access', delta: +22 }, { name: 'Cost', delta: 530 }],
    student_count: 18,
    school_name: 'Kibera Academy',
    created_at: '2026-02-01T14:00:00Z',
  },
  {
    id: 'sample-3',
    title: 'Surulere Youth Skills Accelerator',
    community_name: 'Surulere',
    community_region: 'Lagos, Nigeria',
    problem_category: 'jobs',
    problem_title: 'Youth Employment',
    summary: 'Digital skills bootcamp model for 500 youth with projected 15% improvement in youth employment rates and secondary effects on school attendance.',
    interventions: [{ name: 'Youth Tech Training' }, { name: 'Bus Route Expansion' }],
    outcomes: [{ name: 'Employment', delta: +15 }, { name: 'Attendance', delta: +5 }],
    student_count: 30,
    school_name: 'Surulere Community College',
    created_at: '2026-02-10T09:00:00Z',
  },
  {
    id: 'sample-4',
    title: 'Mental Health Access Initiative',
    community_name: 'KaMavota District',
    community_region: 'Maputo, Mozambique',
    problem_category: 'health',
    problem_title: 'Mental Health',
    summary: 'Mobile counseling units and peer support networks modeled to increase mental health access by 28% in underserved zones.',
    interventions: [{ name: 'Mobile Counseling Units' }],
    outcomes: [{ name: 'Mental Health Access', delta: +28 }],
    student_count: 12,
    school_name: 'Maputo Secondary School',
    created_at: '2026-01-28T11:00:00Z',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  heat: 'bg-[hsl(var(--chart-heat))]',
  environment: 'bg-[hsl(var(--chart-tree))]',
  food: 'bg-[hsl(var(--chart-food))]',
  jobs: 'bg-[hsl(var(--chart-jobs))]',
  health: 'bg-[hsl(var(--chart-health))]',
};

export default function Gallery() {
  const [projects, setProjects] = useState<PublishedProject[]>(SAMPLE_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [problemFilter, setProblemFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('published_projects')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        const mapped = data.map((d) => ({
          ...d,
          interventions: (d.interventions as unknown[]) || [],
          outcomes: (d.outcomes as unknown[]) || [],
        }));
        setProjects([...mapped, ...SAMPLE_PROJECTS]);
      }
    } catch {
      // Fall back to sample data
    } finally {
      setLoading(false);
    }
  };

  const filtered = projects.filter((p) => {
    if (problemFilter !== 'all' && p.problem_category !== problemFilter) return false;
    if (cityFilter !== 'all' && p.community_region !== cityFilter) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.community_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <AppLayout hideSteps>
      <div className="container max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Community Gallery</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Explore what students tested and the interventions they proposed for their communities.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Problem:</span>
            </div>
            {PROBLEM_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setProblemFilter(f.key)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  problemFilter === f.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground flex items-center">City:</span>
            {CITY_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setCityFilter(f.key)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                  cityFilter === f.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4 font-mono">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No projects match your filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-border bg-gradient-card p-5 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-2 h-2 rounded-full', CATEGORY_COLORS[p.problem_category] || 'bg-primary')} />
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">{p.problem_title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {p.community_name}, {p.community_region}
                </p>

                {p.summary && (
                  <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3 line-clamp-2">
                    {p.summary}
                  </p>
                )}

                {/* Interventions */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(p.interventions as { name: string }[]).map((int, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">
                      {int.name}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    {p.school_name && <span>{p.school_name}</span>}
                    {p.student_count && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {p.student_count} students
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-muted-foreground hover:text-accent transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
