import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { ChevronDown, Edit, Import, Plus, Send, Tag, Trash2, Users } from "lucide-react";
import { FaRegClone } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineExport } from "react-icons/ai";
import { FiPrinter } from "react-icons/fi";
const ViewSalesOrder = () => {
  const [actionOpen, setActionOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [noteSort, setNoteSort] = useState("recent");

  const handleAddNote = () => {
    if (noteInput.trim()) {
      const newNote = { id: Date.now(), text: noteInput.trim(), createdAt: new Date() };
      setNotes((prev) => [newNote, ...prev]);
      setNoteInput("");
    }
  };

  const sortedNotes = [...notes].sort((a, b) =>
    noteSort === "recent"
      ? b.createdAt - a.createdAt
      : a.createdAt - b.createdAt
  );

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
    <div className="px-4 py-2 text-sm bg-slate-50 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <h1 className="text-xl font-bold ">Sales Order Overview</h1>
        <div className="flex items-center gap-3">
          <DropdownMenu open={actionOpen} onOpenChange={setActionOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`border-gray-300 hover:bg-gray-100 ${actionOpen ? "bg-indigo-100 text-indigo-700" : ""}`}
              >
                <BsThreeDots className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><FaRegClone className="mr-2" /> Clone</DropdownMenuItem>
              <DropdownMenuItem><MdDeleteOutline className="mr-2" /> Delete</DropdownMenuItem>
              <DropdownMenuItem><FiPrinter className="mr-2" /> Print Preview</DropdownMenuItem>
              <DropdownMenuItem><AiOutlineExport className="mr-2" /> Export PDF</DropdownMenuItem>
              <DropdownMenuItem><Send className="mr-2" size={15}/> Send Email</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3">
            <Plus className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>
      </div>

      {/* Basic Details */}
      <div className="grid grid-cols-3 gap-4 border p-4 rounded shadow bg-white">
        <div>
          <p><strong>SO Number:</strong> {salesOrder.soNumber}</p>
          <p><strong>Status:</strong> {salesOrder.status}</p>
          <p><strong>Owner:</strong> {salesOrder.owner}</p>
        </div>
        <div>
          <p><strong>Account:</strong> {salesOrder.account.name}</p>
          <p><strong>Website:</strong> <a href={salesOrder.account.website} className="text-blue-600 underline">{salesOrder.account.website}</a></p>
          <p><strong>Phone:</strong> {salesOrder.account.phone}</p>
        </div>
      </div>

      {/* Sales Order Info */}
      <h2 className="font-semibold text-md pl-4 text-indigo-700">Sales Order Information</h2>
      <div className="border p-4 rounded shadow bg-white">
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Customer Name:</strong> {salesOrder.customerName}</p>
          <p><strong>Carrier:</strong> {salesOrder.carrier}</p>
          <p><strong>Created By:</strong> {salesOrder.createdBy}</p>
          <p><strong>Created At:</strong> {salesOrder.createdAt}</p>
        </div>
      </div>

      {/* Billing Info */}
      <h2 className="font-semibold pl-4 text-indigo-700">Billing Address</h2>
      <div className="border p-4 rounded shadow bg-white">
        <p>{salesOrder.billing.street}</p>
        <p>{salesOrder.billing.city}, {salesOrder.billing.state} - {salesOrder.billing.code}</p>
        <p>{salesOrder.billing.country}</p>
      </div>

      {/* Order Items */}
      <h2 className="font-semibold pl-4 text-indigo-700">Ordered Items</h2>
      <div className="border p-4 rounded shadow bg-white overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">S.No</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Tax</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {salesOrder.items.map((item, index) => {
              const amount = item.unitPrice * item.quantity;
              const total = amount - item.discount + item.tax;
              return (
                <tr key={item.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">${item.unitPrice.toFixed(2)}</td>
                  <td className="border p-2">${amount.toFixed(2)}</td>
                  <td className="border p-2">${item.discount.toFixed(2)}</td>
                  <td className="border p-2">${item.tax.toFixed(2)}</td>
                  <td className="border p-2">${total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-blue-100 p-4 border rounded shadow w-full max-w-xs ml-auto">
        <div className="flex justify-between mb-2"><span>Sub Total</span><span>${salesOrder.summary.subTotal.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span>Discount</span><span>${salesOrder.summary.discount.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span>Tax</span><span>${salesOrder.summary.tax.toFixed(2)}</span></div>
        <div className="flex justify-between mb-2"><span>Adjustment</span><span>${salesOrder.summary.adjustment.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold border-t pt-2"><span>Grand Total</span><span>${salesOrder.summary.total.toFixed(2)}</span></div>
      </div>

      {/* Notes Section */}
      <div className="border rounded shadow bg-white p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-indigo-700">Notes</h2>
          <select value={noteSort} onChange={(e) => setNoteSort(e.target.value)} className="border rounded px-2 py-1 text-sm">
            <option value="recent">Recent Last</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div className="flex gap-2">
          <input
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Add a note"
            className="border rounded w-full px-3 py-2 text-sm"
          />
          <Button onClick={handleAddNote} size="sm" className="bg-indigo-600 text-white">Add</Button>
        </div>
        <div className="space-y-2">
          {sortedNotes.length ? sortedNotes.map((note) => (
            <div key={note.id} className="bg-slate-100 rounded p-2 text-sm">
              {note.text}
              <div className="text-xs text-gray-500 mt-1">{note.createdAt.toLocaleString()}</div>
            </div>
          )) : <p className="text-gray-400 italic">No notes yet.</p>}
        </div>
      </div>

      {/* Placeholder Sections */}
      {["Invoices", "Attachments", "Open Activities", "Closed Activities", "Emails"].map(section => (
        <div key={section} className="border rounded shadow bg-white p-4">
          <h2 className="font-semibold text-indigo-700 mb-1">{section}</h2>
          <p className="text-gray-600 text-sm">No records found</p>
        </div>
      ))}
    </div>
  );
};

export default ViewSalesOrder;
