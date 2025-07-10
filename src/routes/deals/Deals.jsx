"use client";
import { LuFilter } from "react-icons/lu";
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
import FiltersPopUp from "./FiltersPopup"
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
import Tooltip from "../../components/ToolTip";
import Table from "../../components/Table";
import { EmailComposer } from "../../components/shared/EmailComposer";
import BreadCrumb from "../../components/BreadCrump";
export default function ContactPage() {
    const [leads, setLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState("25");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectMultipleLead, setSelectMultipleLead] = useState([]);
    const [selectSingleLead, setSelectSingleLead] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [totalRecord, setTotalRecords] = useState(0);
    const [emailModel, setEmailModel] = useState(false);
    const [isMassEmail, setIsMassEmail] = useState(false);
    const [filterModelOpen, setFilterModelOpen] = useState(false);
    const navigate = useNavigate();

    const leadsData = {
        totalRecords: 2,
        data:[
  {
    id: 1,
    dealName: "Enterprise CRM Deal",
    amount: "₹1,50,000",
    stage: "Proposal Sent",
    closingDate: "2025-07-01",
    company: "Alpha Tech Solutions",
    title: "Sr. Product Manager",
    accountName: "Alpha Tech",
    contactName: "Anjali Rao",
    owner: "sales_user1",
    firstName: "Anjali",
    lastName: "Rao",
  },
  {
    id: 2,
    dealName: "Annual Subscription",
    amount: "₹75,000",
    stage: "Negotiation",
    closingDate: "2025-07-10",
    company: "Beta Corp",
    title: "Operations Lead",
    accountName: "Beta Corp Pvt Ltd",
    contactName: "Vikram Singh",
    owner: "sales_user2",
    firstName: "Vikram",
    lastName: "Singh",
  },
  {
    id: 3,
    dealName: "Cloud Migration",
    amount: "₹2,20,000",
    stage: "Qualified",
    closingDate: "2025-07-15",
    company: "Gamma Innovations",
    title: "IT Head",
    accountName: "Gamma Innovations Inc",
    contactName: "Meera Patel",
    owner: "sales_user3",
    firstName: "Meera",
    lastName: "Patel",
  },
]
    };

    useEffect(() => {
        setLeads(leadsData.data);
        setFilteredLeads(leadsData.data);
        setTotalRecords(leadsData.totalRecords);
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredLeads(
            leads.filter(
                (lead) =>
                    lead.dealName.toLowerCase().includes(term) ||
                    lead.amount.toLowerCase().includes(term) ||
                    lead.owner.toLowerCase().includes(term) ||
                    lead.accountName.toLowerCase().includes(term) ||
                     lead.contactName.toLowerCase().includes(term),
            ),
        );
        setCurrentPage(1);
    }, [searchTerm,leads]);

    const recordsPerPageValue = parseInt(recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPageValue;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
    const totalPages = Math.ceil(totalRecord / recordsPerPageValue);

    const handleContactSelect = (lead) => {
        setSelectMultipleLead((prev) => (prev.some((item) => item.id === lead.id) ? prev.filter((item) => item.id !== lead.id) : [...prev, lead]));
    };

    const handleSelectAll = () => {
        setSelectMultipleLead(selectMultipleLead.length === leadsData.data.length ? [] : leadsData.data);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => (prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }));
    };
const currentContacts=filteredLeads
    const columns = useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllRowsSelected()}
                        onCheckedChange={(value) => {
                            table.toggleAllRowsSelected(!!value);
                            handleSelectAll();
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected(!!value);
                            let lead = row.original;
                            handleContactSelect(lead);
                        }}
                    />
                ),
            },
            {
                accessorKey: "dealName",
                header: "Deal Name",
                cell: ({ row }) => {
                    const lead = row.original;
                    return (
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                                <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>{lead.dealName}</div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "amount",
                header: "Amount",
            },
            {
                accessorKey: "stage",
                header: "Stage",
            },
            {
                accessorKey: "closingDate",
                header: "Closing Date",
                cell: ({ row }) => (
                    <div>
                        <div>{row.original.closingDate}</div>
                    </div>
                ),
            },
            {
                accessorKey: "accountName",
                header: "Account Name",
            },
            {
                accessorKey: "contactName",
                header: "Contact Name",
            },
             {
                accessorKey: "owner",
                header: "Owner",
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex items-center justify-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                setSelectSingleLead([row.original]);
                                setEmailModel(true);
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
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <div className=" flex-1 bg-white">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Deals</h1>
                    <BreadCrumb />
                </div>
                <div className="flex items-center gap-3">
                    <div onClick={() => setFilterModelOpen(true)}>
                        <Tooltip text={"Filter"}>
                            <LuFilter />
                        </Tooltip>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Actions <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setIsMassEmail(true)}>
                                {" "}
                                <Send className="mr-2 h-4 w-4" />
                                Mass Send Email{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Users className="mr-2 h-4 w-4" />
                                Mass Transfer
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Edit className="mr-2 h-4 w-4" />
                                Update Multiple
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Tag className="mr-2 h-4 w-4" />
                                Tag
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/deals/create")}
                        className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Deal
                    </Button>
                </div>
            </div>

            <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search Deals..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Label
                        htmlFor="records-per-page"
                        className="text-sm"
                    >
                        Show
                    </Label>
                    <Select
                        value={recordsPerPage}
                        onValueChange={setRecordsPerPage}
                    >
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 25, 50, 100].map((num) => (
                                <SelectItem
                                    key={num}
                                    value={String(num)}
                                >
                                    {num}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Table
                columns={columns}
                data={currentContacts}
            />

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
                    <span className="rounded border bg-white px-3 py-1 text-sm">
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

            {filterModelOpen && <FiltersPopUp onClose={() => setFilterModelOpen(false)} />}
            {emailModel && (
                <Model>
                    <EmailComposer
                        onClose={() => setEmailModel(false)}
                        selectedLeads={selectSingleLead}
                    />
                </Model>
            )}
            {isMassEmail && (
                <Model>
                    <EmailComposer
                        onClose={() => setIsMassEmail(false)}
                        selectedLeads={selectMultipleLead}
                    />
                </Model>
            )}
        </div>
    );
}

