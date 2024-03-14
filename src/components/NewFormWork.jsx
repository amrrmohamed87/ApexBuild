import { useState, useEffect } from "react";
import { Form, json } from "react-router-dom";
import { itemConditions } from "../constants/data.js";

import { TESelect } from "tw-elements-react";
import FormInput from "./FormInput.jsx";

function OrderForm() {
  const [itemDescription, setItemDescription] = useState([]);

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
  const itemDescriptionData = itemDescription.map((item) => ({
    text: item.itemDescription,
    value: item._id,
  }));

  const condition = [
    { value: "good", text: "Good" },
    { value: "maintenance", text: "Maintenance" },
    { value: "waste", text: "Waste" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <section className="">
      <div className="bg-black bg-opacity-70 rounded-[30px] p-6">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-white">Formwork & Scaffolding Transfer</h1>
          <div className="flex flex-col justify-center items-start mt-6">
            <label className="text-white text-opacity-80 mb-2">
              Item Description
            </label>
            {itemDescription.length > 0 && (
              <TESelect data={itemDescriptionData} search />
            )}
          </div>
          <div className="flex justify-between items-center gap-4 mt-6">
            <FormInput label="Quantity" type="number" placeholder="Quantity" />
            <TESelect data={condition} size="lg" />
          </div>
        </Form>
      </div>
    </section>
  );
}

export default OrderForm;
