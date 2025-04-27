import type { BookModel } from "@/models/book.model";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class BookService {
    static async getBooks() {
        return await client.get<BookModel[]>('/books')
    }

    static async getBookById(id: number) {
        return await client.get<BookModel>(`/books/${id}`);
    }
}