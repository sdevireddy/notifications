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
        data: [
            {
                id: 1,
                leadOwner: "sales_user1",
                company: "Tech Innovations Pvt Ltd",
                firstName: "Jane",
                lastName: "Smith",
                title: "Marketing Manager",
                email: "jane.smith@ab.com",
                mobile: "+91-9876543210",
                leadStatus: "New",
            },
            {
                id: 2,
                leadOwner: "sales_user1",
                company: "Tech Innovations Pvt Ltd",
                firstName: "Praveen",
                lastName: "Smith",
                title: "Marketing Manager",
                email: "jane.smith@example.com",
                mobile: "+91-9876543210",
                leadStatus: "New",
            },
        ],
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
                    lead.firstName.toLowerCase().includes(term) ||
                    lead.company.toLowerCase().includes(term) ||
                    lead.email.toLowerCase().includes(term) ||
                    lead.mobile.toLowerCase().includes(term),
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
                accessorKey: "firstName",
                header: "Name",
                cell: ({ row }) => {
                    const lead = row.original;
                    return (
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                                <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>{lead.firstName + " " + lead.lastName}</div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "mobile",
                header: "Phone",
            },
            {
                accessorKey: "company",
                header: "Company",
                cell: ({ row }) => (
                    <div>
                        <div>{row.original.company}</div>
                        <div className="text-xs text-gray-500">{row.original.title}</div>
                    </div>
                ),
            },
            {
                accessorKey: "leadOwner",
                header: "Owner",
            },
            {
                accessorKey: "leadStatus",
                header: "Status",
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
        <div className="min-h-screen flex-1 bg-white">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
                    <Breadcrumb />
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/leads/create")}
                        className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Contact
                    </Button>
                </div>
            </div>

            <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search contacts..."
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Breadcrumb from "../../components/BreadCrumb";
import Tooltip from "../../components/ToolTip";
import Table from "../../components/Table";

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
