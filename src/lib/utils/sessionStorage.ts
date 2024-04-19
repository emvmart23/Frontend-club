/* Handler Session functions */

export const setSessionStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem(key, value);
    }
};

export const getSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
        return sessionStorage.getItem(key);
    }
};

export const removeSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem(key);
    }
};