import React, { useState, useEffect } from "react";

import classes from "./MoreInfo.module.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const REST_API = process.env.REACT_APP_REST_API;

const MoreInfo = () => {
  const [videoLink, setVideoLink] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getVideo = async () => {
      try {
        const responseData = await sendRequest(`${REST_API}/more-info`);
        setVideoLink(responseData.videoUrl);
      } catch (error) {}
    };
    getVideo();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay={false} />}
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes["more-info"]}>
        <h1>About This Website</h1>
        <hr />
        <section className={classes["info-section"]}>
          <h2>My Resume</h2>
          <p>
            This website may seem like a standard site, but it is host to a
            variety of features that are not necessarily obvious. First, my
            resume presented on this site was built from <span>HTML</span> and{" "}
            <span>CSS</span>. Visitors can also download a PDF of my resume
            (stored in an <span>AWS S3 bucket</span>) that I created using{" "}
            <span>Figma</span>.
          </p>
          <h2>My Portfolio</h2>
          <p>
            Next, and perhaps most importantly, this site hosts my portfolio
            projects. I built the production version of most of my projects with
            either <span>create-react-app</span> or with <span>Webpack</span>,
            and I statically serve them via my <span>Express</span> server. The
            projects that were built with plain <span>HTML</span>,{" "}
            <span>CSS</span>, and <span>JavaScript</span>, such as my Landing
            Page and Blog projects, are served with special <span>GET</span>{" "}
            routes on the server. The <span>Express</span> server for this
            website also handles backend operations for the Weather Journal,
            Travel App, and Text Sentiment Analysis projects.
          </p>
          <h2>My Blog</h2>
          <p>
            For my blog, I write my posts using a dynamic form that requires
            authorization to access. This form supports <span>strings</span> and{" "}
            <span>files</span>, and each input is set to a specific type
            (paragraph, image, header, code). String data is stored on a{" "}
            <span>MongoDB Atlas</span> database and images are stored in an{" "}
            <span>AWS S3 bucket</span>. Further, I have access to full{" "}
            <span>CRUD</span> operations with each of my posts. When a user
            visits my blog home page or a post, a <span>GET</span> request is
            sent and the requested information is injected appropriately into
            the page. Please watch the video below to see how this process
            works.
          </p>
          <video src={videoLink} controls autoPlay={false} />
          <p>
            The blog also supports a custom-built comment section. A user must
            create a profile to post a comment, and the inputs in the
            login/signup form are validated with <span>react-hook-form</span> on
            the front end and with <span>express-validator</span> and custom
            logic on the backend. Once a user logs in, they can post and delete
            their own comments (stored in <span>MongoDB</span>). If multiple
            users are following a thread, they will see comments update in real
            time thanks to <span>websockets</span>.
          </p>
          <h2>My Contact Page</h2>
          <p>
            Finally, this website has a contact form which anyone can use to
            send me a message. So long as the user's input passes validation on
            the front and backend, their message will emailed to me via{" "}
            <span>SendGrid</span> with all of the information they entered.
          </p>
          <h2>My Code</h2>
          <ul>
            <li>
              Front end -{" "}
              <a href="https://github.com/LanceStasinski/Website-client">
                github.com/LanceStasinski/Website-client
              </a>
            </li>
            <li>
              Back end -{" "}
              <a href="https://github.com/LanceStasinski/Website-server">
                github.com/LanceStasinski/Website-server
              </a>
            </li>
          </ul>
        </section>
      </div>
    </React.Fragment>
  );
};

export default MoreInfo;
