import React, { FormEvent, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./Modal.module.css";
import Backdrop from "./Backdrop";

type Props = {
  show: boolean;
  onCancel: () => void;
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  header?: string;
  onSumbit?: () => {};
  contentClass?: string;
  footerClass?: string;
  footer?: ReactNode;
  nodeRef?: React.MutableRefObject<null>;
  backdropClass?: string;
};

const ModalOverlay: React.FC<Props> = (props) => {
  const content = (
    <div
      ref={props.nodeRef}
      className={`${classes["modal"]} ${props.className}`}
      style={props.style}
    >
      <header className={`${classes["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSumbit
            ? props.onSumbit
            : (event: FormEvent) => event.preventDefault()
        }
      >
        <div className={`${classes["modal__content"]} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${classes["modal__footer"]} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

const Modal: React.FC<Props> = (props) => {
  const nodeRef = React.useRef(null);
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop
          onClick={props.onCancel}
          backdropClass={props.backdropClass}
        />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="modal-transition"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} nodeRef={nodeRef} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
