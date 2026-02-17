# IndexFlow - Programmatic SEO Infrastructure SaaS

## Overview
IndexFlow is a multi-tenant Programmatic SEO Infrastructure SaaS platform. It features a marketing landing page and a full dashboard with modules for content engine, keyword rank tracker, 5x5 local search grid, GSC analytics, and leads/CRM.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui components
- **Backend**: Express.js API server
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: wouter (client-side)
- **State**: TanStack React Query

## Key Files
- `shared/schema.ts` - All data models (users, clients, articles, keywords, gridResults, leads, gscData)
- `server/db.ts` - Database connection
- `server/storage.ts` - DatabaseStorage class implementing IStorage interface
- `server/routes.ts` - All API endpoints under /api/
- `server/seed.ts` - Seed data for demo (4 clients, 12 articles, 12 keywords, 5 grids, 10 leads, GSC data)
- `client/src/App.tsx` - Main router with landing page and dashboard routes
- `client/src/pages/landing.tsx` - Marketing landing page
- `client/src/pages/dashboard/` - All dashboard pages (overview, content, keywords, grid, gsc, leads, settings)

## Design Tokens
- Primary color: HSL 197 90% 50% (sky blue matching IndexFlow logo)
- Font: Inter (sans), Source Serif 4 (serif), JetBrains Mono (mono)
- Dark mode supported via ThemeProvider

## Routes
- `/` - Landing page
- `/dashboard` - Dashboard overview
- `/dashboard/content` - Content engine
- `/dashboard/keywords` - Rank tracker
- `/dashboard/grid` - 5x5 local search grid
- `/dashboard/gsc` - GSC analytics
- `/dashboard/leads` - Leads & CRM
- `/dashboard/settings` - Settings

## API Endpoints
All prefixed with `/api/`:
- GET/POST `/api/clients`
- GET/POST `/api/articles`
- GET/POST `/api/keywords`
- GET/POST `/api/grid-results`
- GET/POST `/api/leads`
- GET/POST `/api/gsc-data`
