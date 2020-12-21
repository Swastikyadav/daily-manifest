import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { errorMessageFormat } from "../utils/common";

function Registration({ changeUser, setError }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  });

  useEffect(() => {
    setError("");
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userResponse = await axios.post("/api/v1/registrations", {
        user
      },
      {withCredentials: true});

      changeUser(userResponse.data.user);
    } catch ({ response }) {
      const errMsg = errorMessageFormat(response.data.errors);
      setError(errMsg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/">
            <p className="text-3xl text-center"><span className="font-black">Daily</span><span className="font-thin text-blue-800">Manifest</span></p>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register to Daily Manifest
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="py-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="password_confirmation" className="sr-only">Confirm Password</label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="text"
                value={user.password_confirmation}
                onChange={handleChange}
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
            <small>Already have an account? <Link to="/login" className="text-blue-900">Login Here</Link></small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;