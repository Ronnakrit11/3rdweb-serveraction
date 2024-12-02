import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
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
        <div className="flex-1">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}