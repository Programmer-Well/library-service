// src/app/books/use-cases/return-book.use-case.ts

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { IBookRepository } from 'src/repositories/book.repository'; // Ajuste o caminho
import { Book } from '../entities/book.entity';

@Injectable()
export class ReturnBookUseCase {
    constructor(
        @Inject('IBookRepository')
        private readonly bookRepository: IBookRepository,
    ) { }

    async execute(id: string): Promise<Book> {
        const book = await this.bookRepository.findById(id);

        if (!book) {
            throw new NotFoundException(`Livro com ID ${id} não encontrado.`);
        }
        book.return();

        await this.bookRepository.update(book);

        return book;
    }
}