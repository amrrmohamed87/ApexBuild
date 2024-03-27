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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdOutlineTimer } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

function History() {
  const [transferredOrders, setTransferredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //Query state for search and page state for pagination
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  //Filter Transferred Item based on query
  const filteredData = transferredOrders.filter(
    (order) =>
      (order.transferId.toLowerCase().includes(query.toLowerCase()) ||
        order.itemDescription.itemDescription
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        order.status.toLowerCase().includes(query.toLowerCase())) &&
      (statusFilter
        ? order.status.toLowerCase() === statusFilter.toLowerCase()
        : true)
  );

  //Calculate Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  console.log(totalPages);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusSelect = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1);
  };

  function handleLastPagination() {
    setCurrentPage(totalPages);
  }

  function handleFirstPagination() {
    setCurrentPage(1);
  }

  const Pagination = () => (
    <div className="flex justify-end items-center gap-6 mt-6">
      <p>
        Rows per Page{" "}
        <input
          type="number"
          value={rowsPerPage}
          onChange={handleRowsPerPage}
          className="w-12 pl-3 border-2 rounded-md"
        />
      </p>
      <p>
        page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          className="px-2 py-1 rounded-md border-2"
          onClick={handleFirstPagination}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-2 py-1 rounded-md border-2 text-gray-800"
        >
          <GrFormPrevious size={20} />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-2 py-1 rounded-md border-2 text-gray-800"
        >
          <MdNavigateNext size={20} />
        </button>
        <button
          className="px-2 py-1 rounded-md border-2"
          onClick={handleLastPagination}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  return (
    <main>
      <section className="mb-8 sm:mb-8">
        <div className="mt-16 flex flex-col ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[45%]">
          <h1 className="text-black font-semibold sm:text-[35px]">
            Transfer History
          </h1>
          <hr className="w-[40px]" />
        </div>
      </section>

      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div className="flex flex-col p-6 bg-white shadow-md w-[1100px] ml-80 mb-12">
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              className="mb-4 px-2 py-1 w-[300px] rounded-lg outline-none border-2 border-gray-300 focus:border-blue-500"
              placeholder="Search..."
            />

            <select
              className="px-2 py-1 w-[130px] rounded-lg border-2 outline-none border-gray-300 focus:border-blue-500"
              value={statusFilter}
              onChange={handleStatusSelect} // Use the new handleStatusChange function here
            >
              <option value="">All</option>
              <option value="processing">Processing</option>
              <option value="unmatched">Unmatched</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 w-2 tracking-wider"
                  >
                    Order number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 w-[30px] tracking-wider"
                  >
                    OrderId
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Destination
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.transferId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Dialog className="p-4">
                        <DialogTrigger asChild>
                          <p className="cursor-pointer">
                            {order.itemDescription.itemDescription}
                          </p>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>
                              View your order in detail, click close when you're
                              done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col justify-center items-start gap-4">
                              <h1 className="text-gray-950 font-semibold">
                                Item Description:{" "}
                                <span className="text-black font-normal">
                                  {order.itemDescription.itemDescription}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Transfer Id:{" "}
                                <span className="text-black font-normal">
                                  {order.transferId}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Quantity:{" "}
                                <span className="text-black font-normal">
                                  {order.quantity}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Condition:{" "}
                                <span className="text-black font-normal">
                                  {order.itemCondition}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Transfer Date:{" "}
                                <span className="text-black font-normal">
                                  {formatDate(order.transferDate)}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Driver:{" "}
                                <span className="text-black font-normal">
                                  {order.driverName}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Source:{" "}
                                <span className="text-black font-normal">
                                  {order.fromProject.name}
                                </span>
                              </h1>
                              <h1 className="text-gray-950 font-semibold">
                                Destination:{" "}
                                <span className="text-black font-normal">
                                  {order.toProject.name}
                                </span>
                              </h1>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.fromProject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.toProject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button
                            variant="link"
                            className=" first-letter:capitalize"
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      )}
    </main>
  );
}

export default History;

/**
 * {isLoading ? (
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
          </Table>
        </section>
      )}
 * 
 */
