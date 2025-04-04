import React, {createContext, useState, useEffect, useRef } from 'react';
import { saveItem, loadStateItem, loadStateItems } from '../services/StorageService';
import {STRINGS} from '../constants';

const HistoryContext = createContext();

export const HistoryProvider = ({children}) => {
  const [history, setHistory] = useState([]);
  const [currency, setCurrency] = useState(STRINGS.usd);
  const [baseAmount, setBaseAmount] = useState('0');
  const historyRef = useRef(history);

  useEffect(() => {
    loadStateItems(STRINGS.conversionHistory, setHistory);
  }, []);

  useEffect(() => {
    loadStateItem(STRINGS.baseAmount, setBaseAmount);
  }, []);

  useEffect(() => {
    loadStateItem(STRINGS.currency, setCurrency);
  }, []);

  useEffect(() => {
    historyRef.current = history;
    saveItem(STRINGS.conversionHistory, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    saveItem(STRINGS.currency, currency);
  }, [currency]);

  useEffect(() => {
    saveItem(STRINGS.baseAmount, baseAmount);
  }, [baseAmount]);

  const isDuplicate = conversion => {
    return historyRef.current.some(item => item.amount === conversion.amount && item.currency === conversion.currency);
  };

  const addConversion = conversion => {
    if (!isDuplicate(conversion)) {
      setHistory(prev => [{
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
    <HistoryContext.Provider value={{ history, currency, baseAmount, addConversion, setCurrency, setBaseAmount}}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
