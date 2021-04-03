import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider, AdminContext, AdminProvider } from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PlacesProvider>
          <AdminProvider>
            <Main/>
          </AdminProvider>
        </PlacesProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

