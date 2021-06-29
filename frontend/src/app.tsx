import { CSSProperties, useState } from "react";
import Transactions from "./components/Transactions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import MyModal, { myModalPropsType } from "./components/MyModal";
import Form, { formPropsType } from "./components/Form";

const containerStyles: CSSProperties = {
  marginTop: "8rem",
  textAlign: "center",
  fontSize: "24px",
};

interface Transaction {
  tradingParty: "me";
  counterparty: string;
  amount: number;
}

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payingTrans, setPayingTrans] = useState<Transaction[]>([]);
  const [receiveTrans, setReceiveTrans] = useState<Transaction[]>([]);
  const [newTransName, setNewTransName] = useState<string>("");
  const [newTransAmount, setNewTransAmount] = useState<number>(0);
  const [modalShow, setModalShow] = useState(false);

  const onAddTransactionFormSubmit = () => {
    const newTrans: Transaction = {
      amount: newTransAmount,
      counterparty: newTransName,
      tradingParty: "me",
    };

    setTransactions(transactions => [...transactions, newTrans]);
    setPayingTrans(transactions.filter((t) => t.amount < 0));
    setReceiveTrans(transactions.filter((t) => t.amount > 0));

  };

  const payingProps = {
    transactions: payingTrans,
  };
  const receivingProps = {
    transactions: receiveTrans,
  };

  const addTransactionFormProps: formPropsType = {
    onSubmit: () => onAddTransactionFormSubmit(),
    feilds: [
      {
        label: "Name",
        inputAttrs: {
          type: "text",
          required: true,
          placeholder: "Counterparty Name...",
          onChange: (e) => setNewTransName(e.currentTarget.value),
        },
      },
      {
        label: "Amount",
        inputAttrs: {
          type: "number",
          required: true,
          placeholder: "Amount...",
          onChange: (e) => setNewTransAmount(+e.currentTarget.value),
        },
      },
    ],
  };

  const addTransactionModalProps: myModalPropsType = {
    show: modalShow,
    title: "Add new transaction",
    component: <Form {...addTransactionFormProps} />,
    onHide: () => setModalShow(false),
  };

  return (
    <>
      <div style={containerStyles}>
        <Container>
          <Row className="mb-5">
            <Col>
              <Container>
                <h2 className="mb-4">Paying</h2>
                <Transactions {...payingProps} />
              </Container>
            </Col>
            <Col>
              <Container>
                <h2 className="mb-4">Receiving</h2>
                <Transactions {...receivingProps} />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 3, offset: 3 }}>
              <div className="d-grid gap-2">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setModalShow(true)}
                >
                  Add new transaction
                </Button>
              </div>
            </Col>
            <Col md={{ span: 3, offset: 1 }}>
              <div className="d-grid gap-2">
                <Button variant="secondary" size="lg">
                  Compress
                </Button>
              </div>
            </Col>
          </Row>
          <Row><div>{JSON.stringify(transactions)}</div></Row>
          <MyModal {...addTransactionModalProps} />
        </Container>
      </div>
    </>
  );
};

export default App;
