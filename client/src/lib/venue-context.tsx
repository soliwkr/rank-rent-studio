import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Workspace } from "@shared/schema";

interface VenueContextType {
  venues: Venue[];
  selectedWorkspace: Venue | null;
  selectWorkspace: (v: Venue | null) => void;
  isLoading: boolean;
}

const VenueContext = createContext<VenueContextType>({
  venues: [],
  selectedWorkspace: null,
  selectWorkspace: () => {},
  isLoading: true,
});

const STORAGE_KEY = "resto_venue_id";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    try { return typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null; } catch { return null; }
  });

  const { data: venues = [], isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/workspaces"],
  });

  const selectedWorkspace = venues.find((v) => v.id === selectedId) || venues[0] || null;

  const selectWorkspace = useCallback((v: Venue | null) => {
    const id = v?.id || null;
    setSelectedId(id);
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return (
    <VenueContext.Provider value={{ venues, selectedWorkspace, selectWorkspace, isLoading }}>
      {children}
    </VenueContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(VenueContext);
}
