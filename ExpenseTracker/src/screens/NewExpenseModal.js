import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NewExpenseModal({ navigation }) {
    // Estados para guardar temporalmente lo que el usuario escribe
    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');

    // Función que se ejecuta al presionar el botón "Guardar"
    const handleGuardar = () => {
        if (!nombre.trim() || !monto.trim()) {
            Alert.alert('Campos incompletos', 'Por favor ingresa al menos el nombre y el monto del gasto.');
            return;
        }

        Alert.alert(
            '¡Gasto Registrado!',
            `Nombre: ${nombre}\nMonto: $${monto}\nCategoría: ${categoria || 'General'}`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Limpiamos los campos
                        setNombre('');
                        setMonto('');
                        setCategoria('');
                        // Regresamos a la pantalla anterior si estamos navegando
                        if (navigation && navigation.goBack) {
                            navigation.goBack();
                        }
                    },
                },
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <View style={styles.headerIconContainer}>
                        <Ionicons name="card-outline" size={28} color="#1e293b" />
                    </View>

                    <Text style={styles.title}>Nuevo Gasto</Text>
                    <Text style={styles.subtitle}>Ingresa los detalles para tu registro</Text>

                    {/* Campo Nombre */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Descripción / Comercio</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="pricetag-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Supermercado Coto"
                                placeholderTextColor="#94a3b8"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>
                    </View>

                    {/* Campo Monto */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Monto</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="cash-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ej. 25000"
                                placeholderTextColor="#94a3b8"
                                keyboardType="numeric"
                                value={monto}
                                onChangeText={setMonto}
                            />
                        </View>
                    </View>

                    {/* Campo Categoría */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Categoría</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="folder-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Comida, Transporte, Servicios"
                                placeholderTextColor="#94a3b8"
                                value={categoria}
                                onChangeText={setCategoria}
                            />
                        </View>
                    </View>

                    {/* Botón Guardar */}
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleGuardar}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" style={styles.buttonIcon} />
                        <Text style={styles.primaryButtonText}>Guardar Gasto</Text>
                    </TouchableOpacity>

                    {/* Botón Cancelar */}
                    {navigation && navigation.canGoBack && navigation.canGoBack() && (
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.secondaryButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
    },
    headerIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        textAlign: 'center',
        color: '#0f172a',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: '#0f172a',
    },
    primaryButton: {
        backgroundColor: '#1e293b',
        paddingVertical: 14,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 6,
        elevation: 2,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '700',
    },
    buttonIcon: {
        marginRight: 8,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    secondaryButtonText: {
        color: '#64748b',
        fontSize: 14,
        fontWeight: '600',
    },
});