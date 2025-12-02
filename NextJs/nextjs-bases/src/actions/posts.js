"use server"
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogFormSchema } from "@/lib/rules"
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";



export async function createPost(state, formData) {

    // Check is user is signed in
    const user = await getAuthUser();
    if (!user) return redirect('/');


    // Validate form fields 
    const title = formData.get("title");
    const content = formData.get('content')

    const validatedFields = BlogFormSchema.safeParse({ title, content });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            title,
            content
        }
    }

    // Save new post in DB
    try {
        const postsCollection = await getCollection('posts')
        const post = {
            title: validatedFields.data.title,
            content: validatedFields.data.content,
            userId: ObjectId.createFromHexString(user.userId)
        }
        await postsCollection.insertOne(post)
    } catch (error) {
        return {
            errors: { title: error.message }
        }
    }

    redirect('/home')
}


export async function updatePost(state, formData) {

    // Check is user is signed in
    const user = await getAuthUser();
    if (!user) return redirect('/dashboard');

    // Validate form fields 
    const title = formData.get("title");
    const content = formData.get('content');
    const postId = formData.get("postId");

    const validatedFields = BlogFormSchema.safeParse({ title, content });

    // If any form fields are invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            title,
            content
        }
    }

    // Find the post 
    const postsCollection = await getCollection("posts");
    const post = await postsCollection.findOne({ _id: ObjectId.createFromHexString(postId) })

    // Check if user own the post
    if (user.userId !== post.userId.toString()) return redirect("/")

    // Update the post in DB
    postsCollection.findOneAndUpdate({
        _id: post._id
    }, {
        $set: {
            title: validatedFields.data.title,
            content: validatedFields.data.content
        }
    }
    )


    redirect('/dashboard')
}


export async function deletePost(formData) {

    // Check is user is signed in
    const user = await getAuthUser();
    if (!user) return redirect('/dashboard');

    // Get posts collection
    const postsCollection = await getCollection("posts");
    // Find the post 
    const post = await postsCollection.findOne({ 
        _id: ObjectId.createFromHexString(formData.get("postId")) 
    });

    // Check if user own the post
    if (user.userId !== post.userId.toString()) return redirect("/")

    // Update the post in DB
    postsCollection.findOneAndDelete({ _id: post._id })

    revalidatePath("/dashboard")
}