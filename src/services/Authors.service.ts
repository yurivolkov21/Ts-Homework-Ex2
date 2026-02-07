import type { Author } from '../models/Authors.model.js';
import { authors, getNextAuthorId } from '../db/Authors.store.js';

export const getAllAuthors = (): Author[] => {
    return authors;
}

export const getAuthorById = (id: number): Author | undefined => {
    return authors.find(a => a.id === id);
}

export const addAuthor = (name: string, country: string, birthYear: number): Author => {
    const newAuthor: Author = {
        id: getNextAuthorId(),
        name,
        country,
        birthYear
    };
    authors.push(newAuthor);
    return newAuthor;
}

export const updateAuthor = (id: number, data: Partial<Omit<Author, 'id'>>): Author | undefined => {
    const author = authors.find(a => a.id === id);

    if (!author) return undefined;

    author.name = data.name || author.name;
    author.country = data.country || author.country;
    author.birthYear = data.birthYear || author.birthYear;

    return author;
}

export const deleteAuthor = (id:number): boolean => {
    const index = authors.findIndex(a => a.id === id);

    if (index === -1) return false;

    authors.splice(index, 1);
    return true;
}
