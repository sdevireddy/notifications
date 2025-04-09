import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef, useState } from "react";

import { Sidebar } from "@/sidebar/Sidebar";
import { Header } from "@/header/Header";
import { cn } from "@/utils/cn";
import { ToastContainer } from 'react-toastify';


const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const [activeModule, setActiveModule] = useState("CRM"); // Stores the selected module

    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                    !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30",
                )}
            />
            <Sidebar ref={sidebarRef} collapsed={collapsed} activeModule={activeModule} />
            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[50px]")}>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} setActiveModule={setActiveModule} />
                <div className="w-[calc(100%-10px)] ml-[10px]">
             
                    <Outlet />
                    <ToastContainer position="top-right"
  autoClose={300}
  theme="colored" // or "dark"
  hideProgressBar={false} />
                </div>
            </div>
        </div>
    );
};

export default Layout;
