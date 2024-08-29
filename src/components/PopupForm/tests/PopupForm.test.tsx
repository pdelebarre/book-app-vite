// src/components/PopupForm/tests/PopupForm.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import PopupForm from "../../PopupForm"; // Adjust the import path as needed
import { Book } from "../../../types/book";

describe("PopupForm Component", () => {
  const defaultBook: Book = {
    id: 1,
    title: "Sample Title",
    author: "Sample Author",
    pageCount: 100,
    publicationDate: "2023-01-01",
    coverImage: "sampleCoverImage",
    isbn: "1234567890",
  };

  const setup = (open: boolean, book?: Book) => {
    const handleClose = vi.fn();
    const handleSubmit = vi.fn();
    const setBook = vi.fn();
    render(
      <PopupForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        book={book}
        setBook={setBook}
      />
    );
    return { handleClose, handleSubmit, setBook };
  };

  it("should render the PopupForm when open and book is provided", () => {
    setup(true, defaultBook);
    expect(screen.getByText(/Edit Book/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/)).toHaveValue(defaultBook.title);
  });

  it("should render Add Book title when book is not provided", () => {
    setup(true); // Render with open dialog and no book

    // Debug output to understand what is being rendered
    screen.debug();

    // Use a function to match the text
    const titleElement = screen.getByText(
      (content, element) =>
        content.startsWith("Add Book") && element.tagName.toLowerCase() === "h6"
    );
    expect(titleElement).toBeInTheDocument();
  });

  it("should call handleClose when Cancel button is clicked", () => {
    const { handleClose } = setup(true, defaultBook);
    fireEvent.click(screen.getByText(/Cancel/));
    expect(handleClose).toHaveBeenCalled();
  });

  it("should call handleSubmit with the correct book data when Save button is clicked", async () => {
    const { handleSubmit } = setup(true, defaultBook);
    fireEvent.click(screen.getByText(/Save/));
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(defaultBook);
    });
  });

  it("should call setBook when form fields change", () => {
    const { setBook } = setup(true, defaultBook);
    fireEvent.change(screen.getByLabelText(/Title/), {
      target: { value: "New Title" },
    });
    expect(setBook).toHaveBeenCalledWith({
      ...defaultBook,
      title: "New Title",
    });
  });

  it("should render Edit Book title when book is provided", () => {
    setup(true, defaultBook);

    // Check if the dialog title is "Edit Book"
    expect(screen.getByText("Edit Book")).toBeInTheDocument();
  });

  it("should update state correctly when fields change", () => {
    const { setBook } = setup(true, defaultBook);
    fireEvent.change(screen.getByLabelText(/Page Count/), {
      target: { value: "200" },
    });
    expect(setBook).toHaveBeenCalledWith({
      ...defaultBook,
      pageCount: 200,
    });
  });
});
