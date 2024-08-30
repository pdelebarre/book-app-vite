import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookRow from "../BookRow/BookRow";
import { Book } from "../../types/book";

interface BookTableProps {
  books: Book[];
  handleEdit: (book: Book) => void;
  handleDelete: (id: number | null) => void;
}

// Define types for state
interface SortConfig {
  key: keyof Book | "";
  direction: "asc" | "desc";
}

interface FilterConfig {
  title: string;
  author: string;
  publicationDate: string;
  language: string;
  pageCount: string;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  handleEdit,
  handleDelete,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "asc",
  });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    title: "",
    author: "",
    publicationDate: "",
    language: "",
    pageCount: "",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterTarget, setFilterTarget] = useState<"" | keyof FilterConfig>("");

  const handleSort = (columnKey: keyof Book) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleFilterMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    columnKey: keyof FilterConfig
  ) => {
    setAnchorEl(event.currentTarget);
    setFilterTarget(columnKey);
  };

  const handleFilterMenuClose = () => {
    setAnchorEl(null);
    setFilterTarget("");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      [filterTarget]: event.target.value,
    }));
    handleFilterMenuClose();
  };

  const filteredBooks = books.filter((book) => {
    return (
      (filterConfig.title === "" ||
        book.title.toLowerCase().includes(filterConfig.title.toLowerCase())) &&
      (filterConfig.author === "" ||
        book.author
          .toLowerCase()
          .includes(filterConfig.author.toLowerCase())) &&
      (filterConfig.publicationDate === "" ||
        book.publicationDate
          ?.toLowerCase()
          .includes(filterConfig.publicationDate.toLowerCase())) &&
      (filterConfig.language === "" ||
        book.language
          ?.toLowerCase()
          .includes(filterConfig.language.toLowerCase())) &&
      (filterConfig.pageCount === "" ||
        book.pageCount?.toString().includes(filterConfig.pageCount))
    );
  });

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortConfig.key === "") return 0;
    const orderMultiplier = sortConfig.direction === "asc" ? 1 : -1;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    return (
      (aValue ?? "").toString().localeCompare((bValue ?? "").toString()) *
      orderMultiplier
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Books Table">
        <TableHead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "title"}
                direction={sortConfig.direction}
                onClick={() => handleSort("title")}
                aria-label="Sort by title"
              >
                Title
              </TableSortLabel>
              <IconButton
                onClick={(e) => handleFilterMenuOpen(e, "title")}
                aria-label="Filter by title"
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "title"}
                onClose={handleFilterMenuClose}
                aria-labelledby="filter-title-menu"
              >
                <MenuItem>
                  <TextField
                    label="Filter by title"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.title}
                    onChange={handleFilterChange}
                    aria-label="Filter by title input"
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "author"}
                direction={sortConfig.direction}
                onClick={() => handleSort("author")}
                aria-label="Sort by author"
              >
                Author
              </TableSortLabel>
              <IconButton
                onClick={(e) => handleFilterMenuOpen(e, "author")}
                aria-label="Filter by author"
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "author"}
                onClose={handleFilterMenuClose}
                aria-labelledby="filter-author-menu"
              >
                <MenuItem>
                  <TextField
                    label="Filter by author"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.author}
                    onChange={handleFilterChange}
                    aria-label="Filter by author input"
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <TableSortLabel
                active={sortConfig.key === "publicationDate"}
                direction={sortConfig.direction}
                onClick={() => handleSort("publicationDate")}
                aria-label="Sort by publication date"
              >
                Publication Date
              </TableSortLabel>
              <IconButton
                onClick={(e) => handleFilterMenuOpen(e, "publicationDate")}
                aria-label="Filter by publication date"
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "publicationDate"}
                onClose={handleFilterMenuClose}
                aria-labelledby="filter-publication-date-menu"
              >
                <MenuItem>
                  <TextField
                    label="Filter by date"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.publicationDate}
                    onChange={handleFilterChange}
                    aria-label="Filter by publication date input"
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <TableSortLabel
                active={sortConfig.key === "language"}
                direction={sortConfig.direction}
                onClick={() => handleSort("language")}
                aria-label="Sort by language"
              >
                Language
              </TableSortLabel>
              <IconButton
                onClick={(e) => handleFilterMenuOpen(e, "language")}
                aria-label="Filter by language"
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "language"}
                onClose={handleFilterMenuClose}
                aria-labelledby="filter-language-menu"
              >
                <MenuItem>
                  <TextField
                    label="Filter by language"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.language}
                    onChange={handleFilterChange}
                    aria-label="Filter by language input"
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <TableSortLabel
                active={sortConfig.key === "pageCount"}
                direction={sortConfig.direction}
                onClick={() => handleSort("pageCount")}
                aria-label="Sort by page count"
              >
                Pages
              </TableSortLabel>
              <IconButton
                onClick={(e) => handleFilterMenuOpen(e, "pageCount")}
                aria-label="Filter by page count"
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "pageCount"}
                onClose={handleFilterMenuClose}
                aria-labelledby="filter-page-count-menu"
              >
                <MenuItem>
                  <TextField
                    label="Filter by pages"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.pageCount}
                    onChange={handleFilterChange}
                    aria-label="Filter by page count input"
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBooks.map((book, index) => (
            <BookRow
              key={index}
              book={book}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
