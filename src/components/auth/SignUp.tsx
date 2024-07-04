"use client";
import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Label from "@/components/shared/heading/Label";
import NormalHeading from "../shared/heading/NormalHeading";
import { signupSchema, SignupSchemaType } from "@/schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
const SignUp: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = async (values) => {
    console.log("Form submitted:", values);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      } else if (res.status === 200) {
        setError("");
        // Assuming you are using next/navigation router
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 py-5">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <NormalHeading title="Sign  Up" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label title="Name" />
            <Input
              type="text"
              id="name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="John"
            />
          </div>
          <div className="mb-6">
            <Label title="Email" />
            <Input
              type="email"
              id="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <Label title="Password" />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
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
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
