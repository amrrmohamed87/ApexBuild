import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Income() {
  const [incomeOrders, setIncomeOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadIncome() {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/transfer-order/income"
        );
        const resData = await response.json();

        if (!response.ok) {
          const errorMessage = resData.message || "Failed to fetch Api";
          toast.error(errorMessage);
          setIsLoading(false);
          return;
        }

        const incomeData = resData.data;
        setIncomeOrders(incomeData);
        const status = resData.data.status;
        console.log(incomeData._id);

        localStorage.setItem("status", resData.data.status);
      } catch (error) {
        console.log(error);
        toast.error("Unexpected error");
        setIsLoading(false);
      }
    }

    loadIncome();
  }, []);

  return (
    <>
      <h1>Income</h1>
    </>
  );
}

export default Income;
