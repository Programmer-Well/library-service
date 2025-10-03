import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { FindAllBookUseCase } from './use-cases/find-all-book.use-case';
import { FindByIdBookUseCase } from './use-cases/find-by-id-book.use-case';
import { BookTypeOrmRepository } from 'src/repositories/book.repository';
import { RemoveBookUseCase } from './use-cases/remove-book.use-case';
import { BorrowBookUseCase } from './use-cases/borrow-book.use-case';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReturnBookUseCase } from './use-cases/return-book.use-case';


@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'BOOKS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'mails_queue',
        },
      },
    ]),
  TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    CreateBookUseCase,
    FindAllBookUseCase,
    FindByIdBookUseCase,
    RemoveBookUseCase,
    BorrowBookUseCase,   
    ReturnBookUseCase, 
    BookTypeOrmRepository,
    {
      provide: 'IBookRepository',
      useExisting: BookTypeOrmRepository
    },
  ],
})
export class BooksModule { }
