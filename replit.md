# indexFlow - Multi-Tenant Workspace Management SaaS

## Overview
indexFlow is a multi-tenant hospitality booking SaaS platform for restaurants, hotels, and bars. It features a marketing landing page and a full dashboard with modules for content engine (blog), keyword rank tracker, 5x5 local search grid visualization, reservations, contact messages/CRM, and SEO settings. All data is workspace-scoped with a workspace selector in the sidebar.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui components
- **Backend**: Express.js API server
- **Database**: PostgreSQL with Drizzle ORM (mix of serial integer IDs and varchar(36) UUID primary keys)
- **Routing**: wouter (client-side)
- **State**: TanStack React Query
- **Workspace Context**: WorkspaceProvider wraps DashboardLayout, persists selection to localStorage

## Key Files
- `shared/schema.ts` - All data models (37 tables: workspaces, users, workspaceBlogPosts, workspaceDomains, workspaceContentAssets, workspaceCampaigns, rankTrackerKeywords, gridKeywords, gridScanResults, contactMessages, seoIntegrations, reservations, etc.)
- `server/db.ts` - Database connection
- `server/storage.ts` - DatabaseStorage class implementing IStorage interface (workspace-scoped)
- `server/routes.ts` - All API endpoints under /api/ (workspace-scoped)
- `server/seed.ts` - Seed data
- `client/src/App.tsx` - Main router with landing page and dashboard routes
- `client/src/lib/workspace-context.tsx` - Workspace context provider with localStorage persistence
- `client/src/components/app-sidebar.tsx` - Sidebar with workspace selector dropdown
- `client/src/components/dashboard-layout.tsx` - Dashboard layout with active workspace badge
- `client/src/pages/landing.tsx` - Marketing landing page
- `client/src/pages/dashboard/` - Dashboard pages (overview, content, keywords, grid, gsc, leads, reservations, settings)

## Design Tokens
- Primary color: HSL 197 90% 50% (sky blue)
- Font: Inter (sans), Source Serif 4 (serif), JetBrains Mono (mono)
- Dark mode supported via ThemeProvider

## Database Schema Notes
- Core entity: `venues` table (DB name preserved) with owner_id referencing `users`
- Drizzle exports use workspace naming: `workspaces`, `workspaceBlogPosts`, etc.
- JS property names use `workspaceId` while DB columns remain `venue_id` for backward compatibility
- Primary keys: workspaces/users use varchar(36) UUIDs, most other tables use serial integers
- All resource tables have `venue_id` (DB) / `workspaceId` (JS) foreign key referencing workspaces
- Key tables: venues/workspaces, users, venue_blog_posts, venue_domains, venue_content_assets, venue_campaigns, rank_tracker_keywords, grid_keywords, grid_scan_results, contact_messages, seo_integrations, reservations, venue_menus, venue_menu_items, venue_reviews, venue_social_accounts, venue_hours, venue_amenities, venue_photos, venue_staff, staff_schedules, phone_calls, chat_conversations, chat_messages, invoices, invoice_line_items, content_reports, crm_contacts, crm_pipeline_stages, crm_deals
- CRITICAL: Do NOT run db:push - database already has correct schema from SQL import

## Routes
- `/` - Landing page / Home
- `/dashboard` - Dashboard overview
- `/dashboard/content` - Content engine with post CRUD
- `/dashboard/keywords` - Rank tracker (keyword list)
- `/dashboard/grid` - 5x5 local search grid with colored cells
- `/dashboard/gsc` - GSC analytics (placeholder/coming soon)
- `/dashboard/reservations` - Reservation management
- `/dashboard/leads` - Contact messages / CRM
- `/dashboard/settings` - Settings (domains, SEO integrations, API keys)
- `/select-workspace` - Workspace selector page

## API Endpoints
All prefixed with `/api/`:

### Workspaces & Users
- GET/POST `/api/workspaces`, GET/PATCH `/api/workspaces/:id`
- GET `/api/users`

### Content
- GET/POST `/api/blog-posts` (query: ?workspaceId=), GET/PUT/DELETE `/api/blog-posts/:id`
- POST `/api/blog-posts/:id/publish-now`, POST `/api/blog-posts/:id/schedule`
- GET/POST `/api/domains` (query: ?workspaceId=), PATCH/DELETE `/api/domains/:id`
- GET/POST `/api/content-assets`, POST `/api/content-asset-usages`
- GET/POST `/api/campaigns`

### SEO
- GET/POST `/api/rank-keywords`, PATCH/DELETE `/api/rank-keywords/:id`
- GET/POST/DELETE `/api/grid-keywords`
- GET/POST `/api/grid-scan-results`
- GET/PUT `/api/seo-settings`
- POST `/api/seo/validate/:postId` - SEO validation
- GET `/api/seo/link-suggestions/:postId` - Internal link suggestions
- GET `/api/seo/orphan-report` - Find posts with no internal links
- GET `/api/seo/keyword-cannibalization` - Keyword overlap detection

### CRM & Reservations
- GET/POST `/api/contact-messages`, PATCH `/api/contact-messages/:id`
- GET/POST `/api/reservations` (query: ?workspaceId=), PATCH `/api/reservations/:id`

### Invoices
- GET/POST `/api/invoices` (query: ?workspaceId=)
- GET/PATCH/DELETE `/api/invoices/:id`

### Content Reports
- GET/POST `/api/content-reports` (query: ?workspaceId=)
- GET/PATCH/DELETE `/api/content-reports/:id`

### Advanced Endpoints (stubs)
- POST `/api/mdx-preview` - Render MDX to HTML
- POST `/api/ai/generate-content` - SSE streaming content generation
- POST `/api/ai/generate-meta` - Meta title/description generation

## Naming Convention
- **Code/JS**: workspace, workspaceId, Workspace, WorkspaceBlogPost, etc.
- **Database columns**: venue_id, venue_blog_posts, etc. (preserved for backward compatibility)
- **API paths**: /api/workspaces/, ?workspaceId= (no /api/admin/ prefix)
- **Frontend context**: WorkspaceProvider, useWorkspace, selectedWorkspace
- **localStorage key**: indexflow_workspace_id

## Testing Policy
- Do NOT run Playwright e2e tests (run_test). The user has disabled e2e testing permanently.
- Verify changes via curl, logs, and manual inspection only.

## Recent Changes (Feb 2026)
- Complete global rename: venue → workspace across codebase (60+ files, 600+ occurrences)
- Renamed schema.ts exports: venues → workspaces, Venue → Workspace, VenueBlogPost → WorkspaceBlogPost, etc.
- Created workspace-context.tsx replacing venue-context.tsx
- Updated storage.ts: IStorage interface and DatabaseStorage use workspace naming
- Updated routes.ts: /api/workspaces/ endpoints, workspaceId params
- Removed /api/admin/ prefix from all routes
- Removed x-admin-role header authentication pattern
- Session-based auth via Replit auth integration (setupAuth in routes.ts)
- SEO automation module with validation, link suggestions, orphan reports, keyword cannibalization
- Logo asset: @assets/image_1771351451425.png (indexFlow logo)
