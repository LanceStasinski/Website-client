import React, { createRef, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import classes from "./CreatePost.module.css";
import { Content } from "../../shared/hooks/post-hook";

const InputFields: React.FC<{
  inputNumber: number;
  onRemove: (fieldNumber: number) => void;
  prevContent?: Content;
}> = (props) => {
  const [selectValue, setSelectValue] = useState(
    props.prevContent ? props.prevContent.type : "paragraph"
  );
  const [contentValue, setContentValue] = useState(
    props.prevContent ? props.prevContent.text : ""
  );
  const [altValue, setAltValue] = useState(
    props.prevContent ? props.prevContent.alt : ""
  );
  const [languageValue, setLanguageValue] = useState(
    props.prevContent ? props.prevContent.language : ""
  );

  const typeRef = createRef<HTMLSelectElement>();
  const contentRef = createRef<HTMLTextAreaElement>();
  const altRef = createRef<HTMLInputElement>();
  const langRef = createRef<HTMLInputElement>();

  const selectChangeHandler = () => {
    setSelectValue(typeRef.current!.value);
  };
  const contentChangeHandler = () => {
    setContentValue(contentRef.current!.value);
  };
  const altChangeHandler = () => {
    setAltValue(altRef.current!.value);
  };
  const langChangeHandler = () => {
    setLanguageValue(langRef.current!.value);
  };

  return (
    <section className="input-section">
      <div className={classes["section-header"]}>
        <h3>Content #{props.inputNumber}</h3>
        <Button
          type="button"
          danger
          id={`removeContent${props.inputNumber}`}
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
        value={selectValue}
        ref={typeRef}
        onChange={selectChangeHandler}
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
        ref={contentRef}
        value={contentValue}
        onChange={contentChangeHandler}
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
        ref={altRef}
        value={altValue}
        onChange={altChangeHandler}
      />
      <label htmlFor={`language${props.inputNumber}`}>
        Code language (if applicable):
      </label>
      <input
        type="text"
        name={`language${props.inputNumber}`}
        id={`language${props.inputNumber}`}
        ref={langRef}
        value={languageValue}
        onChange={langChangeHandler}
      />
    </section>
  );
};

export default InputFields;
