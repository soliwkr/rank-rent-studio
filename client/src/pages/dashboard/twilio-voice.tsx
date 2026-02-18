import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

export default function TwilioVoice() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">Voice Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Voice Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="greeting">Greeting Message</Label>
            <Textarea
              id="greeting"
              defaultValue="Hello, thank you for calling! I'm your AI assistant. How can I help you today?"
              className="min-h-[100px]"
              data-testid="textarea-greeting"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice">Voice Selection</Label>
            <Select defaultValue="alloy">
              <SelectTrigger data-testid="select-voice">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alloy">Alloy</SelectItem>
                <SelectItem value="echo">Echo</SelectItem>
                <SelectItem value="fable">Fable</SelectItem>
                <SelectItem value="onyx">Onyx</SelectItem>
                <SelectItem value="nova">Nova</SelectItem>
                <SelectItem value="shimmer">Shimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger data-testid="select-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="forwarding">Call Forwarding Number</Label>
            <Input
              id="forwarding"
              type="tel"
              placeholder="+1 (555) 000-0000"
              defaultValue="+1 (555) 111-2222"
              data-testid="input-forwarding-number"
            />
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-0.5">
              <Label htmlFor="business-hours">Business Hours Only</Label>
              <p className="text-xs text-muted-foreground">Only accept calls during configured business hours</p>
            </div>
            <Switch id="business-hours" defaultChecked data-testid="switch-business-hours" />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button data-testid="button-save-voice">Save</Button>
            <Button variant="outline" data-testid="button-test-call">
              <Phone className="w-4 h-4 mr-2" />
              Test Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
