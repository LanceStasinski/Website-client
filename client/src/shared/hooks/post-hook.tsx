import { useState, useCallback } from "react";

export interface Content {
  type: string;
  text?: string;
  image?: {
    key: string;
    bucket: string;
  };
  alt?: string;
  _id: string;
  language?: string;
}

export interface Reference {
  authors: string;
  date: string;
  title: string;
  url: string;
}

export interface Post {
  title: string;
  blurb: string;
  content: Content[];
  references: Reference[];
}

export const usePost = () => {
  const [post, setPost] = useState<Post>();

  const setContext = useCallback(
    (
      title: string,
      blurb: string,
      content: Content[],
      references: Reference[]
    ) => {
      const postContent = { title, blurb, content, references };
      setPost(postContent);
    },
    []
  );

  const clearContext = useCallback(() => {
    setPost(undefined);
  }, []);

  return { post, setContext, clearContext };
};
