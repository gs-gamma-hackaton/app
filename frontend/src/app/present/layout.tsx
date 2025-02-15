"use client";

import { GoogleFontsProvider } from "@/components/context/fonts";
import { StoreProvider } from "@/components/context/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <GoogleFontsProvider>{children}</GoogleFontsProvider>
    </StoreProvider>
  );
}
