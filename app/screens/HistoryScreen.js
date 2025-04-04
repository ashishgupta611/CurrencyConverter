import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HistoryContext from '../context/HistoryContext';
import { styles } from '../styles/HistoryStyle';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { history, setCurrency, setBaseAmount } = useContext(HistoryContext);

  const getItemDetails = (item) => {
    let textDetails = `${item.amount} ${item.currency} → ${item.conversions.slice(0, 3).map(c => c.currency).join(', ')} ${item.conversions.length > 3 && '...'}`;
    return textDetails;
  };

  const handleItemPress = (item) => {
    navigation.goBack();
    setCurrency(item.currency);
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
              {getItemDetails(item)}
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