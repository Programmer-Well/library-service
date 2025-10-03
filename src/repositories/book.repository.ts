import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBookDto } from 'src/app/books/dto/update-book.dto';
import { Book } from 'src/app/books/entities/book.entity'; 
import { Repository } from 'typeorm';

export interface IBookRepository {
  [x: string]: any;
  create(book: Book): Promise<void>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  update(book: Book): Promise<void>;
  remove(id: string): Promise<void>;
}

@Injectable()
export class BookTypeOrmRepository implements IBookRepository {
  constructor(
    @InjectRepository(Book)
    private typeOrmRepo: Repository<Book>,
  ) {}
  
  async update(book: Book): Promise<void> {
    await this.typeOrmRepo.save(book);
  }
  
  async create(book: Book): Promise<void> {
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