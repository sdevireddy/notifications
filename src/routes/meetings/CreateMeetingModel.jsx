import React, { useState } from "react";
import { Input, Select } from "../../components/shared/FormComponents";

const CreateMeetingModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    allDay: false,
    fromDate: "2025-08-03",
    fromTime: "19:00",
    toDate: "2025-08-03",
    toTime: "20:00",
    host: "siva sankar devireddy",
    participants: [],
    relatedTo: "",
    reminder: "None",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meeting Info:", formData);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 p-4 flex items-center justify-center z-50">
     <form
  className="bg-white px-6 rounded-md shadow-md w-full max-w-md space-y-4 h-[98%] overflow-y-auto"
  onSubmit={handleSubmit}
>
  {/* Sticky Heading */}
  <div className="sticky top-0 left-0 bg-white py-3 z-10 -mx-6 px-6 border-b">
    <h2 className="text-xl font-semibold">Meeting Information</h2>
  </div>
        <Input
          label="Title"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Input
          label="Location"
          name="location"
          placeholder="Enter Location"
          value={formData.location}
          onChange={handleChange}
        />

        {/* <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="allDay"
            checked={formData.allDay}
            onChange={handleChange}
          />
          <label>All day</label>
        </div> */}

        <div className="flex space-x-2">
          <div className="flex-1 space-y-1">
            <label className="block text-sm font-medium">From</label>
            <Input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            />
            <Input
              type="time"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="block text-sm font-medium">To</label>
            <Input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
            />
            <Input
              type="time"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <Select
          label="Host"
          name="host"
          value={formData.host}
          onChange={handleChange}
          options={["siva sankar devireddy", "Praveen", "Another Host"]}
          required
        />

        <Input
          label="Participants"
          name="participants"
          placeholder="Add Participants"
          value={formData.participants[0] || ""}
          onChange={(e) =>
            setFormData({ ...formData, participants: [e.target.value] })
          }
        />

        <Select
          label="Related To"
          name="relatedTo"
          value={formData.relatedTo}
          onChange={handleChange}
          options={["None", "Client", "Project"]}
        />

        <Select
          label="Reminder"
          name="reminder"
          value={formData.reminder}
          onChange={handleChange}
          options={["None", "Daily", "Weekly", "Monthly"]}
        />

        {/* Sticky Footer */}
        <div className="sticky bottom-0 left-0 bg-white py-3 px-4 flex justify-end gap-2 border-t -mx-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeetingModal;
