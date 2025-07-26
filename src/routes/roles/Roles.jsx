import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ChevronDown, ChevronRight, Pencil, Plus } from 'lucide-react';
import BreadCrumb from '../../components/BreadCrumb'
import { Link, useNavigate } from 'react-router-dom';
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

const RoleNode = ({ role,isopen }) => {
  const [isOpen, setIsOpen] = useState(isopen);

  return (
    <div className="ml-4">
      <div
        className="flex items-center gap-4 px-2 py-1 rounded-md transition hover:bg-gray-50 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {role.children.length > 0 ? (
            isOpen ? <ArrowDown size={18} className='text-primary'/> : <ArrowRight size={18} />
          ) : (
            <span className="w-[18px]" />
          )}
          <span className="font-semibold text-gray-800">{role.name}</span>
        </div>

        {/* Show only on hover of this specific item */}
        <Link
        to={"/roles/edit"}
          className="text-gray-500 hover:text-blue-600 invisible group-hover:visible transition"
          title="Edit Role"
          onClick={(e) => {
            e.stopPropagation();
            // alert(`Edit role: ${role.name}`);
          }}
        >
          <Pencil size={16} />
        </Link>
      </div>

      {isOpen && role.children.length > 0 && (
        <div className="ml-4 border-l border-gray-300 pl-3 mt-1">
          {role.children.map((child, index) => (
            <RoleNode key={index} role={child} isopen={false}/>
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
      <div className="flex items-center justify-between border-b px-6 py-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Roles</h1>
          <BreadCrumb />
        </div>
        <Button
                        onClick={() => navigate("/roles/create")}
                        className="bg-primary text-white hover:bg-opacity-90"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Role
                    </Button>
      </div>

      <div className="px-6 py-4">
        {rolesData.map((role, index) => (
          <RoleNode key={index} role={role} isopen={true}/>
        ))}
      </div>
    </div>
  );
};

export default RolesPage;
