"use client"

import { useState, useEffect, useMemo, useRef } from "react"
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
  XIcon,
} from "lucide-react"
import { ContactDetailsModal } from "@/components/contact-details-modal"
import { BulkActionsToolbar } from "@/components/bulk-actions-toolbar"
import { Link, useNavigate } from "react-router-dom"
import LeadStatsCard from "./Card"
import FiltersPopUp from "../FiltersPopup"
import useFetchData from "../../../hooks/useFetchData"
import { apiSummary } from "../../../common/apiSummary"

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

export default function LeadPage() {
    const [leads,setLeads]=useState([])
    const leadsData={
    "totalRecords": 2,
    "pageSize": 10,
    "currentPage": 0,
    "totalPages": 1,
    "data": [
        {
            "id": 1,
            "leadOwner": "sales_user1",
            "company": "Tech Innovations Pvt Ltd",
            "firstName": "Jane",
            "lastName": "Smith",
            "title": "Marketing Manager",
            "email": "jane.smith@ab.com",
            "fax": "123-456-7890",
            "mobile": "+91-9876543210",
            "website": "tt",
            "leadSource": "OTHER",
            "leadStatus": "New",
            "industry": "Technology",
            "noOfEmployees": 150,
            "annualRevenue": 1200000.5,
            "rating": "Hot",
            "emailOptOut": false,
            "skypeId": "jane.smith.skype",
            "secondaryEmail": "jane.smith.alt@abc.com",
            "twitter": "@janesmith",
            "description": "Interested in premium product plan",
            "converted": false
        },
        {
            "id": 2,
            "leadOwner": "sales_user1",
            "company": "Tech Innovations Pvt Ltd",
            "firstName": "Jane",
            "lastName": "Smith",
            "title": "Marketing Manager",
            "email": "jane.smith@example.com",
            "fax": "123-456-7890",
            "mobile": "+91-9876543210",
            "website": "https://techinnovations.com",
            "leadSource": "OTHER",
            "leadStatus": "New",
            "industry": "Technology",
            "noOfEmployees": 150,
            "annualRevenue": 1200000.5,
            "rating": "Hot",
            "emailOptOut": false,
            "skypeId": "jane.smith.skype",
            "secondaryEmail": "jane.smith.alt@example.com",
            "twitter": "@janesmith",
            "description": "Interested in premium product plan",
            "converted": false
        }
    ]
}
    const [filterModelOpen,setFilterModelOpen]=useState(false)
  const [selectedContacts, setSelectedContacts] = useState([])
  const [selectSingleLead,setSelectSingleLead]=useState([])
  const [selectMultipleLead,setSelectMultipleLead]=useState([])
  const [recordsPerPage, setRecordsPerPage] = useState("25")
  const [totalRecord,setTotalRecords]=useState(0)
  const [isCreateContactOpen, setIsCreateContactOpen] = useState(false)
  const [createContactType, setCreateContactType] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [emailModel,setEmailModel]=useState(false)
  const [isMassEmail,setIsMassEmail]=useState(false)
  const navigate=useNavigate()
const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  useEffect(()=>{
    setLeads(leadsData?.data)
    setCurrentPage(leadsData?.currentPage)
    setTotalRecords(leadsData?.totalRecords)
  },[])
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
  const totalPages = Math.ceil(totalRecord / recordsPerPageValue)

  const handleContactSelect = (lead) => {
    setSelectedContacts((prev) =>
      prev.includes(lead.id) ? prev.filter((id) => id !== lead.id) : [...prev, lead.id]
    )
    setSelectMultipleLead((prev) =>
    prev.some((item) => item.id === lead.id)
      ? prev.filter((item) => item.id !== lead.id)
      : [...prev, lead]
  );
  }
  const sortedContacts = useMemo(() => {
  if (!sortConfig.key) return filteredContacts;

  return [...filteredContacts].sort((a, b) => {
    const aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
    const bVal = b[sortConfig.key]?.toString().toLowerCase() || '';
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });
}, [filteredContacts, sortConfig]);


const currentContacts = sortedContacts.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleSelectAll = () => {
    setSelectedContacts(selectedContacts.length === currentContacts.length ? [] : currentContacts.map((contact) => contact.id))
    setSelectMultipleLead(selectedContacts.length === leads.length ? [] : leads.map((lead) => lead))
  }
const handleSort = (key) => {
  setSortConfig((prev) =>
    prev.key === key
      ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      : { key, direction: 'asc' }
  );
};

  return (
    <div className="min-h-screen bg-gray-100">
  {/* Header */}
  <div className="border-b px-6 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-600 mt-1">Manage and organize your leads database</p>
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Actions <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">

             <DropdownMenuItem >
             
              Mass Update
            </DropdownMenuItem>
            <DropdownMenuItem>Mass Delete</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
               setIsMassEmail(true)
            }}>Mass Send Email</DropdownMenuItem>
            {/* dropdown items */}
            <DropdownMenuItem onClick={() => navigate("/import/leads")}>
              <Download className="mr-2 h-4 w-4" />
              Import Leads Data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Export Leads Data
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="bg-black text-white" onClick={() => navigate("/leads/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Lead
        </Button>
      </div>
    </div>
  </div>

  {/* Horizontal Filter Bar */}
  <div className="border-b px-6 py-4">
    <div className="flex items-center justify-between gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search leads..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button onClick={() => setFilterModelOpen(true)} className="px-5 py-1 border rounded">Filter</button>

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

        <div className="flex items-center gap-2">
          <Label htmlFor="records-per-page" className="text-sm">Records per page:</Label>
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
      </div>
    </div>
  </div>

  {/* Main Content */}
  <div className="p-6">
    <BulkActionsToolbar
      selectedCount={selectedContacts.length}
      onClearSelection={() => setSelectedContacts([])}
    />
  </div>
<CardContent>

 <div className="w-full border rounded overflow-hidden">
  <div className="max-h-[400px] overflow-y-auto">
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-gray-50 border-b text-left font-medium sticky top-0 z-10">
        <tr>
          <th className="px-6 py-3">
            <Checkbox
              checked={selectedContacts.length > 0 && selectedContacts.length === currentContacts.length}
              onCheckedChange={handleSelectAll}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
            />
          </th>
          <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('name')}>Lead</th>
          <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('company')}>Company</th>
          <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
          <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('owner')}>Owner</th>
          <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('source')}>Source</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y">
        {leads?.map((lead) => (
          <tr key={lead.id} className={selectedContacts.includes(lead.id) ? 'bg-blue-50' : 'hover:bg-gray-100'}>
            <td className="px-6 py-4">
              <Checkbox
                checked={selectedContacts.includes(lead.id)}
                onCheckedChange={() => handleContactSelect(lead)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border border-gray-400"
              />
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <Link to={`/leads/profile/${lead.id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-500 cursor-pointer">
                      {lead.firstName + " " + lead.lastName}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                  <p className="text-sm text-gray-500">{lead.mobile}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <p className="font-medium text-gray-900">{lead.company}</p>
              <p className="text-sm text-gray-600">{lead.title}</p>
            </td>
            <td className="px-6 py-4">
              <Badge
                variant={
                  lead.leadStatus === "New"
                    ? "default"
                    : lead.leadStatus === "prospect"
                    ? "secondary"
                    : "outline"
                }
                className={
                  lead.leadStatus === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : lead.status === "prospect"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-100"
                }
              >
                {lead.leadStatus}
              </Badge>
            </td>
            <td className="px-6 py-4 font-medium">{lead?.leadOwner}</td>
            <td className="px-6 py-4 font-medium">{lead?.leadSource}</td>
            <td className="px-6 py-4 text-center">
              <div className="flex justify-center gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                    setEmailModel(true)
                    setSelectSingleLead((prev)=>[lead]);
                }}>
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
                    <DropdownMenuItem onClick={() => { setSelectedContact(lead); setIsContactDetailsOpen(true); }}>
                      <User className="mr-2 h-4 w-4" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit Contact</DropdownMenuItem>
                    <DropdownMenuItem><Mail className="mr-2 h-4 w-4" /> Send Email</DropdownMenuItem>
                    <DropdownMenuItem><Phone className="mr-2 h-4 w-4" /> Call Contact</DropdownMenuItem>
                    <DropdownMenuItem><Tag className="mr-2 h-4 w-4" /> Add Tags</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete Contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</CardContent>

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

  {/* Modals */}
  {filterModelOpen && <FiltersPopUp onClose={() => setFilterModelOpen(false)} />}
  {emailModel && <Model> <EmailComposer onClose={()=>setEmailModel(false)} selectedLeads={selectSingleLead}/></Model> }
   {isMassEmail && <Model> <EmailComposer onClose={()=>setIsMassEmail(false)} selectedLeads={selectMultipleLead}/></Model> }
</div>

  )
}






//    <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="gap-2">
//                 <Filter className="h-4 w-4" />
//                 Filter
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-80">
//               <div className="p-4 space-y-4">
//                 {/* System Defined Filters */}
//                 <Collapsible open={systemFiltersOpen} onOpenChange={setSystemFiltersOpen}>
//                   <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
//                     <span className="font-medium text-sm">System Defined Filters</span>
//                     {systemFiltersOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="pl-4 space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="all-contacts" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="all-contacts" className="text-sm">
//                         All Contacts
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="my-contacts" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="my-contacts" className="text-sm">
//                         My Contacts
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="recently-created" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="recently-created" className="text-sm">
//                         Recently Created
//                       </Label>
//                     </div>
//                   </CollapsibleContent>
//                 </Collapsible>

//                 {/* Website Activity */}
//                 <Collapsible open={websiteActivityOpen} onOpenChange={setWebsiteActivityOpen}>
//                   <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
//                     <span className="font-medium text-sm">Website Activity</span>
//                     {websiteActivityOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="pl-4 space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="page-visits" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="page-visits" className="text-sm">
//                         Page Visits
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="form-submissions" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="form-submissions" className="text-sm">
//                         Form Submissions
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="downloads" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="downloads" className="text-sm">
//                         Downloads
//                       </Label>
//                     </div>
//                   </CollapsibleContent>
//                 </Collapsible>

//                 {/* Filter By Fields */}
//                 <Collapsible open={filterByFieldsOpen} onOpenChange={setFilterByFieldsOpen}>
//                   <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
//                     <span className="font-medium text-sm">Filter By Fields</span>
//                     {filterByFieldsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="pl-4 space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="contact-name" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border border-gray-400" />
//                       <Label htmlFor="contact-name" className="text-sm">
//                         Contact Name
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="company" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="company" className="text-sm">
//                         Company
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="email" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="email" className="text-sm">
//                         Email
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="phone" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="phone" className="text-sm">
//                         Phone
//                       </Label>
//                     </div>
//                   </CollapsibleContent>
//                 </Collapsible>

//                 {/* Filter By Related Modules */}
//                 <Collapsible open={relatedModulesOpen} onOpenChange={setRelatedModulesOpen}>
//                   <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
//                     <span className="font-medium text-sm">Filter By Related Modules</span>
//                     {relatedModulesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
//                   </CollapsibleTrigger>
//                   <CollapsibleContent className="pl-4 space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="deals" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="deals" className="text-sm">
//                         Deals
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="campaigns" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="campaigns" className="text-sm">
//                         Campaigns
//                       </Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Checkbox id="activities" className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white" />
//                       <Label htmlFor="activities" className="text-sm">
//                         Activities
//                       </Label>
//                     </div>
//                   </CollapsibleContent>
//                 </Collapsible>

//                 <Separator />

//               {/* Additional Filters
//                 <div className="space-y-3">
//                   <div>
//                     <Label className="text-sm font-medium">Touched/Untouched Records</Label>
//                     <Select>
//                       <SelectTrigger className="mt-1">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="touched">Touched</SelectItem>
//                         <SelectItem value="untouched">Untouched</SelectItem>
//                         <SelectItem value="all">All</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label className="text-sm font-medium">Email Sentiment</Label>
//                     <Select>
//                       <SelectTrigger className="mt-1">
//                         <SelectValue placeholder="Select sentiment" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="positive">Positive</SelectItem>
//                         <SelectItem value="neutral">Neutral</SelectItem>
//                         <SelectItem value="negative">Negative</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label className="text-sm font-medium">Latest Email Status</Label>
//                     <Select>
//                       <SelectTrigger className="mt-1">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="sent">Sent</SelectItem>
//                         <SelectItem value="opened">Opened</SelectItem>
//                         <SelectItem value="clicked">Clicked</SelectItem>
//                         <SelectItem value="bounced">Bounced</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label className="text-sm font-medium">Activities and Campaigns</Label>
//                     <Select>
//                       <SelectTrigger className="mt-1">
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="email-campaign">Email Campaign</SelectItem>
//                         <SelectItem value="call-activity">Call Activity</SelectItem>
//                         <SelectItem value="meeting">Meeting</SelectItem>
//                         <SelectItem value="task">Task</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div> */}
//               </div> 
//             </DropdownMenuContent>
//           </DropdownMenu> 






import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Model from "../../../components/Model"

export const EmailComposer = ({ onClose,selectedLeads }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [selectedmails,setSelectedMails]=useState([])
  const didMountRef = useRef(false);

  console.log(selectedLeads)
  const getMails=()=>{
    const mails=selectedLeads?.map((lead)=>{
        return {
            mail:lead.email,
            name:lead.firstName+" "+lead.lastName,
            id:lead.id
        }

    })
    // console.log(mails)
    setSelectedMails(mails);
  }
  useEffect(()=>{
      getMails();
    //   console.log(didMountRef)
  },[])
  const handleSend = () => {
    console.log(body)
    console.log('Sending...');
  };
const handleRemoveMail = (id) => {
  setSelectedMails(prev => prev.filter(mail => mail.id !== id));
};
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-600/60 p-4">
      <div className="relative h-[90vh] w-[80vw] rounded bg-white flex flex-col overflow-hidden">
        {/* Sticky Heading */}
        <div className="sticky top-0 z-10 bg-white px-5 py-3 border-b flex justify-between items-center">
          <h2 className="font-semibold">Send Mail</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-lg">
            <XIcon />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-3 flex-1 space-y-4">
           
          <div className="flex gap-3 items-center">
            <p>From</p>
            <p className="rounded-full w-fit bg-blue-50 px-3 py-1 flex gap-2 items-center">
                  sfkdsfsfll@gmail.com
                </p>
          </div>

          <div className="flex items-center gap-3">
            <p>To</p>
            <div className="flex-1 border rounded border-gray-400 p-1 flex gap-3 flex-wrap max-h-28 overflow-x-scroll">
               {
                selectedmails?.map((mail,ind)=>{
                    return (
                        
                        <p className="rounded-full bg-blue-50 px-3 py-1 w-fit flex gap-2 items-center" key={ind}>{mail?.mail}<XIcon size={15} onClick={()=>handleRemoveMail(mail.id)} className="cursor-pointer  "/></p>
                    )
                })
            }
            </div>
          </div>

          {/* CC and BCC checkboxes */}
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={showCc} onChange={() => setShowCc(!showCc)} />
              CC
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={showBcc} onChange={() => setShowBcc(!showBcc)} />
              BCC
            </label>
          </div>

          {showCc && (
            <div className="flex items-center gap-3">
              <p>CC</p>
              <div className="flex-1 border rounded border-gray-400 p-1">
                <p className="rounded-full w-fit bg-blue-50 px-3 py-1 flex gap-2 items-center">
                  sfkdsfsfll@gmail.com <XIcon size={10} />
                </p>
              </div>
            </div>
          )}

          {showBcc && (
            <div className="flex items-center gap-3">
              <p>BCC</p>
              <div className="flex-1 border rounded border-gray-400 p-1">
                <p className="rounded-full w-fit bg-blue-50 px-3 py-1 flex gap-2 items-center">
                  sfkdsfsfll@gmail.com <XIcon size={10} />
                </p>
              </div>
            </div>
          )}

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-2"
          />

         <ReactQuill
  theme="snow"
  value={body}
  onChange={setBody}
  className="custom-quill"
/>
        </div>

        {/* Sticky Send Button */}
        <div className="sticky bottom-0 bg-white px-5 py-3 border-t">
          <button
            onClick={handleSend}
            className="w-full rounded bg-blue-500 p-2 text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
;
