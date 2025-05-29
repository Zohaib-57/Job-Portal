import express, { application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/userRoute.js";
import companyRoutes from "./routes/companyRoute.js";
import jobRoutes from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";

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
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
