import type { BookModel } from "@/models/book.model";
import axios from "axios";

const client = axios.create({
    baseURL: "https://www.googleapis.com",
    timeout: 12000,
    headers: {
        'Accept': 'application/json',
        'X-Name': 'The Library System' // you can check which frontend application is using your beckend application
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class BookService {
    static async getBooks() {
        return await client.request<BookModel[]>({
            url: '/books/v1/volumes?q=harry+potter',
            method: 'get',
            params : {
                type: 'title'
            }
        })
    }

    static async getBookById(id: number) {
        return await client.get<BookModel>(`/book/v1/volumes/${id}`)
    }
}