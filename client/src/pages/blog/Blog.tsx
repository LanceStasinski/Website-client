import React, { useContext } from "react";

import classes from "./Blog.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Post from "./Post";

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;

const DUMMY_POSTS = [
  {
    title: "First Post",
    date: new Date(),
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
        content: 'const x = "this is some code" \n console.log(x)',
      },
    ],
    citation: {
      text: "this is a citation",
      linkUrl:
        "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html",
    },
  },
  {
    title: "Second Post",
    date: new Date(),
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
      },
    ],
    citation: {
      text: "this is a citation",
      linkUrl:
        "https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/in_text_citations_the_basics.html",
    },
  },
];

const Blog: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.token && authCtx.userId === ADMIN_USER;
  console.log(isAdmin);
  return (
    <div className={classes.blog}>
      <h2>BLOG</h2>
      <hr />
      {DUMMY_POSTS.map((post) => {
        return (
          <Post
            title={post.title}
            date={post.date}
            content={post.content}
            citation={post.citation}
          />
        );
      })}
      {isAdmin && <Button>Add Post</Button>}
    </div>
  );
};

export default Blog;
