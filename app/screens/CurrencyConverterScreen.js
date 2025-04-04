import React, {
  useState,
  useContext,
  useEffect,
  useCallback
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
    currency,
    baseAmount,
    addConversion,
    setCurrency,
    setBaseAmount,
  } = useContext(HistoryContext);
  const [results, setResults] = useState([]);
  const [amount, setAmount] = useState(baseAmount);
  

  useEffect(() => {
    setAmount(baseAmount);
  }, [baseAmount]);

  useEffect(() => {
    setResults([]);
  }, [currency]);

  const getConversionAmount = (conversionAmount, rate) => {
    let value = conversionAmount * (rate / CURRENCY_RATES[currency]);
    return value.toFixed(2);
  };

  const getConversions = conversionAmount => {    
    return Object.entries(CURRENCY_RATES)
      .filter(([currency_name]) => currency_name !== currency)
      .map(([currency_name, rate]) => ({
        currency: currency_name,
        value: getConversionAmount(conversionAmount, rate)
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
    addConversion({currency, amount: numericAmount, conversions});
  }, [currency, amount]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Currency Converter</Text>
      <Picker
        selectedValue={currency}
        onValueChange={setCurrency}
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
        <Text style={styles.currencyCode}>{currency}</Text>
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
