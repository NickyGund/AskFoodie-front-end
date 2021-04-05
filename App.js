import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider, AdminProvider, LocationProvider,CommentProvider } from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <LocationProvider>
          <PlacesProvider>
            <AdminProvider>
              <CommentProvider>
                <Main/>
              </CommentProvider>
            </AdminProvider>
          </PlacesProvider>
        </LocationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

