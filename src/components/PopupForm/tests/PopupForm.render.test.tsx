import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PopupForm from "../PopupForm";
import { Book } from "../../../types/book";

describe("PopupForm Component", () => {
  const mockHandleClose = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockSetBook = vi.fn();

  const sampleBook: Book = {
    id: 1,
    title: "Sample Book",
    author: "Author Name",
    publicationDate: "2023-01-01",
    language: "English",
    pageCount: 100,
    coverImage: "", // Add a base64 string if needed
    isbn: "1234567890",
  };


  it("should not render the dialog when open is false", () => {
    render(
      <PopupForm
        open={false}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        book={sampleBook}
        setBook={mockSetBook}
      />
    );

    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("should display the correct ISBN when provided", () => {
    render(
      <PopupForm
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        book={sampleBook}
        setBook={mockSetBook}
      />
    );

    const isbnElement = screen.getByLabelText(`ISBN: ${sampleBook.isbn}`);
    expect(isbnElement).toBeInTheDocument();
  });

  it("should display the book cover image when provided", () => {
    const bookWithCover: Book = {
      ...sampleBook,
      coverImage: "sampleBase64String",
    };

    render(
      <PopupForm
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        book={bookWithCover}
        setBook={mockSetBook}
      />
    );

    const coverImage = screen.getByRole("img", {
      name: "Cover image of the book",
    });
    expect(coverImage).toBeInTheDocument();
  });
});
