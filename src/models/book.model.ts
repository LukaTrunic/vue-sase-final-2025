// export interface BookModel {
//     id: string;
//     title: string;
//     author: {
//         id: number;
//         name: string;
//     };
//     category: {
//         id: number;
//         name: string;
//     };
//     publishedDate?: string;
//     pages?: number;
//     description?: string;
//     coverImage?: string;
// }

export interface BookModel {
    id: string;
    title: string;
    authors: string[];
    publishedDate?: string;
    categories?: string[];
    thumbnail?: string;
}
  
  