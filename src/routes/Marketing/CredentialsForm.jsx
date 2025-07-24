import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const CredentialForm = ({ platform }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔄 Simulate saving credentials
    toast.success(`${platform} credentials saved.`);

    // 🛑 Uncomment when backend is ready
    /*
    try {
      const response = await fetch(`/api/social-credentials/${platform}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId, password }),
      });

      if (response.ok) {
        toast.success(`${platform} credentials saved.`);
      } else {
        toast.error('Failed to save credentials.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    }
    */
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Connect {platform.charAt(0).toUpperCase() + platform.slice(1)}</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Login ID</label>
        <Input
          type="text"
          placeholder={`Enter your ${platform} login ID`}
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <Input
          type="password"
          placeholder={`Enter your ${platform} password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">Save Credentials</Button>
    </form>
  );
};

export default CredentialForm;
