import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Balance() {
  const [itemDescription, setItemDescription] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addError, setAddError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updatedItem, setUpdatedItem] = useState({
    itemDescription: "",
    itemId: "",
    good: "",
    maintenance: "",
    waste: "",
  });

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

      setUpdatedItem((prev) => ({
        ...prev,
        itemId: selectedItem ? selectedItem._id : "",
        [name]: value,
      }));
    } else {
      setUpdatedItem((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleCreateBalance = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = {
      itemDescription: updatedItem.itemId,
      good: parseInt(updatedItem.good, 10),
      maintenance: parseInt(updatedItem.maintenance, 10),
      waste: parseInt(updatedItem.waste, 10),
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
      setUpdatedItem({
        itemDescription: "",
        itemId: "",
        good: "",
        maintenance: "",
        waste: "",
      });
    } catch (error) {
      toast.error("Unexpected error occurred");
      setIsSubmitting(false);
      setUpdatedItem({
        itemDescription: "",
        itemId: "",
        good: "",
        maintenance: "",
        waste: "",
      });
    }
  };

  return (
    <main>
      <section className="mt-16 mb-8 sm:mb-8">
        <h1 className="text-white ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[25%] font-semibold sm:text-[35px]">
          Create Balance
        </h1>
      </section>

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
                  value={updatedItem.itemDescription}
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
                value={updatedItem.good}
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
                value={updatedItem.maintenance}
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
                value={updatedItem.waste}
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
    </main>
  );
}

export default Balance;
