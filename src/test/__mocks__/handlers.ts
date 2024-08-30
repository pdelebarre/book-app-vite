// src/mocks/handlers.ts
import { http } from "msw";
import { Book } from "../../types/book";

const mockBooks: Book[] = [
  {
    openLibraryId: "1",
    title: "Book One",
    author: "Author One",
    language: "English",
    pageCount: 200,
  },
  {
    openLibraryId: "2",
    title: "Book Two",
    author: "Author Two",
    language: "Spanish",
    pageCount: 300,
  },
];

export const handlers = [
  http.get("/api/searchBooks", (req: any, res: (arg0: any) => any, ctx: { json: (arg0: { data: Book[]; }) => any; }) => {
    return res(ctx.json({ data: mockBooks }));
  }),
];
