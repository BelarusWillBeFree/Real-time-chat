
export const saveToken = async (data) => {
  localStorage.setItem('login', JSON.stringify(data));
};

export const getLogin = () => {
  const data = localStorage.getItem('login');
  return data === null ? null : JSON.parse(data);
};

export const removeItem = (nameItem) => {
  localStorage.removeItem(nameItem);
};