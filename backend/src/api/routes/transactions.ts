import express, { Request, Response, NextFunction } from "express";
import Transaction from "../models/Transaction";
import TransactionSchema from "../schemas/transaction";

const router = express.Router();
const tradingParty = "me";

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const transactions: Transaction[] = await TransactionSchema.validateAsync(
    //   req.body.transactions
    // );
    const transactions = req.body.transactions;
    const counterpartyAmountObj: { [counterparty: string]: number } = {};

    for (const t of transactions) {
      counterpartyAmountObj[t.counterparty] = 0;
    }

    transactions.forEach(
      (t: Transaction) => (counterpartyAmountObj[t.counterparty] += t.amount)
    );

    const result: Transaction[] = [];

    for (const [counterparty, amount] of Object.entries(counterpartyAmountObj)) {
      result.push({
        tradingParty,
        counterparty,
        amount,
      });
    }
    console.log(`${JSON.stringify(req.body.transactions)} ==> ${JSON.stringify(result)}`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
