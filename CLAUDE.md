# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FinChex is a financial statement analysis tool that helps accountants and auditors identify issues in draft financial statements. It provides a demo workflow for uploading statements, analyzing them for common issues (calculation errors, prior-year mismatches, note reference problems, formatting issues), and generating exception reports.

Built with: Vite, React 18, TypeScript, shadcn/ui, Tailwind CSS, Supabase, TanStack Query

## Development Commands

### Running the application
```bash
npm run dev          # Start development server (localhost:8080)
npm run preview      # Preview production build
```

### Building
```bash
npm run build        # Production build
npm run build:dev    # Development build with dev mode
```

### Testing
```bash
npm test            # Run all tests once
npm run test:watch  # Run tests in watch mode
```

### Linting
```bash
npm run lint        # Run ESLint
```

## Architecture

### Application Flow

1. **Entry Point**: `src/main.tsx` → `src/App.tsx`
2. **Routing**: Uses react-router-dom with routes defined in App.tsx
   - `/` → MarketingPage (landing/signup page)
   - Other routes → NotFound page
3. **Demo Flow** (referenced but not fully routed):
   - StartDemo page: User inputs metadata and uploads files
   - Results page: Displays identified issues with status management

### State Management

**DemoContext** (`src/context/DemoContext.tsx`):
- Centralized state for demo workflow
- Manages metadata (reporting standard, currency, dates, uploaded files)
- Manages issues array (financial statement problems)
- Provides methods: `updateIssueStatus`, `updateIssueComment`, `resetDemo`
- Used via `useDemo()` hook

### Core Data Types (`src/types/index.ts`)

**Issue**: The central data structure representing financial statement problems
- Properties: id, severity (High/Medium/Low), category, title, description, evidence, suggestedFix, status (Open/Cleared), comments
- Four categories: 'Add checks', 'Prior-year mismatch', 'Note reference issues', 'Formatting hygiene'

**Metadata**: User-provided context about financial statements
- Reporting standard (IFRS/UK GAAP), currency, rounding, period end date
- Entity type (single/group)
- File uploads: draft statement, prior year statement, trial balance

### Key Components

**Page Components** (`src/pages/`):
- `MarketingPage.tsx`: Landing page with video embed, pilot signup form (stores to Supabase), comparison table
- `StartDemo.tsx`: Demo initialization form with file uploads and metadata input
- `Results.tsx`: Issue review interface with status toggles and PDF export
- Note: Video embed URL is configured via `VIDEO_EMBED_URL` constant in MarketingPage.tsx

**Feature Components** (`src/components/`):
- `ComparisonTable.tsx`: Side-by-side comparison display
- `IssueCard.tsx`: Individual issue display with status toggle
- `SeverityBadge.tsx`, `StatusBadge.tsx`: Issue metadata indicators
- `SummaryCard.tsx`: Statistics cards for Results page
- `Header.tsx`: Navigation header

**UI Components** (`src/components/ui/`):
- shadcn/ui components (buttons, cards, forms, dialogs, etc.)
- Do not manually edit these files; regenerate using shadcn CLI if needed

### Data & Utilities

**Demo Data** (`src/data/demoIssues.ts`):
- `issueTemplates`: 20 predefined issue templates across 4 categories
- `generateDemoIssues()`: Returns 12-20 random issues for demo
- `generateExampleIssues()`: Returns first 15 issues for example mode

**PDF Generation** (`src/utils/pdfGenerator.ts`):
- `generateExceptionsPDF(metadata, issues)`: Creates formatted exception report
- Uses jsPDF library
- Includes summary stats, issue breakdown by category/severity, detailed issue listings

### Supabase Integration

**Setup** (`src/integrations/supabase/`):
- Client configured in `client.ts` with auth persistence
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`
- Database table: `pilot_signups` (used in MarketingPage)

### Styling

- Tailwind CSS with custom configuration (`tailwind.config.ts`)
- CSS variables for theming in `src/index.css`
- Path alias `@` maps to `src/` directory

## Common Patterns

### Adding a New Issue Category
1. Update the `Category` type in `src/types/index.ts`
2. Add issue templates to `demoIssues.ts` with the new category
3. Update any filtering/grouping logic in Results.tsx

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx` Routes
3. Wrap with DemoProvider if it needs access to demo state
4. Use `useNavigate()` for programmatic navigation

### Working with Forms
- Use react-hook-form with zod validation (@hookform/resolvers)
- shadcn/ui form components are pre-configured
- See StartDemo.tsx for file upload patterns

### Environment Variables
- Create `.env` file with required Supabase credentials
- Access via `import.meta.env.VITE_*` pattern (Vite convention)

## Testing

- Vitest with jsdom environment
- Testing Library (@testing-library/react, @testing-library/jest-dom)
- Setup file: `src/test/setup.ts`
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Example test: `src/test/example.test.ts`

## Notes

- This project was bootstrapped with Lovable (lovable.dev)
- Uses lovable-tagger plugin in development mode for component tracking
- Server runs on port 8080 with IPv6 support (host: "::")
- HMR overlay is disabled in vite.config.ts
