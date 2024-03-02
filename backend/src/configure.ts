import * as session from "express-session";
import { INestApplication } from "@nestjs/common";

export const configureApp = (app: INestApplication) => {
  app.enableCors({ credentials: true, origin: "http://localhost:3000" });
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: true,
    }),
  );
};
