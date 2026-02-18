import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import type { Workspace } from "@shared/schema";

interface WorkspaceContextType {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  selectWorkspace: (v: Workspace | null) => void;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspaces: [],
  selectedWorkspace: null,
  selectWorkspace: () => {},
  isLoading: true,
});

const STORAGE_KEY = "indexflow_workspace_id";

const RESERVED_PATHS = [
  "admin", "select-workspace", "preview", "api",
  "how-it-works", "solutions", "platform", "pricing", "blog", "templates",
  "contact", "book-demo", "faq", "about", "privacy", "terms", "docs",
  "comparisons", "features", "locations", "portfolio", "testimonials",
  "case-studies", "widget-demo", "client-login", "dev",
  "demo-sms", "demo-email", "demo-reminder", "demo-cms", "demo-chat",
];

function getWorkspaceIdFromPath(path: string): string | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length >= 2 && !RESERVED_PATHS.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const urlWorkspaceId = getWorkspaceIdFromPath(location);

  const [selectedId, setSelectedId] = useState<string | null>(() => {
    if (urlWorkspaceId) return urlWorkspaceId;
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });

  const { data: workspaces = [], isLoading } = useQuery<Workspace[]>({
    queryKey: ["/api/workspaces"],
  });

  useEffect(() => {
    if (urlWorkspaceId && urlWorkspaceId !== selectedId) {
      setSelectedId(urlWorkspaceId);
      try { localStorage.setItem(STORAGE_KEY, urlWorkspaceId); } catch {}
    }
  }, [urlWorkspaceId, selectedId]);

  const selectedWorkspace = workspaces.find((v) => v.id === selectedId) || workspaces[0] || null;

  const selectWorkspace = useCallback((v: Workspace | null) => {
    const id = v?.id || null;
    setSelectedId(id);
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return (
    <WorkspaceContext.Provider value={{ workspaces, selectedWorkspace, selectWorkspace, isLoading }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
