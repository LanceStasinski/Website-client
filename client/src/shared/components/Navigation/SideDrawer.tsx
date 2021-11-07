import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./SideDrawer.module.css";

const SideDrawer: React.FC<{ show: boolean; onClick: () => void }> = (
  props
) => {
  const nodeRef = useRef(null);
  const content = (
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames="slide-in-down"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside
        ref={nodeRef}
        onClick={props.onClick}
        className={classes["side-drawer"]}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );

  const drawerHook = document.getElementById("drawer-hook") as HTMLElement;
  return ReactDOM.createPortal(content, drawerHook);
};

export default SideDrawer;
