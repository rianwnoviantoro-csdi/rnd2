import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { DBConfig } from "./configs/database";
import { env } from "./configs/env";
import router from "./routers";

const app: Application = express();
const PORT: number = env.port || 3000;
const HOST: string = env.host || "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    status: true,
    statusCode: 200,
    message: "I'm very healhty!",
    data: [],
  });
});

createConnection(DBConfig)
  .then(() => {
    console.log(`Database connection established.`);
    app.listen(PORT, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  })
  .catch((e: unknown) => {
    if (e instanceof Error) {
      console.error(e.message);
    }
  });
