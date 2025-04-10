import { AuthRepository } from "../domain/AuthRepository";

export class CallMeUseCase {
  constructor(private authRepository: AuthRepository) { }

  async execute(token: string): Promise<void> {
    return await this.authRepository.callMe(token);
  }
}