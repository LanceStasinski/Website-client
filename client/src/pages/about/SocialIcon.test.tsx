import React from "react";
import { render } from "@testing-library/react";

import SocialIcon from "./SocialIcon";

describe("SocialIcon component", () => {
  test("renders a link and an image", () => {
    render(
      <SocialIcon
        imageUrl="testImage"
        altTxt="testImage"
        socialLink="test.com"
      />
    );
    const linkElements = document.getElementsByTagName("a");
    const imageElements = document.getElementsByTagName("img");
    expect(linkElements.length).toEqual(1);
    expect(imageElements.length).toEqual(1);
  });
});
