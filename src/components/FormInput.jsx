function FormInput({ label, ...props }) {
  return (
    <div className="flex justify-between items-center">
      <label className="relative cursor-pointer">
        <input
          {...props}
          className="h-[3rem] w-40 px-6 text-xl text-white bg-[#151515] border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        />
        <span className="text-lg text-white text-opacity-80 bg-[#151515] absolute left-5 top-2 transition duration-200 input">
          {label}
        </span>
      </label>
    </div>
  );
}

export default FormInput;
