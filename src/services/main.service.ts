import axios from "axios"

const client = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class MainService {
    static async useAxios<T>(
        url: string, 
        method: 'get' | 'post' | 'put' | 'delete' = 'get', 
        data: any = {}) {
        return await client.request<T>({
            url: url,
            method: method,
            data: data,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJsdWthLnRydW5pYy4yMUBzaW5naW1haWwucnMiLCJpYXQiOjE3NDU3Njc4ODgsImV4cCI6MTc0NTg1NDI4OH0.kulLCPN_t7LlxYG5J-_JNVR-7WDJzVi3PIy0mYddzIM'
            }
        })
    }
}