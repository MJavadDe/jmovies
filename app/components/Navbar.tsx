import Link from 'next/link';
import Image from 'next/image';
function Navbar() {
    return (
        <nav className={`w-full`}>
        <ul className="container mx-auto p-2 flex items-center justify-between">
          <li>
            <Link href={"/"}>
              <Image src={'/logos/icon2.png'} alt='website logo' width={60} height={60} priority />
            </Link>
          </li>
          <li>
            <ul className='flex items-center gap-5'>
              <li>
                <Link className='text-white' href={"/api/auth/signin"}>Sign in</Link>
              </li>
              <li>
                <Link href={"/api/auth/signup"} className='btn bg-white text-black hover:text-gray-400 rounded-3xl'>Join JMovies</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    )
}

export default Navbar
