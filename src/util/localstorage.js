
/**
 * save an item to local sotrage
 * @param {string} key 
 * @param {string | number | boolean | object | any[]} - value to be saved
 */
export function saveTolocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


/**
 * 
 * @param {string} key - key to be read from local storage
 * @returns {string | number | boolean | object | any[]} - value to be read and parsed
 */
export function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}


/**
 * 
 * @param {string} key 
 * @returns {undefined}
 */
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key)
}


/**
 * save an item to local sotrage
 * @param {string} key 
 * @param {string | number | boolean | object | any[]} - value to be saved
 */
export function saveToSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
}


/**
 * 
 * @param {string} key - key to be read from local storage
 * @returns {string | number | boolean | object | any[]} - value to be read and parsed
 */
export function readFromSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key))
}

/**
 * 
 * @param {string} key 
 * @returns {undefined}
 */
export function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key)
}






