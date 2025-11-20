import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fondo from './assets/image.png'

export default function ProgressBarScreen() {
    const [progress, setProgress] = useState(0);
    const navigation = useNavigation();

    // Intervalo para aumentar la barra
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => (p < 1 ? p + 0.02 : 1));
        }, 80);
    }, []);

    // Cuando llegue a 100%, navegar
    useEffect(() => {
        if (progress >= 1) {
            navigation.replace('Home');
        }
    }, [progress]);

    return (
        <ImageBackground
            source={fondo}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.track}>
                    <View style={[styles.bar, { width: `${progress * 100}%` }]} />
                </View>

                <Text style={styles.text}>{Math.round(progress * 100)}%</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    track: {
        width: '80%',
        height: 14,
        backgroundColor: '#333',
        borderRadius: 8,
        overflow: 'hidden'
    },
    bar: {
        height: '100%',
        backgroundColor: '#00c3ff'
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginTop: 10
    }
});
