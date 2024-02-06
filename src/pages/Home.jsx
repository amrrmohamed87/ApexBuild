import heroImage from "../assets/hero.jpg";
import aboutImage from "../assets/about.png";

import Hero from "../sections/Hero";
function Home() {
  return (
    <main>
      <Hero
        src={heroImage}
        title="ApexBuild"
        description="Is a comprehensive software solution that has the potential to catalyze
      transformation within the construction industry."
      />
      <section className="md:h-screen md:mt-48">
        <h1 className="text-white text-2xl font-bold ml-4 mt-16 md:text-center md:text-[45px] md:mt-24">
          What's ApexBuild
        </h1>
        <div className="flex flex-col justify-center items-center md:flex-row md:gap-6">
          <p className="text-white p-4 md:w-1/2 md:text-[25px]">
            Imagine a world where constructor companies can seamlessly
            collaborate and exchange products with each other, all while having
            the assurance of legal contracts and a user-friendly interface. This
            vision is now a reality with our groundbreaking software system
            APexBuild. By facilitating smooth transactions and fostering a
            stronger community of constructors, we are revolutionizing the
            performance in this field.
          </p>
          <img src={aboutImage} className="w-[300px] md:w-[500px]" />
        </div>
      </section>
      <section>
        <h1 className="text-white">Get in touch</h1>
      </section>
    </main>
  );
}

export default Home;
