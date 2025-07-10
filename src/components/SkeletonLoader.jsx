import React from 'react';

const CRMSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="p-6 space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="w-full border rounded-lg overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-12 bg-gray-100 text-sm font-medium">
          {Array.from({ length: columns }).map((_, idx) => (
            <div key={idx} className="col-span-2 p-3">
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Row skeletons */}
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-12 border-t bg-white hover:bg-gray-50 transition"
          >
            {Array.from({ length: columns }).map((_, colIdx) => (
              <div key={colIdx} className="col-span-2 p-3">
                <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRMSkeleton;
