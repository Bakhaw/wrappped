"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { EditIcon, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import AddNewWrapButton from "@/components/AddNewWrapButton";
import Title from "@/components/Title";

import AuthButtons from "./AuthButtons";

function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const currentYear = new Date().getFullYear().toString();

  if (
    !session?.user ||
    status !== "authenticated" ||
    pathname === "/sign-in" ||
    pathname === "/sign-up"
  )
    return null;

  return (
    <header className="flex h-16 items-center gap-4 bg-background px-2 md:px-0 md:py-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-none"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between text-primary"
        >
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="sr-only">Wrappped</span>
            </Link>
            <SheetClose asChild>
              <Link href="/">WRAPPPED</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={`/new-wrap?year=${currentYear}`}>NEW WRAP</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/wrapppers">EXPLORE WRAPPPERS</Link>
            </SheetClose>
          </nav>

          <div className="space-y-2">
            <span className="block font-thin">
              Logged as{" "}
              <span className="font-bold">{session.user.username}</span>{" "}
              <span className="text-sm">({session.user.email})</span>
            </span>

            <AuthButtons />
          </div>
        </SheetContent>
      </Sheet>

      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/">
          <Title className="md:text-xl">WRAPPPED</Title>
        </Link>
      </nav>

      <div className="flex gap-2 ml-auto">
        <AddNewWrapButton />
      </div>
    </header>
  );
}

export default Header;
