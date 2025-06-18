import React from 'react';

const crms = [
  { name: 'Salesforce', logo: '🟦', disabled: false },
  { name: 'Zoho CRM', logo: '🔗', disabled: false, inProgress: true },
  { name: 'Microsoft Dynamics 365', logo: '📐', disabled: false },
  { name: 'Sugar', logo: '🏷️', disabled: false },
  { name: 'Act', logo: '🟠', disabled: false },
  { name: 'Pipedrive', logo: '📊', disabled: false },
  { name: 'Capsule', logo: '💊', disabled: false },
  { name: 'HubSpot', logo: '🧡', disabled: false },
  { name: 'Insightly', logo: '🧠', disabled: false },
  { name: 'Other', logo: '🏢', disabled: false },
];

export default function CRMSelectionImport() {
  return (
    <div className="p-6 space-y-4">
      <p className="text-gray-700 text-sm">
        Easily import records from your existing CRM with our migration tools.
        Select your existing CRM below to get started.
      </p>

      <div className="bg-blue-50 text-sm text-blue-700 px-4 py-2 rounded border border-blue-100">
        Your Zoho CRM migration is in-progress.{' '}
        <a href="#" className="text-blue-600 underline">
          Click to view status.
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {crms.map((crm) => (
          <div
            key={crm.name}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border transition ${
              crm.inProgress
                ? 'border-blue-500 shadow-md'
                : 'border-gray-200 hover:shadow'
            }`}
          >
            <div className="text-4xl">{crm.logo}</div>
            <span className="mt-2 text-sm text-gray-800">{crm.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
