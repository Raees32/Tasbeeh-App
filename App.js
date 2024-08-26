import React from 'react';
import { SafeAreaView } from 'react-native';
import NfcCardReader from './android/Component/NfcCardReader';

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NfcCardReader />
        </SafeAreaView>
    );
};

export default App;