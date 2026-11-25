import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Cargar Nuevo Gasto</Text>

            {/* Input para el Nombre */}
            <Text style={styles.label}>Nombre del gasto *</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. Supermercado"
                value={nombre}
                onChangeText={setNombre}
            />

            {/* Input para el Monto */}
            <Text style={styles.label}>Monto *</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. 25000"
                keyboardType="numeric"
                value={monto}
                onChangeText={setMonto}
            />

            {/* Selector de Categoría mediante chips */}
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

            {/* Input para Notas */}
            <Text style={styles.label}>Notas (opcional)</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Notas adicionales..."
                value={notas}
                onChangeText={setNotas}
                multiline
                numberOfLines={3}
            />

            {/* Botones Guardar y Cancelar */}
            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
                <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>

            {navigation && navigation.canGoBack && navigation.canGoBack() && (
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#2c3e50',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: '#f8fafc',
    },
    textArea: {
        minHeight: 70,
        textAlignVertical: 'top',
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        backgroundColor: '#f1f5f9',
    },
    chipText: {
        fontSize: 13,
        color: '#475569',
        fontWeight: '600',
    },
    chipTextSelected: {
        color: '#ffffff',
    },
    saveButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    cancelButtonText: {
        color: '#7f8c8d',
        fontSize: 15,
        fontWeight: '600',
    },
});
