# IncluLearn Global

Your comprehensive platform for connecting with special needs resources in Kenya.

## Project Overview

This project aims to create a web platform that connects individuals with special needs, their families, and caregivers to relevant resources in Kenya. This includes health specialists, schools, and outdoor clubs. The platform will feature:

-   **User Authentication**: Secure sign-up and login for different user types.
-   **Resource Search**: Advanced search functionality to find specialists, schools, and clubs based on various criteria.
-   **User Profiles**: Dedicated profiles for specialists, schools, and clubs to showcase their services and facilities.
-   **Favorites**: Users can save their favorite resources for quick access.
-   **Search History**: Users can view their past searches.
-   **Admin Dashboard**: For managing users and resources.

## Technologies Used

-   **Next.js**: React framework for building full-stack web applications.
-   **Tailwind CSS**: For rapid UI development and styling.
-   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
-   **Supabase**: Backend-as-a-Service for authentication, database, and storage.
-   **PostgreSQL**: Relational database managed by Supabase.
-   **pgvector**: PostgreSQL extension for vector similarity search.
-   **OpenAI Embeddings**: For generating embeddings for search functionality.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   pnpm (or npm/yarn)
-   Supabase CLI (optional, for local development)

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

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following:

    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
    OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    \`\`\`

    -   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in your Supabase project settings (API section).
    -   `SUPABASE_SERVICE_ROLE_KEY`: Found in your Supabase project settings (API section). This key has elevated privileges and should only be used on the server-side.
    -   `OPENAI_API_KEY`: Your API key from OpenAI, required for generating embeddings.

4.  **Set up Supabase Database:**

    If you are using a new Supabase project, you can run the SQL scripts to set up the schema and seed initial data.

    a.  **Enable `pgvector` extension:**
        In your Supabase SQL Editor, run:
        \`\`\`sql
        create extension vector;
