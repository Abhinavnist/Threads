import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "Home",
    description: "Threads app clone by Abhinav for learning the postgreSQL database ",
  };

  export default function FrontLayout({
    children,
  }: {
    children: React.ReactNode;
  }){ return(
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>)
  }