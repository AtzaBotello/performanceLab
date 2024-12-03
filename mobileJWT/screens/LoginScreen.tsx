import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { login } from "../services/AuthService";

const LoginScreen: React.FC = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const MIN_USERNAME_LENGTH = 3;
  const MIN_PASSWORD_LENGTH = 6;

  const validateInputs = (): boolean => {
    if (username.length < MIN_USERNAME_LENGTH) {
      setError(`Username must be at least ${MIN_USERNAME_LENGTH} characters long.`);
      return false;
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    setError("");

    if (!validateInputs()) {
      return;
    }

    try {
      await login(username, password);
      navigation.navigate("Profile");
    } catch (err) {
      console.error("Login error:", err);
      
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 8,
  },
});

export default LoginScreen;
