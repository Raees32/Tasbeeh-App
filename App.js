import React, { useEffect } from 'react';
import { View, Text, Button, Platform, NativeEventEmitter, NativeModules } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';

const App = () => {
  useEffect(() => {
    NfcManager.start()
      .then(() => console.log('NFC started'))
      .catch(err => console.warn(err));

    return () => {
      NfcManager.stop();
    };
  }, []);

  const readNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcManager.NFC_A);
      const tag = await NfcManager.getTag();
      console.log('Tag found', tag);

      // Parse the tag data to extract card number, card holder name, card type, and expiry date
      // Note: This is a placeholder. Actual parsing depends on the card format.
      const cardNumber = '1234-5678-9012-3456';
      const cardHolderName = 'John Doe';
      const cardType = 'Visa';
      const expiryDate = '12/25';

      console.log('Card Number:', cardNumber);
      console.log('Card Holder Name:', cardHolderName);
      console.log('Card Type:', cardType);
      console.log('Expiry Date:', expiryDate);

      NfcManager.cancelTechnologyRequest();
    } catch (ex) {
      console.warn('Oops!', ex);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>NFC Reader App</Text>
      <Button title="Read NFC" onPress={readNfc} />
    </View>
  );
};

export default App;