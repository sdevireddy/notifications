"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../components/ui/select";
import toast from "react-hot-toast";
import TemplateSelectModal from "../emailmarketing/TemplateSelectModal";
import { useNavigate } from "react-router-dom";
import Calendar from "../../../components/ui/Calendar";

export default function CreateEmailCampaign() {
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [topic, setTopic] = useState("");
  const [recipientList, setRecipientList] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null); // { name: "", html: "" }

  const handleSubmit = async () => {
    if (!campaignName || !topic || !recipientList || !selectedTemplate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: campaignName,
      topic,
      recipientsListId: recipientList,
      htmlContent: selectedTemplate.html,
      jsonContent: selectedTemplate.name, // optional identifier
      sendType: isScheduled ? "scheduled" : "immediate",
      scheduledTime: isScheduled ? scheduledDate : null,
    };

    console.log("📤 Submitting payload:", payload);

    // Uncomment for backend integration
    /*
    const res = await fetch("/api/email-campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Campaign created successfully!");
      navigate("/marketing/emailmarketing");
    } else {
      toast.error("Error creating campaign");
    }
    */

    toast.success("Campaign created successfully!");
    navigate("/marketing/emailmarketing");
  };

  const handleLoadTemplate = (template) => {
    setSelectedTemplate(template);
    setShowTemplateModal(false);
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">Create Email Campaign</h1>

      {/* Campaign Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
        <Input
          placeholder="Campaign Name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />
        <Input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Select value={recipientList} onValueChange={setRecipientList}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Recipient List" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="list1">Summer List</SelectItem>
            <SelectItem value="list2">Cart Dropouts</SelectItem>
            <SelectItem value="list3">All Users</SelectItem>
          </SelectContent>
        </Select>

        {/* Template Selection */}
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => setShowTemplateModal(true)}
            className="w-full"
          >
            {selectedTemplate ? `Template: ${selectedTemplate.name}` : "Select Email Template"}
          </Button>
          {selectedTemplate && (
            <p className="text-sm text-gray-500">
              Selected: <strong>{selectedTemplate.name}</strong>
            </p>
          )}
        </div>
      </div>
{isScheduled && scheduledDate && (
            <p className="text-sm text-gray-600 ml-1 ">
              Send at:{" "}
              <span className="font-medium text-black">
                {format(scheduledDate, "MMMM d, yyyy")}
              </span>
            </p>
          )}
      {/* Submit & Schedule Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
        <Button onClick={handleSubmit} className="bg-primary text-white px-6">
          {isScheduled ? "Schedule Send" : "Send Now"}
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

          {/* Calendar Popover */}
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

          {/* Selected Date Display */}
          {isScheduled && scheduledDate && (
            <p className="text-sm text-gray-600 ml-1 ">
              Send at:{" "}
              <span className="font-medium text-black">
                {format(scheduledDate, "MMMM d, yyyy")}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Template Modal */}
      <TemplateSelectModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onLoad={handleLoadTemplate}
      />
    </div>
  );
}
