import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HistoryContext from '../context/HistoryContext';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { history } = useContext(HistoryContext);

  const handleItemPress = (item) => {
    navigation.navigate('CurrencyConverter', {
      conversion: {
        baseCurrency: item.baseCurrency,
        amount: item.amount,
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.date}>
              {new Date(item.timestamp).toLocaleDateString()}
            </Text>
            <Text style={styles.conversionText}>
              {item.amount} {item.baseCurrency} →{' '}
              {item.conversions.slice(0, 3).map(c => c.currency).join(', ')}
              {item.conversions.length > 3 && '...'}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No conversion history found</Text>
        }
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
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  conversionText: {
    fontSize: 16,
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});

export default HistoryScreen;