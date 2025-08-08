import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiUser, FiMail, FiBriefcase, FiMapPin, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { axiosPrivate } from "../../utils/axios";
import { apiSummary } from "../../common/apiSummary";
import { Input, Section, Select } from "../../components/shared/FormComponents";
const initalValues = {
    // Basic Information
    contactOwner: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    secondaryEmail: "",
    contactSource: "",
    contactStatus: "",
    // Company Information
    company: "",
    jobTitle: "",
    // Contact Information (Address)
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    // Description
    description: "",
};

const ProductCreationForm = () => {
    const navigate = useNavigate();
    const [productImage, setProductImage] = useState(null);
    const [formData, setFormData] = useState(initalValues);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProductImage(reader.result);
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
            toast.success("Product Created Successfully");
            if (ref === "save") {
                navigate("/products");
            }
            resetForm();
        } catch (error) {
            toast.error("Product Creation Failed");
            console.log(error);
        }
    };
    const resetForm = () => {
        setFormData(initalValues);
        setProductImage(null);
    };

    return (
        <div className="container mx-auto text-sm">
            <form className="rounded-lg bg-white shadow-md">
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
                            onClick={() => document.getElementById("product-image-input").click()}
                        >
                            {productImage ? (
                                <img
                                    src={productImage}
                                    alt="product"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <FiCamera className="text-2xl text-gray-500" />
                            )}
                        </div>
                        <h2 className="text-xl font-bold">Create Product</h2>
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
                    id="product-image-input"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                {/* Rest of your form sections go here */}
                {/* Basic Info Section */}
                <Section
                    title="Product Information"
                    icon={<FiUser />}
                >
                    <Select
                        label="Product Owner"
                        name="productOwner"
                        value={formData.productOwner}
                        onChange={handleChange}
                        options={["praveen", "vikram", "kalyan"]}
                        required
                    />
                    <Input
                        label="Product Name"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Product Code"
                        name="productCode"
                        value={formData.productCode}
                        onChange={handleChange}
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
                        label="Manufacturer "
                        name="manufacturer "
                        value={formData.manufacturer}
                        onChange={handleChange}
                        required
                    />
                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={["Hardware", "Software", "CRM Application"]}
                        required
                    />
                    <Input
                        label="Sales Start Date"
                        name="salesStartDate"
                        value={formData.salesStarDate}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Sales End Date"
                        name="salesEndDate"
                        value={formData.salesEndDate}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Support Start Date"
                        name="supportStartDate"
                        value={formData.supportStartDate}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Support End Date"
                        name="supportEndDate"
                        value={formData.supportEndDate}
                        onChange={handleChange}
                        required
                    />
                    {/* <div className="grid">
                        
                        <label htmlFor="active">Active</label>
                        <div>

                        <input
                            type="checkbox"
                            id="active"
                            className="mt-1 w-full"
                        />
                        </div>
                    </div> */}
                </Section>

                {/* Company Info Section */}
                <Section title="Price Information">
                    <Select
                        label="Usage Unit"
                        name="usageUnit"
                        value={formData.usageUnit}
                        onChange={handleChange}
                        options={["Box", "Carton", "Dozen", "Each", "Impressions", "Lb", "M", "Pack", "Pieces", "Quantity"]}
                    />
                    <Input
                        label="Quantity Ordered"
                        name="qtyOrdered"
                        value={formData.qtyOrdered}
                        onChange={handleChange}
                    />
                    <Input
                        label="Quantity in Stock"
                        name="qytStock"
                        value={formData.qytStock}
                        onChange={handleChange}
                    />
                    <Input
                        label="Reorder Level"
                        name="reorderLevel"
                        value={formData.reorderLevel}
                        onChange={handleChange}
                    />
                    <Select
                        label="Handler"
                        name="handler"
                        value={formData.handler}
                        onChange={handleChange}
                        options={["praveen", "vikram", "kalyan"]}
                        required
                    />
                    <Input
                        label="Quantity in Demand"
                        name="qytDemand"
                        value={formData.qytDemand}
                        onChange={handleChange}
                    />
                </Section>

                {/* Address Info Section */}

                {/* Description Section */}
                <Section title="Description">
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

export default ProductCreationForm;
