import React, { useState, createRef } from "react";

import Button from "../../shared/components/FormElements/Button";
import classes from "./CreatePost.module.css";
import { Reference } from "../../shared/hooks/post-hook";

const ReferenceFields: React.FC<{
  refNumber: number;
  onRemove: (fieldNumber: number) => void;
  prevRefs?: Reference;
}> = (props) => {
  const [authors, setAuthors] = useState(
    props.prevRefs ? props.prevRefs.authors : ""
  );
  const [date, setDate] = useState(props.prevRefs ? props.prevRefs.date : "");
  const [title, setTitle] = useState(
    props.prevRefs ? props.prevRefs.title : ""
  );
  const [url, setUrl] = useState(props.prevRefs ? props.prevRefs.url : "");

  const authorRef = createRef<HTMLInputElement>();
  const dateRef = createRef<HTMLInputElement>();
  const titleRef = createRef<HTMLInputElement>();
  const urlRef = createRef<HTMLInputElement>();

  const authorChangeHandler = () => {
    setAuthors(authorRef.current!.value);
  };
  const dateChangeHandler = () => {
    setDate(dateRef.current!.value);
  };
  const titleChangeHandler = () => {
    setTitle(titleRef.current!.value);
  };
  const urlChangeHandler = () => {
    setUrl(urlRef.current!.value);
  };

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
        ref={authorRef}
        value={authors}
        onChange={authorChangeHandler}
        type="text"
        placeholder="Last Name, First Initial., Last Name, First Initial."
      />
      <label htmlFor={`date${props.refNumber}`}>Date:</label>
      <input
        type="text"
        name={`date${props.refNumber}`}
        ref={dateRef}
        value={date}
        onChange={dateChangeHandler}
        id={`date${props.refNumber}`}
      />
      <label htmlFor={`title${props.refNumber}`}>Title:</label>
      <input
        type="text"
        name={`title${props.refNumber}`}
        ref={titleRef}
        value={title}
        onChange={titleChangeHandler}
        id={`title${props.refNumber}`}
      />
      <label htmlFor={`url${props.refNumber}`}>Url:</label>
      <input
        type="url"
        name={`url${props.refNumber}`}
        ref={urlRef}
        value={url}
        onChange={urlChangeHandler}
        id={`url${props.refNumber}`}
      />
    </section>
  );
};

export default ReferenceFields;
