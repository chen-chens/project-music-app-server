import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ res:", res);
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ req:", req);
});

export default router;
