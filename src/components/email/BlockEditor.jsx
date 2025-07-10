"use client";
import { useState } from "react";
import { X } from "lucide-react";

export function BlockEditor({ block, onUpdate, onClose }) {
  const updateContent = (key, value) => {
    onUpdate({
      content: { ...block.content, [key]: value },
    });
  };

  const updateStyles = (key, value) => {
    onUpdate({
      styles: { ...block.styles, [key]: value },
    });
  };

  const renderContentEditor = () => {
    switch (block.type) {
      case "text":
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Text Content</label>
              <textarea
                value={block.content.text}
                onChange={(e) => updateContent("text", e.target.value)}
                rows={4}
                className="w-full border p-2 rounded"
                placeholder="Enter your text..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Font Size</label>
                <input
                  type="number"
                  value={block.content.fontSize}
                  onChange={(e) => updateContent("fontSize", parseInt(e.target.value))}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Text Color</label>
                <input
                  type="color"
                  value={block.content.color}
                  onChange={(e) => updateContent("color", e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Font Weight</label>
                <select
                  value={block.content.fontWeight}
                  onChange={(e) => updateContent("fontWeight", e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="lighter">Light</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Text Align</label>
                <select
                  value={block.content.textAlign}
                  onChange={(e) => updateContent("textAlign", e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input
                value={block.content.src}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Alt Text</label>
              <input
                value={block.content.alt}
                onChange={(e) => updateContent("alt", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Width</label>
              <input
                value={block.content.width}
                onChange={(e) => updateContent("width", e.target.value)}
                placeholder="100% or 300px"
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        );

      case "button":
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Button Text</label>
              <input
                value={block.content.text}
                onChange={(e) => updateContent("text", e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Link URL</label>
              <input
                value={block.content.href}
                onChange={(e) => updateContent("href", e.target.value)}
                placeholder="https://example.com"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Background Color</label>
                <input
                  type="color"
                  value={block.content.backgroundColor}
                  onChange={(e) => updateContent("backgroundColor", e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Text Color</label>
                <input
                  type="color"
                  value={block.content.textColor}
                  onChange={(e) => updateContent("textColor", e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Border Radius</label>
              <input
                type="number"
                value={block.content.borderRadius}
                onChange={(e) => updateContent("borderRadius", parseInt(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        );

      case "divider":
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Color</label>
              <input
                type="color"
                value={block.content.color}
                onChange={(e) => updateContent("color", e.target.value)}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Height (px)</label>
              <input
                type="number"
                value={block.content.height}
                onChange={(e) => updateContent("height", parseInt(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        );

      case "spacer":
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Height (px)</label>
              <input
                type="number"
                value={block.content.height}
                onChange={(e) => updateContent("height", parseInt(e.target.value))}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <h3 className="font-semibold capitalize text-gray-800">{block.type} Block</h3>
        <button onClick={onClose} className="hover:text-red-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="border rounded p-4 bg-white shadow-sm">
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Content</h4>
          {renderContentEditor()}
        </div>

        <div className="border rounded p-4 bg-white shadow-sm">
          <h4 className="font-semibold mb-2 text-sm text-gray-700">Styling</h4>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Padding</label>
              <input
                value={block.styles.padding}
                onChange={(e) => updateStyles("padding", e.target.value)}
                placeholder="16px"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Background Color</label>
              <input
                type="color"
                value={block.styles.backgroundColor || "#ffffff"}
                onChange={(e) => updateStyles("backgroundColor", e.target.value)}
                className="w-full h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
