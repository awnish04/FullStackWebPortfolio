"use client";

import { login } from "@/lib/actions/auth";

export function LoginForm() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md w-full max-w-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-black">
          Admin Dashboard Login
        </h1>
        <form action={login}>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Sign in with GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
