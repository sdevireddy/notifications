"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/ui/Calendar";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateSMSCampaign() {
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [recipientList, setRecipientList] = useState("");
  const [message, setMessage] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);

  const handleSubmit = () => {
    if (!campaignName || !recipientList || !message) {
      toast.error("All fields are required.");
      return;
    }

    const payload = {
      name: campaignName,
      recipientList,
      message,
      sendType: isScheduled ? "scheduled" : "immediate",
      scheduledDate: isScheduled ? scheduledDate : null,
    };

    console.log("📤 Submitting SMS Campaign:", payload);

    toast.success("Campaign created successfully!");
    navigate("/marketing/sms-campaigns");
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">Create SMS Campaign</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
        <Input
          placeholder="Campaign Name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />

        <Select value={recipientList} onValueChange={setRecipientList}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Recipient List" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="list1">Premium Users</SelectItem>
            <SelectItem value="list2">Trial Users</SelectItem>
            <SelectItem value="list3">All Subscribers</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Enter SMS text (160 characters max recommended)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
        <Button onClick={handleSubmit} className="bg-primary text-white px-6">
          {isScheduled ? "Schedule SMS" : "Send Now"}
        </Button>

        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-2">
          <button
            onClick={() => setIsScheduled(!isScheduled)}
            className={`px-4 py-2 rounded-md border text-sm transition ${
              isScheduled
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {isScheduled ? "Scheduled" : "Schedule Later"}
          </button>

          {isScheduled && (
            <div className="w-50 h-50">
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={(date) => {
                  if (date) setScheduledDate(date);
                }}
                className="rounded-md border"
              />
            </div>
          )}

          {isScheduled && scheduledDate && (
            <p className="text-sm text-gray-600 ml-1">
              Send at:{" "}
              <span className="font-medium text-black">
                {format(scheduledDate, "MMMM d, yyyy")}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
