"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { ContactDetailsModal } from "@/components/contact-details-modal";
import { BulkActionsToolbar } from "@/components/bulk-actions-toolbar";
import { Link, useNavigate } from "react-router-dom";
import LeadStatsCard from "./Card";
import FiltersPopUp from "../FiltersPopup";
import useFetchData from "../../../hooks/useFetchData";
import { apiSummary } from "../../../common/apiSummary";

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
];

export default function LeadPage() {
    const [leads, setLeads] = useState([]);
    const leadsData = {
        totalRecords: 2,
        pageSize: 10,
        currentPage: 0,
        totalPages: 1,
        data: [
            {
                id: 1,
                leadOwner: "sales_user1",
                company: "Tech Innovations Pvt Ltd",
                firstName: "Jane",
                lastName: "Smith",
                title: "Marketing Manager",
                email: "jane.smith@ab.com",
                fax: "123-456-7890",
                mobile: "+91-9876543210",
                website: "tt",
                leadSource: "OTHER",
                leadStatus: "New",
                industry: "Technology",
                noOfEmployees: 150,
                annualRevenue: 1200000.5,
                rating: "Hot",
                emailOptOut: false,
                skypeId: "jane.smith.skype",
                secondaryEmail: "jane.smith.alt@abc.com",
                twitter: "@janesmith",
                description: "Interested in premium product plan",
                converted: false,
            },
            {
                id: 2,
                leadOwner: "sales_user1",
                company: "Tech Innovations Pvt Ltd",
                firstName: "praveen",
                lastName: "Smith",
                title: "Marketing Manager",
                email: "jane.smith@example.com",
                fax: "123-456-7890",
                mobile: "+91-9876543210",
                website: "https://techinnovations.com",
                leadSource: "OTHER",
                leadStatus: "New",
                industry: "Technology",
                noOfEmployees: 150,
                annualRevenue: 1200000.5,
                rating: "Hot",
                emailOptOut: false,
                skypeId: "jane.smith.skype",
                secondaryEmail: "jane.smith.alt@example.com",
                twitter: "@janesmith",
                description: "Interested in premium product plan",
                converted: false,
            },
        ],
    };
    const [filterModelOpen, setFilterModelOpen] = useState(false);
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [selectSingleLead, setSelectSingleLead] = useState([]);
    const [selectMultipleLead, setSelectMultipleLead] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState("25");
    const [totalRecord, setTotalRecords] = useState(0);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isContactDetailsOpen, setIsContactDetailsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [emailModel, setEmailModel] = useState(false);
    const [isMassEmail, setIsMassEmail] = useState(false);
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    useEffect(() => {
        setFilteredLeads(leadsData?.data);
        setLeads(leadsData?.data);
        setCurrentPage(leadsData?.currentPage);
        setTotalRecords(leadsData?.totalRecords);
    }, []);
    useEffect(() => {
        if (!searchTerm) {
            //   setFilteredContacts(contacts)
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredLeads(
                leads.filter(
                    (lead) =>
                        lead.firstName.toLowerCase().includes(term) ||
                        lead.company.toLowerCase().includes(term) ||
                        lead.email.toLowerCase().includes(term) ||
                        lead.mobile.toLowerCase().includes(term),
                ),
            );
        }
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm]);

    // Pagination calculation
    const recordsPerPageValue = parseInt(recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPageValue;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
    const totalPages = Math.ceil(totalRecord / recordsPerPageValue);

    const handleContactSelect = (lead) => {
        setSelectedLeads((prev) => (prev.includes(lead.id) ? prev.filter((id) => id !== lead.id) : [...prev, lead.id]));
        setSelectMultipleLead((prev) => (prev.some((item) => item.id === lead.id) ? prev.filter((item) => item.id !== lead.id) : [...prev, lead]));
    };
    const sortedLeads = useMemo(() => {
        if (!sortConfig.key) return filteredLeads;

        return [...filteredLeads].sort((a, b) => {
            const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
            const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredLeads, sortConfig]);

    const currentLeads = sortedLeads.slice(indexOfFirstRecord, indexOfLastRecord);

    const handleSelectAll = () => {
        setSelectedLeads(selectedLeads.length === currentLeads.length ? [] : currentLeads.map((lead) => lead.id));
        setSelectMultipleLead(selectedLeads.length === currentLeads.length ? [] : currentLeads.map((lead) => lead));
    };
    const handleSort = (key) => {
        console.log("sorting");
        setSortConfig((prev) => (prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }));
    };

    return (
        <div className="min-h-screen flex-1 bg-gray-100">
            {/* Header */}
            <div className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
                        <p className="mt-1 text-sm text-gray-600">Manage and organize your leads database</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <DropdownMenu className={"bg-blue-200"}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className={"bg-blue-400"}>
                                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56"
                            >
                                <DropdownMenuItem>Mass Update</DropdownMenuItem>
                                <DropdownMenuItem>Mass Delete</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setIsMassEmail(true);
                                    }}
                                >
                                    Mass Send Email
                                </DropdownMenuItem>
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
                        <Button
                            className="bg-black text-white"
                            onClick={() => navigate("/leads/create")}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Lead
                        </Button>
                    </div>
                </div>
            </div>

            {/* Horizontal Filter Bar */}
            <div className="border-b px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative max-w-md flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3">
                          <Button variant="outline"
                            onClick={() => setFilterModelOpen(true)}
                            className="rounded border px-5 py-1 bg-blue-400 "
                        >
                            Filter
                        </Button>

                        {/* <Select defaultValue="all-statuses">
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
                        </Select> */}

                        <div className="flex items-center gap-2">
                            <Label
                                htmlFor="records-per-page"
                                className="text-sm"
                            >
                                Records per page:
                            </Label>
                            <Select
                                value={recordsPerPage}
                                onValueChange={setRecordsPerPage}
                            >
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
                    selectedCount={selectedLeads.length}
                    onClearSelection={() => setSelectedLeads([])}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedLeads.length > 0 && selectedLeads.length === currentLeads.length}
                                    onChange={handleSelectAll}
                                    className="accent-blue-600"
                                />
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={()=>handleSort("firstName")}
                                
                            >
                                        <p className="flex items-center gap-3">
                                Lead
                                            {sortConfig.key === "firstName" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ArrowUp className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4" />
                                                ))}
                                        </p>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={()=>handleSort("company")}
                            >
                                        <p className="flex items-center gap-3">
                                Company
                                            {sortConfig.key === "company" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ArrowUp className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4" />
                                                ))}
                                        </p>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={()=>handleSort("status")}
                            >
                                        <p className="flex items-center gap-3">
                                Status
                                            {sortConfig.key === "status" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ArrowUp className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4" />
                                                ))}
                                        </p>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 cursor-pointer"
                                onClick={()=>handleSort("owner")}
                            >
                                        <p className="flex items-center gap-3">
                                Owner
                                            {sortConfig.key === "owner" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ArrowUp className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4" />
                                                ))}
                                        </p>
                            </th>
                            <th
                                scope="col"
                              className="px-6 py-3 cursor-pointer"
                                onClick={()=>handleSort("source")}
                            >
                                        <p className="flex items-center gap-3">
                                Source
                                            {sortConfig.key === "source" &&
                                                (sortConfig.direction === "asc" ? (
                                                    <ArrowUp className="h-4 w-4" />
                                                ) : (
                                                    <ArrowDown className="h-4 w-4" />
                                                ))}
                                        </p>
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLeads?.map((lead) => (
                            <tr
                                key={lead.id}
                                className={`border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 ${
                                    selectedLeads.includes(lead.id) ? "bg-blue-50" : ""
                                }`}
                            >
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedLeads.includes(lead.id)}
                                        onChange={() => handleContactSelect(lead)}
                                        className="accent-blue-600"
                                    />
                                </td>
                                <th
                                    scope="row"
                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {lead.firstName} {lead.lastName}
                                    <div className="text-sm text-gray-500">{lead.email}</div>
                                    <div className="text-sm text-gray-400">{lead.mobile}</div>
                                </th>
                                <td className="px-6 py-4">
                                    <div>{lead.company}</div>
                                    <div className="text-sm text-gray-400">{lead.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800">{lead.leadStatus}</span>
                                </td>
                                <td className="px-6 py-4">{lead.leadOwner}</td>
                                <td className="px-6 py-4">{lead.leadSource}</td>
                                <td className="px-6 py-4 text-right">
                                     <div className="flex justify-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => {
                                                        setEmailModel(true);
                                                        setSelectSingleLead((prev) => [lead]);
                                                    }}
                                                >
                                                    <Mail className="h-4 w-4 text-gray-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Phone className="h-4 w-4 text-gray-600" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Edit
                                                        className="h-4 w-4 text-gray-600"
                                                        onClick={() => {
                                                            navigate(`/leads/edit/${lead.id}`, {
                                                                state: lead,
                                                            });
                                                        }}
                                                    />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <MoreVertical className="h-4 w-4 text-gray-600" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedContact(lead);
                                                                setIsContactDetailsOpen(true);
                                                            }}
                                                        >
                                                            <User className="mr-2 h-4 w-4" /> View Profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit Contact
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Mail className="mr-2 h-4 w-4" /> Send Email
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Phone className="mr-2 h-4 w-4" /> Call Contact
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Tag className="mr-2 h-4 w-4" /> Add Tags
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Contact
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
                <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredLeads.length)} of {filteredLeads.length} results
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
                    <span className="rounded-md border bg-white px-3 py-1 text-sm">
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

            {/* Modals */}
            {filterModelOpen && <FiltersPopUp onClose={() => setFilterModelOpen(false)} />}
            {emailModel && (
                <Model>
                    {" "}
                    <EmailComposer
                        onClose={() => setEmailModel(false)}
                        selectedLeads={selectSingleLead}
                    />
                </Model>
            )}
            {isMassEmail && (
                <Model>
                    {" "}
                    <EmailComposer
                        onClose={() => setIsMassEmail(false)}
                        selectedLeads={selectMultipleLead}
                    />
                </Model>
            )}
        </div>
    );
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
import Model from "../../../components/Model";

export const EmailComposer = ({ onClose, selectedLeads }) => {
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [selectedmails, setSelectedMails] = useState([]);
    const didMountRef = useRef(false);

    //   console.log(selectedLeads)
    const getMails = () => {
        const mails = selectedLeads?.map((lead) => {
            return {
                mail: lead.email,
                name: lead.firstName + " " + lead.lastName,
                id: lead.id,
            };
        });
        // console.log(mails)
        setSelectedMails(mails);
    };
    useEffect(() => {
        getMails();
        //   console.log(didMountRef)
    }, []);
    const handleSend = () => {
        console.log(body);
        console.log("Sending...");
    };
    const handleRemoveMail = (id) => {
        setSelectedMails((prev) => prev.filter((mail) => mail.id !== id));
    };
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-600/60 p-4">
            <div className="relative flex h-[90vh] w-[80vw] flex-col overflow-hidden rounded bg-white">
                {/* Sticky Heading */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-3">
                    <h2 className="font-semibold">Send Mail</h2>
                    <button
                        onClick={onClose}
                        className="text-lg text-gray-500 hover:text-red-500"
                    >
                        <XIcon />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-3">
                    <div className="flex items-center gap-3">
                        <p>From</p>
                        <p className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1">sfkdsfsfll@gmail.com</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p>To</p>
                        <div className="flex max-h-28 flex-1 flex-wrap gap-3 overflow-x-scroll rounded border border-gray-400 p-1">
                            {selectedmails?.map((mail, ind) => {
                                return (
                                    <p
                                        className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1"
                                        key={ind}
                                    >
                                        {mail?.mail}
                                        <XIcon
                                            size={15}
                                            onClick={() => handleRemoveMail(mail.id)}
                                            className="cursor-pointer"
                                        />
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* CC and BCC checkboxes */}
                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={showCc}
                                onChange={() => setShowCc(!showCc)}
                            />
                            CC
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={showBcc}
                                onChange={() => setShowBcc(!showBcc)}
                            />
                            BCC
                        </label>
                    </div>

                    {showCc && (
                        <div className="flex items-center gap-3">
                            <p>CC</p>
                            <div className="flex-1 rounded border border-gray-400 p-1">
                                <p className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                                    sfkdsfsfll@gmail.com <XIcon size={10} />
                                </p>
                            </div>
                        </div>
                    )}

                    {showBcc && (
                        <div className="flex items-center gap-3">
                            <p>BCC</p>
                            <div className="flex-1 rounded border border-gray-400 p-1">
                                <p className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
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
                <div className="sticky bottom-0 border-t bg-white px-5 py-3">
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
