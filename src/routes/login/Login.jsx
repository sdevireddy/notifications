import React, { useState } from 'react';
import { Input } from '../../components/layout/ui/input';
import { axiosPrivate } from '../../utils/axios';
import { apiSummary } from '../../common/apiSummary';
import { Button } from '../../components/layout/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
        const resp=await axiosPrivate({
            ...apiSummary.auth.login,
            data:formData
        })
        console.log(resp?.data)
        toast.success("Login Successfull")
        navigate("/")
    } catch (error) {
        toast.error("Somthing Went Wrong,Try Again")
        console.log(error)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <div className="flex items-center mb-6">
          <div className="bg-blue-600 text-white p-3 rounded">
            <span className="text-xl font-bold">S</span> 
            {/* logo */}

          </div>
          <h2 className="ml-3 text-2xl font-semibold">Login</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className=""
              />
              <p className='inline'>Remember Me</p>
            </label>
            <Link to={"/register"} className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded transition"
          >
            LOGIN
          </Button>
           <p className="py-3 px-2">
          Don't Have Account ?{" "}
          <Link
            to={"/register"}
            className="text-primary  transition-all ease-in-out duration-300"
          >
            Register
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
