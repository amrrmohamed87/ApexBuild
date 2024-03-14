import { Form, json } from "react-router-dom";
import { itemConditions } from "../constants/data.js";
import { useEffect, useState } from "react";

function Formwork() {
  const [itemDescription, setItemDescription] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orderData, setOrderData] = useState([]);

  /* useEffect(() => {
    async function action({ request }) {
      const data = await request.formData();
      const itemDescriptionData = {
        item: data.get("itemDescription"),
        quantity: data.get("quantity"),
        condition: data.get("itemCondition"),
        date: data.get("transferDate"),
        driver: data.get("driverName"),
        from: data.get("fromProject"),
        to: data.get("toProject"),
      };

      setOrderData(itemDescriptionData);
    }
    action();
  }, []); */

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
        setItemDescription(resData.data);

        //console.log(resData.map((item) => item._id));
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
  }
  return (
    <div className="bg-[#2a2a2c] shadow-2xl rounded m-3 p-2 sm:w-1/2 sm:ml-[25%] md:w-[66%] md:ml-[18%] md:p-2 lg:p-3 lg:w-1/3 lg:ml-20">
      <Form onSubmit={handleSubmit}>
        <h1 className="mb-2 text-white text-center font-bold  md:text-[25px]">
          Formwork & Scaffolding Transfer
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="items" className="text-white mb-1 md:text-[18px]">
            Item Description
          </label>
          {/* <select
            id="items"
            className="w-full rounded h-[30px] pl-1 md:w-[488px] md:h-[35px]"
          >
            <option value="">Choose Item...</option>
            <option value="H20 Beam 2.90 m">H20 Beam 2.90 m</option>
            <option value="Small Wedge">Small Wedge</option>
          </select> */}
          {itemDescription.length > 0 && (
            <select
              name="itemDescription"
              id="items"
              className="w-full rounded h-[30px] pl-1 md:w-[488px] md:h-[35px]"
            >
              <option value="">Choose item...</option>
              {itemDescription.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.itemDescription}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-6 mb-6 md:gap-12">
          <div className="flex flex-col">
            <label htmlFor="qty" className="text-white mb-1 md:text-[18px]">
              Quantity
            </label>

            <input
              id="qty"
              type="number"
              name="quantity"
              required
              className="w-[170px] h-[30px] rounded pl-1 md:w-[220px] md:h-[35px]"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="itemCondition"
              className="text-white mb-1 md:text-[18px]"
            >
              Item Condition
            </label>
            <select
              id="itemCondition"
              name="itemCondition"
              className="h-[30px] rounded pl-1 md:w-[220px] md:h-[35px]"
            >
              {itemConditions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.condition}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8 mb-4 md:gap-12">
          <div className="flex flex-col">
            <label
              htmlFor="transferDate"
              className="text-white mb-1 md:text-[18px]"
            >
              Transfer Date
            </label>
            <input
              id="transferDate"
              type="date"
              name="transferDate"
              required
              className="h-[30px] rounded w-[170px] pl-1 pr-1 md:w-[220px] md:h-[35px]"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="driverName"
              className="text-white mb-1 md:text-[18px]"
            >
              Drive Name
            </label>
            <input
              id="driverName"
              type="text"
              name="driverName"
              required
              className="h-[30px] rounded w-[170px] pl-1 md:w-[220px] md:h-[35px]"
            />
          </div>
        </div>

        <h1 className="text-white font-medium mb-2 md:text-[18px] md:font-bold">
          Projects:
        </h1>
        <div className="flex gap-8 mb-6 md:gap-12">
          <div className="flex flex-col">
            <label
              htmlFor="fromProject"
              className="text-white mb-1 md:text-[20px]"
            >
              From
            </label>

            {projects.length > 0 && (
              <select
                id="fromProject"
                name="fromProject"
                className="h-[30px] w-[170px] pl-1 rounded md:w-[220px] md:h-[35px]"
              >
                <option value="">Select project...</option>
                {projects.map((project, index) => (
                  <option key={index} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="toProject"
              className="text-white mb-1 md:text-[18px]"
            >
              To
            </label>
            {projects.length > 0 && (
              <select
                id="fromProject"
                name="fromProject"
                className="h-[30px] w-[170px] pl-1 rounded md:w-[220px] md:h-[35px]"
              >
                <option value="">Select project...</option>
                {projects.map((project, index) => (
                  <option key={index} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div className="text-right mb-10">
          <button
            className="bg-white px-4 py-1 rounded text-[#151515]
            hover:bg-black hover:text-white transition-all md:py-2 md:px-6 md:text-[15px]"
          >
            Add Item
          </button>
        </div>
        {/*  <div className="text-right mb-2">
          <button
            className="bg-white px-4 py-1 rounded text-[#151515] transition-all
             hover:bg-black hover:text-white md:py-2 md:px-6 md:text-[15px]"
          >
            Confirm
          </button>
        </div> */}
      </Form>
    </div>
  );
}

export default Formwork;
