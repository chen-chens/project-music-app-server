import express from "express";

import { userControllers } from "../../../controllers";

const router = express.Router();

router.get("/login", userControllers.getUser);
router.post("/signUp", userControllers.createUser);

export default router;
