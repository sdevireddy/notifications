import { Mail, Phone, Plus, Search } from 'lucide-react';
import { Input } from '../../components/layout/ui/input';
import { Button } from '../../components/layout/ui/button';

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
      <div className="flex h-full w-full overflow-hidden rounded-lg border bg-gray-100 shadow-lg">
          {/* Sidebar */}
          <div className="w-1/2 border-r">
              <div className="flex items-center justify-between p-4">
                  <select className="rounded border px-2 py-1 text-sm">
                      <option>Active Users (2)</option>
                  </select>
                  <Button
                      className={"bg-buttonprimary hover:bg-buttonprimary-hover text-white"}
                  >
                      <Plus className="mr-2 h-4 w-4" />
                      Create User
                  </Button>
              </div>
              <div className="relative px-4">
                  <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                      placeholder="Search leads..."
                      className="pl-10"
                  />
              </div>
              <ul className="flex h-[23rem] flex-col gap-2 overflow-x-scroll px-2 py-3">
                  {users.map((user) => (
                      <li
                          key={user.id}
                          className="flex cursor-pointer items-center gap-3 rounded bg-gray-50 px-4 py-2 shadow-md hover:bg-gray-100"
                      >
                          <div className="h-10 w-10 rounded-full bg-gray-300" />
                          <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.role}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                          <span
                              className={`ml-auto rounded px-2 py-0.5 text-xs ${
                                  user.badge === "Administrator" ? "bg-orange-100 text-orange-700" : "bg-orange-500 text-white"
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
              <div className="h-full overflow-x-scroll rounded bg-gray-50 p-3 shadow-md">
                  <div className="mb-4 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-gray-300" />
                      <div>
                          <div className="text-lg font-semibold">{selectedUser.name}</div>
                          <div className="text-sm text-gray-500">CEO at Ipixelzen</div>
                          <span className="rounded bg-orange-100 px-2 py-0.5 text-sm text-orange-700">{selectedUser.badge}</span>
                      </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="h-4 w-4" />
                      <span>{selectedUser.email}</span>
                  </div>
                  <div className="mt-6">
                      <h4 className="text-md font-medium">User Information</h4>
                      <div className="mt-2 space-y-2 text-sm">
                          <div>
                              <span className="font-medium">First Name:</span> {selectedUser.name.split(" ")[0]}
                          </div>
                          <div>
                              <span className="font-medium">Last Name:</span> {selectedUser.name.split(" ")[1] || ""}
                          </div>
                          <div>
                              <span className="font-medium">Email:</span> {selectedUser.email}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}
