import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-900 p-8 sm:p-20 font-[var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl font-bold text-slate-700">Welcome!</h1>
        <p className="text-slate-500 text-lg">Get started by signing in or creating an account.</p>
        <div className="flex gap-6">
          <Link
            href="/signin"
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
