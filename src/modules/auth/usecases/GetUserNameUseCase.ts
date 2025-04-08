import { AuthRepository } from "../domain/AuthRepository";

export class GetUserNameUseCase {
  constructor(private authRepository: AuthRepository) { }

  execute(): string | null {
    return this.authRepository.getUserName();
  }
}
