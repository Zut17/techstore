import { Router } from "express";
import { readData } from "../utils/db.js";

const router = Router();

router.get("/", (req, res) => {
  const { search, category, sort, limit } = req.query;
  let list = readData("products");

  if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  if (category) list = list.filter((p) => p.category === category);
  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  if (limit) list = list.slice(0, Number(limit));

  res.json(list);
});

router.get("/:id", (req, res) => {
  const product = readData("products").find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Produit introuvable" });
  res.json(product);
});

export default router;