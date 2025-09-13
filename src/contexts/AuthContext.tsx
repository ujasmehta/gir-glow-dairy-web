import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: (redirectPath?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// 1. List of allowed admin emails
const ALLOWED_ADMIN_EMAILS = [
  "apmstudio12@gmail.com",
  "ujasmehta@gmail.com",
  "ramdairyfarm25@gmail.com",
  "mitdesai4703@gmail.com",
  // Add more allowed emails here
];
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/* export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);
      setIsLoading(false);
      if (user) {
        console.log("Authenticated user accessing admin:", user.email);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);
      setIsLoading(false);
      if (user) {
        console.log("Authenticated user accessing admin:", user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async (redirectPath = "/") => {
    const redirectUrl = `${window.location.origin}${redirectPath}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    session,
    isLoading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Helper to check if user is allowed
  const isAdminEmail = (email: string | undefined | null) =>
    !!email && ALLOWED_ADMIN_EMAILS.includes(email);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);
      setIsLoading(false);

      // 3. If on /admin, check if user is allowed
      if (window.location.pathname.startsWith("/admin")) {
        if (user && !isAdminEmail(user.email)) {
          alert("You are not authorized to access the admin portal.");
          await supabase.auth.signOut();
          window.location.href = "/";
        }
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);
      setIsLoading(false);

      if (window.location.pathname.startsWith("/admin")) {
        if (user && !isAdminEmail(user.email)) {
          alert("You are not authorized to access the admin portal.");
          await supabase.auth.signOut();
          window.location.href = "/";
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);
};
