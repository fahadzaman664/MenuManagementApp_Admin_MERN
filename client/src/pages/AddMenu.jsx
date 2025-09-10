import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAddMenuMutation } from "@/features/user.slice";

const AddMenu = () => {
  const [formData, setFormData] = useState({
    menuName: "",
    price: "",
    category: "",
    stockStatus: "",
    description: "",
    file: null,
  });

  const [addMenu, { isLoading }] = useAddMenuMutation();
  const [image, setImage] = useState(null);

  // handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStockStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, stockStatus: status }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // build FormData for file upload
    const newFormData = new FormData();
    newFormData.append("name", formData.menuName);
    newFormData.append("price", formData.price);
    newFormData.append("category", formData.category);
    newFormData.append("stockstatus", formData.stockStatus);
    newFormData.append("description", formData.description);
    newFormData.append("file", formData.image);

    if ([...newFormData.values()].some((field) => !field)) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      const response = await addMenu(newFormData).unwrap();

      if (response.success) {
        toast.success("Menu added successfully!");
        setFormData({
          menuName: "",
          price: "",
          category: "",
          stockStatus: "",
          description: "",
          file: null,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add menu", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 mb-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4  w-[700px]  border-2 shadow-sm bg-white p-12 rounded-xl"
      >
        {/* Menu Name + Price */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Label className="text-xl text-[#1e4269]" htmlFor="menuName">
              Menu Name
            </Label>
            <Input
              className="max-w-max p-4 border-2 bg-white ring-0 shadow-sm"
              type="text"
              name="menuName"
              id="menuName"
              value={formData.menuName}
              placeholder="Menu Name"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xl text-[#1e4269]" htmlFor="price">
              Price
            </Label>
            <Input
              className="max-w-max p-4 border-2 bg-white ring-0 shadow-sm"
              type="number"
              placeholder="$ Price"
              name="price"
              value={formData.price}
              id="price"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Category + Stock Status */}
        <div className="flex justify-start items-center space-x-50 mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-50 cursor-pointer text-sm font-medium px-4 py-2 bg-white border shadow-sm rounded-md hover:bg-gray-100 text-[#1e4269]">
              {formData.category || "Select Category"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-50 text-xl">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleCategoryChange("sandwich")}
              >
                Sandwich
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange("salad")}>
                Salad
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange("rice")}>
                Rice
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange("chicken")}>
                Chicken
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 w-50 py-2 text-sm font-medium bg-white border text-[#1e4269] rounded-md shadow-sm hover:bg-gray-100 cursor-pointer">
              {formData.stockStatus || "Stock Status"}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-50 text-xl">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleStockStatusChange("inStock")}
              >
                In Stock
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStockStatusChange("outOfStock")}
              >
                Out of Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <div className="mt-8">
          <Label htmlFor="description" className="text-xl text-[#1e4269]">
            Ingredients and Description
          </Label>
          <Textarea
            className="mt-4 w-150 h-40 border-2 shadow-xl bg-white overflow-y-auto p-4"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mt-4 w-40 h-40 object-cover rounded-lg"
          />
        )}

        {/* Upload Image + Submit */}
        <div className="mt-4 justify-center items-center">
          <Label htmlFor="image" className="text-xl text-[#1e4269]">
            Upload Image
          </Label>
          <Input
            id="image"
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-2 block h-14 cursor-pointer rounded-lg border border-gray-300 bg-purple-600 text-white text-lg 
              file:mr-4 file:rounded-lg file:border-0 file:bg-blue-500 file:px-2 file:mt-2 file:text-lg file:h-8
              file:font-semibold file:text-white hover:file:bg-blue-600"
          />

          <Button
            type="submit"
            className="mt-4 mx-50 w-48 py-7 rounded-2xl cursor-pointer bg-[#4c95dd] hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Add / Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
