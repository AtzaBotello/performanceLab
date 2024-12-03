import * as Keychain from "react-native-keychain";

// Mock API response for demonstration purposes
const MOCK_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exampleToken.signature";

export const login = async (username: string, password: string): Promise<boolean> => {
  if (username === "user" && password === "password") {
    try {
      const token = MOCK_JWT;

      await Keychain.setGenericPassword("auth-token", token);

      return true;
    } catch (error) {
      console.error("Error storing JWT:", error);
      throw new Error("Login failed. Please try again.");
    }
  } else {
    throw new Error("Invalid credentials");
  }
};

export const logout = async (): Promise<void> => {
  try {
    // Clear the stored JWT
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error("Error clearing JWT:", error);
    throw new Error("Logout failed. Please try again.");
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    // Retrieve the stored JWT
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error("Error retrieving JWT:", error);
    return null;
  }
};