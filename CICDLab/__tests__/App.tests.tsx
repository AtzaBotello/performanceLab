// __tests__/App.test.tsx
import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import App from "../../App";

import {it, expect} from '@jest/globals';
 
it("App component renders correctly", () => {
  const tree = render(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});