"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "../../components/layout/ui/button";
import { Card, CardContent } from "../../components/layout/ui/card";
import { Badge } from "../../components/layout/ui/badge";
import { Progress } from "../../components/layout/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/layout/ui/dialog";
import { Input } from "../../components/layout/ui/input";
import { Label } from "../../components/layout/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/layout/ui/select";
import { Textarea } from "../../components/layout/ui/textarea";
import { Slider } from "../../components/layout/ui/slider";
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
  Search,
  Filter,
  ChevronRight,
  Edit
} from "lucide-react";
import { Checkbox } from "../../components/layout/ui/checkbox"
// import {Seperator}  from "../../components/layout/ui/seperator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/layout/ui/collapsible"
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../components/layout/ui/dropdown-menu"
import { BulkActionsToolbar } from "@/components/bulk-actions-toolbar"


// Initial data (using the 30 samples generated previously for better demonstration)
const initialDeals = [
  {
    id: "1",
    dealName: "Enterprise CRM Implementation",
    accountName: "Acme Corp",
    contactName: "John Smith",
    amount: 150000,
    stage: "Proposal",
    closingDate: "2024-02-15",
    dealOwner: "Sarah Johnson",
    probability: 75,
    type: "New Business",
    leadSource: "Web Research",
    campaignSource: "Q1 Enterprise Campaign",
    description: "Large enterprise CRM implementation project",
  },
  {
    id: "2",
    dealName: "Marketing Automation Setup",
    accountName: "TechStart Inc",
    contactName: "Sarah Wilson",
    amount: 45000,
    stage: "Negotiation",
    closingDate: "2024-02-28",
    dealOwner: "Mike Davis",
    probability: 60,
    type: "Existing Business",
    leadSource: "Partner",
    campaignSource: "Marketing Automation Series",
    description: "Marketing automation platform setup and training",
  },
  {
    id: "3",
    dealName: "Sales Training Program",
    accountName: "Global Solutions",
    contactName: "Robert Chen",
    amount: 25000,
    stage: "Qualified",
    closingDate: "2024-03-10",
    dealOwner: "Lisa Anderson",
    probability: 40,
    type: "New Business",
    leadSource: "Trade Show",
    campaignSource: "Sales Excellence Program",
    description: "Comprehensive sales training for 50+ team members",
  },
  {
    id: "4",
    dealName: "Cloud Migration Services",
    accountName: "Innovate Solutions",
    contactName: "Emily White",
    amount: 210000,
    stage: "Qualification",
    closingDate: "2024-04-01",
    dealOwner: "David Green",
    probability: 80,
    type: "New Business",
    leadSource: "Referral",
    campaignSource: "Cloud Transformation Initiative",
    description: "Migration of on-premise infrastructure to cloud",
  },
  {
    id: "5",
    dealName: "Data Analytics Platform",
    accountName: "Data Insights Co.",
    contactName: "Michael Brown",
    amount: 90000,
    stage: "Proposal",
    closingDate: "2024-03-20",
    dealOwner: "Sarah Johnson",
    probability: 70,
    type: "Existing Business",
    leadSource: "Existing Client",
    campaignSource: "Advanced Analytics Workshop",
    description: "Custom data analytics dashboard and reporting",
  },
  {
    id: "6",
    dealName: "IT Security Audit",
    accountName: "SecureNet Systems",
    contactName: "Jessica Lee",
    amount: 35000,
    stage: "Negotiation",
    closingDate: "2024-03-05",
    dealOwner: "Mike Davis",
    probability: 55,
    type: "New Business",
    leadSource: "Cold Call",
    campaignSource: "Cybersecurity Awareness",
    description: "Full IT security audit and vulnerability assessment",
  },
  {
    id: "7",
    dealName: "Mobile App Development",
    accountName: "Startup Hub",
    contactName: "Chris Taylor",
    amount: 120000,
    stage: "Discovery",
    closingDate: "2024-04-15",
    dealOwner: "Lisa Anderson",
    probability: 30,
    type: "New Business",
    leadSource: "Website",
    campaignSource: "Digital Transformation Series",
    description: "Development of a new customer-facing mobile application",
  },
  {
    id: "8",
    dealName: "ERP System Upgrade",
    accountName: "Apex Manufacturing",
    contactName: "Daniel Miller",
    amount: 300000,
    stage: "Closed Won",
    closingDate: "2024-01-30",
    dealOwner: "David Green",
    probability: 100,
    type: "Existing Business",
    leadSource: "Existing Client",
    campaignSource: "Internal Initiative",
    description: "Upgrade of legacy ERP system to latest version",
  },
  {
    id: "9",
    dealName: "Content Marketing Strategy",
    accountName: "Brand Builders",
    contactName: "Olivia Davis",
    amount: 50000,
    stage: "Proposal",
    closingDate: "2024-03-25",
    dealOwner: "Sarah Johnson",
    probability: 65,
    type: "New Business",
    leadSource: "Social Media",
    campaignSource: "Content Strategy Webinar",
    description: "Development and execution of a comprehensive content marketing strategy",
  },
  {
    id: "10",
    dealName: "Network Infrastructure Refresh",
    accountName: "Connect Solutions",
    contactName: "James Rodriguez",
    amount: 85000,
    stage: "Qualified",
    closingDate: "2024-04-05",
    dealOwner: "Mike Davis",
    probability: 45,
    type: "Existing Business",
    leadSource: "Direct Mail",
    campaignSource: "Network Modernization Drive",
    description: "Upgrade of network hardware and software across multiple offices",
  },
  {
    id: "11",
    dealName: "HR Software Implementation",
    accountName: "People First Corp",
    contactName: "Sophia Martinez",
    amount: 60000,
    stage: "Discovery",
    closingDate: "2024-04-20",
    dealOwner: "Lisa Anderson",
    probability: 25,
    type: "New Business",
    leadSource: "Event",
    campaignSource: "HR Tech Summit",
    description: "Implementation of a new human resources management system",
  },
  {
    id: "12",
    dealName: "E-commerce Platform Redesign",
    accountName: "Retail Innovators",
    contactName: "William Johnson",
    amount: 180000,
    stage: "Proposal",
    closingDate: "2024-03-18",
    dealOwner: "David Green",
    probability: 70,
    type: "Existing Business",
    leadSource: "Word of Mouth",
    campaignSource: "Digital Commerce Evolution",
    description: "Complete redesign and re-platforming of existing e-commerce site",
  },
  {
    id: "13",
    dealName: "CRM Training & Support",
    accountName: "Client First Solutions",
    contactName: "Ava Garcia",
    amount: 20000,
    stage: "Negotiation",
    closingDate: "2024-03-08",
    dealOwner: "Sarah Johnson",
    probability: 60,
    type: "Existing Business",
    leadSource: "Customer Service",
    campaignSource: "CRM Optimization Program",
    description: "Ongoing training and support for CRM users",
  },
  {
    id: "14",
    dealName: "Financial Planning Software",
    accountName: "Wealth Management Inc.",
    contactName: "Liam Hernandez",
    amount: 70000,
    stage: "Qualified",
    closingDate: "2024-04-10",
    dealOwner: "Mike Davis",
    probability: 40,
    type: "New Business",
    leadSource: "Online Ad",
    campaignSource: "FinTech Innovations",
    description: "Software solution for personalized financial planning",
  },
  {
    id: "15",
    dealName: "Customer Support System",
    accountName: "Support Masters",
    contactName: "Charlotte King",
    amount: 55000,
    stage: "Discovery",
    closingDate: "2024-04-25",
    dealOwner: "Lisa Anderson",
    probability: 30,
    type: "New Business",
    leadSource: "Referral",
    campaignSource: "Customer Experience Focus",
    description: "Implementation of a new omnichannel customer support system",
  },
  {
    id: "16",
    dealName: "Supply Chain Optimization",
    accountName: "Logistics Pro",
    contactName: "Ethan Wright",
    amount: 250000,
    stage: "Proposal",
    closingDate: "2024-03-30",
    dealOwner: "David Green",
    probability: 75,
    type: "Existing Business",
    leadSource: "Consulting",
    campaignSource: "Supply Chain Efficiency",
    description: "Consulting and implementation for supply chain optimization",
  },
  {
    id: "17",
    dealName: "Website Redesign & SEO",
    accountName: "Digital Presence",
    contactName: "Amelia Lopez",
    amount: 40000,
    stage: "Negotiation",
    closingDate: "2024-03-12",
    dealOwner: "Sarah Johnson",
    probability: 65,
    type: "New Business",
    leadSource: "Inbound",
    campaignSource: "Website Revamp Offer",
    description: "Complete website redesign with integrated SEO strategy",
  },
  {
    id: "18",
    dealName: "Project Management Tool",
    accountName: "Efficient Teams",
    contactName: "Noah Scott",
    amount: 18000,
    stage: "Qualified",
    closingDate: "2024-04-08",
    dealOwner: "Mike Davis",
    probability: 50,
    "type": "New Business",
    leadSource: "Online Demo",
    campaignSource: "Team Productivity Campaign",
    description: "Subscription and implementation of a project management tool",
  },
  {
    id: "19",
    dealName: "Cybersecurity Consulting",
    accountName: "Guardian Systems",
    contactName: "Harper Green",
    amount: 95000,
    stage: "Discovery",
    closingDate: "2024-05-01",
    dealOwner: "Lisa Anderson",
    probability: 20,
    type: "New Business",
    leadSource: "Trade Show",
    campaignSource: "Defend Your Data",
    description: "Consulting services for advanced cybersecurity threats",
  },
  {
    id: "20",
    dealName: "CRM Customization & Integration",
    accountName: "Growth Accelerators",
    contactName: "Evelyn Hall",
    amount: 110000,
    stage: "Proposal",
    closingDate: "2024-04-03",
    dealOwner: "David Green",
    probability: 80,
    type: "Existing Business",
    leadSource: "Upsell",
    campaignSource: "CRM Power-Up",
    description: "Customization and integration of existing CRM with other systems",
  },
  {
    id: "21",
    dealName: "Managed IT Services",
    accountName: "Reliable Tech",
    contactName: "Lucas Adams",
    amount: 65000,
    stage: "Negotiation",
    closingDate: "2024-03-15",
    dealOwner: "Sarah Johnson",
    probability: 50,
    type: "New Business",
    leadSource: "Cold Call",
    campaignSource: "IT Efficiency Program",
    description: "Ongoing managed IT services for network and system maintenance",
  },
  {
    id: "22",
    dealName: "Video Production Package",
    accountName: "Creative Content Co.",
    contactName: "Mia Baker",
    amount: 30000,
    stage: "Qualified",
    closingDate: "2024-04-12",
    dealOwner: "Mike Davis",
    probability: 35,
    type: "New Business",
    leadSource: "Social Media",
    campaignSource: "Visual Storytelling",
    description: "Series of corporate video productions for marketing",
  },
  {
    id: "23",
    dealName: "Cloud Storage Solution",
    accountName: "Data Keepers",
    contactName: "Alexander Perez",
    amount: 40000,
    stage: "Discovery",
    closingDate: "2024-05-05",
    dealOwner: "Lisa Anderson",
    probability: 25,
    type: "Existing Business",
    leadSource: "Renewal",
    campaignSource: "Secure Cloud Solutions",
    description: "Expansion of current cloud storage capacity and features",
  },
  {
    id: "24",
    dealName: "Software License Renewal",
    accountName: "Software Solutions Ltd.",
    contactName: "Ella Roberts",
    amount: 70000,
    stage: "Closed Won",
    closingDate: "2024-02-20",
    dealOwner: "David Green",
    probability: 100,
    type: "Existing Business",
    leadSource: "Renewal",
    campaignSource: "Annual Renewal Reminder",
    description: "Renewal of annual software licenses for all users",
  },
  {
    id: "25",
    dealName: "AI Chatbot Implementation",
    accountName: "Automated Support",
    contactName: "Jackson Turner",
    amount: 80000,
    stage: "Proposal",
    closingDate: "2024-04-18",
    dealOwner: "Sarah Johnson",
    probability: 70,
    type: "New Business",
    leadSource: "Website",
    campaignSource: "AI for Business",
    description: "Integration of an AI-powered chatbot for customer service",
  },
  {
    id: "26",
    dealName: "Website Maintenance Contract",
    accountName: "Web Presence Pro",
    contactName: "Scarlett Phillips",
    amount: 12000,
    stage: "Negotiation",
    closingDate: "2024-03-22",
    dealOwner: "Mike Davis",
    probability: 55,
    type: "Existing Business",
    leadSource: "Existing Client",
    campaignSource: "Maintenance Package Offer",
    description: "Annual contract for website maintenance and updates",
  },
  {
    id: "27",
    dealName: "SEO Audit & Strategy",
    accountName: "Search Engine Experts",
    contactName: "Henry Campbell",
    amount: 28000,
    stage: "Qualified",
    closingDate: "2024-04-28",
    dealOwner: "Lisa Anderson",
    probability: 45,
    type: "New Business",
    leadSource: "Cold Email",
    campaignSource: "Boost Your Rankings",
    description: "Comprehensive SEO audit with a tailored strategy for organic growth",
  },
  {
    id: "28",
    dealName: "Custom Software Development",
    accountName: "Tailored Solutions",
    contactName: "Grace Parker",
    amount: 350000,
    stage: "Discovery",
    closingDate: "2024-05-10",
    dealOwner: "David Green",
    probability: 30,
    type: "New Business",
    leadSource: "Referral",
    campaignSource: "Innovation Partnerships",
    description: "Development of bespoke software for specific business needs",
  },
  {
    id: "29",
    dealName: "Digital Marketing Campaign",
    accountName: "Online Growth Agency",
    contactName: "Chloe Evans",
    amount: 60000,
    stage: "Proposal",
    closingDate: "2024-04-05",
    dealOwner: "Sarah Johnson",
    probability: 75,
    type: "New Business",
    leadSource: "Web Research",
    campaignSource: "Full-Funnel Marketing",
    description: "Launch of a multi-channel digital marketing campaign",
  },
  {
    id: "30",
    dealName: "Server Infrastructure Upgrade",
    accountName: "Enterprise Data Corp",
    contactName: "Jack Collins",
    amount: 190000,
    stage: "Negotiation",
    closingDate: "2024-03-28",
    dealOwner: "Mike Davis",
    probability: 60,
    type: "Existing Business",
    leadSource: "Internal Request",
    campaignSource: "Infrastructure Modernization",
    description: "Upgrade of server hardware and virtualization software",
  },
];

const stageColors = {
  Qualification: "bg-gray-100 text-gray-800",
  "Value Proposition": "bg-purple-100 text-purple-800",
  "Identify Decision Makers": "bg-indigo-100 text-indigo-800",
  Proposal: "bg-yellow-100 text-yellow-800",
  Negotiation: "bg-orange-100 text-orange-800",
  "Closed Won": "bg-green-100 text-green-800",
  "Closed Lost": "bg-red-100 text-red-800",
  "Closed Lost to Competition": "bg-red-100 text-red-800",
  Discovery: "bg-teal-100 text-teal-800", // Added for existing data
};

export default function DealsPage() {
  const [deals, setDeals] = useState(initialDeals);
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [sortField, setSortField] = useState("dealName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredContacts, setFilteredContacts] = useState(deals)
  const [websiteActivityOpen, setWebsiteActivityOpen] = useState(false)
  const [filterByFieldsOpen, setFilterByFieldsOpen] = useState(false)
  const [relatedModulesOpen, setRelatedModulesOpen] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [dealsPerPage, setDealsPerPage] = useState(10); // Default items per page

  const [filterOwners, setFilterOwners] = useState([]);
const [filterStages, setFilterStages] = useState([]);
const [filterTypes, setFilterTypes] = useState([]);
const [filterLeadSources, setFilterLeadSources] = useState([]);
const [filterCompanies, setFilterCompanies] = useState([]);
const [filterProbability, setFilterProbability] = useState([0, 100]);
const [filterAmount, setFilterAmount] = useState([0, Math.max(...deals.map(d => d.amount))]);


const [selectedDeals, setSelectedDeals] = useState([]);

const availableDealColumns = [
  { key: "dealName", label: "Deal", required: true },
  { key: "accountName", label: "Company", required: false },
  { key: "amount", label: "Value", required: false },
  { key: "stage", label: "Stage", required: false },
  { key: "probability", label: "Probability", required: false },
  { key: "closingDate", label: "Close Date", required: false },
  { key: "dealOwner", label: "Owner", required: false },
  { key: "actions", label: "Actions", required: true },
];

const [visibleDealColumns, setVisibleDealColumns] = useState(
  Object.fromEntries(availableDealColumns.map((col) => [col.key, true]))
);


const handleDealColumnVisibilityChange = (columnKey, checked) => {
  setVisibleDealColumns((prev) => ({ ...prev, [columnKey]: checked }));
};


const handleDealSelect = (dealId) => {
  setSelectedDeals((prev) =>
    prev.includes(dealId) ? prev.filter((id) => id !== dealId) : [...prev, dealId]
  );
};

const handleSelectAll = () => {
  setSelectedDeals(selectedDeals.length === filteredContacts.length 
    ? [] 
    : currentDeals.map((deal) => deal.id));
};
const handleDeleteSelected = () => {
  // Confirm deletion
  if (!window.confirm(`Delete ${selectedDeals.length} selected deals?`)) return;

  // Perform deletion (simulate or send to backend)
  setFilteredContacts((prevDeals) =>
    prevDeals.filter((deal) => !selectedDeals.includes(deal.id))
  );

  // Clear selection
  setSelectedDeals([]);
};
const handleExportSelected = () => {
  const selected = filteredContacts.filter((deal) =>
    selectedDeals.includes(deal.id)
  );

  if (selected.length === 0) return;

  const headers = Object.keys(selected[0]); // or choose specific fields
  const csvRows = [
    headers.join(','), // Header row
    ...selected.map((deal) =>
      headers.map((key) => `"${deal[key]}"`).join(',')
    ),
  ];

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'selected-deals.csv';
  a.click();

  window.URL.revokeObjectURL(url);
};



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

//searching

useEffect(() => {
  let filtered = deals;

  if (!searchTerm) {
    setFilteredContacts(deals)
  } else {
    const term = searchTerm.toLowerCase()
    setFilteredContacts(
      deals.filter(
        (deal) =>
          deal.dealName.toLowerCase().includes(term) ||
          deal.accountName.toLowerCase().includes(term) ||
          deal.stage.toLowerCase().includes(term) ||
          deal.dealOwner.toLowerCase().includes(term)
      )
    )
  }
  filtered = filtered.filter(
    deal => deal.amount >= filterAmount[0] && deal.amount <= filterAmount[1]
  );

  setFilteredContacts(filtered); // <-- Correct: update filteredContacts
  setCurrentPage(1);            // <-- Correct: reset to first page
// ...rest of code... // Reset to first page when search changes
}, [searchTerm])

useEffect(() => {
  let filtered = deals;

  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (deal) =>
        deal.dealName.toLowerCase().includes(term) ||
        deal.accountName.toLowerCase().includes(term) ||
        deal.stage.toLowerCase().includes(term) ||
        deal.dealOwner.toLowerCase().includes(term)
    );
  }

  // Owner filter
  if (filterOwners.length > 0) {
    filtered = filtered.filter(deal => filterOwners.includes(deal.dealOwner));
  }
  // Stage filter
  if (filterStages.length > 0) {
    filtered = filtered.filter(deal => filterStages.includes(deal.stage));
  }
  // Type filter
  if (filterTypes.length > 0) {
    filtered = filtered.filter(deal => filterTypes.includes(deal.type));
  }
  // Lead Source filter
  if (filterLeadSources.length > 0) {
    filtered = filtered.filter(deal => filterLeadSources.includes(deal.leadSource));
  }
  // Company filter
  if (filterCompanies.length > 0) {
    filtered = filtered.filter(deal => filterCompanies.includes(deal.accountName));
  }
  // Probability filter
  filtered = filtered.filter(
    deal => deal.probability >= filterProbability[0] && deal.probability <= filterProbability[1]
  );
  // Amount filter
  filtered = filtered.filter(
    deal => deal.amount >= filterAmount[0] && deal.amount <= filterAmount[1]
  );
  setFilteredContacts(filtered); // <-- Correct: update filteredContacts
  setCurrentPage(filtered);
  setCurrentPage(1);
}, [
  searchTerm,
  deals,
  filterOwners,
  filterStages,
  filterTypes,
  filterLeadSources,
  filterCompanies,
  filterProbability,
  filterAmount
]);



  // Calculate pipeline summary
  const pipelineStages = useMemo(() => {
    const stageGroups = deals.reduce((acc, deal) => {
      if (!acc[deal.stage]) {
        acc[deal.stage] = { count: 0, totalValue: 0 };
      }
      acc[deal.stage].count++;
      acc[deal.stage].totalValue += deal.amount;
      return acc;
    }, {});

    return [
      {
        name: "Qualified",
        count: stageGroups["Qualified"]?.count || 0,
        totalValue: stageGroups["Qualified"]?.totalValue || 0,
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
  }, [deals]);

  // Sorting logic
  const sortedDeals = useMemo(() => {
    return [...filteredContacts].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "amount" || sortField === "probability") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredContacts, sortField, sortDirection]);

  // Pagination logic
  const indexOfLastDeal = currentPage * dealsPerPage;
  const indexOfFirstDeal = indexOfLastDeal - dealsPerPage;
  const currentDeals = filteredContacts.slice(indexOfFirstDeal, indexOfLastDeal);
  const totalPages = Math.ceil(filteredContacts.length / dealsPerPage);
  const [systemFiltersOpen, setSystemFiltersOpen] = useState(false)

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

    setDeals([...deals, newDeal]);
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

const handleEdit=()=>{

}
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
const uniqueOwners = useMemo(() => [...new Set(deals.map(d => d.dealOwner))], [deals]);
const uniqueStages = useMemo(() => [...new Set(deals.map(d => d.stage))], [deals]);
const uniqueTypes = useMemo(() => [...new Set(deals.map(d => d.type))], [deals]);
const uniqueLeadSources = useMemo(() => [...new Set(deals.map(d => d.leadSource))], [deals]);
const uniqueCompanies = useMemo(() => [...new Set(deals.map(d => d.accountName))], [deals]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
            <p className="text-gray-600 mt-1">Track and manage your sales opportunities and revenue pipeline</p>
          </div>
          <div>
          </div>
{/* add a new deal div start */}
<div>
          <Dialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dealOwner">Deal Owner</Label>
                    <Select
                      value={formData.dealOwner}
                      onValueChange={(value) => setFormData({ ...formData, dealOwner: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                        <SelectItem value="Lisa Anderson">Lisa Anderson</SelectItem>
                        <SelectItem value="John Wilson">John Wilson</SelectItem>
                        <SelectItem value="David Green">David Green</SelectItem> {/* Added for existing data */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dealName">Deal Name</Label>
                    <Input
                      id="dealName"
                      value={formData.dealName}
                      onChange={(e) => setFormData({ ...formData, dealName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Existing Business">Existing Business</SelectItem>
                        <SelectItem value="New Business">New Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leadSource">Lead Source</Label>
                    <Select
                      value={formData.leadSource}
                      onValueChange={(value) => setFormData({ ...formData, leadSource: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Advertisement">Advertisement</SelectItem>
                        <SelectItem value="Cold Call">Cold Call</SelectItem>
                        <SelectItem value="Employee Referral">Employee Referral</SelectItem>
                        <SelectItem value="External Referral">External Referral</SelectItem>
                        <SelectItem value="Online Store">Online Store</SelectItem>
                        <SelectItem value="Partner">Partner</SelectItem>
                        <SelectItem value="Public Relations">Public Relations</SelectItem>
                        <SelectItem value="Sales Email Alias">Sales Email Alias</SelectItem>
                        <SelectItem value="Seminar Partner">Seminar Partner</SelectItem>
                        <SelectItem value="Internal Seminar">Internal Seminar</SelectItem>
                        <SelectItem value="Trade Show">Trade Show</SelectItem>
                        <SelectItem value="Web Download">Web Download</SelectItem>
                        <SelectItem value="Web Research">Web Research</SelectItem>
                        <SelectItem value="Chat">Chat</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Existing Client">Existing Client</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Website">Website</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Social Media">Social Media</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Direct Mail">Direct Mail</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Event">Event</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Word of Mouth">Word of Mouth</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Customer Service">Customer Service</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Online Ad">Online Ad</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Consulting">Consulting</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Inbound">Inbound</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Online Demo">Online Demo</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Upsell">Upsell</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Renewal">Renewal</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Cold Email">Cold Email</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Internal Request">Internal Request</SelectItem> {/* Added for existing data */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="closingDate">Closing Date</Label>
                    <Input
                      id="closingDate"
                      type="date"
                      value={formData.closingDate}
                      onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Qualification">Qualification</SelectItem>
                      <SelectItem value="Needs Analysis">Needs Analysis</SelectItem>
                      <SelectItem value="Value Proposition">Value Proposition</SelectItem>
                      <SelectItem value="Identify Decision Makers">Identify Decision Makers</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Negotiation">Negotiation</SelectItem>
                      <SelectItem value="Closed Won">Closed Won</SelectItem>
                      <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                      <SelectItem value="Closed Lost to Competition">Closed Lost to Competition</SelectItem>
                      <SelectItem value="Discovery">Discovery</SelectItem> {/* Added for existing data */}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="probability">Probability (%): {formData.probability[0]}%</Label>
                  <Slider
                    value={formData.probability}
                    onValueChange={(value) => setFormData({ ...formData, probability: value })}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedRevenue">Expected Revenue</Label>
                  <Input
                    id="expectedRevenue"
                    value={formatCurrency((Number(formData.amount) || 0) * (formData.probability[0] / 100))}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="campaignSource">Campaign Source</Label>
                  <Input
                    id="campaignSource"
                    value={formData.campaignSource}
                    onChange={(e) => setFormData({ ...formData, campaignSource: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDealOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                    Add Deal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
                  {/* add a new deal div end */}

        </div>


        {/* Pipeline Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineStages.map((stage) => (
            <Card key={stage.name} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stage.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stage.count}</p>
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(stage.totalValue)} total value</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {/* Placeholder for icon, consider using a dynamic icon based on stage name */}
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        <div className=" items-center justify-between">
          {/* Horizontal Filter Bar */}
      <div className=" flex justify-between bg-white items-start border-b px-6 py-8">
        <div className="flex place-items-start  gap-4">
          {/* Search Input */}
          <div className="relative flex max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search Deals..." 
              className="pl-10 px-24"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* pagination */}
          <div className="flex items-center space-x-2">
                <Label htmlFor="dealsPerPage" className="text-sm font-medium text-gray-600">
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
                    <SelectItem value={String(filteredContacts.length)}>All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          </div>

<div>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="gap-2">
      <Eye className="h-4 w-4" />
      Columns
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48 enhanced-dropdown">
    {availableDealColumns.map((column) => (
      <DropdownMenuCheckboxItem
        key={column.key}
        checked={visibleDealColumns[column.key]}
        onCheckedChange={(checked) =>
          handleDealColumnVisibilityChange(column.key, checked)
        }
        disabled={column.required}
        className="data-[highlighted]:bg-blue-100 data-[highlighted]:text-gray-900"
      >
        {column.label}
        {column.required && (
          <span className="text-xs text-gray-500 ml-2">(Required)</span>
        )}
      </DropdownMenuCheckboxItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

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

{/* Deal Owner Filter */}
<Collapsible open={systemFiltersOpen} onOpenChange={setSystemFiltersOpen}>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
    <span className="font-medium text-sm">Deal Owner</span>
    {systemFiltersOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
  </CollapsibleTrigger>
  <CollapsibleContent className="pl-4 space-y-2">
    {uniqueOwners.map((owner) => (
      <div className="flex items-center space-x-2" key={owner}>
        <Checkbox
          id={`owner-${owner}`}
          checked={filterOwners.includes(owner)}
          onCheckedChange={(checked) => {
            setFilterOwners((prev) =>
              checked ? [...prev, owner] : prev.filter((o) => o !== owner)
            );
          }}
        />
        <Label htmlFor={`owner-${owner}`} className="text-sm">
          {owner}
        </Label>
      </div>
    ))}
  </CollapsibleContent>
</Collapsible>

{/* Stage Filter */}
<Collapsible open={filterByFieldsOpen} onOpenChange={setFilterByFieldsOpen}>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
    <span className="font-medium text-sm">Stage</span>
    {filterByFieldsOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
  </CollapsibleTrigger>
  <CollapsibleContent className="pl-4 space-y-2">
    {uniqueStages.map((stage) => (
      <div className="flex items-center space-x-2" key={stage}>
        <Checkbox
          id={`stage-${stage}`}
          checked={filterStages.includes(stage)}
          onCheckedChange={(checked) => {
            setFilterStages((prev) =>
              checked ? [...prev, stage] : prev.filter((s) => s !== stage)
            );
          }}
        />
        <Label htmlFor={`stage-${stage}`} className="text-sm">
          {stage}
        </Label>
      </div>
    ))}
  </CollapsibleContent>
</Collapsible>

{/* Type Filter */}
<Collapsible open={relatedModulesOpen} onOpenChange={setRelatedModulesOpen}>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
    <span className="font-medium text-sm">Type</span>
    {relatedModulesOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
  </CollapsibleTrigger>
  <CollapsibleContent className="pl-4 space-y-2">
    {uniqueTypes.map((type) => (
      <div className="flex items-center space-x-2" key={type}>
        <Checkbox
          id={`type-${type}`}
          checked={filterTypes.includes(type)}
          onCheckedChange={(checked) => {
            setFilterTypes((prev) =>
              checked ? [...prev, type] : prev.filter((t) => t !== type)
            );
          }}
        />
        <Label htmlFor={`type-${type}`} className="text-sm">
          {type}
        </Label>
      </div>
    ))}
  </CollapsibleContent>
</Collapsible>

{/* Lead Source Filter */}
<Collapsible>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
    <span className="font-medium text-sm">Lead Source</span>
    <ChevronRightIcon className="h-4 w-4" />
  </CollapsibleTrigger>
  <CollapsibleContent className="pl-4 space-y-2">
    {uniqueLeadSources.map((source) => (
      <div className="flex items-center space-x-2" key={source}>
        <Checkbox
          id={`leadSource-${source}`}
          checked={filterLeadSources.includes(source)}
          onCheckedChange={(checked) => {
            setFilterLeadSources((prev) =>
              checked ? [...prev, source] : prev.filter((s) => s !== source)
            );
          }}
        />
        <Label htmlFor={`leadSource-${source}`} className="text-sm">
          {source}
        </Label>
      </div>
    ))}
  </CollapsibleContent>
</Collapsible>

{/* Company Filter */}
<Collapsible>
  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded">
    <span className="font-medium text-sm">Company</span>
    <ChevronRightIcon className="h-4 w-4" />
  </CollapsibleTrigger>
  <CollapsibleContent className="pl-4 space-y-2">
    {uniqueCompanies.map((company) => (
      <div className="flex items-center space-x-2" key={company}>
        <Checkbox
          id={`company-${company}`}
          checked={filterCompanies.includes(company)}
          onCheckedChange={(checked) => {
            setFilterCompanies((prev) =>
              checked ? [...prev, company] : prev.filter((c) => c !== company)
            );
          }}
        />
        <Label htmlFor={`company-${company}`} className="text-sm">
          {company}
        </Label>
      </div>
    ))}
  </CollapsibleContent>
</Collapsible>
</div>

</DropdownMenuContent>

</DropdownMenu>  
</div>
{/* bulk actions bar */}
{selectedDeals.length > 0 && (
  <div className="sticky top-0 z-10 bg-white border-b shadow-sm px-4 py-2">
    <BulkActionsToolbar
      selectedCount={selectedDeals.length}
      onClearSelection={() => setSelectedDeals([])}
      onDeleteSelected={ handleDeleteSelected} // example
      onExportSelected={handleExportSelected} // example
    />
  </div>
)}

        {/* Active Deals Table */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Deals</h2>
              <p className="text-gray-600 mt-1">Manage your sales opportunities and track progress</p>
            </div>
            <div>
      <div>
      

      </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-gray-200">
                    <th>
                    <div className="col-span-1 items-center border-black">
  <Checkbox 
    checked={
      selectedDeals.length > 0 && 
      selectedDeals.length === currentDeals.length
    } 
    onCheckedChange={handleSelectAll}
    className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
  />
</div>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("dealName")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Deal</span>
                        {sortField === "dealName" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("accountName")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Company</span>
                        {sortField === "accountName" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("amount")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Value</span>
                        {sortField === "amount" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("stage")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Stage</span>
                        {sortField === "stage" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("probability")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Probability</span>
                        {sortField === "probability" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("closingDate")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Close Date</span>
                        {sortField === "closingDate" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      <button
                        onClick={() => handleSort("dealOwner")}
                        className="flex items-center space-x-1 hover:text-gray-900"
                      >
                        <span>Owner</span>
                        {sortField === "dealOwner" &&
                          (sortDirection === "asc" ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          ))}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((deal) => (
                    <tr key={deal.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                      <div className="">
  <Checkbox
    checked={selectedDeals.includes(deal.id)}
    onCheckedChange={() => handleDealSelect(deal.id)}
    className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
  />
</div>
</td>
<td>
                        <div>
                          <p className="font-medium text-gray-900">{deal.dealName}</p>
                          <p className="text-sm text-gray-500">{deal.contactName}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <BuildingIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{deal.accountName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{formatCurrency(deal.amount)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={stageColors[deal.stage] || "bg-gray-100 text-gray-800"}>{deal.stage}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{deal.probability}%</span>
                          </div>
                          <Progress value={deal.probability} className="h-2" />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{formatDate(deal.closingDate)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{deal.dealOwner}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MailIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <PhoneIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </Button>
                          <div>
                          <Dialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen}>
            <DialogTrigger asChild>
              <Button className="">
                <Edit className="" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Deal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dealOwner">Deal Owner</Label>
                    <Select
                      value={formData.dealOwner}
                      onValueChange={(value) => setFormData({ ...formData, dealOwner: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Mike Davis">Mike Davis</SelectItem>
                        <SelectItem value="Lisa Anderson">Lisa Anderson</SelectItem>
                        <SelectItem value="John Wilson">John Wilson</SelectItem>
                        <SelectItem value="David Green">David Green</SelectItem> {/* Added for existing data */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dealName">Deal Name</Label>
                    <Input
                      id="dealName"
                      value={formData.dealName}
                      onChange={(e) => setFormData({ ...formData, dealName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Existing Business">Existing Business</SelectItem>
                        <SelectItem value="New Business">New Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leadSource">Lead Source</Label>
                    <Select
                      value={formData.leadSource}
                      onValueChange={(value) => setFormData({ ...formData, leadSource: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Advertisement">Advertisement</SelectItem>
                        <SelectItem value="Cold Call">Cold Call</SelectItem>
                        <SelectItem value="Employee Referral">Employee Referral</SelectItem>
                        <SelectItem value="External Referral">External Referral</SelectItem>
                        <SelectItem value="Online Store">Online Store</SelectItem>
                        <SelectItem value="Partner">Partner</SelectItem>
                        <SelectItem value="Public Relations">Public Relations</SelectItem>
                        <SelectItem value="Sales Email Alias">Sales Email Alias</SelectItem>
                        <SelectItem value="Seminar Partner">Seminar Partner</SelectItem>
                        <SelectItem value="Internal Seminar">Internal Seminar</SelectItem>
                        <SelectItem value="Trade Show">Trade Show</SelectItem>
                        <SelectItem value="Web Download">Web Download</SelectItem>
                        <SelectItem value="Web Research">Web Research</SelectItem>
                        <SelectItem value="Chat">Chat</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Existing Client">Existing Client</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Website">Website</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Social Media">Social Media</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Direct Mail">Direct Mail</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Event">Event</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Word of Mouth">Word of Mouth</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Customer Service">Customer Service</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Online Ad">Online Ad</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Consulting">Consulting</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Inbound">Inbound</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Online Demo">Online Demo</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Upsell">Upsell</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Renewal">Renewal</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Cold Email">Cold Email</SelectItem> {/* Added for existing data */}
                        <SelectItem value="Internal Request">Internal Request</SelectItem> {/* Added for existing data */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="closingDate">Closing Date</Label>
                    <Input
                      id="closingDate"
                      type="date"
                      value={formData.closingDate}
                      onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Qualification">Qualification</SelectItem>
                      <SelectItem value="Needs Analysis">Needs Analysis</SelectItem>
                      <SelectItem value="Value Proposition">Value Proposition</SelectItem>
                      <SelectItem value="Identify Decision Makers">Identify Decision Makers</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Negotiation">Negotiation</SelectItem>
                      <SelectItem value="Closed Won">Closed Won</SelectItem>
                      <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                      <SelectItem value="Closed Lost to Competition">Closed Lost to Competition</SelectItem>
                      <SelectItem value="Discovery">Discovery</SelectItem> {/* Added for existing data */}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="probability">Probability (%): {formData.probability[0]}%</Label>
                  <Slider
                    value={formData.probability}
                    onValueChange={(value) => setFormData({ ...formData, probability: value })}
                    max={100}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="expectedRevenue">Expected Revenue</Label>
                  <Input
                    id="expectedRevenue"
                    value={formatCurrency((Number(formData.amount) || 0) * (formData.probability[0] / 100))}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="campaignSource">Campaign Source</Label>
                  <Input
                    id="campaignSource"
                    value={formData.campaignSource}
                    onChange={(e) => setFormData({ ...formData, campaignSource: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDealOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                    Add Deal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
                          </div>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-2" /> Previous
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
                  Next <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
        </div>
        </div>
      );
}