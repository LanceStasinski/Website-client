import React from "react";

import { useParams } from "react-router-dom";
import Highlight from "react-highlight";

import classes from "./Post.module.css";

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

const DUMMY_COMMENTS = [
  {
    userId: "u1",
    text: "This is the first comment",
  },
  {
    userId: 'u2',
    text: 'This is the second comment'
  }
];

// interface PostInfo {
//   title: string;
//   date: Date;
//   content: {
//     type: string;
//     content: string;
//     alt?: string;
//     language?: string;
//   }[];
//   references: { authors: string; date: string; title: string; url: string }[];
// }

const Post: React.FC = () => {
  const postId = useParams<{ blogId: string }>().blogId;
  const post = DUMMY_POSTS.find((element) => element.id === postId);
  return (
    <div className={classes.post}>
      <header>
        <h2>{post!.title}</h2>
        <h2>{`${
          MONTHS[post!.date.getMonth()]
        } ${post!.date.getDate()}, ${post!.date.getFullYear()}`}</h2>
      </header>
      <hr />
      <article>
        {post!.content.map((ct) => {
          if (ct.type === "paragraph") {
            return <p>{ct.content}</p>;
          } else if (ct.type === "image") {
            return <img src={ct.content} alt={ct.alt} />;
          } else if (ct.type === "heading") {
            return <h3>{ct.content}</h3>;
          } else if (ct.type === "code") {
            return (
              <pre>
                <code>
                  <Highlight className={ct.language}>{ct.content}</Highlight>
                </code>
              </pre>
            );
          } else {
            return <div>{`Error: Content type ${ct.type} not supported.`}</div>;
          }
        })}
        <div>
          <h3>References</h3>
          <ul>
            {post!.references.map((ref) => {
              return (
                <li key={ref.title}>
                  <cite>
                    {ref.authors}. ({ref.date}). <i>{ref.title}</i>. Retrieved
                    from <a href={ref.url}>{ref.url}</a>
                  </cite>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
      <div>

      </div>
    </div>
  );
};
export default Post;
