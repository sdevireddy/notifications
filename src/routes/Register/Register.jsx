import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input } from '../../components/layout/ui/input';
import { apiSummary } from '../../common/apiSummary';
import toast from 'react-hot-toast';
import { axiosPrivate } from '../../utils/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    organization: '',
    name: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
        const resp=await axiosPrivate({
            ...apiSummary.register,
            data:formData
        })
        console.log('Registration Data:', formData);
        localStorage.setItem("access_token",resp?.data?.access_token)
        toast.success("Login Successfull")
        navigate("/")
    } catch (error) {
        toast.error("Somthing Went Wrong,Try Again")
        console.log(error)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-[20rem] p-8 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-3">Create an Account</h2>
        <form onSubmit={handleSubmit} >
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your username"
              required
            />
          </div>
          
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Full Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Organization */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Organization Name</label>
            <Input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your organization name"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium">Password</label>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded pr-10"
              placeholder="Create a password"
              required
            />
            <div
              className="absolute top-10 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
