import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function App() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    const navigation = useNavigation();

    const Logear = async () => {

        // Validación basica
        if (!nombre || !apellido || !contrasenia) {
            Alert.alert("Complete todos los campos");
            return;
        }

        if (nombre === 'franco' && apellido === 'cachago' && contrasenia === '12') {
            navigation.navigate('Progress');
        } else {
            Alert.alert('Logeo fallido');
        }
    };

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    onChangeText={setNombre}
                    value={nombre}
                    placeholderTextColor="#ccc"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Apellido'
                    onChangeText={setApellido}
                    value={apellido}
                    placeholderTextColor="#ccc"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={setContrasenia}
                    value={contrasenia}
                    placeholderTextColor="#ccc"
                />

                <TouchableOpacity style={styles.buton} onPress={Logear}>
                    <Text style={{ color: '#fff' }}>Ingresar al sistema</Text>
                </TouchableOpacity>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        paddingTop: 120,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 12,
        marginVertical: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: 'white',
    },
    buton: {
        backgroundColor: '#0080ff',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    }
});