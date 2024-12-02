import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_CACHE_KEY = "cached_users";

export const fetchUsers = async (searchTerm: string): Promise<any[]> => {
    console.log("fetchUsers");
    try {
        const cachedData = await AsyncStorage.getItem(USER_CACHE_KEY);
        let users = cachedData ? JSON.parse(cachedData) : null;

        if (!users) {
          const response = await axios.get("https://jsonplaceholder.typicode.com/users");
          users = response.data;
          await AsyncStorage.setItem(USER_CACHE_KEY, JSON.stringify(users));
        }
    
       if (searchTerm !== "") {
          console.log("searchTerm", searchTerm);
          users = users.filter((user: any) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        return users;
    } catch (error) {
        throw new Error("Unable to fetch or filter user data.");
    }
};

export const getCachedUsers = async (): Promise<any[] | null> => {
  try {
    const cachedData = await AsyncStorage.getItem(USER_CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("Error reading from AsyncStorage:", error);
    return null;
  }
};