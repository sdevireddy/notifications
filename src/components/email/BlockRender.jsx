"use client";

import { Trash2, GripVertical } from "lucide-react";

export function BlockRenderer({ block, isSelected, onDelete }) {
  const renderContent = () => {
    switch (block.type) {
      case "text":
        return (
          <div
            style={{
              fontSize: `${block.content.fontSize}px`,
              color: block.content.color,
              fontWeight: block.content.fontWeight,
              textAlign: block.content.textAlign,
              padding: block.styles.padding,
              backgroundColor: block.styles.backgroundColor,
            }}
            dangerouslySetInnerHTML={{ __html: block.content.text }}
          />
        );

      case "image":
        return (
          <div
            style={{
              padding: block.styles.padding,
              backgroundColor: block.styles.backgroundColor,
            }}
          >
            <img
              src={block.content.src || "/placeholder.svg"}
              alt={block.content.alt}
              style={{
                width: block.content.width,
                height: "auto",
                display: "block",
                maxWidth: "100%",
              }}
            />
          </div>
        );

      case "button":
        return (
          <div
            style={{
              padding: block.styles.padding,
              backgroundColor: block.styles.backgroundColor,
              textAlign: "center",
            }}
          >
            <a
              href={block.content.href}
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: block.content.backgroundColor,
                color: block.content.textColor,
                textDecoration: "none",
                borderRadius: `${block.content.borderRadius}px`,
                fontWeight: "500",
              }}
            >
              {block.content.text}
            </a>
          </div>
        );

      case "divider":
        return (
          <div
            style={{
              padding: block.styles.padding,
              backgroundColor: block.styles.backgroundColor,
            }}
          >
            <hr
              style={{
                border: "none",
                height: `${block.content.height}px`,
                backgroundColor: block.content.color,
                margin: 0,
              }}
            />
          </div>
        );

      case "spacer":
        return (
          <div
            style={{
              height: `${block.content.height}px`,
              backgroundColor: block.styles.backgroundColor,
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative group">
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-10 flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center"
            aria-label="Delete block"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {isSelected && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 z-10">
          <div className="bg-blue-500 text-white p-1 rounded cursor-move">
            <GripVertical className="w-3 h-3" />
          </div>
        </div>
      )}

      <div
        className={`border-2 transition-colors ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-transparent hover:border-gray-300"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
}
