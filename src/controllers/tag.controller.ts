import { Request, Response } from "express";
import { ITag } from "../interfaces/tag.interface";
import slugify from "slugify";
import { findAll, save } from "../services/tag.service";
import { TagModel } from "../models/tag.model";

export const create = async (req: Request, res: Response) => {
  try {
    const payload: ITag = req.body;

    payload.slug = slugify(payload.name);

    const result: TagModel = await save(payload);

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Comment created.",
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

export const list = async (req: Request, res: Response) => {
  try {
    const result: TagModel[] = await findAll();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Success.",
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
