import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MessageSquare, Phone } from "lucide-react";

export default function AiTrainingChannels() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold" data-testid="text-page-title">AI Channels</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card data-testid="card-channel-widget">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              Widget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Label htmlFor="widget-active">Active</Label>
              <Switch id="widget-active" defaultChecked data-testid="switch-widget-active" />
            </div>

            <div className="space-y-2">
              <Label>Personality</Label>
              <Select defaultValue="professional">
                <SelectTrigger data-testid="select-widget-personality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Response Length</Label>
              <Select defaultValue="balanced">
                <SelectTrigger data-testid="select-widget-response-length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button data-testid="button-save-widget-channel">Save</Button>
          </CardContent>
        </Card>

        <Card data-testid="card-channel-twilio">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-muted-foreground" />
              Twilio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <Label htmlFor="twilio-active">Active</Label>
              <Switch id="twilio-active" defaultChecked data-testid="switch-twilio-active" />
            </div>

            <div className="space-y-2">
              <Label>Voice Personality</Label>
              <Select defaultValue="professional">
                <SelectTrigger data-testid="select-twilio-personality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>SMS Response Style</Label>
              <Select defaultValue="concise">
                <SelectTrigger data-testid="select-twilio-sms-style">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button data-testid="button-save-twilio-channel">Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
