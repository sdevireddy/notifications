import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  startNode: ({ data }) => (
    <div className="p-2 rounded-full bg-green-500 text-white text-sm text-center shadow">
      {data.label}
    </div>
  ),
  conditionNode: ({ data }) => (
    <div className="p-2 rounded bg-yellow-300 text-black text-sm shadow border">
      {data.label}
    </div>
  ),
  actionNode: ({ data }) => (
    <div className="p-2 rounded bg-blue-500 text-white text-sm shadow border">
      {data.label}
    </div>
  ),
};

let id = 0;
const getId = () => `node_${id++}`;

const WorkflowEditor = () => {
  const initialNodes = [
    {
      id: getId(),
      type: "startNode",
      data: { label: "Start" },
      position: { x: 100, y: 100 },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const addNode = (type) => {
    const newNode = {
      id: getId(),
      type: type,
      data: { label: type === "conditionNode" ? "Condition" : "Action" },
      position: { x: Math.random() * 250 + 100, y: Math.random() * 300 + 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full flex">
        <div className="w-64 bg-gray-100 border-r p-4 space-y-4">
          <h2 className="font-bold text-lg mb-4">Workflow Toolbox</h2>
          <button
            onClick={() => addNode("conditionNode")}
            className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded text-black"
          >
            Add Condition
          </button>
          <button
            onClick={() => addNode("actionNode")}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded text-white"
          >
            Add Action
          </button>
        </div>
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;
