// src/components/BookTable.test.tsx
import React from "react";
import { describe,beforeEach,test,expect,vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookTable from "../../BookTable";
import { Book } from "../../../types/book";


// Mock data for books
const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publicationDate: "1925",
    language: "English",
    pageCount: 218,
    coverUrl: "https://example.com/gatsby.jpg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publicationDate: "1960",
    language: "English",
    pageCount: 281,
    coverUrl: "https://example.com/mockingbird.jpg",
  },
];

const handleEdit = vi.fn();
const handleDelete = vi.fn();

describe("BookTable Component", () => {
  beforeEach(() => {
    render(
      <BookTable
        books={books}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );
  });

  test("renders table with books", () => {
    // Check if the table renders with correct number of rows
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
  });

  test("sorts books by title in ascending order when clicked", () => {
    const titleSortButton = screen.getAllByRole("button", {
      name: /title/i,
    })[0];

    // Click to sort by title ascending
    fireEvent.click(titleSortButton);

    // After sorting, check the order of book titles
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("The Great Gatsby");
    expect(rows[2]).toHaveTextContent("To Kill a Mockingbird");
  });

  test("filters books by title", () => {
    const filterButton = screen.getAllByRole("button", { name: /filter/i })[0];

    // Open filter menu
    fireEvent.click(filterButton);

    const input = screen.getByLabelText("Filter by title");
    fireEvent.change(input, { target: { value: "Gatsby" } });

    // Check that the correct book is displayed after filtering
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.queryByText("To Kill a Mockingbird")).not.toBeInTheDocument();
  });

  test("calls handleEdit when edit action is triggered", () => {
    const editButton = screen.getAllByRole("button", { name: /edit/i })[0]; // Adjust as per the actual DOM
    fireEvent.click(editButton);
    expect(handleEdit).toHaveBeenCalled();
  });

  test("calls handleDelete when delete action is triggered", () => {
    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0]; // Adjust as per the actual DOM
    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
});
