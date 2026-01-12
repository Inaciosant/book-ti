import { Suspense } from "react";
import { BookCard } from "./card";
import { BookItem } from "@/types/book";
import { Skeleton } from "../ui/skeleton";

interface BookListProps {
  books: BookItem[];
}

export const BookList = ({ books }: BookListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
      
          <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
