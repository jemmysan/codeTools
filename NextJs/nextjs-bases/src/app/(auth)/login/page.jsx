"use client";
import { login } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
  const [state, action, isPending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8 ring-1 ring-blue-950 w-100 rounded-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-blue-950">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={action}  className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-blue-950"
            >
              login
            </label>
            <div>
              <input
                defaultValue={state?.email}
                id="email"
                // type="email"
                name="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-blue-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 ring-1 ring-blue-950"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-sm py-1">
                  {state.errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-blue-950"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-blue-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 ring-1 ring-blue-950"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-sm py-1">
                  {state.errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={isPending}
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isPending ? "loading..." : "login"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          I have not an account
          <Link
            href="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 pl-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
