"use client";
import {
  ChevronLeft,
  Home,
  ShoppingBag,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useBookDetails } from "@/hooks/use-book-details";
import { useCartStore } from "@/store/cart-store";
// components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"
import { RecommendedBooks } from "@/components/books/recommended";


async function fetchRecommended() {
  const res = await fetch(`https://api.itbook.store/1.0/new`); 
  return res.json();
}

export default function BookDetailsPage() {
  const params = useParams();
  const isbn13 = params.id as string;
  const router = useRouter();
  const {
    data: book,
    isLoading,
    isError,
    refetch,
  } = useBookDetails(isbn13 || "");

  const { data: recommendedData } = useQuery({
    queryKey: ['books-recommended'],
    queryFn: fetchRecommended
  });
  const recommendedBooks = recommendedData?.books?.map((item: any) => ({
     id: item.isbn13,
     title: item.title,
     price: item.price,
     image: item.image,
     authors: "-",
     year: "-",
     isbn13: item.isbn13,
     url: item.url
  })) || [];

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    if (book) {
      addToCart({
        id: book.isbn13,
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: 1,
        authors: book.authors,
        year: book.year,
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-10">
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  if (isError || !book)
    return <div className="p-10 text-center">Livro não encontrado.</div>;

  return (
    <div className="container mx-auto p-6 ">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="gap-2 flex items-center justify-center font-bold">
                  <Home className="mr-2 inline-flex text-sm " /> Home
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/books/${book.isbn13}`} className="gap-2">
                  {book.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex justify-center items-start  ">
          <div className="relative w-[300px] h-[400px] shadow-2xl ">
            <Image
              src={book.image}
              alt={book.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-gray-500 mt-2">{book.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{book.year}</Badge>
            <Badge variant="outline">{book.pages} Páginas</Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {book.rating}/5
              </span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600">
            <p>{book.desc}</p>
          </div>

          <div className="border-t border-b py-4 space-y-2">
            <p>
              <span className="font-semibold">Autor:</span> {book.authors}
            </p>
            <p>
              <span className="font-semibold">Editora:</span> {book.publisher}
            </p>
            <p>
              <span className="font-semibold">ISBN:</span> {book.isbn13}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-4xl font-bold text-green-600">
              {book.price}
            </span>
            <Button size="lg" onClick={handleAdd} className="px-8">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
         { book.pdf && typeof book.pdf === "object" && Object.keys(book.pdf).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">PDFs Disponíveis:</h2>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(book.pdf as Record<string, string>).map(([label, url]) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      aria-label={`Abrir ${label}`}
                    >
                      {label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
      <Separator className="my-10 text-black font-bold" />
      <RecommendedBooks books={recommendedBooks} />
    </div>
  );
}
