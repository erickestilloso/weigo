// localStorageService.ts

class LocalStorageService {
    // Set an item in local storage
    static setItem<T>(key: string, value: T): void {
        try {
            const serializedValue = JSON.stringify(value);
            window.localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting item in localStorage: ${error}`);
        }
    }

    // Get an item from local storage
    static getItem<T>(key: string): T | null {
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : null;
        } catch (error) {
            console.error(`Error getting item from localStorage: ${error}`);
            return null;
        }
    }

    // Remove an item from local storage
    static removeItem(key: string): void {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item from localStorage: ${error}`);
        }
    }

    // Clear all items from local storage
    static clear(): void {
        try {
            window.localStorage.clear();
        } catch (error) {
            console.error(`Error clearing localStorage: ${error}`);
        }
    }
}

export default LocalStorageService;
