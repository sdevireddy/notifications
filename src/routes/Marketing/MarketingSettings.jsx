import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import BreadCrumb from '../../components/BreadCrumb';

const settingOptions = [
  { label: 'Facebook Credentials', path: '/marketing/settings/social/facebook', icon: <FaFacebookF /> },
  { label: 'Twitter Credentials', path: '/marketing/settings/social/twitter', icon: <FaTwitter /> },
  { label: 'Instagram Credentials', path: '/marketing/settings/social/instagram', icon: <FaInstagram /> },
  { label: 'LinkedIn Credentials', path: '/marketing/settings/social/linkedin', icon: <FaLinkedin /> },
];

const MarketingSettings = () => {
  return (
    <div className="px-6 bg-white h-full">
      <div className="flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Marketing Settings</h1>
          <BreadCrumb />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
        {settingOptions.map((option, index) => (
          <Link
            to={option.path}
            key={index}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md hover:bg-blue-50 transition-all border"
          >
            <div className="text-blue-600 text-xl">{option.icon}</div>
            <div className="font-medium text-gray-800">{option.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MarketingSettings;
