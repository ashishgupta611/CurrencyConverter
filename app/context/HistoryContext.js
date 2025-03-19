import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // Load history from storage on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('conversionHistory');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  // Save history to storage on change
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('conversionHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Error saving history:', error);
      }
    };
    saveHistory();
  }, [history]);

  const addConversion = async (conversion) => {
    setHistory(prev => [
      {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...conversion
      },
      ...prev
    ]);
  };

  return (
    <HistoryContext.Provider value={{ history, addConversion }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;