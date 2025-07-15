import React from 'react';
import { cn } from '@/utils/cn'; // or use clsx if not using `cn`

const statusColors = {
  Contacted: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  New: 'bg-green-100 text-green-800',
  Lost: 'bg-red-100 text-red-800',
  Qualified: 'bg-purple-100 text-purple-800',
  PROPOSAL: 'bg-green-100 text-green-800'
};

const StatusBadge = ({ status }) => {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap',
        colorClass
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
