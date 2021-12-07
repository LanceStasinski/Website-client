import React from "react";

import Button from "../../shared/components/FormElements/Button";
import classes from "./CreatePost.module.css";

const ReferenceFields: React.FC<{
  refNumber: number;
  onRemove: (fieldNumber: number) => void;
}> = (props) => {
  return (
    <section className="reference-section">
      <div className={classes["section-header"]}>
        <h3>Reference #{props.refNumber}</h3>
        <Button
          type="button"
          danger
          onClick={() => props.onRemove(props.refNumber)}
        >
          Remove
        </Button>
      </div>

      <label htmlFor={`authors${props.refNumber}`}>Authors:</label>
      <input
        name={`authors${props.refNumber}`}
        id={`authors${props.refNumber}`}
        type="text"
        placeholder="Last Name, First Initial., Last Name, First Initial."
      />
      <label htmlFor={`date${props.refNumber}`}>Date:</label>
      <input
        type="text"
        name={`date${props.refNumber}`}
        id={`date${props.refNumber}`}
      />
      <label htmlFor={`title${props.refNumber}`}>Title:</label>
      <input
        type="text"
        name={`title${props.refNumber}`}
        id={`title${props.refNumber}`}
      />
      <label htmlFor={`url${props.refNumber}`}>Url:</label>
      <input
        type="url"
        name={`url${props.refNumber}`}
        id={`url${props.refNumber}`}
      />
    </section>
  );
};

export default ReferenceFields;
