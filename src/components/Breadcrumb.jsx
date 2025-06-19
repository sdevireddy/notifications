import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav aria-label="breadcrumb" className="flex items-center text-sm text-gray-600 px-3 py-2" >
     {
        location!="/" && <Link to="/" className="hover:underline text-gray-500">Home</Link>
     } 
      {segments.map((seg, i) => {
        const path = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;

        return (
          <span key={i} className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            {isLast ? (
              <span className="text-primary font-semibold">{capitalize(seg)}</span>
            ) : (
              <Link to={path} className="hover:underline">{capitalize(seg)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
