import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import ResponseError from "./api/models/ResponseError";
import transactionsRoutes from "./api/routes/transactions";
import cors from "cors";
import { json } from "body-parser";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(json());

app.use("/transactions", transactionsRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  next({ status: 404, message: "Not found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const err: ResponseError = {
    status: error.status || 500,
    message: error.message || "Something went wrong",
    stack: error.stack && undefined,
  };
  res.status(err.status);
  res.json(err);
});

export default app;
