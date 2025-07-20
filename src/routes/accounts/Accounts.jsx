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
import Tooltip from "../../components/ToolTip";
import Table from "../../components/Table";
import { EmailComposer } from "../../components/shared/EmailComposer";
import BreadCrumb from "../../components/BreadCrumb";
import useFetchData from "../../hooks/useFetchData";
import { apiSummary } from "../../common/apiSummary";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../utils/axios";
import DeleteConfirmationDialog from "../../components/ConfirmDeleteModel";

const accountsColumnsConfig = {
    accountName: {
        label: "Account Name",
        render: ({ row }) => {
            const account = row.original;
            return (
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
                        <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>{account.accountName}</div>
                </div>
            );
        },
    },
    phone: {
        label: "Phone",
        render: ({ row }) => row.original.phone || "-",
    },
    website: {
        label: "Website",
        render: ({ row }) => row.original.website || "-",
    },
    industry: {
        label: "Industry",
        render: ({ row }) => row.original.industry || "-",
    },
    annualRevenue: {
        label: "Revenue",
        render: ({ row }) => row.original.annualRevenue?.toLocaleString() || "-",
    },
    accountOwner: {
        label: "Owner",
        render: ({ row }) => row.original.accountOwner || "-",
    },
};
const availableAccountColumns = {
    accountName: true,
    phone: true,
    website: true,
    industry: true,
    annualRevenue: true,
    accountOwner: true,
};
export default function AccountsPage() {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState("25");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectMultipleAccount, setSelectMultipleAccount] = useState([]);
    const [selectSingleAccount, setSelectSingleAccount] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [totalRecord, setTotalRecords] = useState(0);
    const [emailModel, setEmailModel] = useState(false);
    const [isMassEmail, setIsMassEmail] = useState(false);
    const [filterModelOpen, setFilterModelOpen] = useState(false);
    const navigate = useNavigate();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [accountsData, refetchData, loading] = useFetchData(apiSummary.crm.getAccounts,currentPage,recordsPerPage);
    const [visibleColumns, setVisibleColumns] = useState(availableAccountColumns);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [actionOpen, setActionOpen] = useState(false);
    useEffect(() => {
        setAccounts(accountsData.data);
        setFilteredAccounts(accountsData.data);
        setTotalRecords(accountsData.totalRecords);
        setCurrentPage(1);
    }, [accountsData]);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredAccounts(
            accounts.filter(
                (account) =>
                    account.accountName?.toLowerCase().includes(term) ||
                    account.phone?.toLowerCase().includes(term) ||
                    account.accountOwner?.toLowerCase().includes(term) ||
                    account.website?.toLowerCase().includes(term),
            ),
        );
        setCurrentPage(1);
    }, [searchTerm]);

    const recordsPerPageValue = parseInt(recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPageValue;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
    const totalPages = Math.ceil(totalRecord / recordsPerPageValue);

    const handleContactSelect = (account) => {
        setSelectMultipleAccount((prev) =>
            prev.some((item) => item.id === account.id) ? prev.filter((item) => item.id !== account.id) : [...prev, account],
        );
    };

    const handleSelectAll = () => {
        setSelectMultipleLead(selectMultipleAccount.length === accounts.length ? [] : accounts);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => (prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }));
    };
    const columns = useMemo(() => {
        const dynamicCols = Object.entries(accountsColumnsConfig)
            .filter(([key]) => visibleColumns[key])
            .map(([key, { label, render }]) => ({
                accessorKey: key,
                header: label,
                cell: render,
            }));

        return [
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
                            handleContactSelect(row.original);
                        }}
                    />
                ),
            },
            ...dynamicCols,
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    const account = row.original;
                    return (
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
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setAccountToDelete(account);
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
            },
        ];
    }, [visibleColumns]);
    const handleDelete = async (id) => {
        try {
            const resp = await axiosPrivate({
                ...apiSummary.crm.deleteAccount(id),
            });
            toast.success("Lead Deleted SuccussFully");
            refetchData();
            setCurrentPage(1);
        } catch (error) {
            toast.error("Delation Failed");
        } finally {
            setIsDeleting(false);
            setIsDeleting(false);
            setShowConfirmDelete(false);
        }
    };
    return (
        <div className="flex-1 bg-white">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
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
                            {Object.keys(accountsColumnsConfig).map((key) => (
                                <DropdownMenuItem
                                    key={key}
                                    onSelect={(e) => e.preventDefault()}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-sm">{accountsColumnsConfig[key].label}</span>
                                    <Checkbox
                                        checked={visibleColumns[key]}
                                        onCheckedChange={() =>
                                            setVisibleColumns((prev) => ({
                                                ...prev,
                                                [key]: !prev[key],
                                            }))
                                        }
                                    />
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu  open={actionOpen}
                        onOpenChange={setActionOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="primary" className={` ${actionOpen ? "bg-primary text-white" : ""}`}>
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
                                Tag Contacts
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/accounts/create")}
                        className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Account
                    </Button>
                </div>
            </div>

            <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Search Accounts..."
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
                data={filteredAccounts}
                loading={loading}
            />

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
                <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredAccounts.length)} of {totalRecord} results
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
            <DeleteConfirmationDialog
                open={showConfirmDelete}
                setOpen={setShowConfirmDelete}
                isLoading={isDeleting}
                title={`Delete ${accountToDelete?.accountName} ?`}
                description="This lead will be permanently deleted. Are you sure?"
                onConfirm={async () => {
                    setIsDeleting(true);
                    await handleDelete(accountToDelete.accountId);
                }}
            />
        </div>
    );
}
