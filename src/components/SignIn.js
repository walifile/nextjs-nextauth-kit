// src/components/Login.js

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status, loading, ...rest } = useSession();
  console.log(session, "session");
  console.log(status, "statys");
  // console.log(rest, "session");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission logic here
      // console.log("Form submitted:", values);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(res, "res");
      if (!res?.error) {
        // router.push(props.callbackUrl ?? "http://localhost:3000");
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Log In
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300 placeholder-gray-500 text-black ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300 placeholder-gray-500 text-black ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="********"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-3 w-full rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Log In
          </button>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-3 w-full rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {status}
          </button>
        </form>
        <div className="mt-4 flex flex-col items-center">
          {/* Social Login Buttons */}
          <div>
            <button className="mb-2 mr-2 p-2 bg-blue-500 text-white rounded-full">
              <FaFacebook />
            </button>
            <button className="p-2 bg-red-500 text-white rounded-full">
              <FaGoogle />
            </button>
          </div>
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
