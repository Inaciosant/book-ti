"use client";
import { useState } from "react";
import { useBooks } from "@/hooks/use-books";
import { BookList } from "@/components/books/list";
import { SearchBar } from "@/components/search/search-bar";
import { LoadingState } from "@/components/states/loading-state";
import { ErrorState } from "@/components/states/error-state";
import { EmptyState } from "@/components/states/empty-state";
import { BookItem } from "@/types/book"; // Certifique-se de importar o tipo correto

export default function Home() {
  const [query, setQuery] = useState("javascript");
  const { data, isLoading, isError, refetch } = useBooks(query);


  const formattedBooks: BookItem[] = data?.books?.map((book: any) => ({
    id: book.isbn13, 
    title: book.title,
    subtitle: book.subtitle,
    isbn13: book.isbn13,
    price: book.price,
    image: book.image,
    url: book.url,
    authors: "", 
    year: "-",
    quantity: 1 
  })) || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container mx-auto">
      <div className="w-full p-4 flex justify-center">
        <SearchBar onSearch={(term) => setQuery(term)} />
      </div>

      <div className="w-full p-4 mt-3">
        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState 
            error="Ops! Ocorreu um erro ao buscar os livros." 
            reset={refetch} 
          />
        ) : formattedBooks.length === 0 ? (
          <EmptyState term={query} />
        ) : (
          <BookList books={formattedBooks} />
        )}
      </div>
    </div>
  );
}