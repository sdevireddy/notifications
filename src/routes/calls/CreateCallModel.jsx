import React, { useState } from "react";
import { Input, Select } from "../../components/shared/FormComponents";
import { Lock, User2, Search } from "lucide-react";

const CreateCallModal = ({ onClose, type = "Schedule" }) => {
    const [formData, setFormData] = useState({
        callFor: "Contact",
        relatedTo: "Account",
        callType: "Outbound",
        callStatus: "Scheduled",
        callDate: "2025-08-04",
        callTime: "21:00",
        callOwner: "siva sankar devireddy",
        subject: "Call scheduled with Unknown",
        reminder: "None",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Call Info:", formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60">
            <form
                className="h-[90%] w-full max-w-2xl space-y-4 overflow-y-auto rounded-md bg-white px-6 shadow-md"
                onSubmit={handleSubmit}
            >
                {/* Sticky Heading */}
                <div className="sticky top-0 z-10 -mx-6 border-b bg-white px-6 py-4">
                    <h2 className="text-lg font-semibold">{type} a call</h2>
                </div>

                {/* Call Information */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-800">Call Information</h3>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Call For */}
                        <div className="col-span-1">
                            <label className="mb-1 block text-sm font-medium">Call For</label>
                            <div className="flex items-center gap-2">
                                <Select
                                    name="callFor"
                                    value={formData.callFor}
                                    onChange={handleChange}
                                    options={["Contact", "Lead", "Vendor"]}
                                />
                                <Input />
                            </div>
                        </div>

                        {/* Related To */}
                        <div className="col-span-1">
                            <label className="mb-1 block text-sm font-medium">Related To</label>
                            <div className="flex items-center gap-2">
                                <Select
                                    name="relatedTo"
                                    value={formData.relatedTo}
                                    onChange={handleChange}
                                    options={["Account", "Opportunity", "Deal"]}
                                />
                                <Input />
                            </div>
                        </div>

                        {/* Call Type (locked) */}
                        <div className="relative col-span-1">
                            <Input
                                name="callType"
                                label="Call Type"
                                value={formData.callType}
                                onChange={handleChange}
                                readOnly
                            />
                            <Lock className="absolute right-2 top-9 h-4 w-4 text-gray-400" />
                        </div>

                        {/* Call Status (locked) */}
                        <div className="relative col-span-1">
                            <Input
                                name="callStatus"
                                label="Outgoing Call Status"
                                value={formData.callStatus}
                                onChange={handleChange}
                                readOnly
                            />
                            <Lock className="absolute right-2 top-9 h-4 w-4 text-gray-400" />
                        </div>

                        {/* Call Date & Time */}
                        <div className="col-span-2">
                            <label className="mb-1 block text-sm font-medium">Call Start Time</label>
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    name="callDate"
                                    value={formData.callDate}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="time"
                                    name="callTime"
                                    value={formData.callTime}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Call Owner */}
                        <div className="relative col-span-2">
                            <Input
                                name="callOwner"
                                label="Call Owner"
                                value={formData.callOwner}
                                onChange={handleChange}
                                readOnly
                            />
                            <User2 className="absolute right-2 top-9 h-4 w-4 text-gray-400" />
                        </div>

                        {/* Subject */}
                        <div className="col-span-2">
                            <Input
                                name="subject"
                                label="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Reminder */}
                        <div className="col-span-2">
                            <Select
                                name="reminder"
                                label="Reminder"
                                value={formData.reminder}
                                onChange={handleChange}
                                options={["None", "10 mins", "1 hour", "1 day"]}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-800">Call Purpose</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative col-span-1">
                            <Select
                                name="callPurpose"
                                value={formData.callFor}
                                onChange={handleChange}
                                options={["Contact", "Lead", "Vendor"]}
                                label={"Call Purposes"}
                            />
                        </div>

                        {/* Call Status (locked) */}
                        <div className="relative col-span-1">
                            <Input
                                name="callAgenda"
                                label="Call Agenda"
                                value={formData.callStatus}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                {type == "Log" && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-800">Outcome of Outgoing Call</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative col-span-1">
                                <Select
                                    name="callResult"
                                    value={formData.callFor}
                                    onChange={handleChange}
                                    options={["Contact", "Lead", "Vendor"]}
                                    label={"Call Purposes"}
                                />
                            </div>

                            {/* Call Status (locked) */}
                            <div className="relative col-span-1">
                                <Input
                                    name="description"
                                    label="Description"
                                    value={formData.callStatus}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Sticky Footer */}
                <div className="sticky bottom-0 left-0 -mx-6 flex justify-end gap-2 border-t bg-white px-4 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded border px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Schedule
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCallModal;
