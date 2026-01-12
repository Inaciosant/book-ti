"use client";
import { CartSheet } from "@/components/cart";
import Link from "next/link";

export const Navbar = () => {


  return (
  <nav className="w-full fixed top-0 left-0 z-20 h-16 bg-white shadow-md flex items-center justify-between px-4">
      <Link href="/">
        <h1 className="text-2xl font-bold text-center text-gray-800 cursor-pointer">
            Book TI
        </h1>
      </Link>
      
      <div className="ml-auto mr-4">
        <CartSheet />
      </div>
    </nav>
  );
};
