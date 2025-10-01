import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from 'src/repositories/user.repository';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
  ) {}

  execute() {
    return this.userRepo.findAll();
  }
}
