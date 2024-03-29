import React, { useState, useRef } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

function HomeScreen() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const descriptionInputRef = useRef(null);

  const handleCount = () => {
    setCount(count + 1);
  };

  const handleReset = () => {
    setCount(0);
    saveHistory(count);
  };

  const saveHistory = (countValue: number) => {
    const historyItem = `Count ${history.length + 1}) ${countValue} times`;
    setHistory([...history, historyItem]);
  };

  const handleHistoryPress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tasbeeh Counter</Text>
     
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCount}>
          <Text style={[styles.buttonText, { backgroundColor: '#4CAF50' }]}>COUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHistoryPress}>
          <Text style={[styles.buttonText, { backgroundColor: '#2196F3' }]}>HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset}>
          <Text style={[styles.buttonText, { backgroundColor: '#FF5733' }]}>RESET</Text>
        </TouchableOpacity>
      </View>
      <TextInput  
        ref={descriptionInputRef}
        style={styles.messageInput}
        placeholder={'Description Add help for using App'}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>History</Text>
            <ScrollView style={styles.historyContainer}>
              {history.map((item, index) => (
                <Text key={index} style={styles.historyItem}>{item}</Text>
              ))}
            </ScrollView>
            <Pressable onPress={handleModalClose}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',

  },
  header: {
    fontSize: 35,
    color: '#ffffff',
    backgroundColor: 'red',
  paddingHorizontal: 73,
    top:28,
    fontWeight: '400'

  },
 
  counter: {
    fontSize: 40,
    fontWeight: 'bold',
   
    backgroundColor: 'yellow',
    padding: 10,
    paddingHorizontal:30,
    borderRadius: 5,
    marginTop:165

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 170,
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 21,
    width: 100,
    height: 35,
    borderRadius: 7,
    textAlign: 'center',
    paddingVertical: 5,
    margin: 10,
    fontWeight:'500',
    top: 63,
   
  },
  messageInput: {
    top: 30,
    height: '20%',
    width: '100%',
    borderWidth: 1,
    marginBottom:100,
    paddingHorizontal: 10,
    backgroundColor:'yellow',
  fontWeight:'400',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    maxHeight: '80%',
    width: '80%',
    
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  historyContainer: {
    maxHeight: 200,
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 18,
    marginTop: 5,
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
  },
});

export default HomeScreen;