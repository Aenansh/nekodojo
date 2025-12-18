"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Ensure you have this component installed
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader2, UserCircle, Sparkles, User, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { updateUser } from "@/app/(auth)/onboarding/action"; // Import the updated action
import { useState } from "react";

interface UserData {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
  bio?: string | null;
}

interface Props {
  initialData: UserData | null;
}

const Onboarding = ({initialData} : Props) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    username: initialData?.name || "",
    bio: initialData?.bio || "",
  });
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.username || formData.username.length < 4) return;

    setLoading(true);
    setError("");

    try {
      // 1. Update Clerk Profile (Client-side)
      // Note: Clerk stores First/Last name natively
      await user.update({
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      // 2. Update Database (Server-side) via Action
      // This syncs everything + saves the Bio to your DB
      await updateUser(formData);

      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.longMessage || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
console.log(formData);
  return (
    <div className="w-full max-w-lg relative z-10">
      <Card className="shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#5d4037] bg-[#1a110d]/90 backdrop-blur-md relative z-10 text-[#eaddcf]">
        <CardHeader className="space-y-3 pb-6 border-b border-[#3e2723]">
          {/* Icon Container */}
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-[#2c1810] to-[#0f0b0a] border border-[#d4af37]/50 rounded-2xl flex items-center justify-center shadow-lg relative group">
            <UserCircle className="size-8 text-[#d4af37] group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center shadow-md border border-[#1a110d]">
              <Sparkles className="size-3 text-[#1a110d]" />
            </div>
          </div>

          <CardTitle className="text-3xl font-bold text-center text-[#d4af37] tracking-tight drop-shadow-sm">
            Complete Your Profile
          </CardTitle>

          <CardDescription className="text-center text-base text-[#a1887f] font-light">
            Tell us a bit about yourself, Ronin.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* USERNAME FIELD */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-xs font-medium text-[#d4af37]/80 uppercase tracking-wider"
              >
                Username <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-4 text-[#5d4037]" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Sensei_Dev"
                  className="pl-10 h-11 bg-[#0f0b0a]/50 border-[#3e2723] text-[#eaddcf] placeholder:text-[#5d4037] focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
                  value={formData.username}
                  onChange={handleChange}
                  minLength={4}
                  required
                />
              </div>
              <p className="text-[10px] text-[#5d4037] flex justify-between">
                <span>Unique identifier</span>
                <span>{formData.username.length} / 4+</span>
              </p>
            </div>

            {/* FIRST & LAST NAME GRID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-xs font-medium text-[#d4af37]/80 uppercase tracking-wider"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Hanzo"
                  className="h-11 bg-[#0f0b0a]/50 border-[#3e2723] text-[#eaddcf] placeholder:text-[#5d4037] focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-xs font-medium text-[#d4af37]/80 uppercase tracking-wider"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Hasashi"
                  className="h-11 bg-[#0f0b0a]/50 border-[#3e2723] text-[#eaddcf] placeholder:text-[#5d4037] focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* BIO FIELD */}
            <div className="space-y-2">
              <Label
                htmlFor="bio"
                className="text-xs font-medium text-[#d4af37]/80 uppercase tracking-wider flex items-center gap-2"
              >
                <FileText className="size-3" /> Bio / Mantra
              </Label>
              <Textarea
                id="bio"
                placeholder="I code to forge my destiny..."
                className="min-h-[100px] bg-[#0f0b0a]/50 border-[#3e2723] text-[#eaddcf] placeholder:text-[#5d4037] focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all resize-none"
                value={formData.bio}
                onChange={handleChange}
                maxLength={160}
              />
              <p className="text-[10px] text-[#5d4037] text-right">{formData.bio.length} / 160</p>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="bg-red-900/20 border-red-900/50 text-red-200 animate-in fade-in slide-in-from-top-1"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold tracking-widest uppercase shadow-md transition-all cursor-pointer 
                           bg-[#d4af37] text-[#1a110d] hover:bg-[#b5952f] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#d4af37]"
              disabled={loading || formData.username.length < 4}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Finalizing...
                </>
              ) : (
                "Enter the Dojo"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col space-y-4 pt-4 border-t border-[#3e2723] bg-[#120c0a]/30">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#3e2723]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1a110d] px-2 text-[#5d4037] tracking-widest">Almost there</span>
            </div>
          </div>

          <p className="text-sm text-center text-[#a1887f]">
            Welcome aboard! We're excited to have you join the Dojo{" "}
            <span className="text-[#d4af37]">🥋</span>
          </p>
        </CardFooter>
      </Card>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#3e2723] tracking-widest font-mono opacity-60">
          NEKODOJO // PROFILE_INIT
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
