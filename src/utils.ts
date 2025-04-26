import type { BookModel } from "./models/book.model";

export function formatTime(iso: string) { // special time format ISO 8601 (YYYY-MM-DDTHH:mm:ss.SSSZ)
    return new Date(iso).toLocaleString('sr-RS', {
        year: "numeric",
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function coverImage(book: BookModel) {
    return book.thumbnail
  }