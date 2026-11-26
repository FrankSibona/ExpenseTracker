import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';
import { CATEGORIES } from '../data/categories';

export default function NewExpenseModal({ navigation }) {
    const { addExpense } = useExpenses();
    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState(CATEGORIES[0]?.name || 'Alimentación');
    const [notas, setNotas] = useState('');

    const handleGuardar = () => {
        const nombreLimpio = nombre.trim();
        const montoNormalizado = String(monto).replace(',', '.').trim();
        const montoNumerico = parseFloat(montoNormalizado);

        // Validación: nombre no vacío
        if (!nombreLimpio) {
            Alert.alert('Campo requerido', 'Por favor ingresa un nombre para el gasto.');
            return;
        }

        // Validación: monto mayor a 0
        if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
            Alert.alert('Monto inválido', 'Por favor ingresa un monto mayor a 0.');
            return;
        }

        // Llamada a addExpense del Context con el monto como número
        addExpense({
            title: nombreLimpio,
            amount: montoNumerico,
            category: categoria,
            notes: notas.trim(),
            createdAt: new Date().toISOString(),
        });

        // Limpieza y cierre
        setNombre('');
        setMonto('');
        setNotas('');
        if (navigation && navigation.goBack) {
            navigation.goBack();
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <View style={styles.headerIconContainer}>
                        <Ionicons name="card-outline" size={28} color="#1e293b" />
                    </View>

                    <Text style={styles.title}>Nuevo Gasto</Text>
                    <Text style={styles.subtitle}>Ingresa los detalles para tu registro</Text>

                    {/* Campo Nombre */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Descripción / Comercio *</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="pricetag-outline" size={18} color="#94a3b8" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ej. Supermercado"
                                placeholderTextColor="#94a3b8"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                        </View>
                    </View>

                    {/* Campo Monto */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Monto *</Text>
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

                    {/* Selector de Categoría mediante chips */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Categoría</Text>
                        <View style={styles.chipsContainer}>
                            {CATEGORIES.map((cat) => {
                                const isSelected = categoria === cat.name;
                                return (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[
                                            styles.chip,
                                            isSelected && { backgroundColor: cat.color, borderColor: cat.color },
                                        ]}
                                        onPress={() => setCategoria(cat.name)}
                                    >
                                        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Campo Notas */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Notas (opcional)</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Notas adicionales..."
                            placeholderTextColor="#94a3b8"
                            value={notas}
                            onChangeText={setNotas}
                            multiline
                            numberOfLines={3}
                        />
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
        paddingHorizontal: 20,
        paddingVertical: 32,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 28,
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
        marginBottom: 14,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 12,
        backgroundColor: '#ffffff',
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
    textArea: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 12,
        padding: 12,
        height: 80,
        textAlignVertical: 'top',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        backgroundColor: '#f8fafc',
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#475569',
    },
    chipTextSelected: {
        color: '#ffffff',
    },
    primaryButton: {
        backgroundColor: '#1e293b',
        paddingVertical: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
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
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    secondaryButtonText: {
        color: '#64748b',
        fontSize: 15,
        fontWeight: '600',
    },
    buttonIcon: {
        marginRight: 8,
    },
});
