# IncluLearn Global

IncluLearn Global is a comprehensive platform designed to connect individuals with special needs resources in Kenya. This platform aims to simplify the search for health specialists, schools, and outdoor clubs, providing a centralized hub for information and support.

## Features

- **User Authentication:** Secure sign-up and login for users.
- **Resource Search:** Search and filter health specialists, schools, and outdoor clubs based on various criteria.
- **AI-Powered Recommendations:** Get personalized recommendations for resources based on user preferences and search history.
- **User Profiles:** Dedicated profiles for health specialists, schools, and outdoor clubs to showcase their services and facilities.
- **Favorites:** Users can save their favorite resources for quick access.
- **Search History:** Track past searches for easy re-access.

## Technologies Used

- **Next.js:** React framework for building performant web applications.
- **React:** Frontend library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for rapid styling.
- **shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
- **Supabase:** Open-source Firebase alternative for database, authentication, and storage.
- **OpenAI API:** For generating vector embeddings for AI-powered search and recommendations.
- **pnpm:** Fast, disk space efficient package manager.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (install with `npm install -g pnpm`)
- Git
- Supabase project set up with the provided schema and migrations.
- OpenAI API Key

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/iankurao/inclulearnglobal151.git
    cd inclulearnglobal151
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    pnpm install
    \`\`\`

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add the following:

    \`\`\`env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    \`\`\`
    Replace the placeholder values with your actual Supabase project URL, Supabase Anon Key, and OpenAI API Key.

4.  **Run Supabase Migrations (if not already done):**
    Ensure your Supabase database is set up with the necessary tables and functions. You can use the SQL migration files provided in the `supabase/migrations` directory.

5.  **Run the development server:**
    \`\`\`bash
    pnpm dev
    \`\`\`

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Vercel

1.  **Connect your Git repository** to Vercel.
2.  **Configure Environment Variables** on Vercel (same as `.env.local`):
    *   `NEXT_PUBLIC_SUPABASE_URL`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    *   `OPENAI_API_KEY`
    *   **Crucially, add `INSTALL_COMMAND` with value `pnpm install`**
3.  **Trigger a new deployment** on Vercel. If issues persist, try "Redeploy without Build Cache".

## Project Structure

\`\`\`
.
├── app/                  # Next.js App Router pages and layouts
│   ├── auth/             # Authentication page
│   ├── globals.css       # Global CSS styles
│   ├── layout.tsx        # Root layout for the application
│   ├── loading.tsx       # Loading UI
│   ├── not-found.tsx     # 404 Not Found page
│   └── page.tsx          # Main application entry point (server component)
├── components/           # Reusable React components
│   ├── AuthFormClient.tsx
│   ├── HealthSpecialistFlow.tsx
│   ├── MainAppClient.tsx
│   ├── OutdoorClubsFlow.tsx
│   ├── SchoolSearchFlow.tsx
│   ├── theme-provider.tsx
│   ├── mode-toggle.tsx
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
│   └── useAuth.tsx       # Authentication context hook
├── lib/                  # Utility functions and configurations
│   ├── supabase/         # Supabase client setup (client and server)
│   ├── utils.ts          # General utility functions (e.g., `cn`)
│   └── vectorSearch.ts   # Vector search related functions
├── public/               # Static assets
├── scripts/              # Database scripts (e.g., embedding generation)
├── supabase/             # Supabase project configuration and migrations
├── .gitignore            # Git ignore file
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
├── pnpm-lock.yaml        # pnpm lock file
├── postcss.config.mjs    # PostCSS configuration for Tailwind CSS
├── README.md             # Project README
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
