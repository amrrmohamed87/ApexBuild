import React, { useState, useEffect } from "react";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Request() {
  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const itemOptions = items.map((item) => ({
    label: item.itemDescription,
    value: item._id,
  }));

  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const projectOptions = projects.map((destination) => ({
    label: destination.name,
    value: destination._id,
  }));

  const [orderData, setOrderData] = useState({
    itemDescription: "",
    itemId: "",
    quantity: "",
    activity: "",
    toProject: "",
    toProjectId: "",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadItems() {
      setIsLoadingItems(true);
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/item-description"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message || "Failed to fetch items");
          setIsLoadingItems(false);
          return;
        }
        setItems(resData.data);
        setIsLoadingItems(false);
      } catch (error) {
        toast.error("Unexpected error occurred");
        setIsLoading(false);
      }
    }
    loadItems();
  }, []);

  useEffect(() => {
    async function loadProjects() {
      setIsLoadingProjects(true);
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/projects"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message || "Failed to Fetch Projects");
          setIsLoadingProjects(false);
          return;
        }

        setProjects(resData.data);
        setIsLoadingProjects(false);
      } catch (error) {
        toast.error("Unexpected error occurred");
        setIsLoadingProjects(false);
      }
    }
    loadProjects();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddRequest(event) {
    event.preventDefault();
    if (
      !orderData.itemDescription ||
      !orderData.quantity ||
      orderData.activity <= 0
    ) {
      toast.error("Please fill the unfilled Inputs!");
      return;
    }
    setOrders((prev) => [...prev, orderData]);
    console.log(orders);
  }

  console.log(orderData);
  return (
    <>
      <section className="mb-8 sm:mb-8">
        <div className="mt-16 flex flex-col ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[45%]">
          <h1 className="text-black font-semibold sm:text-[35px]">
            Request Orders
          </h1>
          <hr className="w-[283px] border-1 border-black" />
        </div>
      </section>

      <section>
        <form className="flex flex-col md:flex-row">
          <div className="flex flex-col p-6 bg-white shadow-md rounded-[5px] w-[450px] mx-auto md:ml-[17rem] mb-12">
            <h1 className="text-center text-gray-950 font-bold">
              Request your order
            </h1>
            <h2 className="text-gray-950 font-bold mb-2 mt-4">
              Order Details:
            </h2>
            {/* Item Description */}
            <div className="flex flex-col justify-start items-start mb-4">
              <label htmlFor="itemDescription" className="text-gray-950 mb-2">
                Item Description:
              </label>
              {isLoadingItems ? (
                <p className="text-lg text-blue-500">Loading...</p>
              ) : (
                <Select
                  options={itemOptions}
                  onChange={(selectedOption) => {
                    setOrderData((prev) => ({
                      ...prev,
                      itemDescription: selectedOption
                        ? selectedOption.label
                        : "",
                      itemId: selectedOption ? selectedOption.value : "",
                    }));
                  }}
                  value={itemOptions.find(
                    (option) => option.value === orderData.itemId
                  )}
                  isLoading={isLoadingItems}
                  isDisabled={isLoadingItems}
                  className="w-full"
                  isClearable
                />
              )}
            </div>

            {/* Activity  */}
            <div className="flex flex-col justify-start items-start mb-4">
              <label htmlFor="activity" className="text-gray-950 mb-2">
                Activity:
              </label>
              <textarea
                type="text"
                id="activity"
                name="activity"
                value={orderData.activity}
                onChange={handleChange}
                className="w-full pl-3 pt-2 border border-gray-300"
              />
            </div>

            <div className="flex justify-center">
              <hr className="w-full md:w-1/2 my-6 border-gray-500" />
            </div>

            <div className="flex flex-col md:flex-row justify-between">
              {/* toProject - Destination */}
              <div className="flex flex-col justify-start items-start mb-4">
                <label htmlFor="toProject" className="text-gray-950 mb-2">
                  Destination:
                </label>
                <Select
                  options={projectOptions}
                  onChange={(selectedDestination) => {
                    setOrderData((prev) => ({
                      ...prev,
                      toProject: selectedDestination
                        ? selectedDestination.label
                        : "",
                      toProjectId: selectedDestination
                        ? selectedDestination.value
                        : "",
                    }));
                  }}
                  value={projectOptions.find(
                    (destination) => destination.value === orderData.toProjectId
                  )}
                  isLoading={isLoadingProjects}
                  isDisabled={isLoadingProjects}
                  className="w-full md:w-[180px]"
                  isClearable
                />
              </div>
              {/* Quantity */}
              <div className="flex flex-col justify-start items-start mb-4">
                <label htmlFor="quantity" className="text-gray-950 mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="QTY..."
                  onChange={handleChange}
                  value={orderData.quantity}
                  className="w-full md:w-[180px] rounded-[5px] h-8 md:h-9 pl-2 outline-none border border-gray-300 focus:border-2 focus:border-blue-500 sm:h-8"
                />
              </div>
            </div>

            <button
              onClick={handleAddRequest}
              className="bg-[#1e293b] rounded-[5px] py-2 text-white hover:bg-[#0f172a] hover:font-semibold transition-all duration-300"
            >
              Add Request
            </button>
          </div>

          {/* Added Requests Table */}
          {orders.length > 0 && (
            <div className="flex flex-col p-6 bg-white shadow-md rounded-[5px] w-[700px] mx-auto  mb-12">
              <div className="flex flex-col p-6 bg-white shadow-md rounded-lg mx-auto mb-12 w-full max-w-4xl overflow-x-auto">
                <ToastContainer />
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider sm:text-sm">
                        Item Description
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider sm:text-sm">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900 sm:text-base">
                          {order.itemDescription}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 sm:text-base">
                          {order.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
export default Request;
