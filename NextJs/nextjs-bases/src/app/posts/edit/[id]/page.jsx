import { updatePost } from "@/actions/posts";
import BlogForm from "@/components/BlogForm";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Edit({ params }) {
  const { id } = await params;

  // Get the auth user from DB
  const user = await getAuthUser();

  // Get the current post from DB
  const postsCollection = await getCollection("posts");
  let post;
  if (id.length === 24 && postsCollection) {
    post = await postsCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    post = JSON.parse(JSON.stringify(post));
    if(user.userId !== post.userId) return redirect("/")
  } else {
    post = null 
  }

  console.log(post);

  return (
    <div className="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8 ring-1 ring-blue-950 w-100 rounded-2xl">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-blue-950">
            Edit Post
          </h2>
        </div>
        {post ? (
          <BlogForm handler={updatePost} post={post} />
        ) : (
          <p>Failed to fetch the data</p>
        )}
      </div>
    </div>
  );
}
