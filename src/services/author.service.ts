import type { AuthorModel } from "@/models/author.model";
import { MainService } from "./main.service";

export class AuthorService {
    static async getAuthors() {
        return await MainService.useAxios<AuthorModel[]>('/author')
    }

    static async getAuthorById(id:number) {
        return await MainService.useAxios<AuthorModel>(`/author/${id}`)
    }
}