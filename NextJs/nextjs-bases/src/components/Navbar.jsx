import getAuthUser from "@/lib/getAuthUser";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth";

export default async function NavBar() {
  const authUser = await getAuthUser();
  return (
    <nav className="relative bg-blue-950 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between w-full">
            {authUser ? (
              <>
              <div className="flex space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/posts/create">New Post</NavLink>
              </div>
              
               <form action={logout} className="flex space-x-4">
                <button type='submit' className="rounded-md px-3 py-2 text-sm font-medium bg-blue-900 text-gray-200 hover:bg-white hover:text-blue-950"  href="/">Logout</button>
              </form>
              </>
            ) : (
              <div className="flex space-x-4">
                <NavLink href="/register">Register</NavLink>
                <NavLink href="/login">Login</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
