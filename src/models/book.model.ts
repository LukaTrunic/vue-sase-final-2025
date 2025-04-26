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
    authors: string[]; // <-- List of author names
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    categories?: string[]; // <-- List of categories
    thumbnail?: string; // <-- URL to cover image
  }
  