import { getRepository } from "typeorm";
import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

export const save = async (payload: IUser) => {
  const repo = getRepository(UserModel);
  return await repo.save(payload);
};

export const findOneByUsername = async (username: string) => {
  const repo = getRepository(UserModel);
  return await repo.findOne({ where: { username } });
};

export const findOneById = async (id: string) => {
  const repo = getRepository(UserModel);
  return await repo.findOne({ where: { id } });
};
