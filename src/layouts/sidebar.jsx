import { useState, useRef, useEffect, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import {
    Search, Briefcase, Users, User, Building, ChevronDown, ChevronRight, ArrowLeftCircle, BookOpen, Mail, Megaphone, HelpCircle
} from "lucide-react";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import PropTypes from "prop-types";

import "@/styles/sidebar.css";
import "@/styles/sidebar-theme.css";
import "@/styles/sidebar-search.css";
import "@/styles/sidebar-nav.css";

export const Sidebar = forwardRef(({ collapsed, activeModule }, ref) => {
    const [search, setSearch] = useState("");
    const [crmExpanded, setCrmExpanded] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsCollapsed(true);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <aside
            ref={sidebarRef}
            className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
        >
            {isCollapsed && (
                <button className="expand-button" onClick={() => setIsCollapsed(false)}>
                    <ArrowLeftCircle size={24} />
                </button>
            )}

            <div className="flex gap-x-3 p-3 items-center">
                <img src={logoLight} alt="Logo" className="dark:hidden" />
                <img src={logoDark} alt="Logo" className="hidden dark:block" />
                {!isCollapsed && <p className="text-lg font-medium">Logoipsum</p>}
            </div>

            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="sidebar-search-input pl-10"
                    />
                </div>
            </div>

            <div className="sidebar-group">
                {search === "" && activeModule === "CRM" && (
                    <nav>
                        <p className="sidebar-group-title">CRM</p>
                        {crmExpanded && (
                            <div className="ml-5">
                                <NavLink to="/leads" className="sidebar-nav-link">
                                    <User size={22} />
                                    {!isCollapsed && <p>Leads</p>}
                                </NavLink>
                                <NavLink to="/contacts" className="sidebar-nav-link">
                                    <Users size={22} />
                                    {!isCollapsed && <p>Contacts</p>}
                                </NavLink>
                                <NavLink to="/accounts" className="sidebar-nav-link">
                                    <Building size={22} />
                                    {!isCollapsed && <p>Accounts</p>}
                                </NavLink>
                                <NavLink to="/deals" className="sidebar-nav-link">
                                    <Briefcase size={22} />
                                    {!isCollapsed && <p>Deals</p>}
                                </NavLink>
                            </div>
                        )}
                    </nav>
                )}

                {search === "" && activeModule === "Books" && (
                    <nav>
                        <p className="sidebar-group-title">Books</p>
                        <NavLink to="/library" className="sidebar-nav-link">
                            <BookOpen size={22} />
                            {!isCollapsed && <p>Library</p>}
                        </NavLink>
                    </nav>
                )}

                {search === "" && activeModule === "Marketing" && (
                    <nav>
                        <p className="sidebar-group-title">Marketing</p>
                        <NavLink to="/campaigns" className="sidebar-nav-link">
                            <Megaphone size={22} />
                            {!isCollapsed && <p>Ad Campaigns</p>}
                        </NavLink>
                    </nav>
                )}

                {search === "" && activeModule === "Campaigns" && (
                    <nav>
                        <p className="sidebar-group-title">Campaigns</p>
                        <NavLink to="/email-campaigns" className="sidebar-nav-link">
                            <Mail size={22} />
                            {!isCollapsed && <p>Email Campaigns</p>}
                        </NavLink>
                    </nav>
                )}

                {search === "" && activeModule === "People" && (
                    <nav>
                        <p className="sidebar-group-title">People</p>
                        <NavLink to="/users" className="sidebar-nav-link">
                            <Users size={22} />
                            {!isCollapsed && <p>Users</p>}
                        </NavLink>
                    </nav>
                )}

                {search === "" && activeModule === "TicketDesk" && (
                    <nav>
                        <p className="sidebar-group-title">Support</p>
                        <NavLink to="/tickets" className="sidebar-nav-link">
                            <HelpCircle size={22} />
                            {!isCollapsed && <p>Tickets</p>}
                        </NavLink>
                    </nav>
                )}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    activeModule: PropTypes.string,
};
