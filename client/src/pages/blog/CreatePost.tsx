import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import classes from "./CreatePost.module.css";
import Button from "../../shared/components/FormElements/Button";

const InputFields: React.FC<{ inputNumber: number }> = (props) => {
  return (
    <section>
      <div className={classes["section-header"]}>
        <h3>Content #{props.inputNumber + 1}</h3>
        <Button type="button" danger>
          Remove
        </Button>
      </div>
      <label htmlFor={`types${props.inputNumber}`}>Content Type:</label>
      <select
        name={`types${props.inputNumber}`}
        id={`types${props.inputNumber}`}
      >
        <option value="paragraph">Paragraph</option>
        <option value="image">Image</option>
        <option value="code">Code</option>
        <option value="heading">Heading</option>
      </select>
      <label htmlFor={`content${props.inputNumber}`}>Content:</label>
      <textarea name="content" id={`content${props.inputNumber}`} />
      <label htmlFor={`alt${props.inputNumber}`}>
        Alternative text (if applicable):
      </label>
      <input
        type="text"
        name={`alt${props.inputNumber}`}
        id={`alt${props.inputNumber}`}
      />
    </section>
  );
};

const ReferenceFields: React.FC<{ refNumber: number }> = (props) => {
  return (
    <section>
      <div className={classes["section-header"]}>
        <h3>Reference #{props.refNumber + 1}</h3>
        <Button type="button" danger>
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
        type="text"
        name={`url${props.refNumber}`}
        id={`url${props.refNumber}`}
      />
    </section>
  );
};
const CreatePost: React.FC = () => {
  const [contentFields, setContentFields] = useState([1]);
  const [refFields, setRefFields] = useState([1]);

  const addContent = () => {
    setContentFields([...contentFields, 1]);
  };

  const addReference = () => {
    setRefFields([...refFields, 1]);
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes["create-post"]}>
        <header>
          <h2>Create Post</h2>
        </header>
        <form>
          <section>
            <h3>Heading information</h3>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="blurb">Blurb:</label>
            <textarea name="blurb" id="blurb" />
          </section>
          {contentFields.map((num, index) => {
            return <InputFields key={`content${index}`} inputNumber={index} />;
          })}
          <Button
            type="button"
            className={classes["add-btn"]}
            onClick={addContent}
          >
            Add Content
          </Button>
          {refFields.map((num, index) => {
            return <ReferenceFields key={`ref${index}`} refNumber={index} />;
          })}
          <Button
            type="button"
            className={classes["add-btn"]}
            onClick={addReference}
          >
            Add Reference
          </Button>
          <Button type="submit" className={classes["submit-btn"]}>
            CREATE
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
