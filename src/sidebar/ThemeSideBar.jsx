import { useState, useEffect } from "react";

const sidebarColors = [
  { name: "Dark Green", value: "#064e3b" },
  { name: "Dark Purple", value: "#4c1d95" },
  { name: "Gray", value: "#1f2937" },
  { name: "Midnight Blue", value: "#1e3a8a" },
  { name: "Slate", value: "#334155" },
  { name: "Black", value: "#0f172a" },
  { name: "Charcoal", value: "#2d2d2d" },
  { name: "Teal", value: "#0d9488" },
];

const buttonColors = [
  { name: "Red", value: "#dc2626" },
  { name: "Green", value: "#16a34a" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Pink", value: "#ec4899" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Lime", value: "#84cc16" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Sky", value: "#0ea5e9" },
];


export default function ThemeSideBar({ isOpen, onClose }) {
  const [sidebarColor, setSidebarColor] = useState(localStorage.getItem("color-sidebar") ||"#1f2937");
  const [buttonColor, setButtonColor] = useState(localStorage.getItem("color-button") || "#3b82f6");

  useEffect(() => {
    localStorage.setItem("color-sidebar",sidebarColor)
    document.documentElement.style.setProperty("--color-sidebar", sidebarColor);
  }, [sidebarColor]);

  useEffect(() => {
     localStorage.setItem("color-button",buttonColor)
    document.documentElement.style.setProperty("--color-primary", buttonColor);
  }, [buttonColor]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[90%] sm:w-[400px] transform border-l bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
      <div className="p-6 h-full flex flex-col">
  {/* Header */}
  <h2 className="text-xl font-bold mb-6 text-gray-800">
    Theme Customizer
  </h2>

  {/* Scrollable Section */}
  <div className="flex-1 overflow-auto">
    {/* Sidebar Color Section */}
    <div className="mb-6">
      <h3 className="text-md font-semibold mb-2 text-gray-700">
        Sidebar Color
      </h3>
      <div className="flex gap-3 flex-wrap">
        {sidebarColors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSidebarColor(color.value)}
            className={`w-20 h-10 rounded-md border-2 ${
              sidebarColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>

    {/* Button Color Section */}
    <div>
      <h3 className="text-md font-semibold mb-2 text-gray-700">
        Button Color
      </h3>
      <div className="flex gap-3 flex-wrap">
        {buttonColors.map((color) => (
          <button
            key={color.name}
            onClick={() => setButtonColor(color.value)}
            className={`w-20 h-10 rounded-md border-2 ${
              buttonColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  </div>

  {/* Sticky Footer */}
  <div className="pt-4 border-t mt-4">
    <button
      onClick={onClose}
      className="bg-primary text-white px-4 py-2 rounded shadow hover:opacity-90 transition w-full"
    >
      Apply & Close
    </button>
  </div>
</div>

      </div>
    </>
  );
}
