import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, RefreshCw, Eye, RotateCcw } from "lucide-react";

const cmsProviders = [
  { id: "wordpress", name: "WordPress", connected: true, lastSync: "2026-02-18 09:30", postsSynced: 45 },
  { id: "webflow", name: "Webflow", connected: true, lastSync: "2026-02-17 14:00", postsSynced: 12 },
  { id: "shopify", name: "Shopify", connected: false, lastSync: null, postsSynced: 0 },
  { id: "ghost", name: "Ghost", connected: false, lastSync: null, postsSynced: 0 },
  { id: "wix", name: "Wix", connected: false, lastSync: null, postsSynced: 0 },
];

const syncLogs = [
  { id: 1, date: "2026-02-18 09:30", cms: "WordPress", postsSynced: 3, status: "Success", errors: 0 },
  { id: 2, date: "2026-02-17 14:00", cms: "Webflow", postsSynced: 2, status: "Success", errors: 0 },
  { id: 3, date: "2026-02-16 10:15", cms: "WordPress", postsSynced: 5, status: "Partial", errors: 1 },
  { id: 4, date: "2026-02-15 08:00", cms: "WordPress", postsSynced: 0, status: "Failed", errors: 3 },
];

export default function SeoCms() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-page-title">CMS Integration</h1>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cmsProviders.map((cms) => (
          <Card key={cms.id} data-testid={`card-cms-${cms.id}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="font-bold">{cms.name}</h3>
                <Badge variant={cms.connected ? "default" : "secondary"} data-testid={`badge-cms-status-${cms.id}`}>
                  {cms.connected ? "Connected" : "Not Connected"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Last sync: {cms.lastSync || "Never"}</p>
                <p>Posts synced: {cms.postsSynced}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm" data-testid={`button-configure-${cms.id}`}>
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
                <Button size="sm" disabled={!cms.connected} data-testid={`button-sync-${cms.id}`}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Sync Posts
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sync Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>CMS</TableHead>
                <TableHead>Posts Synced</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Errors</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {syncLogs.map((log) => (
                <TableRow key={log.id} data-testid={`row-sync-log-${log.id}`}>
                  <TableCell className="text-muted-foreground">{log.date}</TableCell>
                  <TableCell className="font-medium">{log.cms}</TableCell>
                  <TableCell data-testid={`text-synced-${log.id}`}>{log.postsSynced}</TableCell>
                  <TableCell>
                    <Badge
                      variant={log.status === "Success" ? "default" : log.status === "Failed" ? "destructive" : "secondary"}
                      data-testid={`badge-sync-status-${log.id}`}
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.errors}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-view-log-${log.id}`}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-retry-log-${log.id}`}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
