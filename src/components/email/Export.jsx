"use client";
import { useState } from "react";

export default function ExportModal({ isOpen, onClose, exportData }) {
  const [activeTab, setActiveTab] = useState("html");
  const { html, json } = exportData();

  const copyToClipboard = (content, type) => {
    navigator.clipboard.writeText(content);
    alert(`${type} copied to clipboard`);
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded shadow-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Export Email Template</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-sm">✕</button>
        </div>

        {/* Tabs */}
        <div className="border-b px-4">
          <button
            onClick={() => setActiveTab("html")}
            className={`px-4 py-2 text-sm ${activeTab === "html" ? "font-bold border-b-2 border-black" : "text-gray-500"}`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab("json")}
            className={`px-4 py-2 text-sm ${activeTab === "json" ? "font-bold border-b-2 border-black" : "text-gray-500"}`}
          >
            JSON
          </button>
        </div>

        {/* Output area */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{activeTab.toUpperCase()} Output</span>
            <div className="space-x-2">
              <button
                onClick={() => copyToClipboard(activeTab === "html" ? html : json, activeTab.toUpperCase())}
                className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
              >
                Copy
              </button>
              <button
                onClick={() =>
                  downloadFile(
                    activeTab === "html" ? html : json,
                    `email-template.${activeTab === "html" ? "html" : "json"}`
                  )
                }
                className="px-3 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
              >
                Download
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={activeTab === "html" ? html : json}
            className="w-full h-96 text-xs font-mono border rounded p-2 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
