// app/page.tsx
"use client";

import { login } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md max-w-sm w-full">
        <h1 className="mb-6 text-2xl font-bold text-center">Admin Dashboard</h1>
        <button
          onClick={() => login()}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
