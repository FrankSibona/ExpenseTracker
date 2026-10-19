import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
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
    </View>
  );
}

// Acá aplicamos el StyleSheet que pide la US3
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
    color: '#2c3e50', // Un tono azul oscuro para que sea legible
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
  },
});