import { useState } from "react";
import { useWorkspace } from "@/lib/workspace-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

const sampleContacts = [
  {
    id: 1,
    name: "Jessica Reynolds",
    email: "jessica@brightpath.com",
    company: "BrightPath Marketing",
    phone: "+1 (555) 234-5678",
    tags: ["SEO Client", "Enterprise"],
    deals: 3,
    source: "Referral",
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "marcus@techvista.io",
    company: "TechVista Solutions",
    phone: "+1 (555) 345-6789",
    tags: ["Prospect"],
    deals: 1,
    source: "Website",
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    email: "sarah@greenleaf.co",
    company: "GreenLeaf Organics",
    phone: "+1 (555) 456-7890",
    tags: ["SEO Client", "Local SEO"],
    deals: 2,
    source: "Cold Outreach",
  },
  {
    id: 4,
    name: "David Park",
    email: "david@novadesign.com",
    company: "Nova Design Studio",
    phone: "+1 (555) 567-8901",
    tags: ["Prospect", "Content"],
    deals: 0,
    source: "LinkedIn",
  },
  {
    id: 5,
    name: "Rachel Torres",
    email: "rachel@summitlaw.com",
    company: "Summit Legal Group",
    phone: "+1 (555) 678-9012",
    tags: ["SEO Client"],
    deals: 4,
    source: "Referral",
  },
];

export default function CrmContacts() {
  const { selectedWorkspace } = useWorkspace();
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const filtered = sampleContacts.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (tagFilter !== "all" && !c.tags.includes(tagFilter)) return false;
    if (sourceFilter !== "all" && c.source !== sourceFilter) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Contacts</h1>
          <Badge variant="secondary" data-testid="badge-contact-count">48 contacts</Badge>
        </div>
        <Button data-testid="button-add-contact">
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-contacts"
          />
        </div>
        <Select value={tagFilter} onValueChange={setTagFilter}>
          <SelectTrigger className="w-[160px]" data-testid="select-tag-filter">
            <SelectValue placeholder="Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            <SelectItem value="SEO Client">SEO Client</SelectItem>
            <SelectItem value="Prospect">Prospect</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
            <SelectItem value="Local SEO">Local SEO</SelectItem>
            <SelectItem value="Content">Content</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[160px]" data-testid="select-source-filter">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Referral">Referral</SelectItem>
            <SelectItem value="Website">Website</SelectItem>
            <SelectItem value="Cold Outreach">Cold Outreach</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Deals</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((contact) => (
                <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
                  <TableCell className="font-medium" data-testid={`text-contact-name-${contact.id}`}>
                    {contact.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground" data-testid={`text-contact-email-${contact.id}`}>
                    {contact.email}
                  </TableCell>
                  <TableCell data-testid={`text-contact-company-${contact.id}`}>{contact.company}</TableCell>
                  <TableCell className="text-muted-foreground text-sm" data-testid={`text-contact-phone-${contact.id}`}>
                    {contact.phone}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" data-testid={`badge-tag-${contact.id}-${tag.replace(/\s+/g, "-").toLowerCase()}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right" data-testid={`text-contact-deals-${contact.id}`}>
                    {contact.deals}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm" data-testid={`text-contact-source-${contact.id}`}>
                    {contact.source}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-contact-actions-${contact.id}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem data-testid={`action-view-${contact.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem data-testid={`action-edit-${contact.id}`}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" data-testid={`action-delete-${contact.id}`}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
