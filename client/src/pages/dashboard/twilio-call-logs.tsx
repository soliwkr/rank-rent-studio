import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Play, FileText, Eye } from "lucide-react";

const initialCalls = [
  { id: 1, dateTime: "2026-02-18 14:32", phone: "+1 (555) 234-5678", direction: "Inbound", duration: "3:42", status: "Completed", aiSummary: "Customer inquired about premium plan pricing and feature comparison with competitor products." },
  { id: 2, dateTime: "2026-02-18 11:15", phone: "+1 (555) 345-6789", direction: "Outbound", duration: "1:08", status: "Completed", aiSummary: "Follow-up call regarding account setup and onboarding schedule confirmation." },
  { id: 3, dateTime: "2026-02-17 16:45", phone: "+1 (555) 456-7890", direction: "Inbound", duration: "0:00", status: "Missed", aiSummary: "No summary available - call was not answered." },
  { id: 4, dateTime: "2026-02-17 10:20", phone: "+1 (555) 567-8901", direction: "Inbound", duration: "5:18", status: "Completed", aiSummary: "Technical support request for API integration issues with webhook configuration." },
  { id: 5, dateTime: "2026-02-16 09:00", phone: "+1 (555) 678-9012", direction: "Outbound", duration: "2:30", status: "Voicemail", aiSummary: "Left voicemail regarding upcoming service renewal and new feature announcements." },
];

export default function TwilioCallLogs() {
  const { toast } = useToast();
  const [calls] = useState(initialCalls);
  const [searchQuery, setSearchQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<typeof initialCalls[0] | null>(null);

  const filteredCalls = calls.filter((call) => {
    const matchesSearch = searchQuery === "" ||
      call.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.aiSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDirection = directionFilter === "all" || call.direction.toLowerCase() === directionFilter;
    const matchesStatus = statusFilter === "all" || call.status.toLowerCase() === statusFilter;
    const matchesDateFrom = !dateFrom || call.dateTime >= dateFrom;
    const matchesDateTo = !dateTo || call.dateTime <= dateTo + " 23:59";
    return matchesSearch && matchesDirection && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const handleViewDetails = (call: typeof initialCalls[0]) => {
    setSelectedCall(call);
    setDetailDialogOpen(true);
  };

  const handlePlayRecording = (call: typeof initialCalls[0]) => {
    toast({ title: "Playing recording", description: `Playing recording for call from ${call.phone}` });
  };

  const handleViewTranscript = (call: typeof initialCalls[0]) => {
    toast({ title: "Transcript loaded", description: `Transcript for call from ${call.phone} is ready.` });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Call Logs</h1>

      <div className="flex items-center gap-3 flex-wrap">
        <Input
          type="date"
          className="w-auto"
          data-testid="input-date-from"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="date"
          className="w-auto"
          data-testid="input-date-to"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <Select value={directionFilter} onValueChange={setDirectionFilter}>
          <SelectTrigger className="w-[150px]" data-testid="select-direction">
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        <Input
          placeholder="Search phone or summary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[220px]"
          data-testid="input-search-calls"
        />
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
              {filteredCalls.map((call) => (
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
                      <Button variant="ghost" size="icon" data-testid={`button-play-recording-${call.id}`} onClick={() => handlePlayRecording(call)}>
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-view-transcript-${call.id}`} onClick={() => handleViewTranscript(call)}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" data-testid={`button-view-details-${call.id}`} onClick={() => handleViewDetails(call)}>
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

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Details</DialogTitle>
          </DialogHeader>
          {selectedCall && (
            <div className="space-y-3 py-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date/Time</span>
                <span className="font-medium">{selectedCall.dateTime}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Phone Number</span>
                <span className="font-medium">{selectedCall.phone}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Direction</span>
                <Badge variant={selectedCall.direction === "Inbound" ? "default" : "secondary"}>{selectedCall.direction}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{selectedCall.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={selectedCall.status === "Completed" ? "default" : selectedCall.status === "Missed" ? "destructive" : "secondary"}>{selectedCall.status}</Badge>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">AI Summary</span>
                <p className="text-sm">{selectedCall.aiSummary}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailDialogOpen(false)} data-testid="button-close-details">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
