export interface Book {
    id: number;
    title: string;
    author: number;
    description: string;
    year: number;
}

let nextId: number = 1;

export const getNextBookId = (): number => {
    return nextId++;
}

export let books: Book[] = [
    {
        id: getNextBookId(),
        title: "To Kill a Mockingbird",
        author: 1, // Harper Lee
        description: "A novel about the serious issues of racial injustice and moral growth.",
        year: 1960
    },
    {
        id: getNextBookId(),
        title: "1984",
        author: 2, // George Orwell
        description: "A dystopian novel set in a totalitarian society under constant surveillance.",
        year: 1949
    },
    {
        id: getNextBookId(),
        title: "The Great Gatsby",
        author: 3, // J.K. Rowling (placeholder)
        description: "A critique of the American Dream set in the Jazz Age.",
        year: 1925
    }
]