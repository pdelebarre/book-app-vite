import { AxiosResponse } from "axios";
import { Book } from "./types/book";
export declare const getBooks: () => Promise<AxiosResponse<Book[]>>;
export declare const addBook: (olid: string) => Promise<AxiosResponse<void>>;
export declare const updateBook: (id: number, book: Book) => Promise<AxiosResponse<void>>;
export declare const deleteBook: (id: number) => Promise<AxiosResponse<void>>;
export declare const searchBooks: (title: string, author: string) => Promise<AxiosResponse<Book[]>>;
