"use client"; 
import { BookOpenCheck } from "lucide-react";
import { BookCard } from "@/components/books/card";
import { BookItem } from "@/types/book";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecommendedBooksProps {
  books: BookItem[];
}

export const RecommendedBooks = ({ books }: RecommendedBooksProps) => {
  if (!books || books.length === 0) return null;

  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
        <BookOpenCheck className="mr-2 text-green-600" />
       Livros Recomendados
      </h2>
      
      <Carousel 
        opts={{
          align: "start", 
          loop: true,     
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4"> 
          
          {books.map((book) => (
            <CarouselItem key={book.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          
              <div className="h-full p-1">
                 <BookCard book={book} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="hidden md:flex -left-4" />
        <CarouselNext className="hidden md:flex -right-4" />
      </Carousel>
    </div>
  );
};