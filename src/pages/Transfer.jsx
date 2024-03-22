import React, { useState, useEffect } from "react";
// Make sure this import path matches your actual data structure
import { itemConditions } from "../constants/data.jsx";
/* import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"; */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Transfer() {
  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({
    itemDescription: "",
    itemId: "",
    itemCondition: "",
    quantity: "",
    driverName: "",
    transferDate: "",
    fromProject: "",
    fromProjectId: "",
    toProject: "",
    toProjectId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState("");

  //toast
  //const { toast } = useToast();

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

        setItems(resData.data);
      } catch (error) {
        setAddError(error.message || "Could not fetch items.");
      } finally {
        setIsLoading(false);
      }
    }
    loadItems();
  }, []);

  useEffect(() => {
    async function loadProjects() {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/projects"
        );
        if (!response.ok) {
          throw new Error("Could not fetch projects.");
        }
        const resData = await response.json();
        setProjects(resData.data);
      } catch (error) {
        setAddError(error.message || "Could not fetch projects.");
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "itemDescription" && value) {
      const selectedItem = items.find((item) => item.itemDescription === value);
      setOrderData((prev) => ({
        ...prev,
        itemId: selectedItem ? selectedItem._id : "",
        //fromProjectId: selectedSource ? selectedSource._id : "",
        //toProjectId: selectedDestination ? selectedDestination._id : "",
        [name]: value,
      }));
      console.log(
        `Selected Item ID: ${
          selectedItem ? selectedItem._id : "N/A"
        }, Description: ${value} `
      );
    } else if (name === "fromProject" && value) {
      const selectedSource = projects.find((item) => item.name === value);
      setOrderData((prev) => ({
        ...prev,
        fromProjectId: selectedSource ? selectedSource._id : "",
        [name]: value,
      }));
      console.log(
        `Selected From ID: ${
          selectedSource ? selectedSource._id : "N/A"
        }, Description: ${value} `
      );
    } else if (name === "toProject" && value) {
      const selectedDestination = projects.find((item) => item.name === value);
      setOrderData((prev) => ({
        ...prev,
        toProjectId: selectedDestination ? selectedDestination._id : "",
        [name]: value,
      }));
      console.log(
        `Selected From ID: ${
          selectedDestination ? selectedDestination._id : "N/A"
        }, Description: ${value} `
      );
    } else {
      setOrderData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(orderData);
  }

  function handleAddOrder(event) {
    event.preventDefault();
    if (!orderData.itemDescription || orderData.quantity <= 0) {
      setAddError("Please select an item and specify a valid quantity.");
      return;
    }
    setOrders((prev) => [...prev, orderData]);
    console.log(orders);

    // Optionally reset form here
  }

  function handleDeleteOrder(orderToDelete) {
    setOrders((prevOrders) =>
      prevOrders.filter((_, index) => index !== orderToDelete)
    );
  }

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    setIsConfirming(true);

    const data = {
      itemDescription: orderData.itemId,
      quantity: orderData.quantity,
      itemCondition: orderData.itemCondition,
      transferDate: orderData.transferDate,
      driverName: orderData.driverName,
      fromProject: orderData.fromProjectId,
      toProject: orderData.toProjectId,
    };

    try {
      const response = await fetch(
        "https://apex-build.onrender.com/api/v1/transfer-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      /*  if (!response.ok) {
        throw new Error("Failed to send data");
      } */
      /* if (!response.ok) {
        return response.message;
      } */

      const responseBody = await response.json();

      if (!response.ok) {
        const errorMessage = responseBody.message || "Failed to send data";
        toast.error(errorMessage);
        setIsConfirming(false);
        return;
      }

      toast.success("Transfer Successful!");

      setIsConfirming(false);

      setOrderData({
        itemDescription: "",
        itemId: "",
        itemCondition: "",
        quantity: "",
        driverName: "",
        transferDate: "",
        fromProject: "",
        toProject: "",
      });
      setOrders([]);
    } catch (error) {
      console.log(error);
      toast.error("Un expected error occurred");
      setIsConfirming(false);
      setOrderData({
        itemDescription: "",
        itemId: "",
        itemCondition: "",
        quantity: "",
        driverName: "",
        transferDate: "",
        fromProject: "",
        toProject: "",
      });
    }
  };

  return (
    <main>
      {/* Static content or headers */}
      <section className="mb-8 sm:mb-8">
        <div className="mt-16 flex flex-col ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[45%]">
          <h1 className="text-black font-semibold sm:text-[35px]">
            Transfer Your Order Now
          </h1>
          <hr className="w-[40px]" />
        </div>
      </section>

      {addError && <p className="text-red-500 text-center">{addError}</p>}

      <section>
        <form className="flex flex-col justify-center items-start md:flex-row">
          <div className="bg-white shadow-2xl rounded-[10px] p-4 m-4 md:ml-24">
            <h1 className="text-center font-bold text-gray-950">
              Formwork & Scaffolding Transfer
            </h1>
            <h2 className="text-gray-950 font-bold mb-2 mt-4">Item Details:</h2>
            <div className="flex flex-col justify-start items-start mb-4">
              <label htmlFor="itemDescription" className="text-gray-950 mb-2">
                Item Description:
              </label>
              {isLoading ? (
                <p className="text-lg text-blue-500">Loading...</p>
              ) : (
                <select
                  id="itemDescription"
                  name="itemDescription"
                  onChange={handleChange}
                  value={orderData.itemId}
                  className="w-full h-6 rounded-[10px] pl-2 border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                  disabled={isLoading}
                >
                  <option value="">Select Item...</option>
                  {items.map((item, index) => (
                    <option key={index} value={item.itemDescription}>
                      {item.itemDescription}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="itemCondition" className="text-gray-950 mb-2">
                  Item Condition
                </label>
                {itemConditions.length > 0 && (
                  <select
                    id="itemCondition"
                    name="itemCondition"
                    value={orderData.itemCondition}
                    onChange={handleChange}
                    required
                    className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                  >
                    {itemConditions.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.condition}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="quantity" className="text-gray-950 mb-2">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={orderData.quantity}
                  onChange={handleChange}
                  required
                  className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                />
              </div>
            </div>
            <h2 className="text-gray-950 font-bold mb-2 mt-4">
              Transfer Details:
            </h2>
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="driverName" className="text-gray-950 mb-2">
                  Driver Name
                </label>
                <input
                  id="driverName"
                  name="driverName"
                  value={orderData.driverName}
                  onChange={handleChange}
                  type="text"
                  required
                  className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="transferDate" className="text-gray-950 mb-2">
                  Transfer Date
                </label>
                <input
                  id="transferDate"
                  name="transferDate"
                  type="date"
                  value={orderData.transferDate}
                  onChange={handleChange}
                  required
                  className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                />
              </div>
            </div>
            <h2 className="text-gray-950 font-bold mb-2 mt-4">Projects:</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="fromProject" className="text-gray-950 mb-2">
                  From
                </label>
                {projects.length > 0 && (
                  <select
                    id="fromProject"
                    name="fromProject"
                    value={orderData.fromProject}
                    onChange={handleChange}
                    required
                    className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                  >
                    <option value="">Source...</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="toProject" className="text-gray-950 mb-2">
                  To
                </label>
                {projects.length > 0 && (
                  <select
                    id="toProject"
                    name="toProject"
                    value={orderData.toProject}
                    onChange={handleChange}
                    required
                    className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-8"
                  >
                    <option value="">Destination...</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white shadow-2xl rounded-[10px] p-4 m-4">
            <h1 className="text-center text-gray-950 font-bold">
              Confirm Your Order
            </h1>
            <div>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">
                  Item Description:{" "}
                </span>
                {orderData.itemDescription}
              </h1>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">
                  Item Condition:{" "}
                </span>
                {orderData.itemCondition}
              </h1>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">Quantity: </span>
                {orderData.quantity}
              </h1>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">Driver name: </span>
                {orderData.driverName}
              </h1>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">Transfer Date: </span>
                {orderData.transferDate}
              </h1>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">Source: </span>
                {orderData.fromProject}
              </h1>
              <h1 className="text-gray-950 mb-2">
                <span className="text-gray-950 font-bold">Destination: </span>
                {orderData.toProject}
              </h1>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleAddOrder}
                className="bg-[#1e293b] rounded-[10px] text-white py-1 px-8 hover:bg-[#0f172a] hover:font-semibold"
              >
                Add Item
              </button>
            </div>
          </div>

          {/* Other fields like driverName, transferDate, fromProject, and toProject can be added similarly */}
        </form>
      </section>

      {orders.length > 0 && (
        <section className="mt-8 mb-2">
          <form
            onSubmit={handleConfirmOrder}
            method="post"
            className="flex flex-col justify-center items-start md:flex-row ml-0 md:ml-40"
          >
            <div className="bg-white shadow-2xl rounded-[10px] p-4 m-4 sm:p-8 sm:m-8">
              <h2 className="text-gray-950 font-bold text-center text-lg mb-4">
                Added Orders
              </h2>
              <div className="flex flex-col  md:grid md:grid-flow-row md:grid-cols-3 md:place-content-center">
                {orders.map((order, index) => (
                  <div key={index} className="text-white mb-6">
                    <p className="mb-1 text-gray-950">
                      <span className="text-gray-950 font-bold">
                        Item Description:{" "}
                      </span>
                      {order.itemDescription}
                    </p>
                    <p className="text-gray-950">
                      <span className="text-gray-950 font-bold">
                        Quantity:{" "}
                      </span>
                      {order.quantity}
                    </p>
                    <div className="flex justify-start items-center gap-4 mt-3">
                      <button
                        onClick={() => handleDeleteOrder(index)}
                        className="bg-red-700 rounded-[10px] text-white py-1 px-8 hover:bg-red-800 hover:font-semibold"
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  disabled={isConfirming}
                  className="bg-blue-700 rounded-[10px] text-white py-1 px-8 hover:bg-blue-800 hover:font-semibold"
                >
                  {isConfirming ? "Transferring..." : "Confirm"}
                </button>
              </div>
            </div>
          </form>
        </section>
      )}
      <ToastContainer />
    </main>
  );
}

export default Transfer;
