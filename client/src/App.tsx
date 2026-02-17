import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { VenueProvider } from "@/lib/venue-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AdminLayout } from "@/components/admin-layout";
import { ClientLayout } from "@/components/client-layout";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import DashboardOverview from "@/pages/dashboard/overview";
import ContentEngine from "@/pages/dashboard/content";
import RankTracker from "@/pages/dashboard/keywords";
import LocalGrid from "@/pages/dashboard/grid";
import LeadsCRM from "@/pages/dashboard/leads";
import ReservationsPage from "@/pages/dashboard/reservations";
import SettingsPage from "@/pages/dashboard/settings";
import AdminOverview from "@/pages/admin/overview";
import AdminContent from "@/pages/admin/content";
import AdminKeywords from "@/pages/admin/keywords";
import AdminGrid from "@/pages/admin/grid";
import AdminReservations from "@/pages/admin/reservations";
import AdminLeads from "@/pages/admin/leads";
import AdminVenues from "@/pages/admin/venues";
import AdminSettings from "@/pages/admin/settings";
import ClientOverview from "@/pages/client/overview";
import ClientContent from "@/pages/client/content";
import ClientKeywords from "@/pages/client/keywords";
import ClientGrid from "@/pages/client/grid";
import ClientReservations from "@/pages/client/reservations";
import ClientLeads from "@/pages/client/leads";
import ClientSettings from "@/pages/client/settings";

function DashboardRoutes() {
  return (
    <VenueProvider>
      <DashboardLayout>
        <Switch>
          <Route path="/dashboard" component={DashboardOverview} />
          <Route path="/dashboard/content" component={ContentEngine} />
          <Route path="/dashboard/keywords" component={RankTracker} />
          <Route path="/dashboard/grid" component={LocalGrid} />
          <Route path="/dashboard/reservations" component={ReservationsPage} />
          <Route path="/dashboard/leads" component={LeadsCRM} />
          <Route path="/dashboard/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    </VenueProvider>
  );
}

function AdminRoutes() {
  return (
    <VenueProvider>
      <AdminLayout>
        <Switch>
          <Route path="/admin" component={AdminOverview} />
          <Route path="/admin/content" component={AdminContent} />
          <Route path="/admin/keywords" component={AdminKeywords} />
          <Route path="/admin/grid" component={AdminGrid} />
          <Route path="/admin/reservations" component={AdminReservations} />
          <Route path="/admin/leads" component={AdminLeads} />
          <Route path="/admin/venues" component={AdminVenues} />
          <Route path="/admin/settings" component={AdminSettings} />
          <Route component={NotFound} />
        </Switch>
      </AdminLayout>
    </VenueProvider>
  );
}

function ClientRoutes() {
  return (
    <VenueProvider>
      <ClientLayout>
        <Switch>
          <Route path="/client" component={ClientOverview} />
          <Route path="/client/content" component={ClientContent} />
          <Route path="/client/keywords" component={ClientKeywords} />
          <Route path="/client/grid" component={ClientGrid} />
          <Route path="/client/reservations" component={ClientReservations} />
          <Route path="/client/leads" component={ClientLeads} />
          <Route path="/client/settings" component={ClientSettings} />
          <Route component={NotFound} />
        </Switch>
      </ClientLayout>
    </VenueProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard/:rest*" component={DashboardRoutes} />
      <Route path="/dashboard" component={DashboardRoutes} />
      <Route path="/admin/:rest*" component={AdminRoutes} />
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/client/:rest*" component={ClientRoutes} />
      <Route path="/client" component={ClientRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
