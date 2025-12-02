import { createPost } from "@/actions/posts";
import BlogForm from "@/components/BlogForm";

export default function Post() {
  return (
    <div className="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8 ring-1 ring-blue-950 w-100 rounded-2xl">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-blue-950">
              New Post
            </h2>
          </div>
        <BlogForm handler={createPost}/>
      </div>
    </div>
  );
}
