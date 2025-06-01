"use client";

import { useState, useMemo } from "react";
import { Button } from "../../../components/layout/ui/button";
import { Card, CardContent } from "../../../components/layout/ui/card";
import { Badge } from "../../../components/layout/ui/badge";
import { Progress } from "../../../components/layout/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/layout/ui/dialog";
import { Input } from "../../../components/layout/ui/input";
import { Label } from "../../../components/layout/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectTrigger,
    SelectValue,
} from "../../../components/layout/ui/select";
import { Textarea } from "../../../components/layout/ui/textarea";
import { Slider } from "../../../components/layout/ui/slider";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    MailIcon,
    PhoneIcon,
    FileTextIcon,
    PlusIcon,
    BuildingIcon,
    CalendarDaysIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import { format } from "date-fns";
const initialLeads = [
    {
        id: "1454342",
        name: "Alice Johnson",
        company: "sdsfdfsfs",
        email: "alice.johnson@example.com",
        phone: "+1-555-123-4567",
        status: "New",
        source: "Website",
    },
    {
        id: "4354trr",
        name: "Bob Smith",
        company: "sdsfdfsfs",
        email: "bob.smith@example.com",
        phone: "+1-555-234-5678",
        status: "Contacted",
        source: "Referral",
    },
    {
        id: "ewe455",
        name: "Clara Evans",
        company: "sdsfdfsfs",
        email: "clara.evans@example.com",
        phone: "+1-555-345-6789",
        status: "Qualified",
        source: "Email Campaign",
    },
    {
        id: "13475645",
        name: "David Patel",
        company: "sdsfdfsfs",
        email: "david.patel@example.com",
        phone: "+1-555-456-7890",
        status: "New",
        source: "Social Media",
    },
    {
        id: "353534232",
        name: "Eva Brown",
        company: "sdsfdfsfs",
        email: "eva.brown@example.com",
        phone: "+1-555-567-8901",
        status: "Lost",
        source: "Website",
    },
    {
        id: "145465743",
        name: "Frank Garcia",
        company: "sdsfdfsfs",
        email: "frank.garcia@example.com",
        phone: "+1-555-678-9012",
        status: "New",
        source: "Advertisement",
    },
    {
        id: "15434242",
        name: "Grace Lee",
        email: "grace.lee@example.com",
        phone: "+1-555-789-0123",
        status: "Qualified",
        source: "Referral",
    },
    {
        id: "15454342",
        name: "Henry Wilson",
        email: "henry.wilson@example.com",
        phone: "+1-555-890-1234",
        status: "Contacted",
        source: "Website",
    },
    {
        id: "1464545",
        name: "Ivy Thomas",
        email: "ivy.thomas@example.com",
        phone: "+1-555-901-2345",
        status: "New",
        source: "Cold Call",
    },
    {
        id: "15655664",
        name: "Jack White",
        email: "jack.white@example.com",
        phone: "+1-555-012-3456",
        status: "Lost",
        source: "Email Campaign",
    },
    {
        id: "14557675",
        name: "Karen Adams",
        email: "karen.adams@example.com",
        phone: "+1-555-111-2222",
        status: "Qualified",
        source: "Referral",
    },
    {
        id: "14658",
        name: "Liam Scott",
        email: "liam.scott@example.com",
        phone: "+1-555-222-3333",
        status: "Contacted",
        source: "Social Media",
    },
    {
        id: "24365867",
        name: "Mia Turner",
        email: "mia.turner@example.com",
        phone: "+1-555-333-4444",
        status: "New",
        source: "Website",
    },
    {
        id: "187865",
        name: "Noah Hall",
        email: "noah.hall@example.com",
        phone: "+1-555-444-5555",
        status: "Lost",
        source: "Advertisement",
    },
    {
        id: "123353",
        name: "Olivia King",
        email: "olivia.king@example.com",
        phone: "+1-555-555-6666",
        status: "Contacted",
        source: "Email Campaign",
    },
    {
        id: "123546",
        name: "Peter Wright",
        email: "peter.wright@example.com",
        phone: "+1-555-666-7777",
        status: "New",
        source: "Referral",
    },
    {
        id: "123454",
        name: "Quinn Baker",
        email: "quinn.baker@example.com",
        phone: "+1-555-777-8888",
        status: "Qualified",
        source: "Website",
    },
    {
        id: "21443",
        name: "Rachel Moore",
        email: "rachel.moore@example.com",
        phone: "+1-555-888-9999",
        status: "Lost",
        source: "Cold Call",
    },
    {
        id: "11213",
        name: "Sam Allen",
        email: "sam.allen@example.com",
        phone: "+1-555-999-0000",
        status: "Contacted",
        source: "Social Media",
    },
    {
        id: "1454rqd",
        name: "Tina Campbell",
        email: "tina.campbell@example.com",
        phone: "+1-555-000-1111",
        status: "New",
        source: "Advertisement",
    },
];

const stageColors = {
    New: "bg-green-100 text-gray-800",
    Contacted: "bg-blue-100 text-blue-800",
    Qualified: "bg-purple-100 text-purple-800",
    "Identify Decision Makers": "bg-indigo-100 text-indigo-800",
    Lost: "bg-red-100 text-red-800",
    Negotiation: "bg-orange-100 text-orange-800",
    "Closed Won": "bg-green-100 text-green-800",
    "Closed Lost": "bg-red-100 text-red-800",
    "Closed Lost to Competition": "bg-red-100 text-red-800",
    Discovery: "bg-teal-100 text-teal-800", // Added for existing data
};
const options = [
    { value: "massUpdate", label: "Mass Update" },
    { value: "massDelete", label: "Mass Delete" },
    { value: "Export", label: "Export" },
    { value: "massConvert", label: "Mass Convert" },
];
export default function LeadPage() {
    const [leads, setLeads] = useState(initialLeads);
    const [isAddDealOpen, setIsAddDealOpen] = useState(false);
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedLeads, setSelectedLeads] = useState([]);
    const [selected, setSelected] = useState("");
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [dealsPerPage, setDealsPerPage] = useState(10); // Default items per page

    // Form state
    const [formData, setFormData] = useState({
        dealOwner: "",
        dealName: "",
        accountName: "",
        type: "",
        leadSource: "",
        contactName: "",
        amount: "",
        closingDate: "",
        stage: "",
        probability: [50],
        campaignSource: "",
        description: "",
    });

    // Calculate pipeline summary
    const pipelineStages = useMemo(() => {
        const stageGroups = leads.reduce((acc, deal) => {
            if (!acc[deal.stage]) {
                acc[deal.stage] = { count: 0, totalValue: 0 };
            }
            acc[deal.stage].count++;
            acc[deal.stage].totalValue += deal.amount;
            return acc;
        }, {});

        return [
            {
                name: "new",
                count: stageGroups["name"]?.count || 0,
                totalValue: stageGroups["name"]?.totalValue || 0,
                color: "text-blue-600",
            },
            {
                name: "Proposal",
                count: stageGroups["Proposal"]?.count || 0,
                totalValue: stageGroups["Proposal"]?.totalValue || 0,
                color: "text-yellow-600",
            },
            {
                name: "Negotiation",
                count: stageGroups["Negotiation"]?.count || 0,
                totalValue: stageGroups["Negotiation"]?.totalValue || 0,
                color: "text-orange-600",
            },
            {
                name: "Closed Won",
                count: stageGroups["Closed Won"]?.count || 0,
                totalValue: stageGroups["Closed Won"]?.totalValue || 0,
                color: "text-green-600",
            },
        ];
    }, [leads]);

    // Sorting logic
    const sortedDeals = useMemo(() => {
        return [...leads].sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            //   if (sortField === "amount" || sortField === "probability") {
            //     aValue = Number(aValue);
            //     bValue = Number(bValue);
            //   }

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });
    }, [leads, sortField, sortDirection]);

    // Pagination logic
    const indexOfLastDeal = currentPage * dealsPerPage;
    const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
    const currentDeals = sortedDeals.slice(indexOfFirstDeal, indexOfLastDeal);
    const totalPages = Math.ceil(sortedDeals.length / dealsPerPage);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDealsPerPageChange = (value) => {
        setDealsPerPage(Number(value));
        setCurrentPage(1); // Reset to first page when deals per page changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDeal = {
            id: Date.now().toString(),
            dealName: formData.dealName,
            accountName: formData.accountName,
            contactName: formData.contactName,
            amount: Number(formData.amount),
            stage: formData.stage,
            closingDate: formData.closingDate,
            dealOwner: formData.dealOwner,
            probability: formData.probability[0],
            type: formData.type,
            leadSource: formData.leadSource,
            campaignSource: formData.campaignSource,
            description: formData.description,
        };

        setLeads([...leads, newDeal]);
        setIsAddDealOpen(false);

        // Reset form
        setFormData({
            dealOwner: "",
            dealName: "",
            accountName: "",
            type: "",
            leadSource: "",
            contactName: "",
            amount: "",
            closingDate: "",
            stage: "",
            probability: [50],
            campaignSource: "",
            description: "",
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };
    const toggleLeadSelection = (id) => {
        setSelectedLeads((prev) => (prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]));
    };
    const isAllSelected = currentDeals.every((lead) => selectedLeads.includes(lead.id));
    const toggleSelectAll = () => {
        if (isAllSelected) {
            // Deselect all on this page
            setSelectedLeads((prev) => prev.filter((id) => !currentDeals.find((lead) => lead.id === id)));
        } else {
            // Add only current page leads
            const newSelections = currentDeals.map((lead) => lead.id).filter((id) => !selectedLeads.includes(id));
            setSelectedLeads((prev) => [...prev, ...newSelections]);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                    </div>
                    <div className="w-md flex gap-4">
                        <button className="h-10 rounded bg-black px-7 py-2 text-white">Filter</button>
                        <button className="h-10 rounded bg-black px-7 py-2 text-white">Add Lead</button>
                        <Select
                            value={selected}
                            onValueChange={setSelected}
                            className={"min-w-30"}
                        >
                            <SelectTrigger aria-label="Options">
                                <SelectValue placeholder="Options..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectScrollUpButton />
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                                <SelectScrollDownButton />
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Pipeline Summary Cards */}

                {/* Active Deals Table */}
                <Card className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="overflow-x-auto text-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="w-10 px-4 py-3">
                                            <input
                                                type="checkbox"
                                                className="w-full"
                                                checked={isAllSelected}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th className="min-w-[150px] px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("name")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Lead Name</span>
                                                {sortField === "name" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="min-w-[150px] px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("company")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Company</span>
                                                {sortField === "company" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="w-[350px] min-w-[250px] px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("email")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Email</span>
                                                {sortField === "email" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="min-w-[200px] px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("phone")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Phone</span>
                                                {sortField === "phone" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("status")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Status</span>
                                                {sortField === "status" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="min-w-[150px] px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("source")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Lead Source</span>
                                                {sortField === "source" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="min-w-[100px] px-4 py-3 text-left font-medium text-gray-600">
                                            <button
                                                onClick={() => handleSort("owner")}
                                                className="flex items-center space-x-1 hover:text-gray-900"
                                            >
                                                <span>Owner</span>
                                                {sortField === "owner" &&
                                                    (sortDirection === "asc" ? (
                                                        <ChevronUpIcon className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    ))}
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDeals.map((lead) => (
                                        <tr
                                            key={lead.id}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="w-8 px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    className="w-full"
                                                    checked={selectedLeads.includes(lead.id)}
                                                    onChange={() => toggleLeadSelection(lead.id)}
                                                />
                                            </td>
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">{lead.name}</p>
                                                    {/* <p className="text-sm text-gray-500">{deal.contactName}</p> */}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-900">{lead.company}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="font-medium text-gray-900">{lead.email}</span>
                                            </td>
                                            <td className="min-w-20 px-4 py-4">
                                                <BuildingIcon className="h-4 w-4 text-gray-400" />
                                                <span className="font-medium text-gray-900">{lead.phone}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge className={stageColors[lead.status] || "bg-gray-100 text-gray-800"}>{lead.status}</Badge>
                                            </td>
                                            {/* <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{deal.probability}%</span>
                          </div>
                          <Progress value={deal.probability} className="h-2" />
                        </div>
                      </td> */}
                                            {/* <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{formatDate(deal.closingDate)}</span>
                        </div>
                      </td> */}
                                            <td className="px-4 py-4">
                                                <span className="text-gray-900">{lead.source}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="text-gray-900">{lead.owner}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MailIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <PhoneIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <FileTextIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Label
                                    htmlFor="dealsPerPage"
                                    className="text-sm font-medium text-gray-600"
                                >
                                    Deals per page:
                                </Label>
                                <Select
                                    value={String(dealsPerPage)}
                                    onValueChange={handleDealsPerPageChange}
                                >
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue placeholder={dealsPerPage} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value={sortedDeals.length}>All</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
                                </Button>
                                <span className="text-sm font-medium text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next <ChevronRightIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
