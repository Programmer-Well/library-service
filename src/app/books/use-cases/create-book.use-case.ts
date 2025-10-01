import { Inject, Injectable } from "@nestjs/common";
import type { IBookRepository } from "src/repositories/book.repository";
import { CreateBookDto } from "../dto/create-book.dto";
import { Book } from "../entities/book.entity";

@Injectable()
export class CreateBookUseCase{

    constructor(
        @Inject('IBookRepository')
        private bookRepo: IBookRepository,
    ){}

    async execute(createBookDto: CreateBookDto){
        const book = new Book(createBookDto);
        await this.bookRepo.create(book);
        return book;
    }
}