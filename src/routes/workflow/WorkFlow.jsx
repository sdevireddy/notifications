import React, { useState } from "react";
import { ChevronDown, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Button } from "../../components/layout/ui/button";

const modules = [
  "All Modules", "Leads", "Contacts", "Accounts", "Deals", "Tasks", "Meetings"
];

const rules = [
  {
    name: "Big Deal Rule",
    module: "Deals",
    action: "Create or Edit",
    actionsCount: 1,
    modifiedOn: "02/03/2024",
    status: true,
  },
];

export default function WorkflowPage() {
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredRules = selectedModule === "All Modules"
    ? rules
    : rules.filter((rule) => rule.module === selectedModule);

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md w-full h-full">
      <div className="flex justify-end items-center mb-4 gap-4">
        <div className="relative">
            <DropdownMenu className={"bg-blue-200"}>
                                      <DropdownMenuTrigger asChild>
                                          <Button variant="outline">
                                              Modules <ChevronDown className="ml-2 h-4 w-4" />
                                          </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                          align="end"
                                          className="w-56"
                                      >
                                          <DropdownMenuItem>Leads</DropdownMenuItem>
                                          <DropdownMenuItem>Contacts</DropdownMenuItem>
                                          <DropdownMenuItem>Accounts</DropdownMenuItem>
                                          <DropdownMenuItem>Tasks</DropdownMenuItem>
                                          <DropdownMenuItem>Deals</DropdownMenuItem>
                                         
                            
                                      </DropdownMenuContent>
                                  </DropdownMenu>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Rule
        </button>
      </div>

      <table className="w-full table-auto border-collapse text-left text-sm bg-gray-50" >
        <thead>
          <tr >
            <th className="px-4 py-2">Rule Name</th>
            <th className="px-4 py-2">Module</th>
            <th className="px-4 py-2">Execute On</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Modified On</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRules.map((rule, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2 text-blue-600 underline cursor-pointer">
                {rule.name}
              </td>
              <td className="px-4 py-2">{rule.module}</td>
              <td className="px-4 py-2">{rule.action}</td>
              <td className="px-4 py-2">{rule.actionsCount}</td>
              <td className="px-4 py-2">{rule.modifiedOn}</td>
              <td className="px-4 py-2">
                <input type="checkbox" checked={rule.status} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
