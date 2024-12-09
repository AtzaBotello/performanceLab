// __tests__/ProfileScreen.test.tsx
import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import ProfileScreen from "../screens/ProfileScreen";

import {it, expect} from '@jest/globals';
 
it("ProfileScreen component renders correctly", () => {
  const tree = render(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});