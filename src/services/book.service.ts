import type { BookModel } from "@/models/book.model";
import axios from "axios";

const client = axios.create({
    baseURL: "https://openlibrary.org",
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
            url: '/search.json',
            method: 'get',
            params : {
                q: 'a'
            }
        })
    }

    static async getBookById(id: number) {
        return await client.get<BookModel>(`/works/${id}.json`)
    }
}