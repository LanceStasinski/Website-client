import { useState, useCallback } from "react";

export interface Content {
  type: string;
  text?: string;
  image?: {
    key: string;
    bucket: string;
  };
  alt?: string;
  caption?: string;
  _id: string;
  language?: string;
}

export interface Reference {
  authors: string;
  date: string;
  title: string;
  url: string;
  _id: string;
}

export interface Post {
  id: string;
  title: string;
  blurb: string;
  tags: string;
  headImg: string;
  headImgCaption: string;
  headImgAlt: string;
  content: Content[];
  references: Reference[];
}

export const usePost = () => {
  const [post, setPost] = useState<Post>();

  const setContext = useCallback(
    (
      id: string,
      title: string,
      blurb: string,
      tags: string,
      headImg: string,
      headImgCaption: string,
      headImgAlt: string,
      content: Content[],
      references: Reference[]
    ) => {
      const postContent = {
        id,
        title,
        blurb,
        tags,
        headImg,
        headImgCaption,
        headImgAlt,
        content,
        references,
      };
      setPost(postContent);
    },
    []
  );

  const clearContext = useCallback(() => {
    setPost(undefined);
  }, []);

  return { post, setContext, clearContext };
};
