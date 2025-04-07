import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

export const Sidebar = ({ collapsed, activeModule }) => {
    const subModules = {
        CRM: ["Leads", "Deals", "Contacts", "Workflow1"],
        People: ["Employees", "Teams", "Departments"],
        Books: ["Invoices", "Payments", "Reports"],
        Marketing: ["Ads", "SEO", "Analytics"],
        Campaigns: ["Email Campaigns", "Social Media", "Webinars"],
        TicketDesk: ["Open Tickets", "Closed Tickets", "Support"],
    };

    return (
        <aside className={cn("fixed left-0 top-0 h-full bg-white dark:bg-slate-900 transition-all duration-300 shadow-lg", collapsed ? "w-[70px]" : "w-[250px]")}>
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">{activeModule || "Select a Module"}</h2>
            </div>
            <nav className="p-2">
                {activeModule && subModules[activeModule] ? (
                    <ul>
                        {subModules[activeModule].map((sub, index) => (
                            <li key={index} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer rounded-md">
                                {sub}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm p-2">No submodules available.</p>
                )}
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    activeModule: PropTypes.string, // The selected module
};
