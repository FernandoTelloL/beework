export interface AuthRepository {
  login(email: string, password: string): Promise<string>; // Retorna un token
  callMe(token: string): Promise<void>;
}
