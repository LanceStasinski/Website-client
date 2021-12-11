import { createContext } from "react";

import { Reference, Content, Post } from "../hooks/post-hook";

export const PostContext = createContext({
  post: {} as Post | undefined,
  setContext: (
    title: string,
    blurb: string,
    content: Content[],
    references: Reference[]
  ) => {},
  clearContext: () => {},
});
