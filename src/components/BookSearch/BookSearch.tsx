import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { searchBooks } from "../../api/api"; // Assumes you have a function to search books

import { Book } from "../../types/book";

// Define the props for the component
interface BookSearchProps {
  onBookSelect: (book: Book) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ onBookSelect }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Book>("title");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [selectedBooks, setSelectedBooks] = useState<Record<string, Book>>({});

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await searchBooks(title, author);
      setResults(response.data);
    } catch (err) {
      setError("Error fetching data " + err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (property: keyof Book) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleLanguageFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLanguageFilter(e.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (book: Book) => {
    setSelectedBooks((prevSelectedBooks) => {
      const newSelectedBooks = { ...prevSelectedBooks };
      const bookId = book.openLibraryId || book.title;

      if (newSelectedBooks[bookId]) {
        delete newSelectedBooks[bookId];
      } else {
        newSelectedBooks[bookId] = book; // Store the entire book object
      }

      onBookSelect(book); // Pass the full book object to the parent
      return newSelectedBooks;
    });
  };

  const isSelected = (bookId: string) => !!selectedBooks[bookId];

  const filteredResults = results
    .filter((book) =>
      book.language
        ? book.language.toLowerCase().includes(languageFilter.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (a[orderBy] !== undefined && b[orderBy] !== undefined) {
        const aValue = a[orderBy] as string | number;
        const bValue = b[orderBy] as string | number;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return order === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return order === "asc" ? aValue - bValue : bValue - aValue;
        }
      }
      return 0;
    });

  return (
    <Container>
      <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          aria-label="Search by book title"
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
          aria-label="Search by author"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          aria-label="Submit search"
        >
          Search
        </Button>
      </Box>
      {loading && (
        <CircularProgress
          aria-live="polite"
          aria-label="Loading search results"
        />
      )}
      {error && (
        <Typography color="error" aria-live="assertive">
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Filter by Language"
          value={languageFilter}
          onChange={handleLanguageFilterChange}
          fullWidth
          margin="normal"
          aria-label="Filter books by language"
        />
        <TableContainer component={Paper} aria-label="Books table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                    aria-label="Sort by title"
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "author"}
                    direction={orderBy === "author" ? order : "asc"}
                    onClick={() => handleRequestSort("author")}
                    aria-label="Sort by author"
                  >
                    Author
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "language"}
                    direction={orderBy === "language" ? order : "asc"}
                    onClick={() => handleRequestSort("language")}
                    aria-label="Sort by language"
                  >
                    Language
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "pageCount"}
                    direction={orderBy === "pageCount" ? order : "asc"}
                    onClick={() => handleRequestSort("pageCount")}
                    aria-label="Sort by page count"
                  >
                    Page Count
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book) => (
                  <Tooltip
                    key={book.openLibraryId || book.title}
                    title={book.openLibraryId || "No ID available"}
                    arrow
                  >
                    <TableRow
                      hover
                      selected={isSelected(book.openLibraryId || book.title)}
                      aria-selected={isSelected(
                        book.openLibraryId || book.title
                      )}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected(book.openLibraryId || book.title)}
                          onChange={() => handleCheckboxChange(book)}
                          aria-label={`Select ${book.title}`}
                        />
                      </TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.language}</TableCell>
                      <TableCell>{book.pageCount}</TableCell>
                    </TableRow>
                  </Tooltip>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          aria-label="Table pagination"
        />
      </Box>
    </Container>
  );
};

export default BookSearch;
