// components/email/TemplateSelectModal.jsx
"use client";
import React, { useEffect, useState } from "react";
import TemplateDisplay from "../../emailtemplate/templateDisplay"

export default function TemplateSelectModal({ isOpen, onClose, onLoad }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Replace with API GET call when backend is ready
    const hardcodedTemplates = [
      {
        id: 1,
        name: "Welcome Email",
        subject: "Welcome!",
        html: "<html><body><h1>Welcome to our service!</h1><p>Thanks for joining.</p></body></html>",
        json: [
          {
            id: "block-1",
            type: "text",
            content: { text: "Welcome to our service!", fontSize: 24 },
            styles: {},
          },
        ],
      },
      {
        id: 2,
        name: "Promo Email",
        subject: "50% Off",
        html: "<html><body><h2>Big Sale!</h2><p>Use code: SAVE50</p></body></html>",
        json: [
          {
            id: "block-2",
            type: "text",
            content: { text: "Big Sale! Use code SAVE50", fontSize: 20 },
            styles: {},
          },
        ],
      },
    ];
    setTemplates(hardcodedTemplates);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-lg overflow-y-auto p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Select a Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {templates.map((template) => (
            <div key={template.id} className="border rounded shadow bg-white overflow-hidden">
              <div className="p-3 border-b">
                <h3 className="text-base font-semibold">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.subject}</p>
              </div>
              <iframe srcDoc={template.html} className="w-full h-40" title={template.name} />
              <div className="p-3 border-t text-right">
                <button
                  onClick={() => {
                    onLoad(template.json);
                    onClose();
                  }}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                >
                  Load Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
