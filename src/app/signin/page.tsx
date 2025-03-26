// src/app/signin/page.tsx
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SignInPage() {
  const [user, setUser] = useState({ password: "", email: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signin", user);
      console.log(response);

      if (response.data.status < 400) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/about");
        }, 1200);
      }
      if (response.data.status >= 400) {
        console.log("Error");
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center overflow-hidden h-[400px] w-[80%] lg:w-[25%] md:w-[30%] sm:w-[40%] rounded-4xl bg-gray-900">
        <h1 className="text-gray-500 text-lg mb-6">Sign In</h1>

        <p className="text-lg">Email</p>
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="text-lg text-center border-2 outline-none border-gray-800 rounded-lg mt-3 mb-7"
          placeholder="Email"
          type="text"
        />

        <p className="text-lg">Password</p>
        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="text-lg text-center border-2 outline-none border-gray-800 rounded-lg mt-2 mb-6"
          placeholder="Password"
          type="password"
        />

        <button
          disabled={loading}
          onClick={signin}
          className={`bg-black border-2 border-gray-800 hover:border-gray-500 hover:text-gray-700 text-gray-400 px-4 py-1 rounded-lg`}
        >
          {loading ? "Loading.." : "Sign In"}
        </button>
        <Link
          href={"/signup"}
          className="text-slate-600 hover:text-sm mt-5"
        >
          Donott have an account? <span className="text-gray-500">Sign Up</span>
        </Link>
      </div>

      <Toaster />
    </div>
  );
}

export default SignInPage;
