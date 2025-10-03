// src/app/books/books.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Inject, ParseUUIDPipe, Patch, Put } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateBookUseCase } from './use-cases/create-book.use-case';
import { FindAllBookUseCase } from './use-cases/find-all-book.use-case';
import { FindByIdBookUseCase } from './use-cases/find-by-id-book.use-case';
import { RemoveBookUseCase } from './use-cases/remove-book.use-case';
import { BorrowBookUseCase } from './use-cases/borrow-book.use-case';
import { ReturnBookUseCase } from './use-cases/return-book.use-case';

@Controller('books')
export class BooksController {
  [x: string]: any;

  @Inject(FindAllBookUseCase)
  private readonly findAllBookUseCase: FindAllBookUseCase;

  @Inject(FindByIdBookUseCase)
  private readonly findByIdBookUseCase: FindByIdBookUseCase;

  @Inject(CreateBookUseCase)
  private readonly createBookUseCase: CreateBookUseCase;

  @Inject(RemoveBookUseCase)
  private readonly removeBookUseCase: RemoveBookUseCase;

  @Inject(BorrowBookUseCase)
  private readonly borrowBookUseCase: BorrowBookUseCase;

  @Inject(ReturnBookUseCase)
  private readonly returnBookUseCase: ReturnBookUseCase; e;

  @Get()
  findAll() {
    return this.findAllBookUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findByIdBookUseCase.execute(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.createBookUseCase.execute(createBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeBookUseCase.execute(id);
  }

  @Patch(':id/borrow')
  borrow(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowBookUseCase.execute(id);
  }

  @Patch(':id/return')
  return(@Param('id', ParseUUIDPipe) id: string) {
    return this.returnBookUseCase.execute(id);
  }
}