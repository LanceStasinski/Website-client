import React from "react";
import { render } from "@testing-library/react";

import SideDrawer from './SideDrawer';

describe("SideDrawer component", () => {
  const drawerRoot = global.document.createElement("div");
  drawerRoot.setAttribute("id", "drawer-hook");
  const body = global.document.querySelector("body");
  body?.appendChild(drawerRoot);

  const backdropRoot = global.document.createElement("div");
  backdropRoot.setAttribute("id", "backdrop-hook");
  body?.appendChild(backdropRoot);

  test('renders aside', () => {
    render(<SideDrawer show={true} onClick={() => {}}/>)
    const asideElement = document.getElementsByTagName('aside');
    expect(asideElement[0]).toBeInTheDocument();
  })
})