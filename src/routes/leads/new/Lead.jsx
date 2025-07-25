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
    Import,
} from "lucide-react";
import { ContactDetailsModal } from "@/components/contact-details-modal";
import { BulkActionsToolbar } from "@/components/bulk-actions-toolbar";
import { Link, useNavigate } from "react-router-dom";
import LeadStatsCard from "./Card";
import FiltersPopUp from "../FiltersPopup";
import useFetchData from "../../../hooks/useFetchData";
import { apiSummary } from "../../../common/apiSummary";
import Model from "../../../components/Model";
import Tooltip from "../../../components/ToolTip";
import Table from "../../../components/Table";
import { EmailComposer } from "../../../components/shared/EmailComposer";
import { axiosPrivate } from "../../../utils/axios";
import BreadCrumb from "../../../components/BreadCrumb";
import toast from "react-hot-toast";
import DeleteConfirmationDialog from "../../../components/ConfirmDeleteModel";
import StatusBadge from "../../../components/StatusBadge";
import FilterSidebar from "./Filter";
const avaliableColumns = {
    firstName: true,
    email: true,
    mobile: true,
    company: true,
    leadOwner: true,
    leadStatus: true,
    company: false,
    website: false,
    industry: false,
    followUp: false,
    comments: false,
};
const columnsConfig = {
    firstName: {
        label: "Name",
        render: ({ row }) => {
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
    email: {
        label: "Email",
        render: ({ row }) => row.original.email,
    },
    mobile: {
        label: "Phone",
        render: ({ row }) => row.original.mobile,
    },
    company: {
        label: "Company",
        render: ({ row }) => (
            <div>
                <div>{row.original.company}</div>
                <div className="text-xs text-gray-500">{row.original.title}</div>
            </div>
        ),
    },
    leadOwner: {
        label: "Owner",
        render: ({ row }) => row.original.leadOwner,
    },
    leadStatus: {
        label: "Status",
        render: ({ row }) => <StatusBadge status={row.original.leadStatus} />,
    },
    website: {
        label: "Website",
        render: ({ row }) => row.original.website || "-",
    },
    industry: {
        label: "Industry",
        render: ({ row }) => row.original.industry || "-",
    },
    followUp: {
        label: "Follow Up",
        render: ({ row }) => row.original.followUp || "-",
    },
    comments: {
        label: "Comments",
        render: ({ row }) => row.original.comments || "-",
    },
};

export default function LeadPage() {
    const [leads, setLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState("10");
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
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    const [leadsData, refetchData, loading] = useFetchData(apiSummary.crm.getLeads, currentPage, recordsPerPage);
    const [visibleColumns, setVisibleColumns] = useState(avaliableColumns);
    const [showColumnSelector, setShowColumnSelector] = useState(false);

    useEffect(() => {
        setLeads(leadsData?.data?.data || []);
        setFilteredLeads(leadsData?.data?.data || []);
        setTotalRecords(leadsData?.data?.totalRecords);
        setCurrentPage(1);
    }, [leadsData]);
    useEffect(() => {
        const handleFilter = () => {
            if (leads.length == 0) return;
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
        };
        handleFilter();
    }, [searchTerm]);

    const recordsPerPageValue = parseInt(recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPageValue;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
    const totalPages = Math.ceil(totalRecord / recordsPerPageValue);

    const handleContactSelect = (lead) => {
        setSelectMultipleLead((prev) => (prev.some((item) => item.id === lead.id) ? prev.filter((item) => item.id !== lead.id) : [...prev, lead]));
    };

    const handleSelectAll = () => {
        setSelectMultipleLead(selectMultipleLead.length === leadsData.data.data.length ? [] : leadsData.data.data);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => (prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }));
    };

    const currentLeads = filteredLeads;

    const columns = useMemo(() => {
        const dynamicColumns = [];

        // Select Checkbox Column
        dynamicColumns.push({
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
                        handleContactSelect(row.original);
                    }}
                />
            ),
        });

        // Dynamically add columns based on visibility
        Object.keys(columnsConfig).forEach((key) => {
            if (visibleColumns[key]) {
                dynamicColumns.push({
                    accessorKey: key,
                    header: columnsConfig[key].label,
                    cell: columnsConfig[key].render,
                });
            }
        });

        // Actions column
        dynamicColumns.push({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const lead = row.original;
                return (
                    <div className="flex items-center justify-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className={"hover:bg-primary hover:text-white"}
                        >
                            Convert
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
                                    <Phone className="mr-2 h-4 w-4" />
                                    Phone
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectSingleLead([row.original]);
                                        setEmailModel(true);
                                    }}
                                >
                                    <Mail className="mr-2 h-4 w-4" />
                                    Mail
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setLeadToDelete(lead);
                                        setShowConfirmDelete(true);
                                    }}
                                >
                                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        });

        return dynamicColumns;
    }, [visibleColumns]);

    const handleDelete = async (id) => {
        try {
            const resp = await axiosPrivate({
                ...apiSummary.crm.deleteLead(id),
            });
            toast.success("Lead Deleted SuccussFully");
            refetchData();
            setCurrentPage(1);
        } catch (error) {
            toast.error("Delation Failed");
        }
    };
    const handleMultipleDelete = async () => {
        if (selectMultipleLead.length <= 0) {
            return;
        }
        try {
            const ids = selectMultipleLead.map((lead) => lead.id);
            const resp = await axiosPrivate({
                ...apiSummary.deleteLead,
                data: {
                    deleteIds: ids,
                },
            });
            setRefresh(!refresh);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex-1 bg-white">
            <div className="flex items-center justify-between px-6 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
                    <BreadCrumb />
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center"
                        onClick={() => setFilterModelOpen(true)}
                    >
                        <Tooltip text={"Filter"}>
                            <LuFilter />
                        </Tooltip>
                    </div>
                    <DropdownMenu
                        open={showColumnSelector}
                        onOpenChange={setShowColumnSelector}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant="primary" className={` ${showColumnSelector ? "bg-primary text-white" : ""}`}>
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="h-80 w-56 overflow-auto"
                        >
                            {Object.keys(visibleColumns).map((key) => (
                                <DropdownMenuItem
                                    key={key}
                                    onSelect={(e) => e.preventDefault()}
                                    className="flex items-center gap-5"
                                >
                                    <Checkbox
                                        checked={visibleColumns[key]}
                                        onCheckedChange={() =>
                                            setVisibleColumns((prev) => ({
                                                ...prev,
                                                [key]: !prev[key],
                                            }))
                                        }
                                    />
                                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu
                        open={actionOpen}
                        onOpenChange={setActionOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="primary"
                                className={` ${actionOpen ? "bg-primary text-white" : ""}`}
                            >
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
                                Mass Transfer Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Edit className="mr-2 h-4 w-4" />
                                Update Multiple Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
                                onClick={handleDelete}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900">
                                <Tag className="mr-2 h-4 w-4" />
                                Tag Leads
                            </DropdownMenuItem>
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900" onClick={()=>navigate('/import/leads')}>
                                <Import className="mr-2 h-4 w-4" />
                                Import Leads
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/leads/create")}
                        className="bg-primary text-white "
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Lead
                    </Button>
                </div>
            </div>

            <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-2">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search leads..."
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
                data={currentLeads}
                loading={loading}
            />

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-2">
                <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredLeads.length)} of {totalRecord} results
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
            <FilterSidebar
                isOpen={filterModelOpen}
                onClose={() => setFilterModelOpen(false)}
            />
            {/* {filterModelOpen && <FiltersPopUp onClose={() => setFilterModelOpen(false)} />} */}
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
            <DeleteConfirmationDialog
                open={showConfirmDelete}
                setOpen={setShowConfirmDelete}
                isLoading={isDeleting}
                title={`Delete ${leadToDelete?.firstName} ${leadToDelete?.lastName}?`}
                description="This lead will be permanently deleted. Are you sure?"
                onConfirm={async () => {
                    setIsDeleting(true);
                    await handleDelete(leadToDelete.id);
                    setIsDeleting(false);
                    setShowConfirmDelete(false);
                }}
            />
        </div>
    );
}
