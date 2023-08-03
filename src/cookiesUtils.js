import Cookies from 'js-cookie';

// Save a value to Cookies
export const saveToCookies = (key, value, exp) => {
  try {
    if (exp !== undefined)
      Cookies.set(key, JSON.stringify(value), { expires: exp });
    else
      Cookies.set(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to Cookies:', error);
  }
};

// Retrieve a value from Cookies
export const getFromCookies = (key) => {
  try {
    const value = Cookies.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving from Cookies:', error);
    return null;
  }
};

// Remove a value from Cookies
export const removeFromCookies = (key) => {
  try {
    Cookies.remove(key);
  } catch (error) {
    console.error('Error removing from Cookies:', error);
  }
};

