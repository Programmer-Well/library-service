import { Inject, Injectable } from "@nestjs/common";
import type { IBookRepository } from "src/repositories/book.repository";

@Injectable()
export class RemoveBookUseCase{

    constructor(
        @Inject('IBookRepository')
        private bookRepo: IBookRepository
    ){}

    async execute(id: string){
        return this.bookRepo.remove(id);
    }
}

