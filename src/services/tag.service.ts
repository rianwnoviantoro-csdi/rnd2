import { getRepository } from "typeorm";
import { ITag } from "../interfaces/tag.interface";
import { TagModel } from "../models/tag.model";

export const save = async (payload: ITag) => {
  const repo = getRepository(TagModel);
  return await repo.save(payload);
};

export const findOneById = async (id: string) => {
  const repo = getRepository(TagModel);
  return await repo.findOne({ where: { id } });
};

export const findAll = async () => {
  const repo = getRepository(TagModel);

  return await repo.find();
};
