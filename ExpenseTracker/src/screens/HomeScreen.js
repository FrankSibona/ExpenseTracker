import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
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

            {/* Botones de navegación para la US6 */}
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
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: 250,
        height: 180,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 6,
        color: '#0f172a',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 36,
        color: '#64748b',
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