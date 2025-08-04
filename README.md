# IncluLearn Global

IncluLearn Global is a comprehensive platform designed to connect individuals with special needs resources in Kenya. This project is built with Next.js 15, React 19, Tailwind CSS, and Supabase for authentication and database management. It also incorporates vector search capabilities using OpenAI embeddings for enhanced resource discovery.

## Features

-   **User Authentication**: Secure sign-up and sign-in using Supabase Auth.
-   **Resource Search**: Search for health specialists, schools, and outdoor clubs.
-   **Specialized Flows**: Dedicated sections for Health Specialists, Schools, and Outdoor Clubs.
-   **User Profiles**: Placeholder for future user profiles for specialists, schools, and clubs.
-   **Responsive Design**: Built with Tailwind CSS and shadcn/ui for a modern and responsive user interface.
-   **Vector Search**: Utilizes OpenAI embeddings and Supabase's `pg_vector` extension for semantic search.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   pnpm (recommended package manager)
-   Supabase project (with database and API keys)
-   OpenAI API Key (for embedding generation)

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

    Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual Supabase and OpenAI keys.

    \`\`\`env
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY" # Used for server-side operations and embedding generation
    OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
    \`\`\`

    -   `NEXT_PUBLIC_SUPABASE_URL`: Found in your Supabase project settings -> API.
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in your Supabase project settings -> API (Project API Key -> `anon public`).
    -   `SUPABASE_SERVICE_ROLE_KEY`: Found in your Supabase project settings -> API (Project API Key -> `service_role secret`). **Keep this key secure and do not expose it to the client-side.**
    -   `OPENAI_API_KEY`: Your API key from OpenAI.

4.  **Supabase Database Setup:**

    a.  **Enable `pg_vector` extension:**
        In your Supabase project, navigate to `Database` -> `Extensions` and enable `pg_vector`.

    b.  **Run migrations and seed data:**
        You can use the provided SQL scripts in the `supabase/migrations` and `supabase/` directories.
        Alternatively, if you have Supabase CLI installed and linked to your project, you can run:
        \`\`\`bash
        supabase db push
