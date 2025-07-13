import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Pencil, Plus } from 'lucide-react';
import BreadCrumb from '../../components/BreadCrumb'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/layout/ui/button';

const rolesData = [
  {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        children: [
          {
            name: 'Sales',
            children: [
              { name: 'User', children: [] },
            ],
          },
        ],
      },
       {
        name: 'Manager',
        children: [
          {
            name: 'Sales',
            children: [
              { name: 'User', children: [] },
            ],
          },
        ],
      },
    ],
  },
];

const RoleNode = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="ml-4">
      <div
        className="flex items-center gap-4 px-2 py-1 rounded-md transition hover:bg-gray-50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {role.children.length > 0 ? (
            isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
          ) : (
            <span className="w-[18px]" />
          )}
          <span className="font-medium text-gray-800">{role.name}</span>
        </div>

        {/* Show only on hover of this specific item */}
        <button
          className="text-gray-500 hover:text-blue-600 invisible group-hover:visible transition"
          title="Edit Role"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Edit role: ${role.name}`);
          }}
        >
          <Pencil size={16} />
        </button>
      </div>

      {isOpen && role.children.length > 0 && (
        <div className="ml-4 border-l border-gray-300 pl-3 mt-1">
          {role.children.map((child, index) => (
            <RoleNode key={index} role={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const RolesPage = () => {
  const navigate=useNavigate()
  return (
    <div className="flex-1 bg-white h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
          <BreadCrumb />
        </div>
        <Button
                        onClick={() => navigate("/roles/create")}
                        className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Role
                    </Button>
      </div>

      <div className="px-6 py-4">
        {rolesData.map((role, index) => (
          <RoleNode key={index} role={role} />
        ))}
      </div>
    </div>
  );
};

export default RolesPage;
