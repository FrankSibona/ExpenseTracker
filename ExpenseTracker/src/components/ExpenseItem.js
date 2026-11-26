import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Paleta de colores e íconos para cada categoría (Bonus #rn-s1-us7)
const CATEGORY_STYLES = {
    'Comida': { bg: '#fff4e6', text: '#d97706', border: '#f59e0b', icon: 'restaurant-outline' },
    'Transporte': { bg: '#e0f2fe', text: '#0284c7', border: '#38bdf8', icon: 'car-outline' },
    'Servicios': { bg: '#f3e8ff', text: '#7c3aed', border: '#a855f7', icon: 'flash-outline' },
    'Salud': { bg: '#ecfdf5', text: '#059669', border: '#34d399', icon: 'medkit-outline' },
    'Entretenimiento': { bg: '#fdf2f8', text: '#db2777', border: '#f472b6', icon: 'game-controller-outline' },
};

const DEFAULT_CATEGORY_STYLE = { bg: '#f1f5f9', text: '#475569', border: '#94a3b8', icon: 'pricetag-outline' };

export default function ExpenseItem({ descripcion, monto, categoria }) {
    const categoryTheme = (categoria && CATEGORY_STYLES[categoria]) || DEFAULT_CATEGORY_STYLE;

    return (
        <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: categoryTheme.bg }]}>
                <Ionicons
                    name={categoryTheme.icon}
                    size={20}
                    color={categoryTheme.text}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.descripcion}>{descripcion}</Text>
                {categoria ? (
                    <View style={[styles.badge, { backgroundColor: categoryTheme.bg }]}>
                        <Text style={[styles.badgeText, { color: categoryTheme.text }]}>
                            {categoria}
                        </Text>
                    </View>
                ) : null}
            </View>

            <Text style={styles.monto}>-${monto.toLocaleString('es-AR')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1.5,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    descripcion: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    monto: {
        fontSize: 16,
        fontWeight: '700',
        color: '#e11d48',
        marginLeft: 12,
    },
});
