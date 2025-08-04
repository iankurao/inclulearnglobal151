# IncluLearn Global

IncluLearn Global is a comprehensive platform designed to connect families with special needs resources in Kenya. This application helps users find health specialists, special needs schools, and inclusive outdoor clubs.

## Features

-   **User Authentication**: Secure sign-in and sign-up powered by Supabase.
-   **Resource Search**: Discover health specialists, schools, and outdoor clubs.
-   **Categorized Flows**: Dedicated sections for each resource type.
-   **Responsive Design**: Built with Next.js and Tailwind CSS for a seamless experience across devices.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (or npm/yarn)
-   Supabase project with database configured (see `supabase/complete_setup.sql` for schema)

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

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of your project and add your Supabase credentials:
    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    \`\`\`
    You can find these in your Supabase project settings under `API`.

4.  **Run the development server:**
    \`\`\`bash
    pnpm dev
    \`\`\`

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is designed to be deployed on Vercel. Ensure your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are configured in your Vercel project settings.
