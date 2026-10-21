import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
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

            {/* Botones de navegación para la US6 */}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: 22,
        marginBottom: 20,
        color: '#34495e',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#7f8c8d',
        lineHeight: 24,
        marginBottom: 36,
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