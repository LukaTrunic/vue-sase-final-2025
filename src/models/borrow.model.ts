export interface BorrowModel {
    borrowId: number;
    bookId: number;
    authorId: number;
    borrowAt: string | null;
    dueAt: string | null;
    returnedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
    book: {
      id: number;
      title: string;
      authors: {
        name: string;
        birth_year: number;
        death_year: number;
      }[];
      summaries: string[];
      translators: string[];
      subjects: string[];
      bookshelves: string[];
      languages: string[];
      copyright: boolean;
      media_type: string;
      formats: {
        "text/html": string;
        "application/epub+zip": string;
        "application/x-mobipocket-ebook": string;
        "application/rdf+xml": string;
        "image/jpeg": string;
        "text/plain; charset=us-ascii": string;
        "application/octet-stream": string;
      };
      download_count: number;
    };
    author: {
      authorId: number;
      name: string;
    };
  }
  