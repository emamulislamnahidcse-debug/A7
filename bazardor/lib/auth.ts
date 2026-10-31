export type User = { name: string; email: string };

export const getUser = (): User | null => {
  try {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

export const saveUser = (u: User) => {
  localStorage.setItem("user", JSON.stringify(u));
  window.dispatchEvent(new Event("user-change"));
};

export const clearUser = () => {
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("user-change"));
};