import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, this is an auth endpoint!");
});

router.get("/registration", (req, res) => {
    res.send("Hello, this is an auth registration endpoint!");
});

export default router;
