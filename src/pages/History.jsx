import { useEffect, useState } from "react";

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
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function History() {
  const [transferredOrders, setTransferredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState();

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
      <section className="mb-8 sm:mb-8">
        <div className="mt-16 flex flex-col ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[45%]">
          <h1 className="text-white font-semibold sm:text-[35px]">
            Transfer History
          </h1>
          <hr className="w-[40px]" />
        </div>
      </section>

      {isLoading ? (
        <p className="text-center text-[30px] text-blue-500">Loading...</p>
      ) : (
        <section className="p-4 m-0 ml-0 md:p-0 md:m-8 md:ml-[21rem] flex-1">
          <Table className="bg-black">
            <TableCaption>A list of your recent Orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#40E0D0]">Order Number</TableHead>
                <TableHead className="text-blue-500">Transfer ID</TableHead>
                <TableHead className="text-blue-500">
                  item Description
                </TableHead>
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
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="link"
                          className="text-white first-letter:capitalize"
                        >
                          {order.status}
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              {order.status}
                            </h4>
                            <p className="text-sm">{order.orderNotes}</p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
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
      )}
    </main>
  );
}

export default History;
