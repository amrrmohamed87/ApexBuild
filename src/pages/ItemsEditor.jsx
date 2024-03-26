import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItemsInput from "@/components/ItemsInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemsEditor() {
  //Create Items States
  const [createItems, setCreateItems] = useState({
    itemDescription: "",
    code: "",
    Weight: "",
    sellingPrice: "",
    purchasingPrice: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  //Create Items Function
  function handleCreateItemChange(event) {
    const { name, value } = event.target;
    setCreateItems((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(createItems);
  }

  const handleCreateItems = async (event) => {
    event.preventDefault();
    setIsCreating(true);

    try {
      const respone = await fetch(
        "https://apex-build.onrender.com/api/v1/item-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createItems),
        }
      );
      const resData = await respone.json();

      if (!respone.ok) {
        const errorMessage = resData.message || "Could not Create Item";
        toast.error(errorMessage);
        console.log(errorMessage);
        setIsCreating(false);
        return;
      }

      toast.success("Created Successfully");
      setCreateItems({
        itemDescription: "",
        code: "",
        Weight: "",
        sellingPrice: "",
        purchasingPrice: "",
      });
      setIsCreating(false);
    } catch (error) {
      toast.error("Unexpected Error");
      setIsCreating(false);
    }
  };

  //Get Items
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function LoadItems() {
      setIsFetching(true);

      try {
        const response = await fetch(
          "https://apex-build.onrender.com/api/v1/item-description"
        );
        const resData = await response.json();
        console.log(resData);

        if (!response.ok) {
          const errorMessage = resData.message || "Could not fetch balances";
          toast.error(errorMessage);
          setIsFetching(false);
          return;
        }

        setItems(resData.data);
        setIsFetching(false);
      } catch (error) {
        toast.error("unexpected error");
        setIsFetching(false);
      }
    }
    LoadItems();
  }, []);
  return (
    <main>
      <h1 className="text-black text-center mt-20 mb-8">Items Editor</h1>
      <section></section>
      <section>
        <ToastContainer />
        <Tabs
          defaultValue="account"
          className="w-[400px] md:w-[600px] m-2 md:ml-80"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Create</TabsTrigger>
            <TabsTrigger value="update">Update</TabsTrigger>
            <TabsTrigger value="delete">Delete</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Create Items</CardTitle>
                <CardDescription>
                  Add new items here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form method="post" onSubmit={handleCreateItems}>
                  <div className="bg-white rounded-md">
                    <ItemsInput
                      label="Item Description"
                      id="itemDescription"
                      type="text"
                      name="itemDescription"
                      value={createItems.itemDescription}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Code"
                      id="code"
                      type="text"
                      name="code"
                      value={createItems.code}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Weight"
                      id="Weight"
                      type="text"
                      name="Weight"
                      value={createItems.Weight}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Selling Price"
                      id="sellingPrice"
                      type="text"
                      name="sellingPrice"
                      value={createItems.sellingPrice}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Purchasing Price"
                      id="purchasingPrice"
                      type="text"
                      name="purchasingPrice"
                      value={createItems.purchasingPrice}
                      onChange={handleCreateItemChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="bg-black text-white px-6 py-2 rounded-md"
                  >
                    {isCreating ? "Creating..." : "Create"}
                  </button>
                </form>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="update">
            <Card>
              <CardHeader>
                <CardTitle>Create Items</CardTitle>
                <CardDescription>
                  Update items here. Click update when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form method="post" onSubmit={handleCreateItems}>
                  <div className="bg-white rounded-md">
                    <ItemsInput
                      label="Item Description"
                      id="itemDescription"
                      type="text"
                      name="itemDescription"
                      value={createItems.itemDescription}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Code"
                      id="code"
                      type="text"
                      name="code"
                      value={createItems.code}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Weight"
                      id="Weight"
                      type="text"
                      name="Weight"
                      value={createItems.Weight}
                      onChange={handleCreateItemChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="bg-black text-white px-6 py-2 rounded-md"
                  >
                    {isCreating ? "updating..." : "Update"}
                  </button>
                </form>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="delete">
            <Card>
              <CardHeader>
                <CardTitle>Delete Items</CardTitle>
                <CardDescription>
                  Delete items here. Click delete when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form method="post" onSubmit={handleCreateItems}>
                  <div className="bg-white rounded-md">
                    <ItemsInput
                      label="Item Description"
                      id="itemDescription"
                      type="text"
                      name="itemDescription"
                      value={createItems.itemDescription}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Code"
                      id="code"
                      type="text"
                      name="code"
                      value={createItems.code}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Weight"
                      id="Weight"
                      type="text"
                      name="Weight"
                      value={createItems.Weight}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Selling Price"
                      id="sellingPrice"
                      type="text"
                      name="sellingPrice"
                      value={createItems.sellingPrice}
                      onChange={handleCreateItemChange}
                    />
                    <ItemsInput
                      label="Purchasing Price"
                      id="purchasingPrice"
                      type="text"
                      name="purchasingPrice"
                      value={createItems.purchasingPrice}
                      onChange={handleCreateItemChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="bg-black text-white px-6 py-2 rounded-md"
                  >
                    {isCreating ? "Deleting..." : "Delete"}
                  </button>
                </form>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default ItemsEditor;
