import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';

export default function SettingsScreen() {
    const { settings, updateSettings } = useExpenses();

    const handleToggleNotifications = (val) => {
        updateSettings((prev) => ({ ...prev, notifications: val }));
    };

    const handleToggleDarkMode = (val) => {
        updateSettings((prev) => ({ ...prev, darkMode: val }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajustes</Text>
            <Text style={styles.subtitle}>Preferencias de la aplicación</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notificaciones y Visualización</Text>

                {/* Switch de Notificaciones */}
                <View style={styles.settingRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.settingLabel}>Notificaciones</Text>
                        <Text style={styles.settingDescription}>
                            Recibir avisos para registrar tus gastos diarios
                        </Text>
                    </View>
                    <Switch
                        value={Boolean(settings.notifications)}
                        onValueChange={handleToggleNotifications}
                        trackColor={{ false: '#cbd5e1', true: '#1e293b' }}
                        thumbColor={settings.notifications ? '#ffffff' : '#f8fafc'}
                    />
                </View>

                {/* Switch de Modo Oscuro */}
                <View style={styles.settingRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.settingLabel}>Modo Oscuro</Text>
                        <Text style={styles.settingDescription}>
                            Ajustar la paleta de colores para descanso visual
                        </Text>
                    </View>
                    <Switch
                        value={Boolean(settings.darkMode)}
                        onValueChange={handleToggleDarkMode}
                        trackColor={{ false: '#cbd5e1', true: '#1e293b' }}
                        thumbColor={settings.darkMode ? '#ffffff' : '#f8fafc'}
                    />
                </View>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Almacenamiento Local Activo</Text>
                <Text style={styles.infoDescription}>
                    Tus ajustes se guardan en el dispositivo mediante AsyncStorage (Capa 1) y tus gastos se sincronizan en la nube con Firestore (Capa 2).
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8fafc',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#64748b',
        marginBottom: 24,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    textContainer: {
        flex: 1,
        marginRight: 16,
    },
    settingLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 13,
        color: '#64748b',
    },
    infoCard: {
        backgroundColor: '#f1f5f9',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    infoDescription: {
        fontSize: 13,
        color: '#475569',
        lineHeight: 18,
    },
});
