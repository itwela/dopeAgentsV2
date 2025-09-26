"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(`${step === "signIn" ? "Signing in" : "Signing up"}...`);
    try {
      const formData = new FormData(event.currentTarget);
      
      // Log form data for debugging
      console.log("Form data:", {
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        organization: formData.get("organization"),
        flow: formData.get("flow")
      });
      
      await signIn("password", formData);
      console.log(`${step === "signIn" ? "Signed in" : "Account created"} successfully!`);
    } catch (error) {
      console.error(`Error ${step === "signIn" ? "signing in" : "signing up"}:`, error);
    } finally {
      setIsLoading(false);
      console.log("Loading complete");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {step === "signIn" ? "Welcome back" : "Create account"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === "signIn" 
                ? "Sign in to your account to continue" 
                : "Enter your information to create your account"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="m@example.com"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                />
              </div>
              {step === "signUp" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    type="text" 
                    placeholder="Your full name"
                    required 
                  />
                </div>
              )}
              {step === "signUp" && (
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization" 
                    name="organization" 
                    type="text" 
                    placeholder="Your organization"
                    required 
                  />
                </div>
              )}
              <input name="flow" type="hidden" value={step} />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                    {step === "signIn" ? "Signing in..." : "Creating account..."}
                  </div>
                ) : (
                  step === "signIn" ? "Sign in" : "Create account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")} 
                className="text-sm"
              >
                {step === "signIn" 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



