import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  