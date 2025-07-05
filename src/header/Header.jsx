import { useEffect, useRef, useState } from "react";
import {
    Bell, ChevronsLeft, Moon, Sun, Grid, Briefcase, Users, BookOpen, Megaphone, Mail, HelpCircle
} from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";
import PropTypes from "prop-types";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";

export const Header = ({ collapsed, setCollapsed, setActiveModule }) => {
    const navigate=useNavigate()
    const [showModules, setShowModules] = useState(false);  
    const { theme, setTheme } = useTheme();
    const moduleRef = useRef(null);
    const modules = [
        { name: "CRM", icon: <Briefcase size={24} className="text-blue-500" /> ,path:"/"},
        { name: "HR", icon: <Users size={24} className="text-green-500" /> ,path:"/hr"},
        { name: "Books", icon: <BookOpen size={24} className="text-purple-500" /> },
        { name: "Marketing", icon: <Megaphone size={24} className="text-orange-500" /> },
        { name: "Campaigns", icon: <Mail size={24} className="text-pink-500" /> },
        { name: "TicketDesk", icon: <HelpCircle size={24} className="text-red-500" /> },
    ];
useEffect(() => {
  const handleClickOutside = (event) => {
    if (moduleRef.current && !moduleRef.current.contains(event.target)) {
      setShowModules(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
    return (
        <header className="z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900 sticky top-0 border-b-2 border-gray-300">
            <div className="flex items-center gap-x-3">
                <button className="btn-ghost size-10" onClick={() => setCollapsed(!collapsed)}>
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>
            </div>
            <div className="flex items-center gap-x-3">
                {/* <button className="btn-ghost size-10" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button> */}
                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>

                <div className="relative"  ref={moduleRef}>
                    <button className="btn-ghost size-10" onClick={() => setShowModules(!showModules)}>
                        <Grid size={20} />
                    </button>
                    {showModules && (
                        <div className="absolute right-0 top-14 w-64 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 grid grid-cols-3 gap-4 z-50">
                            {modules.map((module, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setActiveModule(module.name);
                                        setShowModules(false);
                                        navigate(module.path)
                                    }}
                                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-all duration-200"
                                >
                                    {module.icon}
                                    <p className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">
                                        {module.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className="size-10 overflow-hidden rounded-full">
                    <img src={profileImg} alt="profile" className="size-full object-cover" />
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
    setActiveModule: PropTypes.func,
};
