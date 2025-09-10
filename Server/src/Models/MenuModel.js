import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";
const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
    category:{
        type:String,
        enum:["sandwich","salad","rice","chicken"],
        default:"sandwich"
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