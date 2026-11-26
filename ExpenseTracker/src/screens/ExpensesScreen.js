import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExpenseItem from '../components/ExpenseItem';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpensesScreen({ navigation }) {
    const { expenses } = useExpenses();
    const listaGastos = expenses || [];
    const totalGastos = listaGastos.reduce((acc, curr) => acc + Number(curr.amount ?? curr.monto ?? 0), 0);

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
                        <Ionicons name="add" size={18} color="#ffffff" style={{ marginRight: 4 }} />
                        <Text style={styles.addButtonText}>Nuevo</Text>
                    </TouchableOpacity>
                )}
            </View>

            {listaGastos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="receipt-outline" size={48} color="#94a3b8" style={{ marginBottom: 12 }} />
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
                            category={item.category || item.categoria}
                            onPress={() => navigation.navigate('ExpenseDetail', { id: item.id })}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <View style={styles.totalCard}>
                            <View style={styles.totalHeaderLeft}>
                                <View style={styles.totalIconBadge}>
                                    <Ionicons name="wallet-outline" size={20} color="#ffffff" />
                                </View>
                                <View>
                                    <Text style={styles.totalLabel}>Total Acumulado</Text>
                                    <Text style={styles.totalCount}>
                                        {listaGastos.length === 0
                                            ? '0 gastos registrados'
                                            : `${listaGastos.length} ${listaGastos.length === 1 ? 'gasto registrado' : 'gastos registrados'}`}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.totalMonto}>
                                ${totalGastos.toLocaleString('es-AR')}
                            </Text>
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
        backgroundColor: '#f8fafc',
        paddingHorizontal: 20,
        paddingTop: 56,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
    },
    addButton: {
        backgroundColor: '#1e293b',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 13,
    },
    listContainer: {
        paddingBottom: 28,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
    },
    totalCard: {
        backgroundColor: '#1e293b',
        paddingVertical: 18,
        paddingHorizontal: 18,
        borderRadius: 16,
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 4,
    },
    totalHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalIconBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ffffff',
    },
    totalCount: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    totalMonto: {
        fontSize: 21,
        fontWeight: '800',
        color: '#ffffff',
    },
});
