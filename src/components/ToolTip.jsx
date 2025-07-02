import React from 'react';

export default function Tooltip({ children, text }) {
  return (
    <div className="relative group inline-block border rounded p-2 cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out duration-300">
      {children}
      <div className="absolute z-10 hidden group-hover:flex bg-primary text-white text-xs px-2 py-1 rounded -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
}
