# Patrón de Hidratación y Persistencia Local (AsyncStorage)

En esta User Story (#rn-s3-us3) implementamos la persistencia local de datos en React Native mediante `@react-native-async-storage/async-storage`.

---

## 1. Claves de Almacenamiento

Definidas como constantes en `src/context/ExpensesContext.js`:

```javascript
export const EXPENSES_STORAGE_KEY = '@expensetracker/expenses';
export const SETTINGS_STORAGE_KEY = '@expensetracker/settings';
```

---

## 2. Arquitectura de dos efectos: Hidratación y Persistencia

### Paso 1: Hidratación (Carga inicial)
Al montar el `ExpensesProvider`, se ejecuta un `useEffect` que:
1. Lee las claves desde AsyncStorage de manera asíncrona (`await`).
2. Deserializa los datos con `JSON.parse()`.
3. Actualiza los estados locales (`expenses` y `settings`).
4. Finalmente marca la bandera `isLoaded = true`.
5. Si ocurre algún error en la lectura, se captura en un bloque `try/catch`.

### Paso 2: Persistencia (Guardado ante cambios)
Los efectos que guardan los cambios en AsyncStorage se disparan cada vez que el estado cambia, **pero están bloqueados** si `isLoaded === false`:

```javascript
useEffect(() => {
    if (!isLoaded) return; // ¡CRUCIAL: Bloquea guardado prematuro!

    async function persistExpenses() {
        try {
            await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
        } catch (error) {
            console.error('Error al guardar gastos:', error);
        }
    }

    persistExpenses();
}, [expenses, isLoaded]);
```

---

## 3. El error más común: Carrera de renderizado y pérdida de datos

### ¿Qué pasa si NO controlamos con `isLoaded`?
1. El componente `ExpensesProvider` se monta con el estado inicial `expenses = []`.
2. Se dispara el efecto de lectura asíncrono (`AsyncStorage.getItem`).
3. Al mismo tiempo o inmediatamente en el primer render, si el efecto de guardado no verifica `isLoaded`, detecta que `expenses` existe (un arreglo vacío `[]`) y ejecuta:
   ```javascript
   await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify([]));
   ```
4. Esta escritura sobreescribe inmediatamente la información guardada en el dispositivo **antes** de que la lectura haya terminado.
5. Resultado: **se pierden irremediablemente todos los gastos del usuario**.

### Solución aplicada
- La bandera `isLoaded` inicializa en `false`.
- Mientras `isLoaded` sea `false`, el efecto de guardado retorna inmediatamente (`if (!isLoaded) return;`).
- Además, la app muestra un `ActivityIndicator` hasta que la hidratación finaliza exitosamente.

---

## 4. Persistencia de Ajustes

En `SettingsScreen`, los dos componentes `Switch` (Notificaciones y Modo Oscuro) se conectan al objeto `settings` del Context:
- Al alternar un switch, se invoca `updateSettings(...)`.
- El efecto de persistencia detecta el cambio en `settings` y lo almacena bajo `@expensetracker/settings`.
- Al cerrar la app y volver a abrirla, los switches conservan su último estado seleccionado.
