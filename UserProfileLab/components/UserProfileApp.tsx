import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "../services/ApiService";
import { debounce } from 'lodash';

const UserProfilesScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error, refetch } = useQuery(
    {
        queryKey: ["users", searchTerm],
        queryFn: () => fetchUsers(searchTerm),
        retry: 3,
        staleTime: 1000 * 60 * 5,
    }
  );

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchTerm(text);
      refetch();
    }, 500),
    []
  );

  const handleSearch = (text: string) => {
    debouncedSearch(text);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading users...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching users."}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <TextInput
            placeholder="Search users..."
            style={styles.searchBar}
            onChangeText={handleSearch}
        />
        <Button
            title="Clean"
            onPress={() => setSearchTerm("")}
        />
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.userItem}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            )}
        />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  userItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
});

export default UserProfilesScreen;