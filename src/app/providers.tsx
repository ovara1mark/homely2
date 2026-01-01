"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/browser";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {});
    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
}
