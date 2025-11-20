import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function Home() {

    const [planets, setPlanets] = useState([]); // no cargado
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const getPlanets = async () => {
        setLoading(true);

        const uriPlanetas = await fetch(
            'https://api.api-ninjas.com/v1/planets?min_mass=0.01',
            {
                headers: {
                    'X-Api-Key': 'HzoQDPEze4hv5Fc4sZZYew==uDU7poWrBSjNfwhZ'
                },
            }
        );
        const json = await uriPlanetas.json();

        //Ordenar de a - z
        const ordenado = json.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        setPlanets(ordenado)
        //Carga completa
        setLoading(false);
    }

    useEffect(() => {
        getPlanets();
    }, []);

    const onRefresh = useCallback(async () => {
        await getPlanets();
    }, []);

    const navegarPerfil = async () => {
        navigation.navigate('Perfil');
    }
    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Planetas NASA</Text>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
            >
                {planets.length === 0 ? (
                    <Text style={styles.loading}>Cargando planetas...</Text>
                ) : (
                    planets.map((p, index) => (
                        <View key={p.name ?? index} style={styles.card}>
                            <Text style={styles.name}>{p.name}</Text>
                            <Text style={styles.info}>Masa (Júpiter): {p.mass ?? 'N/A'}</Text>
                            <Text style={styles.info}>Radio (Júpiter): {p.radius ?? 'N/A'}</Text>
                            <Text style={styles.info}>Período (días): {p.period ?? 'N/A'}</Text>
                            <Text style={styles.info}>Semi eje mayor (AU): {p.semi_major_axis ?? 'N/A'}</Text>
                            <Text style={styles.info}>Temperatura: {p.temperature ?? 'N/A'}</Text>
                            <Text style={styles.info}>Distancia (ly): {p.distance_light_year ?? 'N/A'}</Text>
                            <Text style={styles.info}>Masa estrella: {p.host_star_mass ?? 'N/A'}</Text>
                            <Text style={styles.info}>Temp. estrella: {p.host_star_temperature ?? 'N/A'}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity style={styles.buton} onPress={navegarPerfil}>
                <Text style={styles.butonText}>Ir al perfil</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
    },
    headerImage: {
        width: '100%',
        height: 160,
        borderRadius: 8,
    },
    title: {
        color: '#dbeafe',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 8,
        textAlign: 'center'
    },
    scrollContent: {
        paddingBottom: 20,
    },
    loading: {
        color: '#cbd5e1',
        marginTop: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#071233',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    name: {
        color: '#93c5fd',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
    },
    info: {
        color: '#cbd5e1',
        fontSize: 13,
    },
    buton: {
        alignSelf: 'center',
        marginTop: 12,
        backgroundColor: '#0ea5e9',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginBottom: 10,
    },
    butonText: {
        color: '#012a4a',
        fontWeight: '700',
    },
});
