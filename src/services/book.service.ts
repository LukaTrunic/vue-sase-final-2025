import type { BookModel } from "@/models/book.model";
import { MainService } from "./main.service";

export class BookService {
    static async getBooks() {
        return await MainService.useAxios<BookModel[]>('/books')
    }

    static async getBookById(id: number) {
        return await MainService.useAxios<BookModel>(`/books/${id}`);
    }
}