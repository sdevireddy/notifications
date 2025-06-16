import { ChevronRight } from "lucide-react"

export function FilterMenu({ onClose }) {
  return (
    <div className="absolute top-full left-0 mt-1 z-50 w-[300px] bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
      <div className="p-0">
        <div className="border-b">
          <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
            <span className="font-medium">System Defined Filters</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        <div className="border-b">
          <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
            <span className="font-medium">Website Activity</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        <div className="border-b">
          <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
            <span className="font-medium">Filter By Fields</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        <div className="border-b">
          <div className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
            <span className="font-medium">Filter By Related Modules</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
