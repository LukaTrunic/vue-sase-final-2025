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
    id: number;
    title: string;
    authors: {
      name: string;
      birth_year: number | null;
      death_year: number | null;
    }[];
    summaries: string[];
    translators: {
      name: string;
      birth_year: number | null;
      death_year: number | null;
    }[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    media_type: string;
    formats: {
      "text/html"?: string;
      "application/epub+zip"?: string;
      "application/x-mobipocket-ebook"?: string;
      "application/rdf+xml"?: string;
      "image/jpeg"?: string;
      "text/plain; charset=us-ascii"?: string;
      "application/octet-stream"?: string;
    };
    download_count: number;
  }
  
  
  