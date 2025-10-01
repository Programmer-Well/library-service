import { Inject, Injectable } from '@nestjs/common';

import type { IUserRepository } from 'src/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private userRepo: IUserRepository,
    @Inject('PROJECTS_SERVICE')
    private client: ClientProxy
  ) { }

  async execute(createUserDto: CreateUserDto) {

    const user = new User(createUserDto);
    await user.createHashPassword(user.password);
    await this.userRepo.create(user);

    this.client.emit('user.created', {
      id: user.id,
      name: user.name,
      email: user.email,
    });
    
    return user;
  }
}