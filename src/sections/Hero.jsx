import { NavLink } from "react-router-dom";

function Hero({ src, title, description, id }) {
  return (
    <section className="relative" id={id}>
      <img
        src={src}
        className="object-cover object-center w-full h-[895px] md:h-[700px]"
      />
      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
        }}
      ></div> */}
      {/*       <div className="absolute inset-0 bg-black bg-opacity-20"></div>
       */}{" "}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white md:ml-[24rem] md:w-1/2 mt-40">
        <h1 className="text-[35px] md:text-[68px] tracking-widest font-extrabold">
          {title}
        </h1>
        <p className="font-medium text-[14px] ml-4 md:text-[24px] tracking-widest">
          {description}
        </p>
        <div className="absolute mt-28 flex justify-center items-center">
          <NavLink to="/login">
            <button
              style={{
                background:
                  "linear-gradient(to right, rgba(99, 102, 241, 1), rgba(168, 85, 247, 0.7), rgba(236, 72, 153, 0.8))",
              }}
              className="px-12 py-2 rounded-lg"
            >
              Sign in
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
export default Hero;
