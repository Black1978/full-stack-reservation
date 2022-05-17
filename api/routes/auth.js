import express from "express";
import { register } from "../controllers/auth.js ";

const router = express.Router();

router.post("/registration", register);

export default router;
