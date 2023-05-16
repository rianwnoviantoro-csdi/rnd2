import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ILogin, IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { findOneByUsername, save } from "../services/user.service";
import { compare } from "bcrypt";
import { IDecode } from "../interfaces/token.interface";
import { env } from "../configs/env";

export const register = async (req: Request, res: Response) => {
  try {
    const payload: IUser = req.body;

    const duplicate: UserModel = await findOneByUsername(payload.username);

    if (duplicate) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "User already exists.",
        data: [],
      });
    }

    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);

    const result: UserModel = await save(payload);

    delete payload.password;
    delete result.password;

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Account created.",
      data: result,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Something went wrong.",
        data: [],
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const payload: ILogin = req.body;

    const exist: UserModel = await findOneByUsername(payload.username);

    if (!exist) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Account not found.",
        data: [],
      });
    }

    const match: boolean = await compare(payload.password, exist.password);

    if (!match) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Invalid credential.",
        data: [],
      });
    }

    delete payload.password;
    delete exist.password;

    const tokenpayload: IDecode = {
      id: exist.id,
      username: exist.username,
    };

    const accessToken: string = await jwt.sign(tokenpayload, env.secret, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Logged in.",
      data: { token: accessToken },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Something went wrong.",
        data: [],
      });
    }
  }
};
