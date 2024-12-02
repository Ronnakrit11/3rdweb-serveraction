import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar/sidebar-context";
import { headers } from 'next/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force dynamic rendering
  headers();
  
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-col lg:pl-64 transition-all duration-300">
          <Navbar />
          <main className="flex-1 bg-background p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}