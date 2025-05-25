import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/userRoute.js";

dotenv.config({});

const app = express();

//sample route
// app.get("/",(req,res)=>{
//     return res.send("Welcome to the backend server!");
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
	origin: "http://localhost:5173",
	credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
