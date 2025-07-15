"use client";
import { useState } from "react";
import {Button} from "../../../components/ui/button";
import {Input} from "../../../components/ui/Input";
import {Select,SelectValue,SelectTrigger,SelectContent,SelectItem} from "../../../components/ui/Select";
import { Card, CardHeader,
  CardTitle,
  CardContent,} from "../../../components/ui/card";
  import {Label} from "../../../components/ui/label";
// import {Checkbox} from "../../../components/ui/Checkbox";
// import {Dialog,DialogContent} from "../../../components/ui/Dialog";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import Papa from "papaparse"; // Optional CSV preview parser

export default function CreateListPage() {
  const navigate = useNavigate();
  const [importMethod, setImportMethod] = useState("modules");
  const [selectedModule, setSelectedModule] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [csvPreview, setCsvPreview] = useState([]);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);

    // Preview logic (optional if Papa.js used)
    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split("\n").slice(0, 5); // Preview 5 rows
      const parsed = lines.map((line) => line.split(","));
      setCsvPreview(parsed);
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (importMethod === "csv" && !csvFile) return alert("Please upload a CSV");
    if (importMethod === "modules" && !selectedModule)
      return alert("Please select a module");

    // TODO: Submit to backend
    // Example:
    // await axios.post("/api/lists", { name, contacts: selectedModule || csvFile });

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
                  <table className="w-full text-left text-xs">
                    <tbody>
                      {csvPreview.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="pr-4 py-1">
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
              className="bg-buttonprimary text-white hover:bg-buttonprimary-hover"
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
