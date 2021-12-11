import React, { useReducer, Reducer, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import classes from "./CreatePost.module.css";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import InputFields from "./InputFields";
import ReferenceFields from "./ReferenceFields";

const REST_API = process.env.REACT_APP_REST_API;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const form = document.forms[0];
      const formData = new FormData(form);

      const date = new Date();
      const month = MONTHS[date.getMonth()];
      const day = date.getDate().toString();
      const year = date.getFullYear().toString();

      formData.append("month", month);
      formData.append("day", day);
      formData.append("year", year);
      formData.append("numContent", state.contentFields.length.toString());
      formData.append("numReferences", state.refFields.length.toString());

      await sendRequest(`${REST_API}/blog/create-post`, "POST", formData, {
        Authorization: "Bearer " + authCtx.token,
      });
      history.push("/blog");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.wrapper}>
        <Card className={classes["create-post"]}>
          {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default CreatePost;
