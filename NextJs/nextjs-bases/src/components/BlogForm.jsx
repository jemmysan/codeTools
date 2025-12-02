"use client"

import { useActionState } from "react";


export default function BlogForm({ handler, post }) {

const [state, action, isPending] = useActionState(handler, undefined);

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="postId" defaultValue={post?._id}/>
      <div>
        <label
          htmlFor="title"
          className="block text-sm/6 font-medium text-blue-950"
        >
          Title
        </label>
        <div>
          <input defaultValue={ state?.title || post?.title }
            id="title"
            // type="title"
            name="title"
            autoComplete="title"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-blue-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 ring-1 ring-blue-950"
          />
          {state?.errors?.title && (
                <p className="text-red-500 text-sm py-1">
                  {state.errors.title}
                </p>
              )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="content"
            className="block text-sm/6 font-medium text-blue-950"
          >
            Content
          </label>
        </div>
        <div className="">
          <div className="mt-2">
            <textarea defaultValue={ state?.content || post?.content }
              id="content"
              name="content"
              rows="4"
              className="ring-1 rounded-xl ring-blue-950 block w-full  bg-white/5 px-3 py-1.5 text-base text-blue-950 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            ></textarea>
             {state?.errors?.content && (
                <p className="text-red-500 text-sm py-1">
                  {state.errors.content}
                </p>
              )}
          </div>
        </div>
      </div>

      <div className="flex items-enter justify-end ">
        <button disabled={isPending}
          type="submit"
          className="flex w-40 justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
         {isPending ? 'Loading...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
