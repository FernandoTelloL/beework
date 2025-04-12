import { AuthRepository } from "../domain/AuthRepository";

export class LoginUserUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(email: string, password: string): Promise<string> {
    return this.authRepository.login(email, password);
  }
}
