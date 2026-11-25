import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';
import { CATEGORY_STYLES, DEFAULT_CATEGORY_STYLE } from '../data/categories';

export default function ExpenseDetailScreen({ route, navigation }) {
    const { id } = route?.params || {};
    const { expenses, removeExpense } = useExpenses();

    const expense = (expenses || []).find((e) => String(e.id) === String(id));

    const handleDelete = () => {
        if (!expense) return;

        Alert.alert(
            'Eliminar Gasto',
            '¿Estás seguro de que querés eliminar este gasto? Esta acción no se puede deshacer.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        removeExpense(expense.id);
                        if (navigation && navigation.goBack) {
                            navigation.goBack();
                        }
                    },
                },
            ]
        );
    };

    if (!expense) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundTitle}>Gasto no encontrado</Text>
                <Text style={styles.notFoundText}>
                    No encontramos el gasto con identificador #{id}. Es posible que haya sido eliminado.
                </Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation && navigation.goBack && navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Volver al Listado</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const title = expense.title || expense.descripcion;
    const amount = Number(expense.amount ?? expense.monto ?? 0);
    const category = expense.category || expense.categoria || 'Alimentación';
    const notes = expense.notes ?? expense.notas;
    const createdAt = expense.createdAt || expense.fecha;
    const categoryTheme = CATEGORY_STYLES[category] || DEFAULT_CATEGORY_STYLE;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={[styles.categoryBadge, { backgroundColor: categoryTheme.bg, borderColor: categoryTheme.border }]}>
                    <Text style={[styles.categoryBadgeText, { color: categoryTheme.text }]}>
                        {category}
                    </Text>
                </View>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.amount}>-${amount.toLocaleString('es-AR')}</Text>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>
                        {createdAt ? new Date(createdAt).toLocaleDateString('es-AR') : 'Sin fecha'}
                    </Text>
                </View>

                <View style={styles.notesContainer}>
                    <Text style={styles.label}>Notas:</Text>
                    <Text style={styles.notesText}>
                        {notes && notes.trim() ? notes : 'Sin notas registradas.'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Eliminar Gasto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    categoryBadge: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
    },
    categoryBadgeText: {
        fontSize: 13,
        fontWeight: '700',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 8,
    },
    amount: {
        fontSize: 32,
        fontWeight: '800',
        color: '#e74c3c',
        marginBottom: 16,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 16,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    value: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2c3e50',
    },
    notesContainer: {
        width: '100%',
        marginTop: 4,
        marginBottom: 20,
    },
    notesText: {
        fontSize: 14,
        color: '#334155',
        marginTop: 6,
        backgroundColor: '#f8fafc',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    deleteButton: {
        backgroundColor: '#fee2e2',
        borderWidth: 1,
        borderColor: '#fca5a5',
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#dc2626',
        fontSize: 16,
        fontWeight: 'bold',
    },
    notFoundContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    notFoundTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 8,
    },
    notFoundText: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 24,
    },
    backButton: {
        backgroundColor: '#2c3e50',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '600',
    },
});
