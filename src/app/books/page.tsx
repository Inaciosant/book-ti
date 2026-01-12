"use client";   
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import { BookItem } from "@/types/book";
import { useBooks } from "@/hooks/use-books";
import { BookList } from "@/components/books/list";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
export default function BooksPage() {
    const [query, setQuery] = useState("javascript");
    
    const { data: booksData, isLoading, isError } = useBooks(query);

    const formattedBooks: BookItem[] = booksData?.books?.map((b: any) => ({
        id: b.isbn13,
        title: b.title,
        subtitle: b.subtitle,
        isbn13: b.isbn13,
        price: typeof b.price === 'string' && b.price.includes('$') 
            ? parseFloat(b.price.replace('$', '')) 
            : b.price,
        image: b.image,
        url: b.url,
        authors: b.authors ?? "-",
        year: b.year ?? "-",
        quantity: 1 
    })) || [];

  return (
    <div className="container mx-auto  p-4">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="gap-2 flex items-center justify-center font-bold">
                  <Home className="mr-2 inline-flex text-sm" /> Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/books" className="gap-2">
                  Livros
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
        <BookList books={formattedBooks} />
       </div>
      
  );
}