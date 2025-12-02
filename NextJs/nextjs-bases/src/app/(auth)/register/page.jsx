"use client";
import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Register() {
  const [state, action, isPending] = useActionState(register, undefined);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ring-1 ring-blue-950 w-100 rounded-2xl gap-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-blue-950">
          Register
        </h2>
      </div>

      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={action} className="flex flex-col gap-3 ">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-blue-950"
            >
              Email address
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

          <div className="flex items-center justify-between flex-1">
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
                  htmlForgot password?
                </a>
              </div> */}
          </div>
          <div className="">
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-blue-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 ring-1 ring-blue-950"
            />

            {state?.errors?.email && (
              <div className="text-red-500 text-sm py-1">
                <p>Password must : </p>
                <ul className="list-disc list-inside ml-4">
                  {state.errors.password.map((err) => (
                    <li key={err}> {err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="">
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-blue-950"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="current-password"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-blue-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 ring-1 ring-blue-950"
            />

            {state?.errors?.confirmPassword && (
              <p className="text-red-500 text-sm py-1">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <button
              disabled={isPending}
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {isPending ? "Loading..." : "Register"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          I have an account
          <Link
            href="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300 pl-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
