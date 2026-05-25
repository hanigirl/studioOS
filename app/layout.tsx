import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "Studio OS",
  description: "Studio OS Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <PageContainer>
              {children}
            </PageContainer>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}