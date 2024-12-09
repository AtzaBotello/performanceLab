// __tests__/HomeScreen.test.tsx
import React from "react";
import HomeScreen from "../screens/HomeScreen";


import { render, fireEvent } from "@testing-library/react-native";

import {it, expect} from '@jest/globals';
 
it("HomeScreen component renders correctly", () => {
  const tree = render(<HomeScreen navigation={{}} />).toJSON();
  expect(tree).toMatchSnapshot();
});