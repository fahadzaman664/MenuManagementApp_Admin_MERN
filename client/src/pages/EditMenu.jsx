import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // better than radix import
import { useUpdateMenuMutation } from "@/features/user.slice";
import { toast } from "sonner";

const EditMenu = ({ menu, onClose }) => {
  const [formData, setFormData] = useState({
    menuName: "",
    price: "",
    category: "",
    stockStatus: "",
    description: "",
    file: null,
  });
  const [image, setImage] = useState(null);
  const [updateMenu, { isLoading }] = useUpdateMenuMutation();

  // Pre-fill form when menu changes
  useEffect(() => {
    if (menu) {
      setFormData({
        menuName: menu.name || "",
        price: menu.price || "",
        category: menu.category || "",
        stockStatus: menu.stockstatus || "",
        description: menu.description || "",
        file: null,
      });
      setImage(menu.image || null);
    }
  }, [menu]);

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
        setImage(event.target.result); // preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("name", formData.menuName);
    newFormData.append("price", formData.price);
    newFormData.append("category", formData.category);
    newFormData.append("stockstatus", formData.stockStatus);
    newFormData.append("description", formData.description);
    if (formData.file) newFormData.append("file", formData.file);

    try {
      const response = await updateMenu({ id: menu._id, formData: newFormData }).unwrap();
      if (response.success) {
        toast.success("Menu updated successfully!");
        onClose(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update menu");
    }
  };

  return (
    <Dialog open={!!menu} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Menu - {menu?.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name & Price */}
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="menuName">Menu Name</Label>
              <Input
                id="menuName"
                name="menuName"
                type="text"
                value={formData.menuName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Category & Stock */}
          <div className="flex gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-1/2 px-4 py-2 border rounded-md">
                {formData.category || "Select Category"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {["sandwich", "salad", "rice", "chicken"].map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setFormData((p) => ({ ...p, category: cat }))}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-1/2 px-4 py-2 border rounded-md">
                {formData.stockStatus || "Stock Status"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFormData((p) => ({ ...p, stockStatus: "inStock" }))}
                >
                  In Stock
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFormData((p) => ({ ...p, stockStatus: "outOfStock" }))}
                >
                  Out of Stock
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Ingredients and Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Preview */}
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}

          {/* Upload */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" name="file" type="file" onChange={handleChange} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
