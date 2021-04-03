import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider, AdminProvider, LocationProvider } from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LocationProvider>
          <PlacesProvider>
            <AdminProvider>
              <Main/>
            </AdminProvider>
          </PlacesProvider>
        </LocationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

