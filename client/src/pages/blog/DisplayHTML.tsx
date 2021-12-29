import React from "react";
import DOMPurify from "dompurify";

const DisplayHTML: React.FC<{ text: string; className?: string }> = (props) => {
  const createMarkup = () => {
    return { __html: DOMPurify.sanitize(props.text) };
  };
  return (
    <p className={props.className} dangerouslySetInnerHTML={createMarkup()} />
  );
};

export default DisplayHTML;
