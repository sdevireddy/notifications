import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

export default function DataMigrationUpload() {
  const [file, setFile] = useState(null);
  const navigate=useNavigate()
  const location=useLocation()
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.name.endsWith('.csv')) {
      setFile(selected);
    } else {
      alert('Only CSV files are supported.');
    }
  };

  return (
    <div className="p-6 max-w-5xl  bg-white">
        <div className='flex gap-4 items-center py-3'>

          <button
                                    onClick={() => navigate(-1)}
                                    type="button"
                                    className="rounded p-2 hover:bg-gray-200"
                                >
                                    <FiArrowLeft size={20} />
                                </button>
        
      <h2 className="text-xl font-semibold text-gray-800    ">Data Migration</h2>
        </div>

      {/* Steps */}
      <div className="flex space-x-2 text-sm text-gray-600 mb-6">
        <span className="flex items-center text-orange-600 font-medium">
          <span className="mr-1">🏠</span> Upload
        </span>
        <span className="text-gray-400">›</span>
        <span>Module - File Mapping</span>
        <span className="text-gray-400">›</span>
        <span>Field Mapping</span>
        <span className="text-gray-400">›</span>
        <span>Review</span>
        <span className="text-gray-400">›</span>
        <span>Finish</span>
      </div>

      {/* Upload Box */}
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-md h-64 flex flex-col justify-center items-center text-center text-gray-600 mb-6">
        <p>Drag and drop the files you’ve exported from Zoho here</p>
        <p className="text-sm text-gray-400 my-2">— or —</p>
        <label htmlFor="file-upload" className="cursor-pointer">
          <span className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded shadow-sm hover:bg-blue-50">
            Browse Files
          </span>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-400 mt-2">Only csv files are supported</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button className="text-red-500 underline">Back</button>
        <button
          className="bg-blue-400 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={!file}
        >
          Next
        </button>
      </div>
    </div>
  );
}
