"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Filter,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
  Mail,
  Phone,
  User,
  Download,
  Upload,
  Trash2,
  Edit,
  Tag,
  Send,
  UserCheck,
  Copy,
  FileText,
  Users,
} from "lucide-react"
import { ContactDetailsModal } from "@/components/contact-details-modal"
import { BulkActionsToolbar } from "@/components/bulk-actions-toolbar"

// Sample contact data
const contacts = [
  {
    id: 1,
    name: "John Smith",
    company: "Acme Corp",
    jobTitle: "CEO",
    email: "john.smith@acme.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    tags: ["VIP", "Decision Maker"],
    lastContactDate: "2024-01-15",
    lastContactType: "Email",
    lastActivity: "2 days ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "TechStart Inc",
    jobTitle: "CTO",
    email: "sarah.j@techstart.io",
    phone: "+1 (555) 987-6543",
    status: "prospect",
    tags: ["Technical", "Startup"],
    lastContactDate: "2024-01-12",
    lastContactType: "Call",
    lastActivity: "1 week ago",
  },
  {
    id: 3,
    name: "Mike Davis",
    company: "Global Solutions",
    jobTitle: "VP Sales",
    email: "mike.davis@global.com",
    phone: "+1 (555) 456-7890",
    status: "customer",
    tags: ["Enterprise", "Long-term"],
    lastContactDate: "2024-01-10",
    lastContactType: "Meeting",
    lastActivity: "3 weeks ago",
  },
  {
    id: 4,
    name: "Emily Chen",
    company: "InnovateX",
    jobTitle: "Marketing Director",
    email: "emily.chen@innovatex.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    tags: ["Influencer", "Partner"],
    lastContactDate: "2024-01-18",
    lastContactType: "Email",
    lastActivity: "1 day ago",
  },
  {
    id: 5,
    name: "Robert Kim",
    company: "DataSystems",
    jobTitle: "Product Manager",
    email: "robert.kim@datasystems.io",
    phone: "+1 (555) 876-5432",
    status: "prospect",
    tags: ["Technical", "Evaluation"],
    lastContactDate: "2024-01-14",
    lastContactType: "Call",
    lastActivity: "4 days ago",
  },
  {
    id: 6,
    name: "Lisa Wong",
    company: "CloudTech",
    jobTitle: "CFO",
    email: "lisa.wong@cloudtech.com",
    phone: "+1 (555) 345-6789",
    status: "customer",
    tags: ["Enterprise", "Renewal"],
    lastContactDate: "2024-01-05",
    lastContactType: "Meeting",
    lastActivity: "2 weeks ago",
  },
  {
    id: 7,
    name: "Lisa Wong1",
    company: "CloudTech11",
    jobTitle: "CFO1",
    email: "lisa.wong@cloudtech.com",
    phone: "+1 (555) 345-6789",
    status: "customer",
    tags: ["Enterprise", "Renewal"],
    lastContactDate: "2024-01-05",
    lastContactType: "Meeting",
    lastActivity: "2 weeks ago",
  },
  {
    id: 8,
    name: "Lisa Wong2",
    company: "CloudTech2",
    jobTitle: "CFO2",
    email: "lisa.wong@cloudtech.com",
    phone: "+1 (555) 345-6789",
    status: "customer",
    tags: ["Enterprise", "Renewal"],
    lastContactDate: "2024-01-05",
    lastContactType: "Meeting",
    lastActivity: "2 weeks ago",
  },
  {
    id: 9,
    name: "Lisa Wong3",
    company: "CloudTech3",
    jobTitle: "CFO3",
    email: "lisa.wong@cloudtech.com",
    phone: "+1 (555) 345-6789",
    status: "customer",
    tags: ["Enterprise", "Renewal"],
    lastContactDate: "2024-01-05",
    lastContactType: "Meeting",
    lastActivity: "2 weeks ago",
  },
  {
    id: 10,
    name: "Lisa Wong4",
    company: "CloudTech4",
    jobTitle: "CFO",
    email: "lisa.wong@cloudtech.com",
    phone: "+1 (555) 345-6789",
    status: "customer",
    tags: ["Enterprise", "Renewal"],
    lastContactDate: "2024-01-05",
    lastContactType: "Meeting",
    lastActivity: "2 weeks ago",
  },
  {
    id: 11,
    name: "Lisa Wong5",
    company: "CloudTech5",
    jobTitle: "CEO",
    email: "lisa.wong@cloudtech.com",
    phone: "+1 (555) 345-6789",
    status: "customer",
    tags: ["Enterprise", "Renewal"],
    lastContactDate: "2024-01-05",
    lastContactType: "Meeting",
    lastActivity: "2 weeks ago",
  },
]

export default function ZohoCRMContacts() {
  const [selectedContacts, setSelectedContacts] = useState([])
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [isCreateContactOpen, setIsCreateContactOpen] = useState(false)
  const [createContactType, setCreateContactType] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  // Filter states
  const [systemFiltersOpen, setSystemFiltersOpen] = useState(false)
  const [websiteActivityOpen, setWebsiteActivityOpen] = useState(false)
  const [filterByFieldsOpen, setFilterByFieldsOpen] = useState(false)
  const [relatedModulesOpen, setRelatedModulesOpen] = useState(false)

  // Filter contacts based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredContacts(contacts)
    } else {
      const term = searchTerm.toLowerCase()
      setFilteredContacts(
        contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(term) ||
            contact.company.toLowerCase().includes(term) ||
            contact.email.toLowerCase().includes(term) ||
            contact.phone.toLowerCase().includes(term)
        )
      )
    }
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchTerm])

  // Pagination calculation
  const recordsPerPageValue = parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const currentContacts = filteredContacts.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredContacts.length / recordsPerPageValue)

  const handleContactSelect = (contactId) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId]
    )
  }

  const handleSelectAll = () => {
    setSelectedContacts(selectedContacts.length === currentContacts.length ? [] : currentContacts.map((contact) => contact.id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
            <p className="text-sm text-gray-600 mt-1">Manage and organize your contact database</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Records per page */}
            <div className="flex items-center gap-2">
              <Label htmlFor="records-per-page" className="text-sm">
                Records per page:
              </Label>
              <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Users className="mr-2 h-4 w-4" />
                  Mass Transfer Contacts
                </DropdownMenuItem>
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Edit className="mr-2 h-4 w-4" />
                  Update Multiple Contacts
                </DropdownMenuItem>
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </DropdownMenuItem>
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Tag className="mr-2 h-4 w-4" />
                  Tag Contacts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Send className="mr-2 h-4 w-4" />
                  Send Mass Email
                </DropdownMenuItem>
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Campaign
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Approve Contacts
                </DropdownMenuItem>
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Copy className="mr-2 h-4 w-4" />
                  Deduplicate Entries
                </DropdownMenuItem>
                <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                  <Download className="mr-2 h-4 w-4" />
                  Export Contact Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create Contact Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Contact <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                  onClick={() => {
                    setCreateContactType("form")
                    setIsCreateContactOpen(true)
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Create New Contact
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                  onClick={() => {
                    setCreateContactType("import-contacts")
                    setIsCreateContactOpen(true)
                  }}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import from Contacts
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                  onClick={() => {
                    setCreateContactType("import-notes")
                    setIsCreateContactOpen(true)
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Import from Notes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Horizontal Filter Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80">
              <div className="p-4 space-y-4">
                {/* System Defined Filters */}
                <Collapsible open={systemFiltersOpen} onOpenChange={setSystemFiltersOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-sm">System Defined Filters</span>
                    {systemFiltersOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="all-contacts" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="all-contacts" className="text-sm">
                        All Contacts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="my-contacts" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="my-contacts" className="text-sm">
                        My Contacts
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recently-created" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="recently-created" className="text-sm">
                        Recently Created
                      </Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Website Activity */}
                <Collapsible open={websiteActivityOpen} onOpenChange={setWebsiteActivityOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-sm">Website Activity</span>
                    {websiteActivityOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="page-visits" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="page-visits" className="text-sm">
                        Page Visits
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="form-submissions" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="form-submissions" className="text-sm">
                        Form Submissions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="downloads" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="downloads" className="text-sm">
                        Downloads
                      </Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Filter By Fields */}
                <Collapsible open={filterByFieldsOpen} onOpenChange={setFilterByFieldsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-sm">Filter By Fields</span>
                    {filterByFieldsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="contact-name" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="contact-name" className="text-sm">
                        Contact Name
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="company" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="company" className="text-sm">
                        Company
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="email" className="text-sm">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="phone" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="phone" className="text-sm">
                        Phone
                      </Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Filter By Related Modules */}
                <Collapsible open={relatedModulesOpen} onOpenChange={setRelatedModulesOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-sm">Filter By Related Modules</span>
                    {relatedModulesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="deals" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="deals" className="text-sm">
                        Deals
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="campaigns" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="campaigns" className="text-sm">
                        Campaigns
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="activities" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
                      <Label htmlFor="activities" className="text-sm">
                        Activities
                      </Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Separator />

              {/* Additional Filters
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Touched/Untouched Records</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="touched">Touched</SelectItem>
                        <SelectItem value="untouched">Untouched</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Email Sentiment</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select sentiment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Latest Email Status</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="opened">Opened</SelectItem>
                        <SelectItem value="clicked">Clicked</SelectItem>
                        <SelectItem value="bounced">Bounced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Activities and Campaigns</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email-campaign">Email Campaign</SelectItem>
                        <SelectItem value="call-activity">Call Activity</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
              </div> 
            </DropdownMenuContent>
          </DropdownMenu> 

          {/* Status Filter Dropdown */}
          <Select defaultValue="all-statuses">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-statuses">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        {/* Main Content */}
        <div className="p-6">
          {/* Bulk Actions Toolbar */}
          <BulkActionsToolbar
            selectedCount={selectedContacts.length}
            onClearSelection={() => setSelectedContacts([])}
          />

          {/* Contact List */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">All Contacts ({filteredContacts.length})</CardTitle>
                  <p className="text-gray-600 mt-1">Manage and view all your contact information</p>
                </div>
                {selectedContacts.length > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {selectedContacts.length} selected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-1 flex items-center">
                  <Checkbox 
                    checked={
                      selectedContacts.length > 0 && 
                      selectedContacts.length === currentContacts.length
                    } 
                    onCheckedChange={handleSelectAll}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                  />
                </div>
                <div className="col-span-3">Contact</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">Tags</div>
                <div className="col-span-2">Last Contact</div>
                <div className="col-span-1 text-center">Actions</div>
              </div>

              {/* Contact Rows */}
              <div className="divide-y">
                {currentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`grid grid-cols-12 gap-4 px-6 py-4 transition-colors ${
                      selectedContacts.includes(contact.id) 
                        ? 'bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="col-span-1 flex items-center">
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => handleContactSelect(contact.id)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                      </div>
                    </div>

                    {/* Company */}
                    <div className="col-span-2 flex flex-col justify-center">
                      <p className="font-medium text-gray-900">{contact.company}</p>
                      <p className="text-sm text-gray-600">{contact.jobTitle}</p>
                    </div>

                    {/* Status */}
                    <div className="col-span-1 flex items-center">
                      <Badge
                        variant={
                          contact.status === "active"
                            ? "default"
                            : contact.status === "prospect"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          contact.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : contact.status === "prospect"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        }
                      >
                        {contact.status}
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="col-span-2 flex items-center gap-1 flex-wrap">
                      {contact.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Last Contact */}
                    <div className="col-span-2 flex flex-col justify-center">
                      <p className="text-sm text-gray-900">{contact.lastContactDate}</p>
                      <p className="text-xs text-gray-500">{contact.lastContactType}</p>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Phone className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                            onClick={() => {
                              setSelectedContact(contact)
                              setIsContactDetailsOpen(true)
                            }}
                          >
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                            <Phone className="mr-2 h-4 w-4" />
                            Call Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                            <Tag className="mr-2 h-4 w-4" />
                            Add Tags
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 data-[highlighted]:bg-red-100">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing {indexOfFirstRecord + 1} to{" "}
                  {Math.min(indexOfLastRecord, filteredContacts.length)} of{" "}
                  {filteredContacts.length} results
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="px-3 py-1 bg-white border rounded-md text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Contact Dialog */}
      <Dialog open={isCreateContactOpen} onOpenChange={setIsCreateContactOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {createContactType === "form" && "Create New Contact"}
              {createContactType === "import-contacts" && "Import from Contacts"}
              {createContactType === "import-notes" && "Import from Notes"}
            </DialogTitle>
          </DialogHeader>

          {createContactType === "form" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" placeholder="Enter job title" />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateContactOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateContactOpen(false)}>Create Contact</Button>
              </div>
            </div>
          )}

          {createContactType === "import-contacts" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Import Contacts</p>
                <p className="text-gray-600 mb-4">Upload a CSV or Excel file with your contact data</p>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateContactOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateContactOpen(false)}>Import</Button>
              </div>
            </div>
          )}

          {createContactType === "import-notes" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Import from Notes</p>
                <p className="text-gray-600 mb-4">Extract contact information from your notes and documents</p>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Select Notes
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateContactOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateContactOpen(false)}>Import</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Details Modal */}
      <ContactDetailsModal
        contact={selectedContact}
        isOpen={isContactDetailsOpen}
        onClose={() => {
          setIsContactDetailsOpen(false)
          setSelectedContact(null)
        }}
      />
    </div>
  )
}