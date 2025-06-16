
import React, { useState } from "react";
import { Button } from "../../../components/layout/ui/button";

const WorkflowRuleForm = () => {
  const [rule, setRule] = useState({
    name: "",
    trigger: "onCreate",
    conditionField: "",
    conditionOperator: "equals",
    conditionValue: "",
    actionType: "sendEmail",
    actionDetail: "",
  });

  const handleChange = (e) => {
    setRule({ ...rule, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Workflow Rule:", rule);
    // send to backend API here
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="mx-auto w-full space-y-4 rounded-xl bg-white p-6 shadow"
      >
          <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Create Workflow Rule</h2>
              <Button className={"bg-buttonprimary hover:bg-buttonprimary-hover text-white px-7"}>Save</Button>
          </div>

          <input
              name="name"
              value={rule.name}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Rule Name"
              required
          />

          <div>
              <label className="mb-1 block text-sm text-gray-600">Trigger</label>
              <select
                  name="trigger"
                  value={rule.trigger}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
              >
                  <option value="onCreate">On Create</option>
                  <option value="onUpdate">On Update</option>
                  <option value="onCreateOrUpdate">On Create or Update</option>
              </select>
          </div>

          <div>
              <label className="mb-1 block text-sm text-gray-600">Condition</label>
              <div className="flex gap-2">
                  <input
                      name="conditionField"
                      value={rule.conditionField}
                      onChange={handleChange}
                      placeholder="Field (e.g. status)"
                      className="flex-1 rounded border px-3 py-2"
                      required
                  />
                  <select
                      name="conditionOperator"
                      value={rule.conditionOperator}
                      onChange={handleChange}
                      className="rounded border px-3 py-2"
                  >
                      <option value="equals">Equals</option>
                      <option value="not_equals">Not Equals</option>
                      <option value="contains">Contains</option>
                  </select>
                  <input
                      name="conditionValue"
                      value={rule.conditionValue}
                      onChange={handleChange}
                      placeholder="Value"
                      className="flex-1 rounded border px-3 py-2"
                      required
                  />
              </div>
          </div>

          <div>
              <label className="mb-1 block text-sm text-gray-600">Action</label>
              <select
                  name="actionType"
                  value={rule.actionType}
                  onChange={handleChange}
                  className="w-full rounded border px-3 py-2"
              >
                  <option value="sendEmail">Send Email</option>
                  <option value="updateField">Update Field</option>
                  <option value="assignOwner">Assign Owner</option>
              </select>
          </div>

          <input
              name="actionDetail"
              value={rule.actionDetail}
              onChange={handleChange}
              placeholder="Email Template / Field Name / Owner Name"
              className="w-full rounded border px-3 py-2"
              required
          />
      </form>
  );
};

export default WorkflowRuleForm;
