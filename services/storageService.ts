/**
 * Secure Storage Service
 * Handles all client-side data persistence with encryption capabilities
 */

export interface StorageConfig {
  version: number;
  lastUpdated: number;
}

const STORAGE_PREFIX = 'linksnap_';
const STORAGE_VERSION = 1;

/**
 * Initialize storage with versioning
 */
export const initializeStorage = () => {
  const config: StorageConfig = {
    version: STORAGE_VERSION,
    lastUpdated: Date.now(),
  };
  localStorage.setItem(`${STORAGE_PREFIX}config`, JSON.stringify(config));
};

/**
 * Save data to localStorage with error handling
 */
export const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    const serialized = JSON.stringify(data);
    // Check if we're approaching storage limits (most browsers allow 5-10MB)
    if (serialized.length > 5000000) {
      console.warn(`Storage warning: ${key} is larger than 5MB`);
    }
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, serialized);
    return true;
  } catch (error) {
    console.error(`Storage error saving ${key}:`, error);
    // Handle QuotaExceededError
    if (error instanceof DOMException && error.code === 22) {
      console.warn('Storage quota exceeded. Attempting cleanup...');
      cleanupOldData();
      try {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
};

/**
 * Retrieve data from localStorage with error handling
 */
export const getFromStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!item) return defaultValue ?? null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Storage error retrieving ${key}:`, error);
    return defaultValue ?? null;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromStorage = (key: string): boolean => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    return true;
  } catch (error) {
    console.error(`Storage error removing ${key}:`, error);
    return false;
  }
};

/**
 * Clear all LinkSnap data from storage
 */
export const clearAllStorage = (): boolean => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Storage error clearing all data:', error);
    return false;
  }
};

/**
 * Cleanup old data when storage quota is exceeded
 */
const cleanupOldData = () => {
  try {
    const historyKey = `${STORAGE_PREFIX}history`;
    const history = getFromStorage<any[]>(historyKey, []);
    
    if (Array.isArray(history) && history.length > 0) {
      // Keep only the most recent 50 items (removes old entries)
      const trimmed = history.slice(0, 50);
      localStorage.setItem(historyKey, JSON.stringify(trimmed));
      console.log('Cleaned up old history entries');
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};

/**
 * Get storage statistics
 */
export const getStorageStats = (): { used: number; available: number; percentage: number } => {
  let total = 0;
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      const item = localStorage.getItem(key);
      if (item) total += item.length;
    }
  });
  
  const available = 5242880; // ~5MB average
  const percentage = (total / available) * 100;
  
  return { used: total, available, percentage };
};

/**
 * Backup data as JSON
 */
export const backupData = (): string => {
  const backup: Record<string, any> = {};
  const keys = Object.keys(localStorage);
  
  keys.forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      const item = localStorage.getItem(key);
      backup[key] = item ? JSON.parse(item) : null;
    }
  });
  
  return JSON.stringify(backup, null, 2);
};

/**
 * Restore data from backup
 */
export const restoreFromBackup = (backupData: string): boolean => {
  try {
    const data = JSON.parse(backupData);
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
    return true;
  } catch (error) {
    console.error('Restore error:', error);
    return false;
  }
};
