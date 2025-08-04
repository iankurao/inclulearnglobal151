# IncluLearn Global

This is a Next.js application for IncluLearn Global, a platform connecting users with special needs resources in Kenya.

## Features

- User authentication (Sign In/Sign Up)
- Search and browse Health Specialists
- Search and browse Special Needs Schools
- Search and browse Inclusive Outdoor Clubs
- Responsive design

## Technologies Used

- Next.js (App Router)
- React
- Tailwind CSS
- Shadcn/ui
- Supabase (for authentication and database)
- Lucide React Icons

## Setup and Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/iankurao/inclulearnglobal151.git
    cd inclulearnglobal151
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    pnpm install
    \`\`\`

3.  **Set up Supabase:**
    - Create a new Supabase project.
    - Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase project settings (API section).
    - Set up the database schema using the SQL scripts in the `supabase/migrations` directory. You can run these directly in your Supabase SQL editor or use the Supabase CLI.
    - Create a `.env.local` file in the root of your project and add your Supabase credentials:
