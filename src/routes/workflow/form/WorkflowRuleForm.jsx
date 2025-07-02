"use client";
import { useState } from "react";
import BreadCrumb from "../../../components/BreadCrump";

export default function WorkflowAutomation() {
  const [when, setWhen] = useState("");
  const [module,setModule]=useState("")
  const [conditionGroups, setConditionGroups] = useState([
    [{ id: "1", field: "", operator: "", value: "" }],
  ]);
  const [actionGroups, setActionGroups] = useState([
    [{ id: "1", type: "instant", name: "Email Notification" }],
  ]);
  const [activeTabs, setActiveTabs] = useState(["instant"]);

  const fieldOptions = ["Amount", "Probability (%)", "Deal Stage", "Deal Owner", "Company", "Contact"];
  const operatorOptions = ["=", "!=", ">", ">=", "<", "<=", "contains", "does not contain"];
  const actionOptions = ["Email Notification", "Big Deal Alert", "Send Slack Message"];

  const updateCondition = (groupIndex, conditionId, key, value) => {
    const newGroups = [...conditionGroups];
    newGroups[groupIndex] = newGroups[groupIndex].map((cond) =>
      cond.id === conditionId ? { ...cond, [key]: value } : cond
    );
    setConditionGroups(newGroups);
  };

  const addCondition = (groupIndex) => {
    const newGroups = [...conditionGroups];
    const newId = (newGroups[groupIndex].length + 1).toString();
    newGroups[groupIndex].push({ id: newId, field: "", operator: "", value: "" });
    setConditionGroups(newGroups);
  };

  const removeCondition = (groupIndex, conditionId) => {
    const newGroups = [...conditionGroups];
    newGroups[groupIndex] = newGroups[groupIndex].filter((cond) => cond.id !== conditionId);
    setConditionGroups(newGroups);
  };

  const addConditionGroup = () => {
    setConditionGroups((prev) => [...prev, [{ id: "1", field: "", operator: "", value: "" }]]);
    setActionGroups((prev) => [...prev, []]);
    setActiveTabs((prev) => [...prev, "instant"]);
  };

  const removeConditionGroup = (groupIndex) => {
    const newCond = [...conditionGroups];
    const newActs = [...actionGroups];
    const newTabs = [...activeTabs];
    newCond.splice(groupIndex, 1);
    newActs.splice(groupIndex, 1);
    newTabs.splice(groupIndex, 1);
    setConditionGroups(newCond);
    setActionGroups(newActs);
    setActiveTabs(newTabs);
  };

  const addAction = (groupIndex) => {
    const newActs = [...actionGroups];
    const newId = (newActs[groupIndex].length + 1).toString();
    newActs[groupIndex].push({ id: newId, type: activeTabs[groupIndex], name: "Email Notification" });
    setActionGroups(newActs);
  };

  const updateAction = (groupIndex, actionId, newName) => {
    const newActs = [...actionGroups];
    newActs[groupIndex] = newActs[groupIndex].map((a) => a.id === actionId ? { ...a, name: newName } : a);
    setActionGroups(newActs);
  };

  const removeAction = (groupIndex, actionId) => {
    const newActs = [...actionGroups];
    newActs[groupIndex] = newActs[groupIndex].filter((a) => a.id !== actionId);
    setActionGroups(newActs);
  };

  const getFilteredActions = (groupIndex) =>
    actionGroups[groupIndex]?.filter((a) => a.type === activeTabs[groupIndex]) || [];

  const handleSubmit = () => {
    const result = {
      when,
      conditionGroups,
      actionGroups,
    };
    console.log("Workflow Submitted:", result);
  };

  return (
    <div className="px-10 py-6 bg-gray-50 min-h-screen space-y-10">
       <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Create WorkFlow</h1>
                    <BreadCrumb />
                </div>
                  <div className="flex gap-4">
                    <div className="flex items-start">

        <div className="w-20 px-6 py-2 bg-blue-600  flex items-center rounded justify-center p-0 text-white font-semibold">Select</div>
                    </div>
        <div className="flex-1 flex gap-6 items-center bg-white shadow p-4 rounded text-sm text-gray-600">
          <p>Select the Module</p>
          <select value={module} onChange={(e) => setModule(e.target.value)} className="border p-1 rounded">
            <option value="">Select</option>
            <option value="create">Lead</option>
            <option value="edit">Contact</option>
            <option value="createoredit">Deal</option>
            <option value="delete">Account</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4">
       <div className="flex items-start">

        <div className="w-20 px-6 py-2 bg-blue-600  flex items-center rounded justify-center p-0 text-white font-semibold">When</div>
                    </div>
        <div className="flex-1 flex gap-6 items-center bg-white shadow p-4 rounded text-sm text-gray-600">
          <p>This rule will be executed when</p>
          <select value={when} onChange={(e) => setWhen(e.target.value)} className="border p-1 rounded">
            <option value="">Select</option>
            <option value="create">Create</option>
            <option value="edit">Edit</option>
            <option value="createoredit">Create or Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      </div>

      {when && conditionGroups.map((group, groupIndex) => (
        <div key={groupIndex}>
          {/* CONDITION GROUP */}
          <div className="flex gap-7 relative">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-20 py-2 px-6 bg-blue-600 transform flex items-center justify-center rounded">
                  <span className="text-white text-xs font-semibold  text-center">CONDITION<br />{groupIndex + 1}</span>
                </div>
                {groupIndex > 0 && (
                  <button onClick={() => removeConditionGroup(groupIndex)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6">×</button>
                )}
              </div>
            </div>

            <div className="flex-1 bg-white shadow p-4 rounded space-y-4">
              {group.map((cond) => (
                <div key={cond.id} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-4">{cond.id}</span>
                  <select value={cond.field} onChange={(e) => updateCondition(groupIndex, cond.id, "field", e.target.value)} className="border rounded p-1 w-40">
                    <option value="">Select Field</option>
                    {fieldOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <select value={cond.operator} onChange={(e) => updateCondition(groupIndex, cond.id, "operator", e.target.value)} className="border rounded p-1 w-20">
                    {operatorOptions.map((op) => <option key={op} value={op}>{op}</option>)}
                  </select>
                  <input value={cond.value} onChange={(e) => updateCondition(groupIndex, cond.id, "value", e.target.value)} className="border rounded p-1 w-24" type="text" />
                  {group.length > 1 && (
                    <button onClick={() => removeCondition(groupIndex, cond.id)} className="text-red-500 font-bold text-lg">×</button>
                  )}
                </div>
              ))}
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-xs text-gray-500">Pattern: <code className="bg-gray-100 px-2 py-1 rounded">(Group {groupIndex + 1})</code></span>
                <button onClick={() => addCondition(groupIndex)} className="text-blue-600 text-sm">+ Add Condition</button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 ml-24 py-4">
            <div className="w-0.5 h-8 bg-blue-400"></div>
            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <div className={`cursor-pointer p-4 rounded shadow border ${activeTabs[groupIndex] === "instant" ? "ring-2 ring-blue-500" : ""}`} onClick={() => setActiveTabs(tabs => tabs.map((t, i) => i === groupIndex ? "instant" : t))}>⚡ Instant Actions</div>
                <div className={`cursor-pointer p-4 rounded border border-dashed ${activeTabs[groupIndex] === "scheduled" ? "ring-2 ring-blue-500" : ""}`} onClick={() => setActiveTabs(tabs => tabs.map((t, i) => i === groupIndex ? "scheduled" : t))}>⏱️ Scheduled Actions</div>
              </div>

              <div className="bg-white p-4 rounded shadow space-y-2">
                {getFilteredActions(groupIndex).map((action) => (
                  <div key={action.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <select value={action.name} onChange={(e) => updateAction(groupIndex, action.id, e.target.value)} className="border p-1 rounded">
                      {actionOptions.map((name) => <option key={name} value={name}>{name}</option>)}
                    </select>
                    <button onClick={() => removeAction(groupIndex, action.id)} className="text-red-500 font-bold text-lg">×</button>
                  </div>
                ))}
                <button onClick={() => addAction(groupIndex)} className="w-full text-left text-blue-600 text-sm">+ Add Action</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {when && (
        <div className="flex justify-between mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={addConditionGroup}>+ Add Condition Group</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>Submit Rule</button>
        </div>
      )}
    </div>
  );
}
