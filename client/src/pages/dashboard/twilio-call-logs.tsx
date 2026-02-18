import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Play, FileText, Eye } from "lucide-react";

const sampleCalls = [
  { id: 1, dateTime: "2026-02-18 14:32", phone: "+1 (555) 234-5678", direction: "Inbound", duration: "3:42", status: "Completed", aiSummary: "Customer inquired about premium plan pricing and feature comparison with competitor products." },
  { id: 2, dateTime: "2026-02-18 11:15", phone: "+1 (555) 345-6789", direction: "Outbound", duration: "1:08", status: "Completed", aiSummary: "Follow-up call regarding account setup and onboarding schedule confirmation." },
  { id: 3, dateTime: "2026-02-17 16:45", phone: "+1 (555) 456-7890", direction: "Inbound", duration: "0:00", status: "Missed", aiSummary: "No summary available - call was not answered." },
  { id: 4, dateTime: "2026-02-17 10:20", phone: "+1 (555) 567-8901", direction: "Inbound", duration: "5:18", status: "Completed", aiSummary: "Technical support request for API integration issues with webhook configuration." },
  { id: 5, dateTime: "2026-02-16 09:00", phone: "+1 (555) 678-9012", direction: "Outbound", duration: "2:30", status: "Voicemail", aiSummary: "Left voicemail regarding upcoming service renewal and new feature announcements." },
];

export default function TwilioCallLogs() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Call Logs</h1>

      <div className="flex items-center gap-3 flex-wrap">
        <Input type="date" className="w-auto" data-testid="input-date-from" />
        <span className="text-muted-foreground">to</span>
        <Input type="date" className="w-auto" data-testid="input-date-to" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]" data-testid="select-direction">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]" data-testid="select-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="voicemail">Voicemail</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date/Time</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AI Summary</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCalls.map((call) => (
                <TableRow key={call.id} data-testid={`row-call-${call.id}`}>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{call.dateTime}</TableCell>
                  <TableCell className="font-medium" data-testid={`text-phone-${call.id}`}>{call.phone}</TableCell>
                  <TableCell>
                    <Badge variant={call.direction === "Inbound" ? "default" : "secondary"} data-testid={`badge-direction-${call.id}`}>
                      {call.direction}
                    </Badge>
                  </TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>
                    <Badge variant={call.status === "Completed" ? "default" : call.status === "Missed" ? "destructive" : "secondary"} data-testid={`badge-call-status-${call.id}`}>
                      {call.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground" data-testid={`text-summary-${call.id}`}>
                    {call.aiSummary}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      <Button variant="ghost" size="icon" data-testid={`button-play-recording-${call.id}`}>
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-view-transcript-${call.id}`}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-view-details-${call.id}`}>
                        <Eye className="w-4 h-4" />
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
