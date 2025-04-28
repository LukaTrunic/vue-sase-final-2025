import type { BookModel } from "./book.model"

export interface BorrowModel {
    borrowId: number
    bookId: number
    authorId: number
    borrowAt: string
    dueAt: string | null
    returnedAt: string | null
    createdAt: string
    updatedAt: string | null
    book: BookModel
    author: {
        authorId: number,
        name: string
    }
}