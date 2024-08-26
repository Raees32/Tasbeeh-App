import React from 'react';
import { Button, View, Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import {
    toByteArray,
    toHexString,
    getEmvInfo,
    getCardInfoVisa,
    getCardInfoMasterCard,
} from './emvUtils.js';

// Initialize NFC Manager
NfcManager.start();

const NfcCardReader = () => {
    const readVisaCreditCard = async () => {
        try {
            await NfcManager.cancelTechnologyRequest();
        } catch (error) {
            console.log('Error canceling NFC request:', error);
        }

        try {
            const commands = [
                '00A404000E325041592E5359532E444446303100',
                '00A4040007A00000000310100E',
                '80A800002383212800000000000000000000000000000002500000000000097820052600E8DA935200',
            ];

            await NfcManager.requestTechnology([NfcTech.IsoDep]);

            const responses = [];

            for (const command of commands) {
                const resp = await NfcManager.transceive(toByteArray(command));
                responses.push(resp);
            }

            if (responses.length > 2) {
                const r = await getEmvInfo(toHexString(responses[2]));
                if (r) {
                    const cardInfo = getCardInfoVisa(r);
                    if (cardInfo) {
                        Alert.alert('Card Info', `Card: ${cardInfo.card}\nExp: ${cardInfo.exp}`);
                    }
                }
            }
        } catch (error) {
            console.log('Error reading Visa card:', error);
        } finally {
            await NfcManager.cancelTechnologyRequest();
        }
    };

    const readMasterCardCreditCard = async () => {
        try {
            await NfcManager.cancelTechnologyRequest();
        } catch (error) {
            console.log('Error canceling NFC request:', error);
        }

        try {
            const commands = [
                '00A4040007A00000000410100E',
                '80A8000002830000',
                '00B2011400',
                '00B2010C00',
                '00B2012400',
                '00B2022400',
            ];

            await NfcManager.requestTechnology([NfcTech.IsoDep]);

            const responses = [];

            for (const command of commands) {
                const resp = await NfcManager.transceive(toByteArray(command));
                responses.push(resp);
            }

            if (responses.length > 3) {
                const r = await getEmvInfo(toHexString(responses[3]));
                if (r) {
                    const cardInfo = getCardInfoMasterCard(r);
                    if (cardInfo) {
                        Alert.alert('Card Info', `Card: ${cardInfo.card}\nExp: ${cardInfo.exp}`);
                    }
                }
            }
        } catch (error) {
            console.log('Error reading MasterCard:', error);
        } finally {
            await NfcManager.cancelTechnologyRequest();
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',margin:30 }}>
            <Button title="Read Visa Card" onPress={readVisaCreditCard} />
            <Button title="Read MasterCard" onPress={readMasterCardCreditCard} />
        </View>
    );
};

export default NfcCardReader;