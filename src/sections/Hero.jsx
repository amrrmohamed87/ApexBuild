function Hero({ src, title, description, id }) {
  return (
    <section className="relative" id={id}>
      <img
        src={src}
        className="object-cover object-center w-full h-[895px] md:h-[700px]"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="absolute inset-2 flex flex-col justify-center items-start text-white md:ml-8 md:w-1/2">
        <h1 className="text-[68px] font-extrabold">{title}</h1>
        <p className="font-medium text-[24px]">{description}</p>
      </div>
    </section>
  );
}
export default Hero;
