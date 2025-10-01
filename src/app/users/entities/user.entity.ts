import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RoleUser {
  Admin = 'administrador',
  User = 'usuário',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: RoleUser, default: RoleUser.User })
  role: RoleUser;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(
    props?: {
      name: string;
      email: string;
      password: string;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }

  async createHashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);
  }

  verifyUser(user: User): void {
    if (!user) {
      throw new NotFoundException(`O usuario não foi encontrado!`);
    }
  }

  updateRole(role: RoleUser): void {
    if (!Object.values(RoleUser).includes(role as RoleUser)) {
      throw new BadRequestException(
        `Role inválida. Valores permitidos: ${Object.values(RoleUser).join(', ')}`,
      );
    }

    if (this.role === RoleUser.User) {
      throw new BadRequestException("Você não tem permissão para alterar!");
    }

    this.role = role;
  }
}
