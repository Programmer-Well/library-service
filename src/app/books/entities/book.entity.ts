import { BadRequestException } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BookStatus {
  Available = 'available', 
  Borrowed = 'borrowed',   
}

@Entity()
export class Book {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;
  
  @Column({ type: 'timestamp', nullable: true })
  borrowedAt: Date | null;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.Available,
  })
  status: BookStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(
    props?: {
      title: string;
      author: string;
      category:string;
    },
    id?: string,
  ) {
   
    Object.assign(this, props);
  
    this.id = id ?? crypto.randomUUID();
    
    if (!props) { 
      this.status = BookStatus.Available;
    }
  }


  borrow() {
    if (this.status === BookStatus.Borrowed) {
      throw new BadRequestException('Este livro já está emprestado.');
    }

    this.status = BookStatus.Borrowed;
    this.borrowedAt = new Date();
  }

  return() {
    if (this.status === BookStatus.Available) {
      throw new BadRequestException('Não é possível devolver um livro que já está disponível.');
    }

    this.status = BookStatus.Available;
    this.borrowedAt = null; 
  }
}