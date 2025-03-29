import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container flex items-center w-full justify-between py-4 mx-auto px-2 lg:px-4">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-300 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Brevia
          </span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex items-center gap-2">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <div>Pro</div>
            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
