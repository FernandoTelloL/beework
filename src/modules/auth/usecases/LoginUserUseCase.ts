import { AuthRepository } from "../domain/AuthRepository";

export class LoginUserUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(email: string, password: string): Promise<string> {
    return await this.authRepository.login(email, password);
  }
}
