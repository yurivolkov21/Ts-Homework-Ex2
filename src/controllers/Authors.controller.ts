import type { Request, Response } from 'express';
import { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor } from '../services/Authors.service.js';

const isValidId = (id: number): boolean => {
    return Number.isInteger(id) && id > 0;
}

// GET /api/authors
export const handleGetAllAuthors = (req: Request, res: Response) => {
    const authors = getAllAuthors();
    res.status(200).json(authors);
}

// GET /api/authors/:id
export const handleGetAuthorById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
        return res.status(400).json({ message: "Invalid id. Must be a positive integer." });
    }

    const author = getAuthorById(id);

    if (!author) {
        return res.status(404).json({ message: "Author not found." });
    }

    res.status(200).json(author);
}

// POST /api/authors
export const handleCreateAuthor = (req: Request, res: Response) => {
    const { name, country, birthYear } = req.body;

    if (!name || !country || !birthYear) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    if (birthYear >= new Date().getFullYear()) {
        return res.status(400).json({ message: "birthYear must be less than current year." });
    }

    const newAuthor = addAuthor(name, country, Number(birthYear));
    res.status(201).json(newAuthor);
}

// PATCH /api/authors/:id
export const handleUpdateAuthor = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
        return res.status(400).json({ message: "Invalid id. Must be a positive integer." });
    }

    const { name, country, birthYear } = req.body;

    if (birthYear && birthYear >= new Date().getFullYear()) {
        return res.status(400).json({ message: "birthYear must be less than current year." });
    }

    const updated = updateAuthor(id, { name, country, birthYear });

    if (!updated) {
        return res.status(404).json({ message: "Author not found." });
    }

    res.status(200).json(updated);
}

// DELETE /api/authors/:id
export const handleDeleteAuthor = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!isValidId(id)) {
        return res.status(400).json({ message: "Invalid id. Must be a positive integer." });
    }

    const deleted = deleteAuthor(id);

    if (!deleted) {
        return res.status(404).json({ message: "Author not found." });
    }

    res.status(200).send("Author deleted successfully.");
}