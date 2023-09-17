import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import validator from "validator";

import User from "../../models/userSchema";

const getUser = async (req: Request, res: Response) => {
  /**
   * 檢查必填項目
   * 與 DB 互動
   * 回傳結果
   * */

  const { password, email } = req.body;
  if (!password || !email) {
    // 還要加入 email 格式驗證
    res.status(400).json({ err: "Required Vules!" });
  }
  try {
    // 驗證 密碼
    const data = await User.findOne({ email, password }, { password: 0 });
    const token = jwt.sign(password, process.env.JWT_SECRET_KEY!);
    res.json({
      name: data?.name,
      email: data?.email,
      token,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const createUser = async (req: Request, res: Response) => {
  /**
   * (1) 檢查必填項目 與 信箱格式 驗證
   * (2) 檢查 DB 有無 相同 email
   * (3) 加密密碼，新建一筆資料進 DB
   * (4) 回傳結果，包含 token
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
      res.status(400).json({ err: "Account is Existing!" });
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
  getUser,
  createUser,
};
