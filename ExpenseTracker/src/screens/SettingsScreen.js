import React from 'react';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';

export default function SettingsScreen() {
    const { settings, updateSettings } = useExpenses();

    const handleToggleNotifications = (value) => {
        updateSettings({ notifications: value });
    };

    const handleToggleDarkMode = (value) => {
        updateSettings({ darkMode: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Configuración</Text>
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
                        trackColor={{ false: '#cbd5e1', true: '#2c3e50' }}
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
                        trackColor={{ false: '#cbd5e1', true: '#2c3e50' }}
                        thumbColor={settings.darkMode ? '#ffffff' : '#f8fafc'}
                    />
                </View>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Almacenamiento Local Activo</Text>
                <Text style={styles.infoDescription}>
                    Tus ajustes y gastos se guardan en el dispositivo mediante AsyncStorage y sobreviven al cierre de la aplicación.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#7f8c8d',
        marginBottom: 24,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    textContainer: {
        flex: 1,
        marginRight: 16,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 2,
    },
    settingDescription: {
        fontSize: 13,
        color: '#7f8c8d',
    },
    infoCard: {
        backgroundColor: '#ecf0f1',
        borderRadius: 12,
        padding: 16,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 4,
    },
    infoDescription: {
        fontSize: 13,
        color: '#576574',
        lineHeight: 18,
    },
});
