export function useLocalStorage() {
  const saveToLs = (key: string, obj: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(obj));
      return true;
    } catch (error) {
      console.error('Error while saving item to Local Storage: ' + error);
      return false;
    }
  };

  const removeFromLs = (key: string): void => {
    localStorage.removeItem(key);
  };

  const isPresentInLs = (key: string): boolean => {
    return localStorage.getItem(key) ? true : false;
  };

  const getFromLs = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) || '');
  };

  return { isPresentInLs, removeFromLs, saveToLs, getFromLs };
}
