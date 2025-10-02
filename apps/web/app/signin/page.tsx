"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import Image from "next/image";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [step, setStep] = useState<"signUp" | "signIn">("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [showCustomName, setShowCustomName] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const authed = useQuery(api.auth.isAuthenticated, {});
  const employeeNames = useQuery(api.employeeProfiles.getEmployeeNames, {});

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
    setError("");

    console.log(`${step === "signIn" ? "Signing in" : "Signing up"}...`);
    try {
      const formData = new FormData(event.currentTarget);
      
      // Basic validation
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      if (!email || !password) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      if (step === "signUp") {
        const name = (formData.get("name") as string) || "";
        const organization = formData.get("organization") as string;
        
        if (!name.trim() || !organization) {
          setError("Please fill in all required fields");
          setIsLoading(false);
          return;
        }
      }
      
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
    } catch (error: any) {
      console.error(`Error ${step === "signIn" ? "signing in" : "signing up"}:`, error);
      
      // Handle specific error messages
      const errorMessage = error?.message || error?.toString() || "";
      
      if (errorMessage.includes("already exists") || errorMessage.includes("duplicate")) {
        setError("An account with this email already exists. Please sign in instead.");
      } else if (errorMessage.includes("Invalid") || errorMessage.includes("credentials")) {
        setError("Invalid email or password. Please try again.");
      } else if (errorMessage.includes("not found")) {
        setError("Account not found. Please sign up first.");
      } else {
        setError(
          step === "signIn" 
            ? "Failed to sign in. Please check your credentials and try again." 
            : "Failed to create account. This email may already be registered."
        );
      }
    } finally {
      setIsLoading(false);
      console.log("Loading complete");
    }
  };

  const computedName = (customName || "").trim() || selectedEmployee;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div 
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <Image 
            src="/character.png" 
            alt="Character" 
            width={50} 
            height={50}
            priority
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="space-y-1">
              <motion.div variants={itemVariants}>
                <CardTitle className="text-2xl text-center">
                  {step === "signIn" ? "Welcome back" : "Create account"}
                </CardTitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                <CardDescription className="text-center">
                  {step === "signIn" 
                    ? "Sign in to your account to continue" 
                    : "Enter your information to create your account"
                  }
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              {error && (
                <motion.div 
                  className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 flex items-start gap-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </motion.div>
              )}
              <motion.form onSubmit={handleSubmit} className="space-y-4" variants={itemVariants}>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="m@example.com"
                    required 
                  />
                </motion.div>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required 
                  />
                </motion.div>
                {step === "signUp" && (
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="name">Name</Label>
                    <Select 
                      value={selectedEmployee} 
                      onValueChange={setSelectedEmployee}
                      disabled={showCustomName}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your name" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeNames && employeeNames.length > 0 ? (
                          employeeNames.map((employee) => (
                            <SelectItem key={employee._id} value={employee.name}>
                              {employee.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="loading" disabled>
                            Loading employees...
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground">
                      Don&apos;t see your name? {" "}
                      <button
                        type="button"
                        onClick={() => setShowCustomName((v) => !v)}
                        className="underline underline-offset-2"
                      >
                        {showCustomName ? "Use the list instead" : "Type it instead"}
                      </button>
                    </div>
                    {showCustomName && (
                      <div className="space-y-2 mt-2">
                        <Label htmlFor="customName">Enter your name</Label>
                        <Input 
                          id="customName" 
                          name="customName" 
                          type="text" 
                          placeholder="Your full name"
                          value={customName}
                          onChange={(e) => setCustomName(e.target.value)}
                        />
                      </div>
                    )}
                    <input type="hidden" name="name" value={computedName} />
                  </motion.div>
                )}
                {step === "signUp" && (
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <Label htmlFor="organization">Organization</Label>
                    <Input 
                      id="organization" 
                      name="organization" 
                      type="text" 
                      placeholder="Your organization"
                      required 
                    />
                  </motion.div>
                )}
                <input name="flow" type="hidden" value={step} />
                <motion.div variants={itemVariants}>
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
                </motion.div>
              </motion.form>

              <motion.div className="mt-6 text-center" variants={itemVariants}>
                <Button 
                  variant="ghost" 
                  type="button" 
                  onClick={() => {
                    setStep(step === "signIn" ? "signUp" : "signIn");
                    setError("");
                  }} 
                  className="text-sm"
                >
                  {step === "signIn" 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}



