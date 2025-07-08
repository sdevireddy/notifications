import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaBell, FaShieldAlt, FaCreditCard, FaLanguage, FaQuestionCircle, FaCogs, FaChartPie } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import BreadCrumb from '../../components/BreadCrump';

const settingOptions = [
  { label: 'Email Templates', path: '/templates', icon: <Mail /> },
  { label: 'Profile', path: '/settings/profile', icon: <FaUser /> },
  { label: 'Account', path: '/settings/account', icon: <FaCogs /> },
  { label: 'Privacy', path: '/settings/privacy', icon: <FaLock /> },
  { label: 'Notifications', path: '/settings/notifications', icon: <FaBell /> },
  { label: 'Security', path: '/settings/security', icon: <FaShieldAlt /> },
  { label: 'Billing', path: '/settings/billing', icon: <FaCreditCard /> },
  { label: 'Subscription', path: '/settings/subscription', icon: <FaChartPie /> },
  { label: 'Language', path: '/settings/language', icon: <FaLanguage /> },
  { label: 'Help & Support', path: '/settings/help', icon: <FaQuestionCircle /> },
];

const Settings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = settingOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 bg-white h-full">
      <div className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
                    <BreadCrumb />
                </div>
                </div>

      <div className='py-3'>
        <input
        type="text"
        placeholder="Search settings..."
        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <Link
              to={option.path}
              key={index}
              className="flex items-center gap-4 p-2 bg-white rounded-xl shadow hover:shadow-md hover:bg-blue-50 transition-all border"
            >
              <div className="text-blue-600 text-xl">{option.icon}</div>
              <div className="text-lg font-medium text-gray-800">{option.label}</div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No matching settings found.</p>
        )}
      </div>
    </div>
  );
};

export default Settings;
