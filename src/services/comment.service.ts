import { getRepository } from "typeorm";
import { IComment } from "../interfaces/comment.interface";
import { CommentModel } from "../models/comment.model";

export const save = async (payload: IComment) => {
  const repo = getRepository(CommentModel);
  return await repo.save(payload);
};

export const findOneById = async (id: string) => {
  const repo = getRepository(CommentModel);
  return await repo.findOne({ where: { id } });
};
