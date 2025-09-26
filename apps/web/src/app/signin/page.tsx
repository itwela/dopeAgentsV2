"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const [isLoading, setIsLoading] = useState(false);

  const authed = useQuery(api.auth.isAuthenticated, {});

  useEffect(() => {
    if (authed === true) router.push("/agents");
  }, [authed, router]);

  if (authed === true) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("password", formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow p-6">
        <div className="mb-4">
          <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
            {step === "signIn" ? "Sign In" : "Sign Up"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          {step === "signUp" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" name="name" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          )}
          <input name="flow" type="hidden" value={step} />
          <button type="submit" disabled={isLoading} className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium">
            {isLoading ? (step === "signIn" ? "Signing in..." : "Creating account...") : (step === "signIn" ? "Sign in" : "Create account")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button type="button" onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")} className="text-sm text-gray-600">
            {step === "signIn" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}


