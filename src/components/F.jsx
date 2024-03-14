import { useState, useEffect } from "react";
import { Form, json, useNavigation } from "react-router-dom";
import { itemConditions } from "../constants/data";

//function F() {
/*  const [items, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orderData, setOrderDate] = useState({
    itemDescription: "",
    itemCondition: "",
    quantity: "",
    driverName: "",
    transferDate: "",
    fromProject: "",
    toProject: "",
  });
  const [confirmData, setConfirmData] = useState(false);

  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  function handleChange(event) {
    const { name, value } = event.target;
    setOrderDate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleConfirm() {
    setOrderDate((prevData) => ({
      ...prevData,
    }));
    console.log(orderData);
  }

  useEffect(() => {
    async function loadElements() {
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/item-description"
        );
        const resData = await response.json();

        if (!response.ok) {
          throw json({ message: "Failed to fetch Items" }, { status: 500 });
        }
        setItems(resData.data);

        return resData;
      } catch (err) {
        //
      }
    }

    loadElements();
  }, []);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/projects"
        );
        const resData = await response.json();

        if (!response.ok) {
          throw json({ message: "Failed to fetch projects" }, { status: 500 });
        }
        setProjects(resData.data);
        return resData;
      } catch (err) {
        //
      }
    }
    loadProjects();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setOrderDate({
      itemDescription: "",
      itemCondition: "",
      quantity: "",
      driverName: "",
      transferDate: "",
      fromProject: "",
      toProject: "",
    });
    console.log(orderData);
  } */

/* return (
    <section>
      <Form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col justify-center items-start md:flex-row"
      >
        <div className="bg-black shadow-2xl rounded-[10px] p-4 m-4">
          <h1 className="text-center text-blue-500">
            Formwork & Scaffolding Transfer
          </h1>
          <h2 className="text-blue-500 mb-2 mt-4">Item Details:</h2>
          <div className="flex flex-col justify-start items-start mb-4">
            <label htmlFor="itemDescription" className="text-white mb-2">
              Item Description
            </label>
            {items.length > 0 && (
              <select
                id="itemDescription"
                name="itemDescription"
                value={orderData.itemDescription}
                onChange={handleChange}
                required
                className="w-full h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
              >
                <option value="">Choose Item...</option>
                {items.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.itemDescription}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="itemCondition" className="text-white mb-2">
                Item Condition
              </label>
              {itemConditions.length > 0 && (
                <select
                  id="itemCondition"
                  name="itemCondition"
                  value={orderData.itemCondition}
                  onChange={handleChange}
                  required
                  className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
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
              <label htmlFor="quantity" className="text-white mb-2">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={orderData.quantity}
                onChange={handleChange}
                required
                className="w-[100px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
              />
            </div>
          </div>
          <h2 className="text-blue-500 mb-2 mt-4">Transfer Details:</h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="driverName" className="text-white mb-2">
                Driver Name
              </label>
              <input
                id="driverName"
                name="driverName"
                value={orderData.driverName}
                onChange={handleChange}
                type="text"
                required
                className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="transferDate" className="text-white mb-2">
                Transfer Date
              </label>
              <input
                id="transferDate"
                name="transferDate"
                type="date"
                value={orderData.transferDate}
                onChange={handleChange}
                required
                className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
              />
            </div>
          </div>
          <h2 className="text-blue-500 mb-2 mt-4">Projects:</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="fromProject" className="text-white mb-2">
                From
              </label>
              {projects.length > 0 && (
                <select
                  id="fromProject"
                  name="fromProject"
                  value={orderData.fromProject}
                  onChange={handleChange}
                  required
                  className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
                >
                  <option value="">Source...</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-col justify-start items-start">
              <label htmlFor="toProject" className="text-white mb-2">
                To
              </label>
              {projects.length > 0 && (
                <select
                  id="toProject"
                  name="toProject"
                  value={orderData.toProject}
                  onChange={handleChange}
                  required
                  className="w-[150px] sm:w-[200px] h-6 rounded-[10px] pl-2 outline-none focus:border focus:border-blue-500 sm:h-8"
                >
                  <option value="">Destination...</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          
        </div>
        <div className="bg-black shadow-2xl rounded-[10px] p-4 m-4">
          <h1 className="text-center text-blue-500">Confirm Your Order</h1>
          <div>
            <h1 className="text-white">
              <span className="text-blue-500">Item Description:</span>
              {orderData.itemDescription}
            </h1>
            <h1 className="text-white">
              <span className="text-blue-500">Item Condition:</span>
              {orderData.itemCondition}
            </h1>
            <h1 className="text-white">
              <span className="text-blue-500">Quantity:</span>
              {orderData.quantity}
            </h1>
            <h1 className="text-white">
              <span className="text-blue-500">Driver name:</span>
              {orderData.driverName}
            </h1>
            <h1 className="text-white">
              <span className="text-blue-500">Transfer Date:</span>
              {orderData.transferDate}
            </h1>
            <h1 className="text-white">
              <span className="text-blue-500">Source:</span>
              {orderData.fromProject}
            </h1>
            <h1 className="text-white">
              <span className="text-blue-500">Destination:</span>
              {orderData.toProject}
            </h1>
          </div>
          <div className="text-center mt-4">
            <button
              disabled={isSubmitting}
              className="bg-blue-700 rounded-[10px] text-white py-1 px-8 hover:bg-blue-800 hover:font-semibold"
            >
              {isSubmitting ? "Transfer order..." : "Confirm"}
            </button>
          </div>
        </div>
      </Form>
    </section>
  ); 
}

export default F; */
