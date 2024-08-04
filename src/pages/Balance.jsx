import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import "./Select.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdKeyboardArrowDown } from "react-icons/md";

function Balance() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filter, setFilter] = useState(false);

  //Storing items into itemDescription state
  const [itemDescription, setItemDescription] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addError, setAddError] = useState("");

  //Create Balances
  const [createBalance, setCreateBalance] = useState({
    itemDescription: "",
    itemId: "",
    good: "",
    maintenance: "",
    waste: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Show balances
  const [showBalances, setShowBalances] = useState([]);
  const [isLoadingBalances, setIsLoadingBalances] = useState(false);

  //Deleting Balances
  const [isDeletingBalances, setIsDeletingBalances] = useState(false);

  //Update Balances
  const [updateBalance, setIsUpdateBalance] = useState({
    good: "",
    maintenance: "",
    waste: "",
  });

  const [balancePerProject, setBalancePerProject] = useState([]);
  const [isLoadindProjectPerBalance, setIsLoadingProjectPerBalance] =
    useState(false);
  const [projects, setProjects] = useState([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);
  const projectsOptions = projects.map((project) => ({
    label: project.name,
    value: project._id,
  }));
  const [projectId, setProjectId] = useState({
    projectId: "",
  });

  useEffect(() => {
    async function loadBalancePerProjectId() {
      setIsLoadingProjectPerBalance(true);
      try {
        const response = await fetch(
          `https://apex-build.onrender.com/api/v1/balance/projects/${projectId.projectId}`
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsLoadingProjectPerBalance(false);
          return;
        }

        setBalancePerProject(resData.data || []);
        setIsLoadingProjectPerBalance(false);
      } catch (error) {
        toast.error("Unexpected error during fetching balances per id");
        setIsLoadingProjectPerBalance(false);
        return;
      }
    }
    if (projectId.projectId) {
      loadBalancePerProjectId();
    }
  }, [projectId]);
  console.log(projectId);

  //fetch projects
  useEffect(() => {
    async function fetchProjects() {
      setIsFetchingProjects(true);
      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/projects"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message || "Could not fetch projects");
          setIsFetchingProjects(false);
          return;
        }

        setProjects(resData.data);
        setIsFetchingProjects(false);
      } catch (error) {
        toast.error("Unexpected Error Occurred");
        setIsFetchingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  //fetch Items
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

      setCreateBalance((prev) => ({
        ...prev,
        itemId: selectedItem ? selectedItem._id : "",
        [name]: value,
      }));
    } else {
      setCreateBalance((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const handleCreateBalance = async () => {
    setIsSubmitting(true);

    const data = {
      itemDescription: createBalance.itemId,
      good: parseInt(createBalance.good, 10),
      maintenance: parseInt(createBalance.maintenance, 10),
      waste: parseInt(createBalance.waste, 10),
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
      setCreateBalance({
        itemDescription: "",
        itemId: "",
        good: "",
        maintenance: "",
        waste: "",
      });
    } catch (error) {
      toast.error("Unexpected error occurred");
      setIsSubmitting(false);
      setCreateBalance({
        itemDescription: "",
        itemId: "",
        good: "",
        maintenance: "",
        waste: "",
      });
    }
  };

  //show balances
  useEffect(() => {
    async function LoadBalances() {
      setIsLoadingBalances(true);

      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/balance"
        );
        const resData = await response.json();
        console.log(resData);

        if (!response.ok) {
          const errorMessage = resData.message || "Could not fetch balances";
          toast.error(errorMessage);
          setIsLoadingBalances(false);
          return;
        }

        setShowBalances(resData.data);
        console.log(showBalances);
        setIsLoadingBalances(false);
      } catch (error) {
        toast.error("unexpected error");
        setIsLoadingBalances(false);
      }
    }
    LoadBalances();
  }, []);

  //Delete balance
  const handleDeleteBalance = async (id) => {
    setIsDeletingBalances(true);

    try {
      const response = await fetch(
        `https://apex-build.onrender.com/api/v1/balance/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        const errorMessage = resData.message || "Failed to Delete Balances";
        toast.error(errorMessage);
        console.log(errorMessage);
        setIsDeletingBalances(false);
        return;
      }

      toast.success("Balance Deleted Successfully");
      setShowBalances((prevBalances) =>
        prevBalances.filter((balance) => balance._id !== id)
      );
      setIsDeletingBalances(false);
    } catch (error) {
      toast.error("Unexpected Error");
      setIsDeletingBalances(false);
    }
  };

  //Update Balances

  return (
    <section className="bg-[#F5F5F5] flex flex-col p-10 ml-20 w-full gap-5">
      <section className="bg-white p-4 shadow-md rounded-md w-1/2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <h1 className="text-neutral-900 font-medium sm:text-[35px]">
            Balances
          </h1>
          <Select
            className="w-full"
            placeholder="Select project..."
            isClearable
            options={projectsOptions}
            value={projectsOptions.find(
              (selectedProject) => selectedProject.value === projectId.projectId
            )}
            onChange={(selectedProject) => {
              setProjectId(() => ({
                projectId: selectedProject ? selectedProject.value : "",
              }));
              setSelectedOption(selectedProject);
            }}
          />
        </div>
      </section>

      <div className="bg-gray-100 border shadow rounded-lg p-4 flex flex-col">
        <div className="flex justify-between">
          <button
            className="flex items-center gap-2 bg-white shadow-md px-8 py-2 rounded-md mb-3"
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
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-[#18202e] text-white mb-3 px-6 py-2 rounded-md transition-all duration-300 hover:bg-gray-500">
                + Create Balance
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] md:max-w-[650px]">
              <DialogHeader>
                <DialogTitle>Create Balance</DialogTitle>
                <DialogDescription>
                  Fill the form to create balance. Click + Create Balance when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Select
                  placeholder="Item Description"
                  type="text"
                  className="w-full mb-2 rounded h-[30px] md:h-[35px] lg:h-[40px] border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Select
                  placeholder="Project"
                  type="text"
                  className="w-full mb-2 rounded h-[30px] md:h-[35px] lg:h-[40px] border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  placeholder="Good Condition QTY"
                  type="number"
                  className="w-full mb-2 rounded h-[30px] md:h-[35px] lg:h-[40px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2 md:pl-3"
                />
                <input
                  placeholder="Maintenance Condition QTY"
                  type="number"
                  className="w-full mb-2 rounded h-[30px] md:h-[35px] lg:h-[40px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2 md:pl-3"
                />
                <input
                  placeholder="Waste Condition QTY"
                  type="number"
                  className="w-full mb-2 rounded h-[30px] md:h-[35px] lg:h-[40px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2 md:pl-3"
                />
              </div>
              <DialogFooter>
                <button
                  type="submit"
                  className="bg-[#18202e] text-white mb-2 px-6 py-2 rounded-md transition-all duration-300 hover:bg-gray-500"
                >
                  + Create Balance
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                <div className="flex justify-between items-center my-3 px-1">
                  <Select
                    isClearable
                    className="custom-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    placeholder="Item Description"
                  />
                  <Select
                    isClearable
                    className="custom-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    placeholder="Item Code"
                  />

                  <Select
                    isClearable={true}
                    placeholder="Conditions"
                    className="custom-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    classNamePrefix="react-select"
                  />

                  <Select
                    isClearable
                    className="custom-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    placeholder="Total QTY"
                  />

                  <Select
                    isClearable
                    className="custom-select"
                    classNamePrefix="react-select"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    placeholder="Actual QTY"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {isLoadingBalances ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-[20px]">Loading...</h1>
          </div>
        ) : (
          <div className="bg-white border shadow rounded-lg p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 w-2 tracking-wider"
                  >
                    Item Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 w-[30px] tracking-wider"
                  >
                    Item Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Good QTY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Maintenance QTY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Waste QTY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Total QTY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                  >
                    Actual QTY
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedOption ? (
                  balancePerProject.length > 0 ? (
                    balancePerProject.map((balance, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.itemDescription.itemDescription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.itemDescription.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.good}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.maintenance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.waste}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.totQTY}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {balance.actQTY}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="flex justify-center items-center h-full">
                      <td className="text-[20px]">No Balance Founds</td>
                    </tr>
                  )
                ) : showBalances.length > 0 ? (
                  showBalances.map((balance, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.itemDescription.itemDescription}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.itemDescription.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.good}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.maintenance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.waste}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.totQTY}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {balance.actQTY}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="flex justify-center items-center h-full">
                    <td className="text-[20px]">No Balance Founds</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Balance;
