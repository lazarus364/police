import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserList from './components/UserList';
import PostList from './components/PostList';
import Navbar from './components/Navbar';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <UserList />
            <PostList />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
