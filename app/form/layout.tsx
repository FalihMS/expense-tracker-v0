import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "@/app/globals.css";

import { cn } from "@/lib/utils"
import Header from "@/app/auth/components/header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Personal Expense Tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(user == null){
    redirect('/auth/login')
  }

  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
