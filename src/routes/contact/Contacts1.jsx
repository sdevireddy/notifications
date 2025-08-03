"use client";
import { LuFilter } from "react-icons/lu";
import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Model from "../../components/Model";
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
import Tooltip from "../../components/ToolTip";
import Table from "../../components/Table";
import { EmailComposer } from "../../components/shared/EmailComposer";
import BreadCrumb from "../../components/BreadCrumb";
import useFetchData from "../../hooks/useFetchData";
import { apiSummary } from "../../common/apiSummary";
import DeleteConfirmationDialog from "../../components/ConfirmDeleteModel";
import { axiosPrivate } from "../../utils/axios";
import toast from "react-hot-toast";

const availableContactColumns = {
  firstName: true,
  email: true,
  mobile: true,
  vendorName: true,
  contactOwner: true,
  leadSource: true,
  department: false,
  assistant: false,
  secondaryEmail: false,
};
const contactColumnsConfig = {
  firstName: {
    label: "Name",
    render: ({ row }) => {
      const contact = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200">
            <User className="h-4 w-4 text-gray-500" />
          </div>
          <div>{contact.firstName + " " + contact.lastName}</div>
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
        <div>{row.original.vendorName}</div>
        <div className="text-xs text-gray-500">{row.original.title}</div>
      </div>
    ),
  },
  contactOwner: {
    label: "Owner",
    render: ({ row }) => row.original.contactOwner,
  },
  leadSource: {
    label: "Source",
    render: ({ row }) => row.original.leadSource,
  },
  twitterHandle: {
    label: "Twitter",
    render: ({ row }) => row.original.twitterHandle || "-",
  },
  department: {
    label: "Department",
    render: ({ row }) => row.original.department || "-",
  },
  skypeId: {
    label: "Skype",
    render: ({ row }) => row.original.skypeId || "-",
  },
  assistant: {
    label: "Assistant",
    render: ({ row }) => row.original.assistant || "-",
  },
};


export default function ContactPage() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState("25");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectMultipleContacts, setSelectMultipleContacts] = useState([]);
    const [selectSingleContact, setSelectSingleContact] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [totalRecord, setTotalRecords] = useState(0);
    const [emailModel, setEmailModel] = useState(false);
    const [isMassEmail, setIsMassEmail] = useState(false);
    const [filterModelOpen, setFilterModelOpen] = useState(false);
    const navigate = useNavigate();
    const [visibleColumns, setVisibleColumns] = useState(availableContactColumns);
     const [showColumnSelector, setShowColumnSelector] = useState(false);

    const [constactData, refetchContacts, loading] = useFetchData(apiSummary.crm.getContacts,currentPage,recordsPerPage);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
     const [actionOpen, setActionOpen] = useState(false);
    useEffect(() => {
        setContacts(constactData?.data || []);
        setFilteredContacts(constactData?.data || []);
        setTotalRecords(constactData?.totalRecords);
        setCurrentPage(1);
    }, [constactData]);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredContacts(
            contacts.filter(
                (contact) =>
                    contact.firstName.toLowerCase().includes(term) ||
                    // contact.company.toLowerCase().includes(term) ||
                    contact.email.toLowerCase().includes(term) ||
                    contact.mobile.toLowerCase().includes(term),
            ),
        );
        setCurrentPage(1);
    }, [searchTerm]);

    const recordsPerPageValue = parseInt(recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPageValue;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPageValue;
    const totalPages = Math.ceil(totalRecord / recordsPerPageValue);

    const handleContactSelect = (lead) => {
        setSelectMultipleContacts((prev) =>
            prev.some((item) => item.id === lead.id) ? prev.filter((item) => item.id !== lead.id) : [...prev, lead],
        );
    };

    const handleSelectAll = () => {
        setSelectMultipleContacts(selectMultipleContacts.length === constactData.data.length ? [] : constactData.data);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => (prev.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }));
    };
 const columns = useMemo(() => {
  const dynamicCols = Object.keys(visibleColumns)
    .filter((key) => visibleColumns[key] && contactColumnsConfig[key])
    .map((key) => ({
      accessorKey: key,
      header: contactColumnsConfig[key].label,
      cell: contactColumnsConfig[key].render,
    }));

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(val) => {
            table.toggleAllRowsSelected(!!val);
            handleSelectAll();
          }}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => {
            row.toggleSelected(!!val);
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
        const contact = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setSelectSingleContact([contact]);
                setEmailModel(true);
              }}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setContactToDelete(contact);
                    setShowConfirmDelete(true);
                  }}
                >
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
                ...apiSummary.crm.deleteContact(id),
            });
            toast.success("Contact Deleted SuccussFully");
            refetchContacts();
            setCurrentPage(1);
        } catch (error) {
            toast.error("Contact Delation Failed");
        }
        finally{
            setIsDeleting(false);
        }
    };
    return (
        <div className="flex-1 bg-white">
            <div className="flex items-center justify-between  px-6 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Contacts</h1>
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
                  

<DropdownMenu open={showColumnSelector} onOpenChange={setShowColumnSelector}>
  <DropdownMenuTrigger asChild>
    <Button variant="primary"  className={` ${showColumnSelector ? "bg-primary text-white" : ""}`}>
      Columns <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="h-80 w-56 overflow-auto">
    {Object.keys(visibleColumns).map((key) => (
      <DropdownMenuItem
        key={key}
        onSelect={(e) => e.preventDefault()}
        className="flex items-center justify-between gap-2"
      >
        <span className="text-sm text-gray-700">
          {contactColumnsConfig[key]?.label || key.replace(/([A-Z])/g, " $1")}
        </span>
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
                            <Button variant="primary"  className={` ${actionOpen ? "bg-primary text-white" : ""}`}>
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
                            <DropdownMenuItem className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900" onClick={()=>navigate('/import/contacts')}>
                                <Import className="mr-2 h-4 w-4" />
                                Import Contacts
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/contacts/create")}
                        className="bg-primary text-white hover:bg-opacity-90"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Contact
                    </Button>
                </div>
            </div>

            <div className="flex flex-row-reverse items-center justify-between border-b px-6 py-2">
                <div className="relative w-full max-w-[20rem]">
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
                data={filteredContacts}
                loading={loading}
            />

            <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-2">
                <div className="text-sm text-gray-600">
                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredContacts.length)} of {totalRecord} results
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
                title={`Delete ${contactToDelete?.firstName} ${contactToDelete?.lastName}?`}
                description="This contact will be permanently deleted. Are you sure?"
                onConfirm={async () => {
                    setIsDeleting(true);
                    await handleDelete(contactToDelete.contactId);
                    setShowConfirmDelete(false);
                }}
            />
        </div>
    );
}
