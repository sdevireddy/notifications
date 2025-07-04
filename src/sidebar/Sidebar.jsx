import { useState, useRef, useEffect, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import {
    Search,
    Briefcase,
    Users,
    User,
    Building,
    ArrowLeftCircle,
    BookOpen,
    Mail,
    Megaphone,
    HelpCircle,
    Workflow,
    Settings,
    UserPlus,
} from "lucide-react";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import PropTypes from "prop-types";

import "@/sidebar/Sidebar.css";
import "@/sidebar/sidebar-theme.css";
import "@/sidebar/sidebar-search.css";
import "@/sidebar/sidebar-nav.css";
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
    ],
    Books: [
        { to: "/library", label: "Library", icon: <BookOpen size={20} /> }
    ],
    Marketing: [
        { to: "/campaigns", label: "Ad Campaigns", icon: <Megaphone size={20} /> }
    ],
    Campaigns: [
        { to: "/email-campaigns", label: "Email Campaigns", icon: <Mail size={20} /> }
    ],
    People: [
        { to: "/users", label: "Users", icon: <Users size={20} /> }
    ],
    TicketDesk: [
        { to: "/tickets", label: "Tickets", icon: <HelpCircle size={20} /> }
    ],
    HR: [
        { to: "hr/employees", label: "Employees", icon: <Users size={20} /> },
        { to: "hr/attendance", label: "Attendance", icon: <Briefcase size={20} /> },
        { to: "hr/leave", label: "Leave Management", icon: <BookOpen size={20} /> },
        { to: "hr/payroll", label: "Payroll", icon: <Settings size={20} /> },
        { to: "hr/performance", label: "Performance", icon: <Workflow size={20} /> },
        { to: "hr/recruitment", label: "Recruitment", icon: <UserPlus size={20} /> }
    ]
};


export const Sidebar = forwardRef(({ collapsed, activeModule }, ref) => {
    const [search, setSearch] = useState("");
    const [crmExpanded, setCrmExpanded] = useState(true);
    const sidebarRef = useRef(null);

    return (
        <div
            ref={sidebarRef}
            className={`h-full border-r border-gray-200 bg-blue-900 transition-all duration-300 dark:border-gray-700 dark:bg-slate-900 ${
                collapsed ? "w-[70px]" : "w-64"
            }`}
            onMouseEnter={() => ref?.current?.scrollTo?.({ top: 0 })}
        >
            <div className="flex items-center gap-x-3 px-6 py-3">
                <img
                    src={logoDark}
                    alt="Logo"
                    className=""
                />
                {!collapsed && <p className="text-lg font-medium text-white">Logoipsum</p>}
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
                <p className="ml-2 text-xs font-semibold text-gray-50 dark:text-gray-400 line-clamp-1">{activeModule}</p>
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
        {!collapsed && <span>{label}</span>}
    </NavLink>
);

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    activeModule: PropTypes.string,
};
