import { useState, forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "@/constants";
import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

// Import CSS
import "@/styles/sidebar.css";
import "@/styles/sidebar-theme.css";
import "@/styles/sidebar-search.css";
import "@/styles/sidebar-nav.css";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
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
        <aside ref={ref} className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="flex gap-x-3 p-3 items-center">
                <img src={logoLight} alt="Logo" className="dark:hidden" />
                <img src={logoDark} alt="Logo" className="hidden dark:block" />
                {!collapsed && <p className="text-lg font-medium">Logoipsum</p>}
            </div>

            {/* Search Input */}
            {!collapsed && (
                <div className="sidebar-search-container">
                    <Search className="sidebar-search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="sidebar-search-input"
                    />
                </div>
            )}

            <div className="sidebar-group">
                {filteredLinks.map((navbarLink) => (
                    <nav key={navbarLink.title}>
                        <p className="sidebar-group-title">{navbarLink.title}</p>
                        {navbarLink.links.map((link) => (
                            <NavLink key={link.label} to={link.path} className="sidebar-nav-link">
                                <link.icon size={22} className="text-white" />
                                {!collapsed && <p>{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = { collapsed: PropTypes.bool };
