"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Changed from "next/navigation"
import axios from "axios"; // Removed the curly braces around axios
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();
  // Initialize state variables to store form input values
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  // Disbale button state hooks
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // Password shown hook
  const [showPassword, setShowPassword] = useState(false);
  // loading state
  const [loading, setLoading] = useState(false);

  // Event handler to update the state when input values change
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Event handler to log the form input values when the form is submitted
  const onSignUp = async (event: { preventDefault: () => void }) => {
    try {
      event.preventDefault();
      console.log("Form values:", user);
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup sucess", response.data);
      toast.success("signup sucess", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed");
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // toggle button for password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to clear all fields
  const clearAllFields = () => {
    setUser({
      ...user,
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="container p-6 text-center text-2xl flex justify-center items-center h-[100vh]">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onSignUp}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="UserName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={user.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 bg-gray-200 rounded-r-lg hover:bg-gray-300 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 text-gray-600 dark:text-gray-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19.293 4.293a1 1 0 011.414 1.414l-14 14a1 1 0 01-1.414-1.414l14-14z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 text-gray-600 dark:text-gray-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7.9 7.9l-3.8-3.8a2 2 0 113.6-3.6l3.8 3.8"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                {/* <button disabled="true" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-[1rem]">
              Create Account
            </button> */}

                {buttonDisabled ? (
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed text-[1rem]">
                    Create Account
                  </button>
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-[1rem]">
                    Create Account
                  </button>
                )}

                <br />

                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-[1rem]"
                  onClick={clearAllFields}
                >
                  Clear Fields
                </button>
                <br />
                <Link
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  href="/login"
                >
                  Go to Login Page
                </Link>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
