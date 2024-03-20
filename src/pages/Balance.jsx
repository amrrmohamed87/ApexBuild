import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteSweep } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Balance() {
  //Storing items into itemDescription state
  const [itemDescription, setItemDescription] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addError, setAddError] = useState("");

  //Create Balances
  const [createBalance, setCreateBalance] = useState({
    itemDescription: "",
    itemId: "",
    good: "",
    maintenance: "",
    waste: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Show balances
  const [showBalances, setShowBalances] = useState([]);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);

  useEffect(() => {
    async function loadItems() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/item-description"
        );
        if (!response.ok) {
          throw new Error("Could not fetch items.");
        }
        const resData = await response.json();
        setItemDescription(resData.data);
      } catch (error) {
        setAddError(error.message || "Could not fetch items.");
      } finally {
        setIsLoading(false);
      }
    }
    loadItems();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "itemDescription" && value) {
      const selectedItem = itemDescription.find(
        (item) => item.itemDescription === value
      );

      setCreateBalance((prev) => ({
        ...prev,
        itemId: selectedItem ? selectedItem._id : "",
        [name]: value,
      }));
    } else {
      setCreateBalance((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleCreateBalance = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = {
      itemDescription: createBalance.itemId,
      good: parseInt(createBalance.good, 10),
      maintenance: parseInt(createBalance.maintenance, 10),
      waste: parseInt(createBalance.waste, 10),
    };
    console.log(data);

    try {
      const response = await fetch(
        "https://apex-build.onrender.com/api/v1/balance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        const errorMsg = resData.message || "Failed to create Balance";
        toast.error(errorMsg);
        setIsSubmitting(false);
        return;
      }

      toast.success("Created Successfully");
      setIsSubmitting(false);
      setCreateBalance({
        itemDescription: "",
        itemId: "",
        good: "",
        maintenance: "",
        waste: "",
      });
    } catch (error) {
      toast.error("Unexpected error occurred");
      setIsSubmitting(false);
      setCreateBalance({
        itemDescription: "",
        itemId: "",
        good: "",
        maintenance: "",
        waste: "",
      });
    }
  };

  //show balances
  useEffect(() => {
    async function LoadBalances() {
      setIsLoadingBalances(true);

      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/balance"
        );
        const resData = await response.json();
        console.log(resData);

        if (!response.ok) {
          const errorMessage = resData.message || "Could not fetch balances";
          toast.error(errorMessage);
          setIsLoadingBalances(false);
          return;
        }

        setShowBalances(resData.data);
        console.log(showBalances);
        setIsLoadingBalances(false);
      } catch (error) {
        toast.error("unexpected error");
        setIsLoadingBalances(false);
      }
    }
    LoadBalances();
  }, []);

  return (
    <main>
      <section className="mt-16 mb-8 sm:mb-8">
        <h1 className="text-white ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[25%] font-semibold sm:text-[35px]">
          Tracking Balances
        </h1>
      </section>

      {/* Creating Balances */}
      <section>
        <ToastContainer />
        <form
          method="post"
          onSubmit={handleCreateBalance}
          className="flex items-center justify-center md:mr-48"
        >
          <div className="m-4 max-w-[500px] bg-white p-4 rounded-md">
            <h1>Fill items</h1>
            <div className="flex flex-col justify-start items-start mb-4">
              <label htmlFor="itemDescription" className="text-black mb-2">
                Item Description:
              </label>
              {isLoading ? (
                <p className="text-lg text-blue-500">Loading...</p>
              ) : (
                <select
                  id="itemDescription"
                  name="itemDescription"
                  value={createBalance.itemDescription}
                  onChange={handleChange}
                  className="w-full h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-400 focus:border focus:border-blue-500 sm:h-8"
                  disabled={isLoading}
                >
                  <option value="">Select Item...</option>
                  {itemDescription.map((item, index) => (
                    <option key={index} value={item.itemDescription}>
                      {item.itemDescription}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <h1 className="my-4">Item Conditions:</h1>

            <div className="flex flex-col justify-start items-start">
              <label htmlFor="good" className="text-black mb-2">
                Good
              </label>
              <input
                id="good"
                name="good"
                type="number"
                value={createBalance.good}
                onChange={handleChange}
                required
                className="w-full h-6 rounded-[10px] pl-2 border-2 border-gray-400 outline-none focus:border focus:border-blue-500 sm:h-8"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="maintenance" className="text-black mb-2">
                Maintenance
              </label>
              <input
                id="maintenance"
                name="maintenance"
                type="number"
                value={createBalance.maintenance}
                onChange={handleChange}
                required
                className="w-full h-6 rounded-[10px] pl-2 border-2 border-gray-400 outline-none focus:border focus:border-blue-500 sm:h-8"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="waste" className="text-black mb-2">
                Waste
              </label>
              <input
                id="waste"
                name="waste"
                type="number"
                value={createBalance.waste}
                onChange={handleChange}
                required
                className="w-full h-6 rounded-[10px] pl-2 border-2 border-gray-400 outline-none focus:border focus:border-blue-500 sm:h-8"
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-500 px-8 py-2 rounded-md"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/*show balances */}
      {isLoadingBalances ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <section className="m-4">
          <Table className="w-[200px] md:w-[1000px] md:ml-80">
            <TableCaption>A list of your recent Balances.</TableCaption>
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead className="text-black md:w-[200px]">Items</TableHead>
                <TableHead className="text-black">Good QTY</TableHead>
                <TableHead className="text-black">Maintenance QTY</TableHead>
                <TableHead className="text-black">Waste QTY</TableHead>
                <TableHead className="text-black">Actual QTY</TableHead>
                <TableHead className="text-black">Total QTY</TableHead>
                <TableHead className="text-black">Update</TableHead>
                <TableHead className="text-black">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-slate-100">
              {showBalances.map((balance, index) => (
                <TableRow key={index} className="text-blue-900">
                  <TableCell>
                    {balance.itemDescription.itemDescription}
                  </TableCell>
                  <TableCell>{balance.good}</TableCell>
                  <TableCell>{balance.maintenance}</TableCell>
                  <TableCell>{balance.waste}</TableCell>
                  <TableCell>{balance.actQTY}</TableCell>
                  <TableCell>{balance.totQTY}</TableCell>
                  <TableCell>
                    <CiEdit size={20} className="text-blue-800" />
                  </TableCell>
                  <TableCell>
                    <MdDeleteSweep size={20} className="text-red-600" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </main>
  );
}

export default Balance;
