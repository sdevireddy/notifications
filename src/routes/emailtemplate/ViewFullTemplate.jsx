import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewFullTemplate = () => {
  const { id } = useParams(); // Get template ID from URL
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching a single template (replace with actual API call)
  useEffect(() => {
    const fetchTemplate = async () => {
      setLoading(true);
      // Simulated static templates – replace with real API logic
      const allTemplates = [
        {
          id: '1',
          name: 'Welcome Email',
          subject: 'Welcome!',
          html: '<html><body><h1>Welcome to our service!</h1><p>Thanks for joining us.</p></body></html>',
        },
        {
          id: '2',
          name: 'Promo Email',
          subject: '50% Off',
          html: '<html><body><h2>Exclusive Deal!</h2><p>Use code: SAVE50</p></body></html>',
        },
      ];

      const found = allTemplates.find((t) => t.id === id);
      setTemplate(found);
      setLoading(false);
    };

    fetchTemplate();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading template...
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700">Template not found</h2>
        <Link to="/templates" className="text-blue-600 hover:underline mt-2 inline-block">
          Back to Templates
        </Link>
      </div>
    );
  }

  return (
    <div className=" px-4 py-8 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{template.name}</h1>
        <Link
          to="/templates"
          className="text-sm text-blue-600 hover:underline"
        >
          ⬅ Back to Templates
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden shadow">
        <iframe
          srcDoc={template.html}
          title={template.name}
          className="w-full h-[500px] border-none"
        />
      </div>
    </div>
  );
};

export default ViewFullTemplate;
