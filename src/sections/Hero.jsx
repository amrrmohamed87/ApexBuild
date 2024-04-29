import { NavLink } from "react-router-dom";

function Hero({ src, title, subTitle, description, id }) {
  return (
    <>
      <style>
        {`
          .text-gradient {
            background: linear-gradient(to right, #ff06b3, #e3059f, #7402d1, #024abd);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-fill-color: transparent;
          }
        `}
      </style>
      <section className="relative" id={id}>
        <img
          src={src}
          className="object-cover object-center w-full h-[895px] md:h-[730px]"
        />
        {/* <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
        }}
      ></div> */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1
            className="text-[35px] md:text-[31px] tracking-widest uppercase font-yourFont
          "
          >
            {title}
            <span className="text-gradient"> {subTitle}</span>
          </h1>
          <p className="font-medium text-[14px] ml-4 md:text-[15px] uppercase font-yourFont tracking-widest mt-2">
            {description}
          </p>
          <div className="absolute mt-60 flex justify-center items-center">
            <NavLink to="/login">
              <button
                style={{
                  background:
                    "linear-gradient(to right, rgba(255, 6, 179, 0.6), rgba(227, 5, 159, 0.6), rgba(116, 2, 209, 0.6), rgba(2, 74, 189, 0.6))",
                }}
                className="px-6 py-3 text-[20px] tracking-widest rounded-lg hover:-translate-y-1 transition-all duration-300"
              >
                GET STARTED
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;
