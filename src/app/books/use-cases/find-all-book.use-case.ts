import { Inject, Injectable } from "@nestjs/common";
import type { IBookRepository } from "src/repositories/book.repository";

@Injectable()
export class FindAllBookUseCase{

    constructor(
        @Inject('IBookRepository')
        private bookRepo: IBookRepository,
    ){}

    async execute(){
        return this.bookRepo.findAll();
    }
}