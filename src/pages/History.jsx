import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

function History() {
  const [transferredOrders, setTransferredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/transfer-order"
        );

        if (!response.ok) {
          throw new Error("Could not fetch orders");
        }

        const resData = await response.json();
        const data = resData.data;

        setTransferredOrders(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <main>
      <section className="relative w-full h-[100px] mb-8 sm:mb-4">
        <div className="absolute mt-16 flex flex-col ml-36 sm:mt-8 sm:ml-[34.4%] md:ml-[22%] lg:ml-[22%]">
          <h1 className="text-white font-semibold sm:text-[35px]">
            Transfer History
          </h1>
          <hr />
        </div>
      </section>

      <section className="p-4 m-0 ml-0 md:p-0 md:m-8 md:ml-[21rem]">
        <Table className="bg-black">
          <TableCaption>A list of your recent Orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#40E0D0]">Order Number</TableHead>
              <TableHead className="text-blue-500">Transfer ID</TableHead>
              <TableHead className="text-blue-500">item Description</TableHead>
              <TableHead className="text-blue-500">QTY</TableHead>
              <TableHead className="text-blue-500">item Condition</TableHead>
              <TableHead className="text-blue-500">Date</TableHead>
              <TableHead className="text-blue-500">Driver</TableHead>
              <TableHead className="text-blue-500">Source</TableHead>
              <TableHead className="text-blue-500">Destination</TableHead>
              <TableHead className="text-blue-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transferredOrders.map((order, index) => (
              <TableRow key={index} className="text-white">
                <TableCell className="w-[80px]">{order.orderNo}</TableCell>
                <TableCell>{order.transferId}</TableCell>
                <TableCell>{order.itemDescription.itemDescription}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.itemCondition}</TableCell>
                <TableCell>{formatDate(order.transferDate)}</TableCell>
                <TableCell>{order.driverName}</TableCell>
                <TableCell>{order.fromProject.name}</TableCell>
                <TableCell>{order.toProject.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </section>
    </main>
  );
}

export default History;
