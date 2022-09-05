const NAME_KEY = 'login';

export const saveToken = async (data) => {
  localStorage.setItem(NAME_KEY, JSON.stringify(data));
};

export const getLogin = () => {
  const data = localStorage.getItem(NAME_KEY);
  return data === null ? null : JSON.parse(data);
};

export const removeItem = () => {
  localStorage.removeItem(NAME_KEY);
};