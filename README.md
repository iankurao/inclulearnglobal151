# IncluLearn Global

Your comprehensive platform for connecting with special needs resources in Kenya.

## Project Structure

This project is built with Next.js and uses the App Router.

- `app/`: Contains the main application pages and layouts.
  - `app/auth/page.tsx`: Authentication page for sign-in/sign-up.
  - `app/layout.tsx`: Root layout for the entire application, including AuthProvider.
  - `app/loading.tsx`: Loading state for the application.
  - `app/not-found.tsx`: Custom 404 page.
  - `app/page.tsx`: The main landing page.
- `components/`: Reusable React components.
  - `components/AuthFormClient.tsx`: Client component for authentication forms.
  - `components/HealthSpecialistFlow.tsx`: Component for health specialist search flow.
  - `components/MainAppClient.tsx`: Main client-side application wrapper.
  - `components/OutdoorClubsFlow.tsx`: Component for outdoor clubs search flow.
  - `components/SchoolSearchFlow.tsx`: Component for school search flow.
  - `components/theme-provider.tsx`: Theme provider for dark/light mode.
  - `components/ui/`: Shadcn UI components.
- `hooks/`: Custom React hooks.
  - `hooks/use-mobile.tsx`: Hook for detecting mobile devices.
  - `hooks/use-toast.ts`: Hook for displaying toasts.
  - `hooks/useAuth.tsx`: Authentication context and hook for Supabase.
- `lib/`: Utility functions and configurations.
  - `lib/supabase.ts`: Supabase client initialization.
  - `lib/utils.ts`: General utility functions (e.g., `cn` for Tailwind classes).
  - `lib/vectorSearch.ts`: Functions for vector search with Supabase.
- `middleware.ts`: Next.js middleware for authentication and routing.
- `public/`: Static assets.
  - `public/favicon.ico`: Favicon.
  - `public/placeholder-logo.png`, `public/placeholder-logo.png`, `public/placeholder-user.png`, `public/placeholder.png`, `public/placeholder.png`: Placeholder images.
- `scripts/`: Python and SQL scripts for database operations.
  - `scripts/generate_embeddings.py`: Script to generate embeddings.
  - `scripts/update_embeddings.sql`: SQL script to update embeddings.
- `supabase/`: Supabase configuration and migration files.
  - `supabase/complete_setup.sql`: Comprehensive SQL script for initial Supabase setup.
  - `supabase/config.toml`: Supabase CLI configuration.
  - `supabase/migrations/`: Database migration files.
- `postcss.config.mjs`: PostCSS configuration for Tailwind CSS and Autoprefixer.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.

## Getting Started

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-url>
    cd inclulearnglobal101main
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    \`\`\`
3.  **Set up Supabase:**
    *   Create a new Supabase project.
    *   Copy your Supabase URL and Anon Key to your `.env.local` file:
