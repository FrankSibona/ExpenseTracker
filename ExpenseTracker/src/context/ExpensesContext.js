import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Claves de almacenamiento
export const EXPENSES_STORAGE_KEY = '@expensetracker/expenses';
export const SETTINGS_STORAGE_KEY = '@expensetracker/settings';

const DEFAULT_SETTINGS = {
    notifications: true,
    darkMode: false,
};

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
    const [expenses, setExpenses] = useState([]);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Efecto de montaje: Hidratación desde AsyncStorage
    useEffect(() => {
        let isMounted = true;

        async function loadStoredData() {
            try {
                const [storedExpenses, storedSettings] = await Promise.all([
                    AsyncStorage.getItem(EXPENSES_STORAGE_KEY),
                    AsyncStorage.getItem(SETTINGS_STORAGE_KEY),
                ]);

                if (!isMounted) return;

                if (storedExpenses !== null) {
                    const parsedExpenses = JSON.parse(storedExpenses);
                    setExpenses(Array.isArray(parsedExpenses) ? parsedExpenses : []);
                }

                if (storedSettings !== null) {
                    const parsedSettings = JSON.parse(storedSettings);
                    setSettings((prev) => ({ ...prev, ...parsedSettings }));
                }
            } catch (error) {
                console.error('[ExpensesContext] Error al cargar datos desde AsyncStorage:', error);
            } finally {
                if (isMounted) {
                    setIsLoaded(true);
                }
            }
        }

        loadStoredData();

        return () => {
            isMounted = false;
        };
    }, []);

    // 2. Efecto de persistencia de gastos: SÓLO si isLoaded es true
    useEffect(() => {
        if (!isLoaded) return;

        async function persistExpenses() {
            try {
                await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
            } catch (error) {
                console.error('[ExpensesContext] Error al guardar gastos en AsyncStorage:', error);
            }
        }

        persistExpenses();
    }, [expenses, isLoaded]);

    // 3. Efecto de persistencia de ajustes: SÓLO si isLoaded es true
    useEffect(() => {
        if (!isLoaded) return;

        async function persistSettings() {
            try {
                await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            } catch (error) {
                console.error('[ExpensesContext] Error al guardar ajustes en AsyncStorage:', error);
            }
        }

        persistSettings();
    }, [settings, isLoaded]);

    const addExpense = (data) => {
        const title = (data.title || data.descripcion || '').trim();
        const amount = Number(data.amount ?? data.monto ?? 0);
        const category = data.category || data.categoria || 'Alimentación';
        const notes = (data.notes ?? data.notas ?? '').trim();
        const createdAt = data.createdAt || data.fecha || new Date().toISOString();

        const newExpense = {
            id: data.id || Math.random().toString(36).substring(2, 9),
            title,
            amount,
            category,
            notes,
            createdAt,
            // Alias para compatibilidad con código existente
            descripcion: title,
            monto: amount,
            categoria: category,
            notas: notes,
            fecha: createdAt,
        };

        setExpenses((prev) => [newExpense, ...prev]);
        return newExpense;
    };

    const removeExpense = (id) => {
        setExpenses((prev) => prev.filter((item) => String(item.id) !== String(id)));
    };

    const updateSettings = (newSettings) => {
        setSettings((prev) => ({
            ...prev,
            ...(typeof newSettings === 'function' ? newSettings(prev) : newSettings),
        }));
    };

    return (
        <ExpensesContext.Provider
            value={{
                expenses,
                isLoaded,
                addExpense,
                removeExpense,
                settings,
                updateSettings,
            }}
        >
            {children}
        </ExpensesContext.Provider>
    );
}

export function useExpenses() {
    const context = useContext(ExpensesContext);
    if (!context) {
        throw new Error('useExpenses debe ser utilizado dentro de un ExpensesProvider');
    }
    return context;
}
