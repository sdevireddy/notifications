import { Mail, Phone, Search } from 'lucide-react';
import { Input } from '../../components/layout/ui/input';

const users = [
  {
    id: 1,
    name: "Siva Sankar",
    role: "CEO, Administrator",
    badge: "Administrator",
    email: "sivasankar@xgeniesoft.com",
    isSelected: true,
  },
  {
    id: 2,
    name: "SivaSankar D",
    role: "CEO",
    badge: "Super Admin",
    email: "sivasankar.d@ipixelzen.com",
    isSelected: false,
  },
   {
    id: 2,
    name: "SivaSankar D",
    role: "CEO",
    badge: "Super Admin",
    email: "sivasankar.d@ipixelzen.com",
    isSelected: false,
  },
   {
    id: 2,
    name: "SivaSankar D",
    role: "CEO",
    badge: "Super Admin",
    email: "sivasankar.d@ipixelzen.com",
    isSelected: false,
  },
   {
    id: 2,
    name: "SivaSankar D",
    role: "CEO",
    badge: "Super Admin",
    email: "sivasankar.d@ipixelzen.com",
    isSelected: false,
  },
   {
    id: 2,
    name: "SivaSankar D",
    role: "CEO",
    badge: "Super Admin",
    email: "sivasankar.d@ipixelzen.com",
    isSelected: false,
  },
];

export default function Users() {
  const selectedUser = users.find((u) => u.isSelected);

  return (
    <div className="flex border rounded-lg overflow-hidden bg-gray-100 shadow-lg w-full h-full">
      {/* Sidebar */}
      <div className="w-1/2 border-r">
        <div className="p-4 flex items-center justify-between">
          <select className="border px-2 py-1 rounded text-sm">
            <option>Active Users (2)</option>
          </select>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            + New User
          </button>
        </div>
        <div className="relative px-4">
                        <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Search leads..."
                            className="pl-10"
                         
                        />
                    </div>
        <ul className='flex flex-col gap-2 px-2 py-3 h-[23rem] overflow-x-scroll'>
          {users.map((user) => (
            <li
              key={user.id}
              className="flex gap-3 items-center px-4 py-2 bg-gray-50 cursor-pointer rounded shadow-md hover:bg-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.role}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              <span
                className={`ml-auto px-2 py-0.5 text-xs rounded ${
                  user.badge === "Administrator"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-orange-500 text-white"
                }`}
              >
                {user.badge}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Details Panel */}
      <div className="w-1/2 p-3">
      <div className='bg-gray-50 h-full overflow-x-scroll p-3 rounded shadow-md'>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-300" />
          <div>
            <div className="text-lg font-semibold">{selectedUser.name}</div>
            <div className="text-sm text-gray-500">CEO at Ipixelzen</div>
            <span className="text-sm bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
              {selectedUser.badge}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Mail className="w-4 h-4" />
          <span>{selectedUser.email}</span>
        </div>
        <div className="mt-6">
          <h4 className="text-md font-medium">User Information</h4>
          <div className="mt-2 space-y-2 text-sm">
            <div>
              <span className="font-medium">First Name:</span>{' '}
              {selectedUser.name.split(' ')[0]}
            </div>
            <div>
              <span className="font-medium">Last Name:</span>{' '}
              {selectedUser.name.split(' ')[1] || ''}
            </div>
            <div>
              <span className="font-medium">Email:</span>{' '}
              {selectedUser.email}
            </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
}
