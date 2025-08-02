import React, { useRef, useState } from 'react'
import { FiArrowLeft, FiBriefcase, FiCamera, FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import { Input, Section, Select } from '../../components/shared/FormComponents';
import { useNavigate } from 'react-router-dom';
const initialFormData={
    taskOwner:"",
    subject:"",
    dueDate:"",
    status:"",
    priority:"",
    description:"",
    property:"",
}
const status=["Not Started","Deffered","In Progress","Completed","Waiting For Input"]
const Priority=["High","Modrate","Low"]
const Property=["Leads","Contacts"]
const TaskCreationForm = () => {
    const navigate = useNavigate();
    const [leadImage, setLeadImage] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    const submitActionRef = useRef("save");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData((prev) => {
                return {
                    ...prev,
                    image: file,
                };
            });
            const reader = new FileReader();
            reader.onloadend = () => setLeadImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setLeadImage(null);
        //toast.info("Form reset to default values");
    };

    // const saveLead = async () => {
    //     try {
    //       const formdata = new FormData();
    //       Object.entries(formData).map((el) => {
    //           formdata.append(el[0], el[1]);
    //       });
    //       const resp=await axiosPrivate({
    //         ...apiSummary.createLeads
    //       })

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw new Error("Failed to save lead");
    //         }
    //         toast.success("Lead saved successfully!");
    //         console.log("Lead Saved:", data);
    //         return true;
    //     } catch (error) {
    //         toast.error(error.message || "Failed to save lead. Please try again.");
    //         console.error("Error saving lead:", error);
    //         return false;
    //     }
    // };

    const convertLead = async () => {
        try {
            const response = await fetch("/api/leads/convert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData }),
            });
            const data = await response.json();
            console.log("Lead Converted:", data);
        } catch (error) {
            console.error("Error converting lead:", error);
        }
    };

    const cancelLead = async () => {
        try {
            await fetch("http://localhost:8080/api/leads/cancel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "cancelled", lead: formData }),
            });
        } catch (error) {
            console.error("Cancel API error:", error);
        } finally {
            navigate(-1);
        }
    };

    const handleSubmit = async (e,ref) => {
        e.preventDefault();
      try {
        // console.log(formData)
        //   const formdata = new FormData();
        //   Object.entries(formData).map((el) => {
        //       formdata.append(el[0], el[1]);
        //   });
          const resp=await axiosPrivate({
            ...apiSummary.crm.createLead,
            data:formData
          })
            toast.success("Lead saved successfully!");
            if(ref==="save")
            {
                navigate("/leads")
            }
            resetForm()
        } catch (error) {
            toast.error(error.message || "Failed to save lead. Please try again.");
            console.error("Error saving lead:", error);
            return false;
        }
    };

    const handleSaveAndNew = async () => {
        const success = await saveLead();
        if (success) {
            setFormData(initialFormState);
            setLeadImage(null);
            toast.success("Lead saved. You can add a new one now!");
        }
    };

    return (
        <div className=" w-[calc(100%-10px)] text-sm">
            <form
                className="rounded-lg bg-white shadow-md"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b p-3    sticky top-0 bg-white">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="rounded p-2 hover:bg-gray-200"
                        >
                            <FiArrowLeft size={20} />
                        </button>

                        {/* Lead Image Upload */}

                        <h2 className="text-xl font-bold">Create Task</h2>
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 grid-cols-1 text-sm">
                        <button
                            type="button"
                            className="rounded  px-4 py-2  hover:bg-gray-100 border border-primary transition-all ease-in-out duration-200 shadow-md"
                            onClick={resetForm}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="rounded  px-4 py-2 hover:bg-gray-100 border border-primary transition-all ease-in-out duration-200 shadow-md"
                            onClick={(e) => handleSubmit(e,"SaveAndNew")}
                        >
                            Save And New
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-primary px-4 py-2 text-white shadow-sm hover:opacity-90"
                            onClick={(e) => handleSubmit(e,"save")}
                        >
                            Save
                        </button>
                    </div>
                </div>
                {/* Basic Info Section */}
                <Section
                    title="Task Information"
                    icon={<FiUser />}
                >
                    <Select
                              label="task Owner"
                              name="taskOwner"
                              value={formData.taskOwner}
                              onChange={handleChange}
                              options={["praveen", "vikram", "kalyan", ]}
                              required
                          />
                    <Input
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <Input
                    type='date'
                        label="Due Date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Subject To"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                   <Select
                              label="Status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              options={status}
                              required
                          />
                           <Select
                              label="Priority"
                              name="priority"
                              value={formData.priority}
                              onChange={handleChange}
                              options={Priority}
                              required
                          />
                    
                </Section>

                <Section
                    title="Description"
                    icon={<FiMail />}
                >
                    <div className="col-span-full">
                        <label
                            htmlFor="description"
                            className="block text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="2"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2 resize-none"
                        ></textarea>
                    </div>
                </Section>
            </form>
        </div>
    );
};
export default TaskCreationForm