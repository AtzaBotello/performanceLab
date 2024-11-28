// TodoScreen.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import TaskItem from "./TaskItem";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: task, completed: false },
    ]);
    setTask("");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View>
      <TextInput
        placeholder="New Task"
        value={task}
        onChangeText={setTask}
        testID="taskInput"
      />
      <Button title="Add Task" onPress={addTask} testID="addButton" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            id={item.id}
            text={item.text}
            completed={item.completed}
            onComplete={toggleComplete}
            onDelete={deleteTask}
          />
        )}
      />
    </View>
  );
};

export default TodoScreen;
