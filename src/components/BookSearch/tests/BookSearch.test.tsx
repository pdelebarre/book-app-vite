import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import BookSearch from "../../BookSearch"; // Adjust the import path as needed
import { searchBooks } from "../../../api"; // Adjust the import path as needed
import { Book } from "../../../types/book";

// Mock the searchBooks API function
vi.mock("../../../api", () => ({
  searchBooks: vi.fn(),
}));

describe("BookSearch Component", () => {
  it("renders without crashing", () => {
    render(<BookSearch onBookSelect={() => {}} />);
    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });

  it("should display loading indicator when searching", async () => {
    (searchBooks as vi.Mock).mockResolvedValue({ data: [] });
    render(<BookSearch onBookSelect={() => {}} />);
    fireEvent.click(screen.getByText(/Search/));
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );
  });

  it("should display an error message when search fails", async () => {
    (searchBooks as vi.Mock).mockRejectedValue(
      new Error("Error fetching data")
    );
    render(<BookSearch onBookSelect={() => {}} />);
    fireEvent.click(screen.getByText(/Search/));
    await waitFor(() => {
      expect(screen.getByText(/Error fetching data/)).toBeInTheDocument();
    });
  });

  it("should display search results", async () => {
    const mockBooks: Book[] = [
      {
        openLibraryId: "1",
        title: "Book 1",
        author: "Author 1",
        language: "English",
        pageCount: 200,
      },
    ];
    (searchBooks as vi.Mock).mockResolvedValue({ data: mockBooks });
    render(<BookSearch onBookSelect={() => {}} />);
    fireEvent.click(screen.getByText(/Search/));
    await waitFor(() => {
      expect(screen.getByText(/Book 1/)).toBeInTheDocument();
    });
  });

  it("should handle checkbox selection", async () => {
    const mockBooks: Book[] = [
      {
        openLibraryId: "1",
        title: "Book 1",
        author: "Author 1",
        language: "English",
        pageCount: 200,
      },
    ];
    const onBookSelect = vi.fn();
    (searchBooks as vi.Mock).mockResolvedValue({ data: mockBooks });
    render(<BookSearch onBookSelect={onBookSelect} />);
    fireEvent.click(screen.getByText(/Search/));
    await waitFor(() => {
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);
      expect(onBookSelect).toHaveBeenCalledWith(mockBooks[0]);
    });
  });

  it("should update filter value correctly", () => {
    render(<BookSearch onBookSelect={() => {}} />);
    const filterInput = screen.getByLabelText(/Filter by Language/);
    fireEvent.change(filterInput, { target: { value: "Spanish" } });
    expect(filterInput).toHaveValue("Spanish");
  });
});
