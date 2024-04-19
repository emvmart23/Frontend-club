/* Handler cookies functions */

export const setCookie = (key: string, value: string, days: number) => {
    if (typeof window !== "undefined") {
        const date = new Date();
        date.setTime(date.getTime() + days + 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${key}=${value};${expires};path=/`;
    }
};

export const getCookie = (key: string) => {
    if (typeof window !== "undefined") {
        const name = `${key}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1);
                2;
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    }
    return "";
};

export const removeCookie = (key: string) => {
    if (typeof window !== "undefined") {
        document.cookie = `${key}=; Max-Age=-99999999;`;
    }
};