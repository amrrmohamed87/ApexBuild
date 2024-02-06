import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  let title = "An error occured.";
  let message = "Something went wrong!";

  if (error.status === 404) {
    message = "Invaild URL, please try again.";
  }

  return (
    <div className="flex flex-col justify-center items-center mt-40 text-white md:mt-20">
      <h1 className="font-medium text-2xl mb-2">{title}</h1>
      <p className="font-thin text-lg mb-4">{message}</p>
      <button className="bg-white text-[#151515] font-medium px-4 py-2 rounded-3xl hover:bg-black hover:text-white">
        <Link to=".." relative="path">
          Go Back
        </Link>
      </button>
    </div>
  );
}

export default Error;
