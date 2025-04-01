import { useState, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants";
import { Search } from "lucide-react";
import PropTypes from "prop-types";
import "./headerh.css"

import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";



export const Sidebar = forwardRef(({ collapsed, setCollapsed }, ref) => {
    const [search, setSearch] = useState("");

    const filteredLinks = navbarLinks
        .map(group => ({
            ...group,
            links: group.links.filter(link =>
                link.label.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter(group => group.links.length > 0);

    return (
        <header ref={ref} className={`header ${collapsed ? "collapsed" : ""}`}>
            {/* Header Logo Section */}
            <div className="header-logo-container flex items-center gap-x-3 p-3">
                <img src={logoLight} alt="Logo" className="dark:hidden" />
                <img src={logoDark} alt="Logo" className="hidden dark:block" />
                {!collapsed && <p className="text-lg font-medium">Logoipsum</p>}
            </div>

            {/* Search Input Section */}
            <div className="header-search-container flex items-center gap-x-2">
                <Search className="header-search-icon" size={18} />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="header-search-input"
                />
            </div>

            {/* Navigation Links Section */}
            <nav className="header-nav-links flex gap-x-6">
                {filteredLinks.map((navbarLink) => (
                    <div key={navbarLink.title} className="header-nav-group">
                        <p className="header-nav-title">{navbarLink.title}</p>
                        <div className="header-nav-items flex gap-x-4">
                            {navbarLink.links.map((link) => (
                                <NavLink 
                                    key={link.label} 
                                    to={link.path} 
                                    className="header-nav-link flex items-center"
                                >
                                    <link.icon size={22} className="text-white" color={navbarLink.color}/>
                                    {!collapsed && <p>{link.label}</p>}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </header>
    );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = { 
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func
};
