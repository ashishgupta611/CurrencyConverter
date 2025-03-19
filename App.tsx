import React from 'react';
import { HistoryProvider } from './app/context/HistoryContext';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  return (
    <HistoryProvider>
      <AppNavigator />
    </HistoryProvider>
  );
}