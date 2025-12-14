import { ReactNode } from "react";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton>
                <button className="btn btn-outline btn-accent border-2">Sign in</button>
              </SignInButton>
              <SignUpButton>
                <button className="btn btn-accent">Sign up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <div className="h-screen flex items-center justify-center">{children}</div>
    </>
  );
};

export default layout;
