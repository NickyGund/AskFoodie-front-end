import React from 'react';
import Main from './src/navigation';
import { AuthProvider, ProfileProvider, PlacesProvider, CommentProvider} from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PlacesProvider>
          <CommentProvider>
            <Main/>
          </CommentProvider>
        </PlacesProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

