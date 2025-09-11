import { useFetchMenusQuery } from "@/features/user.slice";
import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import EditMenu from "./EditMenu";
const MenuList = () => {
  const { data, error, isLoading } = useFetchMenusQuery();
  const user = useSelector((state) => state.user.userInfo);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const menus = data?.menu || [];

  return (
    <div className="flex flex-wrap justify-between space-x-4 space-y-8 px-20 py-10">
      {isLoading && <p>Loading menus...</p>}
      {error && <p>Error loading menus</p>}
      {menus.map((menu) => (
        <div className="flex flex-col  items-center w-40" key={menu._id}>
          <div className="relative z-10 -mb-6">
            {" "}
            <img
              className="rounded-full object-cover border-1 border-gray-300 shadow-lg w-30 h-30"
              src={menu.image}
              alt={menu.name}
            />{" "}
          </div>
          <div className="w-48 h-60 bg-white rounded-lg border-1 p-2 shadow-2xl relative">
            {/* Title & Category */}
            <div className="mt-8 text-center justify-center w-full max-h-max flex flex-col gap-2">
              <p className="text-2xl font-normal text-[#172b4c]">{menu.name}</p>
              <p className="capitalize">{menu.category}</p>
            </div>

            {/* Edit/Delete/View buttons */}
            {user.role === "admin" && (
              <div className="absolute bottom-2 left-2 w-full flex gap-4 justify-start">
                <div className="flex flex-col gap-2 justify-between mx-1">
                  <span className="flex items-center justify-center rounded-full bg-pink-300 w-8 h-8 cursor-pointer hover:bg-pink-500 transition-all duration-400">
                    <Pencil
                      size={16}
                      className="text-white"
                      onClick={() => setSelectedMenu(menu)}
                    />
                  </span>
                  <p className="text-sm mx-0.5">Edit</p>
                </div>

                <div className="flex flex-col gap-2 justify-between mx-2">
                  <span className="flex mx-1.5 items-center justify-center rounded-full bg-pink-300 w-8 h-8 cursor-pointer hover:bg-pink-500 transition-all duration-400">
                    <Trash2 size={16} className="text-white" />
                  </span>
                  <p className="text-sm mx-0.5">Delete</p>
                </div>

                <div className="flex flex-col gap-2 justify-between mx-2">
                  <span className="flex items-center justify-center rounded-full bg-pink-300 w-8 h-8 cursor-pointer hover:bg-pink-500 transition-all duration-400">
                    <Eye size={16} className="text-white" />
                  </span>
                  <p className="text-sm">View</p>
                </div>
              </div>
            )}
          </div>

          {selectedMenu && (
            <EditMenu
              menu={selectedMenu}
              onClose={() => setSelectedMenu(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
