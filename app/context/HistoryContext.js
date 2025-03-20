import React, {createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STRINGS} from '../constants';

const HistoryContext = createContext();

export const HistoryProvider = ({children}) => {
  const [history, setHistory] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState(STRINGS.usd);
  const [baseAmount, setBaseAmount] = useState('0');
  const historyRef = useRef(history);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(
          STRINGS.conversionHistory,
        );
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedBaseAmount = await AsyncStorage.getItem(STRINGS.baseAmount);
        console.log(`storedBaseAmount=${storedBaseAmount ?? ''}`);
        if (storedBaseAmount) {
          setBaseAmount(storedBaseAmount);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedBaseCurrency = await AsyncStorage.getItem(
          STRINGS.baseCurrency,
        );
        console.log(`storedBaseCurrency=${storedBaseCurrency ?? ''}`);
        if (storedBaseCurrency) {
          setBaseCurrency(storedBaseCurrency);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    historyRef.current = history;
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem(
          STRINGS.conversionHistory,
          JSON.stringify(history),
        );
      } catch (error) {
        console.error('Error saving history:', error);
      }
    };
    saveHistory();
  }, [history]);

  useEffect(() => {
    const saveBaseCurrency = async () => {
      try {
        await AsyncStorage.setItem(STRINGS.baseCurrency, baseCurrency);
      } catch (error) {
        console.error('Error saving base currency:', error);
      }
    };
    saveBaseCurrency();
  }, [baseCurrency]);

  useEffect(() => {
    const saveBaseAmount = async () => {
      try {
        await AsyncStorage.setItem(STRINGS.baseAmount, baseAmount);
      } catch (error) {
        console.error('Error saving base amount:', error);
      }
    };
    saveBaseAmount();
  }, [baseAmount]);

  const isDuplicate = conversion => {
    return historyRef.current.some(
      item =>
        item.amount === conversion.amount &&
        item.baseCurrency === conversion.baseCurrency,
    );
  };

  const addConversion = conversion => {
    if (!isDuplicate(conversion)) {
      setHistory(prev => [
        {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          ...conversion,
        },
        ...prev,
      ]);
    } else {
      console.log('Object with the same values already exists.');
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        baseCurrency,
        baseAmount,
        addConversion,
        setBaseCurrency,
        setBaseAmount,
      }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
