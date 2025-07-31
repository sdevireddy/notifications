import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';

const TemplateDisplay = () => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = [
        {
          id: 1,
          name: 'Welcome Email',
          subject: 'Welcome!',
          html: '<html><body><h1>Welcome to our service!</h1><p>Thanks for joining.</p></body></html>',
        },
        {
          id: 2,
          name: 'Promo Email',
          subject: '50% Off',
          html: '<html><body><h2>Big Sale!</h2><p>Use code: SAVE50</p></body></html>',
        },
      ];
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-5 bg-white min-h-screen">
      <div className="flex items-center justify-between  mb-5 ">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Templates</h1>
          <BreadCrumb />
        </div>
        <Link
          to="/templates/create"
          className="bg-primary text-white px-4 py-2 rounded-md text-sm"
        >
          + Create Template
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search templates by name..."
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="border rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition"
            >
              <div className="p-3 border-b">
                <h3 className="text-base font-semibold text-gray-800">{template.name}</h3>
                <p className="text-sm text-gray-500">{template.subject}</p>
              </div>
              <iframe
                srcDoc={template.html}
                title={template.name}
                className="w-full h-36 border-t"
              />
              <div className="p-3 border-t text-right">
                <Link
                  to={`/templates/${template.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Full Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No templates match your search.</p>
      )}
    </div>
  );
};

export default TemplateDisplay;
