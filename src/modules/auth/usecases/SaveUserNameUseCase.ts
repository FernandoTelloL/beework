import { AuthRepository } from "../domain/AuthRepository";

export class SaveUserNameUseCase {
  constructor(private authRepository: AuthRepository) { }

  execute(name: string): void {
    this.authRepository.saveUserName(name);
  }
}
