import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import classes from "./Blog.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import BlogList from "./BlogList";

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;
const REST_API = process.env.REACT_APP_REST_API;

const DUMMY_POSTS = [
  {
    id: "b1",
    title: "First Post",
    date: new Date(),
    blurb: "Blurb about the first post",
    content: [
      {
        type: "paragraph",
        content: "This is a paragraph",
      },
      {
        type: "image",
        content:
          "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-970-80.jpg.webp",
        alt: "mountains",
      },
      {
        type: "heading",
        content: "This is a heading",
      },
      {
        type: "code",
        content: `const x = "this is some code"
console.log(x)`,
        language: "javascript",
      },
    ],
    references: [
      {
        authors: "Author 1, Author 2",
        date: "2020",
        title: "title",
        url: '"https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html",',
      },
    ],
  },
  {
    id: "b2",
    title: "Second Post",
    date: new Date(),
    blurb: "Blurb about second post",
    content: [
      {
        type: "paragraph",
        content: "This is a paragraph",
      },
      {
        type: "image",
        content:
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fgeographical.co.uk%2Fmedia%2Fk2%2Fitems%2Fcache%2F852c2fa5e5468761c3ae8b796ca9be85_XL.jpg&imgrefurl=https%3A%2F%2Fgeographical.co.uk%2Fplaces%2Fmountains%2Fitem%2F4092-predicting-the-formation-of-a-new-mountain-range&tbnid=hycyKgKyqq8cEM&vet=12ahUKEwjP1bWr96n0AhUNn3IEHdZRDLkQMygCegUIARDNAQ..i&docid=xvhN3XUItyJIDM&w=1200&h=645&itg=1&q=mountain&ved=2ahUKEwjP1bWr96n0AhUNn3IEHdZRDLkQMygCegUIARDNAQ",
        alt: "mountains",
      },
      {
        type: "heading",
        content: "This is a heading",
      },
      {
        type: "paragraph",
        content: "Another paragraph",
      },
      {
        type: "code",
        content: 'const x = "this is some more code" \n console.log(x)',
        language: "javascript",
      },
    ],
    references: [
      {
        authors: "Author 1, Author 2",
        date: "2020",
        title: "title",
        url: '"https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html",',
      },
    ],
  },
  {
    id: "b3",
    title: "Third Post",
    date: new Date(),
    blurb: "Blurb about the third post",
    content: [
      {
        type: "paragraph",
        content: "This is a paragraph",
      },
      {
        type: "image",
        content:
          "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-970-80.jpg.webp",
        alt: "mountains",
      },
      {
        type: "heading",
        content: "This is a heading",
      },
      {
        type: "code",
        content: `const x = "this is some code"
console.log(x)`,
        language: "javascript",
      },
    ],
    references: [
      {
        authors: "Author 1, Author 2",
        date: "2020",
        title: "title",
        url: '"https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html",',
      },
    ],
  },
  {
    id: "b4",
    title: "Fourth Post",
    date: new Date(),
    blurb: "Blurb about the fourth post",
    content: [
      {
        type: "paragraph",
        content: "This is a paragraph",
      },
      {
        type: "image",
        content:
          "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf-970-80.jpg.webp",
        alt: "mountains",
      },
      {
        type: "heading",
        content: "This is a heading",
      },
      {
        type: "code",
        content: `const x = "this is some code"
console.log(x)`,
        language: "javascript",
      },
    ],
    references: [
      {
        authors: "Author 1, Author 2",
        date: "2020",
        title: "title",
        url: '"https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html",',
      },
    ],
  },
];

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

export interface PostHeading {
  _id: string;
  title: string;
  blurb: string;
  month: string;
  day: string | number;
  year: string | number;
}

const Blog: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.token && authCtx.userId === ADMIN_USER;
  const [loadedPosts, setLoadedPosts] = useState<PostHeading[]>();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const responseData = await sendRequest(`${REST_API}/blog/posts`);
        setLoadedPosts(responseData.posts);
      } catch (error) {}
    };
    getPosts();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className={classes.blog}>
        <h2>BLOG</h2>
        <hr />
        {isLoading && <LoadingSpinner asOverlay={false} />}
        {!isLoading && <BlogList posts={loadedPosts} />}
        {isAdmin && (
          <div className={classes["add-post"]}>
            <Link to="/blog/create">Add Post</Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Blog;
