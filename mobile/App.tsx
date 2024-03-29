import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Landing from './src/pages/Lading';
import AppLoading from 'expo-app-loading';
import {Archivo_400Regular, Archivo_700Bold, useFonts} from '@expo-google-fonts/archivo';
import {Poppins_400Regular, Poppins_600SemiBold} from '@expo-google-fonts/poppins';
import AppStack from "./src/routes/AppStack";

export default function App() {

    let [fontsLoaded] = useFonts({
        Archivo_400Regular,
        Archivo_700Bold,
        Poppins_600SemiBold
    });

    if (!fontsLoaded) {
        return <AppStack/>
    } else {
        return (
            <>
                <AppStack/>
                <StatusBar style="light"/>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e29',
        alignItems: 'center',
        justifyContent: 'center',

    },

    text: {
        color: '#FFF',
        fontSize: 18,
        marginVertical: 5
    }
});
