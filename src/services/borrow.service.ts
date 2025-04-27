import { MainService } from "./main.service";

export class BorrowService {
    static async getBorrows() {
        return await MainService.useAxios('/borrow')
    }
}