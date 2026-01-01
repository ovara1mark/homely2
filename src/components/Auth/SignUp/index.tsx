"use client";

import { useState, useContext } from "react";
import { supabase } from "@/lib/supabase/browser";
import toast, { Toaster } from "react-hot-toast";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import Logo from "@/components/Layout/Header/BrandLogo/Logo";
import { useRouter } from "next/navigation";

const SignUp = ({ signUpOpen }: { signUpOpen?: any }) => {
  const [loading, setLoading] = useState(false);
  const authDialog = useContext(AuthDialogContext);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const { data, error } = await supabase.auth.signUp({
      email: form.get("email") as string,
      password: form.get("password") as string,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    // Show email confirmation message
    toast.success(
      "Account created! Please check your email to confirm your account."
    );

    authDialog?.setIsUserRegistered(true);

    setTimeout(() => {
      authDialog?.setIsUserRegistered(false);
      signUpOpen?.(false);
      router.push("/signin"); // redirect to SignIn page after registration
    }, 2000); // 2 seconds delay
  };

  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="mb-10 text-center mx-auto max-w-[160px]">
        <Logo />
      </div>

      <button
        onClick={handleGoogleSignUp}
        className="w-full mb-6 rounded-2xl bg-red-500 py-3 text-white"
      >
        Continue with Google
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="mb-4 w-full rounded-md border px-5 py-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="mb-6 w-full rounded-md border px-5 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-3 text-white"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <Toaster />
    </>
  );
};

export default SignUp;
