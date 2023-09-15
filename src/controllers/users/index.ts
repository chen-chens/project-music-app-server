import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ res:", res);
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ req:", req);
};

const createUser = (req: Request, res: Response) => {
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ res:", res);
  console.log("🚀 ~ file: index.ts:6 ~ router.get ~ req:", req);
};

export default {
  getUser,
  createUser,
};
