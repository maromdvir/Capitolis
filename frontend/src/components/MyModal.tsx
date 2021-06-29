import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

export type myModalPropsType = {
  title: string;
  show: boolean;
  component: JSX.Element;
  onHide: () => void;
};


const MyModal = (props: myModalPropsType) => {
  return (
    <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>{props.component}</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
