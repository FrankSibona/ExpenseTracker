/**
 * categories.js
 * Categorías y estilos compartidos para ExpenseTracker (React Native).
 */

export const CATEGORIES = [
    { id: 'alimentacion', name: 'Alimentación', color: '#f59e0b', bg: '#fff4e6', text: '#d97706', icon: 'restaurant' },
    { id: 'transporte', name: 'Transporte', color: '#38bdf8', bg: '#e0f2fe', text: '#0284c7', icon: 'directions_car' },
    { id: 'servicios', name: 'Servicios', color: '#a855f7', bg: '#f3e8ff', text: '#7c3aed', icon: 'bolt' },
    { id: 'salud', name: 'Salud', color: '#34d399', bg: '#ecfdf5', text: '#059669', icon: 'medical_services' },
    { id: 'entretenimiento', name: 'Entretenimiento', color: '#f472b6', bg: '#fdf2f8', text: '#db2777', icon: 'sports_esports' },
];

export const CATEGORY_STYLES = {
    Alimentación: { bg: '#fff4e6', text: '#d97706', border: '#f59e0b', icon: 'restaurant-outline' },
    Comida: { bg: '#fff4e6', text: '#d97706', border: '#f59e0b', icon: 'restaurant-outline' },
    Transporte: { bg: '#e0f2fe', text: '#0284c7', border: '#38bdf8', icon: 'car-outline' },
    Servicios: { bg: '#f3e8ff', text: '#7c3aed', border: '#a855f7', icon: 'flash-outline' },
    Salud: { bg: '#ecfdf5', text: '#059669', border: '#34d399', icon: 'medkit-outline' },
    Entretenimiento: { bg: '#fdf2f8', text: '#db2777', border: '#f472b6', icon: 'game-controller-outline' },
};

export const DEFAULT_CATEGORY_STYLE = {
    bg: '#f1f5f9',
    text: '#475569',
    border: '#94a3b8',
    icon: 'pricetag-outline',
};
