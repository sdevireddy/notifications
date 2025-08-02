import { useState, useRef, useEffect, forwardRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    Search,
    Briefcase,
    Users,
    MessageCircle,
    User,
    Building,
    ArrowLeftCircle,
    BookOpen,
    Megaphone,
    HelpCircle,
    Workflow,
    Settings,
    UserPlus,
    CalendarDays,
    UserRoundSearch,
    CircleDollarSign,
    ChartNoAxesCombined,
    Mail,
    GalleryHorizontalEnd,
    PanelLeftOpen,
    Phone,
} from "lucide-react";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import PropTypes from "prop-types";

import "@/sidebar/Sidebar.css";
import "@/sidebar/sidebar-theme.css";
import "@/sidebar/sidebar-search.css";
import "@/sidebar/sidebar-nav.css";
import { useSelector } from "react-redux";
import { FaTasks } from "react-icons/fa";
import { SiGotomeeting } from "react-icons/si";
import { LiaFileInvoiceSolid } from "react-icons/lia";
// Define links per module
const moduleLinks = {
    CRM: [
        { to: "/leads", label: "Leads", icon: <User size={20} /> },
        { to: "/contacts", label: "Contacts", icon: <Users size={20} /> },
        { to: "/accounts", label: "Accounts", icon: <Building size={20} /> },
        { to: "/deals", label: "Deals", icon: <Briefcase size={20} /> },
        { to: "/workflow", label: "Workflow", icon: <Workflow size={20} /> },
        { to: "/settings", label: "Settings", icon: <Settings size={20} /> },
        { to: "/users", label: "Users", icon: <UserPlus size={20} /> },
        { to: "/tasks", label: "Tasks", icon: <FaTasks  size={20} /> },
        { to: "/invoices", label: "Invoices", icon: <LiaFileInvoiceSolid size={24} /> },
        { to: "/meetings", label: "Mettings", icon: <SiGotomeeting  size={20} /> },
        { to: "/salesorders", label: "Sales Order", icon: <UserPlus size={20} /> },
        { to: "/calls", label: "Calls", icon: <Phone size={20} /> },
    ],
    Books: [{ to: "/library", label: "Library", icon: <BookOpen size={20} /> }],
    Marketing: [
        { to: "marketing/users", label: "Users", icon: <Users size={20} /> },
        { to: "marketing/templates", label: "Templates", icon: <GalleryHorizontalEnd size={20} /> },
        { to: "marketing/emailmarketing", label: "Email Marketing", icon: <Mail size={20} /> },
        { to: "marketing/SMSMarketing", label: "SMS Marketing", icon: <MessageCircle size={20} /> },
        { to: "marketing/SocialMediaMarketing", label: "Social media marketing", icon: <Megaphone size={20} /> },

        { to: "marketing/SocialMediaMarketing", label: "Social media marketing", icon:<Megaphone size={20} /> },
        { to: "marketing/settings", label: "Settings", icon: <Settings size={20} /> },
    ],
    Campaigns: [{ to: "/email-campaigns", label: "Email Campaigns", icon: <Mail size={20} /> }],
    People: [{ to: "/users", label: "Users", icon: <Users size={20} /> }],
    TicketDesk: [{ to: "/tickets", label: "Tickets", icon: <HelpCircle size={20} /> }],
    HR: [
        { to: "hr/employees", label: "Employees", icon: <Users size={20} /> },
        { to: "hr/attendance", label: "Attendance", icon: <UserRoundSearch size={20} /> },
        { to: "hr/leave", label: "Leave Management", icon: <CalendarDays size={20} /> },
        { to: "hr/payroll", label: "Payroll", icon: <CircleDollarSign size={20} /> },
        { to: "hr/performance", label: "Performance", icon: <ChartNoAxesCombined size={20} /> },
        { to: "hr/recruitment", label: "Recruitment", icon: <UserPlus size={20} /> },
    ],
};

export const Sidebar = forwardRef(({ collapsed, activeModule }, ref) => {
    const { logo, name } = useSelector((state) => state?.organization);
    const [search, setSearch] = useState("");
    const [crmExpanded, setCrmExpanded] = useState(true);
    const sidebarRef = useRef(null);

    return (
        <div
            ref={sidebarRef}
            className={`bg-sidebar h-full border-r border-gray-200 transition-all duration-300 dark:border-gray-700 dark:bg-slate-900 ${
                collapsed ? "w-[70px]" : "w-56"
            }`}
            onMouseEnter={() => ref?.current?.scrollTo?.({ top: 0 })}
        >
            <div className="pt-2">
                <Link
                    to={"/"}
                    className="ml-4 flex items-center gap-3"
                >
                    {!collapsed ? (
                        <div className="text- flex items-center gap-3 text-lg font-medium">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 w-10 rounded-[100%] object-cover"
                            />
                            <p>{name.toUpperCase()}</p>
                        </div>
                    ) : (
                        <PanelLeftOpen
                            size={32}
                            className="ml-2 text-white"
                        />
                    )}
                </Link>
            </div>

            <div className="p-3">
                <div className="relative">
                    <Search
                        className="absolute left-4 top-2.5 text-white"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-gray-800 py-2 pl-10 pr-3 text-sm text-gray-300 dark:border-gray-700 dark:bg-slate-800"
                    />
                </div>
            </div>

            <div className="space-y-2 px-3">
                <p className="ml-2 line-clamp-1 text-xs font-semibold text-gray-50 dark:text-gray-400">{activeModule}</p>
                <div className="overflow-y-scroll max-h-[72vh] scrollbar-none">
                {moduleLinks[activeModule]
                    ?.filter((link) => link.label.toLowerCase().includes(search.toLowerCase()))
                    .map((link, index) => (
                        <SidebarLink
                            key={index}
                            to={link.to}
                            icon={link.icon}
                            label={link.label}
                            collapsed={collapsed}
                        />
                    ))}
                    </div>
            </div>
        </div>
    );
});

const SidebarLink = ({ to, icon, label, collapsed }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? "border-primary bg-gray-50 text-primary shadow-md" : "text-white"
            } hover:bg-slate-300 hover:text-black dark:hover:bg-slate-700`
        }
    >
        {icon}
        {!collapsed && <span className="line-clamp-1">{label}</span>}
    </NavLink>
);

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    activeModule: PropTypes.string,
};
