// This code creates a dynamic form that can take in different data types to
// build a new blog post. You can see this form in action here:
// https://www.lancestasinski.com/portfolio/more-info
import React, {
  useReducer,
  Reducer,
  useState,
  FormEvent,
  useContext,
  createRef,
} from "react";
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
import { PostContext } from "../../shared/context/post-context";

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

// reducer function that controls the number of content and reference fields in
// the form
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
  const postCtx = useContext(PostContext);
  const history = useHistory();
  const prevPost = postCtx.post; // if updating a post, prevPost will not be undefined

  // set up two-way binding for information in the heading of a post
  const [title, setTitle] = useState(prevPost ? prevPost.title : "");
  const [blurb, setBlurb] = useState(prevPost ? prevPost.blurb : "");
  const [tags, setTags] = useState(prevPost ? prevPost.tags : "");
  const [headImg, setHeadImg] = useState(prevPost ? prevPost.headImg : "");
  const [headImgCaption, setHeadImgCaption] = useState(
    prevPost ? prevPost.headImgCaption : ""
  );
  const [headImgAlt, setHeadImgAlt] = useState(
    prevPost ? prevPost.headImgAlt : ""
  );
  const titleRef = createRef<HTMLInputElement>();
  const blurbRef = createRef<HTMLTextAreaElement>();
  const tagsRef = createRef<HTMLInputElement>();
  const headImgRef = createRef<HTMLInputElement>();
  const headImgCaptionRef = createRef<HTMLInputElement>();
  const headImgAltRef = createRef<HTMLInputElement>();

  let numCont: number[] = [];
  let numRef: number[] = [];
  // display the correct number of content and reference fields when updating
  // a post
  if (prevPost) {
    numCont = prevPost!.content.map((item, index) => index + 1);
    numRef = prevPost!.references.map((item, index) => index + 1);
  }

  const initialState = {
    contentFields: prevPost ? numCont : [1],
    refFields: prevPost ? numRef : [1],
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

  // onChange Handlers for two-way binding
  const titleChangeHandler = () => {
    setTitle(titleRef.current!.value);
  };

  const blurbChangeHandler = () => {
    setBlurb(blurbRef.current!.value);
  };

  const tagChangeHandler = () => {
    setTags(tagsRef.current!.value);
  };

  const headImgChangeHandler = () => {
    setHeadImg(headImgRef.current!.value);
  };

  const headImgCaptionChangeHandler = () => {
    setHeadImgCaption(headImgCaptionRef.current!.value);
  };

  const headImgAltChangeHandler = () => {
    setHeadImgAlt(headImgAltRef.current!.value);
  };

  // create a FormData object for multipart content and send a POST request to the
  // REST API if creating a post, and a PATCH request if updating the post
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let responseData;

    const form = document.forms[0];
    const formData = new FormData(form);

    const date = new Date();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate().toString();
    const year = date.getFullYear().toString();

    formData.append("month", month);
    formData.append("day", day);
    formData.append("year", year);
    formData.append("numContent", Math.max(...state.contentFields).toString());
    formData.append("numReferences", Math.max(...state.refFields).toString());

    // if updating a post, re-attach the AWS image keys to the form data
    // (if stored images were present in the post)
    if (prevPost) {
      prevPost.content.forEach((item, index) => {
        if (item.image) {
          formData.append(`imageKey${index}`, item.image.key);
        }
      });
    }

    const route = prevPost
      ? `${REST_API}/blog/update/${prevPost!.id}`
      : `${REST_API}/blog/create-post`;

    const reqType = prevPost ? "PATCH" : "POST";
    try {
      responseData = await sendRequest(route, reqType, formData, {
        Authorization: "Bearer " + authCtx.token,
      });
    } catch (error) {}

    if (responseData) {
      history.push("/blog");
    }
  };

  const cancelEditHandler = () => {
    postCtx.clearContext();
    history.goBack();
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
          {prevPost && (
            <div className={classes["cancel-edit"]}>
              <Button type="button" onClick={cancelEditHandler} danger>
                CANCEL EDIT
              </Button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <section>
              <h3>Heading information</h3>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                ref={titleRef}
                value={title}
                onChange={titleChangeHandler}
              />
              <label htmlFor="blurb">Blurb:</label>
              <textarea
                name="blurb"
                id="blurb"
                ref={blurbRef}
                value={blurb}
                onChange={blurbChangeHandler}
              />
              <label htmlFor="tags">Tags:</label>
              <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Tag1, tag2"
                ref={tagsRef}
                value={tags}
                onChange={tagChangeHandler}
              />
              <label htmlFor="headImg">Header image URL:</label>
              <input
                type="text"
                id="headImg"
                name="headImg"
                ref={headImgRef}
                value={headImg}
                onChange={headImgChangeHandler}
              />
              <label htmlFor="headImgAlt">Alternative text:</label>
              <input
                type="text"
                id="headImgAlt"
                name="headImgAlt"
                ref={headImgAltRef}
                value={headImgAlt}
                onChange={headImgAltChangeHandler}
              />
              <label htmlFor="headImgCaption">Caption:</label>
              <input
                type="text"
                id="headImgCaption"
                name="headImgCaption"
                placeholder="Credit: John Doe from Unsplash"
                ref={headImgCaptionRef}
                value={headImgCaption}
                onChange={headImgCaptionChangeHandler}
              />
            </section>

            {state.contentFields.map((item) => (
              <InputFields
                key={`content${item}`}
                inputNumber={item}
                onRemove={removeContentHandler}
                prevContent={prevPost && prevPost.content[item - 1]}
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
                prevRefs={prevPost && prevPost.references[item - 1]}
              />
            ))}
            <Button
              type="button"
              className={classes["add-btn"]}
              onClick={onAddReference}
            >
              Add Reference
            </Button>
            {!prevPost && (
              <Button type="submit" className={classes["submit-btn"]}>
                CREATE
              </Button>
            )}
            {prevPost && (
              <Button type="submit" className={classes["submit-btn"]}>
                UPDATE
              </Button>
            )}
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CreatePost;
