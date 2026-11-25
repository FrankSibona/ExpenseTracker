import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExpenseItem({ descripcion, title, monto, amount, onPress }) {
    const itemTitle = title || descripcion;
    const itemAmount = Number(amount ?? monto ?? 0);

    const content = (
        <View style={styles.card}>
            <Text style={styles.descripcion} numberOfLines={1}>{itemTitle}</Text>
            <Text style={styles.monto}>-${itemAmount.toLocaleString('es-AR')}</Text>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
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
        marginRight: 12,
    },
    monto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e74c3c',
    },
});
