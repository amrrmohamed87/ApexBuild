function Icon({ children, title }) {
  return (
    <div className="flex justify-start items-center ml-4 mb-4 mt-2">
      {children}
      <p className="ml-2 text-white font-thin hover:font-bold cursor-pointer">
        {title}
      </p>
    </div>
  );
}

export default Icon;
