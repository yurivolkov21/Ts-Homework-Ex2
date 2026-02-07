export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    year: number;
}

let nextId: number = 1;

export const getNextId = (): number => {
    return nextId++;
}

export let books: Book[] = [
    {
        id: nextId++,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A novel about the serious issues of racial injustice and moral growth.",
        year: 1960
    },
    {
        id: nextId++,
        title: "1984",
        author: "George Orwell",
        description: "A dystopian novel set in a totalitarian society under constant surveillance.",
        year: 1949
    },
    {
        id: nextId++,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A critique of the American Dream set in the Jazz Age.",
        year: 1925
    }
]