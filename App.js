import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider, LocationProvider } from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LocationProvider>
          <PlacesProvider>
            <Main/>
          </PlacesProvider>
        </LocationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

