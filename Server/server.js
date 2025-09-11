import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./src/config/DataBaseConfig.js";
import cors from 'cors'
import path from "path"
import menuRoutes from "./src/Routes/MenuRoutes.js";
import orderRoutes from "./src/Routes/OrderManagementRoutes.js";
import authRoutes from "./src/Routes/AuthRoutes.js";
dotenv.config();

const app = express();
dbConnect();

//Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use((cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true

})))
app.use('/api/menu', menuRoutes);
app.use('/api/order', orderRoutes)
app.use('/api/auth', authRoutes);

app.use((cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
})))

// routes

// start server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})


