// src/components/Login.js
"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import Link from "next/link";
import Label from "../shared/heading/Label";
import NormalHeading from "../shared/heading/NormalHeading";
const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status, loading, ...rest } = useSession();
  console.log(session, "session");
  console.log(status, "statys");
  // console.log(rest, "session");

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      // Handle form submission logic here
      // console.log("Form submitted:", values);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/user",
      });
      setIsLoading(false);
      console.log(res, "res");
      if (!res?.error) {
        // router.push(props.callbackUrl ?? "http://localhost:3000");
      } else {
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
        <NormalHeading title="Login In" />
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <Label title="Email" />
            <Input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.errors.email}
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-3">
            <Label title="Password" />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                helperText={formik.errors.password}
                placeholder="********"
              />

              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute top-[1.2rem] right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 w-full rounded-md hover:bg-indigo-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log In"}
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
          <Link
            href="/auth/register"
            className="text-indigo-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
