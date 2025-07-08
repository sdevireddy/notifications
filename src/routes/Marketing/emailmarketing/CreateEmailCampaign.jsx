"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function CreateEmailCampaignPage() {
  const [step, setStep] = useState("info");
  const [template, setTemplate] = useState("blank");
  const [sendDate, setSendDate] = useState(null);
  const navigate = useNavigate();

  const templates = [
    { id: "blank", name: "Blank Template" },
    { id: "promo", name: "Promotion" },
    { id: "newsletter", name: "Newsletter" },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Create Email Campaign</h1>

      <Tabs value={step} onValueChange={setStep}>
        <TabsList className="mb-4">
          <TabsTrigger value="info">Campaign Info</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Send</TabsTrigger>
        </TabsList>

        {/* Step 1: Campaign Info */}
        <TabsContent value="info">
          <Card>
            <CardHeader><CardTitle>Campaign Info</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <Input placeholder="Campaign Name" />
              <Input placeholder="Subject Line" />
              <Input placeholder="Sender Name" />
              <Input placeholder="Sender Email Address" />
              <div className="flex justify-end">
              <Button variant="secondary" onClick={() => navigate("/marketing/EmailMarketing")}>Cancel</Button>

                <Button onClick={() => setStep("audience")}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Audience */}
        <TabsContent value="audience">
          <Card>
            <CardHeader><CardTitle>Select Audience</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Segment/List" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="engaged">Engaged Users</SelectItem>
                  <SelectItem value="inactive">Inactive Users</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end">
              <Button variant="secondary" onClick={() => navigate("/marketing/EmailMarketing")}>Cancel</Button>
                <Button onClick={() => setStep("content")}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Content */}
        <TabsContent value="content">
          <Card>
            <CardHeader><CardTitle>Compose Email</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose Template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tpl) => (
                    <SelectItem key={tpl.id} value={tpl.id}>{tpl.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea placeholder="Write your email content here..." rows={10} />

              <div className="flex justify-end">
              <Button variant="secondary" onClick={() => navigate("/marketing/EmailMarketing")}>Cancel</Button>

                <Button onClick={() => setStep("schedule")}>Next</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Schedule & Send */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader><CardTitle>Schedule or Send</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <label className="text-sm text-gray-600">Select Send Date</label>
              <Calendar mode="single" selected={sendDate} onSelect={setSendDate} />

              <div className="text-sm text-gray-500">
                Selected: {sendDate ? format(sendDate, "PPP") : "None"}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => navigate("/marketing/EmailMarketing")}>Cancel</Button>
                <Button>Send Now</Button>
                <Button variant="outline">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
