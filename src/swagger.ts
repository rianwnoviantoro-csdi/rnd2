import swaggerAutogen from "swagger-autogen";
import { env } from "./configs/env";

const outputFile = "./src/swagger.json";
const endpointsFiles = ["./src/routers/index.ts"];

const swaggerOptions = {
  info: {
    title: "Typeorm Express",
    version: "1.0.0",
  },
  host: `http://${env.host}:${env.port}`,
  basePath: "/",
  schemes: ["http"],
};

swaggerAutogen()(outputFile, endpointsFiles, swaggerOptions).then(() => {
  console.log("Swagger file generated");
});
