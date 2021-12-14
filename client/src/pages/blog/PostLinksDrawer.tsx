import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./PostLinksDrawer.module.css";

const PostLinksDrawer: React.FC<{ show: boolean; onHoverAway: () => void; onClick: () => void }> = (
  props
) => {
  const nodeRef = useRef(null);
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside
        ref={nodeRef}
        onMouseLeave={props.onHoverAway}
        onClick={props.onClick}
        className={classes["links-drawer"]}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );

  const linksHook = document.getElementById("bloglinks-hook") as HTMLElement;
  return ReactDOM.createPortal(content, linksHook);
};

export default PostLinksDrawer;
