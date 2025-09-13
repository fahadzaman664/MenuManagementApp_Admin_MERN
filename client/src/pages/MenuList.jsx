import {
  useFetchMenusQuery,
  usePlaceOrderMutation,
} from "@/features/user.slice";
import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import EditMenu from "./EditMenu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const MenuList = () => {
  const { data, error, isLoading } = useFetchMenusQuery();
  const [placeOrder] = usePlaceOrderMutation(); // 👈 RTK Query mutation
  const user = useSelector((state) => state.user.userInfo);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [address, setAddress] = useState("");
  const [currentMenu, setCurrentMenu] = useState(null);

  const menus = data?.menu || [];

  const handleOpenOrderDialog = (menu) => {
    setCurrentMenu(menu);
    setShowAddressDialog(true);
  };

  const handleSaveAddress = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }

    try {
      const res = await placeOrder({
        itemname: currentMenu.name,
        description: currentMenu.category,
        price: currentMenu.price,
        address: address,
      }).unwrap();

      if (res.success) {
        toast.success(`Order placed successfully: ${res.message}`);
        setShowAddressDialog(false);
        setAddress("");
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="flex flex-wrap justify-between space-x-4 space-y-8 px-20 py-10">
      {isLoading && <p>Loading menus...</p>}
      {error && <p>Error loading menus</p>}

      {menus.map((menu) => (
        <div className="flex flex-col items-center w-40" key={menu._id}>
          {/* Image */}
          <div className="relative z-10 -mb-6">
            <img
              className="rounded-full object-cover border border-gray-300 shadow-lg w-30 h-30"
              src={menu.image}
              alt={menu.name}
            />
          </div>

          {/* Card */}
          <div className="w-48 h-64 bg-white rounded-lg border p-2 shadow-2xl relative">
            {/* Title & Category */}
            <div className="mt-8 text-center w-full flex flex-col gap-2">
              <p className="text-lg font-medium text-[#172b4c]">{menu.name}</p>
              <p className="capitalize">{menu.category}</p>
              <p className="text-sm text-gray-500">${menu.price}</p>
            </div>

            {/* Admin Buttons */}
            {user.role === "admin" && (
              <div className="absolute bottom-2 left-2 w-full flex gap-4 justify-start">
                <div className="flex flex-col gap-2 mx-1">
                  <span
                    className="flex items-center justify-center rounded-full bg-pink-300 w-8 h-8 cursor-pointer hover:bg-pink-500"
                    onClick={() => setSelectedMenu(menu)}
                  >
                    <Pencil size={16} className="text-white" />
                  </span>
                  <p className="text-sm">Edit</p>
                </div>

                <div className="flex flex-col gap-2 mx-2">
                  <span className="flex items-center justify-center rounded-full bg-pink-300 w-8 h-8 cursor-pointer hover:bg-pink-500">
                    <Trash2 size={16} className="text-white" />
                  </span>
                  <p className="text-sm">Delete</p>
                </div>

                <div className="flex flex-col gap-2 mx-2">
                  <span className="flex items-center justify-center rounded-full bg-pink-300 w-8 h-8 cursor-pointer hover:bg-pink-500">
                    <Eye size={16} className="text-white" />
                  </span>
                  <p className="text-sm">View</p>
                </div>
              </div>
            )}

            {/* Place Order for Users */}
            {user.role === "user" && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                <Button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  onClick={() => handleOpenOrderDialog(menu)}
                >
                  Place Order
                </Button>
              </div>
            )}
          </div>

          {/* Edit Menu Dialog */}
          {selectedMenu && (
            <EditMenu
              menu={selectedMenu}
              onClose={() => setSelectedMenu(null)}
            />
          )}
        </div>
      ))}

      {/* Address Dialog */}
      {showAddressDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4">
              Enter Delivery Address
            </h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
              rows="3"
              placeholder="Enter your address"
            />
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowAddressDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-500 text-white hover:bg-green-600"
                onClick={handleSaveAddress}
              >
                Save & Place Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
