import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { Book } from "../../types/book";

interface PopupFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (book: Book) => void;
  book?: Book;
  setBook: (book: Book) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
  open,
  handleClose,
  handleSubmit,
  book,
  setBook,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedBook(null);
    }
  }, [open, book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updatedValue: string | number | undefined =
      name === "pageCount" ? (value ? Number(value) : undefined) : value;

    if (book) {
      setBook({
        ...book,
        [name]: updatedValue,
      });
    }
  };

  if (!book) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">
        {book.id ? "Edit Book" : "Add Book"}
      </DialogTitle>
      <DialogContent dividers>
        <Box
          display="flex"
          alignItems="flex-start"
          aria-labelledby="book-details"
        >
          {/* Cover Image and ISBN */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mr={3}
            width={160}
            aria-describedby="book-cover-info"
          >
            {book.coverImage && (
              <Box
                component="img"
                src={`data:image/jpeg;base64,${book.coverImage}`}
                alt="Book cover"
                sx={{
                  width: 120,
                  height: 180,
                  mb: 1,
                  borderRadius: 1,
                  boxShadow: 3,
                  objectFit: "cover",
                }}
                aria-label="Cover image of the book"
              />
            )}
            {book.isbn && (
              <Typography
                variant="body2"
                component="div"
                aria-label={`ISBN: ${book.isbn}`}
              >
                ISBN: {book.isbn}
              </Typography>
            )}
          </Box>

          {/* Form Fields */}
          <Box flex={1}>
            <Box display="flex" flexDirection="column" mb={2}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel htmlFor="title-field">Title</InputLabel>
                <OutlinedInput
                  id="title-field"
                  name="title"
                  value={book.title || ""}
                  onChange={handleChange}
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                />
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                variant="outlined"
                sx={{ mt: 1 }}
              >
                <InputLabel htmlFor="author-field">Author</InputLabel>
                <OutlinedInput
                  id="author-field"
                  name="author"
                  value={book.author || ""}
                  onChange={handleChange}
                  style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                />
              </FormControl>
              <Box display="flex" mt={1}>
                <FormControl
                  margin="dense"
                  variant="outlined"
                  sx={{ width: 120, mr: 2 }}
                >
                  <InputLabel htmlFor="page-count-field">Page Count</InputLabel>
                  <OutlinedInput
                    id="page-count-field"
                    name="pageCount"
                    value={book.pageCount || ""}
                    onChange={handleChange}
                    inputProps={{ maxLength: 4 }}
                  />
                </FormControl>
                <FormControl
                  margin="dense"
                  variant="outlined"
                  sx={{ width: 200 }}
                >
                  <InputLabel htmlFor="publication-date-field">
                    Publication Date
                  </InputLabel>
                  <OutlinedInput
                    id="publication-date-field"
                    name="publicationDate"
                    value={book.publicationDate || ""}
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                  />
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" aria-label="Cancel">
          Cancel
        </Button>
        <Button
          onClick={() => handleSubmit(book)}
          color="primary"
          aria-label="Save"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupForm;
