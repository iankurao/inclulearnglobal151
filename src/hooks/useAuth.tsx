"use client"

// This file is typically used in a Create React App or Vite React project.
// In a Next.js project, authentication logic is often handled directly in server components
// or with client-side Supabase client in client components.
// The `useAuth` hook provided in the `hooks/` directory is the correct one for Next.js.

// Example content if this were a standard React app:
// import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// interface AuthContextType {
//   user: any | null;
//   loading: boolean;
//   signInWithOAuth: (provider: 'google' | 'github') => Promise<void>;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user || null);
//       setLoading(false);
//     });

//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user || null);
//       setLoading(false);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   const signInWithOAuth = async (provider: 'google' | 'github') => {
//     await supabase.auth.signInWithOAuth({ provider });
//   };

//   const signOut = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signInWithOAuth, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
