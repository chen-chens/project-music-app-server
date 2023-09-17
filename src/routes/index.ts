import express from "express";

import usersRoutes from "./v1/users";

const router = express.Router();

router.use("/v1/users", usersRoutes);

export default router;
