import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

type Props = {
  id?: string;
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  to?: string;
  exact?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: any;
  disabled?: boolean;
  className?: string;
  arrayNumber?: number;
};

const Button: React.FC<Props> = (props) => {
  if (props.href) {
    return (
      <a
        className={`
          ${props.className}
          ${classes.button}
          ${classes[`button--${props.size || "default"}`]}
          ${props.inverse && classes["button--inverse"]}
          ${props.danger && classes["button--danger"]}
        `}
        href={props.href}
        id={props.id}
        target="_blank"
        rel="noopener noreferrer"
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`
          ${props.className}
          ${classes.button}
          ${classes[`button--${props.size || "default"}`]}
          ${props.inverse && classes["button--inverse"]}
          ${props.danger && classes["button--danger"]}
        `}
        id={props.id}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`
        ${props.className}
        ${classes.button}
        ${classes[`button--${props.size || "default"}`]}
        ${props.inverse && classes["button--inverse"]}
        ${props.danger && classes["button--danger"]}
      `}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

export default Button;
