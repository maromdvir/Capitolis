import { CSSProperties } from "react";
import { Table } from "react-bootstrap";

type transactionsPropsType = {
  transactions: {
    tradingParty: "me";
    counterparty: string;
    amount: number;
  }[];
};

const transactions = (props: transactionsPropsType) => {
  const containerStyles: CSSProperties = {
    margin: "1rem",
    textAlign: "left",
    fontSize: "24px",
  };

  return (
    <div style={containerStyles}>
      <Table bordered>
        <thead>
          <tr>
            <th>Counterparty Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map((t) => (
            <tr>
              <td>{t.counterparty}</td>
              <td>{t.amount > 0 ? t.amount : t.amount * -1}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default transactions;
