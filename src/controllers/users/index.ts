import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../../models/userSchema";

const logIn = async (req: Request, res: Response) => {
  /**
   * (1) 檢查必填項目 與 信箱格式 驗證
   * (2) 檢查 DB 有無資料
   * (3) 比對密碼正確性
   * (4) 回傳結果，標頭傳入 token
   * */

  const { password, email } = req.body;
  try {
    if (!password || !email) {
      res.status(400).json({ err: "Required Vules!" });
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ err: "InValid Vules!" });
    }

    const targetUser = await User.findOne({ email });
    if (!targetUser) {
      res.status(404).json({ err: "Account does not existing!" });
    }
    const comparePasswordResult = await bcrypt.compare(password, targetUser?.password || "");
    if (!comparePasswordResult) {
      res.status(401).json({ err: "Unauthorization Access!" });
    }

    const token = jwt.sign({ id: targetUser?.id }, process.env.JWT_SECRET_KEY!);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.json({
      name: targetUser?.name,
      email: targetUser?.email,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const createUser = async (req: Request, res: Response) => {
  /**
   * (1) 檢查必填項目 與 信箱格式 驗證
   * (2) 檢查 DB 有無 相同 email
   * (3) 加密密碼，新建一筆資料進 DB
   * (4) 回傳結果，標頭傳入 token
   * */
  const { password, email, name } = req.body;

  try {
    if (!password || !email) {
      res.status(400).json({ err: "Required Vules!" });
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({ err: "InValid Vules!" });
    }
    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
      res.status(400).json({ err: "Account has Existed!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 12);
    const newData = new User({
      email,
      name,
      password: encryptedPassword,
    });
    const newUser = await User.create(newData);
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY!, { expiresIn: process.env.JWT_EXPIRED_IN });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(201).json({
      name: newUser?.name,
      email: newUser?.email,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default {
  logIn,
  createUser,
};
