import React from "react";
import {it, describe, expect } from '@jest/globals';
import { render, fireEvent } from "@testing-library/react-native";

import TodoScreen from "./TodoScreen";

describe("TodoScreen", () => {
  it("should add a new task when the add button is pressed", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <TodoScreen />
    );

    const taskInput = getByPlaceholderText("New Task");
    const addButton = getByTestId("addButton");

    fireEvent.changeText(taskInput, "My first task");

    fireEvent.press(addButton);

    expect(getByText("My first task")).toBeTruthy();
  });

  it("should update the task's text to strikethrough when marked as complete", () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <TodoScreen />
    );

    const taskInput = getByPlaceholderText("New Task");
    const addButton = getByTestId("addButton");
    fireEvent.changeText(taskInput, "Incomplete Task");
    fireEvent.press(addButton);

    const taskText = getByText("Incomplete Task");
    expect(taskText).toBeTruthy();
    expect(taskText.props.style).not.toContainEqual({
      textDecorationLine: "line-through",
    });

    const completeButton = getByTestId(`completeButton-${taskText.props.testID}`);
    fireEvent.press(completeButton);

    expect(taskText.props.style.textDecorationLine).toBe("line-through");
  });

  it("should remove a task from the list when the Delete button is pressed", () => {
    const { getByPlaceholderText, getByTestId, queryByText } = render(
      <TodoScreen />
    );

    const taskInput = getByPlaceholderText("New Task");
    const addButton = getByTestId("addButton");
    fireEvent.changeText(taskInput, "Task to Delete");
    fireEvent.press(addButton);

    const taskText = queryByText("Task to Delete");
    expect(taskText).toBeTruthy();

    const deleteButton = getByTestId(`deleteButton-${taskText?.props.testID}`);
    fireEvent.press(deleteButton);

    expect(queryByText("Task to Delete")).toBeNull();
  });
});
