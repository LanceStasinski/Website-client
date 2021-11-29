import React, { useContext } from "react";

import classes from "./Blog.module.css";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER;

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

const Blog: React.FC = () => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.token && authCtx.userId === ADMIN_USER;
  return (
    <div className={classes.blog}>
      <h2>BLOG</h2>
      <hr />
      <ul className={classes.posts}>
        {DUMMY_POSTS.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/blog/${post.id}`}>
                <Card className={classes["blog-card"]}>
                  <header>
                    <h3 className={classes['blog-title']}>{post.title}</h3>
                    <h3 className={classes['blog-title']}>{`${
                      MONTHS[post.date.getMonth()]
                    } ${post.date.getDate()}, ${post.date.getFullYear()}`}</h3>
                  </header>
                  <article>{post.blurb}</article>
                  <footer>
                    <p>click to read more</p>
                  </footer>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
      {isAdmin && (
        <div className={classes["add-post"]}>
          <Link to='/blog/create'>Add Post</Link>
        </div>
      )}
    </div>
  );
};

export default Blog;
