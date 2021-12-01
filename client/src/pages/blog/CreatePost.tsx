import React, {
  useState,
  FormEvent,
  useReducer,
  Reducer,
  ReducerState,
  useEffect,
} from "react";

import Card from "../../shared/components/UIElements/Card";
import classes from "./CreatePost.module.css";
import Button from "../../shared/components/FormElements/Button";

const InputFields: React.FC<{
  inputNumber: number;
  onRemove: (fieldNumber: number) => void;
}> = (props) => {
  return (
    <section>
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

const ReferenceFields: React.FC<{
  refNumber: number;
  onRemove: (fieldNumber: number) => void;
}> = (props) => {
  return (
    <section>
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
            state.contentFields[state.contentFields.length - 1] + 1
          ),
        };
      } else if (action.payload.inputType === "reference") {
        state = {
          ...state,
          refFields: state.refFields.concat(
            state.refFields[state.refFields.length - 1] + 1
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
