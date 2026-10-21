import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ExpenseItem({ descripcion, monto }) {
    return (
        <View style={styles.card}>
            <Text style={styles.descripcion}>{descripcion}</Text>
            <Text style={styles.monto}>${monto.toLocaleString('es-AR')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    descripcion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        flex: 1,
    },
    monto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
});
