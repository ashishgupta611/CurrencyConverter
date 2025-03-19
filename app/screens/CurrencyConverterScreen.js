import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import HistoryContext from '../context/HistoryContext';

const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.79,
  JPY: 144.23,
  INR: 82.88,
  AUD: 1.52,
};

const CurrencyConverterScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addConversion } = useContext(HistoryContext);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [results, setResults] = useState([]);

  // Prefill from history item
  React.useEffect(() => {
    if (route.params?.conversion) {
      setBaseCurrency(route.params.conversion.baseCurrency);
      setAmount(route.params.conversion.amount.toString());
    }
  }, [route.params]);

  const handleConvert = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      alert('Please enter a valid number');
      return;
    }

    const conversions = Object.entries(CURRENCY_RATES)
      .filter(([currency]) => currency !== baseCurrency)
      .map(([currency, rate]) => ({
        currency,
        value: (numericAmount * (rate / CURRENCY_RATES[baseCurrency])).toFixed(2)
      }));

    setResults(conversions);
    addConversion({
      baseCurrency,
      amount: numericAmount,
      conversions
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Currency Converter</Text>

      <Picker
        selectedValue={baseCurrency}
        onValueChange={setBaseCurrency}
        style={styles.picker}
      >
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
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.currencyText}>{item.currency}</Text>
            <Text style={styles.amountText}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  currencyCode: {
    marginLeft: 10,
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
  },
  historyButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  historyButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default CurrencyConverterScreen;