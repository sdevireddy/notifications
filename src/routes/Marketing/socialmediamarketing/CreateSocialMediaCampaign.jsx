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

const allPlatforms = ["Instagram", "Facebook", "Twitter", "LinkedIn"];

export default function CreateSocialMediaCampaign() {
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    if (!campaignName || !caption || !imageFile || selectedPlatforms.length === 0) {
      toast.error("Please fill in all fields and select platforms.");
      return;
    }

    const payload = {
      name: campaignName,
      caption,
      platforms: selectedPlatforms,
      image: imageFile.name, // Replace with actual image upload path when integrated
      sendType: isScheduled ? "scheduled" : "immediate",
      scheduledDate: isScheduled ? scheduledDate : null,
    };

    console.log("🚀 Submitting Social Media Campaign:", payload);

    toast.success("Campaign created!");
    navigate("/marketing/social-campaigns");
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-gray-800">Create Social Media Campaign</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow-md">
        <Input
          placeholder="Campaign Name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
        />
        <Textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={4}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Upload Image</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border mt-2"
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Where to post?</label>
          <div className="grid grid-cols-2 gap-2">
            {allPlatforms.map((platform) => (
              <Button
                key={platform}
                variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                onClick={() => togglePlatform(platform)}
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-4">
        <Button onClick={handleSubmit} className="bg-primary text-white px-6">
          {isScheduled ? "Schedule Post" : "Post Now"}
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
              Post on:{" "}
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
