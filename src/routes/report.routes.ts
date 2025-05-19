import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Report route is working!");
});

export default router;
