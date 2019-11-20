/**
 * Tries to load data from localStorage
 */

export const loadToken = () => {
  try {
    const serializedToken = localStorage.getItem("token");
    if (serializedToken === null) {
      return null;
    }
    return serializedToken;
  } catch (err) {
    return null;
  }
};
