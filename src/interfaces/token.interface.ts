import { Request } from "express";
import { JwtPayload } from "jwt-decode";

export interface IDecode extends JwtPayload {
  id: string;
  username: string;
}

export interface RequestWithUserProfile extends Request {
  profile?: IDecode;
}
