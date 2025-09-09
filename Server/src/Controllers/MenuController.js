import Menu from '../Models/MenuModel.js';
import { cloudinary } from '../config/CloudinaryConfig.js';

export const createMenu = async (req, res) => {
    try {
        const { name, price, description, category, stockstatus } = req.body;
        if ([name, price, description, stockstatus, category].some(fields => !fields)) {
            return res.status(404).send("please fill all the required fields");
        }
        const filepath = req.file?.path;
        console.log(filepath)
        if (!filepath) {
            return res.status(404).send("No file path included");
        }

        const cloudinaryRes = await cloudinary.uploader.upload(filepath, {
            folder: 'NodeJs Mastery Course'
        })
        console.log(cloudinaryRes);
        const newMenu = await new Menu({
            name, price, image: cloudinaryRes.secure_url, description, category, stockstatus
        })
        await newMenu.save();

        res.status(200).json({ success: true, message: "menu item addedd succefuly", menu: newMenu })

    } catch (error) {
        console.error("Error in createMenu:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


export const updateMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = {};
        const { name, price, description, stockstatus, category } = req.body;
        if (name) {
            updates.name = name;
        }
        if (price) updates.price = price;
        if (description) updates.description = description;
        if (stockstatus) updates.stockstatus = stockstatus;
        if (category) updates.stockstatus = category;


        const filepath = req.file?.path;
        if (req.file?.path) {
            const cloudinaryRes = await cloudinary.uploader.upload(filepath, {
                folder: 'NodeJs Mastery Course'
            })
            updates.image = cloudinaryRes.secure_url;

            console.log(updates.image)
        }
        // ⚡ Prevent frontend from overriding image with empty string/null
        // if ("image" in req.body && !req.file) {
        //     delete updates.image;
        // }

        const updatedMenu = await Menu.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        )

        if (!updatedMenu) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }
        res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            menu: updatedMenu,
        });

    } catch (error) {
        console.error("Error in createMenu:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const fetchAllMenu = async (req, res) => {
    try {
        const fetchedMenu = await Menu.find();
        res.status(200).json({ success: true, menu: fetchedMenu });
    } catch (error) {
        console.error("Error in fetchAllMenu:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const deleteMenu = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedMenu = await Menu.findByIdAndDelete(id);

        if (!deletedMenu) {
            return res.status(404).json({
                success: false,
                message: "Menu item not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Menu deleted successfully",
            menu: deletedMenu
        });
    } catch (error) {
        console.error("Error in deleteMenu:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
