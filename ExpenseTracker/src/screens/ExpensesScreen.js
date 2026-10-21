import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ExpenseItem from '../components/ExpenseItem';

// Datos definidos manualmente según los escenarios de la User Story #5
const GASTOS_INICIALES = [
    { id: '1', descripcion: 'Supermercado', monto: 25000 },
    { id: '2', descripcion: 'Combustible', monto: 18000 },
    { id: '3', descripcion: 'Internet', monto: 32000 },
];

export default function ExpensesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Listado de Gastos</Text>
                    <Text style={styles.subtitle}>Tus registros recientes</Text>
                </View>
                {navigation && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('NewExpenseModal')}
                    >
                        <Text style={styles.addButtonText}>+ Nuevo</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={GASTOS_INICIALES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem
                        descripcion={item.descripcion}
                        monto={item.monto}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#7f8c8d',
    },
    addButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    listContainer: {
        paddingBottom: 24,
    },
});
