import React, {createContext, useState, useEffect, useRef } from 'react';
import { saveItem, loadStateItem } from '../services/StorageService';
import {STRINGS} from '../constants';

const HistoryContext = createContext();

export const HistoryProvider = ({children}) => {
  const [history, setHistory] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState(STRINGS.usd);
  const [baseAmount, setBaseAmount] = useState('0');
  const historyRef = useRef(history);

  useEffect(() => {
    loadStateItem(STRINGS.conversionHistory, setHistory);
  }, []);

  useEffect(() => {
    loadStateItem(STRINGS.baseAmount, setBaseAmount);
  }, []);

  useEffect(() => {
    loadStateItem(STRINGS.baseCurrency, setBaseCurrency);
  }, []);

  useEffect(() => {
    historyRef.current = history;
    saveItem(STRINGS.conversionHistory, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    saveItem(STRINGS.baseCurrency, baseCurrency);
  }, [baseCurrency]);

  useEffect(() => {
    saveItem(STRINGS.baseAmount, baseAmount);
  }, [baseAmount]);

  const isDuplicate = conversion => {
    return historyRef.current.some(item => item.amount === conversion.amount && item.baseCurrency === conversion.baseCurrency);
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
    <HistoryContext.Provider value={{ history, baseCurrency, baseAmount, addConversion, setBaseCurrency, setBaseAmount}}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
