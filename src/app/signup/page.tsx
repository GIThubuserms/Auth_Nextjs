"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  const [user, setuser] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setloading] = React.useState(false);
  const router = useRouter();

  const signup = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      console.log(response.data.status);

      if (response.data.status < 400) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/signin");
        }, 1500);
      }
      if (response.data.status >= 400) {
        console.log("Error");
        toast.error(response.data.message);
      }
      setloading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center  overflow-hidden h-[400px] w-[80%] lg:w-[25%] md:w-[30%]  sm:w-[40%]  rounded-4xl bg-gray-900 ">
        <h1 className="text-gray-500 text-lg mb-6">SignUp</h1>

        <p className="">Username</p>
        <input
          value={user.username}
          onChange={(e) => setuser({ ...user, username: e.target.value })}
          className=" text-center border-2 outline-none border-gray-800  rounded-lg mt-2 mb-6"
          placeholder="Username"
          type="text"
        />

        <p className="">Email</p>
        <input
          value={user.email}
          onChange={(e) => setuser({ ...user, email: e.target.value })}
          className="text-sm text-center border-2 outline-none border-gray-800  rounded-lg mt-2 mb-6 "
          placeholder="Email"
          type="text"
        />

        <p className="">Password</p>
        <input
          value={user.password}
          onChange={(e) => setuser({ ...user, password: e.target.value })}
          className="text-center border-2 outline-none border-gray-800  rounded-lg mt-2 mb-6 "
          placeholder="Password"
          type="password"
        />

        <button
          disabled={loading}
          onClick={signup}
          className={`bg-black border-2 border-gray-800 hover:border-gray-500 hover:text-gray-700 text-gray-400 px-4 py-1 rounded-lg`}
        >
          {loading ? "Loading.." : "SignUp"}
        </button>
        <Link href={"/signin"} className="text-slate-600 hover:text-sm mt-5">
          Already have a account ? <span className="text-gray-500">SignIn</span>
        </Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Page;
