import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";
import classes from './ErrorModal.module.css';

const ErrorModal: React.FC<{ error: string | undefined; onClear: () => void }> =
  (props) => {
    return (
      <Modal
        onCancel={props.onClear}
        header="An error occurred!"
        show={!!props.error}
        footer={<Button inverse onClick={props.onClear}>Okay</Button>}
        backdropClass={classes['error-backdrop']}
        footerClass={classes['error-footer']}
        style={{border: "1pt solid #f7e0ad", zIndex: 500}}
      >
        <p>{props.error}</p>
      </Modal>
    );
  };

export default ErrorModal;