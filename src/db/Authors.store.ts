import type { Author } from "../models/Authors.model.js";

let nextAuthorId: number = 1;

export const getNextAuthorId = (): number => {
    return nextAuthorId++;
}

export let authors: Author[] = [
    {
        id: getNextAuthorId(),
        name: "Harper Lee",
        country: "United States",
        birthYear: 1926
    },
    {
        id: getNextAuthorId(),
        name: "George Orwell",
        country: "United Kingdom",
        birthYear: 1903
    },
    {
        id: getNextAuthorId(),
        name: "J.K. Rowling",
        country: "United Kingdom",
        birthYear: 1965
    }
]