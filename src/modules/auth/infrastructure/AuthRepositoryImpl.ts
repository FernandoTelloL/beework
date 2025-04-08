import { AuthRepository } from "../domain/AuthRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthRepositoryImpl implements AuthRepository {

  async saveUserName(name: string): Promise<void> {
    await AsyncStorage.setItem("userName", name);
  }

  getUserName(): string | null {
    return AsyncStorage.getItem("userName") as unknown as string;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // email,
          // password

          username: 'emilys',
          password: 'emilyspass',

        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      throw new Error("Error de autenticación");
    }
  }
}
