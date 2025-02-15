"use client";

import { LayoutThemeProvider } from "@/components/editor/theme/provider";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import SidebarLeft from "@/components/layout/sidebar-left";
import SidebarRight from "@/components/layout/sidebar-right";
import "./layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutThemeProvider>
      <section className="editor-layout bg-background font-editor">
        <Header className="editor-layout-header" />
        <SidebarLeft className="editor-layout-nav" />
        <SidebarRight className="editor-layout-bar" />
        <main className="editor-layout-viewport flex h-full flex-col items-center justify-center gap-4 py-8 pb-48">
          {children}
        </main>
        <Footer />
      </section>
    </LayoutThemeProvider>
  );
}
