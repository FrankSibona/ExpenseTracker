import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExpenseItem from '../components/ExpenseItem';

// Datos definidos manualmente según los escenarios de la User Story #5 y categorías del Bonus #rn-s1-us7
const GASTOS_INICIALES = [
    { id: '1', descripcion: 'Supermercado', monto: 25000, categoria: 'Comida' },
    { id: '2', descripcion: 'Combustible', monto: 18000, categoria: 'Transporte' },
    { id: '3', descripcion: 'Internet', monto: 32000, categoria: 'Servicios' },
];

export default function ExpensesScreen({ navigation }) {
    // Cálculo del total acumulado de gastos (Bonus #rn-s1-us7)
    const totalGastos = GASTOS_INICIALES.reduce((acc, gasto) => acc + gasto.monto, 0);

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

            <FlatList
                data={GASTOS_INICIALES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem
                        descripcion={item.descripcion}
                        monto={item.monto}
                        categoria={item.categoria}
                    />
                )}
                ListFooterComponent={
                    <View style={styles.totalCard}>
                        <View style={styles.totalHeaderLeft}>
                            <View style={styles.totalIconBadge}>
                                <Ionicons name="wallet-outline" size={20} color="#ffffff" />
                            </View>
                            <View>
                                <Text style={styles.totalLabel}>Total Acumulado</Text>
                                <Text style={styles.totalCount}>{GASTOS_INICIALES.length} gastos registrados</Text>
                            </View>
                        </View>
                        <Text style={styles.totalMonto}>
                            ${totalGastos.toLocaleString('es-AR')}
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
