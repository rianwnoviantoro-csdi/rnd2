import { getRepository } from "typeorm";
import { IBlog } from "../interfaces/blog.interface";
import { BlogModel } from "../models/blog.model";

export const save = async (payload: IBlog) => {
  const repo = getRepository(BlogModel);
  return await repo.save(payload);
};

export const findOneBySlug = async (slug: string) => {
  const repo = getRepository(BlogModel);

  return await repo.findOne({
    where: { slug },
    relations: ["tags", "author", "comments", "comments.user"],
    select: {
      tags: {
        id: true,
        name: true,
        slug: true,
      },
      author: {
        id: true,
        username: true,
      },
      comments: {
        id: true,
        body: true,
        user: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const findOneById = async (id: string) => {
  const repo = getRepository(BlogModel);
  return await repo.findOne({
    where: { id },
    relations: ["tags", "author", "comments", "comments.user"],
    select: {
      tags: {
        id: true,
        name: true,
        slug: true,
      },
      author: {
        id: true,
        username: true,
      },
      comments: {
        id: true,
        body: true,
        user: {
          id: true,
          username: true,
        },
      },
    },
  });
};

export const findAll = async () => {
  const repo = getRepository(BlogModel);
  return await repo.find({
    relations: {
      tags: true,
      author: true,
    },
    select: {
      tags: {
        id: true,
        name: true,
        slug: true,
      },
      author: {
        id: true,
        username: true,
      },
    },
  });
};

export const destroy = async (payload: BlogModel) => {
  const repo = getRepository(BlogModel);

  return await repo.remove(payload);
};
