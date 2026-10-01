# 🌍 Community Twin AI

## Civic Intelligence + Scenario Simulation for Community Futures

> **Build a model of your community. Test an intervention. Understand the trade-offs. Propose what should happen next.**

**Community Twin AI** is a data product with a simulation core for helping students, educators, and communities understand local systems and explore possible interventions.

It is intentionally designed as:

> **Civic dashboard + scenario builder**

rather than a conventional education app.

The product connects:

**Community Data → Baseline Model → Intervention → Simulation → Comparison → Proposal**

The central experience is not chatting with AI.

It is **building, testing, explaining, and communicating a model of reality.**

---

# 🎯 Product Thesis

A community is a system.

Heat affects health.

Trees affect heat.

Food access affects wellbeing.

Jobs affect household resilience.

Infrastructure affects mobility and access.

Community Twin AI makes these relationships visible and allows users to explore:

> **“What could happen if we change one part of the system?”**

The product should help users move from:

```text
Observe
   ↓
Model
   ↓
Experiment
   ↓
Compare
   ↓
Explain
   ↓
Propose
```

---

# 🧠 Product Principles

### 1. Model Reality Before Changing It

Every scenario begins with a baseline.

### 2. Simulate Before Assuming

Interventions are treated as scenarios, not guarantees.

### 3. Explain Every Result

The system should expose assumptions, sources, uncertainty, and drivers.

### 4. Protect People

Student identity and vulnerable community information should never be exposed unnecessarily.

### 5. Design for Real Connectivity

Offline and low-bandwidth use are core product requirements, especially for African deployment environments.

### 6. AI Guides the Model

AI assists structured reasoning rather than becoming a freeform chatbot that hides the underlying model.

---

# 🏗️ Product Surfaces

Community Twin AI has three primary product surfaces:

```text
┌─────────────────────────────────────────────┐
│               COMMUNITY TWIN AI             │
├─────────────────┬───────────────┬───────────┤
│ Student Studio  │ Teacher/Admin │ Community │
│                 │ Console       │ View      │
└─────────────────┴───────────────┴───────────┘
```

---

# 🎓 Student Studio

## The Core Application

The Student Studio is where users:

* Explore a community
* Choose a problem
* Build a baseline
* Define an intervention
* Run a simulation
* Compare scenarios
* Generate a proposal

### Core UX Flow

```text
Onboarding
    ↓
Choose Problem
    ↓
Build Baseline
    ↓
Add Intervention
    ↓
Run Simulation
    ↓
Compare Outcomes
    ↓
Present
```

---

# 🗺️ 01 — Community Snapshot

The first major workspace provides a visual overview of the selected community.

Potential indicators:

```text
Heat
Tree Cover
Food Access
Jobs
School Attendance
Population
Rainfall
Infrastructure
```

### Map

The map can display aggregate community zones and indicators rather than individual people.

Example layers:

```text
Baseline
Heat Exposure
Tree Cover
Food Access
Jobs
Intervention Areas
Simulated Outcomes
```

---

# 📊 Community Snapshot UI

Example:

```text
┌──────────────────────────────────────────────┐
│ COMMUNITY SNAPSHOT                           │
│                                              │
│ Population       120,000                     │
│ Tree Cover       18%                         │
│ Heat Exposure    High                        │
│ Food Access      62%                         │
│ Employment       71%                         │
│ Attendance       88%                         │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │                COMMUNITY MAP             │ │
│ │                                          │ │
│ │       ████         ███                   │ │
│ │    ███████     ●       ███              │ │
│ │      ███             ▲                  │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

# 🧩 02 — Model Builder

The Model Builder defines the community's baseline system.

This is not a freeform spreadsheet.

It is a guided workflow.

## Stepper

```text
1. Population
2. Infrastructure
3. Environment
4. Community Inputs
5. Review Model
```

---

## Population + Demographics

Simple inputs:

```text
Population
Households
Age Groups
Optional Demographic Groups
```

The product should progressively reveal complexity rather than overwhelming the user.

### Structured AI Guidance

Example:

> **You entered a population of 120,000. Would you like to add age groups?**

This is intentionally different from:

> “Ask me anything.”

The AI should guide completion of the model.

---

# 🏫 Infrastructure

Potential variables:

* Schools
* Clinics
* Public transport
* Water points
* Community centers
* Roads
* Cooling infrastructure

Example:

```text
Schools       42
Clinics       8
Bus Routes    14
Water Points  31
```

---

# 🌦️ Environmental Trends

Potential inputs:

* Temperature
* Rainfall
* Flood exposure
* Tree cover
* Water availability
* Agricultural conditions

Historical observations should preserve timestamps and data sources.

---

# 📝 Community Survey Inputs

Optional qualitative or quantitative community inputs can supplement the baseline.

Examples:

* Perceived heat stress
* Food access
* Transport accessibility
* Community priorities

Survey data should be appropriately aggregated and protected.

---

# 🤖 AI Guidance Layer

The AI assistant should operate through structured actions:

```text
Suggest Missing Variable
Explain Indicator
Recommend Relevant Data
Flag Inconsistency
Suggest Starter Model
Explain Relationship
```

Not:

```text
Unlimited Freeform Chat
```

This keeps the underlying data model visible to the learner.

---

# 🧪 03 — Scenario Lab

## The Fun Part

The Scenario Lab transforms users from observers into system designers.

### Intervention Composer

Example:

> **Plant 10,000 trees in zones A/B**

Other examples:

> Add 2 cooling centers.

> Reduce food waste by 30%.

> Add a bus route.

> Expand community gardens.

> Increase water storage capacity.

---

# 🎛️ Intervention Builder

```text
INTERVENTION

Type
[ Tree Planting ▼ ]

Target Area
[ Zone A + Zone B ]

Quantity
[ 10,000 ]

Time Horizon
[ 36 months ]

Estimated Cost
[ Auto-calculated ]

[ Run Simulation ]
```

---

# 🧮 Simulation Core

The simulation engine receives:

```text
Community Baseline
      +
Intervention Parameters
      +
Model Relationships
      +
Time Horizon
      ↓
Simulation Run
      ↓
Outputs
```

Example output:

```text
Heat Exposure         ↓ 12%
Tree Cover             ↑ 8%
Food Access            → 0%
Program Cost           ↑ $420K
```

These values are illustrative.

Simulation results must clearly indicate that they are **modeled scenarios**, not guaranteed real-world outcomes.

---

# 🔁 Second-Order Effects

The product should surface effects users may not have anticipated.

Example:

```text
TREE PLANTING
      ↓
Tree Cover ↑
      ↓
Local Temperature ↓
      ↓
Heat Exposure ↓
      ↓
Potential Health Risk ↓

BUT

Water Demand ↑
      ↓
Maintenance Cost ↑
```

This is one of the most important educational features.

The objective is to teach:

> **Systems have consequences beyond the first-order intervention.**

---

# 📉 04 — Results Dashboard

Simulation results should be presented visually.

Core elements:

```text
KPI Deltas
Charts
Map Differences
Second-Order Effects
Uncertainty
Cost
Equity
Time-to-Result
```

---

# 📊 KPI Stat

Example component:

```tsx
<KPIStat
  label="Heat Exposure"
  baseline={72}
  scenario={60}
  delta={-12}
/>
```

Visual:

```text
HEAT EXPOSURE

Baseline   72
Scenario   60

↓ 12 points
```

---

# 🗺️ Map Difference View

The map should support:

```text
Baseline
    ↔
Scenario
```

Possible visualizations:

* Heatmap changes
* Tree coverage changes
* Service access changes
* Intervention locations
* Risk changes

Users should be able to answer:

> **Where did the scenario make a difference?**

---

# ⚖️ Trade-off Table

Every scenario should surface more than one dimension.

| Dimension       | Scenario A | Scenario B |
| --------------- | ---------: | ---------: |
| Cost            |      $420K |      $610K |
| Equity          |     Medium |       High |
| Impact          |     Medium |       High |
| Time to Results |      18 mo |      30 mo |
| Uncertainty     |     Medium |       High |

The table is not intended to automatically declare a winner.

It makes the trade-offs visible so users can reason about them.

---

# 🔬 05 — Explainability Panel

## No AI BS

Every simulation result should be explainable.

The Explainability Panel displays:

### Assumptions

```text
Tree survival rate
Average rainfall
Water availability
Maintenance capacity
Population exposure
```

### Data Sources

```text
Dataset
Provider
Date
Geography
Resolution
```

### Uncertainty

```text
Low
Medium
High
```

### Drivers

Example:

```text
WHAT DROVE THE CHANGE?

1. Tree cover         41%
2. Heat exposure      29%
3. Population density 18%
4. Rainfall            7%
5. Other               5%
```

The interface should distinguish:

**correlation → model relationship → causal evidence**

rather than presenting every model relationship as proven causality.

---

# 📐 Explainability Object

```ts
export type SimulationExplanation = {
  assumptions: Assumption[]
  dataSources: DataSource[]
  topDrivers: Driver[]
  uncertainty: {
    level: "low" | "medium" | "high"
    range?: [number, number]
  }
  caveats: string[]
}
```

---

# 📄 06 — Proposal Generator

Simulation results become a shareable civic proposal.

## Auto-Filled Structure

```text
Problem
Evidence
Baseline
Intervention
Expected Impact
Trade-offs
Risks
Budget
Timeline
Uncertainty
Next Steps
```

---

# 📝 Example Proposal

```text
COMMUNITY HEAT RESILIENCE PROPOSAL

Problem
Rising heat exposure across Zone A.

Evidence
Baseline model indicates elevated heat
exposure during peak months.

Intervention
Plant 10,000 trees across priority zones.

Expected Impact
Modeled reduction in heat exposure:
12 percentage points.

Cost
Estimated $420,000.

Key Risk
Water availability may limit survival rates.

Recommendation
Pilot in two zones before expansion.
```

The generated document should preserve the distinction between **evidence and modeled expectation**.

---

# 📤 Export

Supported outputs:

```text
Markdown
PDF
Slides
Shareable Web Link
```

Future exports can include:

* Charts
* Maps
* Scenario comparisons
* Sources
* Assumptions
* Methodology

---

# 👩‍🏫 Teacher / Admin Console

The Teacher Console provides governance over student work.

## Core Features

### Class Roster

```text
Students
Classes
Groups
Projects
```

### Permissions

```text
Student
Teacher
Reviewer
Administrator
```

### Project Review

Teachers can:

```text
Review
Edit
Request Changes
Approve
Publish
Archive
```

---

# 🛡️ Public Publishing Workflow

A project does not become public automatically.

```text
Student Draft
     ↓
Teacher Review
     ↓
Safety Check
     ↓
Approval
     ↓
Public Community View
```

This is a hard product boundary.

---

# 🧑‍🤝‍🧑 Community View

A public, read-only space showing approved work.

Visitors can explore:

```text
Project Gallery
Community Problems
What Students Tested
Scenario Results
Proposed Actions
```

Potential calls to action:

```text
Share Feedback
Support a Proposal
Express Sponsorship Interest
```

Public content should contain only information approved for publication.

---

# 🔐 Privacy & Safety

Community Twin AI may involve minors and vulnerable community information.

Privacy is therefore part of the architecture.

## Default Rules

### Student Names

Hidden by default.

### Individual Data

Do not expose personal-level data publicly.

### Geographic Privacy

Use aggregate zones rather than pinpointing:

* Vulnerable individuals
* Sensitive households
* Medical incidents
* Protection cases

### Publication

Teacher/admin approval is required before public sharing.

---

# 🧠 Sensitive Topics

Starter problems can include:

* Heat
* Flooding
* Food insecurity
* Youth employment
* Mental wellbeing

For sensitive topics such as mental health, the platform should focus on **population-level patterns, service access, and community interventions**, not individual diagnosis or automated clinical assessment.

---

# 📱 Offline / Low-Bandwidth Mode

## Africa-First Infrastructure Principle

Community Twin AI should remain useful when connectivity is unreliable.

### Offline capabilities

* Cache baseline data locally
* Draft models offline
* Draft interventions offline
* Save simulation inputs locally
* Queue submissions
* Synchronize when connected

Recommended storage:

```text
IndexedDB
```

Sync pattern:

```text
Offline Draft
    ↓
Local Queue
    ↓
Connection Restored
    ↓
Upload
    ↓
Server Validation
    ↓
Sync Complete
```

The UI should make synchronization state explicit:

```text
● Saved locally
↻ Syncing
✓ Synced
⚠ Sync failed
```

---

# 🏗️ Frontend Architecture

## Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js                 |
| Architecture    | App Router              |
| Language        | TypeScript              |
| Styling         | Tailwind CSS            |
| UI              | shadcn/ui               |
| Server State    | TanStack Query          |
| Local State     | Zustand / Redux Toolkit |
| Maps            | Mapbox GL / MapLibre    |
| Charts          | Recharts                |
| Authentication  | Clerk / Auth.js         |
| Forms           | React Hook Form         |
| Validation      | Zod                     |
| Offline Storage | IndexedDB               |

---

# 🧠 State Architecture

The product has two distinct state classes.

## Server State

Managed through TanStack Query:

```text
Communities
Indicators
Simulation Runs
Projects
Published Proposals
Teacher Reviews
```

## Local Modeling State

Managed with Zustand or Redux Toolkit:

```text
Current Community
Draft Model
Draft Intervention
Scenario Parameters
UI State
Comparison Selection
```

This separation prevents simulation drafting from becoming tightly coupled to server persistence.

---

# 🧩 Core Components

These are the primary reusable components:

```tsx
<KPIStat />
<ScenarioBuilder />
<RunSimulationButton />
<ResultsDashboard />
<AssumptionsDrawer />
<MapPanel />
<CompareScenarios />
<ExportProposal />
```

Additional primitives:

```tsx
<CommunitySnapshot />
<ModelStepper />
<IndicatorCard />
<InterventionPreset />
<UncertaintyMeter />
<TradeoffTable />
<DriverBreakdown />
<ApprovalPanel />
<SyncStatus />
```

---

# 🗂️ Repository Structure

```text
community-twin-ai/
│
├── app/
│   ├── page.tsx
│   ├── onboarding/
│   ├── studio/
│   ├── snapshot/
│   ├── model/
│   ├── scenarios/
│   ├── compare/
│   ├── proposals/
│   ├── teacher/
│   └── community/
│
├── components/
│   ├── dashboard/
│   ├── model-builder/
│   ├── scenarios/
│   ├── maps/
│   ├── charts/
│   ├── explainability/
│   ├── proposals/
│   └── ui/
│
├── features/
│   ├── communities/
│   ├── indicators/
│   ├── interventions/
│   ├── simulations/
│   ├── proposals/
│   ├── publishing/
│   └── offline-sync/
│
├── lib/
│   ├── api/
│   ├── simulation/
│   ├── validation/
│   ├── permissions/
│   ├── privacy/
│   └── offline/
│
├── store/
│   ├── model-store.ts
│   ├── scenario-store.ts
│   └── ui-store.ts
│
├── data/
│   ├── communities/
│   ├── indicators/
│   ├── interventions/
│   └── demo/
│
└── README.md
```

---

# 🧬 Frontend Data Model

The product revolves around four primary objects.

---

## Community

```ts
export type Community = {
  id: string
  name: string
  geometry: GeoJSON.Geometry
  population: number
  indicators: Indicator[]
}
```

---

## Indicator

```ts
export type Indicator = {
  id: string
  name: string
  unit?: string
  baselineValue: number
  source?: string
  updatedAt?: string
  updateCadence?: string
}
```

---

## Intervention

```ts
export type Intervention = {
  id: string
  type: string
  parameters: Record<string, number | string | boolean>
  targetZones: string[]
  costAssumptions?: Record<string, number>
}
```

---

## Simulation Run

```ts
export type SimulationRun = {
  id: string
  status: "queued" | "running" | "summarizing" | "complete" | "failed"

  inputsSnapshot: {
    communityId: string
    intervention: Intervention
  }

  outputsByIndicator: Record<string, number>

  uncertainty?: Record<string, {
    low: number
    median: number
    high: number
  }>

  explanation?: SimulationExplanation

  createdAt: string
  completedAt?: string
}
```

---

# ⚙️ Long-Running Simulation Architecture

Never block the browser while a simulation executes.

## Correct Flow

```text
Student
   ↓
Run Simulation
   ↓
POST /runs
   ↓
Backend returns runId
   ↓
Poll /runs/:id
   ↓
queued
   ↓
running
   ↓
summarizing
   ↓
complete
```

---

# 🔄 Progress UI

Example:

```text
SIMULATION RUN

✓ Validating inputs
✓ Loading baseline
● Running model
○ Calculating second-order effects
○ Preparing explanation
```

The interface remains responsive throughout.

---

# 🧪 Simulation API Contract

Example:

```http
POST /runs
```

Request:

```json
{
  "communityId": "community-001",
  "interventionId": "trees-10000",
  "parameters": {
    "quantity": 10000,
    "targetZones": ["A", "B"],
    "horizonMonths": 36
  }
}
```

Response:

```json
{
  "runId": "run-8472",
  "status": "queued"
}
```

Then:

```http
GET /runs/run-8472
```

---

# 📊 Results Contract

```json
{
  "status": "complete",
  "outputs": {
    "heatExposure": {
      "baseline": 72,
      "scenario": 60
    },
    "treeCover": {
      "baseline": 18,
      "scenario": 26
    }
  },
  "uncertainty": {
    "heatExposure": {
      "low": 56,
      "median": 60,
      "high": 65
    }
  }
}
```

---

# 🔬 Explainability Contract

```json
{
  "assumptions": [
    {
      "name": "Tree survival rate",
      "value": 0.78
    }
  ],
  "drivers": [
    {
      "name": "Tree cover",
      "contribution": 0.41
    }
  ],
  "sources": [
    {
      "name": "Community Climate Dataset",
      "timestamp": "2026-01-01"
    }
  ],
  "caveats": [
    "Long-term maintenance capacity is uncertain."
  ]
}
```

---

# 🗺️ Geospatial Privacy

Public map layers should operate at an appropriate geographic resolution.

Example:

```text
Public:
Zone A

Restricted:
Community Block 14

Never public by default:
Individual Household
Individual Student
Individual Patient
```

The application should enforce privacy at the backend as well as the UI.

---

# 🎨 Design Language

Community Twin AI should feel like:

**Civic Observatory × Climate Intelligence Tool × Research Laboratory**

Visual characteristics:

* Clean
* Calm
* Spatial
* Data-rich
* Human
* Educational without feeling childish
* Institutional without feeling bureaucratic

Avoid:

* Gamified school dashboards
* Excessive gradients
* Chat-first interaction
* Dense data walls
* Artificial intelligence gimmicks

---

# 🧭 Core UX Principle

## The Model Should Be Visible

A student should understand:

```text
Input
 ↓
Relationship
 ↓
Intervention
 ↓
Simulation
 ↓
Outcome
```

The product should never become:

> **“AI says this will happen.”**

It should become:

> **“Given these assumptions and data, the model estimates this outcome.”**

---

# 🚀 MVP Scope

The first release intentionally stays small.

## Goal

> **One community + one problem type + three interventions + one comparison dashboard.**

### Ship

* Onboarding
* Community Snapshot
* 5–8 baseline indicators
* Problem selection
* Starter model template
* Guided Model Builder
* 3 intervention templates
* Simulation run workflow
* Results dashboard
* Scenario comparison
* Explainability panel
* Proposal export
* Teacher approval toggle
* Responsive UI
* Offline drafting foundation

---

# 🚫 Explicitly Out of Scope for V1

Do not build these initially:

* Real-time data streams
* National-scale network
* Full agent-based simulation
* Complex municipal integrations
* Fully autonomous AI decision-making
* Open public student publishing
* Extensive multi-tenant enterprise configuration

The objective is to prove the core loop first.

---

# 🗺️ Example MVP Journey

```text
ONBOARD
   ↓
Choose: Nairobi community
   ↓
Problem: Heat
   ↓
Load starter model
   ↓
Confirm baseline
   ↓
Intervention A:
10,000 trees
   ↓
Run
   ↓
Compare
   ↓
Intervention B:
2 cooling centers
   ↓
Run
   ↓
Compare
   ↓
Review trade-offs
   ↓
Generate proposal
   ↓
Teacher approval
   ↓
Publish
```

---

# ✅ Definition of Done

A student can:

### 1. Pick a community

```text
Community → Area
```

### 2. Pick a problem

```text
Heat
Flooding
Food Insecurity
Youth Jobs
Mental Wellbeing
```

### 3. Build / confirm a baseline

```text
Population
Infrastructure
Environment
Community Inputs
```

### 4. Add an intervention

```text
Template
+
Parameters
+
Target Area
```

### 5. Run a simulation

```text
Queued → Running → Complete
```

### 6. Compare outcomes

```text
Baseline
vs
Scenario A
vs
Scenario B
```

### 7. Explain results

```text
Assumptions
Sources
Uncertainty
Drivers
Trade-offs
```

### 8. Export a proposal

```text
Problem
Evidence
Intervention
Impact
Risks
Budget
Timeline
```

### 9. Publish safely

```text
Draft
→ Teacher Review
→ Approval
→ Community View
```

---

# 📈 MVP Success Criteria

The most important product metric is not time spent in the application.

It is whether the product enables a complete civic reasoning loop.

Measure:

```text
Community Selected
        ↓
Baseline Completed
        ↓
Intervention Created
        ↓
Simulation Completed
        ↓
Scenario Compared
        ↓
Proposal Generated
```

Potential metrics:

* Baseline completion rate
* Scenario completion rate
* Simulation success rate
* Comparison usage
* Proposal generation rate
* Teacher approval rate
* Public proposal engagement
* Offline sync success

---

# 🌍 Why Community Twin AI Matters

Many educational platforms teach people *about* systems.

Many dashboards show people *data about* systems.

Community Twin AI attempts something different:

> **Let people build a simplified model of their own community and test what could happen next.**

That creates a bridge between:

```text
Learning
   +
Data
   +
Systems Thinking
   +
Civic Participation
```

---

# 🧠 The Core Innovation

The breakthrough is not the chatbot.

It is not the map.

It is not even the simulation engine by itself.

The innovation is the workflow:

```text
COMMUNITY
    ↓
BASELINE
    ↓
INTERVENTION
    ↓
SIMULATION
    ↓
TRADE-OFFS
    ↓
EXPLANATION
    ↓
PROPOSAL
```

The user doesn't simply consume information.

They **construct a hypothesis about the future.**

---

# 🌱 Community Twin AI

> **See your community.**

> **Model its systems.**

> **Test what could change.**

> **Understand the trade-offs.**

> **Propose what comes next.**

### Build the future before you build it.
