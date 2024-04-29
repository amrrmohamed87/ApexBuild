import React, { useState, useEffect } from "react";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

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
    quantity: "",
    activity: "",
  });
  const [isRequesting, setIsRequesting] = useState(false);
  const [orders, setOrders] = useState([]);

  const quantityFilter = "";
  const [itemDescriptionFilter, setItemDescriptionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
        setIsLoadingItems(false);
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

    const requestFields = {
      itemDescription: "Item Description",
      activity: "Activity",
      toProject: "Destination",
      quantity: "Quantity",
    };
    let missingFields = [];

    for (const [key, label] of Object.entries(requestFields)) {
      if (!orderData[key] || (key === "quantity" && orderData[key] <= 0)) {
        missingFields.push(label);
      }
    }

    if (missingFields.length === Object.entries(requestFields).length) {
      toast.error("Please fill the form below then try again");
      return;
    } else if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    toast.success("One order has been added to the list");

    setOrders((prev) => [...prev, orderData]);
    setOrderData({
      quantity: "",
      activity: "",
    });
    console.log(orders);
  }

  const submittedData = orders.map((order) => ({
    itemDescription: order.itemId,
    activity: order.activity,
    quantity: order.quantity,
    toProject: order.toProjectId,
  }));
  console.log(submittedData);

  const handleRequestOrders = async (event) => {
    event.preventDefault();
    setIsRequesting(true);
    const submittedData = orders.map((order) => ({
      itemDescription: order.itemId,
      activity: order.activity,
      quantity: parseInt(order.quantity, 10),
      toProject: order.toProjectId,
    }));
    console.log(submittedData);

    try {
      const response = await fetch(
        "https://apex-build.onrender.com/api/v1/request/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submittedData),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "Failed to request your f*** order");
        setIsRequesting(false);
        return;
      }

      toast.success("Requested Successfully");
      setOrders([]);
      setIsRequesting(false);
    } catch (error) {
      toast.error("Unexpected error occurred");
      setIsRequesting(false);
    }
  };

  const filteredData = orders.filter(
    (order) =>
      (!itemDescriptionFilter ||
        order.itemDescription.toLowerCase() ===
          itemDescriptionFilter.toLowerCase()) &&
      (!quantityFilter || order.quantity.toLowerCase() === quantityFilter)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    currentPage - 1 * rowsPerPage,
    currentPage * rowsPerPage
  );

  function handleRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    setCurrentPage(1);
  }

  function handleFirstPagination() {
    setCurrentPage(1);
  }

  function handleLastPagination() {
    setCurrentPage(totalPages);
  }

  const Pagination = () => (
    <div className="flex justify-center items-center gap-8 mt-6">
      <p className="text-sm">
        Rows per Page{" "}
        <input
          type="number"
          value={rowsPerPage}
          onChange={handleRowsPerPage}
          className="w-12 pl-3 border-2 rounded-md"
        />
      </p>
      <p className="text-sm">
        page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          className="px-2 py-1 rounded-md border-2"
          onClick={handleFirstPagination}
        >
          <MdKeyboardDoubleArrowLeft size={15} />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-2 py-1 rounded-md border-2 text-gray-800"
        >
          <GrFormPrevious size={15} />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-2 py-1 rounded-md border-2 text-gray-800"
        >
          <MdNavigateNext size={15} />
        </button>
        <button
          className="px-2 py-1 rounded-md border-2"
          onClick={handleLastPagination}
        >
          <MdKeyboardDoubleArrowRight size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer />
      <section className="mb-8 sm:mb-8">
        <div className="mt-16 flex flex-col ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[45%]">
          <h1 className="text-black font-semibold sm:text-[35px]">
            Request Orders
          </h1>
          <hr className="w-[283px] border-1 border-black" />
        </div>
      </section>

      <section>
        <form method="post" className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col p-6 bg-white border shadow-md rounded-[5px] w-[450px] mx-auto md:ml-[17rem] xl:ml-[16.5rem] mb-12">
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

            <div className="flex flex-col md:flex-row md:justify-between xl:gap-4">
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
                  className="w-full h-6 md:h-8 md:w-[180px]"
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
                  className="w-full md:w-[180px] rounded-[5px] h-6 md:h-[2.4rem] pl-2 outline-none border border-gray-300 focus:border-2 focus:border-blue-500 sm:h-8"
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
            <div className="flex flex-col p-6 bg-white border shadow-md rounded-[5px] w-[700px] xl:mr-4  mb-12">
              <div className="flex flex-col p-6 bg-white border shadow-md rounded-lg mx-auto mb-12 w-full max-w-4xl overflow-x-auto">
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
                    {currentData.map((order, index) => (
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
                <Pagination />

                <button
                  type="submit"
                  disabled={isRequesting}
                  onClick={handleRequestOrders}
                  className="bg-[#1e293b] w-full mt-4 rounded-[5px] py-2 text-white hover:bg-[#0f172a] hover:font-semibold transition-all duration-300"
                >
                  {isRequesting ? "Requesting..." : "Reequest"}
                </button>
              </div>
            </div>
          )}
        </form>
      </section>
    </>
  );
}
export default Request;
