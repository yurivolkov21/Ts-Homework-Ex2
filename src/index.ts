import express, { type Request, type Response } from 'express';
import { books, getNextBookId, type Book } from './models/Book.js';
import {
    handleGetAllAuthors,
    handleGetAuthorById,
    handleCreateAuthor,
    handleUpdateAuthor,
    handleDeleteAuthor
} from './controllers/Authors.controller.js';
import { getAuthorById } from './services/Authors.service.js';

const app = express();
const hostName = 'localhost';
const port = 3000;

app.use(express.json());

app.get("/api/authors", handleGetAllAuthors);
app.get("/api/authors/:id", handleGetAuthorById);
app.post("/api/authors", handleCreateAuthor);
app.patch("/api/authors/:id", handleUpdateAuthor);
app.delete("/api/authors/:id", handleDeleteAuthor);

app.get("/books", (req: Request, res: Response) => {
    const result = books.map(book => ({
        ...book,
        author: getAuthorById(book.author) || book.author
    }));
    res.status(200).json(result);
});

app.post("/books", (req: Request, res: Response) => {
    const { title, author, description, year } = req.body; // get all properties from the request body JSON

    if (!title || !author || !description || !year) {
        return res.status(400).json({
            message: "Missing required book properties."
        });
    }

    const newBook: Book = {
        id: getNextBookId(),
        title,
        author,
        description,
        year: Number(year)
    };

    books.push(newBook);
    res.status(201).json({
        message: "Book added successfully.",
    });
});

app.get("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        })
    }

    res.status(200).json({
        ...book,
        author: getAuthorById(book.author) || book.author
    });
});

app.patch("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }
    const { title, author, description, year } = req.body;

    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.year = Number(year) || book.year;

    res.status(200).json({
        message: "Book updated successfully.",
    });
});

app.delete("/books/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    books.splice(bookIndex, 1);

    res.status(200).json({
        message: "Book deleted successfully.",
    });
});

app.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});