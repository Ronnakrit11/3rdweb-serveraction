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
        <div className="grid gap-6 md:gap-8">
          <div className={cn("grid gap-4 md:gap-6", className)} {...props}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}