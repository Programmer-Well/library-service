// src/app/books/books.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Inject, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { FindAllBookUseCase } from './use-cases/find-all-book.use-case';
import { FindByIdBookUseCase } from './use-cases/find-by-id-book.use-case';
import { RemoveBookUseCase } from './use-cases/remove-book.use-case';
import { BorrowBookUseCase } from './use-cases/borrow-book.use-case'; // Import renomeado
import { ReturnBookUseCase } from './use-cases/return-book.use-case'; // Novo import

@Controller('books')
export class BooksController {
  // Removido o '[x: string]: any;'

  @Inject(FindAllBookUseCase)
  private readonly findAllBookUseCase: FindAllBookUseCase;

  @Inject(FindByIdBookUseCase)
  private readonly findByIdBookUseCase: FindByIdBookUseCase;

  @Inject(CreateBookUseCase)
  private readonly createBookUseCase: CreateBookUseCase; // <-- CORRIGIDO AQUI

  @Inject(RemoveBookUseCase)
  private readonly removeBookUseCase: RemoveBookUseCase;

  @Inject(BorrowBookUseCase) // Injetando o use case renomeado
  private readonly borrowBookUseCase: BorrowBookUseCase;

  @Inject(ReturnBookUseCase) // Injetando o novo use case
  private readonly returnBookUseCase: ReturnBookUseCase;

  @Get()
  findAll() {
    return this.findAllBookUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { // Adicionado ParseUUIDPipe para validação
    return this.findByIdBookUseCase.execute(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.createBookUseCase.execute(createBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) { // Adicionado ParseUUIDPipe
    return this.removeBookUseCase.execute(id);
  }

  @Patch(':id/borrow')
  borrow(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowBookUseCase.execute(id); // Usando o método padrão 'execute'
  }

  @Patch(':id/return')
  return(@Param('id', ParseUUIDPipe) id: string) {
    return this.returnBookUseCase.execute(id); // Usando o novo use case
  }
}