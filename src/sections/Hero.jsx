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
        <h1 className="text-[68px] tracking-widest font-extrabold">{title}</h1>
        <p className="font-medium text-[24px] tracking-widest ml-48">
          {description}
        </p>
      </div>
    </section>
  );
}
export default Hero;
