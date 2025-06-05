import { useState, useRef, useEffect, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import {
    Search, Briefcase, Users, User, Building, ArrowLeftCircle,
    BookOpen, Mail, Megaphone, HelpCircle
} from "lucide-react";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import PropTypes from "prop-types";

import "@/sidebar/sidebar.css";

export const Sidebar = forwardRef(({ collapsed, activeModule }, ref) => {
    const [search, setSearch] = useState("");
    const [crmExpanded, setCrmExpanded] = useState(true);
    const sidebarRef = useRef(null);

    return (
        <div
            ref={sidebarRef}
            className={`h-full transition-all duration-300 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 ${
                collapsed ? "w-[70px]" : "w-64"
            }`}
            onMouseEnter={() => ref?.current?.scrollTo?.({ top: 0 })}
        >
            <div className="flex items-center gap-x-3 p-3">
                <img src={logoLight} alt="Logo" className="dark:hidden" />
                <img src={logoDark} alt="Logo" className="hidden dark:block" />
                {!collapsed && <p className="text-lg font-medium">Logoipsum</p>}
            </div>

            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm"
                    />
                </div>
            </div>

            <div className="space-y-2 px-3">
                {search === "" && activeModule === "CRM" && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">CRM</p>
                        <SidebarLink to="/leads" icon={<User size={20} />} label="Leads" collapsed={collapsed} />
                        <SidebarLink to="/contacts" icon={<Users size={20} />} label="Contacts" collapsed={collapsed} />
                        <SidebarLink to="/accounts" icon={<Building size={20} />} label="Accounts" collapsed={collapsed} />
                        <SidebarLink to="/deals" icon={<Briefcase size={20} />} label="Deals" collapsed={collapsed} />
                        <SidebarLink to="/workflow" icon={<Briefcase size={20} />} label="Workflow" collapsed={collapsed} />
                        <SidebarLink to="/settings" icon={<Briefcase size={20} />} label="Settings" collapsed={collapsed} />
                    </>
                )}

                {search === "" && activeModule === "Books" && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Books</p>
                        <SidebarLink to="/library" icon={<BookOpen size={20} />} label="Library" collapsed={collapsed} />
                    </>
                )}

                {search === "" && activeModule === "Marketing" && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Marketing</p>
                        <SidebarLink to="/campaigns" icon={<Megaphone size={20} />} label="Ad Campaigns" collapsed={collapsed} />
                    </>
                )}

                {search === "" && activeModule === "Campaigns" && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Campaigns</p>
                        <SidebarLink to="/email-campaigns" icon={<Mail size={20} />} label="Email Campaigns" collapsed={collapsed} />
                    </>
                )}

                {search === "" && activeModule === "People" && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">People</p>
                        <SidebarLink to="/users" icon={<Users size={20} />} label="Users" collapsed={collapsed} />
                    </>
                )}

                {search === "" && activeModule === "TicketDesk" && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Support</p>
                        <SidebarLink to="/tickets" icon={<HelpCircle size={20} />} label="Tickets" collapsed={collapsed} />
                    </>
                )}
            </div>
        </div>
    );
});

const SidebarLink = ({ to, icon, label, collapsed }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                isActive ? "bg-slate-200 dark:bg-slate-800 text-black dark:text-white" : "text-gray-700 dark:text-gray-300"
            } hover:bg-slate-100 dark:hover:bg-slate-700`
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
