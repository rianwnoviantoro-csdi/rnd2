import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { RequestWithUserProfile } from "../interfaces/token.interface";
import { env } from "../configs/env";

export const useAuth = async (
  req: RequestWithUserProfile,
  res: Response,
  next: NextFunction
) => {
  try {
    const header: string =
      <string>req.headers.authorization || <string>req.headers.Authorization;

    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Unauthorized.",
        data: [],
      });
    }

    const token: string = header.split(" ")[1];

    const decoded = await jwt.verify(token, env.secret);

    if (!decoded) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Unauthorized.",
        data: [],
      });
    }

    req.profile = decoded;

    next();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      if (e.name == "TokenExpiredError") {
        return res.status(401).json({
          status: false,
          statusCode: 401,
          message: "Token expired.",
          data: [],
        });
      }

      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Something went wrong.",
        data: [],
      });
    }
  }
};
