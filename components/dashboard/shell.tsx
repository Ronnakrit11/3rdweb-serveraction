import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container grid gap-12 px-4 py-8 md:py-12">
          <div className={cn("grid gap-6", className)} {...props}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}