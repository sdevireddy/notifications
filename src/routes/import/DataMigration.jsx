import { UserPen } from "lucide-react";
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function DataMigrationUpload() {
    const [file, setFile] = useState(null);
    const { source } = useParams();
    const navigate = useNavigate();
    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.name.endsWith(".csv")) {
            setFile(selected);
        } else {
            alert("Only CSV files are supported.");
        }
    };
    const handleDownloadSample = () => {
        const sampleData = `Name,Email,Phone\nJohn Doe,john@example.com,1234567890\nJane Smith,jane@example.com,0987654321`;
        const blob = new Blob([sampleData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "sample.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white px-2">
            <div className="flex items-center gap-4 py-3">
                <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="rounded p-2 hover:bg-gray-200"
                >
                    <FiArrowLeft size={20} />
                </button>

                <div className="flex items-center gap-4 px-2 py-2">
                    <h1 className="text-xl font-semibold text-gray-900">Import {source}</h1>
                </div>
            </div>
            <div className="flex justify-end items-center">
                {/* <div className="mb-6 flex space-x-2 text-sm text-gray-600">
                    <span className="flex items-center font-medium text-orange-600">
                        <span className="mr-1">🏠</span> Upload
                    </span>
                    <span className="text-gray-400">›</span>
                    <span>Field Mapping</span>
                    <span className="text-gray-400">›</span>
                    <span>Review</span>
                    <span className="text-gray-400">›</span>
                    <span>Finish</span>
                </div> */}
                <div className="mb-3 text-center">
                    <button
                        onClick={handleDownloadSample}
                        className="bg text-primary"
                    >
                        Get Sample CSV
                    </button>
                </div>
            </div>
            {/* Steps */}

            {/* Upload Box */}
            <div className="mb-6 flex h-64 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 text-center text-gray-600">
                <p>Drag and drop the files you’ve exported from Zoho here</p>
                <p className="my-2 text-sm text-gray-400">— or —</p>
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                >
                    <span className="rounded border border-blue-300 bg-white px-4 py-2 text-blue-600 shadow-sm hover:bg-blue-50">Browse Files</span>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <p className="mt-2 text-xs text-gray-400">Only csv files are supported</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
                <button className="text-red-500 underline">Back</button>
                <button
                    className="rounded bg-blue-400 px-6 py-2 text-white disabled:opacity-50"
                    disabled={!file}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
