import Link from "next/link";
import Navbar from "./components/Navbar";
import styles from "./landPage.module.css";
import { epilogue, inter } from "./layout";
import MainSection from "./components/MainSection";
function page() {
  return (
    <section className={`${styles.section} w-full h-screen ${inter.className} relative overflow-hidden`}>
      <Navbar />
      <article className={`flex flex-col w-full text-white ${epilogue.className} py-5`}>
        <div className="container mx-auto text-center">
          <div className="flex flex-col text-4xl font-semibold gap-4 p-3">
            <h3>
              Igniting Your Passion for Movies,
            </h3>
            <h3>
               Unleashing Wonder!
            </h3>
          </div>
          <p className="p-4">
            Welcome to <b>JMOVIES</b>, where the silver screen comes alive, offering a
            captivating web app <br /> experience that fuels your love for movies.
          </p>
          <Link href={"/home"} className="btn rounded-3xl text-white bg-teal-600">Discover JMovies</Link>
        </div>
      </article>
      <MainSection/>
    </section>
  );
}

export default page;
