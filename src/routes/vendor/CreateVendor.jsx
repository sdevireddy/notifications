import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiUser, FiMail, FiBriefcase, FiMapPin, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../utils/axios";
import { apiSummary } from "../../common/apiSummary";
import { Input, Section, Select } from "../../components/shared/FormComponents";
const initalValues = {
    // Basic Information
    vendorOwner: "",
    vendorName: "",
    phone: "",
    email: "",
    glAccount: "",
    website: "",
    category: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    description: "",
};

const VendorCreationForm = () => {
    const navigate = useNavigate();
    const [vendorImage, setVendorImage] = useState(null);
    const [formData, setFormData] = useState(initalValues);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setVendorImage(reader.result);
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

    const handleSubmit = async (e, ref) => {
        e.preventDefault();
        try {
            const resp = await axiosPrivate({
                ...apiSummary.crm.createContacts,
                data: formData,
            });
            toast.success("Contact Created Successfully");
            if (ref === "save") {
                navigate("/contacts");
            }
            resetForm();
        } catch (error) {
            toast.error("Contact Creation Failed");
            console.log(error);
        }
    };
    const resetForm = () => {
        setFormData(initalValues);
        setVendorImage(null);
    };

    return (
        <div className="container mx-auto text-sm">
            <form className="rounded-lg bg-white shadow-md">
                {/* Header with Left Arrow Button, Contact Image, "Create Contact" text and action buttons */}
                <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="rounded p-2 hover:bg-gray-200"
                        >
                            <FiArrowLeft size={20} />
                        </button>
                        <div
                            className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-200"
                            onClick={() => document.getElementById("contact-image-input").click()}
                        >
                            {vendorImage ? (
                                <img
                                    src={vendorImage}
                                    alt="Contact"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <FiCamera className="text-2xl text-gray-500" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold">Create Vendor</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
                        <button
                            type="button"
                            className="rounded border border-primary px-4 py-2 shadow-md transition-all duration-200 ease-in-out hover:bg-gray-100"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="rounded border border-primary px-4 py-2 shadow-md transition-all duration-200 ease-in-out hover:bg-gray-100"
                            onClick={(e) => handleSubmit(e, "saveAndNew")}
                        >
                            Save And New
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-primary px-4 py-2 text-white shadow-sm hover:bg-opacity-90"
                            onClick={(e) => handleSubmit(e, "save")}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <input
                    type="file"
                    id="contact-image-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                {/* Rest of your form sections go here */}
                {/* Basic Info Section */}
                <Section
                    title="Vendor Information"
                    //   icon={<FiUser />}
                >
                    <Select
                        label="Vendor Owner"
                        name="vendorOwner"
                        value={formData.vendorOwner}
                        onChange={handleChange}
                        options={["praveen", "vikram", "kalyan"]}
                        required
                    />
                    <Input
                        label="Vendor Name"
                        name="vendorName"
                        value={formData.vendorName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        required
                    />
                    <Select
                        label="GL Account"
                        name="glAccount"
                        value={formData.glAccount}
                        onChange={handleChange}
                        options={["Sales-software", "Sales-hardware", "Rental Income", "Interest Income", "Sales Other"]}
                        required
                    />
                    <Input
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </Section>

                {/* Company Info Section */}

                {/* Address Info Section */}
                <Section
                    title="Address Information"
                    icon={<FiMapPin />}
                >
                    <Input
                        label="Address Line 1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                    />
                    <Input
                        label="Address Line 2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                    />
                    <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                    <Input
                        label="ZIP"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                    <Input
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </Section>

                {/* Description Section */}
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
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full resize-none rounded border border-gray-300 p-2"
                        ></textarea>
                    </div>
                </Section>
            </form>
        </div>
    );
};

export default VendorCreationForm;
