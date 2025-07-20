import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Scheduler({scheduledDate, setScheduledDate}) {
  return (
    <div className="flex flex-col gap-1 w-full max-w-xs">
      <label className="text-sm font-medium text-gray-700 mb-1">Schedule Date &amp; Time</label>
      <DatePicker
        selected={scheduledDate}
        onChange={date => setScheduledDate(date)}
        showTimeSelect
        timeIntervals={15}
        dateFormat="Pp"
        minDate={new Date()}
        className="border rounded px-3 py-2 w-full focus:ring focus:border-blue-300"
        popperClassName="custom-datepicker-popper"
        placeholderText="Pick date & time"
      />
      {scheduledDate && (
        <div className="text-xs text-gray-600 mt-1">
          Send at:&nbsp;
          <span className="font-semibold">
            {format(scheduledDate, "PPPP 'at' p")}
          </span>
        </div>
      )}
      {/* Add below style to your global CSS */}
      <style>
        {`
        .custom-datepicker-popper {
          z-index: 50 !important;
          max-width: 250px;
          width: 100% !important;
        }
        .react-datepicker__time-container {
          max-height: 200px;
          overflow-y: auto;
        }
        `}
      </style>
    </div>
  );
}
