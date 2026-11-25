import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';

export default function HomeScreen({ navigation }) {
    const { expenses } = useExpenses();
    const listaGastos = expenses || [];
    const total = listaGastos.reduce((acc, curr) => acc + Number(curr.amount ?? curr.monto ?? 0), 0);

    return (
        <View style={styles.container}>
            {/* Nombre de la app */}
            <Text style={styles.title}>ExpenseTracker</Text>

            {/* Mensaje de bienvenida */}
            <Text style={styles.subtitle}>¡Te damos la bienvenida!</Text>

            {/* Descripción breve */}
            <Text style={styles.description}>
                Esta aplicación te servirá para registrar y consultar todos tus gastos personales de manera rápida y sencilla.
            </Text>

            {/* Resumen general */}
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Resumen registrado</Text>
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
                >
                    <Text style={styles.primaryButtonText}>Ver Listado de Gastos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('NewExpenseModal')}
                >
                    <Text style={styles.secondaryButtonText}>+ Cargar Nuevo Gasto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 16,
        color: '#34495e',
    },
    description: {
        fontSize: 15,
        textAlign: 'center',
        color: '#7f8c8d',
        lineHeight: 22,
        marginBottom: 24,
    },
    summaryCard: {
        width: '100%',
        backgroundColor: '#2c3e50',
        borderRadius: 12,
        padding: 18,
        marginBottom: 24,
        alignItems: 'center',
    },
    summaryTitle: {
        color: '#ecf0f1',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    summaryMovements: {
        color: '#bdc3c7',
        fontSize: 13,
        marginBottom: 8,
    },
    summaryTotal: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#ecf0f1',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#2c3e50',
        fontSize: 16,
        fontWeight: '600',
    },
});
