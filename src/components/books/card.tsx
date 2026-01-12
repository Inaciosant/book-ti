import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { BookItem } from "@/types/book";
import { BookKey, ShoppingBag, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface BookCardProps {
  book: BookItem;
}

export const BookCard = ({ book }: BookCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

 const handleAddToCart = (e: any) => {
  e.stopPropagation();
    addToCart({
      id: book.id,
        title: book.title,
        authors: book.authors,
        price: book.price,
        quantity: 1,
        year: book.year, 
        image: book.image,
    });
  }

  const handleViewDetails = (e: any) => {
    e.stopPropagation();
    router.push(`/books/${book.id}`);
  };


  return (
    <Card>
      <CardHeader>
       <div className="relative w-full h-64 mb-4 flex justify-center bg-gray-100 rounded-md p-2">
        <Link href={`/books/${book.id}`} className="absolute inset-0 z-10" >
            <Image 
                src={book.image} 
                alt={book.title} 
                width={200} 
                height={250}
                loading="lazy"
                className="object-contain" 
            />
        </Link>
        </div>
        <CardTitle className="line-clamp-1" title={book.title}>
            {book.title}
        </CardTitle>
        <CardDescription className="line-clamp-1" title={book.subtitle}>
            {book.subtitle}
        </CardDescription>
       
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-2xl font-bold text-green-600">{book.price}</p>
      </CardContent>
      <CardFooter>
        
        <CardAction className="w-full  mx-auto flex flex-col items-center justify-center gap-2">
          <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 inline-flex" />
            Adicionar no Carrinho
          </Button>
           <Button 
            className="w-full bg-gray-500 text-white hover:bg-gray-600"
            onClick={handleViewDetails}
          >
            <SquareArrowOutUpRight  className="mr-2 inline-flex" />
            Ver Detalhes
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
