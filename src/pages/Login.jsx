import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import loginImage from "../assets/login.jpg";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLogin(true);

    try {
      const response = await fetch(
        "https://apex-build.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const resData = await response.json();
      const token = resData.token;
      const name = resData.user.firstName;
      const email = resData.user.email;
      const company = resData.user.company;
      const avatar = resData.user.profilePic;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("company", company);
      localStorage.setItem("avatar", avatar);

      if (!response.ok) {
        const errorMessage = resData.message;
        setError(errorMessage);
        setIsLogin(false);
        return;
      }

      setIsLogin(false);
      return navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      setIsLogin(false);
    }
  };

  return (
    <section className="bg-black h-screen flex">
      <img
        src={loginImage}
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />

      <div className="p-4 pt-[50%] w-full md:w-1/2 md:pt-0 md:mx-[11%] md:my-[11%]">
        <Card className="bg-black min-w-[300px] max-w-[400px] shadow-2xl border-gray-500">
          <form method="post" onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="text-blue-500">Login</CardTitle>
              <CardDescription>
                To use ApexBuild, please enter your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 mb-4">
              <div className="space-y-1 flex flex-col justify-center items-start mb-6">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="p-2 w-full text-white bg-black border-2 border-gray-500 focus:border-2 focus:border-blue-500 rounded-lg"
                />
              </div>
              <div className="space-y-1 flex flex-col justify-center items-start">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="p-2 w-full text-white bg-black border-2 border-gray-500 focus:border-blue-500 rounded-lg"
                />
              </div>
              {error && <p className="text-center text-red-500">{error}</p>}
            </CardContent>
            <CardFooter>
              <button
                disabled={isLogin}
                type="submit"
                className="w-[100px] bg-black text-white py-2 px-1 rounded-lg border-2 border-grey-500 hover:bg-blue-500 hover:border-none transition-all duration-500"
              >
                {isLogin ? "loading..." : "Login"}
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  );
}

export default Login;
