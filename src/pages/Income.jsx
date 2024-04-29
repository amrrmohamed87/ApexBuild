import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Select.css";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { IoOpenOutline } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

function Income() {
  const [income, setIncome] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState(false);

  const [transferIdOptions, setTransferIdOptions] = useState([]);
  const [transferIdFilter, setTransferIdFilter] = useState("");

  const [itemDescriptionOptions, setItemDescriptionOptions] = useState([]);
  const [itemDescriptionFilter, setItemDescriptionFilter] = useState("");

  const [fromProjectOptions, setFromProjectOptions] = useState([]);
  const [fromProjectFilter, setFromProjectFilter] = useState("");

  const [transferDateOptions, setTransferDateOptions] = useState([]);
  const [transferDateFilter, setTransferDateFilter] = useState("");

  useEffect(() => {
    async function loadIncomeOrders() {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/transfer-order/income"
        );
        const resData = await response.json();
        console.log(resData.data);
        if (!response.ok) {
          const errorMessage = resData.message || "Failed to fetch";
          toast.error(errorMessage);
          setIsLoading(false);
          return;
        }
        setIncome(resData.data);

        const transferId = [
          ...new Set(resData.data.map((id) => id.transferId)),
        ].map((id) => ({ label: id, value: id }));

        const items = [
          ...new Set(
            resData.data.map((item) => item.itemDescription.itemDescription)
          ),
        ].map((item) => ({ label: item, value: item }));

        const source = [
          ...new Set(resData.data.map((project) => project.fromProject.name)),
        ].map((project) => ({ label: project, value: project }));

        const date = resData.data.map((date) => {
          const formattedDate = formateDate(date.transferDate);
          return { label: formattedDate, value: formattedDate };
        });

        setTransferIdOptions(transferId);
        setItemDescriptionOptions(items);
        setFromProjectOptions(source);
        setTransferDateOptions(date);
        setIsLoading(false);
      } catch (error) {
        toast.error("unexpected error");
        setIsLoading(false);
      }
    }
    loadIncomeOrders();
  }, []);

  const formateDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleFeedBack = async (id, status, orderNotes) => {
    setIsSubmittingFeedback(true);

    try {
      const response = await fetch(
        `https://apex-build.onrender.com/api/v1/transfer-order/update-income/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status, orderNotes }),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "Failed to send FEEDBACK");
        setIsSubmittingFeedback(false);
        return;
      }
      toast.success("Feedback is sent successfully");
      setIncome(
        income.map((order) => (order._id === id ? { ...order, status } : order))
      );
    } catch (error) {
      toast.error("Unexpected error occurred");
      setIsSubmittingFeedback(false);
    }
  };

  const handleStatusChange = (event) => {
    setOrderNotes(event.target.value);
  };

  const handleErrorStatusSubmit = async (id) => {
    handleFeedBack(id, "unmatched", orderNotes);
  };

  const handleDoneStatusSubmit = (id, status) => {
    setOrderNotes("");
    handleFeedBack(id, status, orderNotes);
  };

  const filteredData = income.filter(
    (order) =>
      (!transferIdFilter ||
        order.transferId.toLowerCase() === transferIdFilter.toLowerCase()) &&
      (!itemDescriptionFilter ||
        order.itemDescription.itemDescription.toLowerCase() ===
          itemDescriptionFilter.toLowerCase()) &&
      (!fromProjectFilter ||
        order.fromProject.name.toLowerCase() ===
          fromProjectFilter.toLowerCase()) &&
      (!transferDateFilter ||
        formateDate(order.transferDate) === transferDateFilter)
  );
  console.log(filteredData);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
    <main className="flex flex-col">
      <section className="mb-8 sm:mb-8">
        <div className="mt-16 flex flex-col ml-28 sm:mt-16 sm:ml-[34.4%] md:ml-[22%] lg:ml-[45%]">
          <h1 className="text-black font-semibold sm:text-[35px]">
            Income Orders
          </h1>
          <hr className="w-[270px] border-1 border-black" />
        </div>
      </section>

      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div className="flex flex-col p-4 bg-white shadow-md xl:w-[1000px] mx-auto md:ml-[17rem] mb-12">
          <div className="flex justify-between items-center">
            <button
              className="flex items-center gap-2 bg-white shadow-md px-8 py-2 rounded-md mb-2"
              onClick={() => {
                setFilter(!filter);
              }}
            >
              Filter
              <motion.span
                animate={{ rotate: filter ? -180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <MdKeyboardArrowDown size={20} />
              </motion.span>
            </button>
          </div>

          <AnimatePresence>
            {filter && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }}
              >
                {filter && (
                  <div className="flex justify-between items-center my-6 px-1">
                    <Select
                      options={transferIdOptions}
                      onChange={(option) =>
                        setTransferIdFilter(option ? option.value : "")
                      }
                      value={transferIdOptions.find(
                        (option) => option.value === transferIdFilter
                      )}
                      isClearable
                      className="custom-select"
                      classNamePrefix="react-select"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      placeholder="TransferID..."
                    />
                    <Select
                      options={itemDescriptionOptions}
                      onChange={(option) =>
                        setItemDescriptionFilter(option ? option.value : "")
                      }
                      value={itemDescriptionOptions.find(
                        (option) => option.value === itemDescriptionFilter
                      )}
                      isClearable
                      className="custom-select"
                      classNamePrefix="react-select"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      placeholder="Item..."
                    />

                    <Select
                      options={fromProjectOptions}
                      onChange={(option) =>
                        setFromProjectFilter(option ? option.value : "")
                      }
                      value={fromProjectOptions.find(
                        (option) => option.value === fromProjectFilter
                      )}
                      isClearable
                      className="custom-select"
                      classNamePrefix="react-select"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      placeholder="Source..."
                    />

                    <Select
                      options={transferDateOptions}
                      onChange={(option) =>
                        setTransferDateFilter(option ? option.value : "")
                      }
                      value={transferDateOptions.find(
                        (option) => option.value === transferDateFilter
                      )}
                      isClearable
                      className="custom-select"
                      classNamePrefix="react-select"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      placeholder="Transfer Date..."
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <ToastContainer />
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Improved header style */}
                  <th
                    scope="col"
                    className="w-2 px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Order Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    OrderId
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    View
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((order, index) => (
                  <tr key={index}>
                    {/* Triggering the dialog directly from the row click */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.transferId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.itemDescription.itemDescription}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.fromProject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formateDate(order.transferDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-gray-900 transition-all duration-300">
                      <Dialog className="p-4">
                        <DialogTrigger asChild>
                          <p>
                            <IoOpenOutline size={20} />
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
                                  {formateDate(order.transferDate)}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-gray-900 transition-all duration-300">
                      <div className="flex items-center gap-6">
                        <button
                          onClick={() =>
                            handleDoneStatusSubmit(order._id, "done")
                          }
                        >
                          <MdOutlineDone
                            size={20}
                            className="text-green-600 hover:text-green-900 transition-all duration-300"
                          />
                        </button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <p>
                              <MdOutlineErrorOutline
                                size={20}
                                className="text-red-600 hover:text-red-900 transition-all duration-300"
                              />
                            </p>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Feedback message
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Please send a message with the details that
                                don't match your order.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex flex-col items-end gap-6">
                              <textarea
                                value={orderNotes}
                                onChange={handleStatusChange}
                                className="w-full pl-3 pt-2 outline-none border-2 border-gray-500"
                              />
                            </div>
                            <AlertDialogFooter className="gap-2 mt-4">
                              <AlertDialogCancel className="w-[150px] py-2 rounded-lg bg-gray-50 hover:text-white hover:bg-gray-900 transition-all duration-300">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction className="w-[150px] py-2 rounded-lg bg-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300">
                                <p
                                  onClick={() =>
                                    handleErrorStatusSubmit(order._id)
                                  }
                                  disabled={isSubmittingFeedback}
                                  type="submit"
                                >
                                  {isSubmittingFeedback
                                    ? "Sending..."
                                    : "Send Message"}
                                </p>
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
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

export default Income;
