"use client";

import { useState, useContext } from "react";
import { supabase } from "@/lib/supabase/browser";
import toast, { Toaster } from "react-hot-toast";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import Logo from "@/components/Layout/Header/BrandLogo/Logo";
import { useRouter } from "next/navigation";

const Signin = ({ signInOpen }: { signInOpen?: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authDialog = useContext(AuthDialogContext);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      authDialog?.setIsFailedDialogOpen(true);
      setTimeout(() => authDialog?.setIsFailedDialogOpen(false), 1200);
      return;
    }

    toast.success("Signed in successfully");
    authDialog?.setIsSuccessDialogOpen(true);

    setTimeout(() => {
      authDialog?.setIsSuccessDialogOpen(false);
      signInOpen?.(false); // ✅ only call if exists
      router.push("/"); // ✅ redirect to homepage or dashboard
    }, 1200);
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="mb-10 text-center flex justify-center">
        <Logo />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full mb-6 rounded-2xl bg-red-500 py-3 text-white"
      >
        Continue with Google
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-2xl border px-5 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-2xl border px-5 py-3"
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary py-3 text-white"
        >
          Sign In
        </button>
      </form>

      <Toaster />
    </>
  );
};

export default Signin;
