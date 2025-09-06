import { timeStamp } from "console";
import mongoose from "mongoose";
const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stockstatus: {
        type: String,
        enum: ["inStock", "outOfStock"],
        default:"inStock"
    }
},{
    timestamps:true
})

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;