"use client";

import { Type, ImageIcon, MousePointer, Minus, Space } from "lucide-react";

const blockTypes = [
  {
    type: "text",
    name: "Text Block",
    description: "Rich text content",
    icon: Type,
    color: "text-blue-600",
  },
  {
    type: "image",
    name: "Image Block",
    description: "Image with URL",
    icon: ImageIcon,
    color: "text-green-600",
  },
  {
    type: "button",
    name: "Button Block",
    description: "Call-to-action button",
    icon: MousePointer,
    color: "text-purple-600",
  },
  {
    type: "divider",
    name: "Divider",
    description: "Horizontal line",
    icon: Minus,
    color: "text-gray-600",
  },
  {
    type: "spacer",
    name: "Spacer",
    description: "Empty space",
    icon: Space,
    color: "text-orange-600",
  },
];

export function BlockLibrary({ onAddBlock }) {
  const mergeTags = [
    "{{name}}",
    "{{email}}",
    "{{company}}",
    "{{date}}",
    "{{unsubscribe_url}}",
  ];

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Email Blocks</h3>
        <div className="space-y-3">
          {blockTypes.map((blockType) => {
            const Icon = blockType.icon;
            return (
              <div
                key={blockType.type}
                onClick={() => onAddBlock(blockType.type)}
                className="flex items-center gap-3 cursor-pointer p-3 rounded-md border hover:bg-gray-100 transition"
              >
                <div className={`p-2 rounded bg-gray-100 ${blockType.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{blockType.name}</div>
                  <div className="text-xs text-gray-500">{blockType.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Merge Tags</h4>
        <div className="text-xs text-gray-600 mb-2">Click to copy:</div>
        <div className="space-y-2">
          {mergeTags.map((tag) => (
            <div
              key={tag}
              onClick={() => navigator.clipboard.writeText(tag)}
              className="text-xs font-mono bg-gray-50 px-3 py-1 rounded border cursor-pointer hover:bg-gray-100"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
