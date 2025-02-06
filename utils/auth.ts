import { jwtDecode } from "jwt-decode";
import api from "./api";

export const KEYAPP = "diloi_finance_app.token";

export const isAuthenticated = async () => {
  const token = getToken();

  if (token) {
    const user: any = jwtDecode(token);
    try {
      const response = await api.get(`/users/${user.id}`);
      return response.data;
    } catch (error) {
      console.log(`Error logging in: ${error}`);
      return;
    }
  }

  return;
};

export const getToken = () => localStorage.getItem(KEYAPP);

export const login = (token: string) => {
  localStorage.setItem(KEYAPP, token);
};

export const logout = () => {
  localStorage.removeItem(KEYAPP);
};
