import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthorizedAdmin: boolean;
  isAuthorizedDeliveryAgent: boolean;
  signInWithGoogle: (redirectPath?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [isAuthorizedDeliveryAgent, setIsAuthorizedDeliveryAgent] =
    useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);

      if (user?.email) {
        await checkAuthorization(user.email);
      } else {
        setIsAuthorizedAdmin(false);
        setIsAuthorizedDeliveryAgent(false);
        setIsLoading(false); // Only here if no user
      }
    });

    // Check existing session on mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);

      if (user?.email) {
        await checkAuthorization(user.email);
      } else {
        setIsAuthorizedAdmin(false);
        setIsAuthorizedDeliveryAgent(false);
        setIsLoading(false); // Only here if no user
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthorization = async (email: string) => {
    try {
      const { data: isAdmin } = await supabase.rpc("is_authorized_admin", {
        user_email: email,
      });
      const { data: isAgent } = await supabase.rpc(
        "is_authorized_delivery_agent",
        { user_email: email }
      );

      console.log("isAdmin:", isAdmin, "| isDeliveryAgent:", isAgent);
      setIsAuthorizedAdmin(!!isAdmin);
      setIsAuthorizedDeliveryAgent(!!isAgent);
    } catch (error) {
      console.error("Error checking authorizations:", error);
      setIsAuthorizedAdmin(false);
      setIsAuthorizedDeliveryAgent(false);
    } finally {
      setIsLoading(false); // <-- Always set loading to false
    }
  };

  const signInWithGoogle = async (redirectPath = "/") => {
    const redirectUrl = `${window.location.origin}${redirectPath}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      throw error;
    }
    setIsAuthorizedAdmin(false);
    setIsAuthorizedDeliveryAgent(false);
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthorizedAdmin,
    isAuthorizedDeliveryAgent,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
