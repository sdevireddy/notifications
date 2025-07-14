"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Calendar } from "@/components/ui/calendar";
import TemplateSelectModal from "../emailmarketing/TemplateSelectModal";
import EmailBuilder from "../../emailtemplate/EmailTemplate";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function CreateEmailCampaign() {
  const emailBuilderRef = useRef(); // for accessing builder methods

  const [campaignName, setCampaignName] = useState("");
  const [topic, setTopic] = useState("");
  const [recipientList, setRecipientList] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
const navigate = useNavigate();
  const handleSubmit = async () => {
    const { html, json } = emailBuilderRef.current?.exportData?.() || {
      html: "",
      json: "",
    };

    const payload = {
      name: campaignName,
      topic,
      recipientsListId: recipientList,
      htmlContent: html,
      jsonContent: json,
      sendType: isScheduled ? "scheduled" : "immediate",
      scheduledTime: isScheduled ? scheduledDate : null,
    };

    console.log("📤 Submitting payload:", payload);

    // Uncomment below to integrate with backend
    // const res = await fetch("/api/email-campaigns", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // const data = await res.json();
    // console.log("✅ Response:", data);
    toast.success("campaign Success done!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/marketing/emailmarketing")
  };

  const handleLoadTemplate = (templateBlocks) => {
    // Use loadBlocks method exposed by builder
    if (emailBuilderRef.current?.loadBlocks) {
      emailBuilderRef.current.loadBlocks(templateBlocks);
    }
    setShowTemplateModal(false);
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <h1 className="text-2xl font-bold">Create Email Campaign</h1>

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
        <div className="flex items-center gap-2">
         
          
        </div>
       
      </div>

      {/* Load Template Button */}
      {/* <div>
        <Button onClick={() => setShowTemplateModal(true)}>
          Load Template
        </Button>
      </div> */}

      {/* Modal for Selecting Template */}
      <TemplateSelectModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onLoad={handleLoadTemplate}
      />

      {/* Email Builder Area */}
      <div className="border rounded">
        <EmailBuilder ref={emailBuilderRef} />
      </div>

      {/* Submit */}
      {/* Submit & Schedule Buttons */}
<div className="flex items-center gap-4 mt-6">
  <Button onClick={handleSubmit} className="bg-buttonprimary text-white">
    {isScheduled ? "Schedule Send" : "Send Now"}
  </Button>

  {/* Schedule Toggle */}
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

    {/* Calendar Popover (only show if scheduled) */}
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

    </div>
  );
}