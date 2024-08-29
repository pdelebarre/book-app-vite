// src/components/BookTable/tests/BookTable.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
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

// Mock functions
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

  it("renders the table with book data", () => {
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("To Kill a Mockingbird")).toBeInTheDocument();
  });

  it("calls handleDelete when the delete action is triggered", () => {
    // Ensure the correct delete button is selected
    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });

    // Make sure there is at least one delete button in the DOM
    expect(deleteButtons.length).toBeGreaterThan(0);

    // Click the first delete button
    fireEvent.click(deleteButtons[0]);

    // Ensure handleDelete is called with the correct book ID
    expect(handleDelete).toHaveBeenCalledWith(books[0].id);
  });
});
