import { createContext } from "react";

import { Reference, Content, Post } from "../hooks/post-hook";

export const PostContext = createContext({
  post: {} as Post | undefined,
  setContext: (
    id: string,
    title: string,
    blurb: string,
    content: Content[],
    references: Reference[]
  ) => {},
  clearContext: () => {},
});
