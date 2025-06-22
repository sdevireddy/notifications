

// WorkflowBuilder.tsx
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

let idCounter = 100;

const initialNodes = [
  {
    id: 'name',
    data: { label: '🔵 Name: Welcome Flow', type: 'name' },
    position: { x: 50, y: 50 },
    type: 'input',
  },
  {
    id: 'source',
    data: { label: '🔵 Source: New Lead', type: 'source' },
    position: { x: 50, y: 150 },
  },
  {
    id: 'when',
    data: { label: '🔸 When: Status = New', type: 'when' },
    position: { x: 50, y: 250 },
  },
  {
    id: 'delay',
    data: { label: '⏱️ Delay: 2 Days', type: 'delay', delay: 2 },
    position: { x: 50, y: 350 },
  },
  {
    id: 'action',
    data: { label: '✅ Action: Send Email', type: 'action', actionType: 'email' },
    position: { x: 50, y: 450 },
    type: 'output',
  },
];

const initialEdges = [
  { id: 'e1', source: 'source', target: 'when' },
  { id: 'e2', source: 'when', target: 'delay' },
  { id: 'e3', source: 'delay', target: 'action' },
];

export default function WorkflowSkeleton() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = (type) => {
    const newId = `node-${idCounter++}`;
    const newNode = {
      id: newId,
      data: { label: `New ${type}`, type },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteNode = (id) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  };

  const handleSubmit = () => {
    const data = {
      name: '',
      source: '',
      when: [],
      delay: [],
      action: [],
    };

    nodes.forEach((node) => {
  const type = node.data.type;
  const label = typeof node.data.label === 'string' ? node.data.label : '';

  if (type === 'name') data.name = label.replace(/^🔵 Name:\s*/, '');
  if (type === 'source') data.source = label.replace(/^🔵 Source:\s*/, '');
  if (type === 'when') data.when.push(label.replace(/^🔸 When:\s*/, ''));
  if (type === 'delay') data.delay.push(label.replace(/^⏱️ Delay:\s*/, ''));
  if (type === 'action') data.action.push(label.replace(/^✅ Action:\s*/, ''));
});

    console.log('Workflow JSON:', JSON.stringify(data, null, 2));
    alert('Workflow submitted — check console!');
  };

  return (
    <div>
      <div className="flex gap-4 p-2">
        <button onClick={() => addNode('when')} className="bg-blue-600 text-white px-4 py-1 rounded">+ When</button>
        <button onClick={() => addNode('delay')} className="bg-yellow-600 text-white px-4 py-1 rounded">+ Delay</button>
        <button onClick={() => addNode('action')} className="bg-green-600 text-white px-4 py-1 rounded">+ Action</button>
        <button onClick={handleSubmit} className="bg-black text-white px-4 py-1 rounded">Submit</button>
      </div>

      <div style={{ height: '80vh', width: '100%' }}>
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              label: (
                <div
                  className="flex items-center gap-2 bg-white p-2 rounded shadow border"
                  style={{ width: 280 }}
                >
                  {node.data.type === 'source' || node.data.type === 'action' || node.data.type === 'when' ? (
                    <select
                      className="flex-1 border rounded px-2 py-1 text-sm w-full"
                      value={node.data.label}
                      onChange={(e) => {
                        const label = e.target.value;
                        setNodes((nds) =>
                          nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label } } : n))
                        );
                      }}
                    >
                      {node.data.type === 'source' && (
                        <>
                          <option>🔵 Source: New Lead</option>
                          <option>🔵 Source: Contact Created</option>
                          <option>🔵 Source: Form Submitted</option>
                        </>
                      )}
                      {node.data.type === 'action' && (
                        <>
                          <option>✅ Action: Send Email</option>
                          <option>✅ Action: Assign Sales Rep</option>
                          <option>✅ Action: Create Task</option>
                        </>
                      )}
                      {node.data.type === 'when' && (
                        <>
                          <option>🔸 When: Status = New</option>
                          <option>🔸 When: Country = US</option>
                          <option>🔸 When: Email Verified</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <input
                      className="flex-1 border rounded px-2 py-1 text-sm w-full"
                      value={node.data.label}
                      onChange={(e) => {
                        const label = e.target.value;
                        setNodes((nds) =>
                          nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label } } : n))
                        );
                      }}
                    />
                  )}

                  <button
                    onClick={() => deleteNode(node.id)}
                    className="text-red-600 text-xs"
                  >
                    🗑
                  </button>
                </div>
              ),
            },
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
