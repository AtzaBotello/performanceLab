import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

type TaskItemProps = {
  id: string;
  text: string;
  completed: boolean;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ id, text, completed, onComplete, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textDecorationLine: completed ? "line-through" : "none",
        }}
        testID={`taskText-${id}`}
      >
        {text}
      </Text>
      <Button title="Complete" onPress={() => onComplete(id)} testID={`completeButton-taskText-${id}`} />
      <Button title="Delete" onPress={() => onDelete(id)} testID={`deleteButton-taskText-${id}`} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default TaskItem;