// src/repositories/book.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/app/books/entities/book.entity'; 
import { Repository } from 'typeorm';

// Interface agora está explícita, sem o '[x: string]: any'
export interface IBookRepository {
  create(book: Book): Promise<void>;
  update(book: Book): Promise<void>; // <-- ADICIONADO AQUI
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  remove(id: string): Promise<void>;
}

@Injectable()
export class BookTypeOrmRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private typeOrmRepo: Repository<Book>,
  ) {}
  
  async create(book: Book): Promise<void> {
    await this.typeOrmRepo.save(book);
  }

  // <-- IMPLEMENTAÇÃO DO MÉTODO UPDATE ADICIONADA
  async update(book: Book): Promise<void> {
    // O método 'save' do TypeORM funciona como 'upsert':
    // se a entidade tem um ID, ele a atualiza; se não, ele a insere.
    await this.typeOrmRepo.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.typeOrmRepo.find();
  }

  findById(id: string): Promise<Book | null> {
    return this.typeOrmRepo.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}