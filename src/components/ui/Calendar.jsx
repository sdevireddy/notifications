import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { cn } from "../../utils/cn"

export default function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rounded-md border-2 border-gray-300 bg-white shadow-md", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-between pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-white rounded-md border text-gray-500 hover:bg-gray-100",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
        day: "rounded-md border border-transparent",
        day_selected: "bg-blue-600 text-white hover:bg-blue-600",
        day_today: "border border-blue-400",
        day_outside: "text-gray-300",
        ...classNames,
      }}
      {...props}
    />
  )
}
