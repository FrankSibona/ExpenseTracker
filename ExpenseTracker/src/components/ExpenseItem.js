import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORY_STYLES, DEFAULT_CATEGORY_STYLE } from '../data/categories';

export default function ExpenseItem({ descripcion, title, monto, amount, categoria, category, onPress }) {
    const itemTitle = title || descripcion;
    const itemAmount = Number(amount ?? monto ?? 0);
    const itemCategory = category || categoria;
    const categoryTheme = (itemCategory && CATEGORY_STYLES[itemCategory]) || DEFAULT_CATEGORY_STYLE;

    const content = (
        <View style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: categoryTheme.bg }]}>
                <Ionicons
                    name={categoryTheme.icon}
                    size={20}
                    color={categoryTheme.text}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.descripcion} numberOfLines={1}>{itemTitle}</Text>
                {itemCategory ? (
                    <View style={[styles.badge, { backgroundColor: categoryTheme.bg }]}>
                        <Text style={[styles.badgeText, { color: categoryTheme.text }]}>
                            {itemCategory}
                        </Text>
                    </View>
                ) : null}
            </View>

            <Text style={styles.monto}>-${itemAmount.toLocaleString('es-AR')}</Text>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
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
