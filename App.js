import React from 'react';
import Main from './src/navigation';
import { AuthProvider,} from './src/context';

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

