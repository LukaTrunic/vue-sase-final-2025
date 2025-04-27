import type { AuthorModel } from "@/models/author.model";
import { MainService } from "./main.service";

export class AuthorService {
    static async getAuthors() {
        return await MainService.useAxios<AuthorModel[]>('/author')
    }

    static async getAuthorById(id:number) {
        return await MainService.useAxios<AuthorModel>(`/author/${id}`)
    }

    static async createAuthor(model: any) {
        return await MainService.useAxios('/author', 'post', model)
    }

    static async updateAuthor(id: number, model:any) {
        return await MainService.useAxios(`/author/${id}`, 'put', model)
    }

    static async deleteAuthor(id:number) {
        return await MainService.useAxios(`/author/${id}`, 'delete')
    }
}