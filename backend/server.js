import express from "express";
import cors from "cors";
import { readData } from "./utils/db.js";
import productsRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import ordersRouter from "./routes/orders.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/orders", ordersRouter);

app.get("/api/categories", (req, res) => {
  const products = readData("products");
  res.json([...new Set(products.map((p) => p.category))]);
});

app.listen(PORT, () => console.log(`API disponible sur http://localhost:${PORT}/api`));
