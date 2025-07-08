"use client";

import { generateHTML } from "../../utils/email";


export function Preview({ blocks }) {
  const htmlContent = generateHTML(blocks);

  return (
    <div className="h-full p-6 bg-gray-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Email Preview</h2>
          <div className="border rounded-lg overflow-hidden">
            <iframe
              srcDoc={htmlContent}
              className="w-full h-96 border-0"
              title="Email Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
