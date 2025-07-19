"use client";

import { useState, useCallback } from "react";
import { BlockLibrary } from "../../components/email/BlockLibrary";
import { Canvas } from "../../components/email/Canvas";
import { Preview } from "../../components/email/Preview";
import { generateHTML, generateJSON } from "../../utils/email";
import { sampleTemplate } from "../../utils/sampleTemplate";
import TemplateSelectModal from "../Marketing/emailmarketing/TemplateSelectModal";

export default function EmailBuilder() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("builder");

  const handleLoadTemplate = (templateBlocks) => {
    setBlocks(templateBlocks); // ✅ directly sets the blocks into the editor
    setSelectedBlockId(null);
    setShowTemplateModal(false);
  };

  const addBlock = useCallback((type) => {
    const newBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
    };
    setBlocks((prev) => [...prev, newBlock]);
  }, []);

  const updateBlock = useCallback((id, updates) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, ...updates } : block))
    );
  }, []);

  const deleteBlock = useCallback(
    (id) => {
      setBlocks((prev) => prev.filter((block) => block.id !== id));
      if (selectedBlockId === id) {
        setSelectedBlockId(null);
      }
    },
    [selectedBlockId]
  );

  const moveBlock = useCallback((dragIndex, hoverIndex) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      const draggedBlock = newBlocks[dragIndex];
      newBlocks.splice(dragIndex, 1);
      newBlocks.splice(hoverIndex, 0, draggedBlock);
      return newBlocks;
    });
  }, []);

  const exportData = useCallback(() => {
    const html = generateHTML(blocks);
    const json = generateJSON(blocks);
    console.log("📤 Exported HTML:\n", html);
    return { html, json };
  }, [blocks]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Email Builder</h1>
          <p className="text-sm text-gray-500">Drag blocks to create your email</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <BlockLibrary onAddBlock={addBlock} />
        </div>

        <div className="p-4 border-t space-y-2">
          <button
            onClick={() => setShowTemplateModal(true)} // ✅ fixed re-render issue
            className="w-full px-3 py-2 border rounded text-sm hover:bg-gray-100"
          >
            Load Sample Template
          </button>
          <button
            onClick={() => {
              exportData(); // ✅ export HTML/JSON
            }}
            className="w-full px-3 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
          >
            Export Template
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        <div className="bg-white border-b p-4 flex gap-4">
          <button
            onClick={() => setActiveTab("builder")}
            className={`text-sm px-3 py-1 rounded ${
              activeTab === "builder" ? "bg-black text-white" : "text-gray-600 border"
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`text-sm px-3 py-1 rounded ${
              activeTab === "preview" ? "bg-black text-white" : "text-gray-600 border"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Template Modal */}
        <TemplateSelectModal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
          onLoad={handleLoadTemplate}
        />

        {/* Editor or Preview */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "builder" && (
            <Canvas
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
              onMoveBlock={moveBlock}
            />
          )}
          {activeTab === "preview" && <Preview blocks={blocks} />}
        </div>
      </div>
    </div>
  );
}

// Helpers
function getDefaultContent(type) {
  switch (type) {
    case "text":
      return {
        text: "Enter your text here...",
        fontSize: 16,
        color: "#000",
        fontWeight: "normal",
        textAlign: "left",
      };
    case "image":
      return { src: "https://via.placeholder.com/600x300", alt: "Image", width: "100%" };
    case "button":
      return {
        text: "Click Me",
        href: "#",
        backgroundColor: "#007bff",
        textColor: "#fff",
        borderRadius: 4,
      };
    case "divider":
      return { color: "#ccc", height: 1 };
    case "spacer":
      return { height: 20 };
    default:
      return {};
  }
}

function getDefaultStyles(type) {
  return {
    padding: type === "spacer" ? "0px" : "16px",
    margin: "0px",
    backgroundColor: "transparent",
  };
}
