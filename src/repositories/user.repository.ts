import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';

export interface IUserRepository {
    [x: string]: any;
    create(user: User): Promise<void>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
}

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private typeOrmRepo: Repository<User>,
    ) { }

    async create(user: User): Promise<void> {
        await this.typeOrmRepo.save(user);
    }

    findAll(): Promise<User[]> {
        return this.typeOrmRepo.find();
    }

    findById(id: string): Promise<User> {
        return this.typeOrmRepo.findOneOrFail({ where: { id } });
    }
    
    async remove(id: string): Promise<void> {
        await this.typeOrmRepo.delete(id);
    }
}
