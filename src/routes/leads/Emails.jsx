import React from "react";
import { Mail, Send, FileText, Users, Search, User } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Outlook Clone</h2>
      <nav className="space-y-4">
        <SidebarItem icon={<Mail />} label="Inbox" />
        <SidebarItem icon={<Send />} label="Sent" />
        <SidebarItem icon={<FileText />} label="Drafts" />
        <SidebarItem icon={<Users />} label="Contacts" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-md w-1/3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full text-white"
        />
      </div>
      <div className="flex items-center space-x-3">
        <User size={24} className="text-white" />
        <span className="text-sm">John Doe</span>
      </div>
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="p-6"> 
      <h1 className="text-xl font-bold">Welcome to Your Inbox</h1>
      <p className="text-gray-600 mt-2">Select an email to read.</p>
    </div>
  );
};

const Emails = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <MainContent />
      </div>
    </div>
  );
};

export default Emails;
