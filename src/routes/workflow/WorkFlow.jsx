import React, { useMemo, useState } from "react";
import { ChevronDown, Download, Plus, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Button } from "../../components/layout/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/layout/ui/input";
import { CardContent } from "../../components/layout/ui/card";
import Table from "../../components/Table";
import { Checkbox } from "@radix-ui/react-checkbox";
import BreadCrumb from "../../components/BreadCrumb";

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
 const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) => {
                    const rule = row.original;
                    return (
                        <div className="flex items-center gap-2">
      
                            <div>{rule.name}</div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "module",
                header: "Module",
            },
            {
                accessorKey: "action",
                header: "Action",
            },
             {
                accessorKey: "actionsCount",
                header: "Count",
            },
             {
                accessorKey: "modifiedOn",
                header: "Modified On",
            },
            {
                accessorKey: "company",
                header: "Company",
                cell: ({ row }) => (
                    <div>
                       <input type="checkbox" checked={row.original.status}/>
                    </div>
                ),
            }
          
        ],
        [],
    );
  return (
      <div className="h-full w-full rounded bg-white shadow-md">
         <div className="flex items-center justify-between  px-6 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">WorkFlow</h1>
                    <BreadCrumb />
                </div>
            </div>
          <div className="mb-4 flex items-center justify-between gap-4 px-6 py-3">
             <div className="border-b w-full">
              
                    <div className="relative max-w-[20rem] ">
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
                          <Button variant="primary">
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
                  className={"bg-primary hover:bg-opacity-90 text-white"}
                  onClick={() => navigate("/workflow/create")}
              >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Rule
              </Button>
            </div>
          </div>
           <Table
     columns={columns}
     data={rules}
     />
      </div>
  );
}
