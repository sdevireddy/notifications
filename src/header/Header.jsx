import { useEffect, useRef, useState } from "react";
import { Bell, ChevronsLeft, Moon, Sun, Grid, Briefcase, Users, BookOpen, Megaphone, Mail, HelpCircle } from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";
import PropTypes from "prop-types";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";

export const Header = ({ collapsed, setCollapsed, setActiveModule }) => {
    const navigate = useNavigate();
    const [showModules, setShowModules] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { theme, setTheme } = useTheme();
    const moduleRef = useRef(null);
    const profileRef = useRef(null);

    const modules = [
        {
            name: "CRM",
            icon: (
                <Briefcase
                    size={24}
                    className="text-blue-500"
                />
            ),
            path: "/",
        },
        {
            name: "HR",
            icon: (
                <Users
                    size={24}
                    className="text-green-500"
                />
            ),
            path: "/hr",
        },
        {
            name: "Books",
            icon: (
                <BookOpen
                    size={24}
                    className="text-purple-500"
                />
            ),
        },
        {
            name: "Marketing",
            icon: (
                <Megaphone
                    size={24}
                    className="text-orange-500"
                />
            ),
             path: "/marketing",

        },
        {
            name: "Campaigns",
            icon: (
                <Mail
                    size={24}
                    className="text-pink-500"
                />
            ),
        },
        {
            name: "TicketDesk",
            icon: (
                <HelpCircle
                    size={24}
                    className="text-red-500"
                />
            ),
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moduleRef.current && !moduleRef.current.contains(event.target)) {
                setShowModules(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
const handleLogout=()=>{
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("tenantId");
    navigate("/login")

}
    return (
        <header className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b-2 border-gray-300 bg-white px-4 transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180" : ""} />
                </button>
            </div>
            <div className="flex items-center gap-x-3">
                <button className="btn-ghost size-10">
                    <Bell size={20} />
                </button>

                <div
                    className="relative"
                    ref={moduleRef}
                >
                    <button
                        className="btn-ghost size-10"
                        onClick={() => setShowModules(!showModules)}
                    >
                        <Grid size={20} />
                    </button>
                    {showModules && (
                        <div className="absolute right-0 top-14 z-50 grid w-64 grid-cols-3 gap-4 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
                            {modules.map((module, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setActiveModule(module.name);
                                        setShowModules(false);
                                        if (module.path) navigate(module.path);
                                    }}
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    {module.icon}
                                    <p className="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">{module.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className="relative"
                    ref={profileRef}
                >
                    <button
                        className="size-10 overflow-hidden rounded-full"
                        onClick={() => setShowProfile(!showProfile)}
                    >
                        <img
                            src={profileImg}
                            alt="profile"
                            className="size-full object-cover"
                        />
                    </button>
                    {showProfile && (
                        <div className="absolute right-0 top-14 z-50 w-56 rounded-md bg-white p-3 shadow-lg">
                            <div className="mb-3 flex items-center gap-3 border-b pb-3">
                                <img
                                    src={profileImg}
                                    alt="profile"
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">John Doe</p>
                                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                                </div>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                onClick={() => navigate("/profile")}
                            >
                                Go to Profile
                            </button>
                            <button
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
    setActiveModule: PropTypes.func,
};
