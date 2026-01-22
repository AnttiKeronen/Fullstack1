import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => res.send("API running fine"));
app.use("/api/users", userRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expenses", expenseRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
await connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`Backend rocking around here : http://localhost:${PORT}`));
