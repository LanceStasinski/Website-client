import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./AuthModal.module.css";
import AuthCard from "./AuthCard";
import Backdrop from "../../shared/components/UIElements/Backdrop";

interface Props {
  show: boolean;
  onCancel: () => void;
  backdropClass?: string;
  nodeRef?: React.MutableRefObject<null>;
}

const AuthModalOverlay: React.FC<Props> = (props) => {
  const content = (
    <div className={classes["auth-modal"]} ref={props.nodeRef}>
      <AuthCard onCancel={props.onCancel} />
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("auth-hook") as HTMLElement
  );
};

const AuthModal: React.FC<Props> = (props) => {
  const nodeRef = React.useRef(null);
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop onClick={props.onCancel} backdropClass={classes.backdrop} />
      )}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="modal-transition"
        nodeRef={nodeRef}
      >
        <AuthModalOverlay {...props} nodeRef={nodeRef} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default AuthModal;
