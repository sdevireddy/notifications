import React from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const isHRModule = segments[0].toLowerCase() === "hr";
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav aria-label="breadcrumb" className="flex items-center text-[0.8rem] text-gray-600 px-3 py-2">
      {isHRModule ? (
        segments.map((seg, i) => {
          const isLast = i === segments.length - 1;
          const path = "/" + segments.slice(0, i + 1).join("/");

          return (
            <span key={i} className="flex items-center">
              {i > 0 && <span className="mx-2 text-gray-500">/</span>}
              {i === 0 ? (
                // Link "HR" to the HR Dashboard
                <Link to="/hr" className="hover:underline text-gray-500">
                 HR
                </Link>
              ) : (
                <span className={isLast ? "text-primary font-semibold" : ""}>
                  {capitalize(seg)}
                </span>
              )}
            </span>
          );
        })
      ) : (
        <>
          <Link to="/" className="hover:underline text-gray-500">Home</Link>
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
        </>
      )}
    </nav>
  );
};

export default BreadCrumb;
