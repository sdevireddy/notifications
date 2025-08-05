import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiUser, FiMail, FiBriefcase, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../utils/axios";
import { apiSummary } from "../../common/apiSummary";
import { Input, Section, Select } from "../../components/shared/FormComponents";
import { Delete } from "lucide-react";
import { MdDelete } from "react-icons/md";

const initialFormState = {
    salesOrderOwner: "",
    subject: "",
    customerNo: "",
    quoteName: "",
    dealName: "",
    accountName: "",
    purchaseOrder: "",
    dueDate: "",
    contactName: "",
    pending: "",
    exciseDuty: "",
    salesCommision: "",
    carrier: "",
    status: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    description: "",
    termsAndConditions: "",
};

const SalesOrderCreationForm = () => {
    const [orderedItems, setOrderedItems] = useState([
        {
            id: Date.now(),
            productName: "",
            description: "",
            quantity: "",
            listPrice: "",
            discount: "",
            tax: "",
            amount: "",
            total: 0,
        },
    ]);

    const [summary, setSummary] = useState({
        subTotal: 0,
        discount: 0,
        tax: 0,
        adjustment: 0,
        grandTotal: 0,
    });

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormState);

    const calculateRow = (item) => {
        const amount = Number(item.quantity) * Number(item.listPrice);
        const discounted = amount - Number(item.discount);
        const taxed = (Number(item.tax) / 100) * discounted;
        const total = discounted + taxed;
        return { ...item, amount, total };
    };

    const handleItemChange = (id, field, value) => {
        const updatedItems = orderedItems.map((item) => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: field === "productName" || field === "description" ? value : parseFloat(value) || 0 };
                return calculateRow(updatedItem);
            }
            return item;
        });
        setOrderedItems(updatedItems);
        calculateSummary(updatedItems);
    };

    const calculateSummary = (items) => {
        const subTotal = items.reduce((sum, item) => sum + Number(item.amount), 0);
        const discount = items.reduce((sum, item) => sum + Number(item.discount), 0);
        const tax = items.reduce((sum, item) => sum + (Number(item.tax) / 100) * (Number(item.amount) - Number(item.discount)), 0);
        const grandTotal = subTotal - discount + tax + (parseFloat(summary.adjustment) || 0);
        setSummary((prev) => ({
            ...prev,
            subTotal,
            discount,
            tax,
            grandTotal,
        }));
    };

    const handleAdjustmentChange = (value) => {
        setSummary((prev) => {
            const newAdjustment = parseFloat(value) || 0;
            return {
                ...prev,
                adjustment: newAdjustment,
                grandTotal: prev.subTotal - prev.discount + prev.tax + newAdjustment,
            };
        });
    };

    const addRow = () => {
        setOrderedItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                productName: "",
                description: "",
                quantity: "",
                listPrice: "",
                discount: "",
                tax: "",
                amount: "",
                total: 0,
            },
        ]);
    };

    const removeRow = (id) => {
        const updated = orderedItems.filter((item) => item.id !== id);
        setOrderedItems(updated);
        calculateSummary(updated);
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

    const handleSubmit = async (e, ref) => {
        e.preventDefault();
        try {
            // console.log(formData)
            //   const formdata = new FormData();
            //   Object.entries(formData).map((el) => {
            //       formdata.append(el[0], el[1]);
            //   });
            const resp = await axiosPrivate({
                ...apiSummary.crm.createLead,
                data: formData,
            });
            toast.success("Lead saved successfully!");
            if (ref === "save") {
                navigate("/leads");
            }
            resetForm();
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
        <div className="w-[calc(100%-10px)] text-sm">
            <form className="rounded-lg bg-white shadow-md">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between border-b bg-white p-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="rounded p-2 hover:bg-gray-200"
                        >
                            <FiArrowLeft size={20} />
                        </button>

                        {/* Lead Image Upload */}

                        <h2 className="text-xl font-bold">Create Sales Order</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
                        <button
                            type="button"
                            className="rounded border border-primary px-4 py-2 shadow-md transition-all duration-200 ease-in-out hover:bg-gray-100"
                            onClick={resetForm}
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="rounded border border-primary px-4 py-2 shadow-md transition-all duration-200 ease-in-out hover:bg-gray-100"
                            onClick={(e) => handleSubmit(e, "SaveAndNew")}
                        >
                            Save And New
                        </button>

                        <button
                            type="submit"
                            className="rounded bg-primary px-4 py-2 text-white shadow-sm hover:opacity-90"
                            onClick={(e) => handleSubmit(e, "save")}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Basic Info Section */}
                <Section
                    title="Basic Information"
                    icon={<FiUser />}
                >
                    <Select
                        label="SalesOrder Owner"
                        name="salesOrderOwner"
                        value={formData.salesOrderOwner}
                        onChange={handleChange}
                        options={["praveen", "vikram", "kalyan"]}
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
                        label="Customer No"
                        name="customerNo"
                        value={formData.customerNo}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Quote Name"
                        name="quoteName"
                        value={formData.quoteName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Deal Name"
                        name="dealName"
                        value={formData.dealName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Account Name"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Purchase Order"
                        name="purchaseOrder"
                        value={formData.purchaseOrder}
                        onChange={handleChange}
                    />
                    <Input
                        label="Due Date"
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                    <Input
                        label="Contact Name"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                    />
                    <Input
                        label="Pending"
                        name="pending"
                        value={formData.pending}
                        onChange={handleChange}
                    />
                    <Input
                        label="Excise Duty"
                        name="exciseDuty"
                        value={formData.exciseDuty}
                        onChange={handleChange}
                    />
                    <Input
                        label="Sales Commision"
                        name="salesCommision"
                        value={formData.salesCommision}
                        onChange={handleChange}
                    />
                    <Select
                        label="Carrier"
                        name="carrier"
                        value={formData.carrier}
                        onChange={handleChange}
                        options={["FedEX", "UPS", "USPS", "DHL", "BlueDart"]}
                        required
                    />
                    <Select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={["Created", "Approved", "Delivered", "Cancelled"]}
                        required
                    />
                </Section>

                {/* Address Info Section */}
                <Section
                    title="Billing Address Information"
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
                <div
                >
                    <h2 className="font-bold text-xl px-3">Order Items</h2>
                    <div className="overflow-x-auto w-full p-3">
                        <table className="min-w-full border">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th>S.NO</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>List Price($)</th>
                                    <th>Amount($)</th>
                                    <th>Discount($)</th>
                                    <th>Tax(%)</th>
                                    <th>Total($)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                               {orderedItems.map((item, index) => (
  <tr key={item.id} className="py-2">
    <td className="text-center">{index + 1}</td>

    <td className="text-center max-w-56">
      <div >
        <Input
          className="w-full "
          value={item.productName}
          onChange={(e) => handleItemChange(item.id, "productName", e.target.value)}
          placeholder="Product Name"
        />
        <textarea
          className="mt-1 w-full border border-gray-500 resize-none "
          value={item.description}
          onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
          placeholder="Description"
        />
      </div>
    </td>

    <td className="text-center">
      <Input
        className="w-20 p-1 text-center mx-auto"
        value={item.quantity}
        onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
      />
    </td>

    <td className="text-center">
      <Input
        className="w-24 p-1 text-center mx-auto"
        value={item.listPrice}
        onChange={(e) => handleItemChange(item.id, "listPrice", e.target.value)}
      />
    </td>

    <td className="text-center">{Number(item.amount).toFixed(2)}</td>

    <td className="text-center">
      <Input
        className="w-20 p-1 text-center mx-auto"
        value={item.discount}
        onChange={(e) => handleItemChange(item.id, "discount", e.target.value)}
      />
    </td>

    <td className="">
      <Input
        disabled
        className="w-20 p-1 text-center mx-auto"
        value={item.tax}
        onChange={(e) => handleItemChange(item.id, "tax", e.target.value)}
      />
    </td>

    <td className="text-center">{item.total.toFixed(2)}</td>

    <td className="text-center">
      <button onClick={() => removeRow(item.id)} className="text-red-500">
        <MdDelete size={20} />
      </button>
    </td>
  </tr>
))}

                            </tbody>
                        </table>

                        <button
                            onClick={addRow}
                            type="button"
                            className="mt-3 rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-100"
                        >
                            + Add row
                        </button>

                        {/* Summary Box */}
                       <div className="ml-auto mt-6 w-full max-w-md rounded-lg border border-gray-300 bg-blue-100 p-6 shadow-lg">
  <h2 className="mb-4 text-lg font-semibold text-gray-800">Order Summary</h2>

  <div className="mb-3 flex justify-between text-gray-700">
    <span className="font-medium">Sub Total ($)</span>
    <span>{summary.subTotal.toFixed(2)}</span>
  </div>

  <div className="mb-3 flex justify-between text-gray-700">
    <span className="font-medium">Discount ($)</span>
    <span>{summary.discount.toFixed(2)}</span>
  </div>

  <div className="mb-3 flex justify-between text-gray-700">
    <span className="font-medium">Tax ($)</span>
    <span>{summary.tax.toFixed(2)}</span>
  </div>

  {/* <div className="mb-4 flex justify-between items-center text-gray-700">
    <span className="font-medium">Adjustment ($)</span>
    <input
      type="number"
      className="w-28 rounded border border-gray-300 bg-white p-1 text-right shadow-sm focus:border-blue-500 focus:outline-none"
      value={summary.adjustment}
      onChange={(e) => handleAdjustmentChange(e.target.value)}
    />
  </div> */}

  <div className="flex justify-between items-center rounded bg-blue-100 px-3 py-2 font-bold text-blue-800 border-t border-blue-300">
    <span>Grand Total ($)</span>
    <span>{summary.grandTotal.toFixed(2)}</span>
  </div>
</div>

                    </div>
                </div>
                <Section
                    title="Terms And Conditions"
                    icon={<FiMail />}
                >
                    <div className="col-span-full">
                        <label
                            htmlFor="description"
                            className="block text-gray-700"
                        >
                            Terms And Conditions
                        </label>
                        <textarea
                            id="termsAndConditions"
                            name="termsAndConditions"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded border border-gray-300 p-2"
                        ></textarea>
                    </div>
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
                            className="w-full rounded border border-gray-300 p-2"
                        ></textarea>
                    </div>
                </Section>
            </form>
        </div>
    );
};
export default SalesOrderCreationForm;
