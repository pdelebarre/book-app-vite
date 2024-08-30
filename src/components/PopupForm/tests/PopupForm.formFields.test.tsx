// PopupForm.formFields.test.tsx
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

describe("PopupForm Form Fields", () => {
  const mockSetBook = vi.fn();

  it("should update book field values when typing", () => {
    render(
      <PopupForm
        open={true}
        handleClose={() => {}}
        handleSubmit={() => {}}
        book={sampleBook}
        setBook={mockSetBook}
      />
    );

    const titleField = screen.getByLabelText("Title") as HTMLInputElement;
    fireEvent.change(titleField, { target: { value: "New Title" } });

    expect(mockSetBook).toHaveBeenCalledWith({
      ...sampleBook,
      title: "New Title",
    });
  });
});
