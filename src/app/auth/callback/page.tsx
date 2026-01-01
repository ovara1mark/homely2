import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthCallback() {
  const supabase = await createSupabaseServerClient(); // ✅ await

  await supabase.auth.getSession();
  redirect("/"); // redirect after login
}
