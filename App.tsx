import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfilesScreen from "./UserProfileLab/components/UserProfileApp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Retry failed queries up to 3 times
      refetchOnWindowFocus: false, // Disable refetching when window regains focus
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <UserProfilesScreen />
    </QueryClientProvider>
  );
};

export default App;