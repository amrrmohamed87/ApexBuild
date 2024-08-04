import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { itemConditions } from "../constants/data.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MdDeleteSweep } from "react-icons/md";

function Transfer() {
  const [items, setItems] = useState([]);
  const itemOptions = items.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  const itemCondition = itemConditions.map((item) => ({
    label: item.condition,
    value: item.value,
  }));
  const [projects, setProjects] = useState([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);
  const projectOptions = projects.map((project) => ({
    label: project.name,
    value: project._id,
  }));

  const [orderData, setOrderData] = useState({
    itemDescription: "",
    itemId: "",
    itemCondition: "",
    quantity: "",
  });
  const [addedOrders, setAddedOrders] = useState([]);
  const [ordersData, setOrders] = useState([]);
  const [finalForm, setFinalForm] = useState({
    transferNumber: "",
    transferDate: "",
    fromProject: "",
    toProject: "",
    orders: [],
    image: "",
  });
  /* useEffect(() => {
    setFinalForm((prevForm) => ({
      ...prevForm,
      orders: ordersData,
    }));
  }, [ordersData]);
  console.log(finalForm); */

  const [isLoading, setIsLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

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

  /*  useEffect(() => {
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
 */
  useEffect(() => {
    async function fetchProjects() {
      setIsFetchingProjects(true);
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/projects"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message || "Could not fetch projects");
          setIsFetchingProjects(false);
          return;
        }

        setProjects(resData.data);
        setIsFetchingProjects(false);
      } catch (error) {
        toast.error("Unexpected Error Occurred");
        setIsFetchingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  /* function handleChange(event) {
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
  } */

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFinalForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageOnChange(event) {
    const file = event.target.files[0];
    setFinalForm((prev) => ({
      ...prev,
      image: file,
    }));
  }

  function handleAddOrder(event) {
    event.preventDefault();

    const requiredFields = {
      itemDescription: "Item description",
      quantity: "Quantity",
      transferNumber: "Transfer Number",
      transferDate: "Transfer Date",
      fromProject: "Source",
      toProject: "Destination",
      itemCondition: "Item condition",
    };

    let missingFields = [];

    for (const [key, label] of Object.entries(requiredFields)) {
      if (
        ((!orderData[key] || (key === "quantity" && orderData[key] <= 0)) &&
          !finalForm[key]) ||
        (key === "transferNumber" && finalForm[key] <= 0)
      ) {
        missingFields.push(label);
      }
    }

    if (missingFields.length === Object.entries(requiredFields).length) {
      toast.error("Please fill the form below then try again");
      return;
    } else if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    if (finalForm.toProject === finalForm.fromProject) {
      toast.error("Source and destination projects cannot be the same");
      return;
    }

    const newOrder = {
      itemDescription: orderData.itemId,
      quantity: parseInt(orderData.quantity, 10),
      itemCondition: orderData.itemCondition,
    };
    setFinalForm((prevForm) => ({
      ...prevForm,
      orders: [...prevForm.orders, newOrder],
    }));

    setAddedOrders((prev) => [...prev, orderData]);
    // Add order to the list
    /* setOrders(
      addedOrders.map((order) => ({
        itemDescription: order.itemId,
        quantity: order.quantity,
        itemCondition: order.itemCondition,
      }))
    ); */
    /* setFinalForm((prevForm) => ({
      ...prevForm,
      order: orders,
    })); */

    console.log("Order added:", orderData);
    //console.log(ordersData);
    console.log(addedOrders);
    console.log(finalForm);

    // Optionally reset form here after adding an order
    // e.g., resetOrderData(); if you create a function to reset all fields
  }
  /*   useEffect(() => {
    setFinalForm((prevForm) => ({
      ...prevForm,
      order: orders,
    }));
  }, [orders]); */

  /*  function handleConfirmOrders(event) {
    event.preventDefault();

    const requiredFields = {
      transferNumber: "Transfer Number",
      transferDate: "Transfer Date",
      fromProject: "Source",
      toProject: "Destination",
    };

    let missingFields = [];

    for (const [key, label] of Object.entries(requiredFields)) {
      if (
        !finalForm[key] ||
        (key === "transferNumber" && finalForm[key] <= 0)
      ) {
        missingFields.push(label);
      }
    }

    if (missingFields.length === Object.entries(requiredFields).length) {
      toast.error("Please fill the empty inputs");
      return;
    } else if (missingFields.length > 0) {
      toast.error(`Missing: ${missingFields.join(", ")}`);
      return;
    }

    if (finalForm.toProject === finalForm.fromProject) {
      toast.error("Source and destination projects cannot be the same");
      return;
    }

    
    console.log(finalForm);
  }
 */
  function handleDeleteOrder(orderToDelete) {
    setAddedOrders((prevOrders) =>
      prevOrders.filter((_, index) => index !== orderToDelete)
    );

    setOrders((prevOrders) =>
      prevOrders.filter((_, index) => index !== orderToDelete)
    );
  }

  /* const handleConfirmOrder = async (event) => {
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
      } 

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
      });
      setAddedOrders([]);
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
  }; */

  const handleTransferOrder = async (event) => {
    event.preventDefault();
    setIsConfirming(true);

    const formData = new FormData();
    formData.append("transferNumber", parseInt(finalForm.transferNumber, 10));
    formData.append("transferDate", finalForm.transferDate);
    formData.append("fromProject", finalForm.fromProject);
    formData.append("toProject", finalForm.toProject);
    formData.append("orders", JSON.stringify(finalForm.orders));

    if (finalForm.image) {
      formData.append("image", finalForm.image);
    }

    const final = {
      transferNumber: finalForm.transferNumber,
      transferDate: finalForm.transferDate,
      fromProject: finalForm.fromProject,
      toProject: finalForm.toProject,
      orders: finalForm.orders,
    };

    console.log(final);
    console.log(finalForm);

    try {
      const response = await fetch(
        "https://apex-build.onrender.com/api/v1/transfer-order",
        {
          method: "POST",

          body: formData,
        }
      );
      const resData = await response.json();

      if (response.status === 400) {
        console.log(resData.message);
      }

      if (!response.ok) {
        toast.error(resData.message || "Failed to transfer your ORDER");
        setIsConfirming(false);
        return;
      }

      toast.success("Transfer Successful");
      setOrderData({
        itemDescription: "",
        itemId: "",
        itemCondition: "",
        quantity: "",
      });
      setAddedOrders([]);
      setOrders([]);
      setFinalForm({
        transferNumber: "",
        transferDate: "",
        fromProject: "",
        toProject: "",
        orders: [],
        image: "",
      });
      setIsConfirming(false);
    } catch (error) {
      toast.error(error.message);
      setIsConfirming(false);
      return;
    }
  };
  console.log(items);

  // Improving input type
  const inputRef = useRef(null);
  useEffect(() => {
    const currentInput = inputRef.current;
    const preventScroll = (event) => {
      event.preventDefault();
    };

    if (currentInput) {
      currentInput.addEventListener("wheel", preventScroll);
    }

    // Cleanup function to remove event listener
    return () => {
      if (currentInput) {
        currentInput.removeEventListener("wheel", preventScroll);
      }
    };
  }, []);

  return (
    <main className="bg-[#F5F5F5] flex flex-col p-10 ml-20 w-full gap-5">
      {/* Static content or headers */}

      <section className="mb-8 sm:mb-8 xl:mb-0">
        <div className="mt-16 flex flex-col">
          <h1 className="text-black font-semibold sm:text-[35px]">
            Transfer Your Order Now
          </h1>
          <hr className="w-[40px]" />
        </div>
      </section>

      <section>
        <form>
          <div className="bg-white shadow-md rounded-[10px] p-4  w-[850px]">
            <h1 className="text-center font-bold text-gray-950 text-2xl">
              Formwork & Scaffolding Transfer
            </h1>
            <div className="flex items-center gap-[7rem] mt-12">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="transferNumber"
                  className="text-gray-950 font-medium"
                >
                  Transfer Number
                </label>
                <input
                  type="number"
                  id="transferNumber"
                  name="transferNumber"
                  value={finalForm.transferNumber}
                  onChange={handleOnChange}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                  className="appearance-none w-[150px] sm:w-[213px] rounded-[5px] h-6 pl-2 border border-gray-400 focus:border-blue-500 sm:h-8"
                  ref={inputRef}
                />
              </div>
              <div className="flex items-center gap-[15px]">
                <label
                  htmlFor="transferDate"
                  className="text-gray-950 font-medium"
                >
                  Transfer Date
                </label>
                <input
                  id="transferDate"
                  name="transferDate"
                  type="date"
                  value={finalForm.transferDate}
                  onChange={handleOnChange}
                  required
                  className="w-[150px] sm:w-[213px] rounded-[5px] h-6 pl-2 pr-2 border border-gray-400 focus:border-blue-500 sm:h-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-[5.8rem] mb-8 mt-4">
              <div className="flex items-center gap-6">
                <label
                  htmlFor="fromProject"
                  className="text-gray-950 font-medium"
                >
                  From / Source
                </label>
                {projects.length > 0 && (
                  <Select
                    id="fromProject"
                    name="fromProject"
                    required
                    options={projectOptions}
                    onChange={(selectedSource) => {
                      setFinalForm((prev) => ({
                        ...prev,
                        //fromProject: selectedSource ? selectedSource.label : "",
                        fromProject: selectedSource ? selectedSource.value : "",
                      }));
                    }}
                    value={projectOptions.find(
                      (selectedSource) =>
                        selectedSource.value === finalForm.fromProject
                    )}
                    className="w-[150px] sm:w-[220px] h-6 rounded-[5px] pl-2 sm:h-8"
                    isClearable
                    placeholder="source..."
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="toProject"
                  className="text-gray-950 font-medium"
                >
                  To / Destination
                </label>
                {projects.length > 0 && (
                  <Select
                    id="toProject"
                    name="toProject"
                    required
                    options={projectOptions}
                    onChange={(selectedDestination) => {
                      setFinalForm((prev) => ({
                        ...prev,
                        /* toProject: selectedDestination
                          ? selectedDestination.label
                          : "", */
                        toProject: selectedDestination
                          ? selectedDestination.value
                          : "",
                      }));
                    }}
                    value={projectOptions.find(
                      (selectedDestination) =>
                        selectedDestination.value === finalForm.toProject
                    )}
                    className="w-[150px] sm:w-[220px] h-6 rounded-[5px] pl-2 sm:h-8"
                    isClearable
                  />
                )}
              </div>
            </div>

            <hr className="border border-gray-700" />

            <h2 className="text-gray-950 font-bold mb-2 mt-4">Item Details:</h2>
            <div className="flex flex-col justify-start items-start mb-4">
              <label htmlFor="itemDescription" className="text-gray-950 mb-2">
                Item Description & Code:
              </label>
              {isLoading ? (
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
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="w-full"
                  isClearable
                />
              )}
            </div>
            <div className="flex items-center gap-[9.5rem]">
              <div className="flex items-end gap-4">
                <label
                  htmlFor="itemCondition"
                  className="font-medium text-gray-950"
                >
                  Item Condition
                </label>
                {itemConditions.length > 0 && (
                  <Select
                    options={itemCondition}
                    onChange={(selectedCondition) => {
                      setOrderData((prev) => ({
                        ...prev,
                        itemCondition: selectedCondition
                          ? selectedCondition.value
                          : "",
                      }));
                    }}
                    value={itemCondition.find(
                      (option) => option.value === orderData.itemCondition
                    )}
                    className="react-select w-[150px] sm:w-[220px] h-6 rounded-[5px] pl-2 sm:h-8"
                    classNamePrefix="react-select"
                    /* styles={{
                      control: (provided) => ({
                        ...provided,
                        width: "150px", // Default width
                        minHeight: "32px",
                        "@media (min-width: 640px)": {
                          width: "200px", // Width on small devices and up
                        },
                        borderColor: "#d1d5db", // Tailwind's border-gray-300
                        "&:hover": {
                          borderColor: "#bfdbfe", // Tailwind's border-blue-300 on hover
                        },
                        boxShadow: "none", // Removes focus shadow
                        borderRadius: "10px",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        width: "150px",
                        "@media (min-width: 640px)": {
                          width: "200px",
                          zIndex: 5,
                        },
                      }),
                    }} */
                    isClearable
                  />
                )}
              </div>
              <div className="flex items-center gap-4 mt-2">
                <label htmlFor="quantity" className="text-gray-950">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={orderData.quantity}
                  onChange={(event) => {
                    setOrderData((prev) => ({
                      ...prev,
                      quantity: event.target.value,
                    }));
                  }}
                  required
                  ref={inputRef}
                  className="w-[150px] sm:w-[213px] h-6 rounded-[5px] pl-2 outline-none border-2 border-gray-300 focus:border-blue-500 sm:h-9"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleAddOrder}
                className="bg-[#1e293b] w-full rounded-[5px] text-white py-1 px-8 hover:bg-[#0f172a] hover:font-semibold"
              >
                Add Item
              </button>
            </div>

            {/* <h2 className="text-gray-950 font-bold mb-2 mt-4">
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
            </div>
            <h2 className="text-gray-950 font-bold mb-2 mt-4">Projects:</h2> */}
          </div>

          {/* <div className="bg-white shadow-2xl rounded-[10px] p-4 m-4">
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
          </div> */}

          {/* Other fields like driverName, transferDate, fromProject, and toProject can be added similarly */}
        </form>
      </section>

      {addedOrders.length > 0 && (
        <div className="flex flex-col p-6 bg-white shadow-md rounded-lg mb-12 w-full max-w-4xl overflow-x-auto">
          <table className="min-w-full divide-y border divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider sm:text-sm">
                  Item Description - Code
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider sm:text-sm">
                  Quantity
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-white uppercase tracking-wider sm:text-sm">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {addedOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900 sm:text-base">
                    {order.itemDescription}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 sm:text-base">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 sm:text-base">
                    <MdDeleteSweep
                      onClick={() => handleDeleteOrder(index)}
                      size={15}
                      className="text-red-500 hover:text-red-700  transition-all duration-300 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-6">
            <div className="p-4">
              <input
                type="file"
                name="image"
                onChange={handleImageOnChange}
                className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-blue-600 rounded-[10px] text-white py-1 px-8 hover:bg-blue-800 transition-all duration-300">
                  Confirm Orders
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-gray-850 tracking-wider">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-950 tracking-wide">
                    This action will permanently Transfer your orders and your
                    are no longer available to edit or delete your order from
                    here
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center gap-3">
                  <AlertDialogCancel className="bg-gray-700 px-3 py-2 rounded-lg text-white hover:bg-gray-800 transition-all duration-300">
                    Cancel
                  </AlertDialogCancel>
                  <form onSubmit={handleTransferOrder} method="post">
                    <button
                      type="submit"
                      disabled={isConfirming}
                      className="bg-blue-700 rounded-[10px] text-white px-3 py-2 hover:bg-blue-800  transition-all duration-300"
                    >
                      {isConfirming ? "Transferring..." : "Confirm"}
                    </button>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      {/* {orders.length > 0 && (
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
      )} */}

      <ToastContainer />
    </main>
  );
}

export default Transfer;
