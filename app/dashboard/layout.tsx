import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { headers } from 'next/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await headers();

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <Navbar />
        <main className="flex-1 space-y-4 p-4 pt-20 md:p-8 md:pt-24">
          <div className="container mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}