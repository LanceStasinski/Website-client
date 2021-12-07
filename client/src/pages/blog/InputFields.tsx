import React from "react";

import Button from "../../shared/components/FormElements/Button";
import classes from "./CreatePost.module.css";

const InputFields: React.FC<{
  inputNumber: number;
  onRemove: (fieldNumber: number) => void;
}> = (props) => {
  return (
    <section className="input-section">
      <div className={classes["section-header"]}>
        <h3>Content #{props.inputNumber}</h3>
        <Button
          type="button"
          danger
          arrayNumber={props.inputNumber}
          onClick={() => {
            props.onRemove(props.inputNumber);
          }}
        >
          Remove
        </Button>
      </div>
      <label htmlFor={`types${props.inputNumber}`}>Content Type:</label>
      <select
        name={`types${props.inputNumber}`}
        id={`types${props.inputNumber}`}
      >
        <option value="paragraph">Paragraph</option>
        <option value="imageUrl">Image URL</option>
        <option value="image">Image</option>
        <option value="code">Code</option>
        <option value="heading">Heading</option>
      </select>
      <label htmlFor={`text${props.inputNumber}`}>Content:</label>
      <textarea
        name={`text${props.inputNumber}`}
        id={`text${props.inputNumber}`}
      />
      <label htmlFor={`image${props.inputNumber}`}>
        Image (if applicable):
      </label>
      <input
        type="file"
        accept=".jpg, .png, .jpeg, .gif"
        name={`image${props.inputNumber}`}
        id={`image${props.inputNumber}`}
      />
      <label htmlFor={`alt${props.inputNumber}`}>
        Alternative text (if applicable):
      </label>
      <input
        type="text"
        name={`alt${props.inputNumber}`}
        id={`alt${props.inputNumber}`}
      />
      <label htmlFor={`language${props.inputNumber}`}>
        Code language (if applicable):
      </label>
      <input
        type="text"
        name={`language${props.inputNumber}`}
        id={`language${props.inputNumber}`}
      />
    </section>
  );
};

export default InputFields;
