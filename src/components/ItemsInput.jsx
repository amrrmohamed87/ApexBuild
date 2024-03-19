function ItemsInput({ id, label, ...props }) {
  return (
    <div className="flex flex-col justify-center items-start mb-4">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        required
        className="w-full h-[30px] md:h-[40px] rounded-md border-2 border-gray-400 focus:border-blue-500 pl-2"
      />
    </div>
  );
}

export default ItemsInput;
