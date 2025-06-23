import React, { useState } from "react";
import { ChevronDown, Download, Plus, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Button } from "../../components/layout/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/layout/ui/input";
import { CardContent } from "../../components/layout/ui/card";

const modules = [
  "All Modules", "Leads", "Contacts", "Accounts", "Deals", "Tasks", "Meetings"
];

const rules = [
  {
    id:"123",
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
 const navigate=useNavigate()
  const filteredRules = selectedModule === "All Modules"
    ? rules
    : rules.filter((rule) => rule.module === selectedModule);

  return (
      <div className="h-full w-full rounded bg-gray-100 p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between gap-4">
             <div className="border-b w-full">
              
                    <div className="relative max-w-md ">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Search Rules..."
                            className="pl-10 "
                        />
                  
                </div>
            </div>
            <div className="flex gap-4">

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
              <Button
                  className={"bg-buttonprimary hover:bg-buttonprimary-hover text-white"}
                  onClick={() => navigate("/workflow/create")}
              >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Rule
              </Button>
            </div>
          </div>

        <CardContent className="p-0">
  <div className="w-full overflow-x-auto">
    <div className="min-w-[900px]">
      {/* Table Header */}
      <div className="grid grid-cols-10 gap-4 px-4 py-2 bg-gray-50 border-b text-sm font-medium text-gray-700">
        <div className="col-span-2 cursor-pointer" onClick={() => handleSort("firstName")}>
          <p className="flex items-center gap-2">Rule Name
           
          </p>
        </div>
        <div className="col-span-2 cursor-pointer" onClick={() => handleSort("email")}>
          <p className="flex items-center gap-2">Module
           
          </p>
        </div>
        <div className="col-span-2 cursor-pointer" onClick={() => handleSort("mobile")}>
          <p className="flex items-center gap-2">Excuted On
           
          </p>
        </div>
        <div className="col-span-1 cursor-pointer" onClick={() => handleSort("company")}>
          <p className="flex items-center gap-2">Actions
           
          </p>
        </div> <div className="col-span-2 cursor-pointer" onClick={() => handleSort("leadOwner")}>
          <p className="flex items-center gap-2">Modified On
           
          </p>
        </div>
        <div className="col-span-1 cursor-pointer" onClick={() => handleSort("leadStatus")}>
          <p className="flex items-center gap-2">Status
          </p>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y bg-white">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`grid grid-cols-10 gap-4 px-4 py-3 text-sm transition-colors `}
          >

            <div className="col-span-2 flex items-center gap-2">

              <div>
                <h3 className="font-semibold text-gray-900">{rule.name}</h3>
              </div>
            </div>

            <div className="col-span-2">
              <p className="text-gray-900 font-medium truncate">{rule.module}</p>
            </div>

            <div className="col-span-2">
              <p className="text-gray-900 font-medium">{rule.action}</p>
            </div>

            <div className="col-span-1">
              <p className="text-gray-900 font-medium">{rule.actionsCount}</p>
             
            </div>
             <div className="col-span-2">
              <p className="text-gray-900 font-medium truncate">{rule.modifiedOn}</p>
            </div>
            <div className="col-span-1 flex items-start">
                <input type="checkbox" checked={rule.status} />
            </div>

        
          </div>
        ))}
      </div>
    </div>
  </div>
</CardContent>
      </div>
  );
}
