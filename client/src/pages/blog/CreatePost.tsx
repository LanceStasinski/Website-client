import React, { useReducer, Reducer, FormEvent } from "react";

import Card from "../../shared/components/UIElements/Card";
import classes from "./CreatePost.module.css";
import Button from "../../shared/components/FormElements/Button";

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
      <label htmlFor={`content${props.inputNumber}`}>Content:</label>
      <textarea name="content" id={`content${props.inputNumber}`} />
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
        type="text"
        name={`url${props.refNumber}`}
        id={`url${props.refNumber}`}
      />
    </section>
  );
};

type State = {
  contentFields: number[];
  refFields: number[];
};

type Action = {
  type: "ADD" | "REMOVE";
  payload: { inputType: "content" | "reference"; fieldNumber?: number };
};

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD":
      if (action.payload.inputType === "content") {
        state = {
          ...state,
          contentFields: state.contentFields.concat(
            state.contentFields.length > 0
              ? state.contentFields[state.contentFields.length - 1] + 1
              : 1
          ),
        };
      } else if (action.payload.inputType === "reference") {
        state = {
          ...state,
          refFields: state.refFields.concat(
            state.refFields.length > 0
              ? state.refFields[state.refFields.length - 1] + 1
              : 1
          ),
        };
      }
      return state;
    case "REMOVE":
      if (action.payload.inputType === "content") {
        state = {
          ...state,
          contentFields: state.contentFields.filter(
            (item) => item !== action.payload.fieldNumber
          ),
        };
      }
      if (action.payload.inputType === "reference") {
        state = {
          ...state,
          refFields: state.refFields.filter(
            (item) => item !== action.payload.fieldNumber
          ),
        };
      }
      return state;
  }
};

const CreatePost: React.FC = () => {
  const initialState = {
    contentFields: [1],
    refFields: [1],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onAddContent = () => {
    dispatch({ type: "ADD", payload: { inputType: "content" } });
  };

  const onAddReference = () => {
    dispatch({ type: "ADD", payload: { inputType: "reference" } });
  };

  const removeContentHandler = (fieldNumber: number) => {
    dispatch({
      type: "REMOVE",
      payload: { inputType: "content", fieldNumber },
    });
  };

  const removeRefHandler = (fieldNumber: number) => {
    dispatch({
      type: "REMOVE",
      payload: { inputType: "reference", fieldNumber },
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const title = document.getElementById("title") as HTMLInputElement;
    const blurb = document.getElementById("blurb") as HTMLTextAreaElement;
    const date = new Date();

    const content = [];
    for (const input of state.contentFields) {
      const select = document.getElementById(
        `types${input}`
      ) as HTMLSelectElement;
      const text = document.getElementById(
        `content${input}`
      ) as HTMLTextAreaElement;
      const fileInput = document.getElementById(
        `image${input}`
      ) as HTMLInputElement;
      const formData = new FormData();
      formData.append("image", fileInput.value as string | Blob);
      const altInput = document.getElementById(
        `alt${input}`
      ) as HTMLInputElement;
      const languageInput = document.getElementById(
        `language${input}`
      ) as HTMLInputElement;

      const fieldData = {
        type: select.value,
        content: text.value,
        image: formData,
        alt: altInput.value,
        language: languageInput.value,
      };
      content.push(fieldData);
    }


    const data = {
      title: title.value,
      blurb: blurb.value,
      date,
      content,
    };

    console.log(data);
    // formData.append('title', title.value);
    // formData.append('blurb', blurb.value);
    // formData.append('date', date.toDateString())
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes["create-post"]}>
        <header>
          <h2>Create Post</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <section>
            <h3>Heading information</h3>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="blurb">Blurb:</label>
            <textarea name="blurb" id="blurb" />
          </section>

          {state.contentFields.map((item) => (
            <InputFields
              key={`content${item}`}
              inputNumber={item}
              onRemove={removeContentHandler}
            />
          ))}
          <Button
            type="button"
            className={classes["add-btn"]}
            onClick={onAddContent}
          >
            Add Content
          </Button>
          {state.refFields.map((item) => (
            <ReferenceFields
              key={`ref${item}`}
              refNumber={item}
              onRemove={removeRefHandler}
            />
          ))}
          <Button
            type="button"
            className={classes["add-btn"]}
            onClick={onAddReference}
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
