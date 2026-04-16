import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeedScreen } from './src/screens/FeedScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FeedScreen />
    </QueryClientProvider>
  );
}
