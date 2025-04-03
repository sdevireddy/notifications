

import { useState, useRef, useEffect, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import { 
    Search, Briefcase, Users, User, Building, ChevronDown, ChevronRight, ArrowLeftCircle 
} from "lucide-react";
import PropTypes from "prop-types";

// Import CSS
import "@/styles/sidebar.css";
import "@/styles/sidebar-theme.css";
import "@/styles/sidebar-search.css";
import "@/styles/sidebar-nav.css";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const [search, setSearch] = useState("");
    const [crmExpanded, setCrmExpanded] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const sidebarRef = useRef(null);

    // Handle click outside sidebar to minimize
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsCollapsed(true);
                setSearch(""); // Clear search input when sidebar collapses
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter links based on search
    const filteredLinks = navbarLinks
        .flatMap(group => 
            group.links.filter(link => link.label.toLowerCase().includes(search.toLowerCase()))
        );

    return (
        <aside 
            ref={sidebarRef} 
            className={`sidebar ${isCollapsed ? "collapsed" : ""}`} 
            onMouseEnter={() => setIsCollapsed(false)} 
            onMouseLeave={() => setIsCollapsed(true)}
        >
            {/* Expand Button (when minimized) */}
            {isCollapsed && (
                <button className="expand-button" onClick={() => setIsCollapsed(false)}>
                    <ArrowLeftCircle size={24} />
                </button>
            )}

            {/* Logo Section */}
            <div className="flex gap-x-3 p-3 items-center">
                <img src={logoLight} alt="Logo" className="dark:hidden" />
                <img src={logoDark} alt="Logo" className="hidden dark:block" />
                {!isCollapsed && <p className="text-lg font-medium">Logoipsum</p>}
            </div>

            {/* Search Input */}
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

            {/* Sidebar Navigation */}
            <div className="sidebar-group">
                {/* CRM Module - Collapsible */}
                {search === "" && (
                    <nav>
                        <p className="sidebar-group-title">CRM</p>
                        <button 
                            className="sidebar-nav-link flex items-center w-full text-left" 
                            onClick={() => setCrmExpanded(!crmExpanded)}
                        >
                            <Briefcase size={22} />
                            {!isCollapsed && <p className="flex-1">CRM</p>}
                            {!isCollapsed && (crmExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
                        </button>
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

                {/* Search Results (hide module names) */}
                {search !== "" &&
                    filteredLinks.map((link) => (
                        <NavLink key={link.label} to={link.path} className="sidebar-nav-link">
                            <link.icon size={22} />
                            {!isCollapsed && <p>{link.label}</p>}
                        </NavLink>
                    ))
                }
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = { collapsed: PropTypes.bool };
