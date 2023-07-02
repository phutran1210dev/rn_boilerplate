import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Loads a string from storage.
 *
 * @param {string} key - The key to fetch.
 * @returns {Promise<string | null>} A promise that resolves to the fetched string or null if an error occurs.
 */
export async function loadStringFromStorage(
  key: string,
): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    // Handle error
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param {string} key - The key to store.
 * @param {string} value - The value to store.
 * @returns {Promise<boolean>} A promise that resolves to true if the string is saved successfully, or false if an error occurs.
 */
export async function saveStringToStorage(
  key: string,
  value: string,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Handle error
    return false;
  }
}

/**
 * Loads and parses an object from storage.
 *
 * @param {string} key - The key to fetch.
 * @returns {Promise<any | null>} A promise that resolves to the parsed object or null if an error occurs.
 */
export async function loadObjectFromStorage(key: string): Promise<any | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (error) {
    // Handle error
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param {string} key - The key to store.
 * @param {any} value - The value to store.
 * @returns {Promise<boolean>} A promise that resolves to true if the object is saved successfully, or false if an error occurs.
 */
export async function saveObjectToStorage(
  key: string,
  value: any,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // Handle error
    return false;
  }
}

/**
 * Removes an item from storage.
 *
 * @param {string} key - The key to remove.
 * @returns {Promise<void>} A promise that resolves when the item is removed or if an error occurs.
 */
export async function removeItemFromStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Handle error
  }
}

/**
 * Clears all items from storage.
 *
 * @returns {Promise<void>} A promise that resolves when all items are cleared or if an error occurs.
 */
export async function clearStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    // Handle error
  }
}
