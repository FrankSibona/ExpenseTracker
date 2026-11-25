import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ExpensesProvider, useExpenses } from './src/context/ExpensesContext';
import StackNavigator from './src/navigation/StackNavigator';

function MainApp() {
    const { isLoaded } = useExpenses();

    if (!isLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2c3e50" />
            </View>
        );
    }

    return <StackNavigator />;
}

export default function App() {
    return (
        <ExpensesProvider>
            <MainApp />
        </ExpensesProvider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
});
