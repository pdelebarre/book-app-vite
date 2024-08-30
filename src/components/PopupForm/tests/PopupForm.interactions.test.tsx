// PopupForm.interactions.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PopupForm from "../PopupForm";
import { Book } from "../../../types/book";

const sampleBook: Book = {
  id: 1,
  title: "Sample Book",
  author: "Author Name",
  publicationDate: "2023-01-01",
  language: "English",
  pageCount: 100,
  coverImage: "",
  isbn: "1234567890",
};

describe("PopupForm Interactions", () => {
  const mockHandleClose = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockSetBook = vi.fn();

  it("should call handleClose when the Cancel button is clicked", () => {
    render(
      <PopupForm
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        book={sampleBook}
        setBook={mockSetBook}
      />
    );

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("should call handleSubmit with the book when Save button is clicked", () => {
    render(
      <PopupForm
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        book={sampleBook}
        setBook={mockSetBook}
      />
    );

    const saveButton = screen.getByRole("button", { name: "Save" });
    fireEvent.click(saveButton);

    expect(mockHandleSubmit).toHaveBeenCalledWith(sampleBook);
  });
});
