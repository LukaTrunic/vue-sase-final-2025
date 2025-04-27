import { useRouter } from "vue-router";
import type { BookModel } from "./models/book.model";
import { AuthService } from "./services/auth.service";

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
    return book.formats["image/jpeg"];
}

export function doLogout() {
    const router = useRouter()
    AuthService.removeAuth()
    router.push('login')
}