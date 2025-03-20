import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HistoryContext from '../context/HistoryContext';
import { styles } from '../styles/HistoryStyle';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { history, setBaseCurrency, setBaseAmount } = useContext(HistoryContext);

  const handleItemPress = (item) => {
    navigation.goBack();
    setBaseCurrency(item.baseCurrency);
    setBaseAmount(`${item.amount}`);
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

export default HistoryScreen;