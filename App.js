import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider } from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PlacesProvider>
          <Main/>
        </PlacesProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

