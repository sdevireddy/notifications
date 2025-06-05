import { FaUserCheck, FaUsers, FaUserSlash } from "react-icons/fa";

const LeadStatsCard = ({ active, inactive, total }) => {
  const stats = [
    {
      label: "Active Leads",
      value: active,
      icon: <FaUserCheck className="text-green-600 text-2xl" />,
      bg: "bg-green-100",
    },
    {
      label: "Inactive Leads",
      value: inactive,
      icon: <FaUserSlash className="text-red-600 text-2xl" />,
      bg: "bg-red-100",
    },
    {
      label: "Total Leads",
      value: total,
      icon: <FaUsers className="text-blue-600 text-2xl" />,
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex items-center justify-between ${stat.bg}`}
        >
          <div>
            <div className="text-xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
          <div className="p-2 rounded-full bg-white shadow-inner">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default LeadStatsCard;
