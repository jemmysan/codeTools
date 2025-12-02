import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";


const protectedRoutes = ["/dashboard", "/posts/create"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req){
    const path = req.nexUrl.pathname;
    const isProtected = protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
    const isPublic = publicRoutes.includes(path);

    const user = await getAuthUser();
    const userId = user?.userId;

    if(isProtected && !userId){
        return NextResponse.redirect(new URL("/login", req.nexUrl));

    }

    if(isPublic && !userId){
        return NextResponse.redirect(new URL("/login", req.nexUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher :  [

    ]
}