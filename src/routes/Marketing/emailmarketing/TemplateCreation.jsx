

"use client";
import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-newsletter"; // Optional preset for email blocks
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function EmailTemplateEditorPage() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!editorRef.current && containerRef.current) {
      editorRef.current = grapesjs.init({
        container: containerRef.current,
        height: "80vh",
        width: "100%",
        fromElement: false,
        storageManager: false,
        plugins: ["gjs-preset-newsletter"],
        pluginsOpts: {
          "gjs-preset-newsletter": {},
        },
      });
      setIsLoaded(true);
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = () => {
    if (editorRef.current) {
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      const fullHtml = `<style>${css}</style>${html}`;

      // Option A: Send to backend
      // fetch("/api/templates", { method: "POST", body: JSON.stringify({ html: fullHtml }) })

      // Option B: Return to create campaign with HTML
      localStorage.setItem("savedTemplateHTML", fullHtml);
      navigate("/marketing/email-campaigns/create");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Email Template Editor</h1>
        <Button onClick={handleSave} className="bg-blue-600 text-white">
          Save & Use Template
        </Button>
      </div>

      <div ref={containerRef} id="gjs-editor" className="border rounded-md" />
    </div>
  );
}
