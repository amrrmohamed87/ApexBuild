import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    company: "",
    address: "",
  });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [errorAddingUser, setErrorAddingUser] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setIsAddingUser(true);

    try {
      const response = await fetch(
        "https://apex-build.onrender.com/api/v1/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        const errorMessage = "Failed to create user";
        console.log(errorMessage);
        toast.error(errorMessage);
        setIsAddingUser(false);
        return;
      }

      toast.success("User Created Successfully");
      setIsAddingUser(false);
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        company: "",
        address: "",
      });
    } catch (error) {
      setErrorAddingUser(error);
      toast.error("Unexpected error.");
      setIsAddingUser(false);
    }
  };
  return (
    <main>
      <ToastContainer />
      <section className="mb-8">
        <h1 className="mt-20 text-center md:text-start md:ml-[21rem] md:text-[35px] md:mt-8 text-white">
          Dashboard
        </h1>
      </section>

      <section className="flex justify-center md:justify-start md:ml-[21rem] md:mb-8">
        <Tabs defaultValue="addUser" className="w-[400px] md:w-[700px]">
          <TabsList className="grid w-full grid-cols-4 p-2">
            <TabsTrigger value="addUser">Add users</TabsTrigger>
            <TabsTrigger value="password">Material</TabsTrigger>
            <TabsTrigger value="password">Transfer</TabsTrigger>
            <TabsTrigger value="password">Charts</TabsTrigger>
          </TabsList>
          <form method="post" onSubmit={handleCreateUser}>
            <TabsContent value="addUser">
              <Card className="bg-black">
                <CardHeader>
                  <CardTitle className="text-[#40E0D0]">Create User</CardTitle>
                  <CardDescription className="text-white">
                    Add new users here, Click save when you're done
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1 flex flex-col gap-1 mb-4">
                    <label htmlFor="firstName" className="text-[#40E0D0]">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={user.firstName}
                      onChange={handleChange}
                      required
                      className="bg-black text-white border-2 border-gray-500 p-2 rounded"
                    />
                  </div>
                  <div className="space-y-1 flex flex-col gap-1 mb-4">
                    <label htmlFor="lastName" className="text-[#40E0D0]">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={user.lastName}
                      onChange={handleChange}
                      required
                      className="bg-black text-white border-2 border-gray-500 p-2 rounded"
                    />
                  </div>
                  <div className="space-y-1 flex flex-col gap-1 mb-4">
                    <label htmlFor="email" className="text-[#40E0D0]">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={handleChange}
                      required
                      className="bg-black text-white border-2 border-gray-500 p-2 rounded"
                    />
                  </div>
                  <div className="space-y-1 flex flex-col gap-1 mb-4">
                    <label htmlFor="password" className="text-[#40E0D0]">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={user.password}
                      onChange={handleChange}
                      required
                      className="bg-black text-white border-2 border-gray-500 p-2 rounded"
                    />
                  </div>
                  <div className="space-y-1 flex flex-col gap-1 mb-4">
                    <label htmlFor="company" className="text-[#40E0D0]">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Enter your company"
                      value={user.company}
                      onChange={handleChange}
                      required
                      className="bg-black text-white border-2 border-gray-500 p-2 rounded"
                    />
                  </div>
                  <div className="space-y-1 flex flex-col gap-1 mb-4">
                    <label htmlFor="address" className="text-[#40E0D0]">
                      address
                    </label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      value={user.address}
                      onChange={handleChange}
                      required
                      className="bg-black text-white border-2 border-gray-500 p-2 rounded"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <button
                    type="submit"
                    disabled={isAddingUser}
                    className="bg-black px-4 py-2 rounded text-[#40E0D0] hover:bg-[#40E0D0] hover:text-white transition-all duration-300"
                  >
                    {isAddingUser ? "Creating..." : "Create user"}
                  </button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </section>
    </main>
  );
}

export default Dashboard;
