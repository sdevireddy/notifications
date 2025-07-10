"use client";

import { useState, useRef } from "react";
import { BlockRenderer } from "./BlockRender";
import { BlockEditor } from "./BlockEditor";

export function Canvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onMoveBlock,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
  };

  const handleDragLeave = () => {
    dragCounter.current--;
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    dragCounter.current = 0;

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onMoveBlock(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);

  return (
    <div className="flex h-full">
      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded shadow-lg">
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-lg min-h-96">
                {blocks.length === 0 ? (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <div className="text-lg font-medium mb-2">Start Building Your Email</div>
                      <div className="text-sm">Select blocks from the sidebar to get started</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 p-4">
                    {blocks.map((block, index) => (
                      <div
                        key={block.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`
                          relative group cursor-move transition-all duration-200
                          ${selectedBlockId === block.id ? "ring-2 ring-blue-500" : ""}
                          ${draggedIndex === index ? "opacity-50" : ""}
                        `}
                        onClick={() => onSelectBlock(block.id)}
                      >
                        <BlockRenderer
                          block={block}
                          isSelected={selectedBlockId === block.id}
                          onDelete={() => onDeleteBlock(block.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Panel */}
      {selectedBlock && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <BlockEditor
            block={selectedBlock}
            onUpdate={(updates) => onUpdateBlock(selectedBlock.id, updates)}
            onClose={() => onSelectBlock(null)}
          />
        </div>
      )}
    </div>
  );
}
