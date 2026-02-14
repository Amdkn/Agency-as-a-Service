# Agency-as-a-Service (AaaS)

The Autonomous Agency Operating System — a sovereign digital agency platform.

## Architecture

```
apps/
├── dashboard/     # Internal agency dashboard (Vite + React + Supabase)
│   └── Port 3000
└── marketing/     # Public marketing site with 3 industry variants (Vite + React)
    └── Port 3001
        ├── Solaris   — Lead & Market Intelligence
        ├── Nexus     — Business Logic & Automation
        └── Orbiter   — Operations & Fulfillment
```

## Quick Start

```bash
# Install all dependencies
npm run install:all

# Run the dashboard
npm run dev:dashboard

# Run the marketing site
npm run dev:marketing
```

## Deployment (Coolify)

Each app is deployed independently via Coolify. Set the **Base Directory** in Coolify to:
- Dashboard: `apps/dashboard`
- Marketing: `apps/marketing`

### Environment Variables (Dashboard)
```
VITE_SUPABASE_URL=https://supabase.amadeuspace.com
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```
