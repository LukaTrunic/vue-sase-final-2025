import type { BorrowModel } from "@/models/borrow.model";
import { MainService } from "./main.service";

export class BorrowService {
    static async getBorrows() {
        return await MainService.useAxios<BorrowModel[]>('/borrow')
    }

    static async getBorrowById(id: number){
        return await MainService.useAxios<BorrowModel>(`/borrow/${id}`)
    }

    static async createBorrow(model: any) {
        return await MainService.useAxios(`/borrow`, 'post', model)
    }

    static async updateBorrow(id: number, model: any) {
        return await MainService.useAxios(`/borrow/${id}`, 'put', model)
    }

    static async returnBorrow(id: number) {
        return await MainService.useAxios(`/borrow/${id}/return`, 'put')
    }

    static async deleteBorrow(id: number){
        return await MainService.useAxios(`/borrow/${id}`, 'delete')
    }
}