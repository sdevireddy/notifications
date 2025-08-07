import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ChevronDown, Edit, Import, Plus, Send, Tag, Trash2, Users } from "lucide-react";
import { FaRegClone } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
const ViewSalesOrder = () => {
    const [actionOpen,setActionOpen]=useState(false)
  const salesOrder = {
    soNumber: "8374280000000622023",
    status: "Pending",
    owner: "amardar dasviddy",
    account: {
      name: "Bugs (Sample)",
      website: "http://ringcentralchargers.com",
      phone: "626-366-8003",
    },
    customerName: "tidbits",
    carrier: "FedEx",
    createdBy: "amardar dasviddy",
    createdAt: "Tue, 5 Aug 2019 03:44 PM",
    billing: {
      street: "2700 Bammel N Houston",
      city: "Billing City",
      state: "MD",
      code: "21384",
      country: "United States",
    },
    items: [
      {
        id: "P1211221",
        name: "xyz",
        quantity: 1,
        unitPrice: 70,
        discount: 0,
        tax: 0,
      },
      {
        id: "P1211221",
        name: "xyz",
        quantity: 1,
        unitPrice: 70,
        discount: 0,
        tax: 0,
      },
    ],
    summary: {
      subTotal: 70,
      discount: 0,
      tax: 0,
      adjustment: 0,
      total: 70,
    },
  };

  return (
    <div className="px-4 py-2 text-sm bg-white space-y-4">
      {/* Header Section */}
      <div className="flex items-center justify-between px-2 ">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Sales Order Overview</h1>
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu
                        open={actionOpen}
                        onOpenChange={setActionOpen}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="primary"
                                className={` ${actionOpen ? "bg-primary text-white" : ""}`}
                            >
                                 <BsThreeDots className=" h-4 w-4" />{" "}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                             <DropdownMenuItem >
                                {" "}
                                <FaRegClone className="mr-2 h-4 w-4" />
                              Clone{" "}
                            </DropdownMenuItem>
                             <DropdownMenuItem >
                                {" "}
                                <MdDeleteOutline className="mr-2 h-4 w-4" />
                              Delete{" "}
                            </DropdownMenuItem>
                             <DropdownMenuItem >
                                {" "}
                                <MdDeleteOutline className="mr-2 h-4 w-4" />
                              Print Preview{" "}
                            </DropdownMenuItem>
                             <DropdownMenuItem >
                                {" "}
                                <MdDeleteOutline className="mr-2 h-4 w-4" />
                              Export PDF{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem >
                                {" "}
                                <Send className="mr-2 h-4 w-4" />
                              Send Email{" "}
                            </DropdownMenuItem>
                           
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        onClick={() => navigate("/leads/create")}
                        className="bg-primary text-white px-2"
                    >
                        <Plus className=" h-4 w-4" /> Edit
                    </Button>
                </div>
            </div>
      <div className="grid grid-cols-3 gap-4 border p-4 rounded shadow bg-blue-100">
        <div className="flex flex-col gap-3">
          <p><strong>SO Number:</strong> {salesOrder.soNumber}</p>
          <p><strong>Status:</strong> {salesOrder.status}</p>
          <p><strong>Sales Order Owner:</strong> {salesOrder.owner}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p><strong>Account:</strong> {salesOrder.account.name}</p>
          <p><strong>Website:</strong> <a href={salesOrder.account.website} className="text-blue-600">{salesOrder.account.website}</a></p>
          <p><strong>Phone:</strong> {salesOrder.account.phone}</p>
        </div>
      </div>

      {/* Order Info */}
       <h2 className="font-semibold text-md pl-4">Sales Order Information</h2>
      <div className="border p-4 rounded shadow bg-blue-100">
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Customer Name:</strong> {salesOrder.customerName}</p>
          <p><strong>Carrier:</strong> {salesOrder.carrier}</p>
          <p><strong>Created By:</strong> {salesOrder.createdBy}</p>
          <p><strong>Created At:</strong> {salesOrder.createdAt}</p>
        </div>
      </div>

      {/* Billing Info */}
      <h2 className="font-semibold pl-4">Billing Address</h2>
      <div className="border p-4 rounded shadow bg-blue-100">
        {/* <h2 className="font-semibold mb-2">Billing Address</h2> */}
        <p>{salesOrder.billing.street}</p>
        <p>{salesOrder.billing.city}, {salesOrder.billing.state} - {salesOrder.billing.code}</p>
        <p>{salesOrder.billing.country}</p>
      </div>

      {/* Order Items */}
      <h2 className="font-semibold pl-4">Ordered Items</h2>
      <div className="border p-4 rounded shadow">
        {/* <h2 className="font-semibold mb-2">Ordered Items</h2> */}
        <table className="w-full table-auto border text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">S.No</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit Price ($)</th>
              <th className="p-2 border">Amount ($)</th>
              <th className="p-2 border">Discount ($)</th>
              <th className="p-2 border">Tax ($)</th>
              <th className="p-2 border">Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {salesOrder.items.map((item, index) => {
              const amount = item.unitPrice * item.quantity;
              const total = amount - item.discount + item.tax;
              return (
                <tr key={item.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.unitPrice.toFixed(2)}</td>
                  <td className="p-2 border">{amount.toFixed(2)}</td>
                  <td className="p-2 border">{item.discount.toFixed(2)}</td>
                  <td className="p-2 border">{item.tax.toFixed(2)}</td>
                  <td className="p-2 border">{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="border border-blue-300 bg-blue-100 p-4 rounded shadow w-full max-w-xs ml-auto">
        <div className="flex justify-between mb-2">
          <span>Sub Total</span>
          <span>${salesOrder.summary.subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount</span>
          <span>${salesOrder.summary.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${salesOrder.summary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Adjustment</span>
          <span>${salesOrder.summary.adjustment.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Grand Total</span>
          <span>${salesOrder.summary.total.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <div>
              <h2 className="font-semibold text-md pl-4">Terms and Conditions</h2>
        </div>
        <div>
              <h2 className="font-semibold text-md pl-4">Description</h2>
        </div>
      </div>
    </div>
  );
};

export default ViewSalesOrder;
