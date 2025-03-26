"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const [token, settoken] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

 
  useEffect(() => {
    const url = window.location.search.split("=")[1];
    if (url) {
      settoken(url);
    }
  }, []);

  useEffect(() => {
     if(!token) return
    const callverify = async () => {
      setloading(true)
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log(response);
  
      if (response.data.status < 400) {
        toast.success(response.data.message);
      }
      if (response.data.status >= 400) {
        toast.error(response.data.message);
      }
      setloading(false)
    };
    callverify()
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col ">
        {error && <div className="text-red text-lg font-semibold">Error</div>}
        {loading && <p className="mb-3 text-sm text-gray-600">Loading...</p>}
        {token.length > 0 && (
          <p className="text-red bg-slate-800 rounded-lg mb-6 p-2 text-sm ">
            {token}
          </p>
        )}
        <Link href={"/signin"}>Login</Link>
      </div>
      <Toaster />
    </div>
  );
}

export default page;
