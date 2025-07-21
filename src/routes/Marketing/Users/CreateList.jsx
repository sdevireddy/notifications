"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Papa from "papaparse"; // ✅ Import PapaParse
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateListPage() {
  const navigate = useNavigate();
  const [importMethod, setImportMethod] = useState("modules");
  const [selectedModule, setSelectedModule] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);
  const [parsedCSVData, setParsedCSVData] = useState([]); // ✅ Store full parsed data


  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    Papa.parse(file, {
      header: true, // ✅ First row as keys
      skipEmptyLines: true,
      complete: function (results) {
        setParsedCSVData(results.data); // ✅ Save full JSON
        setCsvPreview(results.data.slice(0, 5)); // ✅ Show first 5 rows for preview
      },
      error: function (error) {
        toast.error("Error parsing CSV");
        console.error("CSV Parse Error:", error);
      },
    });
  };

  const handleSubmit = () => {
    if (importMethod === "csv" && !csvFile)
      return toast.error("Please upload a CSV");
    if (importMethod === "modules" && !selectedModule)
      return toast.error("Please select a module");

    // TODO: Send to backend
    const payload = {
      method: importMethod,
      module: selectedModule,
      csvData: parsedCSVData,
    };

    console.log("Submitted Payload:", payload);

    // Example:
    // await axios.post("/api/lists", payload);

    navigate("/marketing/users");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create New List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>List Name</Label>
            <Input placeholder="Enter a name for this list" />
          </div>

          <div className="space-y-2">
            <Label>Import Method</Label>
            <div className="flex gap-4">
              <Button
                variant={importMethod === "modules" ? "default" : "outline"}
                onClick={() => setImportMethod("modules")}
              >
                From Modules
              </Button>
              <Button
                variant={importMethod === "csv" ? "default" : "outline"}
                onClick={() => setImportMethod("csv")}
              >
                From CSV
              </Button>
            </div>
          </div>

          {importMethod === "modules" && (
            <div className="space-y-2">
              <Label>Select Module</Label>
              <Select
                value={selectedModule}
                onValueChange={setSelectedModule}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="deals">Deals</SelectItem>
                  <SelectItem value="accounts">Accounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {importMethod === "csv" && (
            <div className="space-y-3">
              <Label htmlFor="csv">Upload CSV</Label>
              <Input
                id="csv"
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
              />
              {csvPreview.length > 0 && (
                <div className="border rounded p-3 bg-gray-50 text-sm">
                  <p className="mb-2 font-semibold">CSV Preview:</p>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr>
                        {Object.keys(csvPreview[0]).map((header, index) => (
                          <th
                            key={index}
                            className="border-b py-1 pr-4 font-semibold text-gray-700"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvPreview.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((cell, j) => (
                            <td key={j} className="pr-4 py-1 text-gray-800">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-primary text-white hover:bg-opacity-90"
            >
              <Upload className="mr-2 h-4 w-4" />
              Save List
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
