import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ExpenseItem from '../components/ExpenseItem';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpensesScreen({ navigation }) {
    const { expenses } = useExpenses();
    const listaGastos = expenses || [];
    const total = listaGastos.reduce((acc, curr) => acc + Number(curr.amount ?? curr.monto ?? 0), 0);

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

            {listaGastos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Todavía no registraste gastos.</Text>
                </View>
            ) : (
                <FlatList
                    data={listaGastos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <ExpenseItem
                            title={item.title || item.descripcion}
                            amount={item.amount ?? item.monto}
                            onPress={() => navigation.navigate('ExpenseDetail', { id: item.id })}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={styles.totalCard}>
                            <View>
                                <Text style={styles.totalLabel}>Total Acumulado</Text>
                                <Text style={styles.totalCount}>
                                    {listaGastos.length} {listaGastos.length === 1 ? 'gasto registrado' : 'gastos registrados'}
                                </Text>
                            </View>
                            <Text style={styles.totalMonto}>${total.toLocaleString('es-AR')}</Text>
                        </View>
                    }
                />
            )}
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
    },
    totalCard: {
        backgroundColor: '#2c3e50',
        padding: 16,
        borderRadius: 12,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: '#ecf0f1',
        fontSize: 14,
        fontWeight: '600',
    },
    totalCount: {
        color: '#bdc3c7',
        fontSize: 12,
        marginTop: 2,
    },
    totalMonto: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
