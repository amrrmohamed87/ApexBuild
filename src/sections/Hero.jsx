import { NavLink } from "react-router-dom";

function Hero({ src, title, description, id }) {
  return (
    <section className="relative" id={id}>
      <img
        src={src}
        className="object-cover object-center w-full h-[895px] md:h-[700px]"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="absolute inset-2 flex flex-col justify-center items-start text-white md:ml-8 md:w-1/2">
        <h1 className="text-[35px] md:text-[68px] tracking-widest font-extrabold">
          {title}
        </h1>
        <p className="font-medium text-[14px] ml-4 md:text-[24px] tracking-widest md:ml-48">
          {description}
        </p>
        <div className="absolute mt-40 flex justify-center items-center">
          <button
            style={{
              background:
                "linear-gradient(to right, rgba(99, 102, 241, 1), rgba(168, 85, 247, 0.7), rgba(236, 72, 153, 0.8))",
            }}
            className="px-6 py-2 rounded-lg"
          >
            <NavLink to="/login">Sign in</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
}
export default Hero;
