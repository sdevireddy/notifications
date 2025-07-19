"use client";

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
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
  const [selectedTemplateHtml, setSelectedTemplateHtml] = useState("");
  const [selectedTemplateName, setSelectedTemplateName] = useState("");

  const handleLoadTemplate = (template) => {
    setSelectedTemplateHtml(template.html);
    setSelectedTemplateName(template.name);
    setShowTemplateModal(false);
  };

  const handleSubmit = async () => {
    const payload = {
      name: campaignName,
      topic,
      recipientsListId: recipientList,
      htmlContent: selectedTemplateHtml,
      templateName: selectedTemplateName,
      sendType: isScheduled ? "scheduled" : "immediate",
      scheduledTime: isScheduled ? scheduledDate : null,
    };

    console.log("📤 Submitting payload:", payload);

    // Uncomment this to integrate with backend
    /*
    const res = await fetch("/api/email-campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("✅ Response:", data);
    */

    toast.success("Campaign successfully created!", { position: "top-right" });
    navigate("/marketing/emailmarketing");
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-800">
        Create Email Campaign
      </h1>

      {/* Campaign Info Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      {/* Template Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-700">
            Selected Template:{" "}
            {selectedTemplateName ? (
              <span className="text-blue-600">{selectedTemplateName}</span>
            ) : (
              <span className="text-gray-400 italic">None</span>
            )}
          </span>
          <Button variant="outline" onClick={() => setShowTemplateModal(true)}>
            Select Template
          </Button>
        </div>
        {selectedTemplateHtml && (
          <div className="border p-4 rounded bg-gray-50 max-h-[300px] overflow-auto text-xs">
            <pre>{selectedTemplateHtml}</pre>
          </div>
        )}
      </div>

      {/* Schedule Section */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={handleSubmit}
          className="bg-buttonprimary text-white px-6"
        >
          {isScheduled ? "Schedule Send" : "Send Now"}
        </Button>

        <div className="relative flex items-center gap-2">
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
            <div className="absolute top-12 z-10 bg-white border rounded shadow p-2">
              <Calendar
                selected={scheduledDate}
                onSelect={(date) => setScheduledDate(date)}
              />
            </div>
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
