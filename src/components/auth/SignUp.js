"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Label from "@/components/shared/heading/Label";
import NormalHeading from "../shared/heading/NormalHeading";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email")
        .matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, "Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one digit, one special character and must be at least 8 characters"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      // Handle form submission logic here
      console.log("Form submitted:", values);

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        if (res.status === 400) {
          setError("This email is already registered");
        }
        if (res.status === 200) {
          setError("");
          router.push("/login");
        }
      } catch (error) {
        setError("Error, try again");
        console.log(error);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 py-5">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <NormalHeading title="Sign  Up" />
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <Label title="Name" />
            <Input
              type="name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.errors.name}
              placeholder="John"
            />
          </div>
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div className="mb-6">
            <Label title="Confirm Password" />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                helperText={formik.errors.confirmPassword}
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
          >
            Sign Up
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
        {error && error}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
