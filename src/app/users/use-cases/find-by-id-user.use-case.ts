import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from 'src/repositories/user.repository';

@Injectable()
export class FindByIdUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
  ) {}

  execute(id: string) {
    return this.userRepo.findById(id);
  }
}
