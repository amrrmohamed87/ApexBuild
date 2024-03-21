import Hero from "../sections/Hero";
import Footer from "../components/Footer.jsx";
import Icon from "../components/Icons.jsx";
import ContactForm from "../components/ContactForm.jsx";

//import { services } from "../constants/data.jsx";

import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import { BiTransferAlt } from "react-icons/bi";

import heroImage from "../assets/homeHero.jpg";
import aboutImage from "../assets/about.jpg";
import Navbar from "@/components/Navbar";
import { features } from "@/constants/data";

function Home() {
  return (
    <main className="bg-black">
      <style>
        {`
          .text-gradient {
            background: linear-gradient(to right, #6366F1, #A855F7, #EC4899);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
          }
        `}
      </style>
      <Navbar />
      <Hero
        id="home"
        src={heroImage}
        title="ConstructMeta"
        description="Where Vision Meets Precision"
      />
      <section id="features">
        {/* <div className="sm:flex sm:flex-row sm:mt-4">
          {services.map((service) => (
            <div
              key={service.src}
              className="hover:bg-[#2a2a2c] hover:animate-pulse hover:cursor-pointer shadow-2xl w-[320px] h-[320px] rounded-xl mx-16 my-12 flex flex-col justify-center items-center
               sm:h-[240px] sm:p-4 sm:mx-12 sm:mt-16 sm:mb-0"
            >
              <img src={service.src} className="rounded-xl mt-8 mb-3" />
              <h3 className="text-white mb-6">{service.label}</h3>
            </div>
          ))}
        </div> */}
        <h1 className="text-gradient text-center text-[35px] md:text-[55px] font-bold tracking-widest text-[#40E0D0] mt-12">
          Our Features
        </h1>

        <div className="sm:flex sm:flex-row sm:mt-4">
          {features.map((feature) => (
            <div key={feature.src} className="p-4 md:p-8">
              <img src={feature.src} className="w-[50px] mt-8 mb-3" />
              <h2 className="text-gradient mb-2">{feature.title}</h2>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="services">Services</section>
      <section className="md:h-screen md:mt-40" id="about-us">
        <h1 className="text-2xl text-gradient tracking-widest font-bold ml-4 mt-16 md:text-center md:text-[45px] md:mt-24 md:mb-24">
          What's ConstructMeta
        </h1>
        <div className="flex flex-col justify-center items-center md:flex-row md:gap-6">
          <p className="text-white tracking-wider p-4 md:w-1/2 md:text-[25px]">
            Our Formwork Material Management System provides a comprehensive
            solution for accurate material allocation, real-time tracking, and
            comprehensive cost control, revolutionising construction operations.
            This scalable platform is designed to optimise efficiency, cut
            costs, and improve communication across projects. Its solid security
            features and intuitive interface make it an invaluable tool for
            modern construction management.
          </p>
          <img src={aboutImage} className="w-[350px] md:w-[550px]" />
        </div>
      </section>
      <section className="md:h-screen mt-12 mb-12 md:mb-0" id="contact-us">
        <div className="md:flex md:justify-between md:items-center md:gap-16">
          <div className="md:mr-16 md:ml-20">
            <h1 className="text-gradient text-2xl font-bold ml-4 md:text-[45px] md:mb-8">
              Get in touch
            </h1>
            <hr className="w-1/2 ml-4 md:w-full" />
            <p className="p-4 text-white md:mb-4 font-medium">
              Ready to transform your construction projects with ConstructMeta?
              Reach out to us today and let's build the future together!
            </p>
            <Icon title="+(20)-1028971276">
              <FaPhoneAlt size={20} className="text-gradient" />
            </Icon>
            <Icon title="Cairo, Egypt">
              <CiLocationArrow1 size={20} className="text-gradient" />
            </Icon>
            <Icon title="apexbuild@gmail.com">
              <MdOutlineAttachEmail size={20} className="text-gradient" />
            </Icon>
          </div>
          <div className="mx-2 md:mr-24 shadow-2xl bg-black h-[530px] rounded md:h-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Home;
