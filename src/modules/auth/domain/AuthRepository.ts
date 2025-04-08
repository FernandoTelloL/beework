export interface AuthRepository {
  saveUserName(name: string): void;
  getUserName(): string | null;
  login(email: string, password: string): Promise<string>; // Retorna un token
}
