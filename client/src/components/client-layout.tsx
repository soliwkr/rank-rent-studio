import { type ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ClientSidebar } from "@/components/client-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { WorkspaceProvider, useWorkspace } from "@/lib/workspace-context";
import { Badge } from "@/components/ui/badge";

interface ClientLayoutProps {
  children: ReactNode;
}

function ClientLayoutInner({ children }: ClientLayoutProps) {
  const { selectedWorkspace } = useWorkspace();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ClientSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between gap-2 p-2 border-b">
            <div className="flex items-center gap-2 flex-wrap">
              <SidebarTrigger data-testid="button-client-sidebar-toggle" />
              {selectedWorkspace && (
                <Badge variant="secondary" data-testid="badge-venue-name">
                  {selectedWorkspace.name}
                </Badge>
              )}
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <WorkspaceProvider>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </WorkspaceProvider>
  );
}
