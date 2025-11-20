import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Home() {
    const [selectedImage, setSelectedImage] = useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('El permiso de acceso es necesario');
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.canceled) return;

        setSelectedImage({ uri: pickerResult.assets[0].uri });
    };

    let openCameraAsync = async () => {
        let cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!cameraPermissionResult.granted) {
            alert('El permiso de la cámara es necesario.');
            return;
        }
        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 1,
        });
        if (pickerResult.canceled) return;

        setSelectedImage({ uri: pickerResult.assets[0].uri });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>

            <Image
                style={styles.image}
                source={{
                    uri: selectedImage?.uri || "https://picsum.photos/id/237/200/300",
                }}
            />

            <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
                <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openCameraAsync}>
                <Text style={styles.buttonText}>Tomar nueva foto</Text>
            </TouchableOpacity>

            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A3D91',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 20
    },
    button: {
        backgroundColor: '#1E5DD8',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});
