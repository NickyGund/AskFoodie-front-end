import React from 'react';
import Main from './src/navigation';
import { AuthProvider,ProfileProvider} from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Main />
      </ProfileProvider>
    </AuthProvider>
  );
}

