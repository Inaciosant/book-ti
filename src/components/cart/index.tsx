"use client";

import { ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const CartSheet = () => {
  const { cart, removeFromCart } = useCartStore();


  const parsePrice = (value: string | number): number => {
    if (typeof value === 'number') return value;
    return parseFloat(value.replace('$', ''));
  };

  const total = cart.reduce((acc, item) => {
    return acc + (parsePrice(item.price) * item.quantity);
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity p-2">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs p-0">
                    {cart.length}
                </Badge>
            )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 space-y-4">
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p>Seu carrinho está vazio.</p>
            <SheetClose asChild>
                <Button variant="outline">Continuar Comprando</Button>
            </SheetClose>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="relative w-16 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-contain p-1" 
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-semibold line-clamp-2 leading-tight">
                        {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">ISBN: { item.id}</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-green-600">
                            {formatCurrency(parsePrice(item.price))}
                        </span>
                        
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {cart.length > 0 && (
            <SheetFooter>

          
            <div className="mt-auto pt-6">
                <Separator className="mb-4" />
                <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-gray-600">Total</span>
                    <span className="text-xl font-bold text-green-700">
                        {formatCurrency(total)}
                    </span>
                </div>
                <SheetClose asChild>
                    <Button className="w-full h-12 text-lg font-bold">
                        Finalizar Compra
                    </Button>
                </SheetClose>
            </div>
              </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};