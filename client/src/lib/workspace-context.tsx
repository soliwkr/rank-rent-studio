import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
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

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });

  const { data: workspaces = [], isLoading } = useQuery<Workspace[]>({
    queryKey: ["/api/workspaces"],
  });

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
