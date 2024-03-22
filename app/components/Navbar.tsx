import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
async function Navbar() {
  const session = await getServerSession();
  

  const user = session && await prisma?.user.findUnique({where:{email:session?.user!.email!}})  
  

  return (
    <nav className={`w-full`}>
      <ul className="container mx-auto p-2 flex items-center justify-between">
        <li>
          <Link href={"/"}>
            <Image
              src={"/logos/icon2.png"}
              alt="website logo"
              width={60}
              height={60}
              priority
            />
          </Link>
        </li>
        <li>
          <ul className="flex items-center gap-5">
            {!user ? (
              <>
                <li>
                  <Link className="text-white" href={"/auth"}>
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/auth/signup"}
                    className="btn bg-white text-black hover:text-gray-400 rounded-3xl"
                  >
                    Join JMovies
                  </Link>
                </li>
              </>
            ) : (
                <>
                   <li className="dropdown dropdown-end">
                <div
                  title="something"
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                        <Image alt="Profile Pic" width={64} height={64} src={"https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={"/home/dashboard"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                  <Link href={"/api/auth/signout"}>
                      Logout
                    </Link>
                  </li>
                </ul>
                  </li>
                  <li>
                    {user?.username ?? user?.firstName}
                  </li>
                </>
             
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
