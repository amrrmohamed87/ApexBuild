/* import { redirect } from "react-router-dom";
import F from "../components/F.jsx";
import Formwork from "../components/Formwork.jsx";
import OrderForm from "../components/NewFormWork.jsx";

function NewTransfer() {
  return (
    <main>
      <section className="relative w-full h-[100px] mb-8 sm:mb-16">
        <div className="absolute mt-16 flex flex-col ml-28 sm:mt-20 sm:ml-[34.4%] md:ml-[22%] lg:ml-[36%]">
          <h1 className="text-white font-semibold sm:text-[35px]">
            Transfer Your Order Now
          </h1>
          <hr />
        </div>
      </section>
      <F />
    </main>
  );
}

export default NewTransfer;

export async function action({ request }) {
  const data = await request.formData();
  const order = {
    itemDescription: data.get("itemDescription"),
    quantity: data.get("quantity"),
    itemCondition: data.get("itemCondition"),
    transferDate: data.get("transferDate"),
    driverName: data.get("driverName"),
    fromProject: data.get("fromProject"),
    toProject: data.get("toProject"),
  };

  const response = await fetch(
    "https://apex-build.onrender.com/api/v1/transfer-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );
  const resData = await response.json();
  window.alert("Done");

  if (!response.ok) {
    return response;
  }

  return redirect("/income");
}
 */
