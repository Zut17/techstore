import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.status(501).json({ message: "Non implémenté" }));

export default router;
