import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';

export default function HomeScreen({ navigation }) {
    const { expenses } = useExpenses();
    const listaGastos = expenses || [];
    const total = listaGastos.reduce((acc, curr) => acc + Number(curr.amount ?? curr.monto ?? 0), 0);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Ilustración desde assets (Bonus #rn-s1-us7) */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/undraw_wallet_diag.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                />
            </View>

            {/* Nombre de la app */}
            <Text style={styles.title}>ExpenseTracker</Text>

            {/* Mensaje de bienvenida */}
            <Text style={styles.subtitle}>¡Te damos la bienvenida!</Text>

            {/* Resumen general con gastos reales del Context (#main-s3-us2) */}
            <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                    <Ionicons name="pie-chart-outline" size={20} color="#94a3b8" style={{ marginRight: 8 }} />
                    <Text style={styles.summaryTitle}>Resumen de gastos</Text>
                </View>
                <Text style={styles.summaryMovements}>
                    {listaGastos.length > 0
                        ? `${listaGastos.length} ${listaGastos.length === 1 ? 'movimiento registrado' : 'movimientos registrados'}`
                        : 'Todavía no registraste gastos'}
                </Text>
                <Text style={styles.summaryTotal}>
                    ${total.toLocaleString('es-AR')}
                </Text>
            </View>

            {/* Botones de navegación */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Gastos')}
                    activeOpacity={0.85}
                >
                    <Ionicons name="receipt-outline" size={20} color="#ffffff" style={styles.buttonIcon} />
                    <Text style={styles.primaryButtonText}>Ver Listado de Gastos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('NewExpenseModal')}
                    activeOpacity={0.85}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#1e293b" style={styles.buttonIcon} />
                    <Text style={styles.secondaryButtonText}>Cargar Nuevo Gasto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48,
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: 240,
        height: 160,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 6,
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 24,
        color: '#64748b',
    },
    summaryCard: {
        width: '100%',
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 3,
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    summaryTitle: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
    },
    summaryMovements: {
        color: '#cbd5e1',
        fontSize: 13,
        marginBottom: 10,
    },
    summaryTotal: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '800',
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#1e293b',
        paddingVertical: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 3,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        paddingVertical: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    secondaryButtonText: {
        color: '#1e293b',
        fontSize: 15,
        fontWeight: '600',
    },
    buttonIcon: {
        marginRight: 8,
    },
});
