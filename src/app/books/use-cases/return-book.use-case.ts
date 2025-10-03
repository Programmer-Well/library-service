import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { IBookRepository } from 'src/repositories/book.repository';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReturnBookUseCase {
    constructor(
        @Inject('IBookRepository')
        private readonly bookRepository: IBookRepository,
        @Inject('BOOKS_SERVICE')
        private client: ClientProxy,
    ) { }

    async execute(id: string): Promise<void> {
        const book = await this.bookRepository.findById(id);

        if (!book) {
            throw new NotFoundException(`Livro com ID ${id} não encontrado.`);
        }

        const borrowerInfo = book.borrower;

        book.return(); 
        await this.bookRepository.update(book);

        if (borrowerInfo) {
    
            this.client.emit('book.returned', {
                user: {
                    name: borrowerInfo.name,
                    email: borrowerInfo.email,
                },
                book: {
                    id: book.id,
                    title: book.title,
                },
                
                returnedAt: new Date().toISOString(),
            });
        }
    }
}