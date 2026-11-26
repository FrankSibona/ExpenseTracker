import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

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
    const [isExpensesLoaded, setIsExpensesLoaded] = useState(false);
    const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

    const isLoaded = isExpensesLoaded && isSettingsLoaded;

    // 1. Hidratación de ajustes locales desde AsyncStorage (Capa 1)
    useEffect(() => {
        let isMounted = true;

        async function loadStoredSettings() {
            try {
                const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
                if (storedSettings !== null && isMounted) {
                    const parsedSettings = JSON.parse(storedSettings);
                    setSettings((prev) => ({ ...prev, ...parsedSettings }));
                }
            } catch (error) {
                console.error('[ExpensesContext] Error al cargar ajustes desde AsyncStorage:', error);
            } finally {
                if (isMounted) {
                    setIsSettingsLoaded(true);
                }
            }
        }

        loadStoredSettings();

        return () => {
            isMounted = false;
        };
    }, []);

    // 2. Persistencia de ajustes en AsyncStorage ante cada cambio
    useEffect(() => {
        if (!isSettingsLoaded) return;

        async function persistSettings() {
            try {
                await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            } catch (error) {
                console.error('[ExpensesContext] Error al guardar ajustes en AsyncStorage:', error);
            }
        }

        persistSettings();
    }, [settings, isSettingsLoaded]);

    // 3. Suscripción en tiempo real a Cloud Firestore para gastos (Capa 2)
    useEffect(() => {
        let unsubscribe = () => {};

        try {
            const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'));

            unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const items = snapshot.docs.map((docSnap) => {
                        const data = docSnap.data({ serverTimestamps: 'estimate' });

                        let createdAt = new Date().toISOString();
                        if (data.createdAt) {
                            if (typeof data.createdAt.toDate === 'function') {
                                createdAt = data.createdAt.toDate().toISOString();
                            } else if (data.createdAt instanceof Date) {
                                createdAt = data.createdAt.toISOString();
                            } else if (typeof data.createdAt === 'string') {
                                createdAt = data.createdAt;
                            }
                        }

                        const title = (data.title || data.descripcion || '').trim();
                        const amount = Number(data.amount ?? data.monto ?? 0);
                        const category = data.category || data.categoria || 'Alimentación';
                        const notes = (data.notes ?? data.notas ?? '').trim();

                        return {
                            id: docSnap.id,
                            title,
                            amount,
                            category,
                            notes,
                            createdAt,
                            // Alias para compatibilidad con vistas existentes
                            descripcion: title,
                            monto: amount,
                            categoria: category,
                            notas: notes,
                            fecha: createdAt,
                        };
                    });

                    setExpenses(items);
                    setIsExpensesLoaded(true);
                },
                (error) => {
                    console.error('[ExpensesContext] Error en onSnapshot de Firestore:', error);
                    setIsExpensesLoaded(true);
                }
            );
        } catch (err) {
            console.error('[ExpensesContext] Error al inicializar Firestore listener:', err);
            setIsExpensesLoaded(true);
        }

        return () => {
            unsubscribe();
        };
    }, []);

    // 4. Alta de gasto: addDoc() con serverTimestamp() sin await (Optimistic UI)
    const addExpense = (data) => {
        const title = (data.title || data.descripcion || '').trim();
        const amount = Number(data.amount ?? data.monto ?? 0);
        const category = data.category || data.categoria || 'Alimentación';
        const notes = (data.notes ?? data.notas ?? '').trim();

        const newDocData = {
            title,
            amount,
            category,
            notes,
            createdAt: serverTimestamp(),
        };

        addDoc(collection(db, 'expenses'), newDocData).catch((err) => {
            console.error('[ExpensesContext] Error al guardar gasto en Firestore:', err);
        });

        return {
            title,
            amount,
            category,
            notes,
            createdAt: new Date().toISOString(),
            descripcion: title,
            monto: amount,
            categoria: category,
            notas: notes,
            fecha: new Date().toISOString(),
        };
    };

    // 5. Baja de gasto: deleteDoc()
    const removeExpense = (id) => {
        if (!id) return;
        deleteDoc(doc(db, 'expenses', String(id))).catch((err) => {
            console.error('[ExpensesContext] Error al eliminar gasto en Firestore:', err);
        });
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
