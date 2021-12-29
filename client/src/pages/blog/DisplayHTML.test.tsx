import React from "react";
import { render} from "@testing-library/react";

import DisplayHTML from "./DisplayHTML";

describe('DisplayHTML component', () => {
  test('renders a p element', () => {
    render(<DisplayHTML text={'Some text to test'} />)
    const pElements = document.getElementsByTagName('p');
    expect(pElements.length).toEqual(1);
  })
})