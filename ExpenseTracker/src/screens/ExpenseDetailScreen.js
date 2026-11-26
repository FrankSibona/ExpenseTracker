import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExpenseDetailScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle del Gasto</Text>
            <Text style={styles.subtitle}>Información detallada del registro</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748b',
    },
});
