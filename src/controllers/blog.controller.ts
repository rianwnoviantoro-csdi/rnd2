import { Request, Response } from "express";
import { RequestWithUserProfile } from "../interfaces/token.interface";
import { IBlog } from "../interfaces/blog.interface";
import { UserModel } from "../models/user.model";
import { findOneById } from "../services/user.service";
import { findOneById as findOneTagById } from "../services/tag.service";
import slugify from "slugify";
import { findAll, findOneBySlug, save } from "../services/blog.service";
import { BlogModel } from "../models/blog.model";
import { TagModel } from "../models/tag.model";

export const create = async (req: RequestWithUserProfile, res: Response) => {
  try {
    const payload: IBlog = req.body;

    let blogTags: TagModel[] = [];

    if (typeof payload.tags != "undefined") {
      for await (let tagId of payload.tags) {
        let tag: TagModel = await findOneTagById(tagId.toString());
        blogTags.push(tag);
      }

      payload.tags = blogTags;
    }

    const author: UserModel = await findOneById(req.profile?.id);

    delete author.password;

    payload.author = author;
    payload.slug = slugify(payload.title);

    const result: BlogModel = await save(payload);

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Blog created.",
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
    const result: BlogModel[] = await findAll();

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

export const getOne = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const result: BlogModel = await findOneBySlug(slug);

    console.log(result);

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

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const payload: IBlog = req.body;
    const blog: BlogModel = await findOneBySlug(slug);

    let blogTags: TagModel[] = [];

    if (typeof payload.tags != "undefined") {
      for await (let tagId of payload.tags) {
        const tag: TagModel = await findOneTagById(tagId.toString());
        blog.tags = blog.tags.filter((blogTag) => {
          return blogTag.id == tag.id;
        });

        await save(blog);

        blogTags.push(tag);
      }

      payload.id = blog.id;
      payload.tags = blogTags;

      if (payload.title) {
        payload.slug = slugify(payload.title);
      }

      const result: BlogModel = await save(payload);

      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Blog updated.",
        data: result,
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Success.",
      data: payload,
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
