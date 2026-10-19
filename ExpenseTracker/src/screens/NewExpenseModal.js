import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function NewExpenseModal() {
  // Estados para guardar temporalmente lo que el usuario escribe
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  // Función que se ejecuta al presionar el botón "Guardar"
  const handleGuardar = () => {
    // Mostramos un mensaje temporal como pide la validación de la US4
    Alert.alert('¡Gasto Registrado!', `Nombre: ${nombre}\nMonto: $${monto}\nCategoría: ${categoria}`);
    
    // Limpiamos los campos
    setNombre('');
    setMonto('');
    setCategoria('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cargar Nuevo Gasto</Text>
      
      {/* Input para el Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del gasto (ej. Supermercado)"
        value={nombre}
        onChangeText={setNombre}
      />
      
      {/* Input para el Monto */}
      <TextInput
        style={styles.input}
        placeholder="Monto (ej. 25000)"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      
      {/* Input para la Categoría */}
      <TextInput
        style={styles.input}
        placeholder="Categoría (ej. Comida)"
        value={categoria}
        onChangeText={setCategoria}
      />

      {/* Botón Guardar */}
      <Button 
        title="Guardar" 
        onPress={handleGuardar} 
        color="#2c3e50" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});