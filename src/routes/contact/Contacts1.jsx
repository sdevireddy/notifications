"use client"

import { useState, useEffect, useMemo } from "react"
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  X,
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
    owner: "me",
    createdDate: "2024-01-01",
    hasPageVisits: true,
    hasFormSubmissions: false,
    hasDownloads: true,
    hasDeals: true,
    hasCampaigns: false,
    hasActivities: true,
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
    owner: "other",
    createdDate: "2024-01-05",
    hasPageVisits: false,
    hasFormSubmissions: true,
    hasDownloads: false,
    hasDeals: false,
    hasCampaigns: true,
    hasActivities: true,
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
    owner: "me",
    createdDate: "2023-12-20",
    hasPageVisits: true,
    hasFormSubmissions: true,
    hasDownloads: true,
    hasDeals: true,
    hasCampaigns: true,
    hasActivities: true,
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
    owner: "other",
    createdDate: "2024-01-15",
    hasPageVisits: true,
    hasFormSubmissions: false,
    hasDownloads: false,
    hasDeals: false,
    hasCampaigns: false,
    hasActivities: true,
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
    owner: "me",
    createdDate: "2024-01-10",
    hasPageVisits: false,
    hasFormSubmissions: false,
    hasDownloads: true,
    hasDeals: true,
    hasCampaigns: false,
    hasActivities: false,
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
    owner: "other",
    createdDate: "2023-11-15",
    hasPageVisits: true,
    hasFormSubmissions: true,
    hasDownloads: false,
    hasDeals: true,
    hasCampaigns: true,
    hasActivities: true,
  },
  {
    id: 7,
    name: "Alex Rodriguez",
    company: "StartupHub",
    jobTitle: "Founder",
    email: "alex@startuphub.com",
    phone: "+1 (555) 111-2222",
    status: "active",
    tags: ["Startup", "Founder"],
    lastContactDate: "2024-01-20",
    lastContactType: "Meeting",
    lastActivity: "1 day ago",
    owner: "me",
    createdDate: "2024-01-18",
    hasPageVisits: false,
    hasFormSubmissions: false,
    hasDownloads: false,
    hasDeals: false,
    hasCampaigns: false,
    hasActivities: true,
  },
  {
    id: 8,
    name: "Maria Garcia",
    company: "TechFlow",
    jobTitle: "CTO",
    email: "maria@techflow.com",
    phone: "+1 (555) 333-4444",
    status: "inactive",
    tags: ["Technical"],
    lastContactDate: "2023-12-15",
    lastContactType: "Email",
    lastActivity: "1 month ago",
    owner: "other",
    createdDate: "2023-10-01",
    hasPageVisits: false,
    hasFormSubmissions: false,
    hasDownloads: false,
    hasDeals: false,
    hasCampaigns: false,
    hasActivities: false,
  },
]

// Available columns configuration
const availableColumns = [
  { key: "contact", label: "Contact", required: true },
  { key: "email", label: "Email", required: false },
  { key: "phone", label: "Phone", required: false },
  { key: "company", label: "Company", required: false },
  { key: "status", label: "Status", required: false },
  { key: "tags", label: "Tags", required: false },
  { key: "lastContact", label: "Last Contact", required: false },
  { key: "actions", label: "Actions", required: true },
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
  const [statusFilter, setStatusFilter] = useState("all-statuses")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [visibleColumns, setVisibleColumns] = useState(
    availableColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}),
  )

  // Filter states
  const [systemFiltersOpen, setSystemFiltersOpen] = useState(false)
  const [websiteActivityOpen, setWebsiteActivityOpen] = useState(false)
  const [filterByFieldsOpen, setFilterByFieldsOpen] = useState(false)
  const [relatedModulesOpen, setRelatedModulesOpen] = useState(false)

  // Active filter states
  const [activeFilters, setActiveFilters] = useState({
    // System filters
    allContacts: false,
    myContacts: false,
    recentlyCreated: false,
    // Website activity
    pageVisits: false,
    formSubmissions: false,
    downloads: false,
    // Field filters
    contactName: false,
    company: false,
    email: false,
    phone: false,
    // Related modules
    deals: false,
    campaigns: false,
    activities: false,
  })

  // Advanced filtering and sorting with all filter logic
  const filteredAndSortedContacts = useMemo(() => {
    let filtered = contacts

    // Apply status filter first
    if (statusFilter !== "all-statuses") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    // Apply system filters
    if (activeFilters.myContacts) {
      filtered = filtered.filter((contact) => contact.owner === "me")
    }

    if (activeFilters.recentlyCreated) {
      const recentDate = new Date()
      recentDate.setDate(recentDate.getDate() - 7) // Last 7 days
      filtered = filtered.filter((contact) => new Date(contact.createdDate) >= recentDate)
    }

    // Apply website activity filters
    if (activeFilters.pageVisits) {
      filtered = filtered.filter((contact) => contact.hasPageVisits)
    }

    if (activeFilters.formSubmissions) {
      filtered = filtered.filter((contact) => contact.hasFormSubmissions)
    }

    if (activeFilters.downloads) {
      filtered = filtered.filter((contact) => contact.hasDownloads)
    }

    // Apply related module filters
    if (activeFilters.deals) {
      filtered = filtered.filter((contact) => contact.hasDeals)
    }

    if (activeFilters.campaigns) {
      filtered = filtered.filter((contact) => contact.hasCampaigns)
    }

    if (activeFilters.activities) {
      filtered = filtered.filter((contact) => contact.hasActivities)
    }

    // Apply search filter on the filtered results
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(term) ||
          contact.company.toLowerCase().includes(term) ||
          contact.email.toLowerCase().includes(term) ||
          contact.phone.toLowerCase().includes(term) ||
          contact.jobTitle.toLowerCase().includes(term),
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key]
        let bValue = b[sortConfig.key]

        // Handle special cases for sorting
        if (sortConfig.key === "lastContactDate") {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, sortConfig, activeFilters])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, activeFilters])

  // Pagination calculation
  const recordsPerPageValue = Number.parseInt(recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPageValue
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue
  const currentContacts = filteredAndSortedContacts.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredAndSortedContacts.length / recordsPerPageValue)

  const handleContactSelect = (contactId) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === currentContacts.length ? [] : currentContacts.map((contact) => contact.id),
    )
  }

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-blue-600" />
    )
  }

  const handleColumnVisibilityChange = (columnKey, checked) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: checked }))
  }

  const handleFilterChange = (filterKey, checked) => {
    setActiveFilters((prev) => ({ ...prev, [filterKey]: checked }))
  }

  const clearAllFilters = () => {
    setActiveFilters({
      allContacts: false,
      myContacts: false,
      recentlyCreated: false,
      pageVisits: false,
      formSubmissions: false,
      downloads: false,
      contactName: false,
      company: false,
      email: false,
      phone: false,
      deals: false,
      campaigns: false,
      activities: false,
    })
    setStatusFilter("all-statuses")
    setSearchTerm("")
  }

  const getActiveFilterCount = () => {
    const filterCount = Object.values(activeFilters).filter(Boolean).length
    const statusCount = statusFilter !== "all-statuses" ? 1 : 0
    const searchCount = searchTerm ? 1 : 0
    return filterCount + statusCount + searchCount
  }

  const getActiveFilterLabels = () => {
    const labels = []

    if (statusFilter !== "all-statuses") {
      labels.push(`Status: ${statusFilter}`)
    }

    if (searchTerm) {
      labels.push(`Search: ${searchTerm}`)
    }

    if (activeFilters.myContacts) labels.push("My Contacts")
    if (activeFilters.recentlyCreated) labels.push("Recently Created")
    if (activeFilters.pageVisits) labels.push("Page Visits")
    if (activeFilters.formSubmissions) labels.push("Form Submissions")
    if (activeFilters.downloads) labels.push("Downloads")
    if (activeFilters.deals) labels.push("Has Deals")
    if (activeFilters.campaigns) labels.push("Has Campaigns")
    if (activeFilters.activities) labels.push("Has Activities")

    return labels
  }

  return (
    <div className="min-h-screen bg-white">
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
              <DropdownMenuContent align="end" className="w-56 enhanced-dropdown">
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
                <Button
                  variant="default"
                  className="bg-black hover:bg-gray-800 text-white border border-gray-300 gap-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Contact <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="enhanced-dropdown">
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
              placeholder={`Search ${statusFilter === "all-statuses" ? "all" : statusFilter} contacts...`}
              className="pl-10 enhanced-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 relative">
                <Filter className="h-4 w-4" />
                Filter
                {getActiveFilterCount() > 0 && (
                  <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 filter-dropdown max-h-[70vh] overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Clear All Filters */}
                {getActiveFilterCount() > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Active Filters ({getActiveFilterCount()})</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </Button>
                  </div>
                )}

                {/* System Defined Filters */}
                <Collapsible open={systemFiltersOpen} onOpenChange={setSystemFiltersOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium text-sm">System Defined Filters</span>
                    {systemFiltersOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="all-contacts"
                        checked={activeFilters.allContacts}
                        onCheckedChange={(checked) => handleFilterChange("allContacts", checked)}

                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="all-contacts" className="text-sm enhanced-label">

                        All Contacts ({contacts.length})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="my-contacts"
                        checked={activeFilters.myContacts}
                        onCheckedChange={(checked) => handleFilterChange("myContacts", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="my-contacts" className="text-sm enhanced-label">

                        My Contacts ({contacts.filter((c) => c.owner === "me").length})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recently-created"
                        checked={activeFilters.recentlyCreated}
                        onCheckedChange={(checked) => handleFilterChange("recentlyCreated", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="recently-created" className="text-sm enhanced-label">
                        Recently Created (
                        {
                          contacts.filter((c) => {
                            const recentDate = new Date()
                            recentDate.setDate(recentDate.getDate() - 7)
                            return new Date(c.createdDate) >= recentDate
                          }).length
                        }
                        )
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
                      <Checkbox
                        id="page-visits"
                        checked={activeFilters.pageVisits}
                        onCheckedChange={(checked) => handleFilterChange("pageVisits", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="page-visits" className="text-sm enhanced-label">

                        Page Visits ({contacts.filter((c) => c.hasPageVisits).length})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="form-submissions"
                        checked={activeFilters.formSubmissions}
                        onCheckedChange={(checked) => handleFilterChange("formSubmissions", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="form-submissions" className="text-sm enhanced-label">
                        Form Submissions ({contacts.filter((c) => c.hasFormSubmissions).length})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="downloads"
                        checked={activeFilters.downloads}
                        onCheckedChange={(checked) => handleFilterChange("downloads", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="downloads" className="text-sm enhanced-label">
                        Downloads ({contacts.filter((c) => c.hasDownloads).length})
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
                      <Checkbox
                        id="contact-name"
                        checked={activeFilters.contactName}
                        onCheckedChange={(checked) => handleFilterChange("contactName", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="contact-name" className="text-sm enhanced-label">

                        Contact Name
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="company"
                        checked={activeFilters.company}
                        onCheckedChange={(checked) => handleFilterChange("company", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="company" className="text-sm enhanced-label">
                        Company
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email"
                        checked={activeFilters.email}
                        onCheckedChange={(checked) => handleFilterChange("email", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="email" className="text-sm enhanced-label">

                        Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="phone"
                        checked={activeFilters.phone}
                        onCheckedChange={(checked) => handleFilterChange("phone", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="phone" className="text-sm enhanced-label">

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
                      <Checkbox
                        id="deals"
                        checked={activeFilters.deals}
                        onCheckedChange={(checked) => handleFilterChange("deals", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="deals" className="text-sm enhanced-label">

                        Has Deals ({contacts.filter((c) => c.hasDeals).length})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="campaigns"
                        checked={activeFilters.campaigns}
                        onCheckedChange={(checked) => handleFilterChange("campaigns", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="campaigns" className="text-sm enhanced-label">

                        Has Campaigns ({contacts.filter((c) => c.hasCam).length})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="activities"
                        checked={activeFilters.activities}
                        onCheckedChange={(checked) => handleFilterChange("activities", checked)}
                        className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                      />
                      <Label htmlFor="activities" className="text-sm enhanced-label">

                        Has Activities ({contacts.filter((c) => c.hasActivities).length})
                      </Label>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter Dropdown */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-statuses">All Statuses ({contacts.length})</SelectItem>
              <SelectItem value="active">Active ({contacts.filter((c) => c.status === "active").length})</SelectItem>
              <SelectItem value="prospect">
                Prospect ({contacts.filter((c) => c.status === "prospect").length})
              </SelectItem>
              <SelectItem value="customer">
                Customer ({contacts.filter((c) => c.status === "customer").length})
              </SelectItem>
              <SelectItem value="inactive">
                Inactive ({contacts.filter((c) => c.status === "inactive").length})
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 enhanced-dropdown">
              {availableColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visibleColumns[column.key]}
                  onCheckedChange={(checked) => handleColumnVisibilityChange(column.key, checked)}
                  disabled={column.required}
                  className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                >
                  {column.label}
                  {column.required && <span className="text-xs text-gray-500 ml-2">(Required)</span>}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">
                Active Filters ({getActiveFilterCount()}) - Showing {filteredAndSortedContacts.length} of{" "}
                {contacts.length} contacts
              </span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-700 hover:text-blue-900">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {getActiveFilterLabels().map((label, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 gap-1">
                  {label}
                  <button
                    onClick={() => {
                      if (label.startsWith("Status:")) {
                        setStatusFilter("all-statuses")
                      } else if (label.startsWith("Search:")) {
                        setSearchTerm("")
                      } else {
                        // Handle other filters
                        const filterMap = {
                          "My Contacts": "myContacts",
                          "Recently Created": "recentlyCreated",
                          "Page Visits": "pageVisits",
                          "Form Submissions": "formSubmissions",
                          Downloads: "downloads",
                          "Has Deals": "deals",
                          "Has Campaigns": "campaigns",
                          "Has Activities": "activities",
                        }
                        const filterKey = filterMap[label]
                        if (filterKey) {
                          handleFilterChange(filterKey, false)
                        }
                      }
                    }}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {/* Main Content */}
        <div className="p-6 bg-white">
          {/* Bulk Actions Toolbar */}
          <BulkActionsToolbar
            selectedCount={selectedContacts.length}
            onClearSelection={() => setSelectedContacts([])}
          />

          {/* Contact List */}
          <Card>
            <CardContent className="p-0">
              {/* Dynamic Table Header */}
              <div
                className="grid gap-4 px-6 py-3 bg-gray-100 border-b text-sm font-medium text-gray-700"
                style={{
                  gridTemplateColumns:
                    `40px ${visibleColumns.contact ? "2fr" : ""} ${visibleColumns.email ? "2fr" : ""} ${visibleColumns.phone ? "1.5fr" : ""} ${visibleColumns.company ? "2fr" : ""} ${visibleColumns.status ? "1fr" : ""} ${visibleColumns.tags ? "2fr" : ""} ${visibleColumns.lastContact ? "2fr" : ""} ${visibleColumns.actions ? "1fr" : ""}`.trim(),
                }}
              >
                <div className="flex items-center">
                  <Checkbox
                    checked={selectedContacts.length > 0 && selectedContacts.length === currentContacts.length}
                    onCheckedChange={handleSelectAll}
                    className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"

                  />
                </div>

                {visibleColumns.contact && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("name")}>
                    Contact
                    {getSortIcon("name")}
                  </div>
                )}

                {visibleColumns.email && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("email")}>
                    Email
                    {getSortIcon("email")}
                  </div>
                )}

                {visibleColumns.phone && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("phone")}>
                    Phone
                    {getSortIcon("phone")}
                  </div>
                )}

                {visibleColumns.company && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("company")}>
                    Company
                    {getSortIcon("company")}
                  </div>
                )}

                {visibleColumns.status && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("status")}>
                    Status
                    {getSortIcon("status")}
                  </div>
                )}

                {visibleColumns.tags && <div>Tags</div>}

                {visibleColumns.lastContact && (
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("lastContactDate")}>
                    Last Contact
                    {getSortIcon("lastContactDate")}
                  </div>
                )}

                {visibleColumns.actions && <div className="text-center">Actions</div>}
              </div>

              {/* Contact Rows */}
              <div className="divide-y">
                {currentContacts.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <User className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No contacts found</h3>
                    <p>
                      {getActiveFilterCount() > 0
                        ? "No contacts match your current filters. Try adjusting your filter criteria."
                        : "No contacts available"}
                    </p>
                    {getActiveFilterCount() > 0 && (
                      <Button variant="outline" onClick={clearAllFilters} className="mt-4">
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                ) : (
                  currentContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`grid gap-4 px-6 py-4 transition-colors ${
                        selectedContacts.includes(contact.id) ? "bg-blue-50" : "hover:bg-gray-100"
                      }`}
                      style={{
                        gridTemplateColumns:
                          `40px ${visibleColumns.contact ? "2fr" : ""} ${visibleColumns.email ? "2fr" : ""} ${visibleColumns.phone ? "1.5fr" : ""} ${visibleColumns.company ? "2fr" : ""} ${visibleColumns.status ? "1fr" : ""} ${visibleColumns.tags ? "2fr" : ""} ${visibleColumns.lastContact ? "2fr" : ""} ${visibleColumns.actions ? "1fr" : ""}`.trim(),
                      }}
                    >
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={() => handleContactSelect(contact.id)}
                          className="h-5 w-5 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-2 border-gray-400 enhanced-checkbox"
                        />
                      </div>

                      {/* Contact Info */}
                      {visibleColumns.contact && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                            <p className="text-sm text-gray-600">{contact.jobTitle}</p>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {visibleColumns.email && (
                        <div className="flex items-center">
                          <p className="text-sm text-gray-900">{contact.email}</p>
                        </div>
                      )}

                      {/* Phone */}
                      {visibleColumns.phone && (
                        <div className="flex items-center">
                          <p className="text-sm text-gray-900">{contact.phone}</p>
                        </div>
                      )}

                      {/* Company */}
                      {visibleColumns.company && (
                        <div className="flex items-center">
                          <p className="font-medium text-gray-900">{contact.company}</p>

                        </div>
                      )}

                      {/* Status */}
                      {visibleColumns.status && (
                        <div className="flex items-center">
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
                                  : contact.status === "customer"
                                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {contact.status}
                          </Badge>
                        </div>
                      )}

                      {/* Tags */}
                      {visibleColumns.tags && (
                        <div className="flex items-center gap-1 flex-wrap">
                          {contact.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Last Contact */}
                      {visibleColumns.lastContact && (
                        <div className="flex flex-col justify-center">
                          <p className="text-sm font-medium text-gray-900">{contact.lastContactDate}</p>
                          <p className="text-xs text-gray-500 capitalize">{contact.lastContactType}</p>
                        </div>
                      )}

                      {/* Actions */}
                      {visibleColumns.actions && (
                        <div className="flex items-center justify-center gap-1">
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
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {filteredAndSortedContacts.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t bg-white border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAndSortedContacts.length)}{" "}
                    of {filteredAndSortedContacts.length} results
                    {getActiveFilterCount() > 0 && ` (filtered from ${contacts.length} total)`}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Contact Dialog */}
      <Dialog open={isCreateContactOpen} onOpenChange={setIsCreateContactOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto dialog-content">

          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {createContactType === "form" && "Create New Contact"}
              {createContactType === "import-contacts" && "Import from Contacts"}
              {createContactType === "import-notes" && "Import from Notes"}
            </DialogTitle>
          </DialogHeader>

          {createContactType === "form" && (
            <div className="space-y-8">
              {/* Contact Information Section */}
              <div className="form-section">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contactOwner" className="enhanced-label">
                        Contact Owner
                      </Label>
                      <Select>
                        <SelectTrigger className="enhanced-input">

                          <SelectValue placeholder="Select owner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="siva-sankar">Siva Sankar</SelectItem>
                          <SelectItem value="john-doe">John Doe</SelectItem>
                          <SelectItem value="jane-smith">Jane Smith</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="firstName" className="enhanced-label">
                        First Name
                      </Label>
                      <div className="flex gap-2">
                        <Select>
                          <SelectTrigger className="w-24 enhanced-input">

                            <SelectValue placeholder="Title" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mr">Mr.</SelectItem>
                            <SelectItem value="ms">Ms.</SelectItem>
                            <SelectItem value="mrs">Mrs.</SelectItem>
                            <SelectItem value="dr">Dr.</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="firstName" placeholder="Enter first name" className="flex-1 enhanced-input" />

                      </div>
                    </div>

                    <div>
                      <Label htmlFor="accountName" className="enhanced-label">
                        Account Name
                      </Label>
                      <div className="flex gap-2">
                        <Input id="accountName" placeholder="Enter account name" className="flex-1 enhanced-input" />

                        <Button variant="outline" size="sm" className="px-3">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="enhanced-label">
                        Email *
                      </Label>
                      <Input id="email" type="email" placeholder="Enter email address" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="enhanced-label">
                        Phone
                      </Label>
                      <Input id="phone" placeholder="Enter phone number" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="otherPhone" className="enhanced-label">
                        Other Phone
                      </Label>
                      <Input id="otherPhone" placeholder="Enter other phone number" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="mobile" className="enhanced-label">
                        Mobile
                      </Label>
                      <Input id="mobile" placeholder="Enter mobile number" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="assistant" className="enhanced-label">
                        Assistant
                      </Label>
                      <Input id="assistant" placeholder="Enter assistant name" className="enhanced-input" />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="leadSource" className="enhanced-label">
                        Lead Source
                      </Label>
                      <Select>
                        <SelectTrigger className="enhanced-input">

                          <SelectValue placeholder="Select lead source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="cold-call">Cold Call</SelectItem>
                          <SelectItem value="trade-show">Trade Show</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="enhanced-label">
                        Last Name *
                      </Label>
                      <Input id="lastName" placeholder="Enter last name" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="vendorName" className="enhanced-label">
                        Vendor Name
                      </Label>
                      <div className="flex gap-2">
                        <Input id="vendorName" placeholder="Enter vendor name" className="flex-1 enhanced-input" />
                        <Button variant="outline" size="sm" className="px-3">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title" className="enhanced-label">
                        Title
                      </Label>
                      <Input id="title" placeholder="Enter job title" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="department" className="enhanced-label">
                        Department
                      </Label>
                      <Input id="department" placeholder="Enter department" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="homePhone" className="enhanced-label">
                        Home Phone
                      </Label>
                      <Input id="homePhone" placeholder="Enter home phone number" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="fax" className="enhanced-label">
                        Fax
                      </Label>
                      <Input id="fax" placeholder="Enter fax number" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth" className="enhanced-label">
                        Date of Birth
                      </Label>
                      <Input id="dateOfBirth" type="date" placeholder="DD/MM/YYYY" className="enhanced-input" />

                    </div>
                  </div>
                </div>

                {/* Additional Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="asstPhone" className="enhanced-label">
                        Asst Phone
                      </Label>
                      <Input id="asstPhone" placeholder="Enter assistant phone" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="skypeId" className="enhanced-label">
                        Skype ID
                      </Label>
                      <Input id="skypeId" placeholder="Enter Skype ID" className="enhanced-input" />
                    </div>

                    <div>
                      <Label htmlFor="twitter" className="enhanced-label">
                        Twitter
                      </Label>
                      <div className="flex gap-2">
                        <span className="flex items-center px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-sm font-semibold">
                          @
                        </span>
                        <Input
                          id="twitter"
                          placeholder="Enter Twitter handle"
                          className="rounded-l-none enhanced-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="emailOptOut" className="enhanced-checkbox" />
                      <Label htmlFor="emailOptOut" className="enhanced-label">
                        Email Opt Out
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="secondaryEmail" className="enhanced-label">
                        Secondary Email
                      </Label>
                      <Input
                        id="secondaryEmail"
                        type="email"
                        placeholder="Enter secondary email"
                        className="enhanced-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reportingTo" className="enhanced-label">
                        Reporting To
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="reportingTo"
                          placeholder="Enter reporting manager"
                          className="flex-1 enhanced-input"
                        />
                        <Button variant="outline" size="sm" className="px-3">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className="form-section">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-500 pb-2">
                    Address Information
                  </h3>
                  <Button variant="outline" size="sm">
                    Copy Address
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Mailing Address */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Mailing Address</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="mailingStreet" className="enhanced-label">
                          Mailing Street
                        </Label>
                        <Input id="mailingStreet" placeholder="Enter street address" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="mailingCity" className="enhanced-label">
                          Mailing City
                        </Label>
                        <Input id="mailingCity" placeholder="Enter city" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="mailingState" className="enhanced-label">
                          Mailing State
                        </Label>
                        <Input id="mailingState" placeholder="Enter state" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="mailingZip" className="enhanced-label">
                          Mailing Zip
                        </Label>
                        <Input id="mailingZip" placeholder="Enter zip code" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="mailingCountry" className="enhanced-label">
                          Mailing Country
                        </Label>
                        <Input id="mailingCountry" placeholder="Enter country" className="enhanced-input" />
                      </div>
                    </div>
                  </div>

                  {/* Other Address */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Other Address</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="otherStreet" className="enhanced-label">
                          Other Street
                        </Label>
                        <Input id="otherStreet" placeholder="Enter street address" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="otherCity" className="enhanced-label">
                          Other City
                        </Label>
                        <Input id="otherCity" placeholder="Enter city" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="otherState" className="enhanced-label">
                          Other State
                        </Label>
                        <Input id="otherState" placeholder="Enter state" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="otherZip" className="enhanced-label">
                          Other Zip
                        </Label>
                        <Input id="otherZip" placeholder="Enter zip code" className="enhanced-input" />
                      </div>
                      <div>
                        <Label htmlFor="otherCountry" className="enhanced-label">
                          Other Country
                        </Label>
                        <Input id="otherCountry" placeholder="Enter country" className="enhanced-input" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Information Section */}
              <div className="form-section">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-500 pb-2">
                  Description Information
                </h3>
                <div>
                  <Label htmlFor="description" className="enhanced-label">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 enhanced-textarea"

                    placeholder="Enter contact description..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-200">
                <Button variant="outline" onClick={() => setIsCreateContactOpen(false)} className="font-semibold">
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsCreateContactOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  Save Contact
                </Button>
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
