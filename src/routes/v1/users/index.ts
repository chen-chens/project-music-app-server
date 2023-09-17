import express from "express";

import { userControllers } from "../../../controllers";

const router = express.Router();

router.get("/login", userControllers.logIn);
router.post("/signUp", userControllers.createUser);

export default router;
