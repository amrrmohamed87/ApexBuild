import Icon from "../components/Icons.jsx";
import ContactForm from "../components/ContactForm.jsx";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";

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
      <section className="md:h-screen">
        <div className="md:flex md:justify-between md:items-center md:gap-16">
          <div className="md:mr-16 md:ml-20">
            <h1 className="text-white text-2xl font-bold ml-4 md:text-[45px] md:mb-8">
              Get in touch
            </h1>
            <hr className="w-1/2 ml-4 md:w-full" />
            <p className="p-4 text-white md:mb-4 font-medium">
              Ready to revolutionize your construction collaboration and
              streamline product exchange? Reach out to us today and discover
              how ApexBuild can elevate your business with its user-friendly
              interface and innovative features. Let's build success together –
              contact us now to get started!
            </p>
            <Icon title="+(20)-1028971276">
              <FaPhoneAlt size={20} className="text-gray-500" />
            </Icon>
            <Icon title="Cairo, Egypt">
              <CiLocationArrow1 size={20} className="text-gray-500" />
            </Icon>
            <Icon title="apexbuild@gmail.com">
              <MdOutlineAttachEmail size={20} className="text-gray-500" />
            </Icon>
          </div>
          <div className="mx-2 md:mr-24 shadow-2xl bg-[#2a2a2c] h-[530px] rounded md:h-auto">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
