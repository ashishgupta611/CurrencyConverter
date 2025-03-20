import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import HistoryContext from '../context/HistoryContext';
import {CURRENCY_RATES} from '../constants';
import {styles} from '../styles/CurrencyConverterStyle';

const CurrencyConverterScreen = () => {
  const navigation = useNavigation();

  const {
    baseCurrency,
    baseAmount,
    addConversion,
    setBaseCurrency,
    setBaseAmount,
  } = useContext(HistoryContext);
  const [results, setResults] = useState([]);
  const [amount, setAmount] = useState(baseAmount);
  const baseAmountRef = useRef(baseAmount);
  const baseCurrencyRef = useRef(baseCurrency);

  useEffect(() => {
    setAmount(baseAmount);
  }, [baseAmount]);

  useEffect(() => {
    if (baseAmountRef.current !== baseAmount && baseCurrencyRef.current !== baseCurrency) {
      setResults([]);
    }
    baseAmountRef.current = baseAmount;
    baseCurrencyRef.current = baseCurrency;
  }, [baseAmount, baseCurrency]);

  const getConversions = (conversionAmount) => {
      return Object.entries(CURRENCY_RATES)
        .filter(([currency]) => currency !== baseCurrency)
        .map(([currency, rate]) => ({
          currency,
          value: (
            conversionAmount *
            (rate / CURRENCY_RATES[baseCurrency])
          ).toFixed(2),
        }));
    };

  const handleConvert = useCallback(() => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount == 0) {
      alert('Please enter a valid number');
      return;
    }
    const conversions = getConversions(numericAmount);
    setResults(conversions);
    setBaseAmount(`${amount}`);
    addConversion({baseCurrency, amount: numericAmount, conversions});
  }, [baseCurrency, amount]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Currency Converter</Text>
      <Picker
        selectedValue={baseCurrency}
        onValueChange={setBaseCurrency}
        style={styles.picker}>
        {Object.keys(CURRENCY_RATES).map(currency => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.currencyCode}>{baseCurrency}</Text>
      </View>
      <Button title="Convert" onPress={handleConvert} />
      <FlatList
        data={results}
        keyExtractor={item => item.currency}
        renderItem={({item}) => (
          <View style={styles.resultItem}>
            <Text style={styles.currencyText}>{item.currency}</Text>
            <Text style={styles.amountText}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CurrencyConverterScreen;
